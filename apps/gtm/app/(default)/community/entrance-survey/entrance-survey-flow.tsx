'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

type Step = 'business' | 'goals' | 'disc' | 'time' | 'submitting';

export default function EntranceSurveyFlow() {
  const router = useRouter();
  const locale = useLocale();
  const isEs = locale === 'es';
  const [step, setStep] = useState<Step>('business');
  const [error, setError] = useState('');

  // Business context
  const [product, setProduct] = useState('');
  const [businessModel, setBusinessModel] = useState<'b2b' | 'b2c' | 'hybrid'>('b2b');
  const [dealSize, setDealSize] = useState('');
  const [industry, setIndustry] = useState('');

  // Goals
  const [curriculumStage, setCurriculumStage] = useState<'foundation' | 'lead_gen' | 'sales_conv'>('foundation');
  const [painPoints, setPainPoints] = useState<string[]>([]);

  // DISC
  const [discAnswers, setDiscAnswers] = useState<string[]>([]);

  // Time
  const [timeCommitment, setTimeCommitment] = useState<'5-10h' | '10-15h' | '15-20h' | '20h+'>('10-15h');

  const togglePainPoint = (point: string) => {
    setPainPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point],
    );
  };

  const handleDiscAnswer = (index: number, disc: string) => {
    const updated = [...discAnswers];
    updated[index] = disc;
    setDiscAnswers(updated);
  };

  // Calculate DISC profile from answers
  const calculateDisc = (): { primary: 'D' | 'I' | 'S' | 'C'; secondary: 'D' | 'I' | 'S' | 'C' | null } => {
    const counts: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
    discAnswers.forEach((d) => {
      if (d) counts[d]++;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return {
      primary: sorted[0][0] as 'D' | 'I' | 'S' | 'C',
      secondary: sorted[1][1] > 0 ? sorted[1][0] as 'D' | 'I' | 'S' | 'C' : null,
    };
  };

  const handleSubmit = async () => {
    if (painPoints.length === 0) {
      setError(isEs ? 'Por favor selecciona al menos un punto de dolor' : 'Please select at least one pain point');
      return;
    }
    if (discAnswers.filter(Boolean).length < DISC_SCENARIOS.length) {
      setError(isEs ? 'Por favor responde todas las preguntas de personalidad' : 'Please answer all personality questions');
      return;
    }

    setStep('submitting');
    setError('');

    try {
      const res = await fetch('/api/community/entrance-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessContext: { product, businessModel, dealSize, industry },
          learningGoals: { curriculumStage, painPoints },
          discProfile: calculateDisc(),
          timeCommitment,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || 'Failed to submit survey');
      }

      router.push('/community');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('time');
    }
  };

  const DISC_SCENARIOS = isEs ? [
    {
      question: 'Un prospecto te hace una pregunta técnica que no sabes responder. Tú...',
      options: [
        { label: 'Dices que lo averiguarás y te pondrás en contacto en 24 horas', disc: 'D' },
        { label: 'Rediriges la conversación al valor que ofrece tu producto', disc: 'I' },
        { label: 'Le preguntas por qué ese detalle específico importa para su decisión', disc: 'S' },
        { label: 'Admites que no sabes pero repasas metódicamente lo que sí sabes', disc: 'C' },
      ],
    },
    {
      question: 'Acabas de perder un trato en el que confiabas. Tu primera reacción es...',
      options: [
        { label: 'Analizar qué salió mal y ajustar tu proceso', disc: 'C' },
        { label: 'Empezar inmediatamente a trabajar en el siguiente prospecto', disc: 'D' },
        { label: 'Contactar al prospecto para entender su decisión', disc: 'S' },
        { label: 'Compartir la historia con un colega para procesarla en voz alta', disc: 'I' },
      ],
    },
    {
      question: 'Un miembro de tu equipo sugiere un enfoque de ventas completamente nuevo. Tú...',
      options: [
        { label: 'Pides ver los datos o casos de estudio que lo respaldan', disc: 'C' },
        { label: 'Te emocionas y quieres probarlo en la próxima llamada', disc: 'I' },
        { label: 'Consideras cómo podría afectar las relaciones existentes', disc: 'S' },
        { label: 'Evalúas si es más rápido o eficiente que lo que haces ahora', disc: 'D' },
      ],
    },
    {
      question: 'Tienes una tarde libre sin reuniones. La utilizas para...',
      options: [
        { label: 'Procesar tu cola de emails en frío', disc: 'D' },
        { label: 'Ponerte al día con contactos y fortalecer relaciones', disc: 'I' },
        { label: 'Organizar tu CRM y actualizar tu pipeline', disc: 'C' },
        { label: 'Reflexionar sobre qué está funcionando y qué necesita cambiar', disc: 'S' },
      ],
    },
  ] : [
    {
      question: 'A prospect asks you a technical question you don\'t know the answer to. You...',
      options: [
        { label: 'Say you\'ll find out and get back to them within 24 hours', disc: 'D' },
        { label: 'Redirect the conversation to the value your product provides', disc: 'I' },
        { label: 'Ask them why that specific detail matters to their decision', disc: 'S' },
        { label: 'Admit you don\'t know but walk through what you do know methodically', disc: 'C' },
      ],
    },
    {
      question: 'You just lost a deal you were confident about. Your first reaction is to...',
      options: [
        { label: 'Analyze what went wrong and adjust your process', disc: 'C' },
        { label: 'Immediately start working on the next prospect', disc: 'D' },
        { label: 'Reach out to the prospect to understand their decision', disc: 'S' },
        { label: 'Share the story with a peer to process it out loud', disc: 'I' },
      ],
    },
    {
      question: 'Your team member suggests a completely new sales approach. You...',
      options: [
        { label: 'Ask to see the data or case studies supporting it', disc: 'C' },
        { label: 'Get excited and want to try it on the next call', disc: 'I' },
        { label: 'Consider how it might affect existing relationships', disc: 'S' },
        { label: 'Evaluate if it\'s faster or more efficient than what you do now', disc: 'D' },
      ],
    },
    {
      question: 'You have a free afternoon with no meetings. You spend it...',
      options: [
        { label: 'Blasting through your cold email queue', disc: 'D' },
        { label: 'Catching up with contacts and building relationships', disc: 'I' },
        { label: 'Organizing your CRM and updating your pipeline', disc: 'C' },
        { label: 'Reflecting on what\'s working and what needs to change', disc: 'S' },
      ],
    },
  ];

  const PAIN_POINT_OPTIONS = isEs ? [
    'Encontrar leads',
    'Obtener respuestas a prospección en frío',
    'Realizar llamadas de discovery',
    'Manejar objeciones',
    'Cerrar tratos',
    'Construir un proceso repetible',
    'Mantener la motivación / evitar el agotamiento',
    'Pricing y posicionamiento',
  ] : [
    'Finding leads',
    'Getting responses to cold outreach',
    'Running discovery calls',
    'Handling objections',
    'Closing deals',
    'Building a repeatable process',
    'Staying motivated / avoiding burnout',
    'Pricing and positioning',
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {isEs ? 'Únete a tu Pod de cohorte' : 'Join Your Cohort Pod'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {isEs ? 'Cuéntanos sobre ti para poder emparejarte con el grupo de pares adecuado.' : 'Tell us about yourself so we can match you with the right peer group.'}
        </p>
        {/* Progress */}
        <div className="flex gap-2 mt-4">
          {['business', 'goals', 'disc', 'time'].map((s, i) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${
                ['business', 'goals', 'disc', 'time'].indexOf(step) >= i
                  ? 'bg-primary-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Step 1: Business Context */}
      {step === 'business' && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {isEs ? 'Tu negocio' : 'About Your Business'}
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isEs ? '¿Qué vendes?' : 'What do you sell?'}
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder={isEs ? 'ej. SaaS para gestión de proyectos, servicios de consultoría...' : 'e.g. SaaS for project management, consulting services...'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isEs ? 'Modelo de negocio' : 'Business model'}
            </label>
            <div className="flex gap-3">
              {(['b2b', 'b2c', 'hybrid'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setBusinessModel(m)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                    businessModel === m
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isEs ? 'Tamaño promedio del trato' : 'Average deal size'}
            </label>
            <select
              value={dealSize}
              onChange={(e) => setDealSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm"
            >
              <option value="">{isEs ? 'Selecciona...' : 'Select...'}</option>
              <option value="under-500">{isEs ? 'Menos de $500' : 'Under $500'}</option>
              <option value="500-5k">$500 - $5,000</option>
              <option value="5k-25k">$5,000 - $25,000</option>
              <option value="25k-plus">$25,000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isEs ? 'Industria' : 'Industry'}
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder={isEs ? 'ej. SaaS, Servicios Profesionales, eCommerce...' : 'e.g. SaaS, Professional Services, eCommerce...'}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm"
            />
          </div>
          <button
            onClick={() => setStep('goals')}
            disabled={!product || !dealSize || !industry}
            className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isEs ? 'Continuar' : 'Continue'}
          </button>
        </div>
      )}

      {/* Step 2: Learning Goals */}
      {step === 'goals' && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {isEs ? 'Objetivos de aprendizaje' : 'Learning Goals'}
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isEs ? '¿Dónde estás en tu camino de ventas?' : 'Where are you in your sales journey?'}
            </label>
            <div className="space-y-2">
              {[
                { value: 'foundation' as const, label: isEs ? 'Recién empezando - definiendo ICP y posicionamiento' : 'Just starting - figuring out ICP and positioning' },
                { value: 'lead_gen' as const, label: isEs ? 'Empezando con la prospección y generación de leads' : 'Getting started with outreach and lead generation' },
                { value: 'sales_conv' as const, label: isEs ? 'Teniendo conversaciones pero con dificultad para cerrar' : 'Having conversations but struggling to close' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCurriculumStage(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm border ${
                    curriculumStage === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isEs ? 'Mayores puntos de dolor (selecciona todos los que apliquen)' : 'Biggest pain points (select all that apply)'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PAIN_POINT_OPTIONS.map((point) => (
                <button
                  key={point}
                  onClick={() => togglePainPoint(point)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border text-left ${
                    painPoints.includes(point)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {point}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('business')}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-lg"
            >
              {isEs ? 'Atrás' : 'Back'}
            </button>
            <button
              onClick={() => { setError(''); setStep('disc'); }}
              disabled={painPoints.length === 0}
              className="flex-1 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isEs ? 'Continuar' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: DISC Assessment */}
      {step === 'disc' && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {isEs ? 'Estilo de comunicación' : 'Communication Style'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isEs ? 'Elige la respuesta que te resulte más natural. No hay respuestas incorrectas.' : 'Choose the response that feels most natural to you. There are no wrong answers.'}
          </p>
          {DISC_SCENARIOS.map((scenario, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {idx + 1}. {scenario.question}
              </p>
              <div className="space-y-1.5">
                {scenario.options.map((opt) => (
                  <button
                    key={opt.disc + opt.label}
                    onClick={() => handleDiscAnswer(idx, opt.disc)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm border ${
                      discAnswers[idx] === opt.disc
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <button
              onClick={() => setStep('goals')}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-lg"
            >
              {isEs ? 'Atrás' : 'Back'}
            </button>
            <button
              onClick={() => { setError(''); setStep('time'); }}
              disabled={discAnswers.filter(Boolean).length < DISC_SCENARIOS.length}
              className="flex-1 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isEs ? 'Continuar' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Time Commitment */}
      {step === 'time' && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {isEs ? 'Compromiso de tiempo' : 'Time Commitment'}
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isEs ? '¿Cuánto tiempo por semana puedes dedicar a las actividades del pod?' : 'How much time per week can you dedicate to pod activities?'}
            </label>
            <div className="space-y-2">
              {[
                { value: '5-10h' as const, label: '5-10 hours/week', desc: isEs ? 'Participación ligera' : 'Light participation' },
                { value: '10-15h' as const, label: '10-15 hours/week', desc: isEs ? 'Miembro activo' : 'Active member' },
                { value: '15-20h' as const, label: '15-20 hours/week', desc: isEs ? 'Muy comprometido' : 'Highly engaged' },
                { value: '20h+' as const, label: '20+ hours/week', desc: isEs ? 'Totalmente comprometido' : 'All in' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTimeCommitment(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm border ${
                    timeCommitment === opt.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  <span className="text-gray-500 ml-2">- {opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('disc')}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-lg"
            >
              {isEs ? 'Atrás' : 'Back'}
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isEs ? 'Encontrar mi Pod' : 'Find My Pod'}
            </button>
          </div>
        </div>
      )}

      {/* Submitting */}
      {step === 'submitting' && (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {isEs ? 'Encontrando tu pod perfecto...' : 'Finding your perfect pod match...'}
          </p>
        </div>
      )}
    </div>
  );
}
