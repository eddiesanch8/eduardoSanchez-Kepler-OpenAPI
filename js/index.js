const copyDate = 2014;
const marvelFooter = document.querySelector("footer");

//
const marvelCopy = document.createElement("p");
marvelCopy.className = "marvelCopyright";
marvelCopy.innerHTML = `Data provided by Marvel. ${copyDate} \u00A9 Marvel`;
marvelFooter.appendChild(marvelCopy);

// Import an MD5 library (you can use a library like crypto-js or any other MD5 library)
const md5 = require("crypto-js/md5");

// keys
const publicKey = "555ea106d4dfc95ba198562939ca08d5";
const privateKey = "103bd89d5bd9676fad42f615a98c26f8e418f516";

// Create Timestamp:

const ts = new Date().getTime().toString();

//Create a hash:
const hash = md5(ts + privateKey + publicKey).toString();

// Creating API and Fetching Data
const apiUrl = fetch(
  `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
)
  .then((result) => result.json())
  .then((data) => {
    const listedHereos = document.querySelector("#topHeroes ul");

    data.data.results.forEach((comic) => {
      const listItem = document.createElement("li");
      const comicImage = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
      listItem.innerHTML = `<img srcc=${comicImage} alt="image of">`;
      listedHereos.appendChild(listItem);

      comic.characters.items.forEach((character) => {
        console.log(character.name);
      });
      // End of Loop to add characters to page
    });

    // End of loop
  })

  //End of .then()

  .catch((error) => {
    console.error(error);
  });

// Catch error
