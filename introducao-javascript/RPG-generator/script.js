const formulario = document.getElementById("formulario");
const adjetivoArray = ["LENDÁRIO", "ABSOLUTO", "EXPLÊNDIDO", "PERSPICAZ"];

formulario.addEventListener('submit', prevenirDefault =>{ prevenirDefault.preventDefault(); });

function criarPersonagem(){

    const nome = document.getElementById("nome").value;
    const classe = document.getElementById("classe").value;
    const habilidade = document.getElementById("habilidade").value;
    const escolhaAleatoria = Math.floor(Math.random() * adjetivoArray.length);
    const adjetivo = adjetivoArray[escolhaAleatoria];

    let frase = `O ${adjetivo} ${classe} chamado ${nome}, conhecido por sua habilidade de ${habilidade} chegou á Taverna!`;

    if (!nome || !classe || !habilidade){
        document.getElementById("resultado").innerHTML = "<h2> Por favor preencha os campos corretamente. </h2>";
        return;
    }

    document.getElementById("resultado").innerHTML = `<h2> ${frase} </h2>`;
}