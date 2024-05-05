// function quickSort(A, p, r, mode) {
//   if (p < r) {
//     let q;
//     if (mode === "ascendente") {
//       q = partition(A, p, r, "ascendente");
//     } else if (mode === "descendente") {
//       q = partition(A, p, r, "descendente");
//     }
//     quickSort(A, p, q - 1, mode);
//     quickSort(A, q + 1, r, mode);
//   }
// }

// function partition(A, p, r, mode) {
//   let pivot;
//   if (mode === "descendente") {
//     pivot = A[r][1];
//   }

//   if (mode === "ascendente") {
//     pivot = A[r][2];
//   }

//   let i = p - 1;
//   let aux;

//   for (let j = p; j <= r - 1; j++) {
//     if (
//       (mode === "ascendente" && A[j][2] < pivot) ||
//       (mode === "descendente" && A[j][1] > pivot)
//     ) {
//       i++;
//       aux = A[j];
//       A[j] = A[i];
//       A[i] = aux;
//     }
//   }

//   aux = A[r];
//   A[r] = A[i + 1];
//   A[i + 1] = aux;
//   return i + 1;
// }



function compare(a, b) {
  // Comparar los problemas
  if (a[1] > b[1]) return -1;
  if (a[1] < b[1]) return 1;
    
  else {
    // Si los problemas son iguales:
    if (a[2] > b[2]) return 1;
    if (a[2] < b[2]) return -1;
    return 0;

  }
}

let caso =
  "Team1 1 5 C;Team2 5 10 C;Team3 2 15 I;Team1 3 20 R;Team2 1 25 R;Team2 4 30 C;Team1 3 35 I;Team1 3 40 C;Team3 2 45 I;Team3 2 50 C;Team5 5 10 C;Team5 9 10 C;Team5 6 900 C";

function calcularScoreBoard(caso) {
  caso = caso.split(";").map((x) => x.trim().split(" "));
  let scoreboard = "";
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
  return arr.sort(compare).map(x=>x+"\n");
}

console.log(calcularScoreBoard(caso));
