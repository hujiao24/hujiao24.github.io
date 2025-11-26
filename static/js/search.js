document.addEventListener("DOMContentLoaded", async () => {

  const searchButton = document.querySelector(".search-button"); 
  const searchOverlay = document.querySelector(".search-overlay");
  const searchPopup = document.querySelector(".search-popup");
  const searchInput = document.querySelector("#search-input");
  const resultBox = document.querySelector("#search-results");

  let fuse = null;

  function openSearch() {
    if (searchOverlay && searchPopup) {
      searchOverlay.style.display = "flex";
      searchOverlay.classList.add("show");
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
        resultBox.innerHTML = "";
      }
    }
  }

  async function loadIndex() {
    try {
      const res = await fetch("/index.json");
      const data = await res.json();

      fuse = new Fuse(data, {
        keys: ["title", "summary", "content"],
        includeMatches: true,
        threshold: 0.1,
        ignoreLocation: true,
        useExtendedSearch: true
      });
      console.log("搜索索引加载完成，共 " + data.length + " 篇文章");
    } catch (err) {
      console.error("搜索索引加载失败:", err);
    }
  }

  function doSearch(keyword) {
    if (!keyword.trim()) {
      resultBox.innerHTML = "";
      return;
    }

    const candidates  = fuse.search(keyword);
    const results = candidates.filter(r => {
        const t = (r.item.title || "").toLowerCase();
        const s = (r.item.summary || "").toLowerCase();
        const c = (r.item.content || "").toLowerCase();
        return t.includes(keyword) || s.includes(keyword) || c.includes(keyword);
    });

    if (results.length === 0) {
      resultBox.innerHTML = "<p>无搜索结果</p>";
      return;
    }

    let html = "";
    console.log("keyword:", keyword, "results:", results.length);
    results.forEach((r) => {
      html += `
        <div class="search-item">
            <h4><a href="${r.item.url}">${r.item.title}</a></h4>
            <p>${r.item.summary}</p>
        </div>`;
    });

    resultBox.innerHTML = html;
  }

  window.closeSearch = function () {
    if (searchOverlay) {
      searchOverlay.classList.remove("show");
      setTimeout(() => {
        searchOverlay.style.display = "none";
      }, 100);
      if (searchInput) searchInput.value = "";
      if (resultBox) resultBox.innerHTML = "";
    }
  };

  window.performSearch = function () {
    doSearch(searchInput.value);
  };

  await loadIndex();

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      doSearch(searchInput.value);
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        doSearch(searchInput.value);
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (searchOverlay.style.display === "flex") {
        closeSearch();
      } else {
        openSearch();
      }
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  if (searchPopup) {
    searchPopup.addEventListener("click", (e) => e.stopPropagation());
  }

  document.addEventListener("keydown", (e) => {
    if (searchOverlay && searchOverlay.style.display === "flex") {
      if (e.key === "Escape") {
        closeSearch();
      }
    }
  });
});
