# Gerador de Personagens de RPG

Aplicação web simples para criação de personagens de RPG de forma dinâmica e personalizada.

## Estrutura do Projeto

- `index.html` → Estrutura da página e formulário
- `style.css` → Estilização da interface
- `script.js` → Lógica de funcionamento do sistema

---

## Funcionalidades

- Inserção do nome do personagem
- Seleção da classe (Guerreiro, Mago, Ladino, etc.)
- Descrição da habilidade principal
- Geração automática de um adjetivo aleatório
- Exibição dinâmica do personagem criado
- Validação de campos obrigatórios
- Botão para limpar os campos

---

## Funcionamento

1. O usuário preenche os campos do formulário.
2. Ao clicar em **Criar**, o evento de submit é interceptado para evitar recarregamento da página.
3. O sistema:
   - Captura os valores inseridos
   - Seleciona um adjetivo aleatório de um array
   - Monta uma frase personalizada
   - Exibe o resultado na própria página
4. Caso algum campo esteja vazio, uma mensagem de erro é exibida.

---

## Conceitos Utilizados

- Manipulação do DOM
- Eventos (`addEventListener`)
- `preventDefault()`
- Arrays e geração de número aleatório
- Template Strings
- Validação de formulário
- Organização em arquivos separados (HTML, CSS e JS)

---

## Objetivo da Atividade

Praticar a integração completa entre estrutura, estilo e comportamento de uma aplicação web, aplicando conceitos fundamentais de JavaScript para criação de conteúdo dinâmico.
