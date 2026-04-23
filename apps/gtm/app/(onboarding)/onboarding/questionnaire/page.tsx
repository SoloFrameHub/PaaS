'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'
import { GA4Events } from '@/lib/analytics/ga4'

const BASE_SECTIONS = [
    { id: 'context', title: 'Business Context', titleEs: 'Contexto del Negocio' },
    { id: 'state', title: 'Current State', titleEs: 'Estado Actual' },
    { id: 'profile', title: 'Founder Profile', titleEs: 'Perfil del Fundador/a' },
    { id: 'disc', title: 'Behavioral Styles (DISC)', titleEs: 'Estilos de Comportamiento (DISC)' },
    { id: 'priorities', title: 'Learning Priorities', titleEs: 'Prioridades de Aprendizaje' },
    { id: 'capacity', title: 'Engagement Capacity', titleEs: 'Capacidad de Dedicación' },
    { id: 'goals', title: 'Goals & Success', titleEs: 'Metas y Éxito' },
]

const CREATOR_SECTION = { id: 'creator', title: 'Creator Business', titleEs: 'Negocio de Creador/a' }

export default function QuestionnairePage() {
    const router = useRouter()
    const locale = useLocale()
    const isEs = locale === 'es'
    const { data, updateData } = useOnboarding()
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [loading, setLoading] = useState(false)

    // Dynamically include creator section for creator-coach business model
    const SECTIONS = useMemo(() => {
        if (data.businessModel === 'creator-coach') {
            // Insert creator section after 'profile' (index 2)
            return [
                ...BASE_SECTIONS.slice(0, 3),
                CREATOR_SECTION,
                ...BASE_SECTIONS.slice(3)
            ]
        }
        return BASE_SECTIONS
    }, [data.businessModel])

    const currentSection = SECTIONS[currentSectionIndex]

    // Validate that required fields for the current section are filled
    const getSectionValidation = (sectionId: string): { valid: boolean; message: string } => {
        const q = data.questionnaire
        switch (sectionId) {
            case 'context':
                if (!q.industry) return { valid: false, message: isEs ? 'Por favor selecciona tu industria objetivo.' : 'Please select your target industry.' }
                if (!q.deal_size) return { valid: false, message: isEs ? 'Por favor selecciona el tamaño de trato objetivo.' : 'Please select your target deal size.' }
                return { valid: true, message: '' }
            case 'state':
                if (!q.sales_journey) return { valid: false, message: isEs ? 'Por favor selecciona dónde estás en tu proceso de ventas.' : 'Please select where you are in your sales journey.' }
                if (!q.revenue_range) return { valid: false, message: isEs ? 'Por favor selecciona tu rango de ingresos actual.' : 'Please select your current revenue range.' }
                return { valid: true, message: '' }
            case 'profile':
                if (!q.founder_description) return { valid: false, message: isEs ? 'Por favor selecciona la descripción que mejor te define.' : 'Please select the description that fits you best.' }
                return { valid: true, message: '' }
            case 'disc': {
                const answeredCount = ['disc1', 'disc2', 'disc3', 'disc4'].filter(id => q.disc_answers?.[id]).length
                if (answeredCount < 4) return { valid: false, message: isEs ? `Por favor responde los 4 escenarios para personalizar tu coaching (${answeredCount}/4 completados).` : `Please answer all 4 scenarios to personalize your coaching (${answeredCount}/4 complete).` }
                return { valid: true, message: '' }
            }
            case 'priorities':
                if (!q.urgency) return { valid: false, message: isEs ? 'Por favor selecciona lo que se siente más urgente ahora mismo.' : 'Please select what feels most urgent right now.' }
                return { valid: true, message: '' }
            case 'capacity':
                if (!q.learning_style) return { valid: false, message: isEs ? 'Por favor selecciona tu preferencia de estilo de aprendizaje.' : 'Please select your learning style preference.' }
                return { valid: true, message: '' }
            case 'goals':
                if (!q.success_90_days || q.success_90_days.length < 10) return { valid: false, message: isEs ? 'Por favor describe tu meta de éxito en 90 días (mínimo 10 caracteres).' : 'Please describe your 90-day success goal (at least 10 characters).' }
                return { valid: true, message: '' }
            case 'creator':
                if (!q.creator_offer_type) return { valid: false, message: isEs ? 'Por favor selecciona qué vendes principalmente.' : 'Please select what you primarily sell.' }
                if (!q.creator_price_point) return { valid: false, message: isEs ? 'Por favor selecciona tu precio principal.' : 'Please select your primary price point.' }
                return { valid: true, message: '' }
            default:
                return { valid: true, message: '' }
        }
    }

    const [validationError, setValidationError] = useState('')

    const handleNext = async () => {
        const validation = getSectionValidation(currentSection.id)
        if (!validation.valid) {
            setValidationError(validation.message)
            return
        }
        setValidationError('')
        if (currentSectionIndex < SECTIONS.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1)
            window.scrollTo(0, 0)
        } else {
            handleSubmit()
        }
    }

    const handleBack = () => {
        setValidationError('')
        if (currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1)
            window.scrollTo(0, 0)
        } else {
            router.back()
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/onboarding/questionnaire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionnaire: data.questionnaire }),
            })

            if (!response.ok) throw new Error('Failed to save questionnaire')

            GA4Events.onboardingStepCompleted('questionnaire', 3);
            router.push('/onboarding/context')
        } catch (error) {
            console.error('Error saving questionnaire:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateQ = (updates: any) => {
        updateData({
            questionnaire: {
                ...data.questionnaire,
                ...updates
            }
        })
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={3} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Section Header */}
                        <div className="mb-8">
                            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold uppercase tracking-wider">
                                {isEs ? `Sección ${currentSectionIndex + 1} de ${SECTIONS.length}` : `Section ${currentSectionIndex + 1} of ${SECTIONS.length}`}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                                {isEs ? (currentSection as any).titleEs : currentSection.title}
                            </h1>
                        </div>

                        {/* Section Content */}
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {currentSection.id === 'context' && (
                                <>
                                    <div className="space-y-4">
                                        <label htmlFor="q1-pitch" className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P1. ¿Qué estás construyendo? (ej. SaaS B2B para equipos de RRHH)' : 'Q1. What are you building? (e.g. B2B SaaS for HR teams)'}
                                        </label>
                                        <textarea
                                            id="q1-pitch"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]"
                                            placeholder={isEs ? 'Describe tu producto, industria y cliente objetivo...' : 'Describe your product, industry, and target customer...'}
                                            value={data.pitch}
                                            onChange={(e) => updateData({ pitch: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label htmlFor="q3-industry" className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P2. ¿A quién le estás vendiendo? (Mercado Objetivo / Industria)' : 'Q2. Who are you selling to? (Target Market / Industry)'}
                                        </label>
                                        <p className="text-sm text-gray-500 mb-2" id="q3-desc">{isEs ? 'Selecciona la industria principal de tu cliente ideal.' : 'Select the primary industry of your ideal customer.'}</p>
                                        <select
                                            id="q3-industry"
                                            aria-describedby="q3-desc"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                            value={data.questionnaire.industry}
                                            onChange={(e) => updateQ({ industry: e.target.value })}
                                        >
                                            <option value="">{isEs ? 'Selecciona una industria...' : 'Select an industry...'}</option>
                                            <option value="saas">SaaS / Software</option>
                                            <option value="ecommerce">{isEs ? 'E-commerce / Venta Directa' : 'E-commerce / DTC'}</option>
                                            <option value="services">{isEs ? 'Servicios Profesionales / Consultoría' : 'Professional Services / Consulting'}</option>
                                            <option value="coaching">{isEs ? 'Coaching / Cursos / Educación' : 'Coaching / Courses / Education'}</option>
                                            <option value="agency">{isEs ? 'Agencia / Freelance' : 'Agency / Freelance'}</option>
                                            <option value="healthcare">{isEs ? 'Salud / Bienestar' : 'Healthcare / Wellness'}</option>
                                            <option value="fintech">{isEs ? 'Fintech / Finanzas' : 'Fintech / Finance'}</option>
                                            <option value="ai">{isEs ? 'AI / Herramientas Tech' : 'AI / Tech Tools'}</option>
                                            <option value="other">{isEs ? 'Otro' : 'Other'}</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="q4-label">
                                        <h2 id="q4-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P3. Tamaño de Trato Objetivo (Valor Mensual o Anual)' : 'Q3. Target Deal Size (Monthly or Annual Value)'}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'transactional', label: 'Under $100/mo (Self-serve)', labelEs: 'Menos de $100/mes (Autoservicio)' },
                                                { id: 'smb', label: '$100 - $1K/mo (SMB)', labelEs: '$100 - $1K/mes (Pequeña Empresa)' },
                                                { id: 'mid_market', label: '$1K - $5K/mo (Mid-market)', labelEs: '$1K - $5K/mes (Mediana Empresa)' },
                                                { id: 'enterprise', label: '$50K+/year (Enterprise)', labelEs: '$50K+/año (Enterprise)' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ deal_size: opt.id })}
                                                    aria-pressed={data.questionnaire.deal_size === opt.id}
                                                    className={`px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.deal_size === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    <div className="font-semibold">{isEs ? (opt as any).labelEs : opt.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {currentSection.id === 'state' && (
                                <>
                                    <div className="space-y-4" role="group" aria-labelledby="q5-label">
                                        <h2 id="q5-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P4. ¿Dónde estás en tu proceso de ventas?' : 'Q4. Where are you in your sales journey?'}
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                { value: "Haven't started outreach yet", labelEs: "Aún no he empezado el outreach" },
                                                { value: 'Doing outreach, no meetings booked', labelEs: 'Haciendo outreach, sin reuniones agendadas' },
                                                { value: 'Getting meetings, struggling to close', labelEs: 'Consiguiendo reuniones, con dificultad para cerrar' },
                                                { value: 'Closing some deals, want to systematize', labelEs: 'Cerrando algunos tratos, quiero sistematizarlo' },
                                                { value: 'Have a process, optimizing for scale', labelEs: 'Tengo un proceso, optimizando para escalar' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => updateQ({ sales_journey: opt.value })}
                                                    aria-pressed={data.questionnaire.sales_journey === opt.value}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.sales_journey === opt.value
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {isEs ? opt.labelEs : opt.value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="q6-label">
                                        <h2 id="q6-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P5. Ingresos Mensuales Actuales (MRR)' : 'Q5. Current Monthly Revenue (MRR)'}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { value: 'Pre-revenue / $0', labelEs: 'Sin ingresos / $0' },
                                                { value: 'Under $1K', labelEs: 'Menos de $1K' },
                                                { value: '$1K - $5K', labelEs: '$1K - $5K' },
                                                { value: '$5K - $20K', labelEs: '$5K - $20K' },
                                                { value: '$20K+', labelEs: '$20K+' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => updateQ({ revenue_range: opt.value })}
                                                    aria-pressed={data.questionnaire.revenue_range === opt.value}
                                                    className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${data.questionnaire.revenue_range === opt.value
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {isEs ? opt.labelEs : opt.value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Add more sections here or in a separate call to avoid huge blocks */}
                            {currentSection.id === 'profile' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="q8-label">
                                        <h2 id="q8-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P6. ¿Cuál descripción te define mejor?' : 'Q6. Which description fits you best?'}
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                { id: 'tech', label: 'Technical founder - I built the product, now need to sell it', labelEs: 'Fundador/a técnico/a - Construí el producto, ahora necesito venderlo' },
                                                { id: 'expert', label: 'Domain expert - I know the industry, learning to productize', labelEs: 'Experto/a del dominio - Conozco la industria, aprendiendo a productizar' },
                                                { id: 'service', label: 'Service provider - Running an agency/consulting, want to scale', labelEs: 'Proveedor/a de servicios - Gestiono una agencia/consultoría, quiero escalar' },
                                                { id: 'creator', label: 'Creator/Coach - Building audience-driven business', labelEs: 'Creador/a o Coach - Construyendo un negocio basado en audiencia' },
                                                { id: 'returning', label: 'Returning founder - Did this before, starting fresh', labelEs: 'Fundador/a veterano/a - Ya lo hice antes, comenzando de nuevo' },
                                                { id: 'side', label: 'Side project founder - Building while employed full-time', labelEs: 'Fundador/a de proyecto paralelo - Construyendo mientras trabajo a tiempo completo' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ founder_description: opt.id })}
                                                    aria-pressed={data.questionnaire.founder_description === opt.id}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.founder_description === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {isEs ? (opt as any).labelEs : opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Creator Business Section - Only shown for creator-coach */}
                            {currentSection.id === 'creator' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="creator-sell-label">
                                        <h2 id="creator-sell-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P7. ¿Qué vendes principalmente?' : 'Q7. What do you primarily sell?'}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'courses', label: 'Courses / Digital Products', labelEs: 'Cursos / Productos Digitales' },
                                                { id: 'coaching-1on1', label: '1:1 Coaching', labelEs: 'Coaching 1:1' },
                                                { id: 'coaching-group', label: 'Group Coaching Programs', labelEs: 'Programas de Coaching Grupal' },
                                                { id: 'membership', label: 'Memberships / Subscriptions', labelEs: 'Membresías / Suscripciones' },
                                                { id: 'community', label: 'Community Access', labelEs: 'Acceso a Comunidad' },
                                                { id: 'hybrid', label: 'Hybrid (Multiple Offer Types)', labelEs: 'Híbrido (Múltiples Tipos de Oferta)' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_offer_type: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_offer_type === opt.id}
                                                    className={`px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.creator_offer_type === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {isEs ? (opt as any).labelEs : opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-price-label">
                                        <h2 id="creator-price-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P8. ¿Cuál es el precio principal de tu oferta?' : "Q8. What's your primary offer price point?"}
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { id: 'low-ticket', label: '$0-$97', sub: 'Low-ticket', subEs: 'Bajo precio' },
                                                { id: 'mid-ticket', label: '$197-$997', sub: 'Mid-ticket', subEs: 'Precio medio' },
                                                { id: 'high-ticket', label: '$1K-$5K', sub: 'High-ticket', subEs: 'Alto precio' },
                                                { id: 'premium', label: '$5K+', sub: 'Premium', subEs: 'Premium' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_price_point: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_price_point === opt.id}
                                                    className={`px-4 py-4 text-center rounded-xl border-2 transition-all ${data.questionnaire.creator_price_point === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    <p className={`font-bold ${data.questionnaire.creator_price_point === opt.id ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-gray-100'}`}>{opt.label}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{isEs ? (opt as any).subEs : opt.sub}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-acq-label">
                                        <h2 id="creator-acq-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P9. ¿Cómo adquieres clientes principalmente?' : 'Q9. How do you primarily acquire customers?'} <span className="text-gray-400 text-sm">{isEs ? '(Selecciona todas las que apliquen)' : '(Select all that apply)'}</span>
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {[
                                                { id: 'webinar', label: 'Webinars', labelEs: 'Webinars' },
                                                { id: 'challenge', label: 'Challenge Launches', labelEs: 'Lanzamientos con Reto' },
                                                { id: 'dm-selling', label: 'DM Selling', labelEs: 'Ventas por DM' },
                                                { id: 'email', label: 'Email Sequences', labelEs: 'Secuencias de Email' },
                                                { id: 'organic', label: 'Organic Content', labelEs: 'Contenido Orgánico' },
                                                { id: 'paid', label: 'Paid Ads', labelEs: 'Publicidad Pagada' },
                                                { id: 'referrals', label: 'Referrals', labelEs: 'Referencias' },
                                            ].map((opt) => {
                                                const isSelected = data.questionnaire.creator_acquisition?.includes(opt.id)
                                                return (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => {
                                                            const current = data.questionnaire.creator_acquisition || []
                                                            updateQ({
                                                                creator_acquisition: isSelected
                                                                    ? current.filter(c => c !== opt.id)
                                                                    : [...current, opt.id]
                                                            })
                                                        }}
                                                        aria-pressed={isSelected}
                                                        className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${isSelected
                                                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                            : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                            }`}
                                                    >
                                                        {isEs ? (opt as any).labelEs : opt.label}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-plat-label">
                                        <h2 id="creator-plat-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P10. ¿Qué plataformas impulsan tu audiencia?' : 'Q10. What platforms drive your audience?'} <span className="text-gray-400 text-sm">{isEs ? '(Selecciona todas las que apliquen)' : '(Select all that apply)'}</span>
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {[
                                                { id: 'youtube', label: 'YouTube', labelEs: 'YouTube' },
                                                { id: 'instagram', label: 'Instagram', labelEs: 'Instagram' },
                                                { id: 'tiktok', label: 'TikTok', labelEs: 'TikTok' },
                                                { id: 'twitter', label: 'Twitter/X', labelEs: 'Twitter/X' },
                                                { id: 'linkedin', label: 'LinkedIn', labelEs: 'LinkedIn' },
                                                { id: 'podcast', label: 'Podcast', labelEs: 'Podcast' },
                                                { id: 'substack', label: 'Substack/Newsletter', labelEs: 'Substack/Newsletter' },
                                                { id: 'other', label: 'Other', labelEs: 'Otro' },
                                            ].map((opt) => {
                                                const isSelected = data.questionnaire.creator_platforms?.includes(opt.id)
                                                return (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => {
                                                            const current = data.questionnaire.creator_platforms || []
                                                            updateQ({
                                                                creator_platforms: isSelected
                                                                    ? current.filter(c => c !== opt.id)
                                                                    : [...current, opt.id]
                                                            })
                                                        }}
                                                        aria-pressed={isSelected}
                                                        className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${isSelected
                                                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                            : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                            }`}
                                                    >
                                                        {isEs ? opt.labelEs : opt.label}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-list-label">
                                        <h2 id="creator-list-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P11. ¿Qué tamaño tiene tu lista de email?' : 'Q11. How big is your email list?'}
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { id: 'under-500', label: 'Under 500' },
                                                { id: '500-2000', label: '500 - 2,000' },
                                                { id: '2000-10000', label: '2,000 - 10,000' },
                                                { id: '10000-plus', label: '10,000+' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_email_list_size: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_email_list_size === opt.id}
                                                    className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${data.questionnaire.creator_email_list_size === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-sales-label">
                                        <h2 id="creator-sales-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P12. ¿Actualmente haces llamadas de ventas?' : 'Q12. Do you currently do sales calls?'}
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                { id: 'self-close', label: 'Yes - I close all my own sales', labelEs: 'Sí - Cierro todas mis ventas yo mismo/a' },
                                                { id: 'team', label: 'Yes - I have a setter/closer team', labelEs: 'Sí - Tengo un equipo de setter/closer' },
                                                { id: 'automated', label: 'No - I sell through automated funnels only', labelEs: 'No - Solo vendo a través de embudos automatizados' },
                                                { id: 'want-to-start', label: 'No - but I want to start doing calls', labelEs: 'No - pero quiero empezar a hacer llamadas' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_sales_call_status: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_sales_call_status === opt.id}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.creator_sales_call_status === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {isEs ? (opt as any).labelEs : opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section DISC placeholder for now */}
                            {currentSection.id === 'disc' && (
                                <div className="space-y-8">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {isEs ? '¿Cómo manejas estos escenarios de ventas? Esto nos ayuda a adaptar el tono de tu coaching y emparejarte con los escenarios de práctica correctos.' : 'How do you handle these common sales scenarios? This helps us tailor your coaching tone and match you with the right practice scenarios.'}
                                    </p>
                                    {[
                                        {
                                            id: 'disc1',
                                            scenario: 'A prospect starts drilling into technical details you don\'t know perfectly. Do you:',
                                            scenarioEs: 'Un prospecto empieza a profundizar en detalles técnicos que no conoces a la perfección. ¿Tú:',
                                            options: [
                                                { id: 'D', text: 'Confidently redirect to business outcomes you can speak to', textEs: 'Redirige con confianza hacia resultados de negocio que puedes hablar' },
                                                { id: 'I', text: 'Engage enthusiastically and promise to get them answers', textEs: 'Te involucras con entusiasmo y prometes conseguir las respuestas' },
                                                { id: 'S', text: 'Honestly admit the gap and offer to follow up with specifics', textEs: 'Admites honestamente el vacío y ofreces dar seguimiento con detalles' },
                                                { id: 'C', text: 'Ask clarifying questions to understand exactly what they need', textEs: 'Haces preguntas clarificadoras para entender exactamente qué necesitan' },
                                            ]
                                        },
                                        {
                                            id: 'disc2',
                                            scenario: 'When preparing for an important sales meeting, you prefer to:',
                                            scenarioEs: 'Al prepararte para una reunión de ventas importante, prefieres:',
                                            options: [
                                                { id: 'D', text: 'Dive in quickly — I\'ll figure it out as we go', textEs: 'Entrar directo — lo resuelvo sobre la marcha' },
                                                { id: 'I', text: 'Think about how to build rapport and connect first', textEs: 'Pensar en cómo generar rapport y conectar primero' },
                                                { id: 'S', text: 'Prepare thoroughly so nothing goes wrong', textEs: 'Prepararte a fondo para que nada salga mal' },
                                                { id: 'C', text: 'Research their company and prepare specific questions', textEs: 'Investigar su empresa y preparar preguntas específicas' },
                                            ]
                                        },
                                        {
                                            id: 'disc3',
                                            scenario: 'After a great product demo, you:',
                                            scenarioEs: 'Después de una excelente demo del producto, tú:',
                                            options: [
                                                { id: 'D', text: 'Push for a concrete next step or timeline', textEs: 'Presionas por un próximo paso concreto o un plazo' },
                                                { id: 'I', text: 'Share a success story to keep the excitement going', textEs: 'Compartes una historia de éxito para mantener la emoción' },
                                                { id: 'S', text: 'Respect their space and wait for them to reach out', textEs: 'Respetas su espacio y esperas a que se pongan en contacto' },
                                                { id: 'C', text: 'Offer additional documentation they can review', textEs: 'Ofreces documentación adicional que puedan revisar' },
                                            ]
                                        },
                                        {
                                            id: 'disc4',
                                            scenario: 'When handling a prospect\'s objection, you:',
                                            scenarioEs: 'Al manejar una objeción de un prospecto, tú:',
                                            options: [
                                                { id: 'D', text: 'Address it directly and move to close', textEs: 'La abordas directamente y avanzas hacia el cierre' },
                                                { id: 'I', text: 'Find common ground and keep the relationship warm', textEs: 'Buscas terreno común y mantienes la relación cálida' },
                                                { id: 'S', text: 'Acknowledge their concern and offer reassurance', textEs: 'Reconoces su preocupación y ofreces tranquilidad' },
                                                { id: 'C', text: 'Provide data and logical explanations', textEs: 'Provees datos y explicaciones lógicas' },
                                            ]
                                        },
                                    ].map((scenario, idx) => (
                                        <div key={scenario.id} className="space-y-4" role="group" aria-labelledby={`disc-label-${scenario.id}`}>
                                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                                <p id={`disc-label-${scenario.id}`} className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                                                    {isEs ? `Escenario ${idx + 1}: ` : `Scenario ${idx + 1}: `}{isEs ? (scenario as any).scenarioEs : scenario.scenario}
                                                </p>
                                                <div className="space-y-3">
                                                    {scenario.options.map((opt) => (
                                                        <button
                                                            key={opt.id}
                                                            type="button"
                                                            onClick={() => updateQ({ disc_answers: { ...(data.questionnaire.disc_answers || {}), [scenario.id]: opt.id } })}
                                                            aria-pressed={data.questionnaire.disc_answers?.[scenario.id] === opt.id}
                                                            className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.disc_answers?.[scenario.id] === opt.id
                                                                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                                : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 bg-white dark:bg-gray-900'
                                                                }`}
                                                        >
                                                            {isEs ? (opt as any).textEs : opt.text}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {currentSection.id === 'priorities' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="q15-label">
                                        <h2 id="q15-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P13. ¿Qué se siente más urgente ahora mismo?' : 'Q13. What feels most urgent right now?'}
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                { value: 'Building my prospect list (finding WHO to sell to)', labelEs: 'Construir mi lista de prospectos (encontrar A QUIÉN vender)' },
                                                { value: 'Getting responses to outreach (LinkedIn, cold email)', labelEs: 'Conseguir respuestas al outreach (LinkedIn, email frío)' },
                                                { value: 'Running better discovery calls', labelEs: 'Hacer mejores llamadas de descubrimiento' },
                                                { value: 'Giving demos that convert', labelEs: 'Dar demos que conviertan' },
                                                { value: 'Handling objections and closing deals', labelEs: 'Manejar objeciones y cerrar tratos' },
                                                { value: 'Systemizing what\'s working', labelEs: 'Sistematizar lo que funciona' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => updateQ({ urgency: opt.value })}
                                                    aria-pressed={data.questionnaire.urgency === opt.value}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.urgency === opt.value
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {isEs ? opt.labelEs : opt.value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentSection.id === 'capacity' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="q18-label">
                                        <h2 id="q18-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P14. Preferencia de estilo de aprendizaje' : 'Q14. Learning style preference'}
                                        </h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { id: 'aggressive', label: 'Give me frameworks, I\'ll figure it out (Aggressive)', labelEs: 'Dame los marcos, yo lo resuelvo (Agresivo)', sub: 'Fast-paced, high autonomy', subEs: 'Ritmo rápido, alta autonomía' },
                                                { id: 'assistive', label: 'Guide me step by step (Assistive)', labelEs: 'Guíame paso a paso (Asistivo)', sub: 'Structured, detailed guidance', subEs: 'Guía estructurada y detallada' },
                                                { id: 'adaptive', label: 'Mix of both depending on topic (Adaptive)', labelEs: 'Mezcla de ambos según el tema (Adaptativo)', sub: 'Balanced based on complexity', subEs: 'Equilibrado según la complejidad' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ learning_style: opt.id as any })}
                                                    aria-pressed={data.questionnaire.learning_style === opt.id}
                                                    className={`px-6 py-4 text-left rounded-xl border-2 transition-all ${data.questionnaire.learning_style === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    <p className={`font-semibold ${data.questionnaire.learning_style === opt.id ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                        {isEs ? (opt as any).labelEs : opt.label}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">{isEs ? (opt as any).subEs : opt.sub}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentSection.id === 'goals' && (
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label htmlFor="q19-success" className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                                            {isEs ? 'P15. ¿Cómo se ve el éxito en 90 días?' : 'Q15. What does success look like in 90 days?'}
                                        </label>
                                        <textarea
                                            id="q19-success"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none min-h-[120px]"
                                            placeholder={isEs ? 'Sé específico/a. ej. Cerrar 3 tratos enterprise, o establecer un pipeline predecible de 10 reuniones/mes...' : 'Be specific. e.g. Close 3 enterprise deals, or set up a predictable pipeline of 10 meetings/month...'}
                                            value={data.questionnaire.success_90_days}
                                            onChange={(e) => updateQ({ success_90_days: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Validation Error */}
                        {validationError && (
                            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm font-medium">
                                {validationError}
                            </div>
                        )}

                        {/* Navigation Footer */}
                        <div className="mt-12 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors"
                            >
                                {currentSectionIndex === 0 ? (isEs ? 'Volver a la Introducción' : 'Back to Intro') : (isEs ? 'Sección Anterior' : 'Previous Section')}
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={loading}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {isEs ? 'Guardando...' : 'Saving...'}
                                    </>
                                ) : (
                                    <>
                                        {currentSectionIndex === SECTIONS.length - 1 ? (isEs ? 'Completar Cuestionario' : 'Complete Questionnaire') : (isEs ? 'Siguiente Sección' : 'Next Section')}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
