const champs = document.querySelectorAll(".champ");
// const formulaire = document.querySelector("form");
const button = document.querySelector("#connexion");
let regex = new RegExp();
let message = "";

button.addEventListener("click", (event) => {
  event.preventDefault();
  let nbreChampsError = 0;
  const errorMessage = document.querySelectorAll(".error");
  Object.values(champs).forEach((element) => {
    const idElement = element.getAttribute("id");
    switch (idElement) {
      case "firstName":
        regex = /^\w{5,15}$/;
        message = "Le prénom doit contenir entre 5 et 15";
        break;
      case "lastName":
        regex = /^\w{5,15}$/;
        message = "Le nom doit contenir entre 5 et 15";
        break;
      case "Pseudo":
        regex = /^\w{5,15}$/;
        message = "Le pseudo doit contenir entre 5 et 15";
        break;
      case "email":
        regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
        message = "L'email ne respecte pas le format monAdresse@monDomain.fr";
        break;
      case "motDePasse":
        regex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        message =
          "Le mot de passe doit avoir, au moins 8 caractères, 1 majuscule, 1 spécial, 1 chiffre, 1 minuscule.";
        break;
      case "tel":
        regex = /^\d{10}$/;
        message = "Le numéro doit contenir 10 chiffres";
        break;
    }
    if (!regex.test(element.value)) {
      nbreChampsError++;
      element.classList.add("badInput");
      const errorId = "#" + idElement + "Error";
      document.querySelector(errorId).innerHTML = message;
      return false;
    }
  });
  if (nbreChampsError == 0) {
    alert("J'envoie la requête ...");
    try {
      document.formulaire.submit;
    } catch (error) {
      console.log(error);
    }
  }
});

Object.values(champs).forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.remove("badInput");
    const errorId = "#" + element.getAttribute("id") + "Error";
    document.querySelector(errorId).innerHTML = "";
  });
});

formulaire.addEventListener("submit", function () {
  console.log("Formulaire envoyé !");
});

const mail = document.querySelector("#email");
const mailErreur = document.querySelector("#emailError");

mail.addEventListener("keyup", () => {
  regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (regex.test(mail.value)) {
    mailErreur.innerHTML = "";
    mail.classList.remove("badInput");
  } else {
    mailErreur.innerHTML =
      "L'email ne respecte pas le format monAdresse@monDomain.fr";
    mail.classList.add("badInput");
  }
});

const mdp = document.querySelector("#motDePasse");
const mdpError = document.querySelector("#motDePasseError");
const majusculeRegex = /[A-Z]/;
const minusculeRegex = /[a-z]/;
const numRegex = /[\d]/;
const specialRegex = /[@&]/;
let checkMaj = false;
let checkMin = false;
let checkNum = false;
let checkSpec = false;
let checkLength = false;

mdp.addEventListener("keyup", () => {
  if (checkLength && checkMaj && checkMin && checkNum && checkSpec) {
    mdpError.innerHTML = "";
  } else {
    if (mdpError.innerHTML.search(" mot de passe") == -1) {
      mdpError.innerHTML = "Le mot de passe doir avoir ." + mdpError.innerHTML;
      checkLength = false;
    }
  }
  if (majusculeRegex.test(mdp.value)) {
    mdpError.innerHTML = mdpError.innerHTML.replace(", 1 majuscule", "");
    checkMaj = true;
  } else {
    if (mdpError.innerHTML.search(" 1 majuscule") == -1) {
      mdpError.innerHTML = mdpError.innerHTML.replace(".", ", 1 majuscule.");
      checkMaj = false;
    }
  }
  if (minusculeRegex.test(mdp.value)) {
    mdpError.innerHTML = mdpError.innerHTML.replace(", 1 minuscule", "");
    checkMin = true;
  } else {
    if (mdpError.innerHTML.search(" 1 minuscule") == -1) {
      mdpError.innerHTML = mdpError.innerHTML.replace(".", ", 1 minuscule.");
      checkMin = false;
    }
  }
  if (numRegex.test(mdp.value)) {
    mdpError.innerHTML = mdpError.innerHTML.replace(", 1 chiffre", "");
    checkNum = true;
  } else {
    if (mdpError.innerHTML.search(" 1 chiffre") == -1) {
      mdpError.innerHTML = mdpError.innerHTML.replace(".", ", 1 chiffre.");
      checkNum = false;
    }
  }
  if (specialRegex.test(mdp.value)) {
    mdpError.innerHTML = mdpError.innerHTML.replace(", 1 spécial", "");
    checkSpec = true;
  } else {
    if (mdpError.innerHTML.search(" 1 spécial") == -1) {
      mdpError.innerHTML = mdpError.innerHTML.replace(".", ", 1 spécial.");
      checkSpec = false;
    }
  }
  if (mdp.value.length > 8) {
    mdpError.innerHTML = mdpError.innerHTML.replace(
      ", au moins 8 caractères",
      ""
    );
    checkLength = true;
  } else {
    if (mdpError.innerHTML.search(" moins 8") == -1) {
      mdpError.innerHTML = mdpError.innerHTML.replace(
        ".",
        ", au moins 8 caractères."
      );
      checkLength = false;
    }
  }
});
