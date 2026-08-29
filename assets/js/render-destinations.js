/* =========================================================
   Samer Tours — renders destination cards / booking select /
   single-destination detail page, all from
   assets/js/destinations-data.js + assets/js/i18n.js
   ========================================================= */
(function () {
  function pinIconSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>';
  }
  function arrowIconSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  }
  function byId(id) {
    return (window.DESTINATIONS || []).find(function (d) { return d.id === id; });
  }

  /* ---------- Grid cards (destinations.html) ---------- */
  function buildCard(dest) {
    var article = document.createElement("article");
    article.className = "dest-card dest-card--full reveal";
    article.id = dest.id;
    article.innerHTML =
      '<a href="destination.html?id=' + dest.id + '" class="dest-cover-link" style="--c:' + dest.color + '">' +
        '<div class="dest-cover">' +
          '<img class="dest-cover-img" src="' + dest.heroImage + '" alt="" loading="lazy">' +
          '<div class="dest-cover-overlay">' +
            '<span class="dest-country-badge" data-i18n="dest_' + dest.id + '_country">Country</span>' +
            '<div class="dest-name" data-i18n="dest_' + dest.id + '_name">Name</div>' +
          "</div>" +
        "</div>" +
      "</a>" +
      '<div class="dest-body">' +
        '<div class="dest-tagline" data-i18n="dest_' + dest.id + '_tagline">Tagline</div>' +
        '<div class="dest-card-foot">' +
          '<a href="destination.html?id=' + dest.id + '" class="dest-link"><span data-i18n="view_details">Details</span>' + arrowIconSvg() + "</a>" +
          '<a href="booking.html?dest=' + dest.id + '" class="btn btn-primary btn-sm" data-i18n="book_this_destination">Book</a>' +
        "</div>" +
      "</div>";
    return article;
  }

  function renderDestinationsPage() {
    var container = document.getElementById("destinationsRegions");
    if (!container || !window.DESTINATIONS || !window.DESTINATION_REGIONS) return;

    var map = {};
    window.DESTINATIONS.forEach(function (d) { map[d.id] = d; });

    window.DESTINATION_REGIONS.forEach(function (region) {
      var section = document.createElement("section");
      section.className = "region-section reveal";

      var heading = document.createElement("h2");
      heading.className = "region-title";
      heading.setAttribute("data-i18n", "region_" + region.id + "_name");
      heading.textContent = region.id;
      section.appendChild(heading);

      var grid = document.createElement("div");
      grid.className = "dest-grid";
      region.destIds.forEach(function (id) {
        var dest = map[id];
        if (dest) grid.appendChild(buildCard(dest));
      });
      section.appendChild(grid);

      container.appendChild(section);
    });
  }

  /* ---------- Featured grid (homepage) ---------- */
  function renderFeaturedGrid() {
    var container = document.getElementById("featuredDestGrid");
    if (!container || !window.DESTINATIONS) return;

    var featuredIds = ["madrid", "valencia", "milano", "amsterdam", "oslo"];
    featuredIds.forEach(function (id) {
      var dest = byId(id);
      if (dest) container.appendChild(buildCard(dest));
    });

    var exploreCard = document.createElement("article");
    exploreCard.className = "dest-card reveal";
    exploreCard.style.cssText = "display:flex; align-items:center; justify-content:center; text-align:center; padding:40px;";
    exploreCard.innerHTML =
      '<div>' +
        '<svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="var(--color-primary)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="margin-inline:auto; margin-bottom:18px;"><circle cx="12" cy="12" r="9"/><path d="M15.3 8.7l-2.1 5.1-5.1 2.1 2.1-5.1z"/></svg>' +
        '<p style="font-weight:700; color:var(--color-primary-dark); margin-bottom:18px;" data-i18n="explore_all_teaser">See all 25 destinations we\'ve visited.</p>' +
        '<a href="destinations.html" class="btn btn-outline btn-sm" data-i18n="view_all_destinations">View All Destinations</a>' +
      "</div>";
    container.appendChild(exploreCard);
  }

  /* ---------- Booking form destination select ---------- */
  function renderBookingSelect(select) {
    if (!select || !window.DESTINATIONS) return;
    var otherOption = select.querySelector('option[value="other"]');

    Array.prototype.slice.call(select.options).forEach(function (opt) {
      if (opt.value && opt.value !== "other") select.removeChild(opt);
    });

    window.DESTINATIONS.forEach(function (dest) {
      var opt = document.createElement("option");
      opt.value = dest.id;
      opt.setAttribute("data-i18n", "dest_" + dest.id + "_name");
      opt.textContent = dest.id;
      select.insertBefore(opt, otherOption || null);
    });
  }

  function renderAllBookingSelects() {
    document.querySelectorAll("select.js-destination-select").forEach(renderBookingSelect);
  }

  /* ---------- Single destination detail page (destination.html) ---------- */
  function renderDestinationDetail() {
    var root = document.getElementById("destinationDetail");
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var dest = id ? byId(id) : null;

    if (!dest) {
      root.innerHTML =
        '<div class="container" style="padding-block:80px; text-align:center;">' +
          '<p style="font-size:1.2rem; font-weight:700; color:var(--color-primary-dark);" data-i18n="dest_not_found">Destination not found.</p>' +
          '<a href="destinations.html" class="btn btn-outline" style="margin-top:20px;" data-i18n="back_to_destinations">Back to Destinations</a>' +
        "</div>";
      if (window.SamerI18N) window.SamerI18N.applyLanguage(document.documentElement.getAttribute("lang") || "ar");
      return;
    }

    var attrItems = [1, 2, 3, 4, 5].map(function (n) {
      return '<li class="attraction-item">' + pinIconSvg() + '<span data-i18n="dest_' + dest.id + "_attr_" + n + '">Attraction</span></li>';
    }).join("");

    var hotelsHtml = "";
    if (dest.hotels && dest.hotels.length) {
      hotelsHtml =
        '<div class="hotels-section">' +
          '<div class="attractions-title">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V7a2 2 0 0 1 2-2h4v16M15 21V11a2 2 0 0 1 2-2h4v12M9 21h12M9 21V9M13 9h2M13 13h2M13 17h2"/></svg>' +
            '<span data-i18n="hotels_title">Hotels We\'ve Stayed At</span>' +
          "</div>" +
          '<div class="hotels-grid">' +
          dest.hotels.map(function (h) {
            return '<div class="hotel-card">' +
              '<div class="hotel-name">' + (document.documentElement.getAttribute("lang") === "en" ? h.nameEn : h.nameAr) + "</div>" +
              (h.noteAr || h.noteEn ? '<div class="hotel-note">' + (document.documentElement.getAttribute("lang") === "en" ? (h.noteEn || "") : (h.noteAr || "")) + "</div>" : "") +
              "</div>";
          }).join("") +
          "</div>" +
        "</div>";
    }

    root.innerHTML =
      '<section class="dest-hero" style="--c:' + dest.color + '">' +
        '<img class="dest-hero-img" src="' + dest.heroImage + '" alt="" data-i18n-alt="dest_' + dest.id + '_name">' +
        '<div class="dest-hero-overlay">' +
          '<div class="container">' +
            '<div class="breadcrumb" style="color:rgba(255,255,255,.75);">' +
              '<a href="index.html" style="color:rgba(255,255,255,.9);" data-i18n="nav_home">Home</a><span>/</span>' +
              '<a href="destinations.html" style="color:rgba(255,255,255,.9);" data-i18n="nav_destinations">Destinations</a><span>/</span>' +
              '<span data-i18n="dest_' + dest.id + '_name">Name</span>' +
            "</div>" +
            '<span class="dest-country-badge" data-i18n="dest_' + dest.id + '_country">Country</span>' +
            '<h1 class="dest-hero-title" data-i18n="dest_' + dest.id + '_name">Name</h1>' +
            '<p class="dest-hero-tagline" data-i18n="dest_' + dest.id + '_tagline">Tagline</p>' +
          "</div>" +
        "</div>" +
      "</section>" +
      '<section>' +
        '<div class="container dest-detail-grid">' +
          '<div>' +
            '<p class="dest-detail-desc" data-i18n="dest_' + dest.id + '_desc">Description</p>' +
            '<div class="attractions-title">' + pinIconSvg() + '<span data-i18n="attractions_title">Top attractions</span></div>' +
            '<ul class="attractions-list">' + attrItems + "</ul>" +
            hotelsHtml +
            (dest.credit ? '<p class="photo-credit">' +
              '<span data-i18n="photo_credit_label">Photo:</span> ' +
              '<a href="' + dest.credit.url + '" target="_blank" rel="noopener">' + dest.credit.name + "</a> · " + dest.credit.license +
              " (Wikimedia Commons)</p>" : "") +
          "</div>" +
          '<aside class="dest-detail-side">' +
            '<div class="side-card">' +
              '<div class="side-card-title" data-i18n="dest_detail_cta_title">Ready to go?</div>' +
              '<p class="side-card-text" data-i18n="dest_detail_cta_text">Book this destination and we\'ll get back to you within 2-3 business days.</p>' +
              '<a href="booking.html?dest=' + dest.id + '" class="btn btn-primary btn-block" data-i18n="book_this_destination">Book This Destination</a>' +
              '<a href="destinations.html" class="btn btn-outline btn-block" style="margin-top:10px;" data-i18n="back_to_destinations">Back to Destinations</a>' +
            "</div>" +
          "</aside>" +
        "</div>" +
      "</section>";

    if (window.SamerI18N) window.SamerI18N.applyLanguage(document.documentElement.getAttribute("lang") || "ar");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderDestinationsPage();
    renderFeaturedGrid();
    renderAllBookingSelects();
    renderDestinationDetail();

    var currentLang = document.documentElement.getAttribute("lang") || "ar";
    if (window.SamerI18N) window.SamerI18N.applyLanguage(currentLang);
  });

  window.SamerDestinations = {
    renderAllBookingSelects: renderAllBookingSelects,
    populateSelect: renderBookingSelect,
    byId: byId,
  };
})();
