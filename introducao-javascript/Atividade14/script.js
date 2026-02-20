function calcularAumento(){
    const salario = Number(document.getElementById("salario").value);
    const cargo = document.getElementById("cargo").value;
    const faltas = Number(document.getElementById("faltas").value);
    const atrasos = Number(document.getElementById("atrasos").value);
    const resultado = document.getElementById("resultado");
    var novoSalario = 0;

    if (!salario || !cargo || !faltas || !atrasos){
        resultado.innerHTML = "Preencha os campos corretamente.";
    } else {
        if (faltas === 0 && atrasos === 0){
            switch(cargo){
                case "aprendiz": novoSalario = salario; break;
                case "analista": novoSalario = salario + salario * 0.1; break;
                case "gerente": novoSalario = salario + salario * 0.15; break;
                case "diretor": novoSalario = salario + salario * 0.20; break;
            }

            if(novoSalario == salario){
                resultado.innerHTML = `<p>Você ainda é um ${cargo}, então infelizmente não tem bonificação.</p>`
            } else {
                resultado.innerHTML = `<p>Como você é um ${cargo}, seu novo salário é ${novoSalario.toFixed(2)}.</p>`;
            }
        } else {
            resultado.innerHTML = `<p>O funcionário em questão tem ${faltas} faltas e ${atrasos} atrasos, então não pode ser bonificado. Favor procurar o RH.</p>`
        }
    }
}