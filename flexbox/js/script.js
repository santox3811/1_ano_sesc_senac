/*
    document representa toda a página HTML.
 
    addEventListener() permite que o JavaScript fique "escutando"
    algum acontecimento na página.
 
    DOMContentLoaded é o evento que acontece quando o navegador
    termina de carregar e montar todo o HTML.
 
    Estamos usando isso para garantir que os elementos HTML já
    existam antes de o JavaScript tentar utilizá-los.
 
    A estrutura:
 
    () => {
 
    }
 
    é uma Arrow Function.
 
    Ela representa a função que será executada quando o evento
    DOMContentLoaded acontecer.
*/
 
document.addEventListener("DOMContentLoaded", () => {
   
    /*
        "use strict" ativa o modo estrito do JavaScript.
 
        Ele faz o JavaScript trabalhar com regras um pouco mais
        rigorosas e ajuda a identificar alguns erros de programação.
 
        Neste projeto ele será executado para todo o código que
        estiver dentro desta função.
    */
    "use strict";
 
    /*
        const cria uma constante.
 
        Uma constante é utilizada para armazenar um valor que não
        será substituído posteriormente.
 
        Aqui estamos criando uma constante chamada descriptions.
 
        Ela recebe um OBJETO.
 
        Um objeto é uma estrutura que permite agrupar várias
        informações relacionadas.
    */
    const descriptions = {
        direction: {
            row: "Organiza os itens horizontalmente, da esquerda para a direita.",
            "row-reverse": "Organiza os itens horizontalmente, da direita para a esquerda.",
            column: "Organiza os itens verticalmente, de cima para baixo.",
            "column-reverse": "Organiza os itens verticalmente, de baixo para cima."
        }
    };
 
    /*
        Criamos uma função chamada getElement.
 
        Uma função é um bloco de código criado para realizar
        determinada tarefa.
 
        Neste caso, nossa função será responsável por procurar
        elementos dentro do HTML.
 
        selector é um PARÂMETRO.
 
        Ele representa a informação que será enviada para a função.
 
        Por exemplo:
 
        getElement(".direction-container");
 
        Nesse caso:
 
        selector = ".direction-container"
    */
    function getElement(selector) {
        const element = document.querySelector(selector);
 
        if(!element) {
            console.warn(`Elemento não encontrado: ${selector}`);
        }
 
        return element;
    }
 
    /*
        Função responsável por destacar visualmente o botão que foi clicado.
 
        Primeiro ela percorre todos os botões daquele grupo e remove
        a classe "active", além de marcar aria-pressed como false.
 
        Depois adiciona a classe "active" apenas no botão selecionado
        e altera aria-pressed para true.
 
        Exemplo:
        se o aluno clicar em "center", somente esse botão ficará destacado.
    */
    function setActiveButton(button, selector) {
        document.querySelectorAll(selector).forEach(currentButton => {
            currentButton.classList.remove("active");
            currentButton.setAttribute("aria-pressed", "false");
        });
 
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
    }
 
    /*
        Função responsável por encontrar automaticamente qual botão
        deve ficar ativo com base em um valor.
 
        Ela compara o valor armazenado no atributo data-* de cada botão
        com o valor recebido pela função.
 
        Essa função é usada principalmente quando restauramos uma seção
        para o seu estado padrão.
 
        Exemplo:
        se o valor padrão for "row", o botão que possui
        data-direction="row" será marcado como ativo.
    */
   function setActivebyValue(selector, dataKey, value) {
    document.querySelectorAll(selector).forEach(button => {
        const isActive = button.dataset[dataKey] === value;
 
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
   }
 
   /*
        Esta é a principal função de controle das demonstrações.
 
        Ela foi criada para evitar repetir o mesmo código em todas
        as propriedades do Flexbox.
 
        A função recebe informações dizendo:
 
        - quais botões serão utilizados;
        - qual elemento será alterado;
        - onde mostrar o valor selecionado;
        - onde mostrar a descrição;
        - qual atributo data-* contém o valor;
        - qual propriedade CSS será modificada;
        - qual grupo de descrições será utilizado;
        - e, opcionalmente, uma função extra para executar depois.
 
        Quando o aluno clica em um botão, esta função:
 
        1. descobre o valor escolhido;
        2. altera a propriedade CSS do elemento;
        3. atualiza o código exibido na tela;
        4. atualiza a descrição;
        5. destaca o botão selecionado;
        6. executa uma ação extra, caso exista.
 
        Dessa forma, a mesma função pode controlar flex-direction,
        justify-content, align-items, gap e várias outras propriedades.
    */
    function createController({
        buttonSelector,
        targetSelector,
        outputSelector,
        descriptionSelector,
        datasetKey,
        styleProperty,
        descriptionGroup,
        afterchange
    }) {
        const target = getElement(targetSelector);
        const output = getElement(outputSelector);
        const description = getElement(descriptionSelector);
        const buttons = document.querySelectorAll(buttonSelector);
 
        if (!target || !output || !description || buttons.length === 0) {
            return;
        }
 
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const value = button.dataset[datasetKey];
 
                if (typeof value !== "string") {
                    return;
                }
 
                target.style[styleProperty] = value;
                output.textContent = descriptions[descriptionGroup][value] ?? "";
                setActiveButton(button, buttonSelector);
 
                if (typeof afterchange === "function") {
                    afterchange(value);
                }
            });
        });
    }
})
 