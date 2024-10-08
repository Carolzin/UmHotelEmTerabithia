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

//função evento 
function eventos() {
    var auditorioLaranja = 150;
    var totalCapacidadeLaranja = auditorioLaranja + 70; // capacidade total com cadeiras adicionais
    var auditorioColorado = 350;

    var numeroConvidados = parseInt(prompt("Qual o número de convidados?"));

    // verifica qual auditório utilizar
    if (numeroConvidados > auditorioColorado || numeroConvidados < 0) {
        alert("Quantidade de convidados inválida ou superior à capacidade máxima!");
    } else if (numeroConvidados <= auditorioLaranja) {
        alert("O auditório mais adequado para esse evento é o Auditório Laranja!");
    } else if (numeroConvidados > auditorioLaranja && numeroConvidados <= totalCapacidadeLaranja) {
        var cadeirasAdicionais = totalCapacidadeLaranja - numeroConvidados;
        alert("Use o Auditório Laranja e inclua mais " + cadeirasAdicionais + " cadeiras.");
    } else {
        alert("O auditório mais adequado para esse evento é o Auditório Colorado!");
    }

    alert("Vamos agendar o evento!");

    // Pergunta o dia do evento
    var dia = prompt("Qual o dia do seu evento?").toLowerCase();
    // Pergunta a hora do evento
    var hora = parseInt(prompt("Qual o horário do evento?"));

    var disponibilidade = false;

    // Verifica se o dia é dia de semana
    if (dia === "segunda" || dia === "terca" || dia === "quarta" || dia === "quinta" || dia === "sexta") {
        if (hora >= 7 && hora <= 23) {
            disponibilidade = true;
        }
        // Verifica se é final de semana
    } else if (dia === "sabado" || dia === "domingo") {
        if (hora >= 7 && hora <= 15) {
            disponibilidade = true;
        }
    }

    // Se o auditório estiver disponível, pede o nome da empresa
    if (disponibilidade) {
        var nomeEmpresaEvento = prompt("Qual o nome da empresa?");
        alert("Auditório reservado para " + nomeEmpresaEvento + ". " + dia + " às " + hora + " horas.");
    } else {
        alert("Auditório indisponível.");
    }

    //garçons para o evento
    var custoGarcomPorHora = 10.50;

    // pergunta a duração do evento
    var duracao = parseInt(prompt("Qual a duração do evento em horas?"));

    // calcula o número de garçons necessários
    var garconsPorConvidados = (numeroConvidados / 12);
    if (numeroConvidados % 12 !== 0) {
        garconsPorConvidados = parseInt(garconsPorConvidados) + 1;
    } else {
        garconsPorConvidados = parseInt(garconsPorConvidados);
    }

    // cálculo do total de garçons (apenas por convidados)
    var totalGarcons = garconsPorConvidados;

    // Calcula o custo total
    var custoGarcom = totalGarcons * duracao * custoGarcomPorHora;

    // Exibe os resultados
    alert("São necessários " + totalGarcons + " garçons.");
    alert("Custo: R$ " + custoGarcom.toFixed(2));
    alert("Agora vamos calcular o custo do buffet do hotel para o evento.");

    //buffet do hotel
    var precoCafePorLitro = 0.80;
    var precoAguaPorLitro = 0.40;
    var precoCentosSalgados = 34;

    var agua = numeroConvidados * 0.5;
    var cafe = numeroConvidados * 0.2;
    var salgados = numeroConvidados * 7;

    var custoCafe = cafe * precoCafePorLitro;
    var custoAgua = agua * precoAguaPorLitro;

    var quantosCentosSalgados = (salgados + 99) / 100;
    var centosSalgados = (quantosCentosSalgados - (quantosCentosSalgados % 1));
    if (salgados % 100 !== 0) {
        centosSalgados += 1;
    }
    var custoSalgados = centosSalgados * precoCentosSalgados;
    var custoTotalBuffet = custoCafe + custoAgua + custoSalgados;
    var valorTotalEvento = custoGarcom + custoTotalBuffet;

    alert("O evento precisará de " + cafe + " litros de café, " + agua + " litros de água, " + salgados + " salgados.");

    alert("Evento no Auditóorio.\n" +
        "Nome da Empresa: " + nomeEmpresaEvento + "\n" +
        "Data: " + dia + " às " + hora + " horas.\n" +
        "Duração do evento: " + duracao + " horas.\n" +
        "Quantidade de garçons: " + totalGarcons + "\n" +
        "Quantidade de Convidados: " + numeroConvidados + "\n\n" +
        "Custo dos garçons: R$ " + custoGarcom.toFixed(2) + "\n" +
        "Custo do Buffet: R$ " + custoTotalBuffet.toFixed(2) + "\n\n" +
        "Valor total do Evento: R$ " + valorTotalEvento.toFixed(2));

    var reservaEvento = prompt("Gostaria de efetuar reserva? (S/N)");
    if (reservaEvento.toUpperCase() === "S") {
        alert("Reserva efetuada com sucesso.");
    } else {
        alert("Reserva não efetuada.");
    }
}

// função para determinar a opção mais barata para abastecimento
function abastecer() {
    var alcoolWayne = parseFloat(prompt("Qual o valor do álcool no posto Wayne Oil?"));
    var gasolinaWayne = parseFloat(prompt("Qual o valor da gasolina no posto Wayne Oil?"));
    var alcoolStark = parseFloat(prompt("Qual o valor do álcool no posto Stark Petrol?"));
    var gasolinaStark = parseFloat(prompt("Qual o valor da gasolina no posto Stark Petrol?"));

    // determina a opção mais barata
    if (alcoolWayne < gasolinaWayne && alcoolWayne < alcoolStark && alcoolWayne < gasolinaStark) {
        alert(nome + ", a opção mais barata para abastecimento é álcool no posto Wayne Oil.");
    } else if (alcoolStark < gasolinaStark && alcoolStark < gasolinaWayne && alcoolStark < alcoolWayne) {
        alert(nome + ", a opção mais barata para abastecimento é álcool no posto Stark Petrol.");
    } else if (gasolinaWayne < gasolinaStark && gasolinaWayne < alcoolWayne && gasolinaWayne < alcoolStark) {
        alert(nome + ", a opção mais barata para abastecimento é gasolina no posto Wayne Oil.");
    } else if (gasolinaStark < gasolinaWayne && gasolinaStark < alcoolWayne && gasolinaStark < alcoolStark) {
        alert(nome + ", a opção mais barata para abastecimento é gasolina no posto Stark Petrol.");
    } else {
        alert(nome + ", Os preços são iguais.");
    }
}

//função manutenção do ar condiconado
function manutencao() {
    var menorValor = null;
    var empresaMenorValor = "";
    var continuar = "S";

    while (continuar.toUpperCase() === "S") {
        var nomeEmpresa = prompt("Qual o nome da empresa?");
        var valorAparelho = parseFloat(prompt("Qual o valor por aparelho?"));
        var quantidadeAparelho = parseInt(prompt("Qual a quantidade de aparelhos?"));
        var desconto = parseFloat(prompt("Qual a porcentagem do desconto?"));
        var quantidadeMinima = parseInt(prompt("Qual a quantidade mínima para conseguir o desconto?"));

        // calculo do valor total sem desconto
        var valorTotal = valorAparelho * quantidadeAparelho;

        // desconto
        var valorManutencao;
        if (quantidadeAparelho >= quantidadeMinima) {
            var valorDesconto = (valorTotal * desconto) / 100;
            valorManutencao = valorTotal - valorDesconto;
        } else {
            valorManutencao = valorTotal;
        }

        alert("O serviço da " + nomeEmpresa + " custará R$ " + valorManutencao.toFixed(2));

        if (menorValor === null || valorManutencao < menorValor) {
            menorValor = valorManutencao;
            empresaMenorValor = nomeEmpresa;
        }
        continuar = prompt("Deseja informar novos dados? (S/N)");
    }
    alert("O orçamento de menor valor é o de " + empresaMenorValor + " por R$ " + menorValor.toFixed(2));
}

// chama o menu principal após a verificação da senha
inicio();

//fim