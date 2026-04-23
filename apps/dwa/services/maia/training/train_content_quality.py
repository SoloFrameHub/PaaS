"""
Train Content Quality Classifier
==================================
Scores therapeutic/educational text for clinical language quality.

Data strategy:
  - Positive examples (clinically-appropriate): Extracted from published CBT/DBT
    psychoeducation materials, APA guidelines, and the platform's own lessons
  - Negative examples: Synthetically generated to represent each failure mode

Labels (5):
  0: clinically-appropriate  — Validating, evidence-based, empathetic
  1: needs-revision          — Unclear, incomplete, or poorly structured
  2: potentially-harmful     — Invalidating, blaming, or triggering language
  3: overly-clinical         — Too technical for patient-facing content
  4: missing-validation      — Informative but lacks empathy/acknowledgment

Usage:
    cd services/maia
    python -m training.train_content_quality

Output:
    models/content-quality/  — fine-tuned model + metrics.json
"""

import random
from datasets import Dataset

from .base_trainer import BaseTrainer


QUALITY_LABELS = [
    "clinically-appropriate",
    "needs-revision",
    "potentially-harmful",
    "overly-clinical",
    "missing-validation",
]

ID2LABEL = {i: label for i, label in enumerate(QUALITY_LABELS)}
LABEL2ID = {label: i for i, label in enumerate(QUALITY_LABELS)}

# ── Synthetic Training Data ──────────────────────────────────────────────────
# Each category has representative examples that capture the pattern.
# In production, you'd expand this with LLM-generated examples and manual review.
# 200+ examples per category is the minimum for DistilBERT fine-tuning.

CLINICALLY_APPROPRIATE = [
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
    "Self-compassion isn't self-indulgence - research by Dr. Kristin Neff and others shows that treating yourself with the same kindness you'd offer a friend actually builds emotional resilience and motivation.",
    "It's important to recognize that recovery looks different for everyone. Comparing your journey to someone else's isn't helpful or accurate. What matters is finding what works for you.",
]

NEEDS_REVISION = [
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
]

POTENTIALLY_HARMFUL = [
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
]

OVERLY_CLINICAL = [
    "The etiology of generalized anxiety disorder involves dysregulation of the amygdala-prefrontal cortex circuit, resulting in hyperactivation of threat detection mechanisms and insufficient top-down cognitive regulation of emotional responses.",
    "Cognitive restructuring, a core component of Beck's cognitive therapy model, involves systematic identification and modification of maladaptive automatic thoughts through Socratic questioning and behavioral experiments to test the validity of distorted cognitions.",
    "The hypothalamic-pituitary-adrenal axis mediates the neuroendocrine stress response through cortisol secretion, with chronic dysregulation associated with allostatic load and subsequent psychopathology including major depressive disorder.",
    "Dialectical behavior therapy integrates cognitive-behavioral interventions with mindfulness-based practices derived from Zen Buddhist traditions, emphasizing the dialectical balance between acceptance and change across four skill modules.",
    "Pharmacological management of treatment-resistant depression may involve augmentation strategies including lithium potentiation, thyroid hormone supplementation, or atypical antipsychotic adjunctive therapy per STAR*D trial findings.",
    "The biopsychosocial model posits that mental health outcomes are determined by the complex interaction of biological vulnerabilities, psychological processes, and socioeconomic and cultural factors within a systems-theoretical framework.",
    "Exposure and response prevention protocol requires systematic desensitization through graduated exposure hierarchy with concurrent inhibition of compulsive behavioral repertoires to facilitate habituation and extinction learning.",
    "Psychometric assessment utilizing validated instruments such as the PHQ-9, GAD-7, and PCL-5 provides quantitative baseline measurements and longitudinal outcome tracking for evidence-based treatment planning.",
    "Neurofeedback-based interventions targeting alpha-theta training protocols have demonstrated preliminary efficacy in modulating default mode network connectivity patterns associated with rumination in depressive disorders.",
    "The therapeutic alliance, conceptualized through Bordin's tripartite model encompassing agreement on goals, consensus on tasks, and the affective bond, constitutes the strongest predictor of psychotherapeutic outcome across modalities.",
    "Metacognitive therapy addresses attentional bias and cognitive attentional syndrome through modification of maladaptive metacognitive beliefs about worry and rumination using attention training technique and detached mindfulness.",
    "Polyvagal theory postulates three hierarchically organized autonomic subsystems mediating social engagement, sympathetic mobilization, and dorsal vagal immobilization, with implications for understanding trauma-related dissociative phenomena.",
]

MISSING_VALIDATION = [
    "Cognitive distortions are thinking patterns that don't reflect reality accurately. The main types include all-or-nothing thinking, overgeneralization, mental filtering, and catastrophizing. To address them, keep a thought record where you write down the situation, your automatic thought, the cognitive distortion, and a more balanced alternative thought.",
    "Here are the steps for progressive muscle relaxation: Tense each muscle group for 5-7 seconds, then relax for 15-20 seconds. Start with your feet and work upward through your legs, abdomen, chest, arms, and face.",
    "Sleep hygiene involves maintaining a consistent sleep schedule, avoiding screens before bed, keeping your bedroom cool and dark, limiting caffeine after noon, and exercising regularly but not close to bedtime.",
    "The 5-4-3-2-1 grounding technique works by identifying 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This redirects attention to the present moment.",
    "Behavioral activation is a treatment approach where you schedule activities that give you a sense of accomplishment or pleasure, even when you don't feel motivated. Start with small, manageable activities and gradually increase difficulty.",
    "To manage panic attacks, remember the DARE technique: Defuse the anxious thought, Allow the anxiety to be present, Run toward the sensation rather than away, and Engage in an activity to redirect focus.",
    "Exposure therapy involves gradually confronting feared situations in a controlled way. Create a hierarchy from least to most anxiety-provoking, then work through each step systematically.",
    "The cognitive behavioral model of insomnia suggests that unhelpful beliefs about sleep, such as catastrophizing about the consequences of poor sleep, maintain sleep difficulties. Cognitive restructuring can address these beliefs.",
    "Journaling benefits include improved emotional processing, reduced rumination, and better self-awareness. Write for 15-20 minutes daily about your thoughts and feelings. Use prompts if you're unsure what to write.",
    "Assertive communication uses I-statements instead of you-statements. The formula is: 'I feel [emotion] when [situation] because [reason]. I would like [request].' Practice in low-stakes situations first.",
    "Mindfulness meditation involves sitting quietly, focusing on your breath, and gently redirecting attention when the mind wanders. Start with 5 minutes daily and gradually increase the duration.",
    "The stress bucket model explains that everyone has a limited capacity for stress. When your bucket overflows, you experience symptoms. The key is to manage inputs (stressors) and maintain outlets (coping strategies).",
]


def build_dataset():
    """Build labeled dataset from synthetic examples."""
    examples = {
        "clinically-appropriate": CLINICALLY_APPROPRIATE,
        "needs-revision": NEEDS_REVISION,
        "potentially-harmful": POTENTIALLY_HARMFUL,
        "overly-clinical": OVERLY_CLINICAL,
        "missing-validation": MISSING_VALIDATION,
    }

    texts, labels = [], []
    for label_name, example_list in examples.items():
        label_id = LABEL2ID[label_name]
        for text in example_list:
            texts.append(text)
            labels.append(label_id)

    return Dataset.from_dict({"text": texts, "label": labels})


class ContentQualityTrainer(BaseTrainer):
    name = "content-quality"
    num_labels = len(QUALITY_LABELS)
    id2label = ID2LABEL
    label2id = LABEL2ID
    output_subdir = "content-quality"
    epochs = 5  # More epochs for small dataset
    batch_size = 8  # Smaller batch for small dataset
    learning_rate = 3e-5  # Slightly higher LR for small dataset

    def load_datasets(self):
        print("Building content quality dataset from synthetic examples...")
        ds = build_dataset()
        ds = ds.shuffle(seed=42)

        # 70/15/15 split
        n = len(ds)
        n_train = int(n * 0.70)
        n_val = int(n * 0.15)

        train_ds = ds.select(range(n_train))
        val_ds = ds.select(range(n_train, n_train + n_val))
        test_ds = ds.select(range(n_train + n_val, n))

        return train_ds, val_ds, test_ds


if __name__ == "__main__":
    trainer = ContentQualityTrainer()
    trainer.train()
