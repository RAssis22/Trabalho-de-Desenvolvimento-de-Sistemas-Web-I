var valores = [];
var idpessoa = 0;

function novo(){
    var form = document.getElementById("formulario");
    var lista = document.getElementById("lista");

    //mostra o formulário 
    form.style.display = "block";
    //esconde lista 
    lista.style.display = "none";

    //lista os inputs
    id = 0;
    var modelo = document.getElementById("modelo");
    var marca = document.getElementById("marca");
    var ano = document.getElementById("ano");
    var placa = document.getElementById("placa");
    var  cor = document.getElementById("cor");
    modelo.value = "";
    marca.value = "";
    ano.value = "";
    placa.value = "";
    cor.value = "";
    
    //joga o foco no 1º campo:
    modelo.focus();
}

function alterar(i){
    var form = document.getElementById("formulario");
    var lista = document.getElementById("lista");

    //mostra o formulário 
    form.style.display = "block";
    //esconde lista 
    lista.style.display = "none";

    //lista os inputs
    id = valores[i].id;
    var modelo = document.getElementById("modelo");
    var marca = document.getElementById("marca");
    var ano = document.getElementById("ano");
    var placa = document.getElementById("placa");
    var  cor = document.getElementById("cor");
    modelo.value = valores[i].modelo;
    marca.value = valores[i].marca;
    ano.value = valores[i].ano;
   	placa.value = valores[i].placa;
  	cor.value = valores[i].cor;
    
    //joga o foco no 1º campo:
    modelo.focus();
}

function salvar(){
	//valida campos obrigarotios
	if(document.getElementById("modelo").value  == ""){
		alert("campo modelo é obrigaratório!");
		return;
	}
	
    //pega os dados digitados pelo usuário e monta um objeto
    var j = {
		id: id,
		modelo:  document.getElementById("modelo").value,
		marca: document.getElementById("marca").value,
		ano: document.getElementById("ano").value,
		placa: document.getElementById("placa").value,
		cor: document.getElementById("cor").value
	};
   
   	//define se o método sera para inserir ou alterar
   	if (id == 0) {
		   metodo = "POST";
	   } else {
		   metodo = "PUT";
	   }
   
	//envia os dados para o servidor
	mostraLoading("aguarde, salvando dados...")
	fetch("http://localhost:8080/Trabalho_Carros/Carros/",
		{method: metodo,
	    body: JSON.stringify(j)
		}
	).then(resp => resp.json())
	.then(function (Retorno){
		escondeLoading();
		alert(Retorno.mensagem);
		
		var form = document.getElementById("formulario");
    	var lista = document.getElementById("lista");

    	//escondeo o formulário 
    	form.style.display = "none";
    	//mostra a lista 
    	lista.style.display = "block";
    	
    	// recarrega lista
    	listar();
    	
	});
    
}
function excluir(i){
 	id = valores[i].id; 
 
	//envia os dados para o servidor
	mostraLoading("aguarde, excluindo...");
	fetch("http://localhost:8080/Trabalho_Carros/Carros/" + id,
		{method: "DELETE",
		}
	).then(resp => resp.json())
	.then(function (retorno){
		escondeLoading();
		alert(retorno.mensagem);
		
		var form = document.getElementById("formulario");
    	var lista = document.getElementById("lista");

    	//escondeo o formulário 
    	form.style.display = "none";
    	//mostra a lista 
    	lista.style.display = "block";
    	
    	// recarrega lista
    	listar();
    	
	});
    
}

function cancelar(){
    var form = document.getElementById("formulario");
    var lista = document.getElementById("lista");

    //escondeo o formulário 
    form.style.display = "none";
    //mostra a lista 
    lista.style.display = "block";
}

function listar(){
	var lista = document.getElementById("dados");
    //limpa a lista
    lista.innerHTML = "<tr><td colspan>aguarde, carregando...</td></tr>";
	
    fetch ("http://localhost:8080/Trabalho_Carros/Carros/")
    .then(resp => resp.json())
    .then(dados => mostrar(dados));
}

function mostrar(dados){
	valores = dados;
    var lista = document.getElementById("dados");
    //limpa a lista
    lista.innerHTML ="";
    //percoorre a lista 
    for (var i in dados){
        lista.innerHTML += "<tr>"
                        + "<td>" + dados[i].id + "</td>"
                        + "<td>" + dados[i].modelo + "</td>"
                        + "<td>" + dados[i].marca + "</td>"
                        + "<td>" + dados[i].ano + "</td>"
                        + "<td>" + dados[i].placa + "</td>"
                        + "<td>" + dados[i].cor + "</td>"
                        + "<td> <input type='button' value='Alterar' onclick='alterar("+i+")' + <input type='button' value='Excluir' onclick='excluir("+i+")'/></td>"
                        + "<td> <input type='button' value='Excluir' onclick='excluir("+i+")'/>"
                        +"</td>"
                        + "</tr>";
                        
    }
}

function mostraLoading(msg){
	var loa = document.getElementById("loading");
    var con = document.getElementById("conteudo");
    loa.style.display = "block";
	con.style.display = "none";
	loa.innerHTML = msg;
}

function escondeLoading(){
	var loa = document.getElementById("loading");
    var con = document.getElementById("conteudo");
    loa.style.display = "none";
	con.style.display = "block";
	
}
listar();