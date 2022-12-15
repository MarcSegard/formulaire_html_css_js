const champs = document.querySelectorAll(".champ");
const button = document.querySelector("#connexion");
let nbreChampsError = 0;
let checkElementIsEmpty = new Map();
checkElementIsEmpty.set("firstName", false);
checkElementIsEmpty.set("lastName", false);
checkElementIsEmpty.set("Pseudo", false);
checkElementIsEmpty.set("email", false);
checkElementIsEmpty.set("motDePasse", false);
checkElementIsEmpty.set("tel", false);
const majusculeRegex = /[A-Z]/;
const minusculeRegex = /[a-z]/;
const numRegex = /[\d]/;
const specialRegex = /[@&]/;
let checkMaj = false;
let checkMin = false;
let checkNum = false;
let checkSpec = false;
let checkLength = false;
let infoId = "";
let myMessage = "";
let myRegex = "";

const getMessageRegex = (idElement) => {
  let regex = new RegExp();
  let message = "";
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
      regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      message =
        "Le mot de passe doit avoir, au moins 8 caractères, 1 majuscule, 1 spécial, 1 chiffre, 1 minuscule.";
      break;
    case "tel":
      regex = /^\d{10}$/;
      message = "Le numéro doit contenir 10 chiffres";
      break;
  }
  return [regex, message];
};

const checkAllEmpty = () => {
  let test = true;
  checkElementIsEmpty.forEach((value, key) => {
    if (value == false) {
      test = false;
    }
  });
  return test;
};

Object.values(champs).forEach((element) => {
  element.addEventListener("focusin", () => {
    infoId = element.id + "Info";
    myMessage = getMessageRegex(element.id)[1];
    element.classList.add("badInput");
    document.getElementById(infoId).innerHTML = myMessage;
    document.getElementById(infoId).classList.add("show");
    document.getElementById(infoId).classList.remove("goodInput");
  });

  element.addEventListener("focusout", () => {
    infoId = element.id + "Info";
    element.classList.remove("badInput");
    document.getElementById(infoId).classList.remove("show");
  });

  element.addEventListener("keyup", () => {
    infoId = element.id + "Info";
    let infoBulle = document.getElementById(infoId);
    [myRegex, myMessage] = getMessageRegex(element.id);

    if (element.id == "motDePasse") {
      if (checkLength && checkMaj && checkMin && checkNum && checkSpec) {
        element.classList.add("goodInput");
        infoBulle.classList.remove("show");
        checkElementIsEmpty.set(element.id, true);
      } else {
        if (infoBulle.innerHTML.search(" mot de passe") == -1) {
          infoBulle.innerHTML = "Le mot de passe doir avoir .";
          checkLength = false;
        }
      }
      if (majusculeRegex.test(element.value)) {
        infoBulle.innerHTML = infoBulle.innerHTML.replace(", 1 majuscule", "");
        checkMaj = true;
      } else {
        if (infoBulle.innerHTML.search(" 1 majuscule") == -1) {
          infoBulle.innerHTML = infoBulle.innerHTML.replace(
            ".",
            ", 1 majuscule."
          );
          checkMaj = false;
        }
      }
      if (minusculeRegex.test(element.value)) {
        infoBulle.innerHTML = infoBulle.innerHTML.replace(", 1 minuscule", "");
        checkMin = true;
      } else {
        if (infoBulle.innerHTML.search(" 1 minuscule") == -1) {
          infoBulle.innerHTML = infoBulle.innerHTML.replace(
            ".",
            ", 1 minuscule."
          );
          checkMin = false;
        }
      }

      if (numRegex.test(element.value)) {
        infoBulle.innerHTML = infoBulle.innerHTML.replace(", 1 chiffre", "");
        checkNum = true;
      } else {
        if (infoBulle.innerHTML.search(" 1 chiffre") == -1) {
          infoBulle.innerHTML = infoBulle.innerHTML.replace(
            ".",
            ", 1 chiffre."
          );
          checkNum = false;
        }
      }

      if (specialRegex.test(element.value)) {
        infoBulle.innerHTML = infoBulle.innerHTML.replace(", 1 spécial", "");
        checkSpec = true;
      } else {
        if (infoBulle.innerHTML.search(" 1 spécial") == -1) {
          infoBulle.innerHTML = infoBulle.innerHTML.replace(
            ".",
            ", 1 spécial."
          );
          checkSpec = false;
        }
      }

      if (element.value.length > 8) {
        infoBulle.innerHTML = infoBulle.innerHTML.replace(
          ", au moins 8 caractères",
          ""
        );
        checkLength = true;
      } else {
        if (infoBulle.innerHTML.search(" moins 8") == -1) {
          infoBulle.innerHTML = infoBulle.innerHTML.replace(
            ".",
            ", au moins 8 caractères."
          );
          checkLength = false;
        }
      }
    }

    if (myRegex.test(element.value)) {
      element.classList.add("goodInput");
      document.getElementById(infoId).classList.remove("show");
      checkElementIsEmpty.set(element.id, true);
    } else {
      element.classList.add("badInput");
      element.classList.remove("goodInput");
      document.getElementById(infoId).classList.add("show");
      checkElementIsEmpty.set(element.id, false);
    }

    if (checkAllEmpty() == true) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "");
    }
  });
});
