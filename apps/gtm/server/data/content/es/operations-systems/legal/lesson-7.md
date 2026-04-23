---
title: "Tu Biblioteca de Plantillas de Contratos"
duration: "45 min"
track: "Operations & Systems"
course: "Course 46: Legal Basics for Solo Founders"
lesson: 7
---

## El Costo de Empezar Desde Cero

La mayoría de los fundadores en etapa temprana crean contratos ad hoc: abren un contrato anterior, hacen un "Guardar como," cambian el nombre y precio del cliente, y envían. Sin estructura. Sin plantillas base. Sin revisión de si los términos siguen siendo correctos.

El resultado: una colección caótica de contratos ligeramente diferentes, algunos con errores legales heredados del primer contrato que usaron como punto de partida.

El fix es construir una biblioteca de plantillas una vez y usarla cada vez. Esta lección te ayuda a construirla.

<InsightCard icon="📄" title="El Caso para las Plantillas">
Un estudio de la firma legal SirionLabs encontró que las empresas que usan plantillas de contratos estandarizadas cierran contratos un 30% más rápido que las que no lo hacen — y tienen un 45% menos de disputas sobre términos. La estandarización no es burocracia; es protección.
</InsightCard>

## Los 4 Contratos que Todo Fundador Solo Necesita

<SlideNavigation>
<Slide title="Contrato 1: Acuerdo de Servicios Estándar">

**Cuándo usarlo:** Proyectos puntuales — diseño, consultoría, estrategia, redacción, implementación. Cualquier trabajo no recurrente con inicio y fin definidos.

**Secciones esenciales:**

1. Partes (quién contrata a quién)
2. Alcance del trabajo (descripción detallada del entregable)
3. Cronograma (fechas de inicio, hitos de entrega, fecha de finalización)
4. Compensación (precio total, estructura de pagos, términos de pago)
5. Propiedad intelectual (el cliente obtiene licencia de uso; el proveedor retiene PI subyacente)
6. Confidencialidad
7. Terminación (aviso requerido, compensación por trabajo completado)
8. Resolución de disputas (mediación primero, arbitraje como alternativa al litigio)

**Longitud objetivo:** 4–6 páginas. Más larga es más intimidante, no más protectora.

</Slide>
<Slide title="Contrato 2: Acuerdo de Retención">

**Cuándo usarlo:** Relaciones de trabajo continuas: coaching mensual, servicios de marketing recurrentes, asesoría en retención, consultoría continua.

**Diferencias del Contrato 1:**

- Alcance del trabajo es recurrente, no puntual ("servicios mensuales de estrategia de ventas")
- Pago es recurrente con fecha de renovación automática
- Términos de terminación son más específicos: período de aviso (generalmente 30–60 días), sin reembolso para el período actual

**Sección crítica de añadir:** Cláusula de ajuste de precios — "Los precios del Proveedor pueden aumentar anualmente en la fecha de renovación con aviso de 30 días."

Sin esto, puede ser difícil subir precios con clientes de larga data.

</Slide>
<Slide title="Contrato 3: Acuerdo de Contratista Independiente">

**Cuándo usarlo:** Contratar freelancers, contratistas, o proveedores de servicios para hacer trabajo bajo tu marca.

**Secciones críticas:**

1. Clasificación del contratista (no empleado, responsable de impuestos propios)
2. PI del trabajo producido (el contratista cede propiedad al finalizar y pago)
3. Confidencialidad y no divulgación (no pueden compartir información de tu cliente)
4. No solicitación (no pueden ir directamente a tus clientes durante X meses)
5. Términos de pago (tus términos con ellos, no los términos de tu cliente con tigo)

**Lo que más falla:** Los fundadores olvidan la cláusula de cesión de PI. Si tu contratista escribe código o crea activos y no ceden explícitamente la PI, técnicamente podrían ser propietarios del trabajo.

</Slide>
<Slide title="Contrato 4: NDA Estándar">

**Cuándo usarlo:** Antes de conversaciones de asociación, al compartir documentos confidenciales de negocio, o cuando un cliente pide uno antes de iniciar negociaciones.

**Tipos:**

- **NDA Mutuo:** Ambas partes protegen la información de la otra. Úsalo en conversaciones de asociación y conversaciones preacuerdo.
- **NDA Unilateral:** Solo una parte está protegida. Úsalo cuando compartes información propietaria tuya con un prospecto que no tiene nada sensible que divulgar.

**Términos estándar:** 2–3 años de duración, alcance razonable de confidencialidad (no "todo lo hablado en cualquier conversación"), excepciones estándar para información disponible públicamente.

**Señal de alerta:** NDAs con duraciones de 5+ años o sin fecha de vencimiento. Negocia hasta un estándar razonable.

</Slide>
</SlideNavigation>

## Construye Tu Biblioteca de Plantillas

<TemplateBuilder
title="Mi Biblioteca de Plantillas de Contratos"
persistKey="legal-L7-biblioteca"
sections={[
{
id: "acuerdo-servicios",
title: "Acuerdo de Servicios",
fields: [
{ id: "fuente", label: "Fuente de tu plantilla (plantilla propia, Clerky, revisada por abogado, etc.)", placeholder: "ej., Plantilla revisada por abogado de [Firma] en Feb 2026. Almacenada en Notion > Legal > Plantillas.", type: "text" },
{ id: "version", label: "Última fecha de revisión y qué cambió", placeholder: "ej., Feb 2026 — actualizó la cláusula de PI para excluir metodologías subyacentes; añadió lenguaje de cargo por mora.", type: "textarea" },
{ id: "customizacion", label: "Qué variables personalizas para cada cliente", placeholder: "ej., Nombre del cliente, descripción del alcance, precio, cronograma, términos de pago, nombre del contacto de escalación.", type: "textarea" }
]
},
{
id: "retencion",
title: "Acuerdo de Retención",
fields: [
{ id: "fuente-ret", label: "Fuente de tu plantilla de retención", placeholder: "ej., Adaptada del Acuerdo de Servicios con alcance recurrente y términos de auto-renovación.", type: "text" },
{ id: "terminos-renovacion", label: "Tus términos de auto-renovación estándar", placeholder: "ej., Se renueva mensualmente. Cualquiera de las partes puede terminar con 30 días de aviso.", type: "text" },
{ id: "precio-aumento", label: "Tu lenguaje de ajuste de precios", placeholder: "ej., Los precios pueden aumentar anualmente con aviso de 30 días en la fecha de renovación anual.", type: "textarea" }
]
},
{
id: "nda",
title: "NDA",
fields: [
{ id: "tipo-nda", label: "Tu NDA por defecto (mutuo o unilateral) y por qué", placeholder: "ej., Por defecto mutuo — cubre la mayoría de situaciones sin requerir discusión sobre qué lado necesita protección.", type: "text" },
{ id: "duracion-nda", label: "Duración estándar de tu NDA", placeholder: "ej., 2 años. Negociable hasta 3 para contratos de alto valor.", type: "text" }
]
}
]}
/>

## Lista de Verificación de Mantenimiento de la Biblioteca

<InteractiveChecklist
title="Mantenimiento Anual de Plantillas"
persistKey="legal-L7-mantenimiento"
items={[
"Revisar todas las plantillas anualmente o después de cualquier disputa de contrato",
"Actualizar el lenguaje de términos de pago si tus tarifas estándar han cambiado",
"Verificar que los detalles de la entidad son correctos (nombre de empresa, estado de incorporación, dirección)",
"Revisar las cláusulas de cargo por mora contra las tasas actuales del mercado",
"Comprobar si los cambios en leyes locales/estatales requieren actualizaciones de lenguaje",
"Enviar la plantilla actualizada para revisión de abogado si se realizaron cambios materiales"
]}
/>

## Lo Que Construiste en el Curso 46

Con esta lección has completado el Curso 46. Tienes ahora:

- Un entendimiento de estructuras de entidades y cuándo formalizarse (Lecciones 1–2)
- Términos de pago y cargos por mora documentados (Lección 3)
- Un flujo de trabajo de firma electrónica configurado (Lección 4)
- Un marco para leer y negociar redlines de clientes (Lección 5)
- Claridad sobre cuándo involucrar a asesoría legal (Lección 6)
- Una biblioteca de plantillas de contratos lista para usar (Lección 7)

Esto es la infraestructura legal para operar profesionalmente como una empresa de una sola persona. No te protegerá de todos los riesgos legales — nada lo hace — pero te mantiene de los errores más comunes y costosos que cometen los fundadores en etapa temprana.
