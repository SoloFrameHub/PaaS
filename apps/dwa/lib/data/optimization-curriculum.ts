import { Track } from '@/types/course';

/**
 * Optimization School Curriculum — Five Pillars of Human Performance
 *
 * Distribution model: Practice licensing + revenue share
 * Target: Clinical + optimization TAM (mental health treatment + peak performance)
 * Evidence: Research-backed with clear evidence grading (STRONG, MODERATE, EMERGING)
 */

export const OPTIMIZATION_CURRICULUM: Track[] = [
    // ─── Pillar 1: Physical Vitality & Movement ─────────────────────────────
    {
        id: 'physical-vitality',
        title: 'Physical Vitality & Movement',
        description: 'Evidence-based exercise protocols for mental health, cognitive performance, and stress resilience. Combines neuroscience, behavioral activation, and practical movement strategies.',
        magnetComponent: 'M', // Movement/Mood
        courses: [
            {
                id: 'movement-for-mental-performance',
                title: 'Movement for Mental Performance',
                number: 1,
                description: 'The neuroscience and practice of exercise as mental health intervention. Learn how movement affects brain chemistry, reduces depression and anxiety, improves sleep and cognition, and builds psychological resilience.',
                duration: '8-10 hours',
                evidenceBadge: 'BMJ 2024 / Cochrane 2026',
                clinicalFramework: 'Exercise Science + Behavioral Activation',
                outcomes: [
                    'Understand how exercise increases BDNF and promotes neuroplasticity',
                    'Learn evidence-graded protocols for depression (STRONG), anxiety (MODERATE), and sleep (STRONG)',
                    'Distinguish evidence-supported claims from marketing overstatements',
                    'Apply exercise modalities: aerobic, resistance, yoga, HIIT, team sports, dance',
                    'Recognize when exercise is NOT sufficient as standalone treatment (severe symptoms, suicidality)',
                    'Build sustainable exercise habits using adherence strategies and self-efficacy techniques',
                    'Create a personalized movement medicine plan based on WHO guidelines (150-300 min/week)',
                    'Integrate movement tracking, nutrition synergy, and circadian optimization'
                ],
                lessons: [
                    {
                        id: '1',
                        title: 'The Science of Exercise as Medicine',
                        duration: '25 min'
                    },
                    {
                        id: '2',
                        title: 'Depression and the Movement Prescription',
                        duration: '30 min'
                    },
                    {
                        id: '3',
                        title: 'Anxiety Disorders and Movement Therapy',
                        duration: '30 min'
                    },
                    {
                        id: '4',
                        title: 'PTSD and Trauma-Informed Movement',
                        duration: '25 min'
                    },
                    {
                        id: '5',
                        title: 'ADHD and Movement-Based Focus Enhancement',
                        duration: '25 min'
                    },
                    {
                        id: '6',
                        title: 'Building Your Personal Movement Assessment',
                        duration: '30 min'
                    },
                    {
                        id: '7',
                        title: 'The Neuroscience of Movement and Mood',
                        duration: '30 min'
                    },
                    {
                        id: '8',
                        title: 'Cardio for Mental Clarity and Emotional Regulation',
                        duration: '25 min'
                    },
                    {
                        id: '9',
                        title: 'Strength Training for Self-Esteem and Resilience',
                        duration: '25 min'
                    },
                    {
                        id: '10',
                        title: 'Yoga and Mindful Movement for Mental Health',
                        duration: '30 min'
                    },
                    {
                        id: '11',
                        title: 'High-Intensity Interval Training (HIIT) for Mental Toughness',
                        duration: '25 min'
                    },
                    {
                        id: '12',
                        title: 'Team Sports and Social Connection Through Movement',
                        duration: '25 min'
                    },
                    {
                        id: '13',
                        title: 'Individual Sport Psychology and Personal Growth',
                        duration: '25 min'
                    },
                    {
                        id: '14',
                        title: 'Dance and Creative Movement Therapy',
                        duration: '25 min'
                    },
                    {
                        id: '15',
                        title: 'Outdoor Exercise and Nature\'s Mental Health Benefits',
                        duration: '25 min'
                    },
                    {
                        id: '16',
                        title: 'Creating Sustainable Exercise Habits',
                        duration: '30 min'
                    },
                    {
                        id: '17',
                        title: 'Exercise for Sleep and Circadian Rhythm Optimization',
                        duration: '30 min'
                    },
                    {
                        id: '18',
                        title: 'Nutrition and Exercise Synergy for Mental Health',
                        duration: '25 min'
                    },
                    {
                        id: '19',
                        title: 'Technology and Exercise Tracking for Mental Health',
                        duration: '25 min'
                    },
                    {
                        id: '20',
                        title: 'Building Your Personal Movement Medicine Plan',
                        duration: '35 min'
                    }
                ]
            },
            {
                id: 'workplace-mental-health',
                title: 'Workplace Mental Health: Thriving in Your Career',
                number: 2,
                description: 'Evidence-based strategies for navigating occupational stress, burnout, and workplace culture. Learn to recognize structural vs. individual causes, develop boundary-setting skills, and advocate for organizational change.',
                duration: '8-10 hours',
                evidenceBadge: 'JD-R Model / Oxford 2024',
                clinicalFramework: 'Job Demands-Resources + CBT',
                outcomes: [
                    'Understand occupational stress models: Job Demands-Resources (JD-R), Demand-Control, and Effort-Reward Imbalance',
                    'Recognize burnout\'s three dimensions (exhaustion, cynicism, reduced efficacy) and distinguish it from clinical depression',
                    'Identify structural drivers of workplace mental health: workload, autonomy, manager behavior, psychological safety climate',
                    'Develop evidence-based boundary-setting and work-life integration strategies',
                    'Apply CBT-informed stress skills (cognitive reframing, behavioral coping, thought monitoring)',
                    'Understand the limits of individual interventions vs. organizational responsibility',
                    'Know when to escalate to professional help (severe burnout, suicidality, harassment, MDD)',
                    'Navigate help-seeking and workplace disclosure decisions'
                ],
                lessons: [
                    {
                        id: '1',
                        title: 'Job Demands-Resources Model: Understanding Demands',
                        duration: '25 min'
                    },
                    {
                        id: '2',
                        title: 'Job Demands-Resources Model: Building Resources',
                        duration: '25 min'
                    },
                    {
                        id: '3',
                        title: 'What Burnout Is: WHO Classification and Three Dimensions',
                        duration: '30 min'
                    },
                    {
                        id: '4',
                        title: 'Burnout vs. Depression: Critical Distinctions',
                        duration: '30 min'
                    },
                    {
                        id: '5',
                        title: 'The Demand-Control Model: Autonomy as a Buffer',
                        duration: '25 min'
                    },
                    {
                        id: '6',
                        title: 'Effort-Reward Imbalance: When Work Violates Reciprocity',
                        duration: '25 min'
                    },
                    {
                        id: '7',
                        title: 'Workload: The Primary Structural Driver',
                        duration: '25 min'
                    },
                    {
                        id: '8',
                        title: 'Toxic Leadership and Psychological Safety Climate',
                        duration: '25 min'
                    },
                    {
                        id: '9',
                        title: 'Anti-Bullying and Harassment: Organizational Response',
                        duration: '25 min'
                    },
                    {
                        id: '10',
                        title: 'Staffing and Resource Allocation: Systemic Issues',
                        duration: '25 min'
                    },
                    {
                        id: '11',
                        title: 'Work-Life Boundaries: Theory and Practice',
                        duration: '30 min'
                    },
                    {
                        id: '12',
                        title: 'CBT-Informed Stress Skills: Cognitive Reframing',
                        duration: '30 min'
                    },
                    {
                        id: '13',
                        title: 'Behavioral Coping and Activation Strategies',
                        duration: '25 min'
                    },
                    {
                        id: '14',
                        title: 'Communication Skills for Workplace Mental Health',
                        duration: '25 min'
                    },
                    {
                        id: '15',
                        title: 'Assertiveness and Workload Conversations',
                        duration: '25 min'
                    },
                    {
                        id: '16',
                        title: 'Mindfulness at Work: Evidence, Scope, and Limits',
                        duration: '25 min'
                    },
                    {
                        id: '17',
                        title: 'Healthcare Workers and Moral Injury',
                        duration: '30 min'
                    },
                    {
                        id: '18',
                        title: 'Remote Workers, Parents, and Early-Career Professionals',
                        duration: '30 min'
                    },
                    {
                        id: '19',
                        title: 'Building Your Workplace Mental Health Assessment',
                        duration: '30 min'
                    },
                    {
                        id: '20',
                        title: 'When to Seek Help: Comprehensive Escalation Guide',
                        duration: '35 min'
                    }
                ]
            },
            {
                id: 'recreational-therapy',
                title: 'Recreational Therapy: The Science of Play',
                number: 16,
                description: 'Evidence-based recreational interventions: exercise, nature, horticulture, social recreation, leisure, and play for mental health. Learn multi-pathway mechanisms, distinguish licensed RT from informal play, and build occupational balance with sustainable leisure habits.',
                duration: '10-12 hours',
                evidenceBadge: 'Umbrella Review 1039 RCTs / Meta-Analysis 17 Studies',
                clinicalFramework: 'Licensed RT + Multi-Pathway Leisure Framework + Occupational Balance',
                outcomes: [
                    'Understand multi-pathway mechanisms of recreational interventions (behavioral, psychological, social, cognitive, biological)',
                    'Apply evidence-based practices: exercise (STRONG), nature exposure (STRONG), horticultural therapy (MODERATE), social recreation (STRONG)',
                    'Distinguish licensed recreational therapy (CTRS) from informal play and recreation',
                    'Learn flow theory, attention restoration theory, and Broaden-and-Build framework',
                    'Recognize when recreation is NOT sufficient as standalone treatment (adjunctive, not replacement)',
                    'Build occupational balance and sustainable leisure habits across multiple domains',
                    'Create personalized recreation plan with goal-setting, barrier solutions, and implementation strategies'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Recreational Therapy — An Evidence-Based Introduction', duration: '30 min' },
                    { id: '2', title: 'Childhood Play Patterns — Understanding Your Recreational History', duration: '30 min' },
                    { id: '3', title: 'Types of Play — Finding Your Recreational Sweet Spot', duration: '25 min' },
                    { id: '4', title: 'The Play-Stress Connection — Nervous System Regulation Through Recreation', duration: '30 min' },
                    { id: '5', title: 'Breaking Through Play Resistance — Overcoming Barriers', duration: '30 min' },
                    { id: '6', title: 'Solitary Play — Enjoying Your Own Company', duration: '30 min' },
                    { id: '7', title: 'Social Play — Building Connections Through Joy', duration: '30 min' },
                    { id: '8', title: 'Creative Expression — Art, Music, and Movement', duration: '30 min' },
                    { id: '9', title: 'Nature-Based Recreation — Ecotherapy and Healing', duration: '30 min' },
                    { id: '10', title: 'Games and Puzzles — Cognitive Play', duration: '25 min' },
                    { id: '11', title: 'Physical Play — Movement and Embodied Joy', duration: '30 min' },
                    { id: '12', title: 'Humor and Laughter — The Medicine of Joy', duration: '25 min' },
                    { id: '13', title: 'Digital Play — Healthy Gaming and Online Recreation', duration: '30 min' },
                    { id: '14', title: 'Seasonal and Ritual Play — Meaningful Celebrations', duration: '25 min' },
                    { id: '15', title: 'Adventure and Risk Play — Healthy Thrill-Seeking', duration: '30 min' },
                    { id: '16', title: 'Collector Play — Hobbies and Specialized Interests', duration: '30 min' },
                    { id: '17', title: 'Competitive Play — Healthy Competition', duration: '30 min' },
                    { id: '18', title: 'Intergenerational Play — Connecting Across Ages', duration: '30 min' },
                    { id: '19', title: 'Recovery-Focused Recreation — Play in Treatment', duration: '35 min' },
                    { id: '20', title: 'Creating Your Personalized Recreation Plan', duration: '40 min' }
                ]
            },
            {
                id: 'music-movement-wellness',
                title: 'Music & Movement Wellness',
                number: 19,
                description: 'Evidence-based music therapy and movement interventions for mental health. Learn neuroscience of music-brain interactions, practical protocols for mood regulation, sleep support, anxiety reduction, and emotional expression through sound and movement.',
                duration: '10-12 hours',
                evidenceBadge: 'Music Med 2016 / Meta-Analysis 2022',
                clinicalFramework: 'Music Therapy + Dance/Movement Therapy + Neuroscience',
                outcomes: [
                    'Understand how music affects brain structure, neurotransmitters (dopamine, serotonin), and emotional regulation systems',
                    'Learn evidence-graded music interventions: depression (MODERATE), anxiety (MODERATE-STRONG), sleep (MODERATE), PTSD (EMERGING)',
                    'Apply iso principle for mood regulation — match current state, then gradually shift toward desired state',
                    'Master music selection strategies: tempo (BPM), structure, timbre, familiarity, and lyrical content for different mental health goals',
                    'Practice vocalization techniques (singing, toning, humming) for vagal tone activation and emotional expression',
                    'Learn movement meditation (qigong, mindful walking, dance) for body awareness and anxiety reduction',
                    'Apply trauma-informed principles: safety, choice, pacing, grounding, boundaries when using music and movement',
                    'Build sustainable personal music and movement practice with goal-practice mapping, habit stacking, and barrier troubleshooting',
                    'Understand when to seek professional music therapy (MT-BC) or dance/movement therapy (BC-DMT) for clinical conditions'
                ],
                lessons: [
                    { id: '1', title: 'The Neuroscience of Music and Mental Health', duration: '30 min' },
                    { id: '2', title: 'Music for Depression — Evidence and Application', duration: '30 min' },
                    { id: '3', title: 'Music for Anxiety and Stress Reduction', duration: '30 min' },
                    { id: '4', title: 'The Iso Principle — Music-Assisted Mood Regulation', duration: '25 min' },
                    { id: '5', title: 'Music Selection Strategies — Tempo, Structure, and Timbre', duration: '30 min' },
                    { id: '6', title: 'Lyrical Content and Personal Meaning in Music', duration: '25 min' },
                    { id: '7', title: 'Creating Personalized Playlists for Mental Health', duration: '30 min' },
                    { id: '8', title: 'Singing and Vocalization for Emotional Regulation', duration: '25 min' },
                    { id: '9', title: 'Rhythm, Drumming, and Percussion Therapy', duration: '30 min' },
                    { id: '10', title: 'Cultural Perspectives on Music Healing', duration: '30 min' },
                    { id: '11', title: 'Movement Meditation and Body Awareness', duration: '30 min' },
                    { id: '12', title: 'Dance and Expressive Movement for Mental Health', duration: '30 min' },
                    { id: '13', title: 'Music for Sleep and Relaxation', duration: '30 min' },
                    { id: '14', title: 'Trauma-Informed Music and Movement Practice', duration: '30 min' },
                    { id: '15', title: 'Technology and Apps for Music Therapy', duration: '30 min' },
                    { id: '16', title: 'Building a Personal Music and Movement Practice', duration: '35 min' },
                    { id: '17', title: 'Group Facilitation Skills for Music and Movement', duration: '30 min' },
                    { id: '18', title: 'Music and Movement Across the Lifespan', duration: '30 min' },
                    { id: '19', title: 'Advanced Techniques and Specialized Populations', duration: '35 min' },
                    { id: '20', title: 'Integration and Sustainable Practice', duration: '45 min' }
                ]
            }
            // Future courses: Recovery & Regeneration, Nutrition Essentials, Sleep Optimization, etc.
        ]
    },

    // ─── Pillar 2: Social Connection & Community ─────────────────────────────
    {
        id: 'social-connection',
        title: 'Social Connection & Community',
        description: 'Build meaningful relationships, overcome isolation, and leverage community for wellbeing. Evidence-based strategies from attachment theory, social neuroscience, and loneliness research.',
        magnetComponent: 'S', // Social
        courses: [
            {
                id: 'social-circle-mastery',
                title: 'Social Circle Mastery: Building Meaningful Connections',
                number: 8,
                description: 'Evidence-based strategies for overcoming loneliness, building authentic friendships, and navigating social anxiety. Learn CBT for maladaptive social cognition, friendship formation science, rejection recovery, and connection engineering—with critical safety boundaries for clinical Social Anxiety Disorder.',
                duration: '8-10 hours',
                evidenceBadge: 'APA 2024 / Surgeon General 2023',
                clinicalFramework: 'CBT + Loneliness Research + Friendship Science',
                outcomes: [
                    'Understand loneliness as a public health crisis (HR=1.14 mortality risk, comparable to smoking 15 cigarettes/day)',
                    'Distinguish shyness/subclinical social anxiety from clinical Social Anxiety Disorder (SAD) — know when professional help is required',
                    'Master CBT for maladaptive social cognition — the highest-evidence approach for loneliness reduction (SMD=-0.50)',
                    'Learn evidence-based friendship formation principles: proximity effect, reciprocal self-disclosure, repeated interaction',
                    'Develop active listening, presence, and conversational depth skills (Aron et al. paradigm)',
                    'Practice strategic vulnerability and authentic sharing without oversharing',
                    'Apply rejection recovery skills: attribution flexibility, Walton & Cohen "common and transient" reframing, behavioral re-engagement',
                    'Engineer social opportunities using shared-context activities, transition windows, and repeated interaction',
                    'Navigate friendship maintenance, conflict resolution, and healthy endings',
                    'Build a personalized connection action plan with barrier assessment and 4-week milestones'
                ],
                lessons: [
                    { id: '1', title: 'The Science of Social Connection — Why Relationships Matter for Your Health', duration: '30 min' },
                    { id: '2', title: 'Your Attachment Style & Relationship Patterns', duration: '30 min' },
                    { id: '3', title: 'Quality vs. Quantity — Understanding Dunbar\'s Number & Relationship Layers', duration: '25 min' },
                    { id: '4', title: 'Barriers to Connection & Overcoming Obstacles', duration: '30 min' },
                    { id: '5', title: 'The Power of Vulnerability — Building Deep Connections Through Authenticity', duration: '30 min' },
                    { id: '6', title: 'Active Listening & Presence — The Foundation of Deep Connection', duration: '30 min' },
                    { id: '7', title: 'Nonviolent Communication — The 4-Part Framework for Compassionate Connection', duration: '25 min' },
                    { id: '8', title: 'Emotion Regulation in Social Situations — Staying Grounded Under Pressure', duration: '25 min' },
                    { id: '9', title: 'Networking vs. Genuine Connection — The Power of Authenticity', duration: '25 min' },
                    { id: '10', title: 'Social Skills for Introverts — Energy Management & One-on-One Strengths', duration: '25 min' },
                    { id: '11', title: 'Initiating Contact & Joining Groups — Graduated Exposure for Social Confidence', duration: '30 min' },
                    { id: '12', title: 'Handling Rejection & Building Resilience — The Neuroscience of Social Pain', duration: '30 min' },
                    { id: '13', title: 'Group Dynamics & Navigating Social Settings — Understanding Social Identity Theory', duration: '25 min' },
                    { id: '14', title: 'Conflict Resolution in Relationships — Connection Before Solution', duration: '30 min' },
                    { id: '15', title: 'Professional vs. Personal Relationships — Navigating Dual Relationships', duration: '25 min' },
                    { id: '16', title: 'Modern Social Etiquette — Navigating Digital and In-Person Connection', duration: '25 min' },
                    { id: '17', title: 'Maintaining Long-Distance Friendships — Connection Across Distance', duration: '25 min' },
                    { id: '18', title: 'Seasonal Friendships & Letting Go — Honoring All Relationship Seasons', duration: '30 min' },
                    { id: '19', title: 'Community Building & Belonging — Creating Your Tribe', duration: '30 min' },
                    { id: '20', title: 'Long-Term Relationship Maintenance + Your Connection Action Plan', duration: '40 min' }
                ]
            },
            {
                id: 'team-sports-collective-activity',
                title: 'Team Sports & Collective Activity for Mental Health',
                number: 9,
                description: 'Evidence-based psychoeducation on the mental health benefits of collective physical activity, team sports, and group-based participation. Learn the Social Cure framework, recreational vs. competitive sport distinctions, and how to find psychologically safe group activities.',
                duration: '11-15 hours',
                evidenceBadge: 'Systematic Review 29 Studies / Social Cure Framework',
                clinicalFramework: 'Social Cure + Sport Psychology + Community Health',
                outcomes: [
                    'Understand the Social Cure framework: how meaningful group membership produces mental health benefits through belonging, identity, support, and purpose',
                    'Learn why team sport reduces loneliness risk by 30% (individual sport shows NO protective effect)',
                    'Recognize the CRITICAL recreational vs. competitive sport distinction — benefits vs. risks',
                    'Identify toxic team culture red flags and when to leave unsafe environments',
                    'Understand youth sport mental health: 70-80% dropout by age 15 due to psychological factors',
                    'Learn about access barriers and who gets excluded from team sport participation',
                    'Explore non-sport collective activities: volunteering, clubs, community groups, social prescribing',
                    'Recognize exercise compulsion warning signs and when professional help is needed',
                    'Create a personalized connection plan for sustainable collective activity participation'
                ],
                lessons: [
                    { id: '1', title: 'Why Collective Activity — The Social Cure', duration: '40 min' },
                    { id: '2', title: 'The Evidence — What Research Shows', duration: '45 min' },
                    { id: '3', title: 'The Critical Distinction — Recreational vs. Competitive Sport', duration: '45 min' },
                    { id: '4', title: 'Mechanisms — How Collective Activity Works', duration: '40 min' },
                    { id: '5', title: 'Team Sports for Mental Health', duration: '35 min' },
                    { id: '6', title: 'Group Exercise Classes and Fitness Communities', duration: '35 min' },
                    { id: '7', title: 'Volunteering for Mental Health', duration: '35 min' },
                    { id: '8', title: 'Clubs, Classes, and Community Groups', duration: '35 min' },
                    { id: '9', title: 'Social Prescribing and Community Pathways', duration: '30 min' },
                    { id: '10', title: 'Spectating, Fandom, and Collective Experiences', duration: '30 min' },
                    { id: '11', title: 'Dance, Music, and Creative Movement Communities', duration: '30 min' },
                    { id: '12', title: 'Online and Hybrid Collective Activity', duration: '30 min' },
                    { id: '13', title: 'Youth and Adolescent Perspectives', duration: '40 min' },
                    { id: '14', title: 'Access, Inclusion, and Who Gets Left Out', duration: '40 min' },
                    { id: '15', title: 'Protecting Mental Health in Sport — Toxic Environments', duration: '40 min' },
                    { id: '16', title: 'Exercise Compulsion and Knowing Your Limits', duration: '35 min' },
                    { id: '17', title: 'Overcoming Barriers to Participation', duration: '40 min' },
                    { id: '18', title: 'Finding and Joining Communities', duration: '35 min' },
                    { id: '19', title: 'Sustaining Participation Over Time', duration: '35 min' },
                    { id: '20', title: 'Your Personal Connection Plan', duration: '45 min' }
                ]
            },
            {
                id: 'relationship-dynamics',
                title: 'Relationship Dynamics: Thriving in Romantic Partnerships',
                number: 10,
                description: 'Evidence-based psychoeducation on romantic relationships. Learn the science of attachment, love, and connection — what works, what doesn\'t, and when to seek professional help. Designed for safe relationships only; includes IPV screening and safety routing.',
                duration: '10-12 hours',
                evidenceBadge: 'Meta-Analysis 132 Studies / EFT d=0.93',
                clinicalFramework: 'Attachment Theory + EFT Principles + Communication Skills',
                outcomes: [
                    'Understand attachment theory dimensions (anxiety/avoidance) without labeling or determinism',
                    'Learn what the science actually shows about love biology — not neuroscience overselling',
                    'Develop evidence-based communication skills (active listening, validation, I-statements)',
                    'Recognize solvable vs. perpetual problems and how to manage both types',
                    'Apply conflict de-escalation strategies (repair attempts, physiological self-soothing, softened startup)',
                    'Understand emotion regulation and co-regulation in partnership',
                    'Recognize when relationship skills work vs. when professional help is needed',
                    'Distinguish healthy conflict from intimate partner violence and coercive control (safety-critical)',
                    'Build a sustainable relationship practice based on daily small positive behaviors'
                ],
                lessons: [
                    {
                        id: '1',
                        title: 'What Is a Healthy Relationship? The Science Behind Satisfaction',
                        duration: '35 min'
                    },
                    {
                        id: '2',
                        title: 'The Relationship-Health Bidirectional Link',
                        duration: '30 min'
                    },
                    {
                        id: '3',
                        title: 'Introduction to Attachment Theory',
                        duration: '30 min'
                    },
                    {
                        id: '4',
                        title: 'Attachment Anxiety and Avoidance Dimensions',
                        duration: '35 min'
                    },
                    {
                        id: '5',
                        title: 'Your Attachment Patterns (Self-Assessment, NOT Labeling)',
                        duration: '30 min'
                    },
                    {
                        id: '6',
                        title: 'Attachment and Childhood: Developmental Pathways',
                        duration: '30 min'
                    },
                    {
                        id: '7',
                        title: 'Can Attachment Patterns Change?',
                        duration: '25 min'
                    },
                    {
                        id: '8',
                        title: 'Using Attachment Awareness Without Judgment',
                        duration: '25 min'
                    },
                    {
                        id: '9',
                        title: 'The Biology and Psychology of Love (NOT "Neuroscience")',
                        duration: '35 min'
                    },
                    {
                        id: '10',
                        title: 'Early Love: Dopamine and the Reward System',
                        duration: '30 min'
                    },
                    {
                        id: '11',
                        title: 'Long-Term Love: From Intensity to Security',
                        duration: '30 min'
                    },
                    {
                        id: '12',
                        title: 'Communication Skills That Work (and Their Limits)',
                        duration: '35 min'
                    },
                    {
                        id: '13',
                        title: 'Active Listening and Validation',
                        duration: '30 min'
                    },
                    {
                        id: '14',
                        title: 'Building Communication Maintenance Habits',
                        duration: '25 min'
                    },
                    {
                        id: '15',
                        title: 'Solvable vs. Perpetual Problems',
                        duration: '30 min'
                    },
                    {
                        id: '16',
                        title: 'The Four Horsemen (with Gottman Caveats)',
                        duration: '35 min'
                    },
                    {
                        id: '17',
                        title: 'Repair Attempts and Physiological Self-Soothing',
                        duration: '30 min'
                    },
                    {
                        id: '18',
                        title: 'Emotion Regulation and Co-Regulation in Partnership',
                        duration: '35 min'
                    },
                    {
                        id: '19',
                        title: 'Trust, Reliability, and Repair After Rupture',
                        duration: '30 min'
                    },
                    {
                        id: '20',
                        title: 'Building Your Sustainable Relationship Practice',
                        duration: '35 min'
                    }
                ]
            },
            {
                id: 'family-parenting-mental-health',
                title: 'Family & Parenting Mental Health',
                number: 11,
                description: 'Evidence-based psychoeducation on family mental health systems, attachment-based parenting, and supporting children\'s emotional wellbeing. Learn how parental mental health affects children, emotion coaching, trauma-informed parenting, and when to seek professional help—with clear safety boundaries for child protection and crisis intervention.',
                duration: '10-12 hours',
                evidenceBadge: 'Lancet 2024 / WHO Guidelines 2023',
                clinicalFramework: 'Attachment Theory + Family Systems + Emotion Coaching',
                outcomes: [
                    'Understand bidirectional relationship between parental and child mental health—why parent self-care is essential parenting work',
                    'Learn attachment theory applications: secure base, emotion coaching, co-regulation, and repair after ruptures',
                    'Recognize developmental mental health needs across lifespan—infancy through adolescence',
                    'Implement evidence-based parenting strategies: emotion validation, warm structure, consistent routines, connection before correction',
                    'Support children through anxiety, depression, behavioral challenges, trauma, substance use, and neurodevelopmental differences',
                    'Navigate adolescent mental health: autonomy vs. connection balance, warning signs, self-harm and suicide response',
                    'Address family-specific challenges: screen time, cultural considerations, financial stress, co-parenting conflict, blended families',
                    'Recognize when professional help is essential vs. when self-guided strategies are sufficient',
                    'Understand parental burnout distinction from normal stress and when it requires clinical intervention',
                    'Create comprehensive family mental health action plan with crisis preparedness and sustainable implementation system'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Family Mental Health Systems', duration: '30 min' },
                    { id: '2', title: 'Attachment Styles and Family Dynamics', duration: '35 min' },
                    { id: '3', title: 'Developmental Mental Health Across the Lifespan', duration: '35 min' },
                    { id: '4', title: 'Creating Emotional Safety in the Home', duration: '40 min' },
                    { id: '5', title: 'Communication Strategies for Mental Health Conversations', duration: '35 min' },
                    { id: '6', title: 'Recognizing Warning Signs and Red Flags', duration: '35 min' },
                    { id: '7', title: 'Supporting Children Through Anxiety and Depression', duration: '35 min' },
                    { id: '8', title: 'Understanding and Managing Behavioral Challenges', duration: '30 min' },
                    { id: '9', title: 'How Your Mental Health Impacts Your Child', duration: '35 min' },
                    { id: '10', title: 'Building Resilience and Coping Skills in Children', duration: '35 min' },
                    { id: '11', title: 'Family Therapy and When to Seek Professional Help', duration: '35 min' },
                    { id: '12', title: 'Screen Time, Technology, and Digital Wellness for Families', duration: '35 min' },
                    { id: '13', title: 'Trauma-Informed Parenting and Healing', duration: '30 min' },
                    { id: '14', title: 'Substance Use, Addiction, and Family Mental Health', duration: '30 min' },
                    { id: '15', title: 'Cultural Considerations in Family Mental Health', duration: '30 min' },
                    { id: '16', title: 'Financial Stress and Its Impact on Family Mental Health', duration: '35 min' },
                    { id: '17', title: 'Parenting Adolescents: Connection in the Teen Years', duration: '35 min' },
                    { id: '18', title: 'Supporting Neurodivergent Children and Special Needs', duration: '35 min' },
                    { id: '19', title: 'Co-Parenting and Blended Families', duration: '35 min' },
                    { id: '20', title: 'Your Family Mental Health Action Plan', duration: '50 min' }
                ]
            },
            // Course 12: Overcoming Loneliness and Social Anxiety
            // Course 13: Communication Skills for Connection
            // Course 14: Building and Nurturing Community
        ]
    },

    // ─── Pillar 3: Mental Clarity & Cognitive Performance ─────────────────────────────
    {
        id: 'mental-clarity',
        title: 'Mental Clarity & Cognitive Performance',
        description: 'Optimize focus, memory, decision-making, and creative problem-solving. Neuroscience-backed protocols for attention training, cognitive load management, and peak mental performance.',
        magnetComponent: 'M', // Mental
        courses: [
            {
                id: 'digital-wellness',
                title: 'Digital Wellness: Managing Technology\'s Impact on Mental Health',
                number: 3,
                description: 'Evidence-based strategies for healthy technology use. Learn the science of screens and sleep, attention management, social media literacy, and how to build intentional digital habits without fearmongering or oversimplification.',
                duration: '8-10 hours',
                evidenceBadge: 'JMIR 2024 / Karolinska 2023',
                clinicalFramework: 'Digital Psychology + Media Literacy',
                outcomes: [
                    'Understand the circadian biology of blue light and melatonin suppression (STRONG evidence)',
                    'Learn the intentional vs. passive use distinction — quality of engagement predicts wellbeing more than screen time',
                    'Develop digital mental health literacy skills to evaluate online content and misinformation',
                    'Apply evidence-based strategies: notification management, content curation, boundary-setting',
                    'Recognize problematic smartphone use (PSU) patterns and when to seek professional help',
                    'Understand cyberbullying risks, social comparison mechanisms, and doomscrolling anxiety loops',
                    'Distinguish evidence-supported claims from alarmist "screen addiction" marketing',
                    'Create a personalized digital wellness action plan aligned with your values and goals'
                ],
                lessons: [
                    {
                        id: '1',
                        title: 'The Science of Digital Wellness: Evidence, Myths, and What Works',
                        duration: '30 min'
                    },
                    {
                        id: '2',
                        title: 'Intentional vs. Passive Use: The Core Distinction',
                        duration: '25 min'
                    },
                    {
                        id: '3',
                        title: 'Digital Mental Health Literacy: Evaluating Online Content',
                        duration: '30 min'
                    },
                    {
                        id: '4',
                        title: 'Sleep and Screens: The Blue Light Mechanism',
                        duration: '25 min'
                    },
                    {
                        id: '5',
                        title: 'Nighttime Device Protocols and Sleep Hygiene',
                        duration: '25 min'
                    },
                    {
                        id: '6',
                        title: 'Attention Fragmentation and Cognitive Overload',
                        duration: '25 min'
                    },
                    {
                        id: '7',
                        title: 'Notification Management and Focus Strategies',
                        duration: '25 min'
                    },
                    {
                        id: '8',
                        title: 'Social Media and Mental Health: Understanding the Evidence',
                        duration: '30 min'
                    },
                    {
                        id: '9',
                        title: 'Social Comparison and Body Image',
                        duration: '30 min'
                    },
                    {
                        id: '10',
                        title: 'Doomscrolling and Compulsive News Consumption',
                        duration: '25 min'
                    },
                    {
                        id: '11',
                        title: 'Cyberbullying: Recognition, Response, and Referral',
                        duration: '30 min'
                    },
                    {
                        id: '12',
                        title: 'Problematic Smartphone Use: Assessment and Intervention',
                        duration: '25 min'
                    },
                    {
                        id: '13',
                        title: 'Boundary-Setting and Environmental Design',
                        duration: '25 min'
                    },
                    {
                        id: '14',
                        title: 'Content Curation and Values-Based Engagement',
                        duration: '25 min'
                    },
                    {
                        id: '15',
                        title: 'Family Media Practices and Parental Communication',
                        duration: '30 min'
                    },
                    {
                        id: '16',
                        title: 'Digital Detox: What Works (and What Doesn\'t)',
                        duration: '25 min'
                    },
                    {
                        id: '17',
                        title: 'Technology and Loneliness: The Paradox',
                        duration: '25 min'
                    },
                    {
                        id: '18',
                        title: 'Workplace Digital Wellness Strategies',
                        duration: '25 min'
                    },
                    {
                        id: '19',
                        title: 'Personal Digital Wellness Assessment',
                        duration: '30 min'
                    },
                    {
                        id: '20',
                        title: 'Your Digital Wellness Action Plan',
                        duration: '35 min'
                    }
                ]
            }
            // Future courses: Attention Training and Deep Work, Memory Enhancement, etc.
        ]
    },

    // ─── Pillar 4: Emotional Resilience & Stress Management ─────────────────────────────
    {
        id: 'emotional-resilience',
        title: 'Emotional Resilience & Stress Management',
        description: 'Build stress tolerance, emotional agility, and psychological flexibility. Evidence-based techniques from stress inoculation training, mindfulness, and resilience research.',
        magnetComponent: 'E', // Emotional
        courses: [
            {
                id: 'growth-mindset',
                title: 'The Growth Mindset: Building Psychological Flexibility',
                number: 4,
                description: 'Evidence-based skills for responding to challenges with flexibility and resilience. Learn cognitive reframing, self-compassion, mastery goal orientation, and when individual mindset matters—and when it doesn\'t.',
                duration: '10-12 hours',
                evidenceBadge: 'Psychological Bulletin 2023 / Clinical Psychology Review 2024',
                clinicalFramework: 'ACT + CBT Cognitive Reappraisal + Self-Compassion',
                outcomes: [
                    'Understand what growth mindset research actually shows (and what it doesn\'t) — distinguishing evidence from overhype',
                    'Master cognitive reappraisal skills with r=0.47 resilience association (STRONG evidence)',
                    'Apply self-compassion techniques for failure recovery — 56+ RCTs support efficacy (STRONG evidence)',
                    'Develop mastery goal orientation and learning-focused motivation (STRONG evidence)',
                    'Learn ACT-informed psychological flexibility — acceptance, defusion, values-based action (VERY STRONG evidence)',
                    'Practice flexible goal adjustment — knowing when to persist and when to pivot (STRONG evidence)',
                    'Build challenge-response skills grounded in stress appraisal theory (STRONG evidence)',
                    'Recognize structural limits of individual mindset — avoid toxic positivity and self-blame',
                    'Understand domain specificity — mindsets about anxiety, emotion, and coping (not just intelligence)',
                    'Know when professional support is needed vs. self-management sufficiency'
                ],
                lessons: [
                    {
                        id: '1',
                        title: 'Understanding Mindsets: Fixed vs. Growth',
                        duration: '30 min'
                    },
                    {
                        id: '2',
                        title: 'The Evidence Landscape: What Research Really Says',
                        duration: '30 min'
                    },
                    {
                        id: '3',
                        title: 'Domain Specificity: Why Context Matters',
                        duration: '25 min'
                    },
                    {
                        id: '4',
                        title: 'Challenge vs. Threat Appraisal',
                        duration: '30 min'
                    },
                    {
                        id: '5',
                        title: 'Cognitive Reframing: The Science of Reappraisal',
                        duration: '30 min'
                    },
                    {
                        id: '6',
                        title: 'Learning Orientation and Mastery Goals',
                        duration: '30 min'
                    },
                    {
                        id: '7',
                        title: 'Self-Compassion: The Evidence for Failure Recovery',
                        duration: '30 min'
                    },
                    {
                        id: '8',
                        title: 'Psychological Flexibility (ACT-Informed)',
                        duration: '30 min'
                    },
                    {
                        id: '9',
                        title: 'Effort Beliefs: Calibrated and Realistic',
                        duration: '25 min'
                    },
                    {
                        id: '10',
                        title: 'Flexible Goal Adjustment: When to Persist and When to Pivot',
                        duration: '30 min'
                    },
                    {
                        id: '11',
                        title: 'Building Self-Efficacy Through Mastery Experiences',
                        duration: '25 min'
                    },
                    {
                        id: '12',
                        title: 'Growth Mindset of Anxiety',
                        duration: '25 min'
                    },
                    {
                        id: '13',
                        title: 'Growth Mindset of Emotion',
                        duration: '25 min'
                    },
                    {
                        id: '14',
                        title: 'Challenge-Response Skills in Practice',
                        duration: '30 min'
                    },
                    {
                        id: '15',
                        title: 'Reframing Failure: From Threat to Learning',
                        duration: '30 min'
                    },
                    {
                        id: '16',
                        title: 'Building Resilience Without Toxic Positivity',
                        duration: '30 min'
                    },
                    {
                        id: '17',
                        title: 'Structural Honesty: The Limits of Individual Mindset',
                        duration: '30 min'
                    },
                    {
                        id: '18',
                        title: 'Cultural Context and Cross-Cultural Variation',
                        duration: '25 min'
                    },
                    {
                        id: '19',
                        title: 'When Professional Help Is Needed',
                        duration: '25 min'
                    },
                    {
                        id: '20',
                        title: 'Building Your Psychological Flexibility Action Plan',
                        duration: '35 min'
                    }
                ]
            },
            {
                id: 'cbt-fundamentals',
                title: 'CBT Fundamentals: Building Cognitive and Behavioral Skills',
                number: 5,
                description: 'Master evidence-based CBT skills for managing thoughts, emotions, and behaviors. Learn cognitive restructuring, behavioral activation, thought records, problem-solving, and relapse prevention—the gold-standard approach for depression, anxiety, and stress.',
                duration: '12-14 hours',
                evidenceBadge: 'NICE 2024 / Cochrane 2022',
                clinicalFramework: 'CBT + Behavioral Activation + Cognitive Restructuring',
                outcomes: [
                    'Understand the cognitive triangle: how thoughts, feelings, and behaviors interconnect',
                    'Identify automatic thoughts and cognitive distortions that maintain distress',
                    'Master thought monitoring using structured thought records and ABC worksheets',
                    'Apply cognitive restructuring to examine evidence and develop balanced thoughts (STRONG evidence)',
                    'Use behavioral activation for depression and low mood (STRONG standalone evidence)',
                    'Develop problem-solving skills using the 5-step structured framework',
                    'Learn worry management techniques: scheduled worry time, postponement, meta-cognitive awareness',
                    'Apply CBT-I principles for sleep improvement (STRONG digital delivery evidence)',
                    'Understand when CBT skills are appropriate vs. when professional help is needed',
                    'Build a relapse prevention plan with early warning signs and maintenance strategies'
                ],
                lessons: [
                    { id: '1', title: 'The Cognitive Triangle: Thoughts, Feelings, and Behaviors', duration: '30 min' },
                    { id: '2', title: 'Automatic Thoughts: Mental Background Noise', duration: '25 min' },
                    { id: '3', title: 'Core Beliefs: The Operating System of Your Mind', duration: '30 min' },
                    { id: '4', title: 'The CBT Model: Evidence-Based Thought Change', duration: '25 min' },
                    { id: '5', title: 'All-or-Nothing Thinking: Breaking Black-and-White', duration: '30 min' },
                    { id: '6', title: 'Catastrophizing: Managing Worst-Case Thinking', duration: '25 min' },
                    { id: '7', title: 'Mind-Reading and Fortune-Telling: Prediction and Assumptions', duration: '30 min' },
                    { id: '8', title: 'Personalization and Blame: Responsibility Boundaries', duration: '25 min' },
                    { id: '9', title: 'Basic Thought Records: Tracking Thoughts and Emotions', duration: '30 min' },
                    { id: '10', title: 'Advanced Thought Challenging: Evidence Examination', duration: '30 min' },
                    { id: '11', title: 'Balanced Thinking: Realistic Thought Alternatives', duration: '25 min' },
                    { id: '12', title: 'Cognitive Restructuring: Implementing Thought Changes', duration: '30 min' },
                    { id: '13', title: 'Behavioral Activation: Activity and Mood Connection', duration: '30 min' },
                    { id: '14', title: 'Behavioral Experiments: Testing Thoughts in Action', duration: '25 min' },
                    { id: '15', title: 'Exposure Therapy Principles: Gradual Challenge', duration: '30 min' },
                    { id: '16', title: 'Problem-Solving Strategies: Action-Oriented', duration: '25 min' },
                    { id: '17', title: 'Mood Monitoring: Pattern Recognition', duration: '25 min' },
                    { id: '18', title: 'Relapse Prevention: Maintaining Progress', duration: '30 min' },
                    { id: '19', title: 'CBT Skills for Stress Management', duration: '25 min' },
                    { id: '20', title: 'Building Your Personal CBT Toolkit', duration: '35 min' }
                ]
            },
            {
                id: 'stress-challenge-navigation',
                title: 'Stress & Challenge Navigation: Building Resilience Under Pressure',
                number: 6,
                description: 'Evidence-based strategies for managing stress, building resilience, and performing under pressure. Learn stress appraisal, ANS regulation, cognitive reappraisal, and recovery behaviors grounded in stress inoculation training and resilience science.',
                duration: '10-12 hours',
                evidenceBadge: 'BMJ Open 2024 / Psychological Bulletin 2024',
                clinicalFramework: 'Stress Inoculation Training + CBT + ANS Regulation',
                outcomes: [
                    'Understand the transactional stress model: how appraisal shapes stress responses',
                    'Distinguish acute stress (adaptive) from chronic stress (allostatic load)',
                    'Master challenge vs. threat appraisal framework (meta-analysis, 62 studies, small-moderate effects)',
                    'Apply cognitive reappraisal skills with r=0.47 resilience association (STRONG evidence)',
                    'Practice slow-paced breathing and progressive muscle relaxation for ANS regulation',
                    'Learn HRV concepts and resonance frequency breathing (without requiring hardware)',
                    'Develop stress inoculation training skills: conceptualization, skill acquisition, application',
                    'Understand performance under pressure: reappraisal of incentives, attention control',
                    'Apply evidence-based recovery behaviors: sleep hygiene, exercise, social support',
                    'Recognize when stress management is insufficient vs. when professional help is needed',
                    'Avoid Polyvagal Theory framework (contested evidence); use ANS two-system model instead',
                    'Build a sustainable multi-modal stress management practice with realistic expectations'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Stress: The Science of the Stress Response', duration: '30 min' },
                    { id: '2', title: 'Identifying Personal Stress Triggers and Patterns', duration: '25 min' },
                    { id: '3', title: 'The Stress-Challenge Spectrum: Appraisal Analysis', duration: '30 min' },
                    { id: '4', title: 'Building Stress Resilience: The Foundation', duration: '30 min' },
                    { id: '5', title: 'Cognitive Reframing Techniques: Challenge vs. Threat', duration: '30 min' },
                    { id: '6', title: 'Mindfulness and Present-Moment Awareness', duration: '25 min' },
                    { id: '7', title: 'Time Management and Priority Setting', duration: '30 min' },
                    { id: '8', title: 'Communication Skills for Stress Reduction', duration: '25 min' },
                    { id: '9', title: 'Building Support Networks and Social Buffers', duration: '30 min' },
                    { id: '10', title: 'Problem-Solving Strategies for Stress Management', duration: '25 min' },
                    { id: '11', title: 'Relaxation and Stress Relief Techniques', duration: '30 min' },
                    { id: '12', title: 'Exercise and Physical Activity for Stress Resilience', duration: '30 min' },
                    { id: '13', title: 'Nutrition and Stress: Fueling Resilience', duration: '25 min' },
                    { id: '14', title: 'Sleep and Stress: Breaking the Cycle', duration: '30 min' },
                    { id: '15', title: 'Technology and Digital Wellness for Stress', duration: '25 min' },
                    { id: '16', title: 'Workplace Stress Management Strategies', duration: '30 min' },
                    { id: '17', title: 'Financial Stress and Money Mindset', duration: '25 min' },
                    { id: '18', title: 'Relationship Stress and Conflict Resolution', duration: '30 min' },
                    { id: '19', title: 'Personal Stress Management Plan: Your Roadmap', duration: '30 min' },
                    { id: '20', title: 'Maintaining Long-Term Stress Resilience', duration: '35 min' }
                ]
            },
            {
                id: 'healthy-boundaries',
                title: 'Healthy Boundaries: Assertiveness, Values, and Authentic Limits',
                number: 7,
                description: 'Evidence-based boundary-setting skills rooted in assertiveness training, DBT interpersonal effectiveness, and Bowen family systems. Learn to communicate needs, set limits, and navigate family, work, and relationship contexts—with critical safety guidance for coercive control and trauma.',
                duration: '10-12 hours',
                evidenceBadge: 'Journal of Personality 2022 / Clinical Psychology Review 2024',
                clinicalFramework: 'Assertiveness Training + DBT Interpersonal Effectiveness + Bowen Family Systems',
                outcomes: [
                    'Understand boundaries as evidence-based constructs (assertiveness, differentiation of self, interpersonal effectiveness) vs. popular oversimplifications',
                    'Master assertive communication skills including DEAR MAN framework and "I" statements (STRONG evidence: ES 0.95–1.73)',
                    'Apply values-based limit-setting using ACT psychological flexibility principles (MODERATE-STRONG evidence)',
                    'Develop guilt tolerance skills using DBT distress tolerance and self-compassion (MODERATE evidence)',
                    'Navigate family dynamics with Bowen differentiation of self framework (MODERATE-STRONG: 295 studies)',
                    'Set work boundaries to prevent burnout using role boundary theory (MODERATE-STRONG evidence)',
                    'Recognize coercive control patterns (monitoring, isolation, gaslighting, DARVO) and when assertiveness is contraindicated',
                    'Distinguish privacy/autonomy from emotional withdrawal (stonewalling, cutoff)',
                    'Understand how trauma histories affect boundary-setting and when professional support is necessary',
                    'Create a personalized boundary action plan across work, family, relationship, and digital contexts'
                ],
                lessons: [
                    { id: '1', title: 'What Boundaries Actually Are — and Are Not', duration: '30 min' },
                    { id: '2', title: 'Types of Boundaries — Mapping Your Personal Territory', duration: '25 min' },
                    { id: '3', title: 'Identifying Boundary Violations — Warning Signs', duration: '25 min' },
                    { id: '4', title: 'The Psychology of People-Pleasing', duration: '30 min' },
                    { id: '5', title: 'Know Your Values — The Foundation of Authentic Limits', duration: '30 min' },
                    { id: '6', title: 'The Skill of Saying No', duration: '30 min' },
                    { id: '7', title: 'Communicating Your Needs — I-Statements and Requests', duration: '25 min' },
                    { id: '8', title: 'Guilt Tolerance — The Emotional Obstacle', duration: '30 min' },
                    { id: '9', title: 'Digital Boundaries — Connected World Peace', duration: '25 min' },
                    { id: '10', title: 'Workplace Boundaries — Professional Limits', duration: '30 min' },
                    { id: '11', title: 'Family Dynamics — Differentiation and Connectedness', duration: '30 min' },
                    { id: '12', title: 'Intimate Relationship Boundaries', duration: '25 min' },
                    { id: '13', title: 'Parenting and Boundaries', duration: '25 min' },
                    { id: '14', title: 'Privacy, Solitude, and Emotional Presence', duration: '30 min' },
                    { id: '15', title: 'Recognizing Coercive and Manipulative Patterns', duration: '30 min' },
                    { id: '16', title: 'Caring Without Losing Yourself — Caregiving Boundaries', duration: '25 min' },
                    { id: '17', title: 'Boundaries with Difficult People', duration: '30 min' },
                    { id: '18', title: 'Boundary Repair and Maintenance', duration: '25 min' },
                    { id: '19', title: 'When Limits Feel Impossible — Trauma, Attachment, and Patterns', duration: '30 min' },
                    { id: '20', title: 'Living with Boundaries — Your Personal Plan Builder', duration: '35 min' }
                ]
            },
            {
                id: 'creative-expression',
                title: 'Creative Expression & Art Therapy for Mental Health',
                number: 17,
                description: 'Evidence-based creative practices for emotional regulation, self-awareness, and wellbeing. Learn distinction between creative self-help and licensed art therapy, explore visual art, writing, movement, music, and symbolic techniques—with clear safety boundaries.',
                duration: '10-12 hours',
                evidenceBadge: 'Art Therapy Research 2023 / Expressive Writing Meta-Analysis 2024',
                clinicalFramework: 'Creative Arts + Expressive Writing + Affect Labeling',
                outcomes: [
                    'Understand creative expression as affect regulation mechanism (affect labeling reduces amygdala activation—STRONG evidence)',
                    'Distinguish creative self-help for wellbeing from licensed art therapy (requires ATR-BC certification)',
                    'Master self-awareness techniques: emotion mapping, journaling, body awareness (MODERATE-STRONG evidence)',
                    'Apply visual art practices: drawing, collage, color psychology, photography (EMERGING-MODERATE evidence)',
                    'Use narrative and expressive writing for processing experiences (MODERATE evidence, meta-analysis N=146)',
                    'Practice embodiment techniques: movement, bilateral scribbling, body scanning (EMERGING-MODERATE evidence)',
                    'Explore symbolic and metaphor work for accessing non-verbal knowing (EMERGING evidence)',
                    'Integrate music and sound for regulation and expression (STRONG evidence for music therapy, EMERGING for self-help)',
                    'Understand critical safety boundaries: when creative self-help is appropriate vs. when professional trauma therapy is essential',
                    'Build sustainable creative practice balancing digital and analog approaches, with containment strategies for difficult content'
                ],
                lessons: [
                    { id: '1', title: 'The Science of Creative Expression for Wellbeing', duration: '30 min' },
                    { id: '2', title: 'Creative Expression vs. Art Therapy: Understanding the Distinction', duration: '25 min' },
                    { id: '3', title: 'Building Self-Awareness Through Creative Practices', duration: '30 min' },
                    { id: '4', title: 'Journaling and Expressive Writing for Mental Health', duration: '30 min' },
                    { id: '5', title: 'Establishing Your Creative Routine and Safe Container', duration: '25 min' },
                    { id: '6', title: 'Visual Art Basics: Drawing and Sketching for Regulation', duration: '30 min' },
                    { id: '7', title: 'Color Psychology and Emotional Expression', duration: '25 min' },
                    { id: '8', title: 'Photography as Mindful Observation', duration: '25 min' },
                    { id: '9', title: 'Narrative and Storytelling for Processing Experiences', duration: '30 min' },
                    { id: '10', title: 'Collage and Mixed Media: Assembling Your Inner Landscape', duration: '25 min' },
                    { id: '11', title: 'Creative Expression for Specific Emotional States', duration: '30 min' },
                    { id: '12', title: 'Embodiment and Movement: The Body as Creative Tool', duration: '30 min' },
                    { id: '13', title: 'Symbolic Work and Metaphor in Creative Expression', duration: '25 min' },
                    { id: '14', title: 'The Role of Music and Sound in Creative Expression', duration: '30 min' },
                    { id: '15', title: 'Group Creative Practices and Community Building', duration: '25 min' },
                    { id: '16', title: 'Creative Expression in Relationships and Communication', duration: '30 min' },
                    { id: '17', title: 'Environmental Art and Nature Connection', duration: '30 min' },
                    { id: '18', title: 'Creative Expression and Difficult Life Experiences', duration: '35 min' },
                    { id: '19', title: 'Integrating Technology in Creative Expression', duration: '25 min' },
                    { id: '20', title: 'Your Personal Creative Expression Plan', duration: '40 min' }
                ]
            },
            {
                id: 'adventure-outdoor-mental-health',
                title: 'Adventure & Outdoor Mental Health',
                number: 18,
                description: 'Evidence-based outdoor practices for stress reduction, resilience building, and mental wellness. Learn nature exposure science (forest bathing, blue space, green exercise), awe cultivation, grounding techniques, mindfulness in nature, and adventure applications across diverse environments—with critical safety framing and honest evidence assessment.',
                duration: '12-14 hours',
                evidenceBadge: 'Meta-analysis 143 Studies / Systematic Review 50 Studies',
                clinicalFramework: 'Attention Restoration Theory + Stress Reduction Theory + Adventure Therapy',
                outcomes: [
                    'Understand nature exposure evidence: green space (MODERATE-STRONG), blue space (STRONG largest effects), forest bathing (MODERATE), green exercise (MODERATE synergy)',
                    'Master foundational practices: forest bathing/shinrin-yoku, attention restoration, awe cultivation in nature, grounding/earthing, mindful nature observation',
                    'Apply environment-specific approaches: mountain/alpine psychology, desert wilderness navigation, ocean/blue space immersion, wildlife observation ethics',
                    'Learn safety protocols: altitude acclimatization, heat/cold management, water safety, wildlife encounters, extreme weather assessment, Leave No Trace principles',
                    'Practice integration techniques: backcountry camping, nature photography/journaling, geocaching/adventure gaming, calculated risk in adventure sports',
                    'Recognize critical limits: nature as ADJUNCTIVE not standalone treatment, trauma healing requires professional delivery, accessibility/equity barriers',
                    'Frame evidence honestly: nature associated with outcomes (not "treats" or "cures"), minimal research for extreme practices, distinguish anecdote from controlled studies',
                    'Navigate barriers: urban access solutions, cost workarounds, physical ability adaptations, weather/seasonal strategies, motivation/consistency techniques',
                    'Understand when professional help essential: severe depression, acute PTSD, suicidality, adventure therapy requires licensed facilitators',
                    'Create comprehensive personal outdoor mental health plan: goal-based practice selection, barrier solutions, safety integration, progress tracking, seasonal adaptation, holistic care coordination'
                ],
                lessons: [
                    { id: '1', title: 'The Science of Nature and Mental Health', duration: '30 min' },
                    { id: '2', title: 'Attention Restoration Theory and Cognitive Recovery', duration: '30 min' },
                    { id: '3', title: 'Stress Reduction Theory and Nature\'s Calming Effects', duration: '25 min' },
                    { id: '4', title: 'Evidence Grading and Honest Framing', duration: '30 min' },
                    { id: '5', title: 'Accessibility, Equity, and Barriers to Nature Connection', duration: '30 min' },
                    { id: '6', title: 'Forest Bathing (Shinrin-Yoku) Practice and Protocols', duration: '30 min' },
                    { id: '7', title: 'Green Exercise — Movement in Nature for Mental Health', duration: '30 min' },
                    { id: '8', title: 'Awe in Nature — Cultivating Transformative Experiences', duration: '30 min' },
                    { id: '9', title: 'Grounding, Earthing, and Sensory Connection', duration: '25 min' },
                    { id: '10', title: 'Mindfulness and Contemplative Practices in Nature', duration: '30 min' },
                    { id: '11', title: 'Mountain and Alpine Environments for Mental Wellness', duration: '30 min' },
                    { id: '12', title: 'Desert Wilderness and Solitude Practices', duration: '30 min' },
                    { id: '13', title: 'Blue Space — Oceans, Lakes, and Water for Mental Health', duration: '30 min' },
                    { id: '14', title: 'Wildlife Observation and Interconnection Awareness', duration: '30 min' },
                    { id: '15', title: 'Extreme Weather as Teacher and Challenge', duration: '30 min' },
                    { id: '16', title: 'Backcountry Camping and Self-Reliance Skills', duration: '30 min' },
                    { id: '17', title: 'Photography and Nature Journaling for Mindfulness', duration: '30 min' },
                    { id: '18', title: 'Geocaching and Outdoor Adventure Gaming', duration: '30 min' },
                    { id: '19', title: 'Adventure Sports for Thrill and Flow', duration: '35 min' },
                    { id: '20', title: 'Creating Your Personal Outdoor Mental Health Plan', duration: '40 min' }
                ]
            }
            // Future courses: Emotional Agility, Advanced Mindfulness, Recovery & Rest
        ]
    },

    // ─── Pillar 5: Purpose & Life Design ─────────────────────────────
    {
        id: 'purpose-life-design',
        title: 'Purpose & Life Design',
        description: 'Clarify values, set meaningful goals, and design a life aligned with your purpose. Integrates positive psychology, motivational science, and self-determination theory.',
        magnetComponent: 'G', // Growth/Goals
        courses: [
            {
                id: 'purpose-and-responsibility',
                title: 'Purpose & Responsibility: Finding Meaning in Life',
                number: 12,
                description: 'Evidence-based exploration of meaning, purpose, and service. Learn when helping others supports wellbeing, identify your strengths, build sustainable service habits, and create a values-aligned life of contribution.',
                duration: '10-12 hours',
                evidenceBadge: 'Meta-analysis 2023 (N=66,468) / Systematic Reviews 2020-2025',
                clinicalFramework: 'Meaning-in-Life Research + Service Learning + ABCD Model',
                outcomes: [
                    'Understand the three dimensions of meaning: coherence, purpose, and significance (Steger model)',
                    'Recognize the presence-vs-search distinction and why searching without presence worsens wellbeing',
                    'Learn the conditional nature of prosocial behavior benefits: autonomy, capacity, and motivation (MODERATE-STRONG evidence)',
                    'Identify your VIA character strengths and use them in new ways (RCT evidence, N=1,163)',
                    'Understand when helping others benefits mental health and when it creates caregiver burden (63% rate)',
                    'Apply Asset-Based Community Development (ABCD) for sustainable service',
                    'Master Mental Health First Aid principles (ALGEE framework) with scope limitations',
                    'Distinguish coaching, mentoring, therapy, and peer support roles',
                    'Build sustainable service habits using habit formation science',
                    'Create a personalized service plan aligned with values, strengths, and capacity'
                ],
                lessons: [
                    { id: '1', title: 'The Psychology of Purpose: Why Meaning Matters for Mental Health', duration: '30 min' },
                    { id: '2', title: 'From Self-Focus to Service: The Mental Health Benefits of Helping Others', duration: '35 min' },
                    { id: '3', title: 'Identifying Your Unique Gifts: Strengths-Based Service Discovery', duration: '30 min' },
                    { id: '4', title: 'The Science of Altruism: How Giving Transforms the Giver', duration: '30 min' },
                    { id: '5', title: 'Community Assessment: Understanding Where You Can Make a Difference', duration: '30 min' },
                    { id: '6', title: 'Service Learning Fundamentals: Turning Good Intentions into Effective Action', duration: '30 min' },
                    { id: '7', title: 'Mental Health First Aid: Supporting Others in Crisis', duration: '35 min' },
                    { id: '8', title: 'Peer Support Models: The Power of Lived Experience', duration: '25 min' },
                    { id: '9', title: 'Mentoring and Coaching Skills: Guiding Others\' Growth', duration: '25 min' },
                    { id: '10', title: 'Building Sustainable Service Habits: Creating Long-Term Impact', duration: '30 min' },
                    { id: '11', title: 'Working with Vulnerable Populations: Trauma-Informed Service', duration: '25 min' },
                    { id: '12', title: 'Crisis Intervention and Safety Planning', duration: '25 min' },
                    { id: '13', title: 'Advocacy and Social Justice: Addressing Systemic Issues', duration: '25 min' },
                    { id: '14', title: 'Creating Support Groups: Fostering Healing Communities', duration: '25 min' },
                    { id: '15', title: 'Digital Mental Health Support and Community Building', duration: '25 min' },
                    { id: '16', title: 'Intergenerational Service: Bridging Age Groups for Mutual Benefit', duration: '30 min' },
                    { id: '17', title: 'Service Leadership Development: From Participant to Organizer', duration: '30 min' },
                    { id: '18', title: 'Measuring Impact: Evaluating Your Service Effectiveness', duration: '30 min' },
                    { id: '19', title: 'Self-Care for Helpers: Preventing Burnout While Serving Others', duration: '30 min' },
                    { id: '20', title: 'Building a Service-Oriented Life: Integration and Action Plan', duration: '40 min' }
                ]
            },
            {
                id: 'mental-health-first-aid',
                title: 'Mental Health First Aid & Community Support',
                number: 13,
                description: 'Evidence-based training to recognize mental health crises, provide initial support using the ALGEE framework, and connect people to appropriate care. Learn suicide prevention, trauma-informed approaches, and sustainable helping practices.',
                duration: '12-15 hours',
                evidenceBadge: '2023 Cochrane Review / Morgan et al. 2018 Meta-Analysis',
                clinicalFramework: 'MHFA Australia ALGEE Framework + SAMHSA Trauma-Informed Care',
                outcomes: [
                    'Master the ALGEE framework (Approach, Listen, Give information, Encourage professional help, Encourage self-help) with clear scope boundaries',
                    'Recognize warning signs across depression, anxiety, psychosis, substance use, and suicide risk (STRONG evidence for recognition training)',
                    'Ask directly about suicide using safe messaging guidelines (AFSP/SPRC/WHO protocols) — research shows asking does NOT increase risk',
                    'Apply verbal de-escalation and crisis intervention techniques for acute episodes',
                    'Implement trauma-informed care principles (safety, trustworthiness, peer support, collaboration, empowerment, cultural sensitivity)',
                    'Support diverse populations (youth, elders, LGBTQ+, multicultural communities) with adapted approaches',
                    'Navigate legal/ethical considerations including mandatory reporting and confidentiality limits',
                    'Practice self-care and prevent vicarious trauma (affects 40-85% of helpers) through boundaries, debriefing, and support',
                    'Connect people to community mental health resources using warm handoffs',
                    'Create personal MHFA action plan for sustainable community mental health support practice'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Mental Health First Aid Principles', duration: '35 min' },
                    { id: '2', title: 'Recognizing Warning Signs and Risk Factors', duration: '35 min' },
                    { id: '3', title: 'Active Listening and Communication Techniques', duration: '30 min' },
                    { id: '4', title: 'De-Escalation and Crisis Intervention', duration: '35 min' },
                    { id: '5', title: 'Suicide Prevention and Risk Assessment', duration: '40 min' },
                    { id: '6', title: 'Trauma-Informed Approaches to Mental Health Support', duration: '35 min' },
                    { id: '7', title: 'Supporting Individuals with Depression', duration: '30 min' },
                    { id: '8', title: 'Anxiety Disorders and Panic Attack Response', duration: '30 min' },
                    { id: '9', title: 'Substance Use Disorders and Dual Diagnosis', duration: '30 min' },
                    { id: '10', title: 'Supporting Youth and Adolescent Mental Health', duration: '35 min' },
                    { id: '11', title: 'Elder Mental Health and Aging-Related Challenges', duration: '25 min' },
                    { id: '12', title: 'Cultural Competency and Diverse Communities', duration: '25 min' },
                    { id: '13', title: 'Mental Health in the Workplace', duration: '25 min' },
                    { id: '14', title: 'Family Systems and Mental Health Impact', duration: '25 min' },
                    { id: '15', title: 'Community Resource Navigation and Referrals', duration: '25 min' },
                    { id: '16', title: 'Legal and Ethical Considerations', duration: '25 min' },
                    { id: '17', title: 'Self-Care and Secondary Trauma Prevention', duration: '30 min' },
                    { id: '18', title: 'Group Facilitation and Peer Support Programs', duration: '25 min' },
                    { id: '19', title: 'Crisis Response Team Coordination', duration: '25 min' },
                    { id: '20', title: 'Program Development and Community Implementation', duration: '40 min' }
                ]
            },
            {
                id: 'coaching-mentoring',
                title: 'Coaching & Mentoring: Supporting Others to Thrive',
                number: 14,
                description: 'Evidence-based coaching and mentoring skills to support others in achieving their goals. Learn the distinctions between coaching, therapy, and peer support; master motivational interviewing, CBT-informed techniques, and ethical practice boundaries.',
                duration: '7-9 hours',
                evidenceBadge: 'Meta-analysis g=1.29 / Coaching Psychology 2024',
                clinicalFramework: 'Coaching Psychology + Motivational Interviewing + CBT-Informed',
                outcomes: [
                    'Distinguish between coaching, therapy, counseling, mentoring, and peer support with clear legal and ethical boundaries',
                    'Apply motivational interviewing principles (OARS, RULE) to evoke intrinsic motivation and support behavior change',
                    'Use cognitive-behavioral coaching techniques within non-clinical scope to support goal attainment',
                    'Master active listening, powerful questioning, and reflective communication skills',
                    'Build trust and psychological safety through empathy, validation, and non-judgmental presence',
                    'Navigate resistance, difficult conversations, and ethical dilemmas with professional standards',
                    'Apply strengths-based approaches and emotional intelligence in coaching relationships',
                    'Recognize when professional referral is required and make warm handoffs to clinical care',
                    'Measure coaching outcomes using goal attainment scaling and evidence-based assessment',
                    'Practice cultural competency and inclusive coaching across diverse populations'
                ],
                lessons: [
                    { id: '1', title: 'The Science of Effective Coaching and Mentoring', duration: '30 min' },
                    { id: '2', title: 'Building Trust and Psychological Safety', duration: '30 min' },
                    { id: '3', title: 'Active Listening and Powerful Questioning', duration: '25 min' },
                    { id: '4', title: 'Goal Setting and Action Planning', duration: '30 min' },
                    { id: '5', title: 'Cognitive Behavioral Coaching Techniques', duration: '30 min' },
                    { id: '6', title: 'Motivational Interviewing for Coaches', duration: '30 min' },
                    { id: '7', title: 'Emotional Intelligence in Coaching', duration: '25 min' },
                    { id: '8', title: 'Strengths-Based Coaching Approaches', duration: '30 min' },
                    { id: '9', title: 'Dealing with Resistance and Difficult Conversations', duration: '25 min' },
                    { id: '10', title: 'Cultural Competency and Inclusive Coaching', duration: '30 min' },
                    { id: '11', title: 'Crisis Intervention and Mental Health Awareness', duration: '30 min' },
                    { id: '12', title: 'Group Coaching and Facilitation Skills', duration: '25 min' },
                    { id: '13', title: 'Technology Tools and Virtual Coaching', duration: '30 min' },
                    { id: '14', title: 'Measuring Progress and Outcomes', duration: '30 min' },
                    { id: '15', title: 'Ethical Considerations and Professional Standards', duration: '30 min' }
                ]
            },
            {
                id: 'legacy-building',
                title: 'Legacy Building & Wisdom Sharing',
                number: 15,
                description: 'Evidence-informed practices for creating meaningful legacy, sharing life wisdom, and contributing across generations through mentoring, storytelling, and sustainable service.',
                duration: '12 hours',
                evidenceBadge: 'Systematic Reviews 2020-2025 / Meta-analyses on Life Review',
                clinicalFramework: 'Life Review + Generativity Theory + Meaning-Making',
                outcomes: [
                    'Understand Erikson\'s developmental framework: generativity vs stagnation, integrity vs despair',
                    'Master evidence-based life review practices (STRONG for depression reduction in older adults)',
                    'Identify your unique wisdom and life experience worth sharing',
                    'Develop sustainable mentoring, teaching, and community contribution practices',
                    'Create educational resources and legacy content aligned with your strengths',
                    'Navigate ethics and boundaries in wisdom-sharing work',
                    'Build financial sustainability through appropriate monetization models',
                    'Prevent helper burnout through energy management and boundary-setting (82% recovery with early intervention)',
                    'Plan for succession and knowledge transfer (4.2x longer impact with succession planning)',
                    'Integrate technology thoughtfully for legacy preservation and reach',
                    'Practice cultural humility when sharing wisdom across cultural boundaries',
                    'Create comprehensive legacy action plan for sustainable decades-long engagement'
                ],
                lessons: [
                    { id: '1', title: 'Understanding Legacy: Erikson\'s Framework and Life Stages', duration: '30 min' },
                    { id: '2', title: 'Debunking Legacy Myths and Setting Realistic Expectations', duration: '30 min' },
                    { id: '3', title: 'Life Review and Meaning-Making Practices', duration: '40 min' },
                    { id: '4', title: 'Identifying Your Unique Wisdom and Gifts', duration: '35 min' },
                    { id: '5', title: 'Overcoming Imposter Syndrome in Wisdom-Sharing', duration: '35 min' },
                    { id: '6', title: 'Finding Your Authentic Voice and Message', duration: '30 min' },
                    { id: '7', title: 'Identifying Who Needs Your Wisdom Most', duration: '40 min' },
                    { id: '8', title: 'Mentoring Relationships: Structure and Boundaries', duration: '30 min' },
                    { id: '9', title: 'Building and Facilitating Wisdom-Sharing Communities', duration: '30 min' },
                    { id: '10', title: 'Sharing Difficult Life Lessons Responsibly', duration: '35 min' },
                    { id: '11', title: 'Creating Educational Resources and Courses', duration: '45 min' },
                    { id: '12', title: 'Ethics and Responsibility in Wisdom-Sharing', duration: '30 min' },
                    { id: '13', title: 'Personal Branding Without Selling Out', duration: '30 min' },
                    { id: '14', title: 'Measuring Impact and Knowing Your Contribution', duration: '30 min' },
                    { id: '15', title: 'Financial Sustainability in Legacy Work', duration: '30 min' },
                    { id: '16', title: 'Managing Your Energy and Avoiding Burnout', duration: '35 min' },
                    { id: '17', title: 'Legacy Planning and Succession Strategies', duration: '35 min' },
                    { id: '18', title: 'Technology Integration and Digital Legacy Preservation', duration: '40 min' },
                    { id: '19', title: 'Global Impact and Cross-Cultural Wisdom Exchange', duration: '35 min' },
                    { id: '20', title: 'Integration and Your Continuing Legacy Journey', duration: '45 min' }
                ]
            }
            // Future courses: Values Clarification, Goal-Setting Science, Habit Architecture, Meaning-Making
        ]
    }
];

// Helper functions for optimization curriculum
export function getAllOptimizationCourses() {
    return OPTIMIZATION_CURRICULUM.flatMap(track => track.courses);
}

export function getOptimizationCourse(id: string) {
    return getAllOptimizationCourses().find(c => c.id === id);
}

export function getOptimizationLesson(courseId: string, lessonId: string) {
    const course = getOptimizationCourse(courseId);
    return course?.lessons.find(l => l.id === lessonId);
}

export function getOptimizationTrackIdForCourse(courseId: string) {
    return OPTIMIZATION_CURRICULUM.find(track => track.courses.some(c => c.id === courseId))?.id;
}
