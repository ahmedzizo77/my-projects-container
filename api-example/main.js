// fetch(
//   "https://api.currencyfreaks.com/latest?apikey=2e2e95e9cf68497c8f5e570397a01551"
// )
//   .then((result) => result.json())
//   .then((data) => {
//     let amount = document.querySelector(".amount span");
//     let egy = document.querySelector(".egp span");
//     let sar = document.querySelector(".sar span");
//     egy.innerHTML = Math.round(amount.innerHTML * data.rates["EGP"]);
//     sar.innerHTML = Math.round(amount.innerHTML * data.rates["SAR"]);
//   });

let theInput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  repoData = document.querySelector(".show-data");
getButton.addEventListener("click", () => {
  getRepos();
});
//function get repos
function getRepos() {
  if (theInput.value == "") {
    repoData.innerHTML = "<span>please write GitHup user name</span>";
  } else {
    const userName = theInput.value.trim();
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((result) => result.json())
      .then((data) => {
        repoData.innerHTML = "";
        data.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(` ${repo.name} `);
          let uRl = document.createElement("a");
          let urlText = document.createTextNode(" visit ");
          uRl.append(urlText);
          uRl.href = `https://www.github.com/${userName}/${repo.name}`;
          uRl.setAttribute("target", "_blank");
          let countStars = document.createElement("span");
          let starText = document.createTextNode(
            `stars count is ${repo.stargazers_count}`
          );
          countStars.append(starText);
          mainDiv.className = "repo-box";
          mainDiv.append(repoName, uRl, countStars);
          repoData.append(mainDiv);
        });
      });
  }
}
