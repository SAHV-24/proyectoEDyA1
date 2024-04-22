let button = document.getElementById("asd");
let input = document.getElementById("Entrada");

button.addEventListener("click", function() {
    calcularScoreBoard(input);
});

function calcularScoreBoard(caso){

    caso = caso.value;
    caso = caso.split(";")
    caso=caso.map((x)=>x.split(" "))
    let scoreboard=[]


    //Busca entre los 100 equipos
    for(let j=1;j<=100;j++){

        
            // Filtra todos los arreglos que sean del equipo J
        let FilteredArray = caso.filter(x=>x[0]===`Team${j}`)

        // Si no encontró equipos, entonces no entrar
        if(FilteredArray.length!=0){
        // 10 problemas
        for(let i = 0; i<10; i++){
            //para acumular el tiempo:
            let total = 0;

            //Para filtrar aquellos que no hayan sido completados
            let band=0;
            
            // Filtra todos los arreglos que hayan mandado el problema I
            let provi= FilteredArray.filter(x=>x[1]==i)
            
            // Si no encuentra nada en el arreglo, no entrar, osea, si no han resuelto X problema o no existe ese equipo, entonces omitir
            if (provi.length != 0 && band==0){
            
            provi.forEach((x)=>{
                
                    // Suma cada uno
                    total+=parseInt(x[2])

                    // Si el ejercicio resuelto tiene una I entonces aumentarle 20
                    if (x[3]=="I"){
                        total+=20
                    }

                    // Si está completado el problema, salirse
                    if(x[3]=="C"){
                            band=1;
                    }

            })
            if (band==1){
                // meter los problemas que SI fueron solucionados
                scoreboard.push([provi[0][0],i,total]);
           
                    }
                }     
            }
        }
    }
        // resultados:
        console.log(scoreboard)
    }
        
        
    
    
    // console.log(caso)
    // Team1 1 5 C;Team2 5 10 C;Team3 2 15 I;Team1 3 20 R;Team2 1 25 R;
    // Team2 4 30 C;Team1 3 35 I;Team1 3 40 C;Team3 2 45 I;Team3 2 50 C
