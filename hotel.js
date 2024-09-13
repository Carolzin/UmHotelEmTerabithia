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

// função para exibir a lista de quartos e suas ocupações
function exibirListaQuartos(quartos) {
    var lista = quartos.map((quarto, index) => 
        `${index + 1} - ${quarto.ocupado ? 'ocupado por ' + quarto.hospede : 'livre'}`
    ).join('; ');
    alert("Lista de quartos disponíveis e indisponíveis: " + lista);
}

// inicializa o array de quartos e a lista de hóspedes
var quartos = Array(20).fill(null).map(() => ({ ocupado: false, hospede: "" }));
var hospedes = []; // Lista para hóspedes cadastrados

// função do menu principal
function inicio() {
    var opcao;
    do {
        opcao = parseInt(prompt(
            "O que você gostaria de fazer?\n" +
            "[1] Reserva\n" +
            "[2] Cadastro de Hóspedes\n" +
            "[3] Pesquisar Hóspedes\n" +
            "[4] Eventos\n" +
            "[5] Abastecer\n" +
            "[6] Manutenção de Ar Condicionado\n" +
            "[7] Sair"
        ));

        switch (opcao) {
            case 1:
                reserva();
                break;

            case 2:
                cadastro();
                break;

            case 3:
                menuPesquisa(); 
                break;

            case 4:
                eventos();
                break;

            case 5:
                abastecer();
                break;

            case 6:
                manutencao();
                break;

            case 7:
                sair();
                break;

            default:
                alert("Opção inválida! Tente novamente!");
                break;
        }
    } while (opcao !== 7);
}

// Função para reservar quartos
function reserva() {
    var diaria = parseFloat(prompt("Qual o valor padrão da diária?"));
    while (diaria <= 0) {
        alert("Valor inválido, " + nome);
        diaria = parseFloat(prompt("Qual o valor padrão da diária?"));
    }

    var nomeHospede = prompt("Qual o nome do hóspede?");
    var diasDiaria = parseInt(prompt("Quantas diárias serão necessárias?"));
    while (diasDiaria < 1 || diasDiaria > 30) {
        alert("Número de diárias inválido. Por favor, insira um número entre 1 e 30.");
        diasDiaria = parseInt(prompt("Quantas diárias serão necessárias?"));
    }

    var valorDiaria = diasDiaria * diaria;
    alert("O valor de " + diasDiaria + " dias de hospedagem é: R$" + valorDiaria.toFixed(2));

    while (true) {
        var numeroQuarto = parseInt(prompt("Escolha o quarto desejado (de 1 a 20):"));
        if (numeroQuarto < 1 || numeroQuarto > 20) {
            alert("Número de quarto não existente! Por favor, escolha um quarto de 1 a 20!");
            continue;
        }

        var indice = numeroQuarto - 1;

        if (quartos[indice].ocupado) {
            alert("Quarto já ocupado! Por favor, escolha outro quarto.");
        } else {
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

// Função para cadastrar hóspedes
function cadastro() {
    var valorDiariaCadastro = parseFloat(prompt("Qual o valor padrão da diária?"));

    while (isNaN(valorDiariaCadastro) || valorDiariaCadastro <= 0) {
        alert("Valor inválido! Por favor, insira um valor numérico maior que 0.");
        valorDiariaCadastro = parseFloat(prompt("Qual o valor padrão da diária?"));
    }

    var totalDiariaCadastro = 0;
    var totalGratuidades = 0;
    var totalMeias = 0;

    while (true) {
        var nomeHospedeCadastro = prompt("Qual o nome do hóspede? (Digite PARE para parar)");
        if (nomeHospedeCadastro.toUpperCase() === "PARE") {
            break;
        }

        var idadeHospedeCadastro = parseInt(prompt("Qual a idade do hóspede?"));
        while (isNaN(idadeHospedeCadastro) || idadeHospedeCadastro < 0) {
            alert("Idade inválida! Por favor, insira uma idade numérica positiva.");
            idadeHospedeCadastro = parseInt(prompt("Qual a idade do hóspede?"));
        }

        if (idadeHospedeCadastro < 6) {
            alert(nomeHospedeCadastro + " cadastrada(o) com sucesso. " + nomeHospedeCadastro + " possui gratuidade!");
            totalGratuidades++;
        } else if (idadeHospedeCadastro >= 60) {
            alert(nomeHospedeCadastro + " cadastrada(o) com sucesso. " + nomeHospedeCadastro + " paga meia!");
            totalDiariaCadastro += valorDiariaCadastro / 2;
            totalMeias++;
        } else {
            alert(nomeHospedeCadastro + " cadastrada(o) com sucesso.");
            totalDiariaCadastro += valorDiariaCadastro;
        }
    }

    alert("O valor total das hospedagens é: R$" + totalDiariaCadastro.toFixed(2) + 
        "; " + totalGratuidades + " gratuidade(s); " + totalMeias + " meia(s)");
}

// função para mostrar o menu da opção pesquisa
function menuPesquisa() {
    var opcaoPesquisa;
    do {
        opcaoPesquisa = parseInt(prompt(
            "Selecione uma opção:\n" +
            "[1] Cadastrar\n" +
            "[2] Pesquisar\n" +
            "[3] Listar\n" +
            "[4] Sair"
        ));

        switch (opcaoPesquisa) {
            case 1:
                cadastrarPesquisa();
                break;

            case 2:
                pesquisar();
                break;

            case 3:
                listarHospedesPesquisa();
                break;

            case 4:
                alert(nome + ", até logo!");
                break;

            default:
                alert("Opção inválida! Tente novamente.");
                break;
        }
    } while (opcaoPesquisa !== 4);
}

// função para cadastrar um hóspede
function cadastrarPesquisa() {
    if (hospedes.length >= 15) {
        alert("Máximo de cadastros atingido.");
        return;
    }

    var nomeHospede = prompt("Qual o nome do hóspede?");
    hospedes.push(nomeHospede);
    alert("Hóspede " + nomeHospede + " foi cadastrado(a) com sucesso!");
}

// função para pesquisar um hóspede
function pesquisar() {
    var nomeHospedePesquisa = prompt("Qual o nome do hóspede?");
    var encontrado = hospedes.includes(nomeHospedePesquisa);

    if (encontrado) {
        alert(nomeHospedePesquisa + " foi encontrado.");
    } else {
        alert(nomeHospedePesquisa + " não foi encontrado.");
    }
}

// função para listar todos os hóspedes cadastrados
function listarHospedesPesquisa() {
    if (hospedes.length === 0) {
        alert("Nenhum hóspede cadastrado.");
    } else {
        var lista = hospedes.join('\n');
        alert("Lista de hóspedes:\n" + lista);
    }
}

// chama o menu principal após a verificação da senha
inicio();
