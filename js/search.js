Tabela = {
    "RO":140,
    "AC":145,
    "AM":130,
    "RR":140,
    "PA":145,
    "AP":145,
    "TO":85,
    "MA":145,
    "PI":140,
    "CE":100,
    "RN":140,
    "PB":95,
    "PE":95,
    "AL":90,
    "SE":85,
    "BA":90,
    "MG":80,
    "ES":70,
    "RJ":60,
    "SP":30,
    "PR":40,
    "SC":50,
    "RS":60,
    "MS":60,
    "MT":65,
    "GO":55,
    "DF":55,
    };

//Instanciando o Botão
let btnCEP = document.querySelector('button');

//Obtendo a ação realização no click do botão
btnCEP.addEventListener('click', function () {


    let cep = document.querySelector('#cep').value;
    let api = `https://viacep.com.br/ws/${cep}/json/`;
    let request = new XMLHttpRequest();
    let valor = document.querySelector('#valor').value;

// função para calcular o valor do produto
    function calcula_frete(Estado){

        var porcento = parseInt( Tabela[Estado] );
        var valor_produto = parseInt( valor );
        var frete = (valor_produto * porcento)/100
        var total = parseInt(valor_produto) + parseInt(frete)
        return total
        
    }
    request.open('GET', api);
    request.onload = function () {

        console.dir(JSON.parse(request.responseText));
        console.log(JSON.parse(request.responseText).logradouro);
        console.log(JSON.parse(request.responseText).bairro)

        //Transforma o JSON retornado em um objeto do JavaScript
        let address = JSON.parse(request.responseText);
        //Pega o objeto retorno e adiciona na DIV do HTML
        let street = document.querySelector('#street');
        street.innerHTML = address.logradouro;

        //Pega o UF da api dos correios e adiciona na variavel uf
        let uf = address.uf

        let district = document.querySelector('#district');
        district.innerHTML = address.bairro;

        let city = document.querySelector('#city');
        city.innerHTML = address.localidade;

        //pega a div para escrever e chama a função calcula_frete passando a variavel uf como parametro
        let value = document.querySelector('#value')
        value.innerHTML = "Valor Total: R$" + calcula_frete(uf);
    }

//console.log(cep);
request.send();
})