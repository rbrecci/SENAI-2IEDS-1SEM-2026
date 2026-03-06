const QTE_POINTS = [
  { slowdownAt: 6.25,  waitAt: 6.5,  resumeSpeed: 1.5, normalAt: 6.75  },
  { slowdownAt: 7,  waitAt: 7.25,  resumeSpeed: 1.6, normalAt: 7.5 },
  { slowdownAt: 8, waitAt: 8.25, resumeSpeed: 1.4, normalAt: 8.5 },
  { slowdownAt: 9, waitAt: 9.25, resumeSpeed: 1.7, normalAt: 9.5 },
  { slowdownAt: 9.5, waitAt: 9.75, resumeSpeed: 1.5, normalAt: 10 },
  { slowdownAt: 17.25, waitAt: 17.75, resumeSpeed: 1.5, normalAt: 18 },
];

const TRANSITION_DELAY = 5;

const video        = document.getElementById('video-bg');
const qteIndicator = document.getElementById('qte-indicator');
const impactFlash  = document.getElementById('impact-flash');
const skipBtn      = document.getElementById('skip-btn');
const hitCounter   = document.getElementById('hit-counter');
const mainContent  = document.getElementById('main-content');
const siteHeader   = document.getElementById('site-header');

let currentQTE      = 0;
let waitingForClick = false;
let resolvingQTE    = false;
let introFinished   = false;
let hitsLanded      = 0;

let mouseX = 0, mouseY = 0;
const lightningCanvas = document.getElementById('lightning-canvas');
const ctx = lightningCanvas.getContext('2d');
function resizeCanvas() {
    lightningCanvas.width = window.innerWidth;
    lightningCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
function drawLightningBolt(x1, y1, x2, y2, depth) {
    if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return;
    }
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 20;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 20;
    drawLightningBolt(x1, y1, midX, midY, depth - 1);
    drawLightningBolt(midX, midY, x2, y2, depth - 1);
}
function renderLightning() {
    ctx.clearRect(0, 0, lightningCanvas.width, lightningCanvas.height);
    if (!waitingForClick) {
        requestAnimationFrame(renderLightning);
        return;
    }
    const bolts = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < bolts; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 40;
        const endX = mouseX + Math.cos(angle) * dist;
        const endY = mouseY + Math.sin(angle) * dist;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#3cdeff';
        ctx.strokeStyle = `rgba(60, 222, 255, ${0.4 + Math.random() * 0.5})`;
        ctx.lineWidth = 1 + Math.random() * 1.5;
        drawLightningBolt(mouseX, mouseY, endX, endY, 3);
        if (Math.random() > 0.5) {
            const branchAngle = angle + (Math.random() - 0.5) * 1.2;
            const branchDist = 30 + Math.random() * 40;
            const bx = endX + Math.cos(branchAngle) * branchDist;
            const by = endY + Math.sin(branchAngle) * branchDist;
            ctx.strokeStyle = `rgba(60, 222, 255, ${0.2 + Math.random() * 0.3})`;
            ctx.lineWidth = 0.5 + Math.random();
            drawLightningBolt(endX, endY, bx, by, 2);
        }
    }
    const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50);
    grad.addColorStop(0, 'rgba(60, 222, 255, 0.25)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(mouseX - 50, mouseY - 50, 100, 100);
    requestAnimationFrame(renderLightning);
}
requestAnimationFrame(renderLightning);

window.addEventListener('load', () => {
    video.play().then(() => {
        requestAnimationFrame(() => video.classList.add('visible'));
        setTimeout(() => skipBtn.classList.add('visible'), 1500);
        setTimeout(() => {
            hitCounter.classList.add('visible');
            updateHitCounter();
        }, 2000);
        requestAnimationFrame(gameLoop);
    }).catch(() => {
        document.addEventListener('click', () => {
        video.play();
        requestAnimationFrame(() => video.classList.add('visible'));
        setTimeout(() => skipBtn.classList.add('visible'), 1500);
        setTimeout(() => {
            hitCounter.classList.add('visible');
            updateHitCounter();
        }, 2000);
        requestAnimationFrame(gameLoop);
        }, { once: true });
    });
});

function gameLoop() {
    if (introFinished) return;

    const t = video.currentTime;

    if (currentQTE < QTE_POINTS.length && !resolvingQTE) {
        const qte = QTE_POINTS[currentQTE];

        if (t >= qte.slowdownAt && t < qte.waitAt && !waitingForClick) {
            const progress = (t - qte.slowdownAt) / (qte.waitAt - qte.slowdownAt);
            video.playbackRate = Math.max(0, 1 - progress * 0.5);
        }

        if (t >= qte.waitAt && !waitingForClick) {
            video.playbackRate = 0;
            waitingForClick = true;
            qteIndicator.classList.add('active');
        }
    }

    if (currentQTE >= QTE_POINTS.length && !introFinished) {
        const lastQTE = QTE_POINTS[QTE_POINTS.length - 1];
        if (t >= lastQTE.normalAt + TRANSITION_DELAY) { triggerFinalTransition(); }
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('click', (e) => {
    if (e.target === skipBtn) return;
    if (!waitingForClick || introFinished) return;

    const qte = QTE_POINTS[currentQTE];

    waitingForClick = false;
    resolvingQTE = true;
    qteIndicator.classList.remove('active');

    video.playbackRate = qte.resumeSpeed;
    hitsLanded++;
    updateHitCounter();

    const checkNormal = () => {
        if (video.currentTime >= qte.normalAt) {
            video.playbackRate = 1;
            currentQTE++;
            resolvingQTE = false;
        } else { requestAnimationFrame(checkNormal); }
    };

    requestAnimationFrame(checkNormal);
});

function updateHitCounter() {
    hitCounter.textContent = `GOLPES: ${hitsLanded} / ${QTE_POINTS.length}`;
}

function triggerFinalTransition() {
    introFinished = true;

    video.classList.add('blur-out');
    let blur = 0;
    let opacity = 1;
    const blurAnim = () => {
        blur += 0.5;
        opacity -= 0.02;
        video.style.filter = `blur(${blur}px)`;
        video.style.opacity = Math.max(0, opacity);
        if (opacity > 0) requestAnimationFrame(blurAnim);
    };
    requestAnimationFrame(blurAnim);

    skipBtn.style.opacity = '0';
    hitCounter.style.opacity = '0';
    qteIndicator.classList.remove('active');

    setTimeout(() => {
        mainContent.classList.add('visible');
        setTimeout(() => siteHeader.classList.add('animate'), 400);
        document.querySelector("body").style.overflow = "visible";
        document.querySelector("html").style.overflow = "visible";
    }, 600);
}

skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerFinalTransition();
});

function initParallaxAndReveal() {
    const sections = document.querySelectorAll('.parallax-section');
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const speed = parseFloat(section.dataset.speed) || 0.3;
            const rect = section.getBoundingClientRect();
            const offset = rect.top + scrollY - window.innerHeight;
            const yOffset = (scrollY - offset) * speed * 0.15;
            section.style.transform = `translateY(${-yOffset}px)`;
        });
    }, { passive: true });
}

const contentObserver = new MutationObserver(() => {
    if (mainContent.classList.contains('visible')) {
        initParallaxAndReveal();
        contentObserver.disconnect();
    }
});
contentObserver.observe(mainContent, { attributes: true, attributeFilter: ['class'] });