# Atividades em JavaScript

## Atividade 1 – Olá Mundo

Arquivo: `JS-Atv1.html`

Página HTML simples que exibe um título na tela e utiliza `document.writeln()` para escrever a mensagem "Ihul" diretamente no documento ao carregar a página.  
Objetivo: introdução ao uso básico de JavaScript dentro do HTML.

---

## Atividade 2 – Boas-Vindas com Prompt

Arquivo: `JS-Atv2.html`

Programa que solicita o nome do usuário utilizando `window.prompt()` e exibe uma mensagem de boas-vindas personalizada com `document.write()`.  
Objetivo: trabalhar entrada de dados pelo usuário e exibição dinâmica de texto.

---

## Atividade 3 – Concatenação de Nome e Sobrenome

Arquivo: `JS-Atv3.html`

Formulário com campos para nome e sobrenome. Ao clicar em "Concatenar", a função `concatena()` junta os dois valores e exibe uma mensagem com `window.alert()`.  
Objetivo: manipulação de formulários, captura de valores e concatenação de strings.

---

## Atividade 4 – Operações Matemáticas

Arquivo: `JS-Atv4.html`

Sistema simples que pergunta ao usuário qual operação deseja realizar (somar, subtrair, multiplicar ou dividir) e solicita dois números.  
Utiliza `switch` para executar a operação escolhida e `parseInt()` para converter os valores.  
Objetivo: uso de estruturas de decisão e operações matemáticas.

---

## Atividade 5 – Monte seu Suco

Arquivo: `JS-Atv5.html`

Interface interativa onde o usuário pode:
- Selecionar uma ou mais frutas (select múltiplo)
- Escolher o líquido (radio button)
- Definir se deseja açúcar (checkbox)

O botão "Preparar Suco" monta uma mensagem personalizada com base nas escolhas.  
Há também um botão para selecionar todas as frutas automaticamente.  

Objetivo: manipulação de múltiplos tipos de inputs, uso de arrays, validação e construção dinâmica de mensagens.

---

## Atividade 6 – Calculadora de Intervalo entre Datas

Arquivo: `JS-Atv6.html`

Aplicação que permite ao usuário selecionar duas datas e calcular o intervalo entre elas.

O sistema:
- Valida se ambas as datas foram preenchidas
- Calcula a diferença em dias
- Converte o resultado para meses (aproximado)
- Converte o resultado para anos (aproximado)
- Exibe os resultados dinamicamente na página

Também possui um botão para limpar os campos e o resultado exibido.

Objetivo: manipulação de datas com `Date`, cálculos com milissegundos, validação de formulário e atualização dinâmica do conteúdo com `innerHTML`.

---

## Atividade 7 – Gerador de Personagens de RPG

Pasta: `RPG-generator`

Aplicação web interativa para criação de personagens de RPG.  
O usuário informa o nome, escolhe uma classe e descreve uma habilidade principal.  
O sistema gera automaticamente uma frase personalizada com um adjetivo aleatório, exibindo o personagem criado na tela.

Objetivo: integração entre HTML, CSS e JavaScript, manipulação de formulários, uso de eventos, validação de campos e geração de conteúdo dinâmico.

---

## Atividade 8 – Manipulação de Array (Frutas)

Arquivo: `JS-Atv8.html`

Aplicação simples para demonstrar o uso de arrays em JavaScript.

O sistema permite:
- Visualizar o conteúdo atual do array
- Adicionar novas frutas ao array via `prompt`
- Remover a última fruta adicionada
- Exibir a quantidade de itens armazenados

Caso o array esteja vazio, o sistema informa essa condição na tela.

Objetivo: praticar manipulação de arrays utilizando métodos como `push()`, `pop()`, `join()`, além de trabalhar atualização dinâmica do DOM e controle de estado da aplicação.


---

## Atividade 9 – Radar Eletrônico  
Arquivo: `JS-Atv9.html`

Simulação de um radar de velocidade com limite fixo de **80 km/h**.  
O usuário informa a velocidade do veículo e o sistema exibe uma mensagem indicando se está dentro do limite ou se foi multado, alterando também a cor do texto conforme o resultado.

**Conceitos trabalhados:**
- Entrada de dados
- Conversão de tipos (`Number`)
- Estruturas condicionais (`if / else`)
- Manipulação do DOM e estilos via JavaScript

---

## Atividade 10 – Avaliador de Nota  
Arquivo: `JS-Atv10.html`

Aplicação que recebe uma nota numérica e exibe uma avaliação textual de acordo com o desempenho do aluno.

**Conceitos trabalhados:**
- Estruturas condicionais encadeadas (`if / else if / else`)
- Manipulação de elementos HTML
- Lógica de decisão

---

## Atividade 11 – Controle de Acesso  
Arquivo: `JS-Atv11.html`

Sistema que verifica se um usuário está autorizado a acessar o sistema e se o acesso ocorre dentro do horário permitido (antes das 22h).

**Conceitos trabalhados:**
- Arrays e método `includes()`
- Condicionais aninhadas
- Uso de `prompt` e `alert`
- Validação por múltiplos critérios

---

## Atividade 12 – Prática de Operadores JavaScript  
Arquivo: `JS-Atv12.html`

Painel interativo que demonstra o funcionamento dos principais operadores do JavaScript, exibindo os resultados dinamicamente na tela.

**Operadores abordados:**
- Aritméticos
- Atribuição
- Comparação
- Lógicos
- Incremento e decremento
- Operador ternário

**Conceitos trabalhados:**
- Operadores em JavaScript
- Template strings
- Atualização dinâmica do DOM

---

## Atividade 13 – Template Strings e Cálculo Salarial  
Arquivo: `JS-Atv13.html`

Aplicação que utiliza **template strings (crase)** para exibir informações do usuário e calcular um aumento salarial de 10%, apresentando os valores formatados na tela.

**Conceitos trabalhados:**
- Template strings
- Operações matemáticas
- Formatação de números
- Inserção dinâmica de HTML

---

## Atividade 14 – Avaliador de Desempenho do Funcionário  
Pasta: `Atividade14`

Sistema completo que avalia o desempenho de um funcionário com base em:
- Salário
- Cargo
- Número de faltas
- Número de atrasos

O sistema calcula o aumento salarial conforme o cargo, desde que o funcionário não tenha faltas ou atrasos.

**Conceitos trabalhados:**
- Separação de HTML, CSS e JavaScript
- Estruturas condicionais e `switch`
- Validação de formulário
- Manipulação do DOM
- Organização de projeto web

---

## Atividade 15 – Gerador de Tabuadas  
Arquivo: `JS-Atv15.html`

Aplicação que gera automaticamente as tabuadas de **1 a 10**, exibindo os resultados dinamicamente na tela.  
Possui controle para evitar duplicação e opção para apagar os resultados.

**Conceitos trabalhados:**
- Laços de repetição (`for`)
- Geração dinâmica de HTML
- Controle de estado da aplicação
- Manipulação avançada do DOM

---

## Tecnologias Utilizadas
- HTML5  
- CSS3  
- JavaScript (Vanilla JS)
