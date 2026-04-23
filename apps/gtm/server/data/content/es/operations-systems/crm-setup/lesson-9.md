---
title: "Migración: Cómo Cambiar de CRM Sin Perder Datos"
duration: "45 min"
track: "Operaciones y Sistemas"
course: "Curso 40: Configuración Avanzada de CRM"
lesson: 9
---

## El Error de $12K

Sarah llevaba 18 meses usando HubSpot Free. 847 contactos. 143 tratos activos. Miles de correos y notas registradas. Su pipeline finalmente estaba limpio, sus campos estaban listos para IA y acababa de cerrar su mejor mes.

Entonces vio el demo de Attio. La UI moderna. El enriquecimiento automático. El modelo de datos flexible. Se registró esa tarde.

Para el viernes, había importado sus contactos vía CSV. Para el lunes, se dio cuenta:

- El 40% de sus campos personalizados no se mapearon
- Cada hilo de correo era ahora una única nota plana
- Las etapas de su pipeline eran valores predeterminados genéricos
- Todos sus disparadores de automatización habían desaparecido
- El historial de sus tratos mostraba "Importado el [fecha]" sin ningún contexto

Pasó las siguientes tres semanas reconstruyendo todo. Durante ese tiempo, perdió el seguimiento de dos tratos calientes (valor combinado: $12K) porque no podía encontrar el contexto que necesitaba.

**La lección:** La migración no consiste solo en mover datos. Se trata de preservar la _inteligencia_ en tu CRM — la estructura, el historial, los disparadores que te indican qué hacer a continuación.

<InsightCard icon="⚠️" title="La Paradoja de la Migración">
Cuanto mejor sea tu configuración actual del CRM, más difícil se vuelve la migración. Un CRM bien configurado con campos personalizados, automatizaciones y datos estructurados tiene más que perder que una simple lista de contactos glorificada.
</InsightCard>

---

## Cuándo la Migración Tiene Sentido

No toda frustración con el CRM justifica una migración. Separemos los bloqueadores reales del síndrome del objeto brillante.

<SwipeDecision
title="¿Migrar o Quedarse?"
description="Desliza a la derecha para razones legítimas de migración, a la izquierda para malas razones"
optionA="Mala Razón"
optionB="Buena Razón"
persistKey="crm-setup-L9-migrate-decision"
cards={[
{
id: "1",
content: "Estás aburrido de la UI y quieres algo que se vea más moderno",
correctOption: "a",
explanation: "Las preferencias de UI no justifican 20-40 horas de trabajo de migración. En su lugar, personaliza el panel de tu CRM actual."
},
{
id: "2",
content: "Has alcanzado el límite de contactos en tu nivel gratuito y el nivel de pago cuesta 3 veces tu presupuesto",
correctOption: "b",
explanation: "La economía importa. Si HubSpot Starter a $20/mes no encaja pero Pipedrive a $14/mes sí, la migración tiene sentido."
},
{
id: "3",
content: "Tu movimiento de ventas cambió de basado en relaciones a outbound de alto volumen y tu CRM no tiene secuencias",
correctOption: "b",
explanation: "Las brechas de funcionalidades fundamentales que bloquean tu flujo de trabajo principal justifican la migración."
},
{
id: "4",
content: "Viste un demo de un nuevo CRM y tiene una funcionalidad que todavía no has intentado usar",
correctOption: "a",
explanation: "Migra por funcionalidades que *actualmente te bloquean*, no por funcionalidades que *podrías querer algún día*."
},
{
id: "5",
content: "Estás usando menos del 50% de las capacidades de tu CRM actual y crees que una herramienta más simple sería mejor",
correctOption: "a",
explanation: "La subutilización es un problema de uso, no de herramienta. Aprende tu CRM actual primero."
},
{
id: "6",
content: "Tu CRM actual no puede estructurar datos de una manera que los agentes de IA puedan razonar, y estás construyendo agentes del Curso 27",
correctOption: "b",
explanation: "Si la arquitectura de tu CRM bloquea tu estrategia de IA, la migración a una plataforma lista para IA (como Attio) está justificada."
}
]}
/>

### El Marco de Decisión de Migración

Antes de exportar un solo CSV, responde estas cuatro preguntas:

<TemplateBuilder
title="Auditoría de Decisión de Migración"
persistKey="crm-setup-L9-decision-audit"
sections={[
{
id: "utilization",
title: "Utilización del CRM Actual",
fields: [
{
id: "features-used",
label: "¿Qué % de las funcionalidades de tu CRM actual usas activamente?",
placeholder: "ej., 80% — uso pipelines, sincronización de correo, campos personalizados y automatización básica",
type: "textarea"
},
{
id: "blocker-type",
label: "¿Tu bloqueador es una brecha de funcionalidad o una brecha de uso?",
placeholder: "Brecha de funcionalidad: el CRM literalmente no puede hacer X. Brecha de uso: todavía no he aprendido cómo hacer X.",
type: "textarea"
}
]
},
{
id: "timing",
title: "Momento de la Migración",
fields: [
{
id: "active-deals",
label: "¿Cuántos tratos activos tienes en tu pipeline ahora mismo?",
placeholder: "ej., 12 tratos, 3 están cerca de cerrarse",
type: "text"
},
{
id: "slow-period",
label: "¿Cuándo es tu próximo período tranquilo (baja actividad de tratos)?",
placeholder: "ej., Últimas dos semanas de diciembre, primera semana de agosto",
type: "text"
}
]
},
{
id: "cost-benefit",
title: "Análisis Costo-Beneficio",
fields: [
{
id: "migration-cost",
label: "¿Cuántas horas tomará la migración? (20-40 horas es lo típico)",
placeholder: "ej., 30 horas — exportación de datos, mapeo, importación, validación, reconstrucción de automatizaciones",
type: "text"
},
{
id: "opportunity-cost",
label: "¿Qué tratos o ingresos podrías perder durante la interrupción de la migración?",
placeholder: "ej., Riesgo de perder seguimientos en 2-3 tratos cálidos por valor de ~$8K en total",
type: "textarea"
}
]
},
{
id: "verdict",
title: "Tu Veredicto",
fields: [
{
id: "decision",
label: "¿Migrar ahora, migrar después, o quedarse?",
placeholder: "Indica tu decisión y razonamiento",
type: "textarea"
}
]
}
]}
/>

<InsightCard icon="📊" title="La Regla del 80%">
Si usas menos del 80% de las capacidades de tu CRM actual, tienes un problema de aprendizaje, no un problema de herramienta. Domina lo que tienes antes de cambiar.
</InsightCard>

---

## La Lista de Verificación Completa de Migración

Si has decidido que la migración está justificada, aquí está el protocolo paso a paso que preserva tus datos _y_ tu inteligencia.

<ProgressiveReveal title="Protocolo de Migración en 7 Pasos" persistKey="crm-setup-L9-protocol">

<RevealSection title="Paso 1: Exporta Todo (No Confíes en Exportaciones Parciales)">

La mayoría de los CRMs te permiten exportar contactos, tratos y empresas como CSVs separados. **Esto es una trampa.** Necesitas:

- **Contactos** — Todos los campos, incluidas las propiedades personalizadas
- **Empresas** — Todos los campos, incluidas las propiedades personalizadas
- **Tratos** — Todos los campos, historial de etapas, contactos asociados
- **Actividades** — Correos, llamadas, reuniones, notas (con marcas de tiempo)
- **Definiciones de campos personalizados** — Nombres de campos, tipos, valores de listas desplegables
- **Configuración del pipeline** — Nombres de etapas, probabilidades, disparadores de automatización

**Cómo exportar:**

- **HubSpot:** Configuración → Gestión de Datos → Exportar → Seleccionar todos los tipos de objetos → Incluir todas las propiedades
- **Pipedrive:** Configuración → Importar/Exportar → Exportar datos → Seleccionar todas las entidades
- **Attio:** Configuración → Datos → Exportar → Elegir JSON (preserva mejor la estructura que CSV)
- **Folk:** Exportar → Descargar todos los datos → Incluye fuentes de enriquecimiento
- **Close:** Configuración → Exportar → Seleccionar todos los tipos de datos

<ExampleCard label="Lo Que Sarah Omitió">
Sarah exportó solo contactos y tratos. No exportó:
- Línea de tiempo de actividad (todos sus correos registrados se convirtieron en "Nota importada")
- Definiciones de campos personalizados (tuvo que recrear las listas desplegables manualmente)
- Historial de etapas del pipeline (perdió visibilidad de cuánto tiempo los tratos estuvieron en cada etapa)

Resultado: 3 semanas de reconstrucción manual.
</ExampleCard>

**Acción:** Exporta todo. Guarda las exportaciones en una carpeta dedicada con la fecha de hoy. Consultarás estos archivos múltiples veces.

</RevealSection>

<RevealSection title="Paso 2: Mapea los Campos Entre el CRM Antiguo y el Nuevo">

Aquí es donde la mayoría de las migraciones se rompen. El "Estado del Lead" de tu CRM anterior podría mapearse a la "Etapa del Ciclo de Vida" del nuevo CRM — o podría no existir en absoluto.

<ComparisonBuilder
title="Ejercicio de Mapeo de Campos"
persistKey="crm-setup-L9-field-mapping"
prompt="Mapea 5 de tus campos personalizados más importantes desde tu CRM actual hacia el CRM destino"
expertExample="Anterior: 'Puntuación de Ajuste ICP' (número 1-10) → Nuevo: 'Puntuación de Calificación' (lista desplegable: Bajo/Medio/Alto) — TRANSFORMACIÓN NECESARIA: Convertir 1-3 a Bajo, 4-7 a Medio, 8-10 a Alto"
criteria={[
"Identifica los nombres exactos de los campos en ambos sistemas",
"Anota las diferencias de tipo de campo (número vs. lista desplegable vs. texto)",
"Especifica la lógica de transformación cuando los tipos no coincidan",
"Señala los campos que no tienen equivalente en el nuevo CRM"
]}
/>

**Trampas comunes del mapeo:**

| Campo del CRM Antiguo            | Campo del CRM Nuevo          | Trampa                            | Solución                                                                            |
| -------------------------------- | ---------------------------- | --------------------------------- | ----------------------------------------------------------------------------------- |
| Lista desplegable personalizada  | Campo de texto libre         | Pierde estructura                 | Recrear lista desplegable en nuevo CRM primero                                      |
| Etiquetas de selección múltiple  | Propiedad de selección única | Pierde datos de múltiples valores | Elegir etiqueta principal o crear múltiples campos                                  |
| Línea de tiempo de actividad     | Notas planas                 | Pierde cronología                 | Exportar actividades por separado, importar como tareas/notas con fechas            |
| Historial de etapas del pipeline | Solo etapa actual            | Pierde datos de velocidad         | Aceptar la pérdida o registrar manualmente las transiciones clave de etapa en notas |

</RevealSection>

<RevealSection title="Paso 3: Prueba la Importación con 20 Registros">

**Nunca hagas una importación completa primero.** Prueba con un lote pequeño para detectar errores de mapeo antes de que corrompan toda tu base de datos.

**Protocolo de importación de prueba:**

1. Selecciona 20 registros diversos:
   - 5 contactos simples (nombre, correo, empresa)
   - 5 contactos con campos personalizados completados
   - 5 tratos en diferentes etapas del pipeline
   - 5 registros con historial de actividad enriquecido

2. Importa el lote de prueba

3. Verifica en el nuevo CRM:
   - Todos los campos mapeados correctamente
   - Valores de listas desplegables preservados
   - Registros asociados vinculados (contacto → empresa → trato)
   - Marcas de tiempo de actividad intactas
   - No se crearon registros duplicados

4. Si algo se rompió, corrige el mapeo y vuelve a probar

<InsightCard icon="🔬" title="La Regla de los 20 Registros">
Probar con 20 registros detecta el 90% de los errores de mapeo. Probar con 5 detecta el 50%. Probar con 0 registros (importación completa a ciegas) detecta el 0% y crea 847 registros corruptos.
</InsightCard>

</RevealSection>

<RevealSection title="Paso 4: Importación Completa (Con Plan de Respaldo)">

Una vez que tu importación de prueba esté limpia, procede con la importación completa.

**Lista de verificación previa a la importación:**

<InteractiveChecklist
title="Verificación Previa a la Importación"
persistKey="crm-setup-L9-pre-import"
items={[
"Importación de prueba validada con 20 registros",
"Mapeo de campos documentado en hoja de cálculo",
"Campos personalizados creados en el nuevo CRM (con los mismos valores de lista desplegable)",
"Etapas del pipeline configuradas para coincidir con el CRM antiguo",
"Copia de seguridad de los datos del CRM antiguo almacenada localmente (la necesitarás por 30 días)",
"La cuenta del nuevo CRM tiene suficiente almacenamiento/límites de contactos para la importación completa",
"Sincronización de correo DESHABILITADA en el nuevo CRM (evitar envíos duplicados durante la migración)"
]}
/>

**El orden de importación importa:**

1. **Empresas primero** (si es B2B)
2. **Contactos segundo** (asociados a empresas)
3. **Tratos tercero** (asociados a contactos y empresas)
4. **Actividades al final** (asociadas a contactos y tratos)

**¿Por qué este orden?** La mayoría de los CRMs requieren que los registros padre existan antes de poder asociar registros hijo. Importar tratos antes que contactos crea tratos huérfanos.

</RevealSection>

<RevealSection title="Paso 5: Verifica la Integridad de los Datos">

¿Importación completada? No celebres todavía. Comprueba al azar el 10% de tus registros para detectar fallos silenciosos.

<ClassifyExercise
title="Verificaciones de Integridad de Datos"
persistKey="crm-setup-L9-integrity-checks"
categories={[
{ id: "pass", label: "✅ Aprobado", color: "#10b981" },
{ id: "fail", label: "❌ Fallido", color: "#ef4444" },
{ id: "warning", label: "⚠️ Advertencia", color: "#f59e0b" }
]}
items={[
{
id: "1",
content: "El total de contactos en el nuevo CRM coincide con la exportación del CRM antiguo",
correctCategory: "pass",
explanation: "Si los conteos no coinciden, algunos registros fallaron en la importación"
},
{
id: "2",
content: "El campo personalizado 'Puntuación de Ajuste ICP' aparece en blanco para el 80% de los contactos",
correctCategory: "fail",
explanation: "El mapeo de campo se rompió. Vuelve a importar con el mapeo corregido."
},
{
id: "3",
content: "El valor total del pipeline es $50K en el nuevo CRM vs $52K en el CRM antiguo",
correctCategory: "warning",
explanation: "Discrepancia pequeña — revisa algunos tratos para encontrar la diferencia"
},
{
id: "4",
content: "La actividad de correo muestra 'Importado el [fecha]' en lugar de las fechas de envío originales",
correctCategory: "fail",
explanation: "La línea de tiempo de actividad perdió las marcas de tiempo. Comprueba si la exportación del CRM antiguo incluía campos de fecha."
},
{
id: "5",
content: "Las asociaciones contacto-empresa intactas para todos los contactos B2B",
correctCategory: "pass",
explanation: "Relaciones preservadas correctamente"
}
]}
/>

**Protocolo de verificación aleatoria:**

- Elige 10 contactos al azar → verifica que todos los campos personalizados estén correctamente completados
- Elige 5 tratos activos → verifica etapa, monto, contactos asociados y notas intactos
- Comprueba 3 contactos con historial de correo enriquecido → verifica que la línea de tiempo de actividad esté preservada
- Busca duplicados conocidos → verifica que la lógica de deduplicación funcionó

</RevealSection>

<RevealSection title="Paso 6: Reconstruye las Automatizaciones">

Las automatizaciones de tu CRM antiguo no se transfieren. Debes reconstruirlas manualmente en el nuevo sistema.

**Orden prioritario de reconstrucción de automatizaciones:**

1. **Sincronización de correo** — Vuelve a activar y prueba con un correo personal
2. **Señales de tratos obsoletos** — Marca automáticamente los tratos sin actividad en 14+ días
3. **Recordatorios de seguimiento** — Crea tareas automáticamente cuando los tratos avanzan etapas
4. **Disparadores de enriquecimiento** — Enriquece automáticamente los nuevos contactos al crearlos
5. **Reglas de notificación** — Alértate cuando leads calientes respondan o los tratos se estanquen

<TemplateBuilder
title="Plan de Reconstrucción de Automatizaciones"
persistKey="crm-setup-L9-automation-rebuild"
sections={[
{
id: "critical",
title: "Automatizaciones Críticas (Reconstruir el Día 1)",
fields: [
{
id: "automation-1",
label: "Automatización 1",
placeholder: "ej., Sincronización de correo — Gmail al CRM, bidireccional",
type: "text"
},
{
id: "automation-2",
label: "Automatización 2",
placeholder: "ej., Señal de trato obsoleto — sin actividad 14 días → etiquetar 'Necesita Seguimiento'",
type: "text"
}
]
},
{
id: "important",
title: "Automatizaciones Importantes (Reconstruir en la Semana 1)",
fields: [
{
id: "automation-3",
label: "Automatización 3",
placeholder: "ej., Enriquecimiento de nuevo contacto — búsqueda en Apollo al crear",
type: "text"
}
]
},
{
id: "nice-to-have",
title: "Automatizaciones Deseables (Reconstruir en la Semana 2)",
fields: [
{
id: "automation-4",
label: "Automatización 4",
placeholder: "ej., Correo de resumen semanal del pipeline",
type: "text"
}
]
}
]}
/>

</RevealSection>

<RevealSection title="Paso 7: Actualiza las Integraciones">

Tu CRM antiguo estaba conectado a otras herramientas. Vuelve a conectarlas al nuevo CRM.

**Integraciones comunes que actualizar:**

- **Herramientas de correo** (Instantly, Lemlist, Woodpecker) → Reconectar a la API del nuevo CRM
- **Herramientas de enriquecimiento** (Apollo, Clay) → Actualizar destino del CRM
- **Flujos de trabajo de Zapier/Make** → Reemplazar disparadores/acciones del CRM antiguo por los del nuevo
- **Sincronización de calendario** (Calendly, Cal.com) → Reconectar al nuevo CRM para registro de reuniones
- **Paneles de análisis** (si construiste alguno en el Curso 41) → Actualizar fuente de datos

<InteractiveChecklist
title="Lista de Verificación de Actualización de Integraciones"
persistKey="crm-setup-L9-integrations"
items={[
"Herramienta de prospección por correo reconectada y probada",
"Automatización de enriquecimiento actualizada al nuevo CRM",
"Flujos de trabajo de Zapier/Make actualizados y probados",
"Sincronización de calendario reconectada",
"Cualquier integración de API personalizada actualizada",
"Paneles de análisis apuntando a la fuente de datos del nuevo CRM"
]}
/>

</RevealSection>

</ProgressiveReveal>

---

## Preservando Datos Listos para IA Durante la Migración

Si seguiste la Lección 6 y construiste un esquema de campos listo para IA, la migración es especialmente arriesgada. Los datos estructurados pueden fácilmente aplanarse en notas de texto libre.

<InsightCard icon="🤖" title="La Regla de Preservación de Datos de IA">
Si un campo era estructurado en tu CRM antiguo (lista desplegable, fecha, número), DEBE permanecer estructurado en tu nuevo CRM. Aplanar campos estructurados en notas los hace invisibles para los agentes de IA.
</InsightCard>

### Lista de Verificación de Mapeo de Datos Listos para IA

<InteractiveChecklist
title="Preservación de Datos de IA"
persistKey="crm-setup-L9-ai-preservation"
items={[
"Los campos del registro de eventos (event_type, event_date, event_outcome) se mapean a campos estructurados, no a notas de texto libre",
"Los indicadores de salud (days_since_last_contact, engagement_trend) se preservan como números/listas desplegables",
"La puntuación de ajuste ICP permanece como número (1-10) o lista desplegable estructurada (Bajo/Medio/Alto)",
"La fuente del lead, el competidor mencionado y el campeón identificado permanecen como campos categóricos",
"La línea de tiempo de actividad preserva las marcas de tiempo y los tipos de eventos (no aplanada a 'Nota importada')",
"Los campos personalizados utilizados por los agentes del Curso 27 se recrean ANTES de la importación"
]}
/>

### La Prueba "¿Lo Entendería un Agente?"

Antes de finalizar el mapeo de campos, pega un registro de muestra en ChatGPT y pregunta:

> "Basándote en este registro de contacto, ¿con quién debería hacer seguimiento hoy y por qué?"

Si la IA no puede responder porque faltan campos críticos o están desestructurados, corrige tu mapeo.

<ExampleCard label="Registros Legibles vs. Ciegos para la IA">

**Registro Legible para IA (Estructurado):**

```
Nombre: Sarah Chen
Empresa: DataPulse Inc
Cargo: VP de Marketing
Puntuación de Ajuste ICP: 9
Fecha del Último Contacto: 2025-01-15
Tendencia de Engagement: Al alza
Tipo del Último Evento: Respuesta de Correo
Resultado del Último Evento: Positivo
Próxima Acción: Enviar propuesta de precios
Fecha de la Próxima Acción: 2025-01-20
```

**Registro Ciego para IA (Aplanado):**

```
Nombre: Sarah Chen
Notas: Hablé con ella el 15/01, parecía interesada, necesito hacer seguimiento con precios
```

El primer registro permite a un agente de IA razonar: "Sarah tiene alto ajuste, recientemente interactuó de forma positiva y tiene una próxima acción programada. Priorizarla." El segundo registro es opaco.

</ExampleCard>

---

## Protocolo de Validación Post-Migración

¿Migración completada? Ejecuta este protocolo de validación antes de confiar en tu nuevo CRM.

<TimedChallenge
title="Detecta el Fallo de Migración"
persistKey="crm-setup-L9-validation-challenge"
timeLimit={120}
items={[
{
id: "1",
prompt: "Tu nuevo CRM muestra 847 contactos pero tu exportación del CRM antiguo tenía 850. ¿Qué revisas primero?",
correctAnswer: "Revisar las reglas de fusión de duplicados que eliminaron automáticamente 3 registros durante la importación",
explanation: "Las pequeñas discrepancias en el conteo suelen venir de la lógica automática de deduplicación. Revisa los registros de fusión."
},
{
id: "2",
prompt: "Un trato de alto valor muestra 'Etapa: Desconocida' en tu nuevo CRM. ¿Qué ocurrió?",
correctAnswer: "El nombre de la etapa del CRM antiguo no coincidió con los nombres de etapas del nuevo CRM — el trato no pudo mapearse",
explanation: "Crea una etapa coincidente en el nuevo CRM, luego vuelve a importar ese trato."
},
{
id: "3",
prompt: "La actividad de correo muestra 'Importado el 2025-01-18' para todos los correos. ¿Qué se rompió?",
correctAnswer: "La exportación de actividades no incluyó los campos de fecha originales, por lo que la importación usó la fecha de hoy",
explanation: "Comprueba si la exportación del CRM antiguo tiene una columna 'sent_date' o 'created_at'. Vuelve a mapear y vuelve a importar las actividades."
},
{
id: "4",
prompt: "El campo personalizado 'Puntuación de Ajuste ICP' está en blanco para el 90% de los contactos. ¿Cuál es la causa probable?",
correctAnswer: "El nombre del campo en el CSV no coincidió exactamente con el nombre del campo en el nuevo CRM (distingue mayúsculas de minúsculas)",
explanation: "Las importaciones de CRM distinguen mayúsculas de minúsculas. 'ICP_Fit_Score' ≠ 'icp_fit_score'. Corrige el mapeo y vuelve a importar."
}
]}
/>

### El Período de Ejecución Paralela de 30 Días

**No elimines tu CRM antiguo de inmediato.** Ejecuta ambos sistemas en paralelo durante 30 días:

- **Semana 1-2:** El nuevo CRM es el principal, pero revisa el antiguo para datos que no puedas encontrar
- **Semana 3-4:** Solo el nuevo CRM, pero el antiguo permanece en modo de solo lectura como respaldo
- **Día 30:** Si no se encontraron brechas de datos críticos, archiva la exportación del CRM antiguo y cancela la suscripción

<InsightCard icon="⏱️" title="La Red de Seguridad de 30 Días">
La mayoría de los fallos de migración surgen dentro de las 2 semanas. Mantén tu CRM antiguo accesible (solo lectura) por 30 días para poder recuperar cualquier dato que no se transfirió correctamente.
</InsightCard>

---

## Calculadora de Costo-Beneficio de la Migración

¿Deberías migrar? Hagamos los cálculos.

<ScenarioSimulator
title="Calculadora de ROI de Migración"
persistKey="crm-setup-L9-roi-calculator"
levers={[
{
id: "migrationHours",
label: "Tiempo de migración (horas)",
min: 10,
max: 60,
step: 5,
defaultValue: 30
},
{
id: "hourlyValue",
label: "Tu valor por hora ($)",
min: 25,
max: 500,
step: 25,
defaultValue: 100
},
{
id: "newCrmCost",
label: "Costo mensual del nuevo CRM ($)",
min: 0,
max: 100,
step: 5,
defaultValue: 29
},
{
id: "oldCrmCost",
label: "Costo mensual del CRM antiguo ($)",
min: 0,
max: 100,
step: 5,
defaultValue: 20
},
{
id: "featureValue",
label: "Valor mensual de las nuevas funcionalidades ($)",
min: 0,
max: 1000,
step: 50,
defaultValue: 200
}
]}
outputs={[
{
id: "migrationCost",
label: "Costo único de migración",
formula: "migrationHours * hourlyValue",
unit: "$",
precision: 0
},
{
id: "monthlySavings",
label: "Beneficio neto mensual",
formula: "featureValue - (newCrmCost - oldCrmCost)",
unit: "$",
precision: 0
},
{
id: "breakEven",
label: "Plazo de recuperación",
formula: "(migrationHours * hourlyValue) / (featureValue - (newCrmCost - oldCrmCost))",
unit: " meses",
precision: 1
}
]}
insight="Si el punto de equilibrio es mayor a 6 meses, la migración puede no valer la pena a menos que la brecha de funcionalidad esté bloqueando tratos activos."
/>

---

## Escenarios Comunes de Migración

Repasemos las tres rutas de migración más comunes para fundadores en solitario.

### Escenario 1: HubSpot Free → Attio Plus

**Por qué migrar:** Necesitas mejor preparación para IA, enriquecimiento automático y un modelo de datos flexible. El límite de 1 pipeline de HubSpot Free te está bloqueando.

**Lo que se transfiere correctamente:**

- Contactos (todos los campos)
- Empresas (todos los campos)
- Tratos (etapa actual, monto, fecha de cierre)
- Actividad básica de correo (como notas)

**Lo que se rompe:**

- El historial de etapas del pipeline de HubSpot → Attio solo importa la etapa actual
- Los metadatos de seguimiento de correo de HubSpot → Attio registra correos pero no datos de apertura/clic
- Los flujos de trabajo de HubSpot → Deben reconstruirse como automatizaciones de Attio

**Tiempo de migración:** 20-25 horas

**Ventaja de Attio:** Existe una herramienta de migración nativa. Úsala en lugar de la exportación CSV.

### Escenario 2: Pipedrive → HubSpot Starter

**Por qué migrar:** Necesitas el ecosistema de HubSpot (más integraciones) y estás dispuesto a pagar $20/mes por mejor automatización.

**Lo que se transfiere correctamente:**

- Contactos, empresas, tratos (la exportación de Pipedrive es limpia)
- Línea de tiempo de actividad (si exportas las actividades por separado)
- Campos personalizados (si los recreas en HubSpot primero)

**Lo que se rompe:**

- El flujo de trabajo basado en actividades de Pipedrive → HubSpot está basado en etapas de trato (modelo mental diferente)
- El pipeline visual de Pipedrive → Las vistas de lista de HubSpot (menos visual)

**Tiempo de migración:** 25-30 horas

**Ventaja de HubSpot:** Enorme ecosistema de integraciones. Si usas Zapier intensamente, HubSpot tiene más disparadores nativos.

### Escenario 3: Folk → Close

**Por qué migrar:** Tu movimiento de ventas cambió de basado en relaciones a outbound de alto volumen. Necesitas llamadas y secuencias integradas.

**Lo que se transfiere correctamente:**

- Contactos (la exportación de Folk es simple)
- Notas básicas

**Lo que se rompe:**

- Los metadatos de enriquecimiento de LinkedIn/Twitter de Folk → Close no enriquece automáticamente
- Las etiquetas de relación de Folk → Deben mapearse a campos personalizados de Close

**Tiempo de migración:** 15-20 horas (Folk es ligero, menos que migrar)

**Ventaja de Close:** Llamadas integradas, SMS y secuencias. Sin necesidad de herramientas separadas.

---

## Tu Plan de Acción de Migración

¿Listo para migrar? Construye tu plan.

<TemplateBuilder
title="Plan de Acción de Migración"
persistKey="crm-setup-L9-action-plan"
sections={[
{
id: "decision",
title: "Decisión de Migración",
fields: [
{
id: "current-crm",
label: "CRM Actual",
placeholder: "ej., HubSpot Free",
type: "text"
},
{
id: "target-crm",
label: "CRM Destino",
placeholder: "ej., Attio Plus",
type: "text"
},
{
id: "reason",
label: "Razón principal para la migración",
placeholder: "ej., Necesito modelo de datos listo para IA y enriquecimiento automático",
type: "textarea"
}
]
},
{
id: "timeline",
title: "Cronograma de Migración",
fields: [
{
id: "start-date",
label: "Fecha de inicio de la migración",
placeholder: "ej., 2025-02-01 (durante período tranquilo)",
type: "text"
},
{
id: "estimated-hours",
label: "Horas estimadas",
placeholder: "ej., 30 horas en 2 semanas",
type: "text"
}
]
},
{
id: "risk-mitigation",
title: "Mitigación de Riesgos",
fields: [
{
id: "active-deals",
label: "¿Cómo protegerás los tratos activos durante la migración?",
placeholder: "ej., Exportar detalles de tratos a hoja de cálculo como respaldo, notificar a contactos clave sobre posibles retrasos",
type: "textarea"
},
{
id: "rollback-plan",
label: "Plan de reversión si la migración falla",
placeholder: "ej., Mantener el CRM antiguo activo por 30 días, se puede revertir si se encuentran problemas de integridad de datos",
type: "textarea"
}
]
},
{
id: "success-criteria",
title: "Criterios de Éxito",
fields: [
{
id: "validation",
label: "¿Cómo validarás el éxito de la migración?",
placeholder: "ej., El conteo de contactos coincide, el valor del pipeline coincide, verificación aleatoria de 20 registros, prueba de sincronización de correo",
type: "textarea"
}
]
}
]}
/>

---

## Resumen: Migración Sin Arrepentimientos

La migración es un proyecto de 20-40 horas. Hazlo bien o no lo hagas en absoluto.

<InteractiveChecklist
title="Lista de Verificación de Dominio de la Migración"
persistKey="crm-setup-L9-summary"
items={[
"He validado que la migración está justificada (no es solo síndrome del objeto brillante)",
"He programado la migración durante un período tranquilo (bajo número de tratos activos)",
"He exportado TODOS los datos del CRM antiguo (contactos, tratos, actividades, definiciones de campos)",
"He mapeado los campos entre el CRM antiguo y el nuevo (con la lógica de transformación documentada)",
"He probado la importación con 20 registros y verifiqué la integridad de los datos",
"He reconstruido las automatizaciones críticas en el nuevo CRM antes de activarlo",
"He actualizado todas las integraciones (herramientas de correo, enriquecimiento, Zapier)",
"He validado la integridad de los datos con verificaciones aleatorias del 10% de los registros",
"Estoy ejecutando el CRM antiguo y el nuevo en paralelo por 30 días como red de seguridad",
"He preservado la estructura de datos lista para IA (sin aplanar a notas de texto libre)"
]}
/>

**Próxima lección:** Compilaremos todo lo de las Lecciones 1-9 en tu Lista de Verificación Completa de Configuración de CRM y lanzaremos tu sprint de implementación de 7 días.

---

## Quiz: Preparación para la Migración

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Estás frustrado con la UI de tu CRM y quieres algo más moderno. ¿Es esta una buena razón para migrar?",
      "options": [
        "Sí — si la UI te ralentiza, la migración está justificada",
        "No — las preferencias de UI no justifican 20-40 horas de trabajo de migración",
        "Sí — pero solo si el nuevo CRM también tiene mejores funcionalidades",
        "No — a menos que también estés alcanzando los límites de funcionalidades"
      ],
      "correctAnswer": 1,
      "explanation": "La frustración con la UI casi nunca es razón suficiente para migrar. Personaliza el panel de tu CRM actual o aprende atajos de teclado. Migra solo por brechas fundamentales de funcionalidades o razones económicas."
    },
    {
      "id": "q2",
      "question": "¿Cuál es el orden correcto para importar datos en un nuevo CRM?",
      "options": [
        "Contactos → Tratos → Empresas → Actividades",
        "Empresas → Contactos → Tratos → Actividades",
        "Tratos → Contactos → Empresas → Actividades",
        "Actividades → Contactos → Tratos → Empresas"
      ],
      "correctAnswer": 1,
      "explanation": "Importa primero los registros padre: Empresas → Contactos (asociados a empresas) → Tratos (asociados a contactos) → Actividades (asociadas a contactos/tratos). Esto evita registros huérfanos."
    },
    {
      "id": "q3",
      "question": "Tu nuevo CRM muestra 847 contactos pero tu exportación del CRM antiguo tenía 850. ¿Cuál es la causa más probable?",
      "options": [
        "3 contactos se corrompieron durante la exportación",
        "El nuevo CRM tiene un límite de 847 contactos",
        "La lógica de deduplicación automática fusionó 3 registros duplicados durante la importación",
        "Olvidaste exportar 3 contactos"
      ],
      "correctAnswer": 2,
      "explanation": "Las pequeñas discrepancias en el conteo suelen venir de la detección y fusión automática de duplicados. Revisa los registros de fusión del nuevo CRM para confirmarlo."
    },
    {
      "id": "q4",
      "question": "¿Por qué deberías ejecutar el CRM antiguo y el nuevo en paralelo durante 30 días?",
      "options": [
        "Para comparar cuál CRM te gusta más",
        "Para detectar fallos de migración que surgen dentro de las 2 semanas",
        "Para capacitar a tu equipo en ambos sistemas",
        "Para seguir pagando ambas suscripciones"
      ],
      "correctAnswer": 1,
      "explanation": "La mayoría de los fallos de migración (datos faltantes, mapeos rotos, contexto perdido) surgen dentro de las 2 semanas. Ejecutar en paralelo te da una red de seguridad para recuperar cualquier dato que no se transfirió correctamente."
    },
    {
      "id": "q5",
      "question": "¿Qué ocurre con los campos estructurados (listas desplegables, fechas, números) si no los recreas en el nuevo CRM antes de importar?",
      "options": [
        "Se importan como notas de texto libre, haciéndolos invisibles para los agentes de IA",
        "Se importan correctamente pero pierden sus valores de lista desplegable",
        "La importación falla con un error",
        "Se importan como campos en blanco"
      ],
      "correctAnswer": 0,
      "explanation": "Si los campos estructurados no existen en el nuevo CRM, la mayoría de las herramientas de importación los aplanan en notas de texto libre. Esto destruye la preparación para IA. Siempre recrea los campos personalizados ANTES de importar."
    }
  ]
}
```
