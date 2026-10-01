/* =========================================================
   Samer Tours — booking form logic
   The Formspree endpoint is configured once in assets/js/config.js
   (window.SAMER_FORM_ENDPOINT) — shared with the homepage contact form.
   ========================================================= */
var FORM_ENDPOINT = window.SAMER_FORM_ENDPOINT;

(function () {
  var stopCount = 0;

  function currentDict() {
    return (window.SamerI18N && window.SamerI18N.getDict)
      ? window.SamerI18N.getDict(document.documentElement.getAttribute("lang"))
      : {};
  }

  /* ---------- Toggle-pill active-state sync (trip type / honeymoon) ---------- */
  function syncTogglePill(radio) {
    var label = radio.closest(".toggle-pill");
    if (!label) return;
    var group = label.closest(".trip-type-toggle");
    if (group) {
      group.querySelectorAll(".toggle-pill").forEach(function (l) { l.classList.remove("active"); });
    }
    label.classList.add("active");
  }

  document.addEventListener("change", function (e) {
    if (e.target.closest && e.target.closest(".toggle-pill") && e.target.type === "radio") {
      syncTogglePill(e.target);
    }
    if (e.target.closest && e.target.closest(".quiz-option") && e.target.type === "radio") {
      var group = e.target.closest(".quiz-options");
      if (group) {
        group.querySelectorAll(".quiz-option").forEach(function (l) { l.classList.remove("selected"); });
      }
      e.target.closest(".quiz-option").classList.add("selected");
    }
  });

  /* ---------- Multi-destination stop rows ---------- */
  function buildStopRow(index) {
    var dict = currentDict();
    var row = document.createElement("div");
    row.className = "stop-row reveal";
    row.setAttribute("data-stop-index", String(index));
    row.innerHTML =
      '<div class="stop-row-title">' +
        '<span class="js-stop-label">' + (dict.stop_label || "Destination") + " " + index + "</span>" +
        '<button type="button" class="stop-remove-btn js-remove-stop hidden">' + (dict.remove_stop_button || "Remove") + "</button>" +
      "</div>" +
      '<div class="form-row">' +
        '<div class="form-group">' +
          '<select name="stop_' + index + '_destination" class="form-control js-destination-select" required>' +
            '<option value="" data-i18n="form_destination_placeholder"></option>' +
          "</select>" +
        "</div>" +
      "</div>" +
      '<div class="form-row">' +
        '<div class="form-group">' +
          '<input type="date" name="stop_' + index + '_date_from" class="form-control js-date-from" required>' +
        "</div>" +
        '<div class="form-group">' +
          '<input type="date" name="stop_' + index + '_date_to" class="form-control js-date-to" required>' +
        "</div>" +
      "</div>";

    var select = row.querySelector(".js-destination-select");
    if (window.SamerDestinations) window.SamerDestinations.populateSelect(select);
    if (window.SamerI18N) window.SamerI18N.applyLanguage(document.documentElement.getAttribute("lang") || "ar");

    row.querySelector(".js-remove-stop").addEventListener("click", function () {
      row.remove();
      renumberStops();
    });

    var today = new Date().toISOString().slice(0, 10);
    row.querySelector(".js-date-from").setAttribute("min", today);
    row.querySelector(".js-date-to").setAttribute("min", today);
    row.querySelector(".js-date-from").addEventListener("change", function () {
      if (this.value) row.querySelector(".js-date-to").setAttribute("min", this.value);
    });

    return row;
  }

  function renumberStops() {
    var container = document.getElementById("stopsContainer");
    if (!container) return;
    var rows = container.querySelectorAll(".stop-row");
    var dict = currentDict();
    rows.forEach(function (row, i) {
      row.querySelector(".js-stop-label").textContent = (dict.stop_label || "Destination") + " " + (i + 1);
      var removeBtn = row.querySelector(".js-remove-stop");
      removeBtn.classList.toggle("hidden", rows.length <= 2);
    });
  }

  function addStop() {
    stopCount += 1;
    var container = document.getElementById("stopsContainer");
    container.appendChild(buildStopRow(stopCount));
    renumberStops();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("bookingForm");
    if (!form) return;

    /* --- Trip type: single vs multi destination --- */
    var singleBlock = document.getElementById("singleDestBlock");
    var multiBlock = document.getElementById("multiDestBlock");
    var tripTypeSingle = document.getElementById("tripTypeSingle");
    var tripTypeMulti = document.getElementById("tripTypeMulti");

    // Seed two initial stop rows (hidden until "multiple destinations" is chosen)
    addStop();
    addStop();

    function setSelectRequired(container, required) {
      if (!container) return;
      container.querySelectorAll("select").forEach(function (el) { el.required = required; });
    }
    function setDateRequired(container, required) {
      if (!container) return;
      container.querySelectorAll("input[type='date']").forEach(function (el) { el.required = required; });
    }

    // On a honeymoon trip where the couple doesn't know their destination
    // yet, only the dates and contact details are mandatory — the
    // destination picker becomes optional (Samer will suggest one).
    function destinationIsRequired() {
      var isHoneymoon = document.getElementById("isHoneymoon");
      var hmKnowNo = document.getElementById("hmKnowNo");
      return !(isHoneymoon && isHoneymoon.checked && hmKnowNo && hmKnowNo.checked);
    }

    function syncTripType() {
      var isMulti = tripTypeMulti.checked;
      var stopsContainer = document.getElementById("stopsContainer");
      singleBlock.classList.toggle("hidden", isMulti);
      multiBlock.classList.toggle("hidden", !isMulti);
      // A hidden block's fields must not block submission (elements inside
      // a display:none ancestor aren't reliably excluded from native
      // constraint validation across browsers), so toggle `required` explicitly.
      // Dates stay required for whichever block is visible; the destination
      // picker additionally depends on the honeymoon "don't know yet" state.
      setDateRequired(singleBlock, !isMulti);
      setDateRequired(stopsContainer, isMulti);
      var destReq = destinationIsRequired();
      setSelectRequired(singleBlock, !isMulti && destReq);
      setSelectRequired(stopsContainer, isMulti && destReq);
    }
    tripTypeSingle.addEventListener("change", syncTripType);
    tripTypeMulti.addEventListener("change", syncTripType);
    document.getElementById("addStopBtn").addEventListener("click", addStop);
    syncTripType(); // establish correct initial `required` state (single mode active)

    /* --- Single-destination fields --- */
    var destinationSelect = document.getElementById("destination");
    var otherGroup = document.getElementById("otherDestinationGroup");
    var otherInput = document.getElementById("otherDestination");
    var dateFrom = document.getElementById("dateFrom");
    var dateTo = document.getElementById("dateTo");
    var dateError = document.getElementById("dateError");

    var today = new Date().toISOString().slice(0, 10);
    if (dateFrom) dateFrom.setAttribute("min", today);
    if (dateTo) dateTo.setAttribute("min", today);

    var params = new URLSearchParams(window.location.search);
    var destParam = params.get("dest");
    if (destParam && destinationSelect) {
      var match = Array.prototype.find.call(destinationSelect.options, function (opt) {
        return opt.value === destParam;
      });
      if (match) destinationSelect.value = destParam;
    }

    function syncOtherDestination() {
      var isOther = destinationSelect.value === "other";
      otherGroup.classList.toggle("hidden", !isOther);
      if (otherInput) otherInput.required = isOther;
    }
    if (destinationSelect) {
      destinationSelect.addEventListener("change", syncOtherDestination);
      syncOtherDestination();
    }
    if (dateFrom && dateTo) {
      dateFrom.addEventListener("change", function () {
        if (dateFrom.value) dateTo.setAttribute("min", dateFrom.value);
      });
    }

    /* --- WhatsApp same-as-phone --- */
    var whatsappSame = document.getElementById("whatsappSame");
    var phoneInput = document.getElementById("phone");
    var whatsappInput = document.getElementById("whatsapp");
    if (whatsappSame && phoneInput && whatsappInput) {
      function syncWhatsapp() {
        if (whatsappSame.checked) {
          whatsappInput.value = phoneInput.value;
          whatsappInput.setAttribute("readonly", "readonly");
        } else {
          whatsappInput.removeAttribute("readonly");
        }
      }
      whatsappSame.addEventListener("change", syncWhatsapp);
      phoneInput.addEventListener("input", function () {
        if (whatsappSame.checked) whatsappInput.value = phoneInput.value;
      });
      syncWhatsapp();
    }

    /* --- Honeymoon toggle + suggestion quiz --- */
    var isHoneymoon = document.getElementById("isHoneymoon");
    var honeymoonBlock = document.getElementById("honeymoonBlock");
    var hmKnowYes = document.getElementById("hmKnowYes");
    var hmKnowNo = document.getElementById("hmKnowNo");
    var honeymoonQuizBlock = document.getElementById("honeymoonQuizBlock");

    if (isHoneymoon && honeymoonBlock) {
      isHoneymoon.addEventListener("change", function () {
        honeymoonBlock.classList.toggle("hidden", !isHoneymoon.checked);
        syncTripType(); // re-evaluate whether the destination picker is required
      });
    }
    function syncHoneymoonQuiz() {
      honeymoonQuizBlock.classList.toggle("hidden", !hmKnowNo.checked);
      syncTripType();
    }
    if (hmKnowYes && hmKnowNo) {
      hmKnowYes.addEventListener("change", syncHoneymoonQuiz);
      hmKnowNo.addEventListener("change", syncHoneymoonQuiz);
    }

    /* --- Pre-fill from the homepage quick-action tiles: ?multi=1 / ?honeymoon=1 --- */
    if (params.get("multi") === "1" && tripTypeMulti) {
      tripTypeMulti.checked = true;
      tripTypeMulti.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (params.get("honeymoon") === "1" && isHoneymoon) {
      isHoneymoon.checked = true;
      isHoneymoon.dispatchEvent(new Event("change", { bubbles: true }));
      document.getElementById("bookingFormCard").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /* --- Submit --- */
    var submitBtn = document.getElementById("submitBtn");
    var submitLabel = document.getElementById("submitLabel");
    var formCard = document.getElementById("bookingFormCard");
    var successBox = document.getElementById("formSuccess");
    var errorBox = document.getElementById("formError");

    function showStatus(box) {
      formCard.classList.add("hidden");
      successBox.classList.add("hidden");
      errorBox.classList.add("hidden");
      box.classList.remove("hidden");
      box.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function validateVisibleDatePairs() {
      dateError.classList.add("hidden");
      var isMulti = tripTypeMulti.checked;
      var container = isMulti ? document.getElementById("stopsContainer") : singleBlock;
      var froms = container.querySelectorAll(".js-date-from");
      var tos = container.querySelectorAll(".js-date-to");
      for (var i = 0; i < froms.length; i++) {
        if (froms[i].value && tos[i] && tos[i].value && tos[i].value < froms[i].value) {
          dateError.classList.remove("hidden");
          tos[i].focus();
          return false;
        }
      }
      return true;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.reportValidity()) return;
      if (!validateVisibleDatePairs()) return;

      submitBtn.disabled = true;
      var dict = currentDict();
      if (submitLabel && dict.form_submit_sending) submitLabel.textContent = dict.form_submit_sending;

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          return response.json().catch(function () { return null; }).then(function (data) {
            // FormSubmit.co returns HTTP 200 even while a brand-new endpoint
            // is still waiting on its one-time email activation click — so a
            // 200 status alone isn't proof of real delivery; check the body.
            var delivered = response.ok && (!data || data.success === undefined || data.success === "true" || data.success === true);
            if (delivered) {
              form.reset();
              showStatus(successBox);
            } else {
              showStatus(errorBox);
            }
          });
        })
        .catch(function () {
          showStatus(errorBox);
        })
        .finally(function () {
          submitBtn.disabled = false;
          if (submitLabel && dict.form_submit_button) submitLabel.textContent = dict.form_submit_button;
        });
    });

    document.querySelectorAll("[data-reset-form]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        successBox.classList.add("hidden");
        errorBox.classList.add("hidden");
        formCard.classList.remove("hidden");
        formCard.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });
})();
