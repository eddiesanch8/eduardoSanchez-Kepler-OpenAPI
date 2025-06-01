// Copyright Text for Footer

const today = new Date("2025-05-16T10:30:00");
const thisYear = today.getFullYear();

const webFooter = document.querySelector("footer");

//Creating Copyright

const copyright = document.createElement("p");
copyright.className = "copyright";
copyright.innerHTML = ` Eduardo Sanchez ${thisYear} \u00A9 `;
webFooter.appendChild(copyright);

// Fetch API Assignment With Github Projects

// const gitRequest = fetch(`https://api.github.com/users/eddiesanch8/repos`)
//   // Parse data into JSCON, then manipulate data with DOM to include into HTML
//   .then((result) => result.json())
//   .then((data) => {
//     const projectSection = document.getElementById("projects");
//     const projectList = projectSection.querySelector("ul");

//     //iterate over the JSON() data using ForEach instead of [] notation
//     data.forEach((repository) => {
//       //setting up DOM for UL, introducing anchors
//       const project = document.createElement("li");
//       const projectLink = document.createElement("a");

//       // creating links that you can click on for repos
//       projectLink.textContent = repository.name;
//       projectLink.href = repository.html_url;
//       //creating a new tab for clicks
//       projectLink.target = "_blank";

//       // adding link to project
//       project.appendChild(projectLink);

//       // adding repos to the project list li
//       projectList.appendChild(project);
//     });

//     console.log(data);
//   })
//   // Error Catch
//   .catch((error) => {
//     console.error("Uh-oh, error:", error);
//   });

// Import an MD5 library (you can use a library like crypto-js or any other MD5 library)
const md5 = require("crypto-js/md5");

// Your API keys
const publicKey = "555ea106d4dfc95ba198562939ca08d5";
const privateKey = "103bd89d5bd9676fad42f615a98c26f8e418f516";

// Generate a timestamp
const ts = new Date().getTime().toString();

// Create the hash
const hash = md5(ts + privateKey + publicKey).toString();

// Construct the API URL
const apiUrl = fetch(
  `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
)
  .then((result) => result.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
