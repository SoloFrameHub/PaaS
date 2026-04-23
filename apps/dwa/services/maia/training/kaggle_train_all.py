"""
Maia — Kaggle Training Script (All Models)
============================================
Run this on Kaggle with GPU (T4) enabled to train all classifiers.

Estimated time per model on Kaggle T4:
    - Forum Topic:          ~15-25 min (large Reddit dataset)
    - Content Quality:      ~2-5 min (small synthetic dataset)
    - Content Atomization:  ~2-5 min (small lesson-derived dataset)
    - Total:                ~20-35 min

Setup in Kaggle:
    1. Create new Kaggle Notebook
    2. Enable GPU: Settings → Accelerator → GPU T4 x2
    3. Enable Internet: Settings → Internet → On
    4. Upload this file OR paste into a code cell
    5. Run

After training, download the models/ directory and copy to your VPS:
    scp -r models/ root@your-vps:/opt/maia/models/

Or if using the notebook UI, download each model directory as a zip
from the Kaggle output panel.

Note: The distress model is already trained. This script trains the
three NEW models only. To retrain distress, uncomment the section below.
"""

import os
import sys
import subprocess
import json
import shutil
from pathlib import Path

# ── Install dependencies (Kaggle comes with most, but pin versions) ──────────

subprocess.check_call([
    sys.executable, "-m", "pip", "install", "-q", "--upgrade",
    "transformers>=4.41.0",
    "datasets>=2.19.0",
    "accelerate>=1.0.0",
    "peft>=0.18.0",
])

import torch
print(f"PyTorch: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    props = torch.cuda.get_device_properties(0)
    mem = getattr(props, 'total_global_mem', None) or getattr(props, 'total_mem', 0)
    print(f"GPU Memory: {mem / 1e9:.1f} GB")
print()

# ── Setup paths ──────────────────────────────────────────────────────────────

# On Kaggle, outputs go to /kaggle/working/
WORKING_DIR = Path("/kaggle/working") if Path("/kaggle").exists() else Path(".")
MODELS_DIR = WORKING_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

# ══════════════════════════════════════════════════════════════════════════════
# INLINE TRAINING CODE
# (Self-contained so it works as a single Kaggle notebook cell)
# ══════════════════════════════════════════════════════════════════════════════

import time
import random
import numpy as np
from datasets import Dataset, load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
    EarlyStoppingCallback,
)
from sklearn.metrics import f1_score, classification_report


HAS_CUDA = torch.cuda.is_available()
BASE_MODEL = "distilbert/distilbert-base-uncased"


def softmax(logits, axis=-1):
    e = np.exp(logits - np.max(logits, axis=axis, keepdims=True))
    return e / e.sum(axis=axis, keepdims=True)


def train_model(
    name: str,
    train_ds: Dataset,
    val_ds: Dataset,
    test_ds: Dataset,
    num_labels: int,
    id2label: dict,
    label2id: dict,
    epochs: int = 3,
    batch_size: int = 32,
    learning_rate: float = 2e-5,
    max_length: int = 256,
):
    """Generic training function for any Maia classifier."""
    output_dir = MODELS_DIR / name

    print(f"\n{'='*60}")
    print(f"TRAINING: {name}")
    print(f"{'='*60}")
    print(f"  Train: {len(train_ds)} | Val: {len(val_ds)} | Test: {len(test_ds)}")
    print(f"  Labels: {list(id2label.values())}")
    print(f"  GPU: {torch.cuda.get_device_name(0) if HAS_CUDA else 'CPU'}")
    print()

    # Tokenize
    tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

    def tokenize(batch):
        return tokenizer(batch["text"], truncation=True, max_length=max_length, padding="max_length")

    train_ds = train_ds.map(tokenize, batched=True, batch_size=256)
    val_ds = val_ds.map(tokenize, batched=True, batch_size=256)
    test_ds = test_ds.map(tokenize, batched=True, batch_size=256)

    train_ds = train_ds.rename_column("label", "labels")
    val_ds = val_ds.rename_column("label", "labels")
    test_ds = test_ds.rename_column("label", "labels")

    train_ds.set_format("torch", columns=["input_ids", "attention_mask", "labels"])
    val_ds.set_format("torch", columns=["input_ids", "attention_mask", "labels"])
    test_ds.set_format("torch", columns=["input_ids", "attention_mask", "labels"])

    # Model
    model = AutoModelForSequenceClassification.from_pretrained(
        BASE_MODEL, num_labels=num_labels, id2label=id2label, label2id=label2id,
    )

    def compute_metrics(eval_pred):
        logits, labels = eval_pred
        preds = np.argmax(logits, axis=-1)
        return {
            "f1_weighted": round(f1_score(labels, preds, average="weighted"), 4),
            "f1_macro": round(f1_score(labels, preds, average="macro"), 4),
        }

    training_args = TrainingArguments(
        output_dir=str(output_dir),
        num_train_epochs=epochs,
        per_device_train_batch_size=batch_size,
        per_device_eval_batch_size=64 if HAS_CUDA else 16,
        learning_rate=learning_rate,
        weight_decay=0.01,
        eval_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        metric_for_best_model="f1_weighted",
        greater_is_better=True,
        logging_steps=50,
        fp16=HAS_CUDA,
        dataloader_num_workers=2 if HAS_CUDA else 0,
        no_cuda=not HAS_CUDA,
        report_to="none",
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_ds,
        eval_dataset=val_ds,
        compute_metrics=compute_metrics,
        callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],
    )

    start = time.time()
    trainer.train()
    elapsed = time.time() - start
    print(f"\nTraining complete in {elapsed/60:.1f} minutes")

    # Evaluate
    predictions = trainer.predict(test_ds)
    preds = np.argmax(predictions.predictions, axis=-1)
    labels = predictions.label_ids
    f1_w = f1_score(labels, preds, average="weighted")
    f1_m = f1_score(labels, preds, average="macro")

    target_names = [id2label[i] for i in range(num_labels)]
    print(f"\n{'='*60}")
    print(f"RESULTS: {name}")
    print(f"{'='*60}")
    print(classification_report(labels, preds, target_names=target_names, digits=4))
    print(f"Weighted F1: {f1_w:.4f} | Macro F1: {f1_m:.4f}")

    # Save
    output_dir.mkdir(parents=True, exist_ok=True)
    trainer.save_model(str(output_dir))
    tokenizer.save_pretrained(str(output_dir))

    metrics = {
        "classifier": name,
        "model": BASE_MODEL,
        "finetuned": True,
        "num_labels": num_labels,
        "labels": id2label,
        "train_size": len(train_ds),
        "test_size": len(test_ds),
        "weighted_f1": round(f1_w, 4),
        "macro_f1": round(f1_m, 4),
        "training_minutes": round(elapsed / 60, 1),
        "device": torch.cuda.get_device_name(0) if HAS_CUDA else "cpu",
    }
    with open(output_dir / "metrics.json", "w") as f:
        json.dump(metrics, f, indent=2)

    # Clean up checkpoints to save space
    for ckpt in output_dir.glob("checkpoint-*"):
        shutil.rmtree(ckpt)
    print(f"Model saved to: {output_dir}/")

    return metrics


# ══════════════════════════════════════════════════════════════════════════════
# 1. FORUM TOPIC CLASSIFIER
# ══════════════════════════════════════════════════════════════════════════════
#
# Uses the "Sentiment Analysis for Mental Health" dataset (~50k examples, 7 classes)
# from HuggingFace (mirrors the Kaggle dataset by suchintikasarkar).
#
# Dataset labels → our labels mapping:
#   Normal              → general-wellness
#   Depression          → depression
#   Suicidal            → crisis
#   Anxiety             → anxiety
#   Stress              → coping-strategies
#   Bipolar             → medication  (closest fit — medication/treatment-adjacent)
#   Personality disorder → relationships (closest fit — interpersonal patterns)
#
# "optimization" has no public dataset — we supplement with keyword-matched
# examples from the go_emotions dataset for balanced coverage.

TOPIC_LABELS = [
    "anxiety", "depression", "relationships", "medication",
    "coping-strategies", "crisis", "general-wellness", "optimization",
]
TOPIC_ID2LABEL = {i: l for i, l in enumerate(TOPIC_LABELS)}
TOPIC_LABEL2ID = {l: i for i, l in enumerate(TOPIC_LABELS)}

# Map the HuggingFace dataset's label strings to our label schema
SENTIMENT_MH_LABEL_MAP = {
    "Normal": "general-wellness",
    "Depression": "depression",
    "Suicidal": "crisis",
    "Anxiety": "anxiety",
    "Stress": "coping-strategies",
    "Bipolar": "medication",
    "Personality disorder": "relationships",
}

# Keywords for the "optimization" class (no public dataset covers this)
OPTIMIZATION_KEYWORDS = [
    "productivity", "performance", "motivation", "goals", "habits",
    "optimize", "resilience", "mindset", "growth", "self-improvement",
    "discipline", "focus", "peak performance", "routine", "consistency",
]

SAMPLES_PER_TOPIC = 4000  # Increased — the dataset supports it


def prepare_forum_topic_data():
    print("\n--- Preparing Forum Topic Data ---")

    # Primary dataset: Sentiment Analysis for Mental Health (~50k, 7 classes)
    print("Loading Sentiment Analysis for Mental Health dataset...")
    try:
        mh_ds = load_dataset(
            "suchintikasarkar/sentiment-analysis-for-mental-health",
            split="train",
        ).shuffle(seed=42)
        print(f"  Loaded {len(mh_ds)} examples")
    except Exception as e:
        print(f"  Failed to load primary dataset: {e}")
        print("  Trying HuggingFace mirror...")
        mh_ds = load_dataset(
            "AhmedSSoliman/sentiment-analysis-for-mental-health-Combined-Data",
            split="train",
        ).shuffle(seed=42)
        print(f"  Loaded {len(mh_ds)} examples from mirror")

    # Detect column names (dataset may use 'statement'/'status' or 'text'/'label')
    cols = mh_ds.column_names
    text_col = "statement" if "statement" in cols else "text"
    label_col = "status" if "status" in cols else "label"
    print(f"  Using columns: text='{text_col}', label='{label_col}'")

    all_examples = {l: [] for l in TOPIC_LABELS}
    target = SAMPLES_PER_TOPIC + 1000  # Extra for val+test splits

    # Map the primary dataset
    unmapped = 0
    for ex in mh_ds:
        text = str(ex.get(text_col, "")).strip()
        if len(text) < 20:
            continue

        raw_label = str(ex.get(label_col, "")).strip()
        our_label = SENTIMENT_MH_LABEL_MAP.get(raw_label)

        if our_label is None:
            unmapped += 1
            continue

        if len(all_examples[our_label]) < target:
            all_examples[our_label].append(text)

    if unmapped > 0:
        print(f"  Skipped {unmapped} examples with unmapped labels")

    # Supplement "optimization" from go_emotions (no MH dataset covers this topic)
    if len(all_examples["optimization"]) < target:
        print("Loading go_emotions for optimization class supplementation...")
        try:
            emotions_ds = load_dataset(
                "google-research-datasets/go_emotions", "simplified",
                split="train",
            ).shuffle(seed=42)

            for ex in emotions_ds:
                text = ex.get("text", "")
                if len(text) < 20:
                    continue
                text_lower = text.lower()
                if any(kw in text_lower for kw in OPTIMIZATION_KEYWORDS):
                    if len(all_examples["optimization"]) < target:
                        all_examples["optimization"].append(text)
            print(f"  Optimization supplemented to {len(all_examples['optimization'])} examples")
        except Exception as e:
            print(f"  go_emotions load failed: {e} — optimization class will be smaller")

    for topic, texts in all_examples.items():
        print(f"  {topic}: {len(texts)}")

    # Split into train/val/test
    train_t, train_l, val_t, val_l, test_t, test_l = [], [], [], [], [], []
    for topic, texts in all_examples.items():
        random.seed(42)
        random.shuffle(texts)
        lid = TOPIC_LABEL2ID[topic]
        n = len(texts)
        if n < 10:
            print(f"  WARNING: '{topic}' has only {n} examples — including anyway")
        n_test = min(500, max(1, n // 10))
        n_val = min(500, max(1, n // 10))
        n_train = min(SAMPLES_PER_TOPIC, n - n_val - n_test)
        train_t.extend(texts[:n_train]); train_l.extend([lid]*n_train)
        val_t.extend(texts[n_train:n_train+n_val]); val_l.extend([lid]*n_val)
        test_t.extend(texts[n_train+n_val:n_train+n_val+n_test]); test_l.extend([lid]*n_test)

    print(f"  Final split: train={len(train_t)}, val={len(val_t)}, test={len(test_t)}")

    return (
        Dataset.from_dict({"text": train_t, "label": train_l}).shuffle(seed=42),
        Dataset.from_dict({"text": val_t, "label": val_l}).shuffle(seed=42),
        Dataset.from_dict({"text": test_t, "label": test_l}),
    )


# ══════════════════════════════════════════════════════════════════════════════
# 2. CONTENT QUALITY CLASSIFIER
# ══════════════════════════════════════════════════════════════════════════════

QUALITY_LABELS = [
    "clinically-appropriate", "needs-revision", "potentially-harmful",
    "overly-clinical", "missing-validation",
]
QUALITY_ID2LABEL = {i: l for i, l in enumerate(QUALITY_LABELS)}
QUALITY_LABEL2ID = {l: i for i, l in enumerate(QUALITY_LABELS)}

# See train_content_quality.py for full example sets — abbreviated here for notebook clarity
QUALITY_EXAMPLES = {
    "clinically-appropriate": [
        "It's completely normal to feel anxious in social situations. Many people experience this, and it doesn't mean something is wrong with you. Let's explore some strategies that research has shown to be helpful.",
        "Feeling overwhelmed is a natural response when facing multiple stressors. Your brain is doing its job by alerting you to challenges. The good news is that there are evidence-based approaches that can help you manage these feelings more effectively.",
        "Sleep difficulties are one of the most common experiences people face during stressful periods. This isn't a personal failing - it's your nervous system responding to stress. Let's look at what sleep science tells us about improving rest.",
        "It takes courage to acknowledge that you're struggling. Many people find it difficult to reach out for support, so recognizing this step is important. Research consistently shows that seeking help is a sign of strength, not weakness.",
        "Grief doesn't follow a predictable timeline, and there's no 'right way' to grieve. Whatever you're feeling right now is valid. Let's explore some ways to honor your experience while also supporting your wellbeing.",
        "Anger is a natural emotion that serves an important purpose - it alerts us to perceived threats or injustice. The goal isn't to eliminate anger, but to develop healthier ways of expressing and channeling it.",
        "Many people notice that their mood fluctuates throughout the day. This is influenced by factors like sleep, nutrition, social interaction, and physical activity. Understanding your personal patterns can be a powerful tool for self-management.",
        "Cognitive behavioral therapy research shows that our thoughts, feelings, and behaviors are interconnected. By becoming aware of unhelpful thinking patterns, we can gradually develop more balanced perspectives.",
        "It's understandable to feel frustrated when progress feels slow. Recovery and personal growth aren't linear processes - setbacks are a normal part of the journey, not evidence that you're failing.",
        "Breathing exercises activate your parasympathetic nervous system, which is your body's natural calming response. Even a few minutes of focused breathing can make a meaningful difference in how you feel.",
        "Your feelings about this situation make complete sense given what you've been through. Let's work together to identify what you need right now and explore some options.",
        "Physical symptoms like headaches, muscle tension, and stomach discomfort are common manifestations of stress and anxiety. Your body and mind are closely connected, and addressing one often helps the other.",
        "Building resilience doesn't mean never feeling stressed or upset. It means developing the skills to bounce back from difficult experiences. Research shows that resilience can be strengthened over time with practice.",
        "Self-compassion isn't self-indulgence - research shows that treating yourself with the same kindness you'd offer a friend actually builds emotional resilience and motivation.",
        "It's important to recognize that recovery looks different for everyone. Comparing your journey to someone else's isn't helpful or accurate. What matters is finding what works for you.",
    ],
    "needs-revision": [
        "Anxiety is bad. You should try to relax more and think positive thoughts.",
        "Depression can be treated. Talk to someone about it.",
        "Sleep is important for mental health. Try to get more sleep.",
        "Stress management is key. Here are some tips.",
        "You need to change your negative thinking patterns to feel better.",
        "Mental health is important. Take care of yourself.",
        "Try these five steps to overcome your anxiety quickly.",
        "Breathing exercises can help. Try breathing in and out slowly.",
        "Some people find therapy helpful. Consider talking to a professional.",
        "Exercise is good for mental health. Try to be more active.",
        "Meditation can reduce stress. Download a meditation app and try it.",
        "Your mental health matters. Don't ignore the signs.",
        "Coping skills are important to develop. Practice them regularly.",
        "Social support helps with recovery. Reach out to friends and family.",
        "Mindfulness means paying attention to the present moment. Be mindful.",
    ],
    "potentially-harmful": [
        "You just need to snap out of it and stop feeling sorry for yourself. Other people have real problems.",
        "If you were stronger, you wouldn't be struggling with this. It's really a matter of willpower.",
        "Everyone feels sad sometimes - you're probably just being dramatic about it.",
        "You should be grateful for what you have. Other people have it much worse than you.",
        "Have you tried just not thinking about it? Sometimes you just need to push through.",
        "Your anxiety is probably because you're overthinking things. Just stop worrying so much.",
        "Depression is just a mindset. If you choose to be happy, you will be.",
        "You're probably just doing this for attention. Real mental illness looks different.",
        "If therapy and medication haven't worked, maybe you're just not trying hard enough.",
        "Stop using your mental health as an excuse. Everyone has problems.",
        "You need to toughen up. The world doesn't care about your feelings.",
        "Maybe if you spent less time feeling sorry for yourself and more time being productive, you'd feel better.",
        "Your parents didn't have the luxury of being anxious. They just dealt with it.",
        "You're letting your emotions control you. You need to be more rational about this.",
        "If you really wanted to get better, you would have by now.",
    ],
    "overly-clinical": [
        "The etiology of generalized anxiety disorder involves dysregulation of the amygdala-prefrontal cortex circuit, resulting in hyperactivation of threat detection mechanisms and insufficient top-down cognitive regulation of emotional responses.",
        "Cognitive restructuring involves systematic identification and modification of maladaptive automatic thoughts through Socratic questioning and behavioral experiments to test the validity of distorted cognitions.",
        "The hypothalamic-pituitary-adrenal axis mediates the neuroendocrine stress response through cortisol secretion, with chronic dysregulation associated with allostatic load and subsequent psychopathology.",
        "Dialectical behavior therapy integrates cognitive-behavioral interventions with mindfulness-based practices derived from Zen Buddhist traditions, emphasizing the dialectical balance between acceptance and change.",
        "Pharmacological management of treatment-resistant depression may involve augmentation strategies including lithium potentiation, thyroid hormone supplementation, or atypical antipsychotic adjunctive therapy.",
        "The biopsychosocial model posits that mental health outcomes are determined by the complex interaction of biological vulnerabilities, psychological processes, and socioeconomic factors within a systems-theoretical framework.",
        "Exposure and response prevention protocol requires systematic desensitization through graduated exposure hierarchy with concurrent inhibition of compulsive behavioral repertoires to facilitate habituation.",
        "Psychometric assessment utilizing validated instruments such as the PHQ-9, GAD-7, and PCL-5 provides quantitative baseline measurements and longitudinal outcome tracking for evidence-based treatment planning.",
        "Neurofeedback interventions targeting alpha-theta training protocols have demonstrated preliminary efficacy in modulating default mode network connectivity patterns associated with rumination.",
        "The therapeutic alliance, conceptualized through Bordin's tripartite model encompassing agreement on goals, consensus on tasks, and the affective bond, constitutes the strongest predictor of outcome.",
        "Metacognitive therapy addresses cognitive attentional syndrome through modification of maladaptive metacognitive beliefs about worry using attention training technique and detached mindfulness.",
        "Polyvagal theory postulates three hierarchically organized autonomic subsystems mediating social engagement, sympathetic mobilization, and dorsal vagal immobilization with implications for trauma.",
    ],
    "missing-validation": [
        "Cognitive distortions are thinking patterns that don't reflect reality accurately. The main types include all-or-nothing thinking, overgeneralization, and catastrophizing. To address them, keep a thought record.",
        "Here are the steps for progressive muscle relaxation: Tense each muscle group for 5-7 seconds, then relax for 15-20 seconds. Start with your feet and work upward.",
        "Sleep hygiene involves maintaining a consistent sleep schedule, avoiding screens before bed, keeping your bedroom cool and dark, limiting caffeine after noon, and exercising regularly.",
        "The 5-4-3-2-1 grounding technique works by identifying 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
        "Behavioral activation is where you schedule activities that give you a sense of accomplishment or pleasure, even when you don't feel motivated. Start with small activities.",
        "To manage panic attacks, remember the DARE technique: Defuse the anxious thought, Allow the anxiety, Run toward the sensation, and Engage in an activity.",
        "Exposure therapy involves gradually confronting feared situations in a controlled way. Create a hierarchy from least to most anxiety-provoking, then work through each step.",
        "The cognitive behavioral model of insomnia suggests that unhelpful beliefs about sleep maintain sleep difficulties. Cognitive restructuring can address these beliefs.",
        "Journaling benefits include improved emotional processing and reduced rumination. Write for 15-20 minutes daily about your thoughts and feelings.",
        "Assertive communication uses I-statements. The formula is: I feel [emotion] when [situation] because [reason]. I would like [request].",
        "Mindfulness meditation involves sitting quietly, focusing on your breath, and gently redirecting attention when the mind wanders. Start with 5 minutes daily.",
        "The stress bucket model explains that everyone has a limited capacity for stress. The key is to manage inputs and maintain outlets.",
    ],
}


def prepare_quality_data():
    print("\n--- Preparing Content Quality Data ---")

    # Try loading LLM-generated dataset first
    generated_path = WORKING_DIR / "datasets" / "content_quality.json"
    if not generated_path.exists():
        # Also check relative to this script (for local runs)
        generated_path = Path(__file__).parent / "datasets" / "content_quality.json" if "__file__" in dir() else generated_path

    if generated_path.exists():
        print(f"  Loading generated dataset from {generated_path}")
        with open(generated_path) as f:
            data = json.load(f)

        texts = [d["text"] for d in data]
        labels = [QUALITY_LABEL2ID[d["label"]] for d in data]
        print(f"  Loaded {len(texts)} LLM-labeled examples")

        # Report distribution
        for label_name in QUALITY_LABELS:
            count = sum(1 for d in data if d["label"] == label_name)
            print(f"    {label_name}: {count}")
    else:
        print("  No generated dataset found — using inline synthetic examples")
        print("  (Run generate_training_data.py first for better results)")
        texts, labels = [], []
        for label_name, examples in QUALITY_EXAMPLES.items():
            lid = QUALITY_LABEL2ID[label_name]
            for text in examples:
                texts.append(text)
                labels.append(lid)
            print(f"    {label_name}: {len(examples)}")

    ds = Dataset.from_dict({"text": texts, "label": labels}).shuffle(seed=42)
    n = len(ds)
    n_train = int(n * 0.70)
    n_val = int(n * 0.15)
    return ds.select(range(n_train)), ds.select(range(n_train, n_train+n_val)), ds.select(range(n_train+n_val, n))


# ══════════════════════════════════════════════════════════════════════════════
# 3. CONTENT ATOMIZATION CLASSIFIER
# ══════════════════════════════════════════════════════════════════════════════

ATOM_LABELS = [
    "standalone-blog-excerpt", "email-teaser", "social-snippet",
    "needs-full-context", "not-extractable",
]
ATOM_ID2LABEL = {i: l for i, l in enumerate(ATOM_LABELS)}
ATOM_LABEL2ID = {l: i for i, l in enumerate(ATOM_LABELS)}

ATOM_EXAMPLES = {
    "standalone-blog-excerpt": [
        "Sleep is one of the most underrated tools for mental health recovery. Research from the National Sleep Foundation shows that adults who consistently get 7-9 hours of sleep report significantly lower levels of anxiety and depression. The connection between sleep and emotional regulation is well-established: during deep sleep, your brain processes emotional experiences and consolidates coping strategies learned during the day. When sleep is disrupted, this processing is interrupted, leading to heightened emotional reactivity the following day. The good news is that sleep hygiene improvements often show results within two to three weeks of consistent practice.",
        "The relationship between physical movement and mood is one of the most robust findings in mental health research. Exercise triggers the release of endorphins, serotonin, and brain-derived neurotrophic factor, all of which play crucial roles in mood regulation. You don't need to run marathons to benefit. Studies consistently show that even 20 minutes of moderate walking can reduce anxiety symptoms by up to 20 percent. The key is consistency rather than intensity. Finding a form of movement you genuinely enjoy makes it far more likely you'll maintain the habit long-term.",
        "Social connection is a fundamental human need, not a luxury. Research found that chronic social isolation carries health risks comparable to smoking 15 cigarettes per day. For people managing anxiety or depression, social withdrawal often feels protective but actually worsens symptoms over time. The solution isn't forcing yourself into large social gatherings. Start small: a text to a friend, a brief coffee meetup, or joining an online community focused on shared interests. Quality of connection matters far more than quantity.",
        "Gratitude practice has moved from self-help cliche to evidence-based intervention. Neuroscience research shows that regularly noting things you're grateful for activates the brain's reward pathways and reduces activity in threat-detection regions. The key is specificity and genuine engagement rather than rote listing. Instead of writing 'I'm grateful for my family,' try 'I'm grateful that my sister called to check on me today when she noticed I seemed quiet.' This level of detail engages emotional processing more deeply.",
        "The gut-brain connection is reshaping how we understand mood and mental health. Your gut produces approximately 95 percent of the body's serotonin, a neurotransmitter critical for mood regulation. Research increasingly shows that the diversity of your gut microbiome directly influences emotional wellbeing. Simple dietary changes like increasing fiber intake, eating fermented foods, and reducing processed sugar can meaningfully impact both gut health and mental health within weeks.",
    ],
    "email-teaser": [
        "Did you know that the way you breathe directly affects your nervous system? Most people take 15-20 breaths per minute, but research shows that slowing to 6 breaths per minute activates your body's natural calming response.",
        "Have you ever noticed that your worst anxiety predictions rarely come true? Cognitive behavioral therapy calls this catastrophizing, and it's one of the most common thinking patterns that keeps anxiety alive.",
        "Most people think motivation comes before action, but research shows it's actually the other way around. Starting a task, even imperfectly, generates the motivation to continue.",
        "What if the key to better sleep isn't what you do at bedtime, but what you do when you first wake up? Morning light exposure within 30 minutes of waking sets your circadian rhythm for the entire day.",
        "One simple question can transform how you handle stressful thoughts: Is this thought a fact, or is it a story I'm telling myself? Learning to distinguish between the two is the foundation of cognitive behavioral therapy.",
    ],
    "social-snippet": [
        "Research shows that even 20 minutes of walking can reduce anxiety symptoms by up to 20 percent.",
        "Tip: The best time to practice a coping strategy is when you don't need one.",
        "Studies suggest that writing about your emotions for just 15 minutes can reduce stress hormones.",
        "Remember: Recovery isn't linear. A setback doesn't erase your progress.",
        "Fact: Your brain can't distinguish between a vividly imagined scenario and reality. That's why visualization works.",
        "The average person has over 6,000 thoughts per day. Not all of them deserve your attention.",
        "Research shows it takes 66 days on average to form a new habit, not 21.",
        "Naming your emotions reduces their intensity. Psychologists call this affect labeling.",
    ],
    "needs-full-context": [
        "As we discussed in the previous section, identifying your triggers is the first step. Now let's build on that foundation by creating your personal coping plan.",
        "Complete the following exercise using your thought record from the worksheet above.",
        "In step 3 of this activity, you'll apply the grounding technique we practiced earlier to a real scenario from your trigger list.",
        "Let's try this together. Using the exposure hierarchy you created in the previous lesson, select the item rated 3 out of 10.",
        "Refer to the mood tracking log you've been maintaining this week. Look for patterns in when your anxiety peaks.",
        "Building on the relaxation skills from Module 2, we'll now combine breathing with progressive muscle relaxation.",
        "Before continuing, make sure you've completed the self-assessment from the beginning of this course.",
        "Now that you understand the cognitive model from our earlier lesson, let's apply it to a specific situation you identified.",
    ],
    "not-extractable": [
        "| Situation | Thought | Emotion | Intensity | Alternative | New Intensity |\n|-----------|---------|---------|-----------|------------|---------------|",
        "```javascript\nconst breathingPattern = { inhale: 4, hold: 7, exhale: 8 };\n```",
        "<BreathingExercise pattern='4-7-8' duration={300} />",
        "<ThoughtRecord columns={['situation', 'thought', 'emotion', 'evidence-for', 'evidence-against']} />",
        "import { ExposureHierarchy } from '@/components/exercises'",
        "- Step 1: Rate anxiety (0-10)\n- Step 2: Identify trigger\n- Step 3: Apply technique\n- Step 4: Re-rate anxiety\n- Step 5: Record in log",
        "<LessonQuiz questions={quizData} passingScore={70} />",
        "export const metadata = { title: 'Understanding Anxiety', duration: '15 min', framework: 'CBT' }",
    ],
}


def prepare_atomization_data():
    print("\n--- Preparing Content Atomization Data ---")

    # Try loading LLM-generated dataset first
    generated_path = WORKING_DIR / "datasets" / "content_atomization.json"
    if not generated_path.exists():
        generated_path = Path(__file__).parent / "datasets" / "content_atomization.json" if "__file__" in dir() else generated_path

    if generated_path.exists():
        print(f"  Loading generated dataset from {generated_path}")
        with open(generated_path) as f:
            data = json.load(f)

        texts = [d["text"] for d in data]
        labels = [ATOM_LABEL2ID[d["label"]] for d in data]
        print(f"  Loaded {len(texts)} LLM-labeled examples")

        for label_name in ATOM_LABELS:
            count = sum(1 for d in data if d["label"] == label_name)
            print(f"    {label_name}: {count}")
    else:
        print("  No generated dataset found — using inline synthetic examples")
        print("  (Run generate_training_data.py first for better results)")
        texts, labels = [], []
        for label_name, examples in ATOM_EXAMPLES.items():
            lid = ATOM_LABEL2ID[label_name]
            for text in examples:
                texts.append(text)
                labels.append(lid)
            print(f"    {label_name}: {len(examples)}")

    ds = Dataset.from_dict({"text": texts, "label": labels}).shuffle(seed=42)
    n = len(ds)
    n_train = int(n * 0.70)
    n_val = int(n * 0.15)
    return ds.select(range(n_train)), ds.select(range(n_train, n_train+n_val)), ds.select(range(n_train+n_val, n))


# ══════════════════════════════════════════════════════════════════════════════
# RUN ALL TRAINING
# ══════════════════════════════════════════════════════════════════════════════

all_metrics = {}

# 1. Forum Topic
train_ds, val_ds, test_ds = prepare_forum_topic_data()
m = train_model("forum-topic", train_ds, val_ds, test_ds,
                num_labels=len(TOPIC_LABELS), id2label=TOPIC_ID2LABEL, label2id=TOPIC_LABEL2ID,
                epochs=3, batch_size=32)
all_metrics["forum-topic"] = m

# 2. Content Quality
train_ds, val_ds, test_ds = prepare_quality_data()
m = train_model("content-quality", train_ds, val_ds, test_ds,
                num_labels=len(QUALITY_LABELS), id2label=QUALITY_ID2LABEL, label2id=QUALITY_LABEL2ID,
                epochs=5, batch_size=8, learning_rate=3e-5)
all_metrics["content-quality"] = m

# 3. Content Atomization
train_ds, val_ds, test_ds = prepare_atomization_data()
m = train_model("content-atomization", train_ds, val_ds, test_ds,
                num_labels=len(ATOM_LABELS), id2label=ATOM_ID2LABEL, label2id=ATOM_LABEL2ID,
                epochs=5, batch_size=8, learning_rate=3e-5)
all_metrics["content-atomization"] = m

# ── Summary ──────────────────────────────────────────────────────────────────

print(f"\n\n{'='*60}")
print("ALL MODELS TRAINED SUCCESSFULLY")
print(f"{'='*60}\n")

for name, m in all_metrics.items():
    print(f"  {name}:")
    print(f"    Weighted F1: {m['weighted_f1']:.4f}")
    print(f"    Macro F1:    {m['macro_f1']:.4f}")
    print(f"    Time:        {m['training_minutes']:.1f} min")
    print()

print(f"Models saved to: {MODELS_DIR}/")
print(f"  {list(MODELS_DIR.iterdir())}")
print()
print("Next steps:")
print("  1. Download models/ from Kaggle output panel")
print("  2. scp -r models/ root@your-vps:/opt/maia/models/")
print("  3. Restart the Maia service")
