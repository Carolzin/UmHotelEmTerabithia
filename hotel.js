// nome fictício para o hotel
var nomeHotel = "Hotel Terra Mágica";
var senha = 2678;

// exibe a mensagem de boas-vindas
alert("Olá! Bem-vindo(a) ao " + nomeHotel + "!");

// nome do usuário
var nome = prompt("Por favor, digite seu nome!");



// função para verificar a senha
function verificarSenha() {
    var senhaInformada = parseInt(prompt("Por favor, insira sua senha!"));

    while (senhaInformada !== senha) {
        senhaInformada = parseInt(prompt("Senha incorreta! Por favor, insira sua senha novamente!"));
    }

    alert("Bem-vindo(a) ao " + nomeHotel + ", " + nome + ". É um imenso prazer ter você por aqui!");
}
verificarSenha();



// função para sair
function sair() {
    alert("Muito obrigado e até logo, " + nome + "!");
}



// função para erro
function erro() {
    alert("Operação não autorizada!");
    inicio();
}



// função para exibir a lista de quartos e suas ocupações
function exibirListaQuartos(quartos) {
    var lista = quartos.map((quarto, index) => 
        `${index + 1} - ${quarto.ocupado ? 'ocupado por ' + quarto.hospede : 'livre'}`
    ).join('; ');
    alert("Lista de quartos disponíveis e indisponíveis: " + lista);
}



// inicializa o array de quartos
var quartos = Array(20).fill(null).map(() => ({ ocupado: false, hospede: "" }));

// função do menu principal
function inicio() {
    var opcao;
    do {
        opcao = parseInt(prompt(
            "O que você gostaria de fazer?\n" +
            "[1] Reserva\n" +
            "[2] Cadastro de Hóspedes\n" +
            "[3] Pesquisar Hóspedes\n" +
            "[4] Listar Hóspedes\n" +
            "[5] Eventos\n" +
            "[6] Abastecer\n" +
            "[7] Manutenção de Ar Condicionado\n" +
            "[8] Sair"
        ));

        switch (opcao) {
            case 1:
                reserva();
                break;

            case 2:
                cadastro();
                break;

            case 3:
                pesquisar();
                break;

            case 4:
                listar();
                break;

            case 5:
                eventos();
                break;

            case 6:
                abastecer();
                break;

            case 7:
                manutencao();
                break;

            case 8:
                sair();
                break;

            default:
                alert("Opção inválida! Tente novamente!");
                break;
        }

    } while (opcao !== 8);
}

inicio();



// função de reservar quartos 
function reserva() {
    // solicita o valor padrão da diária e valida a entrada
    var diaria = parseFloat(prompt("Qual o valor padrão da diária?"));
    while (diaria <= 0) {
        alert("Valor inválido, " + nome);
        diaria = parseFloat(prompt("Qual o valor padrão da diária?"));
    }

    // solicita o nome do hóspede e valida a entrada
    var nomeHospede = prompt("Qual o nome do hóspede?");

    // Solicita e valida o número de diárias
    var diasDiaria = parseInt(prompt("Quantas diárias serão necessárias?"));
    while (diasDiaria < 1 || diasDiaria > 30) {
        alert("Número de diárias inválido. Por favor, insira um número entre 1 e 30.");
        diasDiaria = parseInt(prompt("Quantas diárias serão necessárias?"));
    }

    var valorDiaria = diasDiaria * diaria;
    alert("O valor de " + diasDiaria + " dias de hospedagem é: R$" + valorDiaria.toFixed(2));

    // escolher um quarto
    while (true) {
        var numeroQuarto = parseInt(prompt("Escolha o quarto desejado (de 1 a 20):"));
        
        // valida a entrada do número do quarto
        if (numeroQuarto < 1 || numeroQuarto > 20) {
            alert("Número de quarto não existente! Por favor, escolha um quarto de 1 a 20!");
            continue; 
        }

        var indice = numeroQuarto - 1; 

        if (quartos[indice].ocupado) {
            alert("Quarto já ocupado! Por favor, escolha outro quarto.");
        } else {
            // Confirmação da reserva
            var confirmacao = prompt(nome + ", você confirma a hospedagem para " + nomeHospede + 
                " por " + diasDiaria + " dias para o quarto " + numeroQuarto + 
                " por R$" + valorDiaria.toFixed(2) + "? (SIM ou NÃO)").toUpperCase();

            if (confirmacao === 'SIM') {
                quartos[indice].ocupado = true; 
                quartos[indice].hospede = nomeHospede; 
                alert(nome + ", reserva efetuada para " + nomeHospede + ".");
                break; 
            } else {
                alert("Reserva não confirmada.");
    
            }
        }
    }
    exibirListaQuartos(quartos);
}


