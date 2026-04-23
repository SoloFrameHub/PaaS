---
title: "SEO Técnico (Los Cimientos de la Autoridad)"
duration: "55 min"
track: "Marketing Engine"
course: "Course 27: SEO y AEO"
lesson: 9
---

## Por Qué el SEO Técnico Importa Más de lo Que Crees

El SEO de contenido y el SEO técnico están conectados de una manera que la mayoría de los fundadores no entiende: puedes tener el mejor contenido del mundo, pero si tu sitio web carga lento, si las páginas correctas no están indexadas, o si la estructura de tu sitio confunde a los rastreadores, ese contenido nunca obtendrá el crédito que merece.

El SEO técnico es la infraestructura. El contenido es el edificio. Sin cimientos sólidos, el edificio se hunde.

La buena noticia: la mayoría de los problemas técnicos de SEO se solucionan una vez y se mantienen durante años. No es un trabajo continuo como la creación de contenido — es un proyecto de configuración que paga dividendos de forma permanente.

<SlideNavigation>
<Slide title="Core Web Vitals: Los Tres Números que Google Mide">

Google mide el rendimiento de tu sitio con tres métricas principales conocidas como Core Web Vitals:

**LCP — Largest Contentful Paint (Pintado del Contenido Más Grande)**
¿Cuánto tarda en cargarse el elemento más grande de tu página (generalmente una imagen de héroe o bloque de texto principal)?

- Verde: menos de 2.5 segundos
- Amarillo: 2.5-4 segundos
- Rojo: más de 4 segundos

**FID — First Input Delay (Demora del Primer Input) / INP**
¿Cuánto tarda tu página en responder al primer clic o toque de un usuario?

- Verde: menos de 100 ms
- Amarillo: 100-300 ms
- Rojo: más de 300 ms

**CLS — Cumulative Layout Shift (Desplazamiento Acumulativo de Diseño)**
¿Se mueven los elementos de tu página mientras se carga, causando que los usuarios hagan clic en cosas equivocadas?

- Verde: menos de 0.1
- Amarillo: 0.1-0.25
- Rojo: más de 0.25

Verifica tus Core Web Vitals en Google Search Console → Experiencia → Core Web Vitals.

</Slide>
<Slide title="Indexabilidad: Asegurándote de Que el Contenido Correcto Sea Rastreado">

Google no puede clasificar lo que no puede rastrear e indexar. Dos archivos controlan lo que Google ve de tu sitio:

**robots.txt** — Indica a los rastreadores qué páginas pueden y no pueden visitar. Un error de configuración en robots.txt puede bloquear accidentalmente a Google de rastrear todo tu sitio. Verifica en tusitio.com/robots.txt que no estés bloqueando las páginas importantes.

**sitemap.xml** — Una lista de todas las URLs que quieres que Google indexe. Los sitemaps bien mantenidos aceleran la indexación. Envía el tuyo en Google Search Console → Índice → Sitemaps.

**La verificación rápida:** Escribe "site:tusitio.com" en Google. El número de resultados es una estimación aproximada de cuántas de tus páginas están indexadas. Si el número parece muy bajo (menos del 50% de tus páginas), tienes un problema de indexabilidad.

</Slide>
<Slide title="Arquitectura de Silo: Cómo Estructurar Tu Sitio Para la Autoridad">

Una arquitectura de silo organiza tu contenido en grupos temáticos claros, donde las páginas de alta autoridad (pilares) apuntan a las páginas de detalle (clústeres), y las páginas de clúster apuntan de vuelta al pilar.

**Por qué importa:** Google distribuye la "autoridad del enlace" a través de tu sitio. Si tu contenido está todo disperso, ninguna página acumula suficiente autoridad para clasificar bien. Si está organizado en silos, la autoridad fluye de forma eficiente hacia tus páginas más importantes.

**Estructura simple de silo:**

- Página pilar: "Guía Completa del SEO Local para Pequeñas Empresas"
- Páginas de clúster: "SEO Local para Restaurantes", "SEO Local para Abogados", "SEO Local para Contratistas"
- Cada página de clúster apunta de vuelta a la página pilar
- La página pilar apunta hacia abajo a cada página de clúster

</Slide>
</SlideNavigation>

<PredictionGate
question="Tu sitio web tarda 6 segundos en cargar. Tienes un excelente contenido optimizado para palabras clave. ¿Cuál es el impacto más probable en el SEO?"
persistKey="seo-aeo-L9-predict"
type="choice"
choices={[
{ id: "a", text: "Ningún impacto — el contenido es el rey y supera los factores técnicos" },
{ id: "b", text: "Impacto moderado — Google clasificará el sitio algo más bajo pero el buen contenido compensa" },
{ id: "c", text: "Impacto significativo — las páginas lentas reciben penalizaciones directas en las clasificaciones y usuarios que se van antes de leer" }
]}
correctId="c"

> Un tiempo de carga de 6 segundos es un problema grave. Las páginas que cargan en más de 3 segundos tienen tasas de rebote significativamente más altas — los usuarios simplemente se van. Google rastrea estas señales de comportamiento y las usa como factores de clasificación. Además, desde 2021, los Core Web Vitals (incluyendo LCP) son señales de clasificación directas. Un buen contenido no puede compensar completamente una mala experiencia técnica.
> </PredictionGate>

## Optimización de Imágenes: El Problema Técnico Más Fácil de Solucionar

Las imágenes sin optimizar son la causa número uno de sitios web lentos. Y sin embargo, es uno de los problemas más fáciles de corregir.

<RewriteExercise
title="Lista de Verificación de Optimización de Imágenes"
persistKey="seo-aeo-L9-images"
original="Mi sitio tiene imágenes JPEG de 3-5 MB cargadas directamente desde mi teléfono. Las páginas tardan mucho en cargar pero el contenido es bueno así que probablemente está bien."
hint="Identifica todos los problemas técnicos en esta situación y reescríbelo como un plan de acción específico."
expertRewrite="Situación actual: imágenes JPEG de 3-5MB = problema principal de rendimiento. Plan de corrección: (1) Convierte todas las imágenes a formato WebP (70% más pequeño que JPEG a calidad equivalente) usando Squoosh.app gratuitamente. (2) Redimensiona las imágenes al tamaño máximo de visualización (generalmente 1200px de ancho para contenido del blog). (3) Implementa carga diferida (lazy loading) para imágenes fuera de la pantalla — el atributo loading='lazy' en etiquetas img. (4) Usa un CDN para servir imágenes (Cloudflare gratis, o CDN incorporado de tu host). Resultado esperado: reducción del 60-80% en el tamaño de la página, mejora del LCP de 6s a menos de 2.5s."
criteria={[
"Identifica el formato correcto (WebP/AVIF en lugar de JPEG/PNG)",
"Menciona el redimensionamiento al tamaño de visualización real",
"Incluye la implementación de carga diferida",
"Proporciona resultados esperados específicos con métricas"
]}
/>

<InsightCard icon="🖼️" title="Jerarquía de Formatos de Imagen">
**AVIF** — El formato más nuevo y eficiente. 50% más pequeño que WebP. Soporte de navegador aún en expansión.
**WebP** — El estándar actual. 70% más pequeño que JPEG. Soporte universal en navegadores modernos.
**JPEG** — Úsalo solo cuando necesites compatibilidad máxima o para fotos de alta calidad donde WebP no está disponible.
**PNG** — Para imágenes con transparencia. Para todo lo demás, WebP es mejor.
**GIF** — Nunca para SEO. Usa videos MP4 cortos o WebP animado en su lugar.
</InsightCard>

## HTTPS, Subdominios y Subcarpetas

Tres decisiones técnicas que afectan tu autoridad de SEO pero que a menudo se toman sin pensar:

<InsightCard icon="🔒" title="HTTPS: No Negociable">
Si tu sitio no usa HTTPS (el candado en la barra de URL), Google lo marca explícitamente como "No seguro" y los usuarios lo ven. HTTPS es un factor de clasificación desde 2014. Todos los hosts modernos incluyen certificados SSL gratuitos de Let's Encrypt. No hay excusa para no tener HTTPS en 2025.
</InsightCard>

<ScenarioSimulator
title="Subdominios vs. Subcarpetas para el Blog"
persistKey="seo-aeo-L9-subdomain"
levers={[
{ id: "domain_age", label: "Antigüedad del dominio (años)", min: 0, max: 10, step: 1, defaultValue: 2 },
{ id: "existing_authority", label: "Autoridad de dominio actual (0-100)", min: 0, max: 100, step: 5, defaultValue: 25 },
{ id: "blog_posts", label: "Número de publicaciones de blog planeadas", min: 10, max: 200, step: 10, defaultValue: 50 }
]}
outputs={[
{ id: "subdomain_authority", label: "Autoridad de subdominio (separada del dominio principal)", formula: "0", unit: "La autoridad no se transfiere al sitio principal", precision: 0 },
{ id: "subfolder_authority", label: "Beneficio de autoridad de subcarpeta", formula: "existing_authority * 0.8", unit: "puntos de autoridad transferidos al dominio", precision: 0 }
]}
insight="Si tienes 25+ de autoridad de dominio, usar blog.tusitio.com en lugar de tusitio.com/blog divide tu autoridad de SEO en dos. Elige subcarpetas (tusitio.com/blog) para concentrar la autoridad en un solo dominio."
/>

```json
{
  "quiz": {
    "id": "seo-aeo-L9-quiz",
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "question": "¿Qué mide el LCP (Largest Contentful Paint) de los Core Web Vitals?",
        "options": [
          "Cuántas imágenes se cargan en una página",
          "Cuánto tarda en cargarse el elemento más grande de la página",
          "Con qué frecuencia los elementos se desplazan durante la carga",
          "Qué tan rápido responde el servidor a la primera solicitud"
        ],
        "correctAnswer": 1,
        "explanation": "LCP mide el tiempo que tarda en cargarse el elemento más grande de la página (generalmente la imagen de héroe o el bloque de texto principal). Google lo considera verde si es menos de 2.5 segundos."
      },
      {
        "id": "q2",
        "type": "multiple-choice",
        "question": "Para el SEO, ¿deberías alojar tu blog en blog.tusitio.com o tusitio.com/blog?",
        "options": [
          "blog.tusitio.com — los subdominios clasifican más alto que las subcarpetas",
          "tusitio.com/blog — las subcarpetas mantienen la autoridad del enlace en un solo dominio",
          "No importa — Google los trata exactamente igual",
          "Depende del país objetivo"
        ],
        "correctAnswer": 1,
        "explanation": "Las subcarpetas (tusitio.com/blog) son generalmente mejores para el SEO porque la autoridad del enlace construida a través del contenido del blog fluye de vuelta al dominio principal. Los subdominios se tratan como sitios separados, dividiendo tu autoridad acumulada."
      },
      {
        "id": "q3",
        "type": "multiple-choice",
        "question": "¿Cuál formato de imagen ofrece la mejor compresión para las imágenes del sitio web moderno?",
        "options": [
          "JPEG — el estándar de oro para la fotografía web",
          "PNG — la mejor calidad para todas las imágenes",
          "WebP — 70% más pequeño que JPEG a calidad equivalente",
          "GIF — soportado universalmente por todos los navegadores"
        ],
        "correctAnswer": 2,
        "explanation": "WebP ofrece aproximadamente un 70% de reducción en el tamaño del archivo en comparación con JPEG a calidad equivalente. AVIF es aún más eficiente pero con soporte de navegador más limitado. Nunca uses GIF en sitios modernos — usa videos MP4 cortos o WebP animado en su lugar."
      }
    ]
  }
}
```

<InteractiveChecklist
title="Auditoría Técnica de SEO: Lista de Verificación"
persistKey="seo-aeo-L9-audit"
items={[
"Verifica los Core Web Vitals en Google Search Console — ¿tienes páginas en rojo?",
"Escribe 'site:tusitio.com' en Google — ¿el número de resultados parece correcto?",
"Verifica tusitio.com/robots.txt — ¿estás bloqueando accidentalmente páginas importantes?",
"Envía tu sitemap.xml en Google Search Console → Índice → Sitemaps",
"Comprueba que todo tu sitio usa HTTPS (el candado verde en la URL)",
"Audita las imágenes más grandes de tu página — ¿son más de 300KB? Conviértelas a WebP",
"Verifica si usas subdominios para el contenido — considera migrar a subcarpetas",
"Implementa la estructura de silo para tus temas principales de contenido"
]}
/>
