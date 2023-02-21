// AjutorLaCodePentruPrietenPentruAlexandra

// În primul rând trebuie scris scriptul de JS înainte de a crea obiectele de suprafață,
// ca codul care vine folosit să fie deja cunoscut la browser.
function askTheEightBall() { // Asta crează o functie care o executăm când apăsăm pe buton.
  const userQuestion = "Will I get a job soon?"; // Rândul ăsta și următorul se pot scoate că nu au influență
  // la suprafață ci doar în consolă.
  console.log(`I am wondering: ${userQuestion}`); // Când se folosește o variablă în forma de ${variable}
  // trebuie folosit simbolul ` ca și delimitator pentru acel String.

  const randomNumber = Math.floor(Math.random() * 8);
  console.log(randomNumber);

  let eightBall = "";

  switch (randomNumber) {
    case 0:
      eightBall = "It is certain";
      break;
    case 1:
      eightBall = "It is decidedly so";
      break;
    case 2:
      eightBall = "Reply hazy try again";
      break;
    case 3:
      eightBall = "Cannot predict now";
      break;
    case 4:
      eightBall = "Do not count on it";
      break;
    case 5:
      eightBall = "My sources say no";
      break;
    case 6:
      eightBall = "Outlook not so good";
      break;
    default:
      eightBall = "Signs point to yes";
  }

  console.log(eightBall);
  document.getElementById("output").innerText = eightBall; // Aici accesăm dvi-ul în care scoatem răspunsul.
  // "document" se referă la pagina pe care o ai în fața ta în acel moment.
  // Cu "getElementById" accesezi un obiect specific, la care i-ai dat un ID specific.
  // Detalii puțin mai jos la crearea butonului.
  // "innerText" e un atribut care reprezintă conținutul din acel div.
  // Noi aici setăm acel atribut cu răspunsul de la funcție.
  // Prin asta afișăm raspunsul în acel div direct pe pagină.
}
