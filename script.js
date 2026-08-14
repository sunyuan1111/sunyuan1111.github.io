const awardMarquee = document.querySelector(".award-marquee");

if (awardMarquee) {
  const originalAwards = [...awardMarquee.querySelectorAll(".award-track figure:not([aria-hidden='true'])")];
  const track = document.createElement("div");
  track.className = "award-track";

  originalAwards.forEach((award) => track.append(award));
  originalAwards.forEach((award) => {
    const duplicate = award.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    duplicate.querySelector("a").setAttribute("tabindex", "-1");
    duplicate.querySelector("img").alt = "";
    track.append(duplicate);
  });

  awardMarquee.replaceChildren(track);
}

const translations = [...document.querySelectorAll("[data-zh][data-en]")];
const languageButtons = [...document.querySelectorAll("[data-lang-button]")];
const pageTitles = {
  zh: "孙源 | 具身智能与机器人",
  en: "Yuan Sun | Embodied AI & Robotics",
};

const setLanguage = (language, persist = true) => {
  const nextLanguage = language === "en" ? "en" : "zh";

  document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  document.title = pageTitles[nextLanguage];

  translations.forEach((element) => {
    element.textContent = element.dataset[nextLanguage];
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langButton === nextLanguage));
  });

  if (persist) localStorage.setItem("portfolio-language", nextLanguage);
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langButton));
});

const savedLanguage = localStorage.getItem("portfolio-language");
const browserLanguage = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
setLanguage(savedLanguage || browserLanguage, false);

document.querySelector("[data-current-year]").textContent = new Date().getFullYear();
