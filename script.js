// ---------------- Elements ----------------
const girl = document.getElementById('girl');
const speech = document.getElementById('speech');
const door = document.getElementById('door');
const envelope = document.getElementById('envelope');
const fold = document.querySelector('.envelope .fold');
const card = document.getElementById('card');
const knockSound = document.getElementById('knockSound');
const chimeSound = document.getElementById('chimeSound');
const cardText = document.getElementById('card-text');
const cardTitle = document.getElementById('card-title');

// ---------------- Typing effect for card ----------------
function typeCardText(element, text, speed = 50, callback){
  let i = 0;
  element.textContent = '';
  const interval = setInterval(()=>{
    element.textContent += text.charAt(i);
    i++;
    element.scrollTop = element.scrollHeight; // auto scroll while typing
    if(i >= text.length){
      clearInterval(interval);
      if(callback) callback();
    }
  }, speed);
}

// ---------------- Snow ----------------
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
    flake.style.animationDuration = (Math.random() * 8 + 7) + 's';
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

// ---------------- Floating hearts ----------------
function createFloatingHearts(count = 20){
  for(let i=0;i<count;i++){
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'absolute';
    heart.style.left = Math.random()*100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.fontSize = (Math.random()*12 + 14) + 'px';
    heart.style.animation = `heartFloat ${Math.random()*3+4}s linear infinite`;
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
    setTimeout(()=> heart.remove(),7000);
  }
}

// ---------------- Fireworks ----------------
function launchFirework(){
  const fw = document.createElement('div');
  fw.style.position = 'absolute';
  fw.style.left = Math.random()*100 + 'vw';
  fw.style.top = Math.random()*40 + 'vh';
  fw.style.width = '6px';
  fw.style.height = '6px';
  fw.style.borderRadius = '50%';
  fw.style.background = 'gold';
  fw.style.boxShadow = '0 0 15px gold';
  fw.style.animation = 'firework 1.2s ease-out forwards';
  document.body.appendChild(fw);
  setTimeout(()=>fw.remove(),1200);
}

// ---------------- Night → Morning ----------------
function nightToMorning(){
  document.body.style.background = '#0b132b'; // night
  setTimeout(()=>{ document.body.style.background = '#1c2541'; },1500);
  setTimeout(()=>{ document.body.style.background = '#a8c8e4'; },3000);
}

// ---------------- Speech typing ----------------
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

// ---------------- Knock sound first click ----------------
let knockEnabled = false;
window.addEventListener('click', () => {
  if (!knockEnabled) {
    knockSound.play().catch(e => console.log("Audio blocked:", e));
    knockEnabled = true;
  }
}, { once: true });

// ---------------- Girl & Speech Sequence ----------------
function showGirlSequence() {
  typeSpeech(speech, "Knock knock…", 120, () => {
    setTimeout(()=>{
      typeSpeech(speech, "Hey… r u there?", 100, ()=>{
        setTimeout(()=>{
          speech.style.opacity = 0;
          girl.style.left = "120px";
          girl.style.opacity = 1;

          setTimeout(()=>{
            openDoor();
            setTimeout(()=>{
              typeSpeech(speech, "I have something for you 🤍", 100, ()=>{
                setTimeout(()=> speech.style.opacity=0,1500);
              });
            },2200);
          },500);
        },1200);
      });
    },1000);
  });
}

// ---------------- Door ----------------
function openDoor() {
  door.style.transform = "rotateY(-120deg)";
  setTimeout(()=>{ envelope.classList.remove('hidden'); },2000);
}

// ---------------- Envelope click ----------------
envelope.addEventListener('click', () => {
  chimeSound.play().catch(()=>{});

  fold.style.transform = "rotateX(180deg)";
  envelope.style.transform = "translate(-50%, 50%) scale(0.1) rotateX(180deg)";

  createFloatingHearts(25);

  for(let i=0;i<20;i++){
    const burst = document.createElement('div');
    burst.classList.add('sparkle');
    burst.style.top='50%';
    burst.style.left='50%';
    burst.style.transform = `translate(${Math.random()*200-100}px,${Math.random()*-200}px)`;
    burst.style.animationDuration=(Math.random()*0.8+0.5)+'s';
    card.appendChild(burst);
  }

  setTimeout(()=>{
    envelope.classList.add('hidden');
    door.classList.add('hidden');
    nightToMorning();
    card.classList.remove('hidden');
    generateSparkles(40);
    showCardWish();
    setInterval(launchFirework,900);
  },900);
});

// ---------------- Show card wish ----------------
function showCardWish(){
  const message = `May this new year bring joy that warms your heart,
moments that make you smile,
and dreams that light your soul.

I wish for you to stay happy,
to be loved endlessly,
and always remain a precious part of my life 🤍

May 2026 be filled with laughter, love,
and beautiful memories we share together.`;

  typeCardText(cardText, message, 50);
}

// ---------------- On Load ----------------
window.onload = ()=>{
  createSnowflakes(60);
  showGirlSequence();
};
