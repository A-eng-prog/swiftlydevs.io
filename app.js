const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const viewButtons = Array.from(document.querySelectorAll(".view-tab"));
const viewLinks = Array.from(document.querySelectorAll("[data-view-link]"));
const searchInput = document.querySelector("#project-search");
const projectFilters = document.querySelector("#project-filters");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const emptyState = document.querySelector("#empty-state");
const projectsGrid = document.querySelector("#projects");
const catwebPanel = document.querySelector("#catweb");
const catwebGrid = document.querySelector("#catweb-grid");
const catwebEmpty = document.querySelector("#catweb-empty");

let activeView = "projects";
let activeFilter = "all";
let catwebSites = [];

function normalize(value) {
  return value.trim().toLowerCase();
}

function renderCatwebCards(sites) {
  catwebGrid.textContent = "";

  sites.forEach((site) => {
    const card = document.createElement("article");
    card.className = "catweb-card";
    card.dataset.name = `${site.domain} ${site.name} ${site.description} ${site.category} ${(site.tags || []).join(" ")}`;

    const domain = document.createElement("span");
    domain.className = "catweb-domain";
    domain.textContent = site.domain;

    const title = document.createElement("h3");
    title.textContent = site.name;

    const description = document.createElement("p");
    description.textContent = site.description;

    const tags = document.createElement("ul");
    tags.className = "catweb-tags";
    tags.setAttribute("aria-label", `${site.name} tags`);

    [site.category, ...(site.tags || [])].forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tags.append(item);
    });

    const link = document.createElement("a");
    link.className = "catweb-open";
    link.href = `https://${site.domain}/`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open ${site.domain}`);
    link.innerHTML = `
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M15 3h6v6"></path>
        <path d="M10 14 21 3"></path>
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path>
      </svg>
      <span>Open</span>
    `;

    card.append(domain, title, description, tags, link);
    catwebGrid.append(card);
  });
}

function applyFilters() {
  const query = normalize(searchInput.value);

  if (activeView === "projects") {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesQuery = normalize(card.dataset.name).includes(query);
      const isVisible = matchesFilter && matchesQuery;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    emptyState.hidden = visibleCount > 0;
    return;
  }

  let visibleCatwebCount = 0;
  Array.from(catwebGrid.querySelectorAll(".catweb-card")).forEach((card) => {
    const isVisible = normalize(card.dataset.name).includes(query);
    card.hidden = !isVisible;
    if (isVisible) {
      visibleCatwebCount += 1;
    }
  });

  catwebEmpty.hidden = visibleCatwebCount > 0;
}

function setView(view) {
  activeView = view;
  const showProjects = view === "projects";

  searchInput.value = "";
  projectsGrid.hidden = !showProjects;
  emptyState.hidden = true;
  projectFilters.hidden = !showProjects;
  catwebPanel.hidden = showProjects;
  catwebEmpty.hidden = true;
  searchInput.placeholder = showProjects ? "Search projects" : "Search Catweb websites";

  viewButtons.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  applyFilters();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setView(button.dataset.view);
  });
});

viewLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setView(link.dataset.viewLink);
  });
});

if (window.location.hash === "#catweb") {
  setView("catweb");
}

fetch("websites.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load websites.json");
    }
    return response.json();
  })
  .then((sites) => {
    catwebSites = sites;
    renderCatwebCards(catwebSites);
    applyFilters();
  })
  .catch(() => {
    catwebGrid.textContent = "";
    catwebEmpty.textContent = "Could not load Catweb websites.";
    catwebEmpty.hidden = false;
  });
