const apiKeyValue = "YOUR_API_KEY_HERE";

let blogContainer = document.querySelector(".container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKeyValue}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("error fetching news ", error);
    return [];
  }
}
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query != "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("error fetching query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKeyValue}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("error fetching query news ", error);
    return [];
  }
}
function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((element) => {
    const blogs = document.createElement("div");
    blogs.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = element.urlToImage;
    img.alt = element.title;
    const title = document.createElement("h2");
    const truncateTitle =
      element.title.length > 30
        ? element.title.slice(0, 30) + "...."
        : element.title;
    title.textContent = truncateTitle;
    const desc = document.createElement("p");
    const truncateDesc =
      element.description.length > 120
        ? element.description.slice(0, 120) + "......"
        : element.description;
    desc.textContent = truncateDesc;
    blogs.append(img, title, desc);
    blogs.addEventListener("click", () => {
      window.open(element.url, "_blank");
    });
    blogContainer.appendChild(blogs);
  });
}

(async () => {
  try {
    const articles = await fetchNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("error fetching news ", error);
  }
})();
