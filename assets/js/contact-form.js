/* =========================================================
   Samer Tours — homepage "call me back" contact form
   Uses the same endpoint as the booking form (see assets/js/config.js).
   ========================================================= */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var card = document.getElementById("contactFormCard");
    var successBox = document.getElementById("contactFormSuccess");
    var errorBox = document.getElementById("contactFormError");
    var submitBtn = document.getElementById("contactSubmitBtn");
    var submitLabel = document.getElementById("contactSubmitLabel");

    function currentDict() {
      return (window.SamerI18N && window.SamerI18N.getDict)
        ? window.SamerI18N.getDict(document.documentElement.getAttribute("lang"))
        : {};
    }

    function showStatus(box) {
      card.classList.add("hidden");
      successBox.classList.add("hidden");
      errorBox.classList.add("hidden");
      box.classList.remove("hidden");
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      submitBtn.disabled = true;
      var dict = currentDict();
      if (submitLabel && dict.form_submit_sending) submitLabel.textContent = dict.form_submit_sending;

      fetch(window.SAMER_FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            showStatus(successBox);
          } else {
            showStatus(errorBox);
          }
        })
        .catch(function () {
          showStatus(errorBox);
        })
        .finally(function () {
          submitBtn.disabled = false;
          if (submitLabel && dict.contact_form_submit) submitLabel.textContent = dict.contact_form_submit;
        });
    });
  });
})();
