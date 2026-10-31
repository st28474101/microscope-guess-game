const dbReady=!!window.FIREBASE_CONFIG;
if(dbReady){firebase.initializeApp(window.FIREBASE_CONFIG);}
const $=s=>document.querySelector(s);
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function currentModeTeacher(){return document.body.dataset.mode==='teacher'}
function currentClass(){return $('#classFilter')?$('#classFilter').value:'all'}
window.hiddenQuestionIds={};
function filteredPhotos(){
  let selectedClass=currentClass();
  let selectedSeat=$('#seat').value;
  return window.PHOTOS.filter(p=>(selectedClass==='all'||(p.class||p.seat.slice(0,3))===selectedClass) && (selectedSeat==='all'||p.seat===selectedSeat) && (currentModeTeacher()||!window.hiddenQuestionIds[p.id]));
}
function photoCards(teacher=false){
  let list=filteredPhotos();
  $('#count').textContent=`共 ${list.length} 張照片`;
  $('#cards').innerHTML=list.map(p=>`<article class="card" style="${teacher&&window.hiddenQuestionIds[p.id]?'outline:3px solid #d97706;opacity:.67;':''}"><img src="${p.src}" alt="${p.seat} 顯微鏡照片" data-img="${p.src}"><div class="body"><b>${p.seat}</b> <span class="small">${p.class||p.seat.slice(0,3)} 班｜${esc(p.filename)}</span>${teacher?`<input class="answer-input" id="a_${p.id}" placeholder="輸入正確答案（老師專用）"><div class="two"><button data-reveal="${p.id}">公布</button><button class="alt" data-hide="${p.id}">隱藏答案</button><button class="alt" data-question-toggle="${p.id}">${window.hiddenQuestionIds[p.id]?'恢復題目':'移除錯題'}</button></div>`:`<input class="answer-input" placeholder="我猜是……" aria-label="猜測答案" data-guess="${p.id}"><div class="answer hidden" id="r_${p.id}"></div>`}</div></article>`).join('');
  document.querySelectorAll('[data-img]').forEach(el=>el.onclick=()=>{$('#zoomimg').src=el.dataset.img;$('#zoom').showModal()});
}
function seatOptions(){
  let selectedClass=currentClass();
  let seats=[...new Set(window.PHOTOS.filter(p=>selectedClass==='all'||(p.class||p.seat.slice(0,3))===selectedClass).map(p=>p.seat))].sort();
  $('#seat').innerHTML='<option value="all">全部座號</option>'+seats.map(s=>`<option>${s}</option>`).join('');
}
function classOptions(){
  if(!$('#classFilter')) return;
  let classes=[...new Set(window.PHOTOS.map(p=>p.class||p.seat.slice(0,3)))].sort();
  $('#classFilter').innerHTML='<option value="all">全部班級</option>'+classes.map(c=>`<option value="${c}">${c} 班</option>`).join('');
}
function init(){
  classOptions();
  seatOptions();
  if($('#classFilter')) $('#classFilter').onchange=()=>{seatOptions(); photoCards(currentModeTeacher()); if(window.afterCardsRendered) setTimeout(window.afterCardsRendered,0);};
  $('#seat').onchange=()=>{photoCards(currentModeTeacher()); if(window.afterCardsRendered) setTimeout(window.afterCardsRendered,0);};
  photoCards(currentModeTeacher());
  if(window.afterCardsRendered) setTimeout(window.afterCardsRendered,0);
  $('#closeZoom').onclick=()=>$('#zoom').close();
}
