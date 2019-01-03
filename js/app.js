let selecionado;
let selecionado_antes;
let pair = false;
let list_selecionados = [];
let list_card;
let list_encontrados = [];
let nameClassFirst;
let nameClassSecond;
let list_card_reais = [];
let colors = ["#55efc4","#ffeaa7","#ff7675","#fd79a8" ,"#a29bfe","#74b9ff","#0984e3","#fab1a0"];
let index_colors = 0;
let hits = [];
let erros = 0;
let tempo;
let guardarTempo;
let moves = 0;

inicialModalGame();
controlCard();




// Função para controlar todas as ações de clique dos cards
function controlCard() {
    $('ul.deck li').each(function(index, value){
        $(this).click(function(){
            selecionado = $(this); //armazenando na variavel selected o card que foi clicado

            nameClassFirst = selecionado.children().attr('class'); // armazenando a classe do card clicado 'figura'

            list_selecionados.push(nameClassFirst); // Armazenando a primeira classe nesta variavel para ser comparada posteriormente
            
            if(list_selecionados.length <= 1){
                abrir_ou_fechar(true,selecionado);
                bloquearCard(selecionado,true);
                list_card_reais[0] = $(this);
                selecionado_antes = selecionado;
            }


            if (list_selecionados.length == 2){
                bloquearCard(selecionado_antes,true);
                bloquearCard(selecionado,true);
                list_card_reais[1] = $(this);
                abrir_ou_fechar(true, selecionado);

                  // Verificando se card 1 é igual ao card 2

                  if(list_selecionados[0] === list_selecionados[1] ){
                      hits.push(list_selecionados[0,1]);
                      contador.add();
                      //wins();
                    efeitoCardCorreto(selecionado_antes,false);
                    if(colors[index_colors]!= null){
                        igual(colors[index_colors]);
                        index_colors++;
                        bloquearCard(list_card_reais[0], true);
                        bloquearCard(list_card_reais[1], true);
                        list_card_reais = [];
                    }   
                        pegarTempoJogo();

                }else{
                    verificarMovimentos();
                    pegarTempoJogo();
                    contador.add();
                    list_card_reais = [];
                    removeEfeito();
                    setTimeout(function(){ bloquearCard($('ul.deck li'),true);}, 100);
                         if(selecionado_antes != null){
                                 setTimeout(function(){
                                     abrir_ou_fechar(false,selecionado_antes);
                                 },1000);
                             }
                    bloquearCard(selecionado_antes,false);
                    naoEIgual();
                    erros++;
                }
            }

            if(list_selecionados.length == 2) {
                if(pair) {
                    list_selecionados.splice(0,2);
                }else {
                    list_selecionados.splice(0,2);
                }
            }

            nameClassSecond = $(this).children().attr('class');

        });
    });
}

// Função abrir ou fechar card
function abrir_ou_fechar(abrirOuFechar, card){
    if(card != null){
        if(abrirOuFechar == true) {
            setTimeout(function(){ card.css('transform','rotateY(50deg)'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(100deg)'); }, 150);
			setTimeout(function(){ card.css('transform','rotateY(130deg)'); }, 200);
			setTimeout(function(){ card.css('transform','rotateY(180deg)'); }, 250);
			setTimeout(function(){ card.css('background','#02b3e4'); }, 250);
			setTimeout(function(){ card.addClass('open show'); }, 250);
        }else {
            setTimeout(function(){ card.css('background','#2e3d49'); }, 100);
			setTimeout(function(){ card.removeClass('open show'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(50deg)'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(100deg)'); }, 150);
			setTimeout(function(){ card.css('transform','rotateY(130deg)'); }, 200);
			setTimeout(function(){ card.css('transform','rotateY(180deg)'); }, 250);
			setTimeout(function(){ bloquearCard($('ul.deck li'),false);}, 260);
        }
    }
}

//função que realiza a randomização da lista
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // Enquanto restarem elementos para embaralhar
    while (0 !== currentIndex) {
  
      // Escolha um elemento restante ...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // E troque-o pelo elemento atual.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  */
 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

  // função embaralhar jogo
  function embaralhar() {
    $(this).css("pointer-events", "auto");
    bloquearCard($('#reiniciar',true));
    let list = [];
    contador.restart();
    $(".deck i").each(function(){
        list.push($(this).attr("class"));
    })
    list = shuffle(list);
    $(".deck i").each(function(index){
        $(this).removeClass();
        $(this).addClass(list[index]);
    })
    novoJogo();
  }

  // função novo jogo
  function novoJogo() {
    $('ul.deck li').each(function(){
		$('ul.deck li').css('background','#2e3d49');

		if($('ul.deck li').hasClass('open show')){
			gerenciarClasses($('ul.deck li'),'open show',0);
		}
    })
    bloquearCard($('ul.deck li', false));
    selecionado = null;
    selecionado_antes = null;
    pair = false;
    list_selecionados = [];
    list_card = [];
    list_encontrados = [];
    nameClassFirst = [];
    nameClassSecond = [];
    erros = 0;
    index_colors = 0;
    iniciarGame();
    adicionarEstrelaModal();
  }

  // função para verificar os movimentos e então fazer a redução das estrelas
  function verificarMovimentos() {
    if(erros == 3) {
        removerEstrelasModal();
    }
    if(erros == 7) {
        removerEstrelasModal();
    }
  }

  // verificar moves
  function verificarMoves() {
      if(list_encontrados != 0) {
        moves.push(list_encontrados);
      }else {
          moves.push(list_selecionados);
      }
  }

  //função para remover as estrelas do modal e do DOM
  function removerEstrelasModal() {
      $('.estrelas li i').each(function(){
        if($(this).attr('class') === "fa fa-star") {
            gerenciarClasses($(this), "fa-star",0);
            return false;
        }
      })

      $('.w3-container .sessao-vencedor #winning-stars ul li i').each(function(){
        if($(this).attr('class') === "fa fa-star"){
            gerenciarClasses($(this),"fa-star",0);
            return false;	
        }

    })

  }

  //função para adicionar estrelas ao modal
  function adicionarEstrelaModal() {
      $('.estrelas li i').each(function(){
        if($(this) != null) {
            gerenciarClasses($(this), "fa-star",1);
        }
      })
      $('.w3-container .sessao-vencedor #winning-stars ul li i').each(function(){
		gerenciarClasses($(this),"fa-star",1);
	})
  }

  //Função para gerenciar a inclusão ou exclusão de classes para o atributo 'Class'
  function gerenciarClasses(card, nomeDaClasse, addOuRemover) {
    if(addOuRemover == 1 && card != null){
        card.addClass(nomeDaClasse);
    }
    if(addOuRemover == 0 && card != null){
        card.removeClass(nomeDaClasse);
    }
  }

//função bloquear card
function bloquearCard(objetoSelecionado, block){
    if(objetoSelecionado != null){
        if(block == true){
            objetoSelecionado.css("pointer-events", 'none');
        }else{
            objetoSelecionado.css("pointer-events", 'auto');
        }
    }
}

// função que realiza o bloqueia e desbloqueio de todas cartas

// Função para aplicar efeito no card após o acerto
function efeitoCardCorreto(cartaSelecionada, auxiliar) {
    if(cartaSelecionada != null) {
        if(auxiliar == true) {
            cartaSelecionada.animate({height:"80px"},200);
            cartaSelecionada.animate({height:"125px"},300);
        }else{
            cartaSelecionada.animate({height:"80px"},300);
            cartaSelecionada.animate({height:"125px"},450);
        }
    }
}

// função que adiciona objeto encontrado
function adicionarParaListaEncontrados(objetoEncontrado) {
    list_encontrados.push(objetoEncontrado);
}


// função cards iguais colors
function igual(color) {
    if(selecionado != null) {
        
        setTimeout(function(){
            if(selecionado != null) {
                selecionado.css("background-color", color);
                selecionado_antes.css("background-color", color);
            }
        },300);

        setTimeout(function(){
            efeitoCardCorreto(selecionado,true);
        },200);

        adicionarParaListaEncontrados(selecionado.children().attr('class'));
		pair = true;
		list_selecionados.splice(0,2);
		if(list_encontrados.length == 8){
			document.getElementById('id02').style.display='block';
			clearInterval(guardarTempo);
		}


    }
} 

// função que efetua ações quando o par esta incorreto
function naoEIgual() {
    pair = false;
    list_selecionados.splice(0,2);
    setTimeout(function(){
        bloquearCard(selecionado,false);
    },1000);
}

// função que remove o efeito do card
function removeEfeito() {
    if(selecionado != null) {
        setTimeout(function(){abrir_ou_fechar(false, selecionado);
            if(selecionado != null)selecionado.css("background", "#2e3d49");
        },1000);
    }
}

//função jogo ganho
/*
function wins() {
    setTimeout(function(){
        if(hits.length == 8){
            alert('Voce Ganhou :D');
        }
    },02000);
}
*/

//função par exibir cards antes de iniciar o jogo
function iniciarGame() {
    document.getElementById('tempo').textContent = '00:00';
    setTimeout(function(){
        $('ul.deck li').addClass('open show');
        bloquearCard($("ul.deck li"),true);
    },0000);
    setTimeout(function(){
        $('ul.deck li').removeClass('open show');
        bloquearCard($("ul.deck li"),false);
        tempo = Date.now();
        acaoTempoStart();
        
    },10000);
}

// função tempo do jogo
function pegarTempoJogo() {
    if(tempo != null) {
        tempoAtual = (Date.now()-tempo)/1000;
        return transform_tempo(tempoAtual);
    }
}

//função transforma tempo
function transform_tempo(seg) {
    function formataCasa(numero){
		if (numero <= 9){
			numero = "0"+numero;
        }
		return numero;
	}

    hora = formataCasa(Math.round(seg/3600));
    minuto = formataCasa(Math.floor((seg%3600)/60));
    segundo = formataCasa(((seg%3600)%60).toPrecision(2));
    if (segundo.indexOf('.') == 2) {
    	segundo = segundo.replace(segundo.substring(2),"");
    }
    formatado = minuto+":"+segundo;
   	return formatado;
 }


//função para inicializar o temporizador
function acaoTempoStart() {
   guardarTempo = setInterval(function(){
    document.getElementById('tempo').textContent = pegarTempoJogo();
    document.getElementById('tempo-percorrido').textContent = pegarTempoJogo();
   },1000);
}

//função para parar o temporizador
function pararTempo() {
    clearInterval(guardarTempo);
    document.getElementById('tempo').textContent = '00:00';
    tempo = null;
    embaralhar();
}

//Função para iniciar o jogo
function inicialModalGame () {

    window.onload = iniciarModal;
        function iniciarModal() {
            setTimeout(function(){
                document.getElementById('id01').style.display="block";
            },0);
        }
}

// Função contador de movimentos
let refreshHTML = function(target, value) {
	return target.innerHTML = value;
};

let contadorGeral = function(moves) {
    this.target = document.querySelector(".contador");
    refreshHTML(this.target, moves);
}
contadorGeral.prototype.add = function() {
	moves++;
	refreshHTML(this.target, moves);
};
contadorGeral.prototype.restart = function() {
	moves = 0;
	refreshHTML(this.target, moves);
};

let contador = new contadorGeral(moves);







