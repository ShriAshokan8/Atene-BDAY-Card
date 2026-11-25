const dataPromise = fetch("content.json").then(r => r.json());
const chapterList = document.getElementById("chapterList");
const contentsLinks = document.getElementById("contentsLinks");
const modal = document.getElementById("chapterModal");
const modalTitle = document.getElementById("modalTitle");
const modalNumber = document.getElementById("modalNumber");
const modalContent = document.getElementById("modalContent");
let chapters = [];
let activeChapter = 0;

function makeChapter(index) {
  const item = chapters[index];
  activeChapter = index;
  modalNumber.textContent = `CHAPTER ${String(index + 1).padStart(2, "0")} OF ${String(chapters.length).padStart(2, "0")}`;
  modalTitle.textContent = item.title;
  modalContent.innerHTML = "";
  item.paragraphs.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    modalContent.appendChild(p);
  });
  if (item.list && item.list.length) {
    const ul = document.createElement("ul");
    item.list.forEach(line => {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    });
    modalContent.appendChild(ul);
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("nextChapter").textContent = index === chapters.length - 1 ? "BACK TO THE PAGE ↑" : "NEXT CHAPTER →";
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
dataPromise.then(data => {
  chapters = data.sections;
  chapters.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "chapter-item";
    button.type = "button";
    button.innerHTML = `<span class="chapter-index">${String(index + 1).padStart(2, "0")}</span><span class="chapter-name"></span><span class="chapter-arrow">↗</span>`;
    button.querySelector(".chapter-name").textContent = item.title;
    button.addEventListener("click", () => makeChapter(index));
    chapterList.appendChild(button);

    const link = document.createElement("a");
    link.className = "contents-link";
    link.href = "#chapters";
    link.textContent = `${String(index + 1).padStart(2, "0")}  ${item.title}`;
    link.addEventListener("click", event => {
      event.preventDefault();
      document.getElementById("contentsPanel").classList.remove("open");
      makeChapter(index);
    });
    contentsLinks.appendChild(link);
  });
  data.ps.forEach(([label, text]) => {
    const item = document.createElement("div");
    item.className = "ps-item";
    const strong = document.createElement("strong");
    strong.textContent = label;
    const p = document.createElement("p");
    p.textContent = text;
    item.append(strong, p);
    document.getElementById("psContent").appendChild(item);
  });
});
document.getElementById("beginButton").addEventListener("click", () => document.querySelector(".timeline-section").scrollIntoView({behavior:"smooth"}));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.getElementById("nextChapter").addEventListener("click", () => {
  if (activeChapter < chapters.length - 1) makeChapter(activeChapter + 1);
  else closeModal();
});
const panel = document.getElementById("contentsPanel");
document.getElementById("menuToggle").addEventListener("click", () => {panel.classList.add("open");panel.setAttribute("aria-hidden","false");});
document.getElementById("contentsClose").addEventListener("click", () => {panel.classList.remove("open");panel.setAttribute("aria-hidden","true");});
document.querySelectorAll("[data-menu-close]").forEach(el => el.addEventListener("click", () => panel.classList.remove("open")));
const letterModal = document.getElementById("letterModal");
document.getElementById("letterButton").addEventListener("click", () => {letterModal.classList.add("open");letterModal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";});
function closeLetter(){letterModal.classList.remove("open");letterModal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.getElementById("letterClose").addEventListener("click", closeLetter);
document.querySelectorAll("[data-letter-close]").forEach(el => el.addEventListener("click", closeLetter));
document.addEventListener("keydown", event => {if(event.key==="Escape"){closeModal();closeLetter();panel.classList.remove("open");document.body.style.overflow="";}});
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
let musicOn = false;

function updateMusicControl(isPlaying) {
  musicOn = isPlaying;
  musicToggle.innerHTML = isPlaying ? "♫ <span>Music on</span>" : "♫ <span>Music off</span>";
  musicToggle.setAttribute("aria-label", isPlaying ? "Stop music" : "Start music");
}

async function startMusic() {
  try {
    await music.play();
    updateMusicControl(true);
  } catch {
    updateMusicControl(false);
    musicToggle.innerHTML = "♫ <span>Tap for music</span>";
    musicToggle.setAttribute("aria-label", "Start music");
  }
}

musicToggle.addEventListener("click", async () => {
  if (musicOn && !music.paused) {
    music.pause();
    updateMusicControl(false);
  } else {
    await startMusic();
  }
});

music.addEventListener("ended", () => updateMusicControl(false));

const accessForm = document.getElementById("accessForm");
const accessPassword = document.getElementById("accessPassword");
const gateError = document.getElementById("gateError");
accessForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (accessPassword.value === "AteneDaGoat129!.*") {
    document.body.classList.remove("locked");
    document.getElementById("accessGate").remove();
    await startMusic();
  } else {
    gateError.textContent = "Nopeee, try againnnn.";
    accessPassword.value = "";
    accessPassword.focus();
  }
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
}), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
