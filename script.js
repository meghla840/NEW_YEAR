const girl = document.getElementById('girl');
const speech = document.getElementById('speech');
const door = document.getElementById('door');
const envelope = document.getElementById('envelope');
const fold = document.querySelector('.envelope .fold');
const card = document.getElementById('card');
const knockSound = document.getElementById('knockSound');
const chimeSound = document.getElementById('chimeSound');

// ---------------- Snowflakes ----------------
function createSnowflakes(count = 60) {
  const snowContainer = document.querySelector('.snow');
  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.textContent = '❄';
    const size = Math.random() * 12 + 8;
    flake.style.fontSize = size + 'px';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.top = (-Math.random() * 100) + 'px';
    const duration = Math.random() * 8 + 7;
    flake.style.animationDuration = duration + 's';
    flake.style.opacity = Math.random() * 0.5 + 0.5;
    snowContainer.appendChild(flake);
  }
}

// ---------------- Sparkles ----------------
function generateSparkles(count = 40) {
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    card.appendChild(sparkle);
  }
}

// ---------------- Typing Animation ----------------
function typeSpeech(element, text, speed = 80, callback) {
  let i = 0;
  element.textContent = '';
  element.style.opacity = 1;
  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

// ---------------- First click enables knock sound ----------------
let knockEnabled = false;
window.addEventListener('click', () => {
  if (!knockEnabled) {
    knockSound.play().catch(e => console.log("Audio blocked:", e));
    knockEnabled = true;
  }
}, { once: true });

// ---------------- Girl & Speech Sequence ----------------
function showGirlSequence() {
  // Step 1: "Knock knock…"
  typeSpeech(speech, "Knock knock…", 120, () => {
    setTimeout(() => {
      // Step 2: "Hey… r u there?"
      typeSpeech(speech, "Hey… r u there?", 100, () => {
        setTimeout(() => {
          speech.style.opacity = 0;
          // Show girl
          girl.style.left = "120px";
          girl.style.opacity = 1;

          setTimeout(() => {
            // Step 3: Door opens
            openDoor();

            setTimeout(() => {
              // Step 4: "I have something for you 🤍"
              typeSpeech(speech, "I have something for you 🤍", 100, () => {
                setTimeout(() => {
                  speech.style.opacity = 0;
                }, 1500);
              });
            }, 2200); // Wait until door animation completes
          }, 500);

        }, 1200);
      });
    }, 1000);
  });
}

// ---------------- Door ----------------
function openDoor() {
  door.style.transform = "rotateY(-120deg)";
  setTimeout(() => {
    envelope.classList.remove('hidden');
  }, 2000);
}

// ---------------- Envelope Open ----------------
envelope.addEventListener('click', () => {
  chimeSound.play().catch(e => console.log("Audio blocked:", e));

  // 3D fold & shrink
  fold.style.transform = "rotateX(180deg)";
  envelope.style.transform = "translate(-50%, 50%) scale(0.1) rotateX(180deg)";

  // Sparkle burst
  for (let i = 0; i < 20; i++) {
    const burst = document.createElement('div');
    burst.classList.add('sparkle');
    burst.style.top = '50%';
    burst.style.left = '50%';
    const dx = Math.random() * 200 - 100;
    const dy = Math.random() * -200;
    burst.style.transform = `translate(${dx}px, ${dy}px)`;
    burst.style.animationDuration = (Math.random() * 0.8 + 0.5) + 's';
    card.appendChild(burst);
  }

  setTimeout(() => {
    envelope.classList.add('hidden');
    door.classList.add('hidden');
    document.body.style.background = "#a8c8e4ff"; // card bg
    card.classList.remove('hidden');
    generateSparkles(40);
  }, 800);
});

// ---------------- On Load ----------------
window.onload = () => {
  createSnowflakes(60);
  showGirlSequence();
};
