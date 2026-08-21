const canvas = document.getElementById('traceCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
function position(e) { const r = canvas.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return { x: (p.clientX-r.left)*canvas.width/r.width, y: (p.clientY-r.top)*canvas.height/r.height }; }
function start(e){ drawing=true; const p=position(e); ctx.beginPath();ctx.moveTo(p.x,p.y); }
function draw(e){ if(!drawing)return; e.preventDefault(); const p=position(e);ctx.lineTo(p.x,p.y);ctx.strokeStyle='#db7045';ctx.lineWidth=6;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(); }
function stop(){drawing=false}
canvas.addEventListener('pointerdown',start);canvas.addEventListener('pointermove',draw);window.addEventListener('pointerup',stop);
function clearCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height)}
function speak(words){if(!('speechSynthesis' in window))return; speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(words);u.lang='id-ID';u.rate=.8;speechSynthesis.speak(u)}
function playWelcome(){speak('Sugeng rawuh. Welcome to Java.')}
function openModal(html){document.getElementById('modalContent').innerHTML=html;document.getElementById('modal').classList.add('show');document.getElementById('modal').setAttribute('aria-hidden','false')}
function closeModal(){document.getElementById('modal').classList.remove('show');document.getElementById('modal').setAttribute('aria-hidden','true')}
function openLesson(level){const lessons={easy:['Easy: First steps in Java','Start with greetings, numbers, and familiar cultural landmarks. Your first lesson is “Sugeng Rawuh” — a Javanese welcome.'],medium:['Medium: Living traditions','Explore the stories of batik, gamelan, and shared meals. You’ll earn 40 XP by completing this path.'],hard:['Hard: Aksara & philosophy','Challenge yourself with sentence reading, pronunciation, and the Javanese idea of harmony: rukun.']};const l=lessons[level];openModal(`<p class="eyebrow">${level.toUpperCase()} PATH</p><h2>${l[0]}</h2><p>${l[1]}</p><button class="button primary" onclick="closeModal();document.querySelector('#practice').scrollIntoView({behavior:'smooth'})">Begin lesson →</button>`)}
function openVideo(){openModal('<p class="eyebrow">CULTURE VIDEO · 5 MIN</p><h2>Gudeg: a taste of Yogyakarta</h2><div class="video-placeholder">▶</div><p>Press play to begin the lesson. In a full course, this space can embed your chosen instructional video.</p>')}
let recognition;
function toggleRecording(){const btn=document.getElementById('recordBtn'), status=document.getElementById('speechStatus');if(!('webkitSpeechRecognition' in window||'SpeechRecognition' in window)){status.textContent='Speech practice is best supported in Chrome.';return}if(recognition){recognition.stop();return}const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;recognition=new SpeechRecognition();recognition.lang='id-ID';recognition.onstart=()=>{btn.classList.add('active');btn.innerHTML='<span>●</span> Listening…';status.textContent='Say: Sugeng enjing';};recognition.onresult=e=>{status.textContent=`Great effort! We heard: “${e.results[0][0].transcript}”`;};recognition.onerror=()=>status.textContent='We couldn’t hear that. Try once more.';recognition.onend=()=>{btn.classList.remove('active');btn.innerHTML='<span>●</span> Tap to speak';recognition=null};recognition.start()}
