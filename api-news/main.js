const apiKeyValue = "enter your api key";

let blogContainer = document.querySelector(".container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKeyValue}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("error fetching news", error);
    return [];
  }
}
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query != "") {
    try {
      const articles = await fetchNewQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("error", error);
    }
  }
});
async function fetchNewQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKeyValue}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("error fetching query", error);
    return [];
  }
}
function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((element) => {
    const blogs = document.createElement("div");
    blogs.classList.add("blog-card");
    const image = document.createElement("img");
    image.src = element.urlToImage;
    image.alt = element.title;
    const title = document.createElement("h2");
    const truncateTitle =
      element.title.length > 30
        ? element.title.slice(0, 30) + "...."
        : element.title;
    title.textContent = truncateTitle;

    const description = document.createElement("p");
    truncateDescription =
      element.description.length > 100
        ? element.description.slice(0, 100) + "...."
        : element.description;
    description.textContent = truncateDescription;
    blogs.append(image, title, description);
    blogContainer.appendChild(blogs);
    blogs.addEventListener("click", () => {
      window.open(element.url, "_blank");
    });
  });
}
//IIFE   Immediately Invoked Function Expression
//expression in parentheies ()run the function immediately
(async () => {
  try {
    const allArticles = await fetchRandomNews();
    displayBlogs(allArticles);
  } catch (error) {
    console.error("error fetching news", error);
  }
})();
