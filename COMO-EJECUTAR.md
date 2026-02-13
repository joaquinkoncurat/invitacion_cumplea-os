# Cómo ejecutar la invitación de cumpleaños

## Opción 1: Abrir directamente en el navegador (más fácil)

1. **Abrir el archivo** `invitacion.html`:
   - Haz doble clic en el archivo `invitacion.html`
   - O arrástralo a una ventana del navegador (Chrome, Edge, Firefox, etc.)
   - O en el navegador: menú **Archivo → Abrir archivo** y selecciona `invitacion.html`

2. **Listo.** La invitación se abrirá y podrás probar todos los pasos.

---

## Opción 2: Usar un servidor local (si necesitás compartir por link)

Si querés compartir la invitación por un link (por ejemplo con ngrok o similar):

1. **Abrir una terminal** en la carpeta del proyecto:
   ```
   cd "c:\Users\Usuario\Desktop\Joaquin\cumpleaños"
   ```

2. **Ejecutar un servidor simple** con Python (si lo tenés instalado):
   ```
   python -m http.server 8080
   ```
   O con Node.js (si tenés `npx`):
   ```
   npx serve .
   ```

3. **Abrir en el navegador:** `http://localhost:8080/invitacion.html`

---

## Pasos de la invitación

1. **Bienvenida** – Pantalla inicial con la info del evento
2. **Nombre** – El invitado ingresa su nombre
3. **¿Vas a venir?** – Sí / Obvio / No
4. **Si dijo No:** excusa obligatoria → va directo al final
5. **Si dijo Sí:** continúa con:
   - Vibe (tranquilo, fiesta, emocional, NPC)
   - Cantidad de personas
   - Con quién viene (opcional)
   - Qué va a traer (alcohol, gaseosa, comida, etc.)
   - Nivel de fiesta (1–10)
   - Términos y condiciones
6. **Confirmación final** – Resumen o mensaje de “que bajón” si no viene

---

## Compartir con invitados

- **Opción A:** Subir `invitacion.html` a un hosting (Netlify, Vercel, GitHub Pages, etc.) y compartir el link.
- **Opción B:** Enviar el archivo por WhatsApp/email y que cada uno lo abra en su navegador.
