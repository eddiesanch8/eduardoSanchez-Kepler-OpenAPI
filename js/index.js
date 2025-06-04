// Copyright footer per Marvel Policy

const copyDate = 2014;
const marvelFooter = document.querySelector("footer");

//
const marvelCopy = document.createElement("p");
marvelCopy.className = "marvelCopyright";
marvelCopy.innerHTML = `<a href="http://marvel.com"> Data provided by Marvel</a>. ${copyDate} \u00A9 Marvel`;
marvelFooter.appendChild(marvelCopy);

// Importing an MD5 library (you can use a library like crypto-js or any other MD5 library)
const md5 = require("crypto-js/md5");

// keys
const publicKey = "555ea106d4dfc95ba198562939ca08d5";
const privateKey = "103bd89d5bd9676fad42f615a98c26f8e418f516";

// Create Timestamp:

const ts = new Date().getTime().toString();

//Create a hash:
const hash = md5(ts + privateKey + publicKey).toString();

// list of heroes to pair up against
const topHeroes = ["Spider-Man (Ultimate)", "Wolverine", "Storm"];

// // Creating API and Fetching Data

fetch(
  `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
)
  .then((result) => result.json())
  .then((data) => {
    const comicImages = data.data.results;
    const listedHeroes = document.querySelector("#topHeroes ul");
    // Set to check for unused comics
    const usedComicIds = new Set();

    topHeroes.forEach((hero) => {
      for (let comic of comicImages) {
        const characterNames = comic.characters.items.map((char) => char.name);

        // filters out for possible matches of top hero names and if comic has been unused
        if (
          !usedComicIds.has(comic.id) &&
          characterNames.some((name) => name.includes(hero))
        ) {
          const imgUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
          // Created listed item within empty HTML
          const listedElement = document.createElement("li");

          //button creation for second API fetch
          const button = document.createElement("button");
          button.textContent = `Get Bio for ${hero}`;
          button.className = "bioButton";
          button.addEventListener("click", () => fetchBio(hero));

          listedElement.innerHTML = `
            <img src="${imgUrl}" alt="comic cover featuring: ${hero}">
            <p>${hero}</p>
          `;
          listedElement.appendChild(button);
          listedHeroes.appendChild(listedElement);
          //adds to #of used comics, unique images loaded
          usedComicIds.add(comic.id);
          // breaks out of loop to prevent extra comics
          break;
        }
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Bio portion, second API Fetch

const heroSection = document.getElementById("topHeroes");
const charBio = document.getElementById("heroBio");

// Define the async function
async function fetchBio(hero) {
  //start with empty bio
  charBio.innerHTML = "";

  // create proper api request using the relevant character
  const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(
    hero
  )}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  //fetch url, parse as JSON
  try {
    const response = await fetch(url);
    const data = await response.json();

    const character = data.data.results.find((c) => c.name === hero);

    //Error handling in case of character not being available
    if (!character) {
      charBio.innerHTML = "<p>Character not found.</p>";
      return;
    }

    const bioSection = document.createElement("section");
    // adds thumbnail picture
    bioSection.innerHTML = `
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" 
           alt="${character.name}" 
           style="max-width:300px; display:block;" />
      <p><strong>${character.name}</strong>: ${
      character.description || "No bio available."
    }</p>
      <a href="http://marvel.com">More on Marvel.com</a>
    `;
    // also adds link to marvel.
    charBio.appendChild(bioSection);
    clearButton.style.display = "block";
  } catch (error) {
    console.error("Error fetching character bio:", error);
    charBio.innerHTML = "<p>Error loading bio. Please try again later.</p>";
  }
}

//clear button created to clean up website

const clearButton = document.createElement("button");

clearButton.textContent = "Clear Bio";
clearButton.className = "clearButton";
clearButton.style.display = "none";
clearButton.addEventListener("click", () => {
  charBio.innerHTML = "";
  clearButton.style.display = "none";
});

heroSection.appendChild(clearButton);
