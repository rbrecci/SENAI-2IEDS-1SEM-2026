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
    triggerImpactEffect();

    const checkNormal = () => {
        if (video.currentTime >= qte.normalAt) {
            video.playbackRate = 1;
            currentQTE++;
            resolvingQTE = false;
        } else { requestAnimationFrame(checkNormal); }
    };

    requestAnimationFrame(checkNormal);
});

function triggerImpactEffect() {
    impactFlash.style.transition = 'none';
    impactFlash.style.opacity = '1';
    requestAnimationFrame(() => {
        impactFlash.style.transition = 'opacity 0.4s ease-out';
        impactFlash.style.opacity = '0';
    });

    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 400);
}

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
    }, 600);
}

skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerFinalTransition();
});