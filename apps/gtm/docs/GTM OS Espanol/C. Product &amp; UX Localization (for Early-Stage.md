<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# C. Product \& UX Localization (for Early-Stage Teams)

Prompt C1 – Spanish tone, vocabulary, and UX microcopy
“Analyze best practices for localizing SaaS UX into Latin American Spanish for early-stage B2B tools. Provide guidance on:
Neutral vs country-specific vocabulary and when to avoid Spain-only or Mexico-only slang.
Formal vs informal ‘tú/usted’ decisions in onboarding, AI coach, and roleplay prompts.
Typical errors from literal translations that break trust.
Deliver concrete microcopy examples and guidelines so Solo GTM OS feels native to solo founders and small teams across LatAm.”

The research set is comprehensive. Here is the complete UX localization brief:

***

# Spanish Tone, Vocabulary \& UX Microcopy for Solo GTM OS

Getting Spanish-language UX right for a LatAm SaaS is not a translation problem — it's a **localization and cultural calibration problem**. A platform that sounds translated rather than native loses trust before the user reads the second screen. The guidelines below give Solo GTM OS a concrete localization framework that feels at home in Bogotá, Medellín, CDMX, and Santiago simultaneously.

***

## Principle 1: Write in "International Spanish," Not Spain Spanish

The gold standard for pan-LatAm SaaS UX is **International Spanish** (also called Neutral Latin American Spanish) — a register that avoids country-specific slang and Spain-only vocabulary, uses *ustedes* (not *vosotros*), and selects vocabulary from the most broadly understood set across the region. This is the approach used by Microsoft, Adobe, and major software publishers for their LatAm products.[^1][^2]

### Spain-Only Words to Avoid in UI

| ❌ Spain Term | ✅ LatAm Neutral | Context |
| :-- | :-- | :-- |
| *Ordenador* | *Computadora* / *computador* | Technology references [^3] |
| *Móvil* | *Celular* | Mobile phone |
| *Vosotros / vuestro* | *Ustedes / su* | Plural address — never use *vosotros* in LatAm product copy [^4] |
| *Zumo* | *Jugo* | Any food/beverage metaphors |
| *Coche* | *Carro* / *auto* | Transportation metaphors |
| *Coger* | *Tomar* / *agarrar* | **Critical** — *coger* is a vulgar term in most of LatAm; never use it to mean "take" or "grab" [^5] |
| *Tío/tía* (slang) | Avoid entirely in product copy | Informal Spain slang; reads as foreign in LatAm |
| *Guay* / *mola* | *Genial* / *excelente* / *bacano* (Colombia only) | Spain-only positive colloquialisms |

### Country-Specific LatAm Words to Avoid in Core Platform Copy

Some LatAm regionalisms feel native in one country and foreign in another. These should be **avoided in global platform copy** but can be used in country-specific content or Colombia-first examples:


| Word | Where it's natural | Where it sounds odd |
| :-- | :-- | :-- |
| *Bacano/chévere* | Colombia | Mexico, Chile |
| *Chido/padre* | Mexico | Colombia, Chile |
| *Pucha/cachai* | Chile | Everywhere else |
| *Boludo/che* | Argentina | Rest of LatAm |
| *Vos* + verb conjugation (*querés, podés*) | Argentina, Uruguay, parts of Colombia | Mexico, Chile |

For Solo GTM OS's default voice, use *tú* (not *vos*) and avoid country idioms in all platform-wide copy. Country-specific expressions belong only in explicitly localized content blocks or Colombia-first example scenarios.[^6]

***

## Principle 2: The Tú/Usted Decision Framework

This is the single most consequential microcopy decision for a LatAm B2B SaaS. Getting it wrong in either direction creates friction: too formal feels robotic; too informal feels disrespectful in a business context.[^7]

The correct framework is **context-dependent**, not product-wide:


| Platform Context | Recommended Register | Rationale |
| :-- | :-- | :-- |
| **Onboarding flow (steps 1–3)** | *Usted* or *tú* (consistent) | First impressions; match the formality of a first professional meeting |
| **AI Coach (Solo Advisor)** | *Tú* | Conversational, mentor-like relationship; should feel like a trusted peer, not a bank chatbot |
| **Roleplay simulator** | Match the persona's DISC type: D/I → *tú*; C/S → *usted* initially | The roleplay buyer persona should behave realistically; a Colombian CFO opens with *usted* |
| **Error messages** | *Tú* (friendly, non-punitive) | Error moments need warmth and ease; *usted* here feels like a reprimand |
| **Notifications / nudges** | *Tú* | Push and in-app nudges should feel like a coach tapping your shoulder |
| **Formal proposal templates / legal copy** | *Usted* | Documents the founder sends to clients must mirror professional B2B norms |
| **Course lesson narration** | *Tú* | Educational voice should be warm and direct; like a mentor in conversation |

**The Colombia nuance:** In Colombia, *usted* is used even between close friends and family as a term of affection — it does not always signal formality. This means Colombian users will not read *usted* in onboarding as cold. However, since the platform serves a pan-LatAm audience, defaulting to *tú* in the AI coach and interactive modules is the safer choice for cross-regional warmth.[^3]

**The golden rule:** **Never mix registers within the same surface.** A flow that starts with *usted* and switches to *tú* mid-screen signals a patchwork localization job and immediately breaks professional trust.[^8]

***

## Principle 3: Literal Translation Errors That Break Trust

These are the most common failure patterns when English-first product copy is translated without cultural adaptation:

### Error 1 — Hyper-literal button labels

- ❌ *"Haga clic aquí para continuar"* (literal of "Click here to continue")
- ✅ *"Continuar"* or *"Siguiente paso"*
- **Why it breaks:** *Haga clic* is mechanical and dated; native LatAm Spanish speakers write *"haz clic"* (tú) or simply use the action verb as the label[^9]


### Error 2 — False cognates and English-shaped phrases

- ❌ *"Aplicar para el programa"* (calque of "apply to the program")
- ✅ *"Inscríbete al programa"* or *"Postúlate"*
- ❌ *"Realizar un pago"* for "make a payment" — technically correct but formal to the point of sounding like a tax form
- ✅ *"Paga ahora"* / *"Completa tu pago"*


### Error 3 — Robotic success/error messages

- ❌ *"Su solicitud ha sido procesada exitosamente"*
- ✅ *"¡Listo! Tu cuenta ya está activa."*
- ❌ *"Ha ocurrido un error. Por favor intente nuevamente."*
- ✅ *"Algo salió mal. Inténtalo de nuevo o escríbenos si el problema continúa."*
- **Why it matters:** In a product built on trust and relationship — like a sales coaching platform — cold, passive, system-generated language in error moments signals that the product doesn't understand the user's context[^9]


### Error 4 — "Free" and pricing language

- ❌ *"Gratis"* used interchangeably with *"sin costo"* — both are correct but *"gratis"* can feel cheap in a B2B professional context
- ✅ For premium product positioning: *"sin costo adicional"*, *"incluido en tu plan"*, or *"sin cargo"*
- **Why it matters:** Pricing language sets the frame for perceived value before a single feature is seen[^7]


### Error 5 — Gendered language in generic copy

- ❌ *"El fundador / el usuario"* as the universal default — excludes the significant portion of incubator participants who are women
- ✅ Use gender-neutral constructions where possible: *"Tu equipo"*, *"Quien funda"*, *"La persona fundadora"*, or deploy inclusive language: *"fundadores y fundadoras"* at key moments
- **Platform note:** In Solo GTM OS, given the explicit focus on incubators and the significant female founder participation in LatAm accelerator programs, gender-inclusive language in onboarding and marketing copy is both a values signal and a retention driver

***

## Principle 4: Microcopy That Feels Native — Before/After Examples

### Onboarding Welcome Screen

| ❌ Translated Version | ✅ Native Version |
| :-- | :-- |
| *"Bienvenido a la plataforma. Por favor complete su perfil para comenzar."* | *"Bienvenido/a. En 3 minutos tienes tu perfil listo y puedes empezar a vender más inteligente."* |

### Empty State (No Pipeline Contacts Yet)

| ❌ Translated | ✅ Native |
| :-- | :-- |
| *"No hay contactos en su pipeline. Agregue contactos para comenzar."* | *"Tu pipeline está vacío — pero eso cambia hoy. ¿Por dónde empezamos?"* |

### AI Coach Prompt Opening

| ❌ Translated | ✅ Native |
| :-- | :-- |
| *"¿En qué le puedo ayudar hoy?"* | *"¿Qué tienes entre manos hoy? Cuéntame."* |

### Completing a Lesson

| ❌ Translated | ✅ Native |
| :-- | :-- |
| *"Has completado la lección. Proceda a la siguiente."* | *"¡Eso es! Lección terminada. La siguiente es donde empieza lo bueno."* |

### Error — Payment Failed

| ❌ Translated | ✅ Native |
| :-- | :-- |
| *"Su pago no pudo ser procesado. Verifique su método de pago."* | *"El pago no pasó esta vez. Revisa los datos de tu tarjeta o escríbenos — lo resolvemos juntos."* |

### Roleplay Simulator — Buyer Persona Opening Line (C-type, Corporate Colombian)

| ❌ Generic AI voice | ✅ Culturally calibrated |
| :-- | :-- |
| *"Hola. Cuéntame sobre tu producto."* | *"Buenos días. ¿Me puede contar un poco más sobre su empresa antes de que hablemos del producto?"* |


***

## Principle 5: Technical Term Consistency

LatAm B2B founders in incubators have absorbed English tech and sales vocabulary directly — *pipeline*, *funnel*, *lead*, *onboarding*, *demo* are all widely used in startup circles without translation. Solo GTM OS should **not over-translate** these terms in professional contexts, as doing so makes the platform feel less credible to its tech-savvy audience. The right approach:[^7]


| Term | Recommendation | Notes |
| :-- | :-- | :-- |
| *Pipeline* | Keep in English | Universal in LatAm startup culture |
| *Lead* | Keep or use *prospecto* | *Lead* is widely understood; *prospecto* is correct neutral Spanish |
| *Funnel* / *embudo* | Use *embudo* in curriculum copy; *funnel* acceptable in UI labels |  |
| *Onboarding* | Keep in English for UI; *proceso de bienvenida* in course copy |  |
| *Demo* | Keep in English |  |
| *KPI* / *métricas clave* | KPI acceptable in headers; *métricas clave* in explanatory copy |  |
| *Pitch* | Keep in English; widely used |  |
| *Feedback* | *Retroalimentación* in formal copy; *feedback* in conversational/UI contexts |  |
| *Churn* | *Cancelaciones* or *deserción* in course copy; avoid literal *churn* | English term not yet widely naturalized in LatAm SME context |


***

## Platform-Wide Style Decisions for Solo GTM OS

Based on all of the above, here are the recommended baseline decisions for the platform:

1. **Default register:** *Tú* throughout the platform (AI coach, nudges, error messages, lesson narration). Switch to *usted* only in formal document templates and roleplay buyer personas where culturally appropriate.
2. **Vocabulary standard:** International Spanish / Neutral LatAm. Avoid Spain-only terms entirely. Use Colombian-flavored examples in Foundations and Discovery tracks with country sidebar variants.
3. **Gender language:** Use gender-inclusive constructions in all onboarding, marketing, and course copy. Default to *"tu equipo"*, *"la persona fundadora"*, or explicit paired forms at high-visibility moments.
4. **English tech terms:** Preserve recognized startup vocabulary (*pipeline*, *lead*, *demo*, *pitch*) in UI and course titles. Translate in explainer copy for context.
5. **Tone benchmark:** The voice of the platform should feel like a **senior Colombian or Mexican founder who has sold successfully and wants you to win** — warm, direct, confident, not academic, not corporate, never condescending.
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30]</span>

<div align="center">⁂</div>

[^1]: http://www.i18nguy.com/l10n/MS_LA_Spanish.html

[^2]: https://veqta.com/international-spanish-what-it-is-and-when-to-use-it/

[^3]: https://sampere.com/blog/spanish-spain-vs-latin-america/

[^4]: https://www.argotranslation.com/blog/the-ultimate-guide-to-localizing-spanish-content

[^5]: https://phrase.com/blog/posts/5-examples-localization-gone-tragically-awry/

[^6]: https://www.nimdzi.com/spanish-variants-for-localization/

[^7]: https://www.linkedin.com/pulse/spanish-localization-best-practices-context-driven-accuracy-vqzac

[^8]: https://www.linkedin.com/posts/rodycorreaavila_expanding-into-latin-america-can-accelerate-activity-7434919640830619648-Lcmx

[^9]: https://www.linguise.com/blog/guide/multilingual-ux-microcopy-forms-error-messages-and-checkout-copy-that-actually-converts/

[^10]: https://music.amazon.com/podcasts/7ac46e63-c0d0-4ef1-8819-82bcccfcbc1c/episodes/e1945109-954a-45d0-8371-f28853b8c6fb/open-world-your-game-localization-podcast-s2-ep11-differences-between-eu-and-latam-spanish-in-video-games

[^11]: https://sellercentral-europe.amazon.com/seller-forums/discussions/t/aed7f7d2-8ce1-4088-ad0d-8ff44bd8fa48

[^12]: https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/NimbleStudio/Errors/ValidationException.html

[^13]: https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-iot.CfnThing.html

[^14]: https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/LexModelsV2/Types/CreateBotLocaleRequest.html

[^15]: https://sellercentral.amazon.com/seller-forums/discussions/t/2cfc1bff-c92f-4022-b4cf-7f42acf43698

[^16]: https://aws.amazon.com/blogs/machine-learning/amazon-lex-launches-support-for-latin-american-spanish-and-german/

[^17]: https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/mediaconnect/model/ListedGateway.html

[^18]: https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/simpleemailv2/model/VdmOptions.html

[^19]: https://aws.amazon.com/blogs/publicsector/tag/spanish/

[^20]: https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/inspector2/model/ExploitAvailable.html

[^21]: https://aws.amazon.com/id/premiumsupport/

[^22]: https://explore.alas.aws.amazon.com/CVE-2025-22061.html

[^23]: https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/resourcegroupstaggingapi/model/GetResourcesResult.html

[^24]: https://sellercentral.amazon.com/seller-forums/discussions/t/9f65dafd-8e74-4b4c-81ed-a424b5405810

[^25]: https://www.youtube.com/watch?v=zrLHY-1NmwU

[^26]: https://download.microsoft.com/download/4/3/1/431d9836-40dc-4f2b-aafc-def5c7b5d0f3/spa-neu-StyleGuide.pdf

[^27]: https://www.acclaro.com/blog/spanish-website-localization-five-tips/

[^28]: https://oceantranslations.com/blog/5-common-errors-of-website-localization-to-latin-america/

[^29]: https://holaspanishcentre.com/blogs/spanish-from-spain-vs-latin-america-whats-the-difference/

[^30]: https://www.youtube.com/watch?v=Q8iCjj8V6rU

