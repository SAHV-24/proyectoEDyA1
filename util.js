let button = document.getElementById("asd");
let input = document.getElementById("Entrada");
let results = document.getElementById("scoreboard");

function compare(a, b) {
  // Comparar los problemas
  if (a[1] > b[1]) return -1;
  if (a[1] < b[1]) return 1;
  else {
    // Si los problemas son iguales:
    if (a[2] > b[2]) return 1;
    if (a[2] < b[2]) return -1;
    else {
      if (a[0] < b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    }
  }
}

button.addEventListener("click", function () {
  calcularScoreBoard(input);
});

function calcularScoreBoard(caso) {
  caso = caso.value.split(";").map((x) => x.trim().split(" "));
  let arr = [];

  //Busca entre los 100 equipos
  for (let j = 1; j <= 100; j++) {
    // Filtra todos los arreglos que sean del equipo J
    let FilteredArray = caso.filter((x) => x[0] === `Team${j}`);

    let totalProblems = 0;
    let totalTime = 0;

    if (FilteredArray.length > 0) {
      for (let i = 1; i < 10; i++) {
        let problemas = FilteredArray.filter((x) => x[1] == i); // Filtrar los X que tengan ese problema

        if (problemas.length > 0) {
          let band = 0;
          let incorrects = 0; // respuestas incorrectas
          let correctTime = 0; // tiempo de la respuesta correcta
          problemas.forEach((x) => {
            if (x[3].toLowerCase() == "i" && band == 0) {
              incorrects++;
            }
            if (x[3].toLowerCase() == "c" && band == 0) {
              band = 1;
              correctTime = parseInt(x[2]);
              totalProblems++;
            }
          });
          if (correctTime != 0) {
            totalTime += incorrects * 20 + correctTime;
          }
        }
      }
      if (totalTime > 0) {
        arr.push([`Team${j}`, totalProblems, totalTime]);
      }
    }
  }
  let scoreboard = "";
  arr.sort(compare).forEach((x) => (scoreboard += x + "\n"));
  results.textContent = scoreboard;
}
