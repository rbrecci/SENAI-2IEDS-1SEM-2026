# 🎮 God of War: Ragnarök - Página Interativa

Uma experiência web cinematográfica imersiva baseada no universo de **God of War: Ragnarök**, com sistema de Quick Time Events (QTE) interativos, efeitos visuais dinâmicos e conteúdo narrativo envolvente.

---

## 📋 Características Principais

### 1. **Cinemática Interativa com QTE**
- Vídeo fullscreen com sincronização de eventos em tempo real
- **6 pontos de interação** configuráveis com timestamps precisos
- Sistema de desaceleração gradual do vídeo (playback rate dinâmico)
- Indicador visual **"Clique!"** que aparece quando o jogador precisa interagir
- Contador de acertos em tempo real

**Como funciona:**
```javascript
{ slowdownAt, waitAt, resumeSpeed, normalAt }
```
- `slowdownAt`: Momento onde o vídeo começa a desacelerar
- `waitAt`: Momento onde o vídeo pausa completamente
- `resumeSpeed`: Velocidade de reprodução após o clique (1.5x, 1.6x, etc)
- `normalAt`: Momento onde a velocidade volta ao normal (1x)

### 2. **Sistema de Raios Dinâmicos (Canvas API)**
Durante cada QTE ativo, uma **aura de raios** segue o cursor do mouse:
- Raios recursivos com ramificações aleatórias
- Gradiente radial luminoso ao redor do cursor
- Apenas renderizado quando `waitingForClick === true`
- Efeito cyan/azul elétrico (`#3cdeff`)
- Performance otimizada com `requestAnimationFrame`

### 3. **Efeitos Visuais Cinematográficos**

#### Flash de Impacto
- Gradiente radial branco → azul que pisca no centro da tela
- Ativa ao final de cada QTE resolvido

#### Transição Blur
- Vídeo ganha blur crescente após completar todos os QTEs
- Fade de opacidade simultâneo (efeito de dissolução)
- Habilita scroll na página

#### Header Animado
- Borda inferior com gradiente que "acende" do centro para fora
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` para movimento fluido
- Logo com fade-in e slide-up sincronizado
- Sticky positioning com backdrop blur

### 4. **Sistema de Parallax e Scroll Reveal**

#### Parallax (Movimento de Camadas)
Cada seção se move em velocidades diferentes conforme o usuário faz scroll:
```html
<section class="parallax-section" data-speed="0.3">
  <!-- data-speed: controla a velocidade do parallax (0.3, 0.5, 0.4, etc) -->
</section>
```
- Velocidades menores = movimento mais sutil
- Velocidades maiores = movimento mais pronunciado
- Implementado com `transform: translateY()` e scroll listener

#### Scroll Reveal
Elementos dentro de `.reveal` aparecem suavemente quando entram no viewport:
- `IntersectionObserver` monitora visibilidade
- Fade-in combinado com slide-up (`translateY`)
- Threshold: 15% de visibilidade
- Animação: 0.8s ease-out

### 5. **Navegação e Controles**

#### Botão "Pular Intro"
- Fixo no canto superior direito
- Aparece com delay de 1.5s (efeito fade-in)
- Dispara transição final instantaneamente
- Hover effect com text-shadow

#### Hit Counter
- Fixo no canto inferior direito
- Mostra: `GOLPES: X / 6`
- Aparece após 2s e atualiza em tempo real

---

## 🏗️ Estrutura de Arquivos

```
public/
├── index.html         # Estrutura HTML principal
├── style.css          # Estilos e animações
├── script.js          # Lógica de QTE, raios e parallax
├── Assets/            # Pasta com mídia
│   ├── KratosXThor.mp4
│   ├── Logo.avif
│   ├── LogoPNG.png
│   ├── CapaJogo.png
│   ├── KratosXThor.jpg
│   └── Atreus.jpg
└── README.md          # Este arquivo
```

---

## 🎨 Paleta de Cores

| Cor | Uso |
|-----|-----|
| `#3cdeff` | Raios, glow, destaques |
| `#f0f0f0` | Branco neutro, texto |
| `#000000` | Fundo base |
| `rgba(60, 222, 255, 0.8)` | Círculo do indicador QTE |
| `rgba(255, 255, 255, 0.6)` | Flash de impacto |

---

## 🎯 Como Personalizar

### Ajustar Timings do QTE

Edite o array `QTE_POINTS` no início de `script.js`:

```javascript
const QTE_POINTS = [
  { slowdownAt: 6.25,  waitAt: 6.5,  resumeSpeed: 1.5, normalAt: 6.75  },
  { slowdownAt: 7,  waitAt: 7.25,  resumeSpeed: 1.6, normalAt: 7.5 },
  // ... adicione ou modifique conforme necessário
];
```

**Dica:** Para descobrir os timings corretos:
1. Reproduza o vídeo no navegador ou editor
2. Note os momentos de impacto
3. Defina `slowdownAt` 0.2-0.3s antes do impacto
4. `waitAt` no momento do impacto
5. `normalAt` no fim da sequência (geralmente +0.25s após waitAt)

### Adicionar Novas Seções

No `content-body` do `index.html`, adicione:

```html
<section class="parallax-section" data-speed="0.3">
  <div class="section-inner reveal">
    <h2>Seu Título</h2>
    <img src="./Assets/sua-imagem.jpg" alt="Descrição">
    <figcaption>Seu texto descritivo aqui</figcaption>
  </div>
</section>
```

- Varie `data-speed` (0.2 a 0.6) para diferentes efeitos
- O JavaScript se adapta automaticamente
- Não é necessário modificar nada no JS

### Modificar Velocidade do Parallax

Na função `initParallaxAndReveal()`, ajuste o multiplicador:

```javascript
const yOffset = (scrollY - offset) * speed * 0.15; // Aumentar/diminuir 0.15
```

- Valor menor = parallax mais sutil
- Valor maior = parallax mais dramático

---

## ⚙️ Requisitos Técnicos

### Navegador
- Chrome/Edge/Firefox/Safari (versão recente)
- Suporte a:
  - `requestAnimationFrame`
  - `IntersectionObserver`
  - `MutationObserver`
  - Canvas API
  - CSS Backdrop Filter

### Assets Necessários

O projeto **requer** os seguintes arquivos na pasta `public/Assets/`:

| Arquivo | Tipo | Uso |
|---------|------|-----|
| `KratosXThor.mp4` | Vídeo | Cinemática principal (recomendado < 50MB) |
| `Logo.avif` | Imagem | Logo no header |
| `LogoPNG.png` | Imagem | Favicon do navegador |
| `CapaJogo.png` | Imagem | Seção 1 - Ragnarök |
| `KratosXThor.jpg` | Imagem | Seção 2 - Thor |
| `Atreus.jpg` | Imagem | Seção 3 - Atreus |

---

## 🚀 Performance

### Otimizações Implementadas

1. **Canvas Rendering**
   - Renderização condicional (apenas durante QTE)
   - Limpeza com `ctx.clearRect()` por frame

2. **Scroll Listener**
   - Otimizado com `{ passive: true }`
   - Usa `requestAnimationFrame` para sincronização

3. **IntersectionObserver**
   - Evita polling contínuo
   - Observa apenas elementos necessários

4. **CSS Will-Change**
   - `.parallax-section` usa `will-change: transform` para GPU acceleration

---

## 🎬 Fluxo de Execução

```
1. Página carrega
   ↓
2. Vídeo fade-in (1.5s) + "Pular Intro" fica visível
   ↓
3. gameLoop inicia → monitora currentTime do vídeo
   ↓
4. QTE 1: Vídeo desacelera → para → indicador aparece → raios seguem mouse
   ↓
5. Usuário clica → vídeo acelera → contador atualiza
   ↓
6. Repetir para QTE 2-6
   ↓
7. Último QTE resolvido + 5s de delay
   ↓
8. triggerFinalTransition()
   - Vídeo blur + fade
   - main-content aparece (opacity 0 → 1)
   - Header se anima
   - Scroll habilitado
   ↓
9. Parallax e scroll reveal ativos
```

---

## 🔧 Debugging

### Verificar Console

Abra DevTools (F12) e procure por:
- Erros de vídeo: `play()` falhou
- Canvas: Verificar dimensões do lightning-canvas
- Performance: Usar Performance tab durante QTEs

### Logs Úteis

Adicione no início de `script.js`:

```javascript
console.log('QTE_POINTS:', QTE_POINTS);
console.log('Video duration:', video.duration);
```

### Problemas Comuns

| Problema | Solução |
|----------|---------|
| Vídeo não toca | Verificar caminho em `src` e permissões de CORS |
| Raios não aparecem | Verificar se `waitingForClick === true` |
| Parallax "travado" | Abrir DevTools, clicar no viewport, fazer scroll |
| Header não anima | Verificar se transição completou (`introFinished` deve ser true) |

---

## 📖 Referências de Código

### State Machine do QTE

```javascript
waitingForClick = false  // Espera por interação
waitingForClick = true   // Mostra indicador + raios
resolvingQTE = true      // Acelera vídeo
resolvingQTE = false     // Voltou ao normal
```

### Sincronização de Vídeo

```javascript
video.playbackRate = 0      // Pausa
video.playbackRate = 1.5    // 1.5x normal
video.playbackRate = 1      // Normal
```

---

## 🎓 Conceitos Técnicos Utilizados

| Conceito | Implementação |
|----------|---------------|
| **Game Loop** | `requestAnimationFrame(gameLoop)` |
| **Canvas Fractals** | `drawLightningBolt()` recursiva |
| **Event Delegation** | Click listener com validação de target |
| **Observer Pattern** | `IntersectionObserver` + `MutationObserver` |
| **State Management** | Variáveis globais (currentQTE, waitingForClick, etc) |
| **Timing Functions** | `cubic-bezier()` customizado |
