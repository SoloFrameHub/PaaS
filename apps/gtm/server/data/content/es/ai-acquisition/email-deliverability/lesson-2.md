---
title: "Requisitos de Gmail & Yahoo (SPF/DKIM/DMARC)"
duration: "55 min"
track: "Adquisición Impulsada por IA"
course: "Curso 22: Entregabilidad de Email e Infraestructura"
lesson: 2
---

# Requisitos de Gmail & Yahoo (SPF/DKIM/DMARC)

## El Email de $40K que Nunca Llegó

Sarah acaba de cerrar su trato más grande hasta ahora — un contrato anual de $40K con una empresa SaaS de mediano tamaño. El cliente firmó el viernes. El lunes por la mañana, envió el email de onboarding con credenciales de inicio de sesión, cronograma de implementación y su número celular personal.

El cliente nunca lo recibió.

Martes: "¿Recibiste mi email?" Silencio.

Miércoles: Llamó. "Oh, nunca recibimos nada. ¿Verificaste tu carpeta de spam?"

No estaba en spam. No estaba en ningún lado. Microsoft Outlook lo había filtrado silenciosamente al vacío — sin rebote, sin notificación, nada. Su dominio de envío no tenía registros de autenticación. Para los filtros de Outlook, se veía idéntica a un príncipe nigeriano.

Perdió 6 horas reconstruyendo confianza, reenviando vía una cuenta personal de Gmail, y explicando por qué su sistema de email "profesional" había fallado en el peor momento posible.

**La lección:** La autenticación ya no es opcional. Es la diferencia entre "entregado" y "realmente recibido".

---

## Por Qué Febrero de 2024 Lo Cambió Todo

<InsightCard icon="🚨" title="El Punto de Inflexión de Aplicación">
Google y Yahoo anunciaron simultáneamente que a partir del 1 de febrero de 2024, todos los remitentes en masa (5,000+ emails/día) DEBEN tener SPF, DKIM y DMARC configurados. Los remitentes no conformes serían rechazados o enviados automáticamente a spam.

Microsoft siguió en mayo de 2025 con requisitos idénticos.

Esto no fue una sugerencia. Fue un corte duro.
</InsightCard>

Incluso si estás enviando 200-400 emails/día (muy por debajo del umbral de 5,000), **aún necesitas autenticación completa**. Aquí está el por qué:

1. **La reputación se comparte entre niveles de volumen** — Los ISP no separan pools de reputación de "remitente pequeño" y "remitente en masa"
2. **El filtrado silencioso es peor que el rechazo** — Tus emails desaparecen sin rebotes; nunca sabes que estás en spam
3. **Una queja puede causar cascada** — Una sola queja de spam de un dominio autenticado es perdonada; de uno no autenticado, es una bandera roja

<RangeSlider 
  label="¿Cuán confiado estás de que tu configuración actual de email está completamente autenticada?" 
  min={1} 
  max={10} 
  lowLabel="No tengo idea" 
  highLabel="100% seguro" 
  persistKey="email-deliverability-L2-auth-confidence" 
/>

---

## El Stack de Autenticación de Tres Capas

Piensa en la autenticación de email como seguridad aeroportuaria:

- **SPF** = Tu tarjeta de embarque (demuestra que puedes enviar desde este dominio)
- **DKIM** = Tu pasaporte (demuestra que el mensaje no fue alterado)
- **DMARC** = El punto de control TSA (le dice a los ISP qué hacer si SPF o DKIM fallan)

Las tres son necesarias. Faltar incluso una capa significa que tus emails se tratan como sospechosos.

<FlipCard 
  front="¿Qué hace realmente SPF?" 
  back="SPF (Marco de Política de Remitente) es un registro DNS que lista qué servidores de correo están autorizados a enviar email en nombre de tu dominio. Si un email viene de un servidor no autorizado, falla SPF y se marca." 
/>

<FlipCard 
  front="¿Qué hace realmente DKIM?" 
  back="DKIM (DomainKeys Identified Mail) agrega una firma criptográfica a tus emails. El servidor receptor verifica esta firma contra una clave pública en tu DNS. Si coinciden, el email no ha sido alterado en tránsito." 
/>

<FlipCard 
  front="¿Qué hace realmente DMARC?" 
  back="DMARC (Autenticación, Reportes y Conformidad Basados en Dominio) le dice a los servidores receptores qué hacer cuando SPF o DKIM fallan: entregar de todas formas (p=none), poner en cuarentena (p=quarantine), o rechazar (p=reject). También te envía reportes sobre fallos de autenticación." 
/>

---

## SPF: Quién Puede Enviar Email para Tu Dominio

### Lo Básico

SPF es un único registro TXT en tu DNS que se ve así:

```
v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

Decodifiquémoslo:

- `v=spf1` — SPF versión 1 (la única versión)
- `include:_spf.google.com` — Google Workspace está autorizado a enviar para este dominio
- `include:sendgrid.net` — SendGrid está autorizado a enviar para este dominio
- `~all` — Fallo suave para todo lo demás (trata remitentes no autorizados como sospechosos pero no rechaces)

### El Límite de 10 Búsquedas (La Trampa Oculta)

Aquí está donde la mayoría de la gente rompe SPF sin darse cuenta: **SPF tiene un máximo de 10 búsquedas DNS**. Cada declaración `include:` desencadena al menos una búsqueda, y algunos servicios (como Salesforce) desencadenan múltiples búsquedas anidadas.

<ExampleCard label="Falla Real de SPF en el Mundo">
Un fundador usando Google Workspace + Instantly + Smartlead + Mailchimp + HubSpot terminó con 14 búsquedas DNS. Su registro SPF era técnicamente inválido, causando que el 30% de sus emails fallaran la autenticación.

No supo hasta que ejecutó un verificador de SPF y vio "PermError: Demasiadas búsquedas DNS".
</ExampleCard>

**Solución:** Aplanamiento de SPF. Herramientas como [AutoSPF](https://autospf.com) o [dmarcian](https://dmarcian.com) pueden aplanar tu registro SPF reemplazando declaraciones `include:` con las direcciones IP reales, reduciendo el conteo de búsquedas.

<InsightCard icon="⚠️" title="Errores Comunes de SPF">
1. **Múltiples registros SPF** — Solo puedes tener UN registro SPF por dominio. Dos registros = ambos se ignoran.
2. **Usar `-all` demasiado pronto** — Comienza con `~all` (fallo suave) durante la configuración, luego cambia a `-all` (fallo duro) después de validación.
3. **Olvidar actualizar SPF cuando agregues herramientas** — Cada nuevo servicio de envío necesita agregarse a tu registro SPF.
</InsightCard>

### Tu Checklist de Configuración SPF

<InteractiveChecklist 
  title="Pasos de Configuración de SPF" 
  persistKey="email-deliverability-L2-spf-checklist" 
  items={[
    "Lista todos los servicios que envían email como tu dominio (Google Workspace, Instantly, Smartlead, etc.)",
    "Construye tu registro SPF con todas las declaraciones include: necesarias",
    "Verifica el conteo de búsquedas DNS usando el verificador SPF de MXToolbox",
    "Si >10 búsquedas, aplana tu registro SPF usando AutoSPF o dmarcian",
    "Agrega el registro SPF a tu DNS (un único registro TXT en el dominio raíz)",
    "Espera 15-60 minutos para propagación DNS",
    "Verifica con MXToolbox: https://mxtoolbox.com/spf.aspx",
    "Envía un email de prueba a mail-tester.com y confirma que SPF pasa"
  ]} 
/>

---

## DKIM: Prueba Criptográfica de que Tu Email Es Auténtico

### Cómo Funciona DKIM

DKIM agrega una firma invisible a cada email que envías. El servidor receptor verifica esta firma contra una clave pública almacenada en tu DNS. Si coinciden, el email se verifica como auténtico e inalterado.

**El proceso:**

1. Tu proveedor de email (Google Workspace, Instantly, etc.) genera una **clave privada** (mantenida en secreto)
2. Publicas la **clave pública** correspondiente en tu DNS como un registro TXT
3. Cada email saliente se firma con la clave privada
4. Los servidores receptores verifican la firma usando tu clave pública

<FlipCard 
  front="¿Por qué claves de 2048 bits?" 
  back="Google deprecó las claves DKIM de 1024 bits en 2024 porque son vulnerables a poder computacional moderno. Las claves de 2048 bits son ahora el estándar mínimo. Las claves antiguas fallan silenciosamente la validación." 
/>

### Configurando DKIM (Ejemplo de Google Workspace)

**Paso 1: Genera tu clave DKIM**

1. Ve a Consola de Administración de Google → Aplicaciones → Google Workspace → Gmail → Autenticar email
2. Haz clic en "Generar nuevo registro"
3. Prefijo: `google` (o cualquier nombre de selector que desees)
4. Longitud de clave: **2048 bits** (requerido)
5. Copia el valor del registro TXT (se ve como `v=DKIM1; k=rsa; p=MIIBIjANBg...`)

**Paso 2: Agrega el registro DKIM a DNS**

Crea un registro TXT:
- **Nombre:** `google._domainkey` (o `tuprefix._domainkey`)
- **Valor:** El registro TXT completo de Google Admin

**Paso 3: Verifica**

1. Espera 15-60 minutos para propagación DNS
2. En Google Admin, haz clic en "Comenzar autenticación"
3. Google verificará el registro DNS y activará la firma DKIM

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="Para Fundadores Técnicos">
Puedes generar tus propias claves DKIM usando OpenSSL:

```bash
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key
```

Luego formatea la clave pública para DNS y configura tu herramienta de envío para usar la clave privada. La mayoría de fundadores deberían usar el generador DKIM incorporado de su proveedor de email en su lugar.
</ContextualNote>

### DKIM para Múltiples Herramientas de Envío

Si usas Google Workspace + Instantly + Smartlead, necesitas **registros DKIM separados para cada servicio**:

```
google._domainkey     TXT "v=DKIM1; k=rsa; p=[GOOGLE_KEY]"
instantly._domainkey  TXT "v=DKIM1; k=rsa; p=[INSTANTLY_KEY]"
smartlead._domainkey  TXT "v=DKIM1; k=rsa; p=[SMARTLEAD_KEY]"
```

Cada servicio usa un **selector** diferente (el prefijo antes de `._domainkey`). Esto permite que múltiples herramientas firmen emails desde el mismo dominio sin conflictos.

<InteractiveChecklist 
  title="Pasos de Configuración de DKIM" 
  persistKey="email-deliverability-L2-dkim-checklist" 
  items={[
    "Genera clave DKIM en Google Workspace (o tu proveedor de email)",
    "Asegúrate de que la longitud de clave es 2048 bits mínimo",
    "Agrega el registro TXT de DKIM a DNS con el nombre de selector correcto",
    "Si usas múltiples herramientas de envío, genera claves DKIM separadas para cada una",
    "Agrega todos los registros DKIM a DNS (uno por servicio)",
    "Espera 15-60 minutos para propagación DNS",
    "Verifica cada registro DKIM usando el verificador DKIM de MXToolbox",
    "Envía emails de prueba y confirma que la firma DKIM pasa"
  ]} 
/>

---

## DMARC: La Capa de Aplicación de Política

### Qué Hace DMARC

DMARC vincula SPF y DKIM juntos y le dice a los servidores receptores qué hacer cuando la autenticación falla. También te envía **reportes** sobre quién está enviando email afirmando ser desde tu dominio.

Un registro DMARC básico se ve así:

```
_dmarc.tudominio.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@tudominio.com; pct=100"
```

Decodifiquémoslo:

- `v=DMARC1` — DMARC versión 1
- `p=none` — Política: solo monitorear (no rechazar ni poner en cuarentena fallos)
- `rua=mailto:dmarc@tudominio.com` — Envía reportes agregados aquí
- `pct=100` — Aplica esta política al 100% de los emails

### La Ruta de Escalada de DMARC (Crítico)

**Nunca comiences con `p=reject`.** Romperás flujos de email legítimos que no sabías que existían (facturas automatizadas, tickets de soporte, etc.).

La secuencia correcta de escalada:

<SlideNavigation>
<Slide title="Paso 1: p=none (Monitoreo)">
**Duración:** 2-4 semanas

```
v=DMARC1; p=none; rua=mailto:dmarc@tudominio.com; pct=100
```

**Qué sucede:** Todos los emails se entregan normalmente. Recibes reportes semanales mostrando qué emails pasan/fallan SPF y DKIM.

**Acción:** Revisa reportes. Arregla cualquier fuente legítima que falle autenticación (servicios olvidados, herramientas de terceros).
</Slide>

<Slide title="Paso 2: p=quarantine pct=10">
**Duración:** 1-2 semanas

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@tudominio.com; pct=10
```

**Qué sucede:** El 10% de emails que fallan autenticación van a spam. El 90% sigue siendo entregado normalmente.

**Acción:** Monitorea reportes. Confirma que no hay email legítimo siendo puesto en cuarentena.
</Slide>

<Slide title="Paso 3: p=quarantine pct=100">
**Duración:** 2-4 semanas

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@tudominio.com; pct=100
```

**Qué sucede:** Todos los emails que fallan autenticación van a spam.

**Acción:** Monitorea reportes. Asegúrate de que la carpeta de spam no se está llenando con email legítimo.
</Slide>

<Slide title="Paso 4: p=reject pct=10">
**Duración:** 1-2 semanas

```
v=DMARC1; p=reject; rua=mailto:dmarc@tudominio.com; pct=10
```

**Qué sucede:** El 10% de emails que fallan autenticación son rechazados completamente (no entregados en absoluto).

**Acción:** Verificación final de seguridad. Confirma que no hay sistemas críticos rotos.
</Slide>

<Slide title="Paso 5: p=reject pct=100 (Estado Final)">
**Duración:** Permanente

```
v=DMARC1; p=reject; rua=mailto:dmarc@tudominio.com; pct=100
```

**Qué sucede:** Todos los emails que fallan autenticación son rechazados. Tu dominio está ahora completamente protegido contra spoofing.

**Acción:** Continúa monitoreando reportes mensualmente.
</Slide>
</SlideNavigation>

<InsightCard icon="🎯" title="Por Qué Esto Importa">
En `p=reject`, los spammers no pueden enviar emails haciéndose pasar por ti. Esto protege tu reputación de marca y evita ataques de phishing usando tu dominio.

Pero apresurarse a `p=reject` sin probar puede romper flujos de email críticos (facturas, tickets de soporte, reportes automatizados). La ruta de escalada previene esto.
</InsightCard>

### Alineación de DMARC (El Requisito Oculto)

DMARC no solo verifica si SPF y DKIM pasan — verifica si se **alinean** con el dominio "From".

**Modos de alineación:**

- **Alineación relajada** — Los subdominios están permitidos (ej., email de `mail.tudominio.com` pasa para `tudominio.com`)
- **Alineación estricta** — Coincidencia exacta de dominio requerida

La mayoría de remitentes usan alineación relajada:

```
v=DMARC1; p=quarantine; aspf=r; adkim=r; rua=mailto:dmarc@tudominio.com
```

- `aspf=r` — Alineación SPF relajada
- `adkim=r` — Alineación DKIM relajada

<InteractiveChecklist 
  title="Pasos de Configuración de DMARC" 
  persistKey="email-deliverability-L2-dmarc-checklist" 
  items={[
    "Crea una dirección de email dedicada para reportes DMARC (ej., dmarc@tudominio.com)",
    "Agrega el registro DMARC inicial con p=none a DNS",
    "Espera 24-48 horas para que lleguen los primeros reportes",
    "Revisa reportes usando DMARC de Postmark o dmarcian (capas gratuitas disponibles)",
    "Arregla cualquier fuente legítima que falle SPF/DKIM",
    "Después de 2-4 semanas, escalona a p=quarantine pct=10",
    "Monitorea por 1-2 semanas, luego escalona a p=quarantine pct=100",
    "Después de 2-4 semanas, escalona a p=reject pct=10",
    "Escalada final a p=reject pct=100 después de confirmar que no hay problemas"
  ]} 
/>

---

## Poniéndolo Todo Junto: La Configuración DNS Completa

Aquí está lo que se ve un dominio de envío completamente autenticado en DNS:

<TemplateBuilder
  title="Conjunto Completo de Registros DNS"
  persistKey="email-deliverability-L2-dns-template"
  sections={[
    {
      id: "domain",
      title: "Tu Dominio",
      fields: [
        { id: "domain", label: "Dominio de Envío", placeholder: "ej., getacme.com", type: "text" }
      ]
    },
    {
      id: "provider",
      title: "Proveedor de Email",
      fields: [
        { id: "provider", label: "Proveedor de Email", placeholder: "ej., Google Workspace, Microsoft 365", type: "text" }
      ]
    },
    {
      id: "tools",
      title: "Herramientas de Envío",
      fields: [
        { id: "tools", label: "Herramientas Adicionales de Envío", placeholder: "ej., Instantly, Smartlead, Mailchimp", type: "textarea" }
      ]
    }
  ]}
/>

**Ejemplo de salida para `getacme.com` usando Google Workspace + Instantly:**

```
; Registros MX (Google Workspace)
@ MX 1 aspmx.l.google.com.
@ MX 5 alt1.aspmx.l.google.com.
@ MX 5 alt2.aspmx.l.google.com.
@ MX 10 alt3.aspmx.l.google.com.
@ MX 10 alt4.aspmx.l.google.com.

; Registro SPF
@ TXT "v=spf1 include:_spf.google.com include:spf.instantly.ai ~all"

; Registros DKIM
google._domainkey TXT "v=DKIM1; k=rsa; p=[TU_CLAVE_GOOGLE_2048_BITS]"
instantly._domainkey TXT "v=DKIM1; k=rsa; p=[TU_CLAVE_INSTANTLY_2048_BITS]"

; Registro DMARC (comenzar con p=none)
_dmarc TXT "v=DMARC1; p=none; rua=mailto:dmarc@getacme.com; pct=100"
```

---

## Verificación: Cómo Saber Que Funciona

No asumas que tus registros DNS son correctos. **Verifica todo.**

### Herramienta 1: SuperTool de MXToolbox

**URL:** https://mxtoolbox.com/SuperTool.aspx

**Qué verificar:**
1. Búsqueda de Registro SPF — Debe mostrar tu registro SPF con todos los includes
2. Búsqueda de Registro DKIM — Ingresa `google._domainkey.tudominio.com` (o tu selector)
3. Búsqueda de Registro DMARC — Debe mostrar tu política DMARC
4. Propagación DNS — Confirma que los registros están activos globalmente

<InsightCard icon="✅" title="Verde Significa Listo">
MXToolbox muestra marcas de verificación verdes para registros válidos. Amarillo o rojo = algo está roto.

Errores comunes:
- "SPF PermError: Demasiadas búsquedas DNS" → Aplana tu SPF
- "Registro DKIM no encontrado" → Verifica el nombre de selector y propagación DNS
- "Registro DMARC no encontrado" → Verifica que existe el registro TXT `_dmarc.tudominio.com`
</InsightCard>

### Herramienta 2: mail-tester.com

**URL:** https://www.mail-tester.com

**Cómo funciona:**
1. Envía un email a la dirección mostrada en mail-tester.com
2. Espera 10 segundos
3. Haz clic en "Luego verifica tu puntuación"
4. Obtendrás una puntuación de 10 con retroalimentación detallada

**Qué buscar:**
- **Puntuación 10/10** = Autenticación perfecta
- **8-9/10** = Problemas menores (generalmente contenido, no autenticación)
- **<8/10** = Problemas de autenticación o desencadenantes de spam

mail-tester verifica:
- Paso/fallo de SPF
- Validez de firma DKIM
- Política DMARC
- Patrones de contenido de spam
- Estado de lista negra
- Formato de email

<RangeSlider 
  label="¿Qué puntuación obtuviste en mail-tester.com?" 
  min={0} 
  max={10} 
  lowLabel="0/10" 
  highLabel="10/10" 
  persistKey="email-deliverability-L2-mailtester-score" 
/>

### Herramienta 3: Caja de Herramientas de Google Admin (para usuarios de Google Workspace)

**URL:** https://toolbox.googleapps.com/apps/checkmx/

**Qué hace:**
- Valida registros MX para Google Workspace
- Verifica configuración SPF y DKIM
- Prueba entrega de email a Gmail

**Cómo usar:**
1. Ingresa tu dominio
2. Haz clic en "Verificar registros MX"
3. Revisa resultados — debe mostrar los 5 registros MX de Google
4. Haz clic en pestañas "Verificar SPF" y "Verificar DKIM"
5. Arregla cualquier error mostrado

---

## Errores Comunes y Cómo Arreglarlos

<ClassifyExercise
  title="Clasifica Estas Configuraciones DNS"
  persistKey="email-deliverability-L2-classify-configs"
  categories={[
    { id: "correct", label: "Correcto", color: "#10b981" },
    { id: "broken", label: "Roto", color: "#ef4444" },
    { id: "risky", label: "Riesgoso pero funciona", color: "#f59e0b" }
  ]}
  items={[
    { 
      id: "1", 
      content: "SPF: v=spf1 include:_spf.google.com ~all | DKIM: 2048-bit | DMARC: p=none", 
      correctCategory: "correct",
      explanation: "Configuración inicial perfecta. SPF incluye solo Google, DKIM es fuerte, DMARC está en modo monitoreo."
    },
    { 
      id: "2", 
      content: "SPF: v=spf1 include:_spf.google.com include:sendgrid.net include:mailchimp.com include:hubspot.com include:salesforce.com ~all (14 búsquedas DNS)", 
      correctCategory: "broken",
      explanation: "Excede el límite de 10 búsquedas DNS. SPF fallará con PermError. Necesita aplanamiento."
    },
    { 
      id: "3", 
      content: "SPF: v=spf1 include:_spf.google.com -all | DKIM: ninguno | DMARC: p=reject", 
      correctCategory: "broken",
      explanation: "DKIM completamente faltante y DMARC en p=reject sin probar. Romperá email legítimo."
    },
    { 
      id: "4", 
      content: "SPF: v=spf1 include:_spf.google.com ~all | DKIM: 1024-bit | DMARC: p=none", 
      correctCategory: "risky",
      explanation: "Las claves DKIM de 1024-bit están deprecadas por Google. Fallarán en validación pronto. Actualiza a 2048-bit."
    },
    { 
      id: "5", 
      content: "Dos registros SPF: v=spf1 include:_spf.google.com ~all AND v=spf1 include:sendgrid.net ~all", 
      correctCategory: "broken",
      explanation: "Múltiples registros SPF = ambos se ignoran. Combina en un solo registro."
    },
    { 
      id: "6", 
      content: "SPF: v=spf1 include:_spf.google.com ~all | DKIM: 2048-bit | DMARC: p=quarantine (después de 1 día de monitoreo)", 
      correctCategory: "risky",
      explanation: "Escalando DMARC demasiado rápido. Deberías monitorear en p=none por 2-4 semanas primero."
    }
  ]}
/>

---

## El Entrenador de Configuración DNS (Validación Impulsada por IA)

Pega tu configuración DNS actual abajo y obtén retroalimentación instantánea sobre qué está roto y cómo arreglarlo.

<LinterFeedback
  title="Linter de Configuración DNS"
  persistKey="email-deliverability-L2-dns-linter"
  inputLabel="Pega tus registros DNS (SPF, DKIM, DMARC)"
  placeholder="Ejemplo:
@ TXT 'v=spf1 include:_spf.google.com ~all'
google._domainkey TXT 'v=DKIM1; k=rsa; p=MIIBIjAN...'
_dmarc TXT 'v=DMARC1; p=none; rua=mailto:dmarc@tudominio.com'"
  rules={[
    { 
      id: "spf-exists", 
      label: "Existe registro SPF", 
      description: "Debe tener exactamente un registro SPF TXT", 
      keywords: ["v=spf1"], 
      antiKeywords: [] 
    },
    { 
      id: "spf-softfail", 
      label: "SPF usa ~all (fallo suave)", 
      description: "Debería usar ~all durante configuración, -all después de validación", 
      keywords: ["~all"], 
      antiKeywords: ["-all"] 
    },
    { 
      id: "dkim-exists", 
      label: "Existe registro DKIM", 
      description: "Debe tener al menos un registro DKIM TXT", 
      keywords: ["v=DKIM1", "k=rsa"], 
      antiKeywords: [] 
    },
    { 
      id: "dkim-2048", 
      label: "DKIM usa clave de 2048-bit", 
      description: "La longitud de clave debe ser 2048 bits mínimo", 
      keywords: ["p=MIIBIjAN"], 
      antiKeywords: ["p=MIGfMA0"] 
    },
    { 
      id: "dmarc-exists", 
      label: "Existe registro DMARC", 
      description: "Debe tener registro DMARC TXT en subdominio _dmarc", 
      keywords: ["v=DMARC1"], 
      antiKeywords: [] 
    },
    { 
      id: "dmarc-reporting", 
      label: "DMARC tiene dirección de reportes", 
      description: "Debería incluir rua= para reportes agregados", 
      keywords: ["rua=mailto:"], 
      antiKeywords: [] 
    }
  ]}
/>

---

## Tu Plan de Acción

<InteractiveChecklist 
  title="Configuración de Autenticación Completa" 
  persistKey="email-deliverability-L2-action-plan" 
  items={[
    "Audita registros DNS actuales usando MXToolbox",
    "Configura registro SPF con todos los remitentes autorizados",
    "Verifica que SPF tiene <10 búsquedas DNS (aplana si es necesario)",
    "Genera claves DKIM de 2048-bit para cada servicio de envío",
    "Agrega todos los registros DKIM a DNS",
    "Crea dirección de email para monitoreo DMARC",
    "Agrega registro DMARC comenzando con p=none",
    "Envía email de prueba a mail-tester.com y logra puntuación 10/10",
    "Monitorea reportes DMARC por 2-4 semanas",
    "Escalona la política DMARC siguiendo la ruta de 5 pasos",
    "Configura recordatorio de calendario para revisar reportes DMARC mensualmente"
  ]} 
/>

---

## Lo Que Viene

Ahora tienes la fundación de autenticación. Pero los registros DNS solos no garantizan colocación en bandeja de entrada.

En **Lección 3**, abordaremos **los desafíos únicos de filtrado de Microsoft Outlook** — por qué Outlook es más duro que Gmail, cómo monitorear tu reputación en Outlook con SNDS, y los patrones de contenido que activan la carpeta Basura de Outlook.

Luego en **Lección 4**, diseñaremos tu **arquitectura multi-dominio** — por qué necesitas 3-5 dominios de envío, cómo nombrarlos, y cómo asignar volumen de envío entre ellos.

La autenticación es el precio de entrada. La estrategia de dominio es cómo escalas de forma segura.

---

## Verificación Rápida de Conocimiento

```json
{
  "quizTitle": "Fundamentos de SPF/DKIM/DMARC",
  "questions": [
    {
      "id": "q1",
      "question": "¿Qué sucede si tienes dos registros SPF en el mismo dominio?",
      "options": [
        "El primero tiene prioridad",
        "Se fusionan automáticamente",
        "Ambos se ignoran y SPF falla",
        "Se usa el más reciente"
      ],
      "correctIndex": 2,
      "explanation": "DNS solo permite un registro SPF por dominio. Si existen múltiples, todos se ignoran y la validación SPF falla."
    },
    {
      "id": "q2",
      "question": "¿Cuál es la longitud mínima de clave DKIM requerida por Google desde 2024?",
      "options": [
        "1024 bits",
        "2048 bits",
        "4096 bits",
        "512 bits"
      ],
      "correctIndex": 1,
      "explanation": "Google deprecó las claves de 1024-bit en 2024. Las claves de 2048-bit son ahora el estándar mínimo."
    },
    {
      "id": "q3",
      "question": "¿Cuál debería ser tu política DMARC inicial?",
      "options": [
        "p=reject (máxima protección)",
        "p=quarantine (protección moderada)",
        "p=none (solo monitoreo)",
        "No se necesita registro DMARC inicialmente"
      ],
      "correctIndex": 2,
      "explanation": "Siempre comienza con p=none para monitorear autenticación sin afectar entrega. Escalona gradualmente después de revisar reportes."
    },
    {
      "id": "q4",
      "question": "¿Cuál es el número máximo de búsquedas DNS permitidas en un registro SPF?",
      "options": [
        "5",
        "10",
        "15",
        "Ilimitado"
      ],
      "correctIndex": 1,
      "explanation": "SPF tiene un límite duro de 10 búsquedas DNS. Exceder esto causa un PermError y SPF falla."
    },
    {
      "id": "q5",
      "question": "¿Qué verifica la alineación de DMARC?",
      "options": [
        "Si SPF y DKIM ambos pasan",
        "Si el dominio From coincide con el dominio autenticado por SPF/DKIM",
        "Si el contenido del email es spam",
        "Si el IP de envío está en lista negra"
      ],
      "correctIndex": 1,
      "explanation": "La alineación de DMARC asegura que el dominio visible From coincida con el dominio autenticado por SPF y DKIM. Esto previene spoofing."
    }
  ]
}
```
