const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif");
            pokeId(null);
            pokeNom("No se encontró ese pokemón");
            pokeStats(null);
            pokeTip(null);
            pokeMoves(null);
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);

            let pokeNam=data.name;
            pokeNom(pokeNam);

            let pokeID=data.id;
            pokeId(pokeID);

            let pokeTipo=data.types[0].type.name;
            pokeTip(pokeTipo);
            
            pokeStats(data);
            pokeMoves(data);

           
          
        }
    });

}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeNom = (name) => {
    const pokeN = document.getElementById("pokeNam");
    pokeN.innerText=name;
}

const pokeId = (id) => {
    const pokeI = document.getElementById("pokeID");
    if(id!=null){    
        if(id.toString().length==1){
            pokeI.innerText="#00"+id;
        }
        else 
        if(id.toString().length==2){
        pokeI.innerText="#0"+id;
        }else
        pokeI.innerText="#"+id;
    } else
      pokeI.innerText="";

}

const pokeTip = (type) => {
    if(type!=null){
        var label="<label>"+"Type: " + type + "<\label>";
        document.getElementById("pokeTipo").innerHTML=label;
    } 
    else
    document.getElementById("pokeTipo").innerHTML="";
}


const pokeStats=(pokeS)=>{
    if(pokeS != null){
        var tabla="<table border=\"5\">";
        tabla+="<caption class=\"font-bold text-xl\">"+ "STATS" + "</caption>";
        for(i=0;i<pokeS.stats.length;i++){
        tabla+="<tr>";
        tabla+="<td>"+ pokeS.stats[i].stat.name + "</td>";
        tabla+="<td>"+ "<progress  max=\"230\" value="+pokeS.stats[i].base_stat+">" +"</progress>" + "</td>";
        tabla+="<td>"+ pokeS.stats[i].base_stat+"%" + "</td>";
        tabla+="</tr>";
        }  
        tabla+="</table>";
        document.getElementById("pokeStats").innerHTML=tabla;
    }  else
    document.getElementById("pokeStats").innerHTML="";
}


const pokeMoves=(pokeM)=>{
    if(pokeM != null){
        var p="<p>";
        var label="<label align=\"center\" class=\"font-bold text-xl\">" + "Moves" + "</label>";
        p+=label + "<br>";
        var tabla="<textarea readonly=\"readonly\" rows=\"13\" cols=\"65\">";
         for(i=0;i<pokeM.moves.length;i++){
            tabla+=(i+1) +".- "+  pokeM.moves[i].move.name+ ",&nbsp;&nbsp;";
        
            if(( (i+1) % 3 ) == 0){
                tabla+="\n";
            }

        }
        
        tabla+="</textarea>";
        p+=tabla;
        p+="</p>";
        document.getElementById("pokeMoves").innerHTML=p;
    }  else
    document.getElementById("pokeMoves").innerHTML="";
}








