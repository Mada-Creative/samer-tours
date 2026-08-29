/* =========================================================
   Samer Tours — destination metadata + icon library
   The actual text (name, tagline, description, attractions) lives
   in assets/js/i18n.js under keys `dest_<id>_*` — this file only
   holds structural data: which destinations exist, what region
   they belong to, their accent color, hero photo, map position,
   and (optionally) hotels Samer has personally stayed at.

   To add a destination:
   1. Add its dest_<id>_* keys (ar + en) to i18n.js
   2. Add one entry to DESTINATIONS below
   3. Add its id to the right group in DESTINATION_REGIONS

   To add hotels for a destination (optional — leave the array empty
   until Samer provides real ones), fill in its `hotels` array:
     hotels: [
       { nameAr: "اسم الفندق", nameEn: "Hotel Name",
         noteAr: "ملاحظة قصيرة", noteEn: "short note" }
     ]
   Empty arrays simply hide the "Hotels we've stayed at" section on
   that destination's page — nothing shows until real data is added.
   ========================================================= */

window.DESTINATIONS = [
  { id: "madrid", color: "#C1622D", icon: "dome", lat: 40.4, lon: -3.7,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Puerta_del_Sol_%28Madrid%29_10.jpg/1280px-Puerta_del_Sol_%28Madrid%29_10.jpg",
    credit: { name: "Tomás Fano", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Puerta_del_Sol_(Madrid)_10.jpg" },
    hotels: [] },
  { id: "valencia", color: "#D99A2B", icon: "arch", lat: 39.5, lon: -0.4,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/El_Hemisf%C3%A9rico%2C_Ciudad_de_las_Artes_y_las_Ciencias%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_71.JPG/1280px-El_Hemisf%C3%A9rico%2C_Ciudad_de_las_Artes_y_las_Ciencias%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_71.JPG",
    credit: { name: "Diego Delso", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:El_Hemisf%C3%A9rico,_Ciudad_de_las_Artes_y_las_Ciencias,_Valencia,_Espa%C3%B1a,_2014-06-29,_DD_71.JPG" },
    hotels: [] },
  { id: "milano", color: "#7A4B5C", icon: "spires", lat: 45.5, lon: 9.2,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Milan_Cathedral_from_Piazza_del_Duomo.jpg/1280px-Milan_Cathedral_from_Piazza_del_Duomo.jpg",
    credit: { name: "Jiuguang Wang", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Milan_Cathedral_from_Piazza_del_Duomo.jpg" },
    hotels: [] },
  { id: "madeira", color: "#2E7D6B", icon: "coast", lat: 32.6, lon: -16.9,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Funchal%2C_Jardins_da_Quinta_Vigia_%28lookout%29.jpg/1280px-Funchal%2C_Jardins_da_Quinta_Vigia_%28lookout%29.jpg",
    credit: { name: "Dr. Thomas Liptak", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Funchal,_Jardins_da_Quinta_Vigia_(lookout).jpg" },
    hotels: [] },

  { id: "metz", color: "#6B5B95", icon: "spires", lat: 49.1, lon: 6.2,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Metz_%28Moselle%29_-_Cath%C3%A9drale_Saint-%C3%89tienne_%2832283913217%29.jpg/1280px-Metz_%28Moselle%29_-_Cath%C3%A9drale_Saint-%C3%89tienne_%2832283913217%29.jpg",
    credit: { name: "Patrick (Compiègne, France)", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Metz_(Moselle)_-_Cath%C3%A9drale_Saint-%C3%89tienne_(32283913217).jpg" },
    hotels: [] },
  { id: "brussels", color: "#4C6B8A", icon: "atomium", lat: 50.8, lon: 4.3,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Grand-Place%2C_Brussels_-_panorama%2C_June_2018.jpg/1280px-Grand-Place%2C_Brussels_-_panorama%2C_June_2018.jpg",
    credit: { name: "Celuici", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Grand-Place,_Brussels_-_panorama,_June_2018.jpg" },
    hotels: [] },
  { id: "luxembourg", color: "#5B7A6E", icon: "castle", lat: 49.6, lon: 6.1,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Luxembourg_Grand_Ducal_Palace_01.jpg/1280px-Luxembourg_Grand_Ducal_Palace_01.jpg",
    credit: { name: "Cayambe", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Luxembourg_Grand_Ducal_Palace_01.jpg" },
    hotels: [] },
  { id: "amsterdam", color: "#2C6E8E", icon: "canal", lat: 52.4, lon: 4.9,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/South_facade_of_the_Rijksmuseum_Amsterdam_%28DSCF0528%29.jpg/1280px-South_facade_of_the_Rijksmuseum_Amsterdam_%28DSCF0528%29.jpg",
    credit: { name: "Trougnouf (Benoit Brummer)", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:South_facade_of_the_Rijksmuseum_Amsterdam_(DSCF0528).jpg" },
    hotels: [] },

  { id: "dortmund", color: "#A2542E", icon: "skyline", lat: 51.5, lon: 7.5,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Signal_iduna_park_stadium_dortmund_4.jpg/1280px-Signal_iduna_park_stadium_dortmund_4.jpg",
    credit: { name: "Arne Müseler", license: "CC BY-SA 3.0 DE", url: "https://commons.wikimedia.org/wiki/File:Signal_iduna_park_stadium_dortmund_4.jpg" },
    hotels: [] },
  { id: "munich", color: "#8A5A44", icon: "twindome", lat: 48.1, lon: 11.6,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Rathaus_and_Marienplatz_from_Peterskirche_-_August_2006.jpg/1280px-Rathaus_and_Marienplatz_from_Peterskirche_-_August_2006.jpg",
    credit: { name: "Diliff", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Rathaus_and_Marienplatz_from_Peterskirche_-_August_2006.jpg" },
    hotels: [] },
  { id: "hallstatt", color: "#3C6E71", icon: "mountains", lat: 47.6, lon: 13.6,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Hallstatt_-_Zentrum_.JPG/1280px-Hallstatt_-_Zentrum_.JPG",
    credit: { name: "C.Stadler/Bwag", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Hallstatt_-_Zentrum_.JPG" },
    hotels: [] },
  { id: "vienna", color: "#7A5C8E", icon: "dome", lat: 48.2, lon: 16.4,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Wien_-_Schloss_Sch%C3%B6nbrunn.JPG/1280px-Wien_-_Schloss_Sch%C3%B6nbrunn.JPG",
    credit: { name: "C.Stadler/Bwag", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Wien_-_Schloss_Sch%C3%B6nbrunn.JPG" },
    hotels: [] },
  { id: "innsbruck", color: "#4E7A8C", icon: "mountains", lat: 47.3, lon: 11.4,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/2/26/IA_GoldenesDachl-A.jpg",
    credit: { name: "Bbb", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:IA_GoldenesDachl-A.jpg" },
    hotels: [] },

  { id: "edinburgh", color: "#4A5D6B", icon: "castle", lat: 55.95, lon: -3.2,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/City_of_Edinburgh_-_Edinburgh_Castle_-_20140421004403.jpg/1280px-City_of_Edinburgh_-_Edinburgh_Castle_-_20140421004403.jpg",
    credit: { name: "Enric", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:City_of_Edinburgh_-_Edinburgh_Castle_-_20140421004403.jpg" },
    hotels: [] },
  { id: "wales", color: "#5F7A5A", icon: "castle", lat: 53.3, lon: -3.8,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Conwy_Castle%2C_water_view1.jpg/1280px-Conwy_Castle%2C_water_view1.jpg",
    credit: { name: "Andrew Woodvine", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Conwy_Castle,_water_view1.jpg" },
    hotels: [] },
  { id: "bath", color: "#B08A5A", icon: "crescent", lat: 51.4, lon: -2.4,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Roman_Baths_in_Bath_Spa%2C_England_-_July_2006.jpg/1280px-Roman_Baths_in_Bath_Spa%2C_England_-_July_2006.jpg",
    credit: { name: "Diliff", license: "CC BY 2.5", url: "https://commons.wikimedia.org/wiki/File:Roman_Baths_in_Bath_Spa,_England_-_July_2006.jpg" },
    hotels: [] },

  { id: "oslo", color: "#3D5A73", icon: "angular", lat: 59.9, lon: 10.7,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Oslo_Opera_House_-_2025.jpg/1280px-Oslo_Opera_House_-_2025.jpg",
    credit: { name: "Pierre Blaché", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Oslo_Opera_House_-_2025.jpg" },
    hotels: [] },
  { id: "longyearbyen", color: "#46708C", icon: "arctic", lat: 78.2, lon: 15.6,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Longyearbyen-spisshus-2022.jpg/1280px-Longyearbyen-spisshus-2022.jpg",
    credit: { name: "Bjørn Christian Tørrissen", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Longyearbyen-spisshus-2022.jpg" },
    hotels: [] },
  { id: "copenhagen", color: "#C9714E", icon: "canal", lat: 55.7, lon: 12.6,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/The_Nyhavn_Canal_3.jpg/1280px-The_Nyhavn_Canal_3.jpg",
    credit: { name: "European Commission", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:The_Nyhavn_Canal_3.jpg" },
    hotels: [] },

  { id: "tallinn", color: "#5A7A6E", icon: "castle", lat: 59.4, lon: 24.7,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Raekoja_plats_at_night.jpg/1280px-Raekoja_plats_at_night.jpg",
    credit: { name: "Jorge Franganillo", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Raekoja_plats_at_night.jpg" },
    hotels: [] },
  { id: "krakow", color: "#8C6142", icon: "castle", lat: 50.1, lon: 19.9,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wawel_%284%29.jpg/1280px-Wawel_%284%29.jpg",
    credit: { name: "Monika Towiańska", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Wawel_(4).jpg" },
    hotels: [] },
  { id: "zakopane", color: "#4A6E5C", icon: "mountains", lat: 49.3, lon: 19.9,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Zakopane_T58.jpg/1280px-Zakopane_T58.jpg",
    credit: { name: "Jerzy Opioła", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Zakopane_T58.jpg" },
    hotels: [] },
  { id: "budapest", color: "#A25B4B", icon: "dome", lat: 47.5, lon: 19.0,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg/1280px-Hungarian_Parliament_Building_from_across_the_Danube%2C_2025-01-11.jpg",
    credit: { name: "Kilyann Le Hen", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Hungarian_Parliament_Building_from_across_the_Danube,_2025-01-11.jpg" },
    hotels: [] },

  { id: "dubai", color: "#C9A24B", icon: "obelisk", lat: 25.2, lon: 55.3,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg/1280px-Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg",
    credit: { name: "imran shahabuddin", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Burj_Khalifa_(worlds_tallest_building)_and_the_Dubai_skyline_(25781049892).jpg" },
    hotels: [] },
  { id: "abudhabi", color: "#3D8B8B", icon: "domecluster", lat: 24.5, lon: 54.4,
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sheikh_Zayed_Grand_Mosque_%40_Abu_Dhabi_%2815856602738%29.jpg/1280px-Sheikh_Zayed_Grand_Mosque_%40_Abu_Dhabi_%2815856602738%29.jpg",
    credit: { name: "Guilhem Vellut", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Sheikh_Zayed_Grand_Mosque_@_Abu_Dhabi_(15856602738).jpg" },
    hotels: [] },
];

window.DESTINATION_REGIONS = [
  { id: "southern_europe", destIds: ["madrid", "valencia", "milano", "madeira"] },
  { id: "france_benelux", destIds: ["metz", "brussels", "luxembourg", "amsterdam"] },
  { id: "germany_austria", destIds: ["dortmund", "munich", "hallstatt", "vienna", "innsbruck"] },
  { id: "uk", destIds: ["edinburgh", "wales", "bath"] },
  { id: "scandinavia_arctic", destIds: ["oslo", "longyearbyen", "copenhagen"] },
  { id: "eastern_europe_baltics", destIds: ["tallinn", "krakow", "zakopane", "budapest"] },
  { id: "middle_east", destIds: ["dubai", "abudhabi"] },
];

/* Reusable line-icon library (used as a small decorative accent, e.g.
   on the detail page hero). Each value is the INNER markup of an
   <svg viewBox="0 0 120 80" fill="none" stroke="currentColor"
   stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
   Icons are intentionally abstract/illustrative, not literal. */
window.DESTINATION_ICONS = {
  dome: '<path d="M25 70H95M35 70V42H85V70M35 42A25 25 0 0 1 85 42M60 17V42M60 17L72 22L60 27"/>',

  arch: '<circle cx="24" cy="20" r="9"/><path d="M24 6V2M12 20H8M40 20H36M15 10l-3-3M33 10l3-3"/><path d="M15 66Q60 14 105 66"/><path d="M22 66Q60 32 98 66"/><path d="M8 70H112"/>',

  spires: '<path d="M15 70H105M20 70V50L26 38L32 50V70M45 70V40L53 22L61 40V70M75 70V52L81 42L87 52V70"/>',

  canal: '<path d="M15 70V50L22 38L29 50V70M35 70V48H41V44H47V40H53V70M58 70V48Q65 38 72 48V70"/><path d="M10 74Q60 62 110 74"/>',

  angular: '<path d="M15 65L45 40L60 55L90 30L110 55"/><path d="M10 72Q30 65 50 72Q70 79 90 72Q100 68 110 72"/>',

  mountains: '<path d="M10 70L35 32L50 52L72 22L96 52L110 70"/><path d="M8 74H112"/>',

  castle: '<path d="M15 70H105"/><path d="M25 70V45H40V70"/><path d="M25 45H28V41H31V45H34V41H37V45H40"/><path d="M70 70V35H90V70"/><path d="M70 35H73V31H76V35H79V31H82V35H85V31H88V35H90"/><path d="M40 60H70"/>',

  atomium: '<circle cx="60" cy="22" r="8"/><circle cx="38" cy="50" r="8"/><circle cx="82" cy="50" r="8"/><circle cx="60" cy="70" r="6"/><path d="M60 30L38 42M60 30L82 42M45 55L55 65M75 55L65 65"/><path d="M18 74H102"/>',

  obelisk: '<path d="M35 70H85M40 70V56H80V70M46 56V44H74V56M52 44V30H68V44M56 30V16H64V30M60 16V6"/>',

  twindome: '<path d="M35 70V40H45V70M35 40Q40 24 45 40M40 24V13"/><path d="M65 70V40H75V70M65 40Q70 24 75 40M70 24V13"/><path d="M18 70H102"/>',

  coast: '<circle cx="90" cy="20" r="7"/><path d="M90 9V5M90 35V31M77 20H73M107 20H103M81 11L78 8M99 11L102 8M81 29L78 32M99 29L102 32"/><path d="M5 58Q20 48 35 58T65 58T95 58"/><path d="M5 71Q20 65 35 71T65 71T95 71"/>',

  crescent: '<path d="M10 62Q60 25 110 62"/><path d="M25 50V42M45 34V26M60 28V20M75 34V26M95 50V42"/><path d="M5 68H115"/>',

  arctic: '<path d="M15 68L45 30L60 45L85 22L108 68"/><circle cx="95" cy="45" r="6"/><path d="M8 74Q30 68 50 74T90 74T112 74"/>',

  domecluster: '<path d="M10 70H110"/><path d="M35 70Q40 56 45 70M50 70Q55 56 60 70M65 70Q70 56 75 70"/><path d="M18 70V30M15 30H21M92 70V30M89 30H95"/>',

  skyline: '<path d="M15 70H105M22 70V50H32V70M40 70V38H50V70M58 70V54H68V70M76 70V44H86V70M94 70V58H104V70"/>',
};
