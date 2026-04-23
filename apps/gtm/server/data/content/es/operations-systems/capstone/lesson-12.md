---
title: "Presentación de Certificación y Revisión"
duration: "60 min"
track: "Operations & Systems"
course: "Course 48: Sales System Capstone"
lesson: 12
---

## El Momento de la Certificación

Has completado ocho cursos del Track 7, un sprint de 30 días de ejecución, y la documentación de seis componentes de tu sistema. Esta lección es la evaluación final: la presentación de certificación.

La presentación de certificación tiene una estructura específica. No es una presentación de empresa general ni un pitch de ventas. Es una demostración de que puedes articular cómo funciona tu sistema de adquisición de clientes — quién, cómo, qué mides, y qué has aprendido.

Un asesor, inversor o posible socio debería poder entender completamente tu sistema de adquisición en 10-15 minutos después de ver esta presentación.

<InsightCard icon="🏆" title="El Estándar de la Certificación">
Superas la certificación si puedes responder cada una de las preguntas del marco de 5 preguntas con respuestas específicas, medibles y honestas — respaldadas por datos reales de tu sprint de 30 días. Las respuestas vagas o aspiracionales no pasan el estándar de certificación.
</InsightCard>

## La Estructura de la Presentación de Certificación

<SlideNavigation>
<Slide title="Diapositiva 1: Resumen del Sistema (1 min)">

**Lo que cubre:**

- Quién eres y qué hace tu negocio (2 oraciones)
- Tu etapa actual: MRR, número de clientes, tiempo operando
- La etapa del playbook situacional que más aplica a tu situación actual (cero clientes, SaaS B2B, coach/consultor, creador, escalando)

**El estándar:** Un extraño entiende exactamente qué construiste y dónde estás en tu trayectoria en 60 segundos.

</Slide>
<Slide title="Diapositiva 2: QUIÉN — Tu ICP (2 min)">

**Lo que cubre:**

- Declaración del ICP en una oración (título, tipo de empresa, tamaño, dolor específico, señal de compra)
- Por qué elegiste este ICP (¿qué datos te llevaron aquí?)
- Cómo reconoces a tu ICP en la práctica (señales concretas)

**El estándar:** Puedes nombrar 5 personas reales que encajan con tu ICP ahora mismo, sin mirar tus notas.

</Slide>
<Slide title="Diapositiva 3: CÓMO — Tus Canales de Adquisición (2 min)">

**Lo que cubre:**

- Canal primario con volumen semanal específico (no "correo frío" sino "50 correos personalizados/semana vía Apollo a [filtros específicos de ICP]")
- Canal secundario con volumen semanal específico
- Stack de herramientas y costo mensual total

**El estándar:** Alguien más podría ejecutar tu sistema de adquisición el próximo lunes usando solo esta diapositiva.

</Slide>
<Slide title="Diapositiva 4: QUÉ — Tu Mensaje Central (2 min)">

**Lo que cubre:**

- Declaración del problema (1 oración — en las palabras del cliente, no en las tuyas)
- Promesa de transformación (1 oración)
- Punto de prueba principal (métrica específica, no vaga)
- CTA primario

**El estándar:** Este mensaje haría que tu ICP pensara "eso me suena exactamente a mí."

</Slide>
<Slide title="Diapositiva 5: MEDIDO — Tus Datos del Sprint (2 min)">

**Lo que cubre:**

- Datos de actividad del sprint de 30 días (mensajes enviados, tasa de ejecución)
- Resultados de métricas leading (tasa de apertura, tasa de respuesta, reuniones reservadas)
- Pipeline generado y acuerdos cerrados
- Aprendizaje #1 del sprint (la cosa más importante que descubriste)

**El estándar:** Puedes distinguir claramente entre lo que planeaste y lo que realmente pasó, y tienes una hipótesis sobre por qué.

</Slide>
<Slide title="Diapositiva 6: COMPROMETIDO — Tus Próximos 90 Días (2 min)">

**Lo que cubre:**

- Tu compromiso diario y semanal específico para los próximos 90 días
- El único cambio que harás en el Sprint 2 basado en los datos del Sprint 1
- Tus objetivos de 90 días para las métricas leading y lagging

**El estándar:** Este plan es específico, medible y honesto — no aspiracional.

</Slide>
</SlideNavigation>

## La Presentación de Certificación en la Práctica

<MiniRoleplay
  scenario="Estás presentando tu sistema de adquisición a un asesor de confianza. Han visto cien presentaciones de fundadores. Empiezan con: 'Explícame cómo consigues clientes. Sé específico.'"
  role="Tú (presentando tu sistema)"
  persistKey="capstone-L12-roleplay"
  modelResponse="Aquí hay cómo debería sonar una respuesta de certificación: 'Apunto a [título específico] en [tipo y tamaño de empresa] que experimenta [problema específico]. Mi canal primario es correo frío — envío 50 correos personalizados por semana usando Apollo para construir la lista e Instantly para el envío. En mi sprint de 30 días, envié [X] correos y obtuve una tasa de respuesta del [X]%. Reservé [X] reuniones de descubrimiento y tengo [X] oportunidades activas en pipeline valoradas en [$X]. El mayor aprendizaje fue [aprendizaje específico], que estoy integrando en mi Sprint 2 cambiando [un cambio específico]. Para los próximos 90 días, me comprometo a [actividad diaria específica con número] y apunto a [objetivo de métrica leading].' Específico, honesto, respaldado por datos reales."
/>

## Tu Lista de Verificación de Certificación Final

<TemplateBuilder
title="Plantilla de Presentación de Certificación"
persistKey="capstone-L12-presentation"
sections={[
{
id: "slide1",
title: "Diapositiva 1: Resumen del Sistema",
fields: [
{ id: "what", label: "¿Qué hace tu negocio? (2 oraciones)", placeholder: "p. ej., Ayudo a fundadores de SaaS B2B a construir sistemas de adquisición de clientes predecibles. Mi producto es [descripción].", type: "textarea" },
{ id: "stage", label: "Tu etapa actual", placeholder: "p. ej., $18K MRR, 12 clientes, 14 meses operando", type: "text" },
{ id: "playbook", label: "Tu playbook situacional", placeholder: "p. ej., B2B SaaS Founder (Lección 3 del Curso 44)", type: "text" }
]
},
{
id: "slide5",
title: "Diapositiva 5: Datos del Sprint de 30 Días",
fields: [
{ id: "activity", label: "Actividad del sprint (enviados, tasa de ejecución)", placeholder: "p. ej., 210 correos enviados en 20 días hábiles. Tasa de ejecución: 90% (18/20 días).", type: "text" },
{ id: "results", label: "Resultados de métricas leading", placeholder: "p. ej., Tasa de apertura: 34%. Tasa de respuesta: 5.7%. Reuniones reservadas: 3.", type: "text" },
{ id: "learning", label: "Aprendizaje #1 del sprint", placeholder: "p. ej., Los correos que referenciaban señales de trigger específicas tuvieron el doble de tasa de respuesta que los correos genéricos del ICP", type: "textarea" }
]
}
]}
/>

<InteractiveChecklist
title="Lista de Verificación Final del Capstone"
persistKey="capstone-L12-final"
items={[
"Los 6 documentos del sistema están completos y en una ubicación central (Notion, Google Drive)",
"Los datos del Sprint de 30 días están documentados con métricas reales",
"La presentación de certificación puede completarse en 10-15 minutos",
"Puedo responder las 5 preguntas del marco (Quién, Cómo, Qué, Medido, Comprometido) sin notas",
"Mi próximo sprint de 30 días está planificado con un cambio de un solo variable identificado",
"Tengo un socio de responsabilidad que ha visto mis datos del sprint y mi plan del próximo sprint",
"He documentado los 3 principales aprendizajes de todo el Curso 48 Capstone"
]}
/>

## Felicitaciones: Arquitecto de Sistemas de Adquisición

Has completado el Course 48: Sales System Capstone — y con él, el Track 7: Operations & Systems completo.

Lo que has construido durante esta academia no es una colección de frameworks aprendidos. Es un sistema de adquisición de clientes real, ejecutado, documentado y respaldado por datos.

Los fundadores que construyen sistemas así — específicos, honestos sobre las métricas, comprometidos a revisar y actualizar — construyen negocios que escalan. Los que improvisan, aunque talentosos, siempre están comenzando de nuevo.

Tu sistema ahora existe. Ejecútalo.
