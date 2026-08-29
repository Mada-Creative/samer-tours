/* =========================================================
   Samer Tours — shared site configuration
   =========================================================
   FORM_ENDPOINT is used by both the booking form (booking.js) and the
   homepage "call me back" form (contact-form.js), so it only needs to
   be set in one place.

   It's still a placeholder — Formspree retired the old "POST straight
   to an email, no signup" trick in 2024, so a real endpoint now needs
   a (free) Formspree account. To test the whole flow with
   tareq.salame@gmail.com right now:

   1. Go to https://formspree.io and sign up free with
      tareq.salame@gmail.com (~60 seconds, no card needed).
   2. Create a new form — Formspree gives you an endpoint that looks
      like "https://formspree.io/f/xxxxabcd".
   3. Paste it below, replacing the placeholder.
   4. Submit a form once for real — Formspree sends a one-time
      confirmation email first; after that, every submission lands in
      that inbox.

   BEFORE GOING LIVE: swap this to Samer's own Formspree account/email
   instead. See README.md for more.
   ========================================================= */
window.SAMER_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
