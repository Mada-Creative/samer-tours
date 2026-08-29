/* =========================================================
   Samer Tours — shared site configuration
   =========================================================
   FORM_ENDPOINT is used by both the booking form (booking.js) and the
   homepage "call me back" form (contact-form.js).

   Currently set to FormSubmit.co, pointed at tareq.salame@gmail.com so
   the whole flow can be tried out — no account/signup needed, just a
   ONE-TIME step:

   1. Submit any form on the live site once.
   2. Check tareq.salame@gmail.com for an email titled "Activate Form" —
      that's normal, every new FormSubmit endpoint needs this once.
   3. Click "Activate Form" in that email.
   4. Submit the form again — from then on, every submission (booking
      requests and contact requests) arrives by email instantly.

   BEFORE GOING LIVE: change the email below to Samer's own address
   (also a one-time activation click, from his inbox instead).
   ========================================================= */
window.SAMER_FORM_ENDPOINT = "https://formsubmit.co/ajax/tareq.salame@gmail.com";
