const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const KEY = 'studio-os-v15-data';
const OLD_KEYS = ['studio-os-v14-data','studio-os-v13-data','studio-os-v12-data','studio-os-v11-data','studio-os-v10-data','studio-os-v09-data','studio-os-v08-data'];
const VERSION = '1.5';

const seed = {
  tasks: [
    {id:'t1', title:'SAMS · PDF 출력', timing:'오늘 · 2시간', status:'우선', bucket:'today', done:false, createdAt:Date.now()-3000},
    {id:'t2', title:'Studio OS v1.0 사용 확인', timing:'오늘 · 30분', status:'검토', bucket:'today', done:false, createdAt:Date.now()-2000},
    {id:'t3', title:'BPM 검색 기준 점검', timing:'이번 주', status:'예정', bucket:'next', done:false, createdAt:Date.now()-1000},
    {id:'t4', title:'BECO 1.8.4 통합', timing:'다음 주', status:'대기', bucket:'next', done:false, createdAt:Date.now()}
  ],
  memories: [
    {id:'m1', title:'v0.6 UI Baseline 확정', detail:'현재 카드 규격과 간격을 이후 버전의 기준으로 사용한다.', type:'Freeze', date:'오늘'},
    {id:'m2', title:'v0.7 Interaction 만족', detail:'화면 전환, 검색, 알림, 완료 반응을 유지한다.', type:'Decision', date:'오늘'},
    {id:'m3', title:'중복 페이지 열기 버튼 제거', detail:'카드 이동은 상단 전체 보기로 통일한다.', type:'Change', date:'8월 4일'}
  ],
  ideas: [
    {id:'b1', text:'Studio OS 페이지 간 이동 최소화', project:'Studio OS', date:'오늘'},
    {id:'b2', text:'SAMS 현장 화면을 태그번호 중심으로 단순화', project:'SAMS', date:'어제'},
    {id:'b3', text:'Game core loop를 30초 안에 설명하기', project:'Game', date:'7월 31일'}
  ],
  daily: { lastStart:null, lastClose:null, focusMinutes:0, sessions:0 },
  projects: [
    {id:'p1',name:'Studio OS',desc:'개인 운영체제',progress:100,status:'Active',current:'Knowledge & Constitution',next:'v1.1 운영 검증'},
    {id:'p2',name:'SAMS',desc:'설비 자산관리',progress:78,status:'Active',current:'데이터 구조',next:'현장 테스트'},
    {id:'p3',name:'BPM 검색도우미',desc:'자재 가격 판단',progress:72,status:'Active',current:'검색 정교화',next:'데이터 검증'},
    {id:'p4',name:'BECO Bowling',desc:'동호회 운영',progress:81,status:'Active',current:'프로필 수정',next:'1.8.4 통합'},
    {id:'p5',name:'하루1분',desc:'습관형 콘텐츠 앱',progress:34,status:'Planning',current:'구조 설계',next:'UI 시안'},
    {id:'p6',name:'Game Project',desc:'아이디어 검증 게임',progress:12,status:'Paused',current:'코어 루프',next:'재개 판단'}
  ],
  constitution: [
    {id:'C-OS-001',title:'기준 버전 유지 원칙',chapter:'Operating System',status:'Approved',content:'Studio OS의 UI, 레이아웃, 인터랙션과 데이터 구조는 공식 기준 버전을 유지하고 이후 변경은 필요한 요소만 추가·축소·개선한다.',scope:'전체 프로젝트',projects:['Studio OS','SAMS','BPM 검색도우미','BECO Bowling','하루1분'],related:['C-UI-001','C-PJT-001'],note:'v1.0 최종본을 공식 UI 기준으로 지정',favorite:true,updated:'2026-08-04'},
    {id:'C-UI-001',title:'Edge-to-edge 및 단일 SafeArea',chapter:'UI',status:'Approved',content:'Flutter 앱은 투명 상태바와 Edge-to-edge를 기본으로 하며, 중첩 SafeArea 없이 단일 SafeArea 구조를 사용한다.',scope:'Flutter 프로젝트',projects:['SAMS','BPM 검색도우미','BECO Bowling','하루1분'],related:['C-OS-001','C-ARC-001'],note:'Android 시스템 UI 기본 규칙',favorite:true,updated:'2026-08-01'},
    {id:'C-ARC-001',title:'Flutter 기본 아키텍처',chapter:'Architecture',status:'Approved',content:'기능과 데이터가 확장되더라도 화면 구조와 데이터 계층을 분리하고, 프로젝트별 기준 구조를 명시적으로 유지한다.',scope:'Flutter 프로젝트',projects:['SAMS','BPM 검색도우미','BECO Bowling','하루1분'],related:['C-UI-001'],note:'변경 전 영향분석 필수',favorite:false,updated:'2026-08-04'},
    {id:'C-DOC-001',title:'고정 템플릿 레이아웃',chapter:'Document',status:'Approved',content:'확정된 보고서와 문서 템플릿은 페이지 구조와 카드 크기를 유지하고 내용만 교체한다.',scope:'문서 프로젝트',projects:['Studio OS'],related:['C-OS-001'],note:'월간 계획·결과 보고 포함',favorite:false,updated:'2026-07-24'},
    {id:'C-PJT-001',title:'프로젝트 버전 관리',chapter:'Project',status:'Approved',content:'기준 버전은 Freeze하고 이후 변경은 버전 번호, 변경내용, 영향범위를 기록한다.',scope:'전체 프로젝트',projects:['Studio OS','SAMS','BPM 검색도우미','BECO Bowling','하루1분'],related:['C-OS-001'],note:'Decision Log와 연결',favorite:true,updated:'2026-08-04'},
    {id:'C-DATA-001',title:'로컬 데이터 우선',chapter:'Data',status:'Candidate',content:'개인 운영 데이터와 단순 조회 데이터는 외부 서버가 필수가 아닌 경우 로컬 저장을 우선 검토한다.',scope:'선택 프로젝트',projects:['Studio OS','BPM 검색도우미'],related:['C-ARC-001'],note:'보안·협업 요구 시 재검토',favorite:false,updated:'2026-08-04'}
  ],
  decisions:[
    {id:'D-001',title:'Studio OS v1.0 UI를 공식 기준본으로 지정',status:'Approved',project:'Studio OS',date:'2026-08-04',detail:'v1.1은 리디자인이 아니라 기존 인터페이스에 Governance Engine을 패치한다.'},
    {id:'D-002',title:'Impact Analysis를 Constitution 핵심 기능으로 채택',status:'Approved',project:'Studio OS',date:'2026-08-04',detail:'조항 변경 전 영향 프로젝트와 영향도를 확인한다.'}
  ],
  candidates:[
    {id:'K-001',title:'모든 신규 프로젝트에 Constitution 적용률 표시',status:'Review',source:'대표 제안',date:'2026-08-04',detail:'프로젝트별 적용 조항 비율을 대시보드에서 확인한다.'}
  ],
  constitutionPacks:[
    {id:'PACK-COMMON',name:'Common Core',type:'Common',desc:'모든 프로젝트의 운영 기준',ruleIds:['C-OS-001','C-PJT-001'],required:['C-OS-001','C-PJT-001']},
    {id:'PACK-APP',name:'App Development',type:'App',desc:'앱 기획·개발·출시 기본 규칙',ruleIds:['C-UI-001','C-ARC-001','C-DATA-001','C-PJT-001'],required:['C-UI-001','C-PJT-001']},
    {id:'PACK-GAME',name:'Game Development',type:'Game',desc:'게임 MVP와 운영 기준',ruleIds:['C-ARC-001','C-PJT-001','C-DATA-001'],required:['C-PJT-001']},
    {id:'PACK-MUSIC',name:'Music Production',type:'Music',desc:'음원 제작·버전·배포 기준',ruleIds:['C-PJT-001','C-DOC-001'],required:['C-PJT-001']},
    {id:'PACK-VIDEO',name:'Video Production',type:'Video',desc:'영상 제작·출력·자산 기준',ruleIds:['C-PJT-001','C-DOC-001'],required:['C-PJT-001']},
    {id:'PACK-DOC',name:'Document',type:'Document',desc:'문서와 보고서 템플릿 기준',ruleIds:['C-DOC-001','C-PJT-001'],required:['C-DOC-001']}
  ],
  presets:[
    {id:'PRESET-FLUTTER',name:'Flutter Internal App',type:'App',packIds:['PACK-COMMON','PACK-APP'],dna:['App','Flutter','Internal Tool','Local First']},
    {id:'PRESET-GAME',name:'Idea Validation Game',type:'Game',packIds:['PACK-COMMON','PACK-GAME'],dna:['Game','MVP','Core Loop','Monetization Test']},
    {id:'PRESET-MUSIC',name:'Shorts Music',type:'Music',packIds:['PACK-COMMON','PACK-MUSIC'],dna:['Music','Short-form','AI Workflow','Master Export']},
    {id:'PRESET-VIDEO',name:'Short-form Video',type:'Video',packIds:['PACK-COMMON','PACK-VIDEO'],dna:['Video','9:16','Short-form','Export Checklist']},
    {id:'PRESET-DOC',name:'Fixed Report',type:'Document',packIds:['PACK-COMMON','PACK-DOC'],dna:['Document','Fixed Layout','Editable Text']}
  ],
  projectConstitutions:[],
  developmentRecords:[],
  aiSessions:[],
  digitalAssets:[],
  assetView:'masters',
  assetFilter:'All',
  ideaSnippets:[],
  knowledgeTab:'overview'
};

function clone(x){return JSON.parse(JSON.stringify(x));}
function loadData(){
  try{
    const raw = localStorage.getItem(KEY) || OLD_KEYS.map(k=>localStorage.getItem(k)).find(Boolean);
    const saved=raw?JSON.parse(raw):null;
    if(saved?.tasks && saved?.projects){ localStorage.setItem(KEY,JSON.stringify(saved)); return saved; }
  }catch(e){}
  const d=clone(seed); localStorage.setItem(KEY,JSON.stringify(d)); return d;
}
let data=loadData();
if(!data.daily) data.daily={lastStart:null,lastClose:null,focusMinutes:0,sessions:0};
if(!data.constitution) data.constitution=clone(seed.constitution);
if(!data.decisions) data.decisions=clone(seed.decisions);
if(!data.candidates) data.candidates=clone(seed.candidates);
if(!data.knowledgeTab) data.knowledgeTab='overview';
if(!data.constitutionPacks) data.constitutionPacks=clone(seed.constitutionPacks);
if(!data.presets) data.presets=clone(seed.presets);
if(!data.projectConstitutions) data.projectConstitutions=[];
if(!data.developmentRecords) data.developmentRecords=[];
if(!data.aiSessions) data.aiSessions=[];
if(!data.digitalAssets) data.digitalAssets=[];
if(!data.ideaSnippets) data.ideaSnippets=[];
function saveData(next=data){data=next;localStorage.setItem(KEY,JSON.stringify(data));updateBadges();}
function uid(prefix){return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;}
function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

const navItems=[
 {id:'home',label:'Home',ico:'⌂'},
 {id:'tasks',label:'일정',ico:'✓'},
 {id:'projects',label:'Projects',ico:'↗'},
 {id:'brain',label:'Ideas',ico:'◌'},
 {id:'development',label:'AI Discussion',ico:'◎'},
 {id:'assets',label:'Assets',ico:'□'},
 {id:'knowledge',label:'Knowledge',ico:'◇'},
 {id:'memory',label:'History',ico:'≡'},
 {id:'roadmap',label:'Roadmap',ico:'⌁'},
 {id:'system',label:'System',ico:'⚙'}
];
let current='home';
const pages={home:renderHome,tasks:renderTasks,memory:renderMemory,projects:renderProjects,brain:renderIdeas,development:renderDevelopment,assets:renderAssetsV14,knowledge:renderKnowledge,review:renderReview,roadmap:renderRoadmap,system:renderSystem};

function counts(){return {tasks:data.tasks.filter(t=>!t.done).length,memory:data.memories.length,projects:data.projects.length,brain:data.ideas.length};}
function buildNav(){
  const c=counts(); const badge={tasks:c.tasks,memory:c.memory,projects:c.projects,brain:c.brain,assets:data.digitalAssets.length};
  $('#nav').innerHTML=`<div class="nav-group"><div class="nav-label">Workspace</div>${navItems.slice(0,8).map(n=>`<button class="nav-item ${n.id===current?'active':''}" data-page="${n.id}"><span class="ico">${n.ico}</span><span>${n.label}</span>${badge[n.id]?`<span class="badge">${badge[n.id]}</span>`:''}</button>`).join('')}</div><div class="nav-group"><div class="nav-label">Control</div>${navItems.slice(8).map(n=>`<button class="nav-item ${n.id===current?'active':''}" data-page="${n.id}"><span class="ico">${n.ico}</span><span>${n.label}</span></button>`).join('')}</div>`;
  $$('.nav-item').forEach(b=>b.onclick=()=>go(b.dataset.page));
}
function updateBadges(){buildNav();}
function go(id){
  current=id; buildNav(); $('#pageName').textContent=navItems.find(n=>n.id===id)?.label||id; pages[id]();
  $('.sidebar').classList.remove('open');
  const content=$('#content');content.classList.remove('page-enter');void content.offsetWidth;content.classList.add('page-enter');
  window.scrollTo({top:0,behavior:'smooth'});
}

function aiInsights(){
  const open=data.tasks.filter(t=>!t.done);
  const active=data.projects.filter(p=>p.status==='Active');
  const paused=data.projects.filter(p=>p.status==='Paused');
  const focus=open.find(t=>t.status==='우선')||open[0];
  const weakest=[...active].sort((a,b)=>a.progress-b.progress)[0];
  const strongest=[...active].sort((a,b)=>b.progress-a.progress)[0];
  const suggestions=[];
  if(focus) suggestions.push({title:'지금 시작',text:focus.title,detail:focus.timing,action:"go('tasks')"});
  if(paused[0]) suggestions.push({title:'멈춘 프로젝트',text:paused[0].name,detail:`${paused[0].progress}% · 재개 판단 필요`,action:`openProject('${paused[0].id}')`});
  if(data.ideas.length) suggestions.push({title:'새로운 아이디어',text:`Brain ${data.ideas.length}건`,detail:data.ideas[0].text,action:"go('brain')"});
  return {open,active,paused,focus,weakest,strongest,suggestions};
}
function reviewStats(){
  const done=data.tasks.filter(t=>t.done).length;
  const total=data.tasks.length;
  const avg=data.projects.length?Math.round(data.projects.reduce((s,p)=>s+p.progress,0)/data.projects.length):0;
  return {done,total,rate:total?Math.round(done/total*100):0,avg,ideas:data.ideas.length,memories:data.memories.length};
}
function renderHome(){
  const d=new Date(); const date=d.toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'}); const c=counts();
  const openTasks=data.tasks.filter(t=>!t.done); const focus=openTasks[0];
  $('#content').innerHTML=`
  <div class="hero"><div><span class="eyebrow">Operation Home</span><h1>안녕하세요, 대표님.</h1><p>실제 데이터를 읽고 오늘의 우선순위와 운영 신호를 정리합니다.</p></div><div class="date-block"><strong>${date}</strong><small>Studio OS v1.2</small></div></div>
  <div class="brief-card"><div><span class="brief-tag">DAILY OS · MORNING BRIEF</span><h2>${focus?`${esc(focus.title)}부터<br>집중하는 것을 추천합니다.`:'오늘 할일은 정리됐습니다.<br>주간 리뷰를 확인해보세요.'}</h2><p>${focus?`${esc(focus.timing)} · 현재 미완료 작업 ${c.tasks}건`:'새로운 작업을 추가하거나 Brain을 정리해보세요.'}</p><div class="daily-actions"><button class="primary-btn" onclick="${focus?`go('tasks')`:`openTaskModal()`}">${focus?'할일 보기':'할일 추가'}</button><button class="tab" onclick="startDailySession()">오늘 시작</button><button class="tab" onclick="closeDailySession()">오늘 마감</button></div></div><div class="brief-metrics"><div class="metric"><small>미완료 할일</small><strong>${c.tasks}</strong></div><div class="metric"><small>메모리</small><strong>${c.memory}</strong></div><div class="metric"><small>프로젝트</small><strong>${c.projects}</strong></div><div class="metric"><small>브레인</small><strong>${c.brain}</strong></div></div></div>
  <section class="ai-workspace panel"><div class="panel-head"><div><span class="eyebrow">AI Workspace</span><h3>오늘의 운영 제안</h3></div><button onclick="go('review')">주간 리뷰</button></div><div class="ai-suggestion-grid">${aiInsights().suggestions.slice(0,3).map(x=>`<button class="ai-suggestion" onclick="${x.action}"><small>${esc(x.title)}</small><strong>${esc(x.text)}</strong><span>${esc(x.detail)}</span></button>`).join('')||emptyLine('분석할 데이터가 없습니다.')}</div></section>
  <div class="home-split-grid">
    <section class="panel home-split-card"><div class="panel-head"><h3>할일</h3><button onclick="go('tasks')">전체 보기</button></div><div class="card-body task-list">${openTasks.slice(0,3).map(taskRow).join('')||emptyLine('미완료 할일이 없습니다.')}</div></section>
    <section class="panel home-split-card"><div class="panel-head"><h3>메모리</h3><button onclick="go('memory')">전체 기록</button></div><div class="card-body memory-list">${data.memories.slice(0,3).map(m=>`<div class="memory-compact" onclick="go('memory')"><strong>${esc(m.title)}</strong><small>${esc(m.detail)}</small></div>`).join('')||emptyLine('저장된 메모리가 없습니다.')}</div></section>
    <section class="panel home-split-card"><div class="panel-head"><h3>프로젝트</h3><button onclick="go('projects')">전체 보기</button></div><div class="card-body project-compact-list">${data.projects.slice(0,3).map(p=>`<div class="project-compact" onclick="openProject('${p.id}')"><div><strong>${esc(p.name)}</strong><small>${esc(p.current)} → ${esc(p.next)}</small><div class="progress"><span style="width:${p.progress}%"></span></div></div><b>${p.progress}%</b></div>`).join('')||emptyLine('프로젝트가 없습니다.')}</div></section>
    <section class="panel home-split-card"><div class="panel-head"><h3>브레인</h3><button onclick="go('brain')">전체 보기</button></div><div class="card-body brain-compact-list">${data.ideas.slice(0,3).map(i=>`<div class="brain-compact" onclick="go('brain')"><strong>${esc(i.text)}</strong><small>${esc(i.date)} · ${esc(i.project)}</small></div>`).join('')||emptyLine('새 아이디어를 저장해보세요.')}</div></section>
  </div>`;
  attachTaskHandlers();
}
function emptyLine(text){return `<div class="empty-line">${text}</div>`;}
function taskRow(t){return `<div class="task-row ${t.done?'done':''}" data-task="${t.id}"><span class="task-check">${t.done?'✓':''}</span><div><strong>${esc(t.title)}</strong><small>${esc(t.timing)}</small></div><span class="status">${esc(t.status)}</span></div>`;}
function attachTaskHandlers(){
  $$('.task-row[data-task]').forEach(row=>row.onclick=(e)=>{e.stopPropagation();toggleTask(row.dataset.task)});
}
function toggleTask(id){const t=data.tasks.find(x=>x.id===id);if(!t)return;t.done=!t.done;saveData();toast(t.done?'할일을 완료했습니다.':'완료를 취소했습니다.');pages[current]();attachTaskHandlers();}

function renderTasks(){
  const today=data.tasks.filter(t=>t.bucket==='today'); const next=data.tasks.filter(t=>t.bucket==='next');
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Today & next</span><h1>할일</h1><p>추가·완료·삭제한 내용이 현재 브라우저에 저장됩니다.</p></div><div class="page-actions"><button class="primary-btn compact" onclick="openTaskModal()">+ 할일 추가</button><button class="tab" onclick="clearDoneTasks()">완료 항목 정리</button></div><div class="tasks-page-grid"><div class="panel"><div class="panel-head"><h3>오늘</h3><small>${today.filter(t=>!t.done).length} open</small></div><div class="task-list">${today.map(taskRowDetailed).join('')||emptyLine('오늘 할일이 없습니다.')}</div></div><div class="panel"><div class="panel-head"><h3>다음</h3><small>${next.filter(t=>!t.done).length} open</small></div><div class="task-list">${next.map(taskRowDetailed).join('')||emptyLine('다음 할일이 없습니다.')}</div></div></div>`;
  attachTaskHandlers(); $$('.task-delete').forEach(b=>b.onclick=e=>{e.stopPropagation();deleteTask(b.dataset.id)});
}
function taskRowDetailed(t){return `<div class="task-row ${t.done?'done':''}" data-task="${t.id}"><span class="task-check">${t.done?'✓':''}</span><div><strong>${esc(t.title)}</strong><small>${esc(t.timing)}</small></div><div class="task-actions"><span class="status">${esc(t.status)}</span><button class="task-delete" data-id="${t.id}" title="삭제">×</button></div></div>`;}
function deleteTask(id){data.tasks=data.tasks.filter(t=>t.id!==id);saveData();renderTasks();toast('할일을 삭제했습니다.');}
function clearDoneTasks(){const before=data.tasks.length;data.tasks=data.tasks.filter(t=>!t.done);saveData();renderTasks();toast(`${before-data.tasks.length}개 완료 항목을 정리했습니다.`);}
function openTaskModal(){openModal('할일 추가',`<label>할일<input id="fTitle" placeholder="예: SAMS 현장 테스트"></label><div class="form-grid"><label>구분<select id="fBucket"><option value="today">오늘</option><option value="next">다음</option></select></label><label>상태<select id="fStatus"><option>우선</option><option>검토</option><option>예정</option><option>대기</option></select></label></div><label>예상/일정<input id="fTiming" placeholder="예: 오늘 · 1시간"></label>`, addTaskFromModal);}
function addTaskFromModal(){const title=$('#fTitle').value.trim();if(!title)return toast('할일 내용을 입력해주세요.');data.tasks.unshift({id:uid('t'),title,bucket:$('#fBucket').value,status:$('#fStatus').value,timing:$('#fTiming').value.trim()||'일정 미정',done:false,createdAt:Date.now()});saveData();closeModal();go('tasks');toast('할일을 저장했습니다.');}

function renderMemory(){
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Decision & context</span><h1>메모리</h1><p>결정과 변경 맥락을 직접 기록하고 보관합니다.</p></div><div class="page-actions"><button class="primary-btn compact" onclick="openMemoryModal()">+ 메모리 추가</button></div><div class="panel">${data.memories.map(m=>`<div class="memory-row"><small>${esc(m.date)}</small><div><strong>${esc(m.title)}</strong><p>${esc(m.detail)}</p></div><div class="memory-tools"><span class="status">${esc(m.type)}</span><button onclick="deleteMemory('${m.id}')">×</button></div></div>`).join('')||emptyLine('기록된 메모리가 없습니다.')}</div>`;
}
function openMemoryModal(){openModal('메모리 추가',`<label>제목<input id="mTitle" placeholder="결정 또는 변경 제목"></label><label>상세<textarea id="mDetail" placeholder="왜 결정했는지, 무엇이 바뀌었는지"></textarea></label><div class="form-grid"><label>유형<select id="mType"><option>Decision</option><option>Freeze</option><option>Change</option><option>Note</option></select></label><label>날짜<input id="mDate" value="오늘"></label></div>`, addMemoryFromModal);}
function addMemoryFromModal(){const title=$('#mTitle').value.trim();if(!title)return toast('제목을 입력해주세요.');data.memories.unshift({id:uid('m'),title,detail:$('#mDetail').value.trim()||'상세 내용 없음',type:$('#mType').value,date:$('#mDate').value.trim()||'오늘'});saveData();closeModal();go('memory');toast('메모리에 저장했습니다.');}
function deleteMemory(id){data.memories=data.memories.filter(m=>m.id!==id);saveData();renderMemory();toast('메모리를 삭제했습니다.');}

function renderProjects(){
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Project overview</span><h1>Projects</h1><p>v0.6 카드 규격 안에서 실제 프로젝트 상태를 편집합니다.</p></div><div class="page-actions"><button class="primary-btn compact" onclick="openProjectWizard()">+ 프로젝트 생성</button></div><div class="section-tabs"><button class="tab active">All ${data.projects.length}</button><button class="tab">Active ${data.projects.filter(p=>p.status==='Active').length}</button><button class="tab">Planning ${data.projects.filter(p=>p.status==='Planning').length}</button><button class="tab">Paused ${data.projects.filter(p=>p.status==='Paused').length}</button></div><div class="project-classic-grid">${data.projects.map(projectCard).join('')||emptyLine('프로젝트를 추가해주세요.')}</div>`;
}
function projectCard(p){return `<article class="project-classic-card" onclick="openProject('${p.id}')"><div class="project-card-top"><div><h3>${esc(p.name)}</h3><div class="project-card-meta">${esc(p.desc)}</div></div><span class="status ${p.status==='Paused'?'paused':''}">${esc(p.status)}</span></div><div class="project-progress"><span style="width:${p.progress}%"></span></div><div class="project-card-stats"><div class="project-card-stat"><small>Current</small><strong>${esc(p.current)}</strong></div><div class="project-card-stat"><small>Next</small><strong>${esc(p.next)}</strong></div></div><div class="project-card-bottom"><small>${p.progress}% complete</small><strong>열기 →</strong></div></article>`;}
function getProjectConstitution(projectId){return data.projectConstitutions.find(x=>x.projectId===projectId);}
function projectRuleCoverage(projectId){const pc=getProjectConstitution(projectId);if(!pc)return 0;const required=[...new Set(pc.requiredRuleIds||[])];if(!required.length)return 100;return Math.round(required.filter(id=>pc.ruleIds.includes(id)).length/required.length*100);}
function openProject(id){const p=data.projects.find(x=>x.id===id);if(!p)return;const pc=getProjectConstitution(id);const rules=pc?.ruleIds||[];const coverage=projectRuleCoverage(id);const dev=getDevelopmentRecord(id);const issues=dev.openIssues||[];current='projects';buildNav();$('#pageName').textContent=`Projects / ${p.name}`;$('#content').innerHTML=`<button class="tab" onclick="go('projects')">← Projects</button><div class="project-hero"><div class="project-hero-top"><div><small>${esc(p.status).toUpperCase()} PROJECT</small><h2>${esc(p.name)}</h2><div class="project-meta">${esc(p.desc)} · ${pc?'Constitution Engine 적용':'기본 프로젝트'}</div></div><div class="big-percent">${p.progress}%</div></div><div class="project-progress"><span style="width:${p.progress}%"></span></div></div><div class="detail-grid"><div class="detail-card"><small>Current</small><strong>${esc(p.current)}</strong></div><div class="detail-card"><small>Next</small><strong>${esc(p.next)}</strong></div><div class="detail-card"><small>Constitution</small><strong>${rules.length} Rules</strong></div><div class="detail-card"><small>Validation</small><strong>${coverage}%</strong></div></div>${pc?`<div class="panel project-constitution-panel"><div class="panel-head"><div><span class="eyebrow">Project DNA</span><h3>${pc.dna.map(x=>`<span class="dna-chip">${esc(x)}</span>`).join('')}</h3></div><small>${esc(pc.presetName||'Custom')}</small></div><div class="rule-validation-list">${rules.map(rid=>{const r=data.constitution.find(x=>x.id===rid);return r?`<button onclick="data.knowledgeTab='constitution';go('knowledge');setTimeout(()=>openConstitution('${r.id}'),50)"><span>✓</span><div><strong>${esc(r.id)} · ${esc(r.title)}</strong><small>${esc(r.chapter)} · 적용됨</small></div></button>`:''}).join('')}</div></div>`:`<div class="placeholder"><strong>Project Constitution 미적용</strong><p>Constitution Engine으로 규칙 Pack을 연결할 수 있습니다.</p><button class="primary-btn compact" onclick="openApplyConstitutionWizard('${p.id}')">규칙 적용</button></div>`}<div class="panel development-handoff"><div class="panel-head"><div><span class="eyebrow">AI Development Handoff</span><h3>Development Center</h3></div><span class="status">${esc(dev.status)}</span></div><div class="detail-grid"><div class="detail-card"><small>Current Version</small><strong>${esc(dev.currentVersion)}</strong></div><div class="detail-card"><small>Target Version</small><strong>${esc(dev.targetVersion)}</strong></div><div class="detail-card"><small>Sprint</small><strong>${esc(dev.sprint)}</strong></div><div class="detail-card"><small>Open Issues</small><strong>${issues.length}</strong></div></div><div class="handoff-goal"><small>Current Goal</small><strong>${esc(dev.currentGoal)}</strong></div><div class="page-actions"><button class="primary-btn compact" onclick="exportAIPackage('${p.id}','md')">AI Package · Markdown</button><button class="tab" onclick="exportAIPackage('${p.id}','json')">JSON 내보내기</button><button class="tab" onclick="openImportResultModal('${p.id}')">개발 결과 가져오기</button><button class="tab" onclick="openDevelopmentSettings('${p.id}')">상태·목표 편집</button></div>${dev.buildHistory.length?`<div class="build-history"><h4>Build History</h4>${dev.buildHistory.slice().reverse().map(b=>`<div><b>${esc(b.version)}</b><span>${esc(b.summary)}</span><small>${esc(b.date)}</small></div>`).join('')}</div>`:''}</div><div class="page-actions"><button class="primary-btn compact" onclick="openProjectModal('${p.id}')">프로젝트 수정</button><button class="tab" onclick="openApplyConstitutionWizard('${p.id}')">Constitution 재구성</button><button class="tab danger" onclick="deleteProject('${p.id}')">프로젝트 삭제</button></div>`;}
function openProjectModal(id=''){const p=data.projects.find(x=>x.id===id)||{name:'',desc:'',progress:0,status:'Active',current:'',next:''};openModal(id?'프로젝트 수정':'프로젝트 추가',`<label>프로젝트명<input id="pName" value="${esc(p.name)}"></label><label>설명<input id="pDesc" value="${esc(p.desc)}"></label><div class="form-grid"><label>진행률<input id="pProgress" type="number" min="0" max="100" value="${p.progress}"></label><label>상태<select id="pStatus">${['Active','Planning','Paused'].map(x=>`<option ${p.status===x?'selected':''}>${x}</option>`).join('')}</select></label></div><label>Current<input id="pCurrent" value="${esc(p.current)}"></label><label>Next<input id="pNext" value="${esc(p.next)}"></label>`, () => saveProjectFromModal(id));}
function saveProjectFromModal(id){const name=$('#pName').value.trim();if(!name)return toast('프로젝트명을 입력해주세요.');const obj={id:id||uid('p'),name,desc:$('#pDesc').value.trim()||'설명 없음',progress:Math.max(0,Math.min(100,Number($('#pProgress').value)||0)),status:$('#pStatus').value,current:$('#pCurrent').value.trim()||'미정',next:$('#pNext').value.trim()||'미정'};if(id){const i=data.projects.findIndex(p=>p.id===id);data.projects[i]=obj}else data.projects.push(obj);saveData();closeModal();go('projects');toast(id?'프로젝트를 수정했습니다.':'프로젝트를 추가했습니다.');}
function deleteProject(id){if(!confirm('이 프로젝트를 삭제할까요?'))return;data.projects=data.projects.filter(p=>p.id!==id);saveData();go('projects');toast('프로젝트를 삭제했습니다.');}

function renderBrain(){
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Capture first, organize later</span><h1>Brain</h1><p>입력한 아이디어가 브라우저를 닫아도 유지됩니다.</p></div><div class="panel"><div class="panel-head"><h3>Brain Dump</h3><small>${data.ideas.length} items</small></div><div class="brain-input"><input id="brainText" placeholder="아이디어를 한 줄로 던져보세요..."/><input id="brainProject" placeholder="프로젝트" value="Inbox"/><button class="primary-btn compact" onclick="addIdea()">저장</button></div><div id="ideas">${data.ideas.map(i=>`<div class="idea-card"><div><strong>${esc(i.text)}</strong><small>${esc(i.date)} · ${esc(i.project)}</small></div><button onclick="deleteIdea('${i.id}')">×</button></div>`).join('')||emptyLine('저장된 아이디어가 없습니다.')}</div></div>`;
  $('#brainText').onkeydown=e=>{if(e.key==='Enter')addIdea()};
}
function addIdea(){const text=$('#brainText').value.trim();if(!text)return toast('아이디어를 입력해주세요.');data.ideas.unshift({id:uid('b'),text,project:$('#brainProject').value.trim()||'Inbox',date:'방금'});saveData();renderBrain();toast('Brain에 저장했습니다.');}
function deleteIdea(id){data.ideas=data.ideas.filter(i=>i.id!==id);saveData();renderBrain();toast('아이디어를 삭제했습니다.');}

function renderAssets(){renderPlaceholder('Assets','파일과 디자인 자산을 한곳에서 관리합니다.','v0.8에서는 실제 업무 데이터 모듈을 먼저 연결했습니다.');}
function renderKnowledge(){
  $('#pageName').textContent='Knowledge';
  const tabs=[['overview','Overview'],['engine','Engine'],['packs','Packs'],['constitution','Constitution'],['decision','Decision Log'],['architecture','Architecture'],['template','Template'],['prompt','Prompt Library'],['glossary','Glossary']];
  const tab=data.knowledgeTab||'overview';
  $('#content').innerHTML=`<div class="page-title knowledge-title"><div><span class="eyebrow">Knowledge & Constitution</span><h1>Knowledge</h1><p>프로젝트, 지식, 규칙과 의사결정을 하나의 운영 기준으로 연결합니다.</p></div><button class="primary-btn compact" onclick="openConstitutionModal()">새 조항</button></div><div class="section-tabs knowledge-tabs">${tabs.map(x=>`<button class="tab ${tab===x[0]?'active':''}" onclick="setKnowledgeTab('${x[0]}')">${x[1]}</button>`).join('')}</div><div id="knowledgeBody"></div>`;
  renderKnowledgeTab();
}
function setKnowledgeTab(tab){data.knowledgeTab=tab;saveData();renderKnowledge();}
function constitutionStats(){const total=data.constitution.length, approved=data.constitution.filter(x=>x.status==='Approved').length, candidate=data.constitution.filter(x=>x.status==='Candidate').length, deprecated=data.constitution.filter(x=>x.status==='Deprecated').length;return {total,approved,candidate,deprecated};}
function projectCoverage(name){const applicable=data.constitution.filter(x=>x.status==='Approved');if(!applicable.length)return 0;return Math.round(applicable.filter(x=>x.projects.includes(name)).length/applicable.length*100);}
function renderKnowledgeTab(){const body=$('#knowledgeBody');if(!body)return;const tab=data.knowledgeTab||'overview';
 if(tab==='engine'){renderConstitutionEngine(body);return;}
 if(tab==='packs'){renderConstitutionPacks(body);return;}
 if(tab==='overview'){const s=constitutionStats();body.innerHTML=`<div class="constitution-score-grid"><div class="review-score"><small>총 조항</small><strong>${s.total}</strong><span>Studio OS Constitution</span></div><div class="review-score"><small>확정</small><strong>${s.approved}</strong><span>Approved</span></div><div class="review-score"><small>검토</small><strong>${s.candidate}</strong><span>Candidate</span></div><div class="review-score"><small>Decision</small><strong>${data.decisions.length}</strong><span>의사결정 이력</span></div></div><div class="knowledge-overview-grid"><section class="panel"><div class="panel-head"><h3>프로젝트 적용률</h3><small>Approved 기준</small></div><div class="coverage-list">${data.projects.slice(0,5).map(p=>`<div class="coverage-row"><div><strong>${esc(p.name)}</strong><small>${projectCoverage(p.name)}% 적용</small></div><div class="progress"><span style="width:${projectCoverage(p.name)}%"></span></div><b>${projectCoverage(p.name)}%</b></div>`).join('')}</div></section><section class="panel"><div class="panel-head"><h3>최근 변경</h3><button onclick="setKnowledgeTab('constitution')">전체 보기</button></div>${[...data.constitution].sort((a,b)=>b.updated.localeCompare(a.updated)).slice(0,4).map(x=>constitutionCompact(x)).join('')}</section><section class="panel"><div class="panel-head"><h3>Constitution Candidate</h3><button onclick="openCandidateModal()">후보 등록</button></div>${data.candidates.map(c=>`<div class="candidate-row"><div><strong>${esc(c.title)}</strong><small>${esc(c.source)} · ${esc(c.date)}</small></div><span class="status">${esc(c.status)}</span><button onclick="promoteCandidate('${c.id}')">승격</button></div>`).join('')||emptyLine('등록된 후보가 없습니다.')}</section><section class="panel"><div class="panel-head"><h3>Constitution Timeline</h3><small>Revision history</small></div><div class="constitution-timeline"><div><b>v1.0</b><span>기준 UI 및 Daily OS 확정</span></div><div><b>v1.1</b><span>Knowledge & Constitution 제정</span></div><div><b>Next</b><span>프로젝트 적용 추적 및 자동 Cross Link</span></div></div></section></div>`;return;}
 if(tab==='constitution'){renderConstitutionList(body);return;}
 if(tab==='decision'){body.innerHTML=`<div class="page-actions"><button class="primary-btn compact" onclick="openDecisionModal()">Decision 추가</button></div><div class="panel decision-list">${data.decisions.map(d=>`<div class="decision-row"><span>${esc(d.date)}</span><div><strong>${esc(d.title)}</strong><p>${esc(d.detail)}</p><small>${esc(d.project)}</small></div><b class="status">${esc(d.status)}</b></div>`).join('')}</div>`;return;}
 const labels={architecture:['Architecture','시스템 구조, 데이터 흐름과 기술 원칙'],template:['Template','재사용 가능한 화면·문서·운영 템플릿'],prompt:['Prompt Library','반복 업무와 프로젝트 운영을 위한 프롬프트'],glossary:['Glossary','Studio OS의 공식 명명 규칙과 용어']};const x=labels[tab];body.innerHTML=`<div class="placeholder knowledge-placeholder"><strong>${x[0]}</strong><p>${x[1]}</p><small>v1.1에서는 Constitution Cross Link의 연결 지점으로 활성화되었습니다.</small></div>`;
}
function constitutionCompact(x){return `<button class="constitution-compact" onclick="openConstitution('${x.id}')"><span>${x.favorite?'★':'◇'}</span><div><strong>${esc(x.id)} · ${esc(x.title)}</strong><small>${esc(x.chapter)} · ${esc(x.updated)}</small></div><b>${esc(x.status)}</b></button>`;}
function filteredConstitution(){const q=(window.constitutionQuery||'').toLowerCase();return data.constitution.filter(x=>[x.id,x.title,x.content,x.chapter,...x.projects].join(' ').toLowerCase().includes(q));}
function updateConstitutionResults(){const listEl=$('#constitutionResults');if(!listEl)return;const list=filteredConstitution();listEl.innerHTML=list.map(constitutionCompact).join('')||emptyLine('검색 결과가 없습니다.');}
function handleConstitutionSearch(value){window.constitutionQuery=value;updateConstitutionResults();}
function clearConstitutionSearch(){window.constitutionQuery='';const input=$('#constitutionSearchInput');if(input){input.value='';input.focus();}updateConstitutionResults();}
function renderConstitutionList(body){const list=filteredConstitution();body.innerHTML=`<div class="constitution-toolbar"><div class="knowledge-search"><span>⌕</span><input id="constitutionSearchInput" placeholder="조항 ID, 제목, 프로젝트 검색" value="${esc(window.constitutionQuery||'')}" oninput="handleConstitutionSearch(this.value)"></div><button class="tab" onclick="clearConstitutionSearch()">초기화</button></div><div class="constitution-layout"><section id="constitutionResults" class="panel constitution-list">${list.map(constitutionCompact).join('')||emptyLine('검색 결과가 없습니다.')}</section><section class="panel impact-preview"><span class="eyebrow">Impact Analysis</span><h3>변경 전 영향도를 확인하세요.</h3><p>조항을 선택하면 관련 프로젝트, 관련 조항과 예상 영향도를 표시합니다.</p><div class="impact-empty">Constitution 조항 선택</div></section></div>`;}
function impactLevel(x){const count=x.projects.length+(x.related?.length||0);return Math.min(5,Math.max(1,Math.ceil(count/2)));}
function openConstitution(id){const x=data.constitution.find(c=>c.id===id);if(!x)return;const stars='★★★★★'.slice(0,impactLevel(x))+'☆☆☆☆☆'.slice(0,5-impactLevel(x));openModal(`${esc(x.id)} · ${esc(x.title)}`,`<div class="constitution-detail"><div class="constitution-detail-head"><span class="status">${esc(x.status)}</span><button class="favorite-btn" onclick="toggleConstitutionFavorite('${x.id}')">${x.favorite?'★ 즐겨찾기':'☆ 즐겨찾기'}</button></div><p class="constitution-content">${esc(x.content)}</p><div class="impact-card"><small>Impact Analysis</small><strong>${stars}</strong><span>${impactLevel(x)>=4?'Critical':impactLevel(x)>=3?'High':'Normal'} · ${x.projects.length} Projects</span></div><div class="detail-grid constitution-meta"><div class="detail-card"><small>Chapter</small><strong>${esc(x.chapter)}</strong></div><div class="detail-card"><small>적용범위</small><strong>${esc(x.scope)}</strong></div><div class="detail-card"><small>관련 프로젝트</small><strong>${x.projects.map(esc).join(', ')}</strong></div><div class="detail-card"><small>관련 조항</small><strong>${(x.related||[]).map(esc).join(', ')||'-'}</strong></div></div><small class="constitution-note">${esc(x.note||'')}</small></div>`,()=>{closeModal();openConstitutionModal(x.id)});$('#modalSave').textContent='편집';}
function openConstitutionModal(id){const x=id?data.constitution.find(c=>c.id===id):null;openModal(x?'조항 편집':'새 Constitution 조항',`<div class="form-grid"><label>ID<input id="cId" value="${esc(x?.id||'C-')}" /></label><label>상태<select id="cStatus"><option ${x?.status==='Approved'?'selected':''}>Approved</option><option ${x?.status==='Candidate'?'selected':''}>Candidate</option><option ${x?.status==='Deprecated'?'selected':''}>Deprecated</option></select></label></div><label>제목<input id="cTitle" value="${esc(x?.title||'')}" /></label><label>내용<textarea id="cContent">${esc(x?.content||'')}</textarea></label><div class="form-grid"><label>Chapter<input id="cChapter" value="${esc(x?.chapter||'Operating System')}" /></label><label>적용범위<input id="cScope" value="${esc(x?.scope||'전체 프로젝트')}" /></label></div><label>관련 프로젝트<input id="cProjects" value="${esc((x?.projects||[]).join(', '))}" placeholder="Studio OS, SAMS" /></label><label>관련 조항<input id="cRelated" value="${esc((x?.related||[]).join(', '))}" /></label><label>비고<textarea id="cNote">${esc(x?.note||'')}</textarea></label>`,()=>{const item={id:$('#cId').value.trim(),title:$('#cTitle').value.trim(),content:$('#cContent').value.trim(),status:$('#cStatus').value,chapter:$('#cChapter').value.trim(),scope:$('#cScope').value.trim(),projects:$('#cProjects').value.split(',').map(v=>v.trim()).filter(Boolean),related:$('#cRelated').value.split(',').map(v=>v.trim()).filter(Boolean),note:$('#cNote').value.trim(),favorite:x?.favorite||false,updated:new Date().toISOString().slice(0,10)};if(!item.id||!item.title)return toast('ID와 제목을 입력하세요.');if(x)Object.assign(x,item);else data.constitution.unshift(item);saveData();closeModal();data.knowledgeTab='constitution';saveData();renderKnowledge();toast('Constitution에 저장했습니다.');});}
function toggleConstitutionFavorite(id){const x=data.constitution.find(c=>c.id===id);if(x){x.favorite=!x.favorite;saveData();closeModal();renderKnowledge();toast(x.favorite?'즐겨찾기에 추가했습니다.':'즐겨찾기에서 해제했습니다.');}}
function openCandidateModal(){openModal('Constitution Candidate 등록',`<label>제안 제목<input id="kTitle" /></label><label>내용<textarea id="kDetail"></textarea></label><label>출처<input id="kSource" value="대표 제안" /></label>`,()=>{const title=$('#kTitle').value.trim();if(!title)return toast('제안 제목을 입력하세요.');data.candidates.unshift({id:uid('K'),title,status:'Review',source:$('#kSource').value.trim(),date:new Date().toISOString().slice(0,10),detail:$('#kDetail').value.trim()});saveData();closeModal();renderKnowledge();toast('헌법 후보로 등록했습니다.');});}
function promoteCandidate(id){const c=data.candidates.find(x=>x.id===id);if(!c)return;data.constitution.unshift({id:'C-CAND-'+String(data.constitution.length+1).padStart(3,'0'),title:c.title,chapter:'Candidate',status:'Candidate',content:c.detail||c.title,scope:'검토 필요',projects:['Studio OS'],related:[],note:`${c.source}에서 승격`,favorite:false,updated:new Date().toISOString().slice(0,10)});data.candidates=data.candidates.filter(x=>x.id!==id);saveData();data.knowledgeTab='constitution';renderKnowledge();toast('Constitution 후보 조항으로 승격했습니다.');}
function openDecisionModal(){openModal('Decision Log 추가',`<label>결정 제목<input id="dTitle" /></label><label>상세<textarea id="dDetail"></textarea></label><div class="form-grid"><label>프로젝트<input id="dProject" value="Studio OS" /></label><label>상태<select id="dStatus"><option>Approved</option><option>Review</option><option>Hold</option></select></label></div>`,()=>{const title=$('#dTitle').value.trim();if(!title)return toast('결정 제목을 입력하세요.');data.decisions.unshift({id:uid('D'),title,detail:$('#dDetail').value.trim(),project:$('#dProject').value.trim(),status:$('#dStatus').value,date:new Date().toISOString().slice(0,10)});saveData();closeModal();renderKnowledge();toast('Decision Log에 저장했습니다.');});}

function packById(id){return data.constitutionPacks.find(x=>x.id===id);}
function presetById(id){return data.presets.find(x=>x.id===id);}
function rulesForPacks(packIds){return [...new Set(packIds.flatMap(id=>packById(id)?.ruleIds||[]))];}
function requiredForPacks(packIds){return [...new Set(packIds.flatMap(id=>packById(id)?.required||[]))];}
function renderConstitutionEngine(body){
 const configured=data.projectConstitutions.length;
 body.innerHTML=`<div class="constitution-score-grid"><div class="review-score"><small>Preset</small><strong>${data.presets.length}</strong><span>빠른 자동 구성</span></div><div class="review-score"><small>Pack</small><strong>${data.constitutionPacks.length}</strong><span>분야별 규칙 묶음</span></div><div class="review-score"><small>적용 프로젝트</small><strong>${configured}</strong><span>Project Constitution</span></div><div class="review-score"><small>Engine</small><strong>ON</strong><span>Auto Bootstrap</span></div></div><div class="panel engine-hero"><div><span class="eyebrow">Constitution Engine</span><h2>규칙은 프로젝트를 자동으로 구성하기 위해 존재합니다.</h2><p>Preset을 선택하면 Pack, Rule, Project DNA와 Validation 기준을 한 번에 생성합니다.</p></div><button class="primary-btn" onclick="openProjectWizard()">새 프로젝트 자동 구성</button></div><div class="knowledge-overview-grid"><section class="panel"><div class="panel-head"><h3>Quick Preset</h3><small>${data.presets.length} presets</small></div><div class="preset-list">${data.presets.map(x=>`<button onclick="openProjectWizard('${x.id}')"><div><strong>${esc(x.name)}</strong><small>${esc(x.type)} · ${x.packIds.length} Packs</small></div><span>→</span></button>`).join('')}</div></section><section class="panel"><div class="panel-head"><h3>Project Constitution</h3><small>${configured} configured</small></div>${data.projects.map(p=>{const pc=getProjectConstitution(p.id);return `<button class="constitution-project-row" onclick="openProject('${p.id}')"><div><strong>${esc(p.name)}</strong><small>${pc?`${pc.ruleIds.length} Rules · ${projectRuleCoverage(p.id)}% Validation`:'미적용'}</small></div><b>${pc?'✓':'+'}</b></button>`}).join('')}</section></div>`;
}
function renderConstitutionPacks(body){body.innerHTML=`<div class="page-actions"><button class="primary-btn compact" onclick="openPackModal()">+ Pack 추가</button></div><div class="pack-grid">${data.constitutionPacks.map(p=>`<article class="pack-card"><div class="pack-card-head"><span>${esc(p.type)}</span><b>${p.ruleIds.length}</b></div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="pack-rule-chips">${p.ruleIds.map(id=>`<span>${esc(id)}</span>`).join('')}</div><button class="tab" onclick="openPackModal('${p.id}')">Pack 편집</button></article>`).join('')}</div>`;}
function openPackModal(id=''){const p=packById(id)||{name:'',type:'App',desc:'',ruleIds:[],required:[]};openModal(id?'Constitution Pack 편집':'Constitution Pack 추가',`<label>Pack 이름<input id="packName" value="${esc(p.name)}"></label><div class="form-grid"><label>분야<select id="packType">${['Common','App','Game','Music','Video','Document','Design','AI'].map(x=>`<option ${p.type===x?'selected':''}>${x}</option>`).join('')}</select></label><label>설명<input id="packDesc" value="${esc(p.desc)}"></label></div><label>포함 규칙<select id="packRules" multiple size="8">${data.constitution.map(r=>`<option value="${r.id}" ${p.ruleIds.includes(r.id)?'selected':''}>${r.id} · ${esc(r.title)}</option>`).join('')}</select></label><label>필수 규칙<select id="packRequired" multiple size="6">${data.constitution.map(r=>`<option value="${r.id}" ${p.required.includes(r.id)?'selected':''}>${r.id} · ${esc(r.title)}</option>`).join('')}</select></label>`,()=>{const name=$('#packName').value.trim();if(!name)return toast('Pack 이름을 입력하세요.');const obj={id:id||uid('PACK'),name,type:$('#packType').value,desc:$('#packDesc').value.trim(),ruleIds:[...$('#packRules').selectedOptions].map(o=>o.value),required:[...$('#packRequired').selectedOptions].map(o=>o.value)};if(id)Object.assign(packById(id),obj);else data.constitutionPacks.push(obj);saveData();closeModal();renderKnowledge();toast('Constitution Pack을 저장했습니다.');});}
function inferProjectType(p){const t=((p?.name||'')+' '+(p?.desc||'')).toLowerCase();if(t.includes('game')||t.includes('게임'))return 'Game';if(t.includes('music')||t.includes('음원')||t.includes('음악'))return 'Music';if(t.includes('video')||t.includes('영상'))return 'Video';if(t.includes('report')||t.includes('문서')||t.includes('보고'))return 'Document';return 'App';}
function getDevelopmentRecord(projectId){let r=data.developmentRecords.find(x=>x.projectId===projectId);if(!r){r={projectId,status:'Planning',currentVersion:'0.1.0',targetVersion:'0.1.0',currentGoal:'첫 실행 목표 정의',sprint:'Sprint 01',openIssues:[],buildHistory:[],lastExport:null,lastImport:null};data.developmentRecords.push(r);saveData();}return r;}
function openProjectWizard(presetId=''){wizardState={step:1,presetId,projectId:'',name:'',desc:'',type:presetById(presetId)?.type||'App',packIds:presetById(presetId)?.packIds||['PACK-COMMON'],ruleIds:[],dna:presetById(presetId)?.dna||[]};showProjectWizard();}
function openApplyConstitutionWizard(projectId){const p=data.projects.find(x=>x.id===projectId);const pc=getProjectConstitution(projectId);wizardState={step:2,presetId:'',projectId,name:p.name,desc:p.desc,type:pc?.type||inferProjectType(p),packIds:pc?.packIds||['PACK-COMMON'],ruleIds:pc?.ruleIds||[],dna:pc?.dna||[]};showProjectWizard();}
let wizardState={};
function showProjectWizard(){const w=wizardState;const preset=presetById(w.presetId);if(w.step===1){openModal('Project Wizard · 1/4',`<label>프로젝트명<input id="wName" value="${esc(w.name)}" placeholder="새 프로젝트 이름"></label><label>설명<input id="wDesc" value="${esc(w.desc)}" placeholder="프로젝트 목적"></label><div class="form-grid"><label>프로젝트 유형<select id="wType">${['App','Game','Music','Video','Document','Design','AI','Other'].map(x=>`<option ${w.type===x?'selected':''}>${x}</option>`).join('')}</select></label><label>Preset<select id="wPreset"><option value="">직접 구성</option>${data.presets.map(x=>`<option value="${x.id}" ${w.presetId===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label></div>`,()=>{w.name=$('#wName').value.trim();if(!w.name)return toast('프로젝트명을 입력하세요.');w.desc=$('#wDesc').value.trim()||'Constitution Engine 프로젝트';w.type=$('#wType').value;w.presetId=$('#wPreset').value;const pr=presetById(w.presetId);if(pr){w.type=pr.type;w.packIds=[...pr.packIds];w.dna=[...pr.dna];}w.step=2;showProjectWizard();});$('#modalSave').textContent='다음';return;}
 if(w.step===2){openModal('Project Wizard · 2/4',`<p class="wizard-help">적용할 Constitution Pack을 선택하세요. Common Core는 기본 권장입니다.</p><div class="wizard-choice-list">${data.constitutionPacks.filter(p=>p.type==='Common'||p.type===w.type).map(p=>`<label><input type="checkbox" value="${p.id}" ${w.packIds.includes(p.id)?'checked':''}><div><strong>${esc(p.name)}</strong><small>${esc(p.desc)} · ${p.ruleIds.length} Rules</small></div></label>`).join('')}</div>`,()=>{w.packIds=$$('.wizard-choice-list input:checked').map(x=>x.value);w.ruleIds=rulesForPacks(w.packIds);w.step=3;showProjectWizard();});$('#modalSave').textContent='규칙 선택';return;}
 if(w.step===3){const required=requiredForPacks(w.packIds);if(!w.ruleIds.length)w.ruleIds=rulesForPacks(w.packIds);openModal('Project Wizard · 3/4',`<p class="wizard-help">필수 규칙은 기본 선택됩니다. 권장·선택 규칙은 프로젝트 성격에 맞게 조정하세요.</p><div class="wizard-rule-list">${data.constitution.filter(r=>w.ruleIds.includes(r.id)||required.includes(r.id)).map(r=>`<label><input type="checkbox" value="${r.id}" ${w.ruleIds.includes(r.id)||required.includes(r.id)?'checked':''} ${required.includes(r.id)?'disabled':''}><div><strong>${r.id} · ${esc(r.title)}</strong><small>${required.includes(r.id)?'필수':'권장'} · ${esc(r.chapter)}</small></div></label>`).join('')}</div>`,()=>{w.ruleIds=[...new Set([...$$('.wizard-rule-list input:checked').map(x=>x.value),...required])];w.dna=[...new Set([w.type,...(presetById(w.presetId)?.dna||[]),...w.packIds.map(id=>packById(id)?.name).filter(Boolean)])];w.step=4;showProjectWizard();});$('#modalSave').textContent='검토';return;}
 const required=requiredForPacks(w.packIds);openModal('Project Wizard · 4/4',`<div class="wizard-summary"><span class="eyebrow">Auto Bootstrap</span><h3>${esc(w.name)}</h3><p>${esc(w.desc)}</p><div class="detail-grid"><div class="detail-card"><small>Type</small><strong>${esc(w.type)}</strong></div><div class="detail-card"><small>Packs</small><strong>${w.packIds.length}</strong></div><div class="detail-card"><small>Rules</small><strong>${w.ruleIds.length}</strong></div><div class="detail-card"><small>Required</small><strong>${required.length}</strong></div></div><div class="dna-wrap">${w.dna.map(x=>`<span class="dna-chip">${esc(x)}</span>`).join('')}</div><div class="bootstrap-list"><span>✓ Workspace</span><span>✓ Project Constitution</span><span>✓ Validation</span><span>✓ Decision Log</span></div></div>`,()=>finishProjectWizard());$('#modalSave').textContent=w.projectId?'재구성 완료':'프로젝트 생성';}
function finishProjectWizard(){const w=wizardState;let p;if(w.projectId){p=data.projects.find(x=>x.id===w.projectId);}else{p={id:uid('p'),name:w.name,desc:w.desc,progress:0,status:'Planning',current:'Constitution 적용 완료',next:'첫 실행 계획 수립'};data.projects.push(p);}const obj={projectId:p.id,type:w.type,presetId:w.presetId,presetName:presetById(w.presetId)?.name||'Custom',packIds:w.packIds,ruleIds:w.ruleIds,requiredRuleIds:requiredForPacks(w.packIds),dna:w.dna,createdAt:new Date().toISOString()};const old=data.projectConstitutions.findIndex(x=>x.projectId===p.id);if(old>=0)data.projectConstitutions[old]=obj;else data.projectConstitutions.push(obj);data.decisions.unshift({id:uid('D'),title:`${p.name} Project Constitution 생성`,status:'Approved',project:p.name,date:new Date().toISOString().slice(0,10),detail:`${w.packIds.length} Packs · ${w.ruleIds.length} Rules 자동 적용`});saveData();closeModal();openProject(p.id);toast('Constitution Engine이 프로젝트를 구성했습니다.');}

function projectPackage(projectId){const p=data.projects.find(x=>x.id===projectId),pc=getProjectConstitution(projectId),dev=getDevelopmentRecord(projectId);const rules=(pc?.ruleIds||[]).map(id=>data.constitution.find(r=>r.id===id)).filter(Boolean);const decisions=data.decisions.filter(d=>d.project===p.name).slice(0,12);const ideas=data.ideas.filter(i=>i.project===p.name);const assets=data.digitalAssets.filter(a=>a.project===p.name);return {schema:'studio-os-ai-handoff-v2',generatedAt:new Date().toISOString(),studioOSVersion:'1.5',project:{id:p.id,name:p.name,description:p.desc,status:p.status,progress:p.progress,current:p.current,next:p.next},development:dev,constitution:pc||null,rules:rules.map(r=>({id:r.id,title:r.title,status:r.status,content:r.content,chapter:r.chapter,scope:r.scope,note:r.note})),decisions,ideas,assets,aiContext:{mustFollow:rules.filter(r=>(pc?.requiredRuleIds||[]).includes(r.id)).map(r=>`${r.id} ${r.title}`),fixedUI:rules.filter(r=>r.chapter==='UI').map(r=>r.content),currentGoal:dev.currentGoal,nextAction:p.next,openIssues:dev.openIssues||[]}};}
function packageMarkdown(pkg){const p=pkg.project,d=pkg.development,pc=pkg.constitution;return `# Studio OS AI Development Package\n\n- Generated: ${pkg.generatedAt}\n- Studio OS: v${pkg.studioOSVersion}\n\n## Project Brief\n- Project: ${p.name}\n- Type: ${pc?.type||'Unspecified'}\n- Description: ${p.description}\n- Status: ${p.status}\n- Progress: ${p.progress}%\n- Current: ${p.current}\n- Next: ${p.next}\n\n## Development Handoff\n- Workflow Status: ${d.status}\n- Current Version: ${d.currentVersion}\n- Target Version: ${d.targetVersion}\n- Sprint: ${d.sprint}\n- Current Goal: ${d.currentGoal}\n\n## Project DNA\n${(pc?.dna||[]).map(x=>`- ${x}`).join('\n')||'- None'}\n\n## Applied Constitution\n${pkg.rules.map(r=>`### ${r.id} · ${r.title}\n${r.content}\n- Chapter: ${r.chapter}\n- Status: ${r.status}`).join('\n\n')||'No Constitution applied.'}\n\n## Idea Fragments\n${(pkg.ideas||[]).map(x=>`- ${x.text}`).join('\n')||'- None'}\n\n## Registered Digital Assets\n${(pkg.assets||[]).map(x=>`- ${x.name} · ${x.type} · v${x.version} · ${x.status}`).join('\n')||'- None'}\n\n## Recent Decisions\n${pkg.decisions.map(x=>`- ${x.date} · ${x.title}: ${x.detail}`).join('\n')||'- None'}\n\n## Open Issues\n${(d.openIssues||[]).map(x=>`- ${x}`).join('\n')||'- None'}\n\n## AI Instruction\nDevelop the target version while preserving all required Constitution rules. Report implemented features, changed files, tests, known issues, exceptions, and the next recommended action.`;}
function downloadText(name,text,type='text/plain'){const blob=new Blob([text],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function exportAIPackage(projectId,format){const pkg=projectPackage(projectId),safe=pkg.project.name.replace(/[^a-zA-Z0-9가-힣_-]+/g,'_');if(format==='json')downloadText(`${safe}_AI_Package.json`,JSON.stringify(pkg,null,2),'application/json');else downloadText(`${safe}_AI_Package.md`,packageMarkdown(pkg),'text/markdown');const d=getDevelopmentRecord(projectId);d.lastExport=new Date().toISOString();d.status='Ready';saveData();openProject(projectId);toast('AI 개발 패키지를 생성했습니다.');}
function openDevelopmentSettings(projectId){const d=getDevelopmentRecord(projectId);openModal('Development Handoff 설정',`<div class="form-grid"><label>상태<select id="devStatus">${['Planning','Ready','In Development','Review','Blocked','Completed'].map(x=>`<option ${d.status===x?'selected':''}>${x}</option>`).join('')}</select></label><label>Sprint<input id="devSprint" value="${esc(d.sprint)}"></label></div><div class="form-grid"><label>현재 버전<input id="devCurrentVersion" value="${esc(d.currentVersion)}"></label><label>목표 버전<input id="devTargetVersion" value="${esc(d.targetVersion)}"></label></div><label>현재 개발 목표<textarea id="devGoal">${esc(d.currentGoal)}</textarea></label><label>미해결 사항 (한 줄에 하나)<textarea id="devIssues">${esc((d.openIssues||[]).join('\n'))}</textarea></label>`,()=>{d.status=$('#devStatus').value;d.sprint=$('#devSprint').value.trim()||'Sprint 01';d.currentVersion=$('#devCurrentVersion').value.trim()||'0.1.0';d.targetVersion=$('#devTargetVersion').value.trim()||d.currentVersion;d.currentGoal=$('#devGoal').value.trim()||'개발 목표 미정';d.openIssues=$('#devIssues').value.split('\n').map(x=>x.trim()).filter(Boolean);saveData();closeModal();openProject(projectId);toast('Development Handoff를 저장했습니다.');});}
function openImportResultModal(projectId){openModal('개발 결과 가져오기',`<div class="form-grid"><label>완료 버전<input id="resultVersion" placeholder="예: 1.3.1"></label><label>결과 상태<select id="resultStatus"><option>Review</option><option>Completed</option><option>Blocked</option><option>In Development</option></select></label></div><label>구현·변경 요약<textarea id="resultSummary" placeholder="신규 기능, 수정 파일, 테스트 결과"></textarea></label><label>Known Issues / 다음 검토사항<textarea id="resultIssues" placeholder="한 줄에 하나"></textarea></label><label>JSON 결과 파일<input id="resultFile" type="file" accept="application/json"></label>`,()=>importDevelopmentResult(projectId));const file=$('#resultFile');file.onchange=()=>{const f=file.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);$('#resultVersion').value=x.version||x.targetVersion||'';$('#resultSummary').value=x.summary||x.implementedFeatures?.join('\n')||'';$('#resultIssues').value=(x.knownIssues||x.openIssues||[]).join('\n');}catch(e){toast('JSON 형식을 확인해주세요.')}};r.readAsText(f);};}
function importDevelopmentResult(projectId){const p=data.projects.find(x=>x.id===projectId),d=getDevelopmentRecord(projectId),version=$('#resultVersion').value.trim();if(!version)return toast('완료 버전을 입력하세요.');const summary=$('#resultSummary').value.trim()||'개발 결과 반영',issues=$('#resultIssues').value.split('\n').map(x=>x.trim()).filter(Boolean);d.currentVersion=version;d.targetVersion=version;d.status=$('#resultStatus').value;d.openIssues=issues;d.lastImport=new Date().toISOString();d.buildHistory.push({version,summary,date:new Date().toISOString().slice(0,10)});data.decisions.unshift({id:uid('D'),title:`${p.name} ${version} 개발 결과 반영`,status:'Approved',project:p.name,date:new Date().toISOString().slice(0,10),detail:summary});data.memories.unshift({id:uid('m'),title:`Build ${version} · ${p.name}`,detail:summary,type:'Build',date:'방금'});saveData();closeModal();openProject(projectId);toast('개발 결과를 Project Timeline에 반영했습니다.');}
function renderPlaceholder(title,desc,note){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Studio OS Module</span><h1>${title}</h1><p>${desc}</p></div><div class="placeholder"><strong>UI Baseline 유지</strong><p>${note}</p></div>`;}
function renderReview(){
  const r=reviewStats(); const a=aiInsights();
  $('#pageName').textContent='Review';
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">AI Workspace</span><h1>Weekly Review</h1><p>외부 AI 없이 현재 로컬 데이터를 규칙 기반으로 해석한 운영 리뷰입니다.</p></div>
  <div class="review-score-grid"><div class="review-score"><small>할일 완료율</small><strong>${r.rate}%</strong><span>${r.done}/${r.total} 완료</span></div><div class="review-score"><small>프로젝트 평균</small><strong>${r.avg}%</strong><span>${data.projects.length}개 프로젝트</span></div><div class="review-score"><small>Brain</small><strong>${r.ideas}</strong><span>정리 대기 아이디어</span></div><div class="review-score"><small>Memory</small><strong>${r.memories}</strong><span>누적 결정·변경</span></div></div>
  <div class="review-layout"><section class="panel"><div class="panel-head"><h3>이번 주 해석</h3><small>Local insight</small></div><div class="review-list">
  <div><strong>집중 우선순위</strong><p>${a.focus?esc(a.focus.title):'미완료 할일이 없습니다.'}</p></div>
  <div><strong>진행이 느린 활성 프로젝트</strong><p>${a.weakest?`${esc(a.weakest.name)} · ${a.weakest.progress}% · Next: ${esc(a.weakest.next)}`:'활성 프로젝트가 없습니다.'}</p></div>
  <div><strong>멈춘 프로젝트</strong><p>${a.paused.length?a.paused.map(p=>esc(p.name)).join(', '):'현재 멈춘 프로젝트가 없습니다.'}</p></div>
  <div><strong>운영 제안</strong><p>${r.rate<50?'새 작업 추가보다 현재 할일 완료에 집중하세요.':r.ideas>5?'Brain 항목을 프로젝트나 메모리로 정리할 시점입니다.':'현재 흐름을 유지하고 다음 작업을 한 건만 명확히 잡으세요.'}</p></div>
  </div></section><section class="panel"><div class="panel-head"><h3>다음 행동</h3><small>Recommended</small></div><div class="next-action-list">${a.suggestions.map((x,i)=>`<button onclick="${x.action}"><b>0${i+1}</b><div><strong>${esc(x.text)}</strong><small>${esc(x.detail)}</small></div><span>→</span></button>`).join('')||emptyLine('추천 행동이 없습니다.')}</div></section></div>`;
}

function startDailySession(){data.daily.lastStart=new Date().toISOString();data.daily.sessions=(data.daily.sessions||0)+1;saveData();toast('오늘의 운영 세션을 시작했습니다.');renderHome();}
function closeDailySession(){const open=data.tasks.filter(t=>!t.done).length;const done=data.tasks.filter(t=>t.done).length;data.daily.lastClose=new Date().toISOString();data.memories.unshift({id:uid('m'),title:'Daily Close · '+new Date().toLocaleDateString('ko-KR'),detail:`완료 ${done}건 · 미완료 ${open}건 · 프로젝트 ${data.projects.length}개`,type:'Daily',date:'방금'});saveData();toast('오늘의 운영 기록을 메모리에 저장했습니다.');renderHome();}

function renderRoadmap(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>v0.6 규격을 유지하며 v1.0 기능을 단계적으로 활성화합니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v0.6 · UI Baseline</strong><p>레이아웃·간격·카드 규격 고정</p></div><div class="roadmap-row"><strong>v0.7 · Interaction</strong><p>화면 전환, 검색, 알림, 작업 완료 반응</p></div><div class="roadmap-row"><strong>v0.8 · Real Data</strong><p>할일·메모리·프로젝트·Brain 로컬 저장 및 편집</p></div><div class="roadmap-row"><strong>v0.9 · AI Workspace</strong><p>로컬 데이터 기반 Morning Brief·Review·추천 활성화</p></div><div class="roadmap-row"><strong>v1.0 · Daily OS</strong><p>일일 시작·마감·백업·리뷰가 연결된 개인 작업공간 완성</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>지식, 규칙, 의사결정, 영향분석을 연결하는 Governance Engine</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset, Pack, Project Constitution과 Validation으로 프로젝트를 자동 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff — 현재</strong><p>AI Package, Development Result, Build History와 AI Context 연결</p></div></div>`;}
function renderSystem(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>현재 브라우저에 저장된 Studio OS 데이터를 관리합니다.</p></div><div class="system-grid"><div class="panel"><div class="panel-head"><h3>Local storage</h3><span class="toggle"></span></div><p>할일, 메모리, 프로젝트, Brain이 자동 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes</small></div><div class="panel"><h3>Data backup</h3><p>JSON 파일로 내보내거나 다시 불러올 수 있습니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.5 · AI Development Handoff</p></div><div class="panel"><h3>Reset</h3><p>초기 예시 데이터로 되돌립니다.</p><button class="tab danger" onclick="resetData()">데이터 초기화</button></div></div>`;$('#importFile').onchange=importData;}
function exportData(){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='studio_os_v1.5_backup.json';a.click();URL.revokeObjectURL(a.href);toast('백업 파일을 내보냈습니다.');}
function importData(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.tasks||!x.projects)throw Error();data=x;saveData();go('home');toast('데이터를 불러왔습니다.')}catch(err){toast('올바른 Studio OS 백업 파일이 아닙니다.')}};r.readAsText(f);}
function resetData(){if(!confirm('모든 입력 데이터를 초기 예시값으로 되돌릴까요?'))return;data=clone(seed);saveData();go('home');toast('데이터를 초기화했습니다.');}

function openModal(title,body,onSave){let m=$('#dataModal');if(!m){m=document.createElement('div');m.id='dataModal';m.className='data-modal hidden';document.body.appendChild(m)}m.innerHTML=`<div class="modal-sheet"><div class="modal-head"><strong>${title}</strong><button onclick="closeModal()">×</button></div><div class="modal-body">${body}</div><div class="modal-actions"><button class="tab" onclick="closeModal()">취소</button><button class="primary-btn compact" id="modalSave">저장</button></div></div>`;m.classList.remove('hidden');$('#modalSave').onclick=onSave;setTimeout(()=>$('.modal-body input, .modal-body textarea')?.focus(),20);m.onclick=e=>{if(e.target===m)closeModal()};}
function closeModal(){$('#dataModal')?.classList.add('hidden');}

let commandSelected=0;
function searchable(){return [{title:'Weekly Review',type:'AI Workspace',action:()=>go('review')},...navItems.map(n=>({title:n.label,type:'메뉴',action:()=>go(n.id)})),...data.projects.map(p=>({title:p.name,type:'프로젝트',action:()=>openProject(p.id)})),...data.tasks.map(t=>({title:t.title,type:'할일',action:()=>go('tasks')})),...data.ideas.map(i=>({title:i.text,type:'Brain',action:()=>go('brain')})),...data.constitution.map(c=>({title:`${c.id} ${c.title}`,type:'Constitution',action:()=>{data.knowledgeTab='constitution';go('knowledge');setTimeout(()=>openConstitution(c.id),50)}}))];}
function openSearch(){const o=$('#overlay');o.classList.remove('hidden');$('#commandInput').value='';renderSearch('');setTimeout(()=>$('#commandInput').focus(),20)}
function closeSearch(){$('#overlay').classList.add('hidden')}
function renderSearch(q){const all=searchable();const list=all.filter(x=>x.title.toLowerCase().includes(q.toLowerCase())).slice(0,12);$('#commandResults').innerHTML=list.map((x,i)=>`<div class="command-result" data-i="${i}"><span>${x.type==='메뉴'?'⌘':'↗'}</span><div><strong>${esc(x.title)}</strong><small>${esc(x.type)}</small></div></div>`).join('')||emptyLine('검색 결과가 없습니다.');$$('.command-result').forEach((el,i)=>el.onclick=()=>{list[i].action();closeSearch()});commandSelected=0;updateCommandSelection();}
function updateCommandSelection(){const items=$$('.command-result');items.forEach((el,i)=>el.classList.toggle('selected',i===commandSelected));items[commandSelected]?.scrollIntoView({block:'nearest'});}

function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2200)}
function tick(){const d=new Date();$('#clock').textContent=d.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false})}setInterval(tick,1000);tick();

const notificationPanel=document.createElement('div');notificationPanel.className='notification-panel hidden';document.body.appendChild(notificationPanel);
function renderNotifications(){const c=counts();notificationPanel.innerHTML=`<div class="notification-head"><strong>알림</strong><button onclick="notificationPanel.classList.add('hidden')">닫기</button></div><div class="notification-item"><strong>미완료 할일 ${c.tasks}건</strong><small>할일 페이지에서 바로 완료할 수 있습니다.</small></div><div class="notification-item"><strong>Studio OS v1.5</strong><small>Digital Asset Registry가 활성화되었습니다.</small></div><div class="notification-item"><strong>Brain ${c.brain}건</strong><small>입력 데이터는 자동으로 저장됩니다.</small></div>`;}

$('#searchBtn').onclick=openSearch;
$('#notificationBtn').onclick=()=>{renderNotifications();notificationPanel.classList.toggle('hidden')};
$('#mobileMenu').onclick=()=>$('.sidebar').classList.toggle('open');
$('#overlay').onclick=e=>{if(e.target.id==='overlay')closeSearch()};
$('#commandInput').oninput=e=>renderSearch(e.target.value);
$('#commandInput').onkeydown=e=>{const items=$$('.command-result');if(e.key==='ArrowDown'){e.preventDefault();commandSelected=(commandSelected+1)%Math.max(items.length,1);updateCommandSelection()}if(e.key==='ArrowUp'){e.preventDefault();commandSelected=(commandSelected-1+Math.max(items.length,1))%Math.max(items.length,1);updateCommandSelection()}if(e.key==='Enter'){e.preventDefault();items[commandSelected]?.click()}};
document.addEventListener('click',e=>{if(!notificationPanel.contains(e.target)&&!$('#notificationBtn').contains(e.target))notificationPanel.classList.add('hidden')});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}if(e.key==='Escape'){closeSearch();closeModal();notificationPanel.classList.add('hidden')}if((e.metaKey||e.ctrlKey)&&e.key>='1'&&e.key<='9'){const idx=Number(e.key)-1;if(navItems[idx]){e.preventDefault();go(navItems[idx].id)}}});


// ===== Studio OS v1.5 · Digital Asset Operations =====
function projectNameById(id){return data.projects.find(p=>p.id===id)?.name||'';}
function todayISO(){return new Date().toISOString().slice(0,10);}
function renderIdeas(){
  const projectOptions=data.projects.map(p=>`<option>${esc(p.name)}</option>`).join('');
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">Idea Vault</span><h1>Ideas</h1><p>완성된 기획서가 아니라, AI와 대화를 시작할 수 있는 생각의 단편을 보관합니다.</p></div><button class="primary-btn compact" onclick="openIdeaV14()">아이디어 등록</button></div>
  <div class="constitution-score-grid"><div class="review-score"><small>전체 단편</small><strong>${data.ideas.length}</strong><span>Idea fragments</span></div><div class="review-score"><small>대화 대기</small><strong>${data.ideas.filter(x=>(x.stage||'Captured')==='Captured').length}</strong><span>AI Report 후보</span></div><div class="review-score"><small>논의 중</small><strong>${data.ideas.filter(x=>x.stage==='Discussing').length}</strong><span>AI feedback</span></div><div class="review-score"><small>프로젝트 연결</small><strong>${new Set(data.ideas.map(x=>x.project).filter(Boolean)).size}</strong><span>Linked projects</span></div></div>
  <div class="panel"><div class="panel-head"><h3>Idea Fragments</h3><small>짧게 기록하고 대화에서 발전</small></div><div class="asset-table">${data.ideas.map(i=>`<div class="asset-row"><div class="asset-main"><strong>${esc(i.text)}</strong><small>${esc(i.project||'미분류')} · ${esc(i.stage||'Captured')} · ${esc(i.date||'오늘')}</small></div><span class="status">${esc(i.category||'Idea')}</span><button class="tab" onclick="markIdeaDiscussion('${i.id}')">AI 논의</button><button class="tab" onclick="openIdeaV14('${i.id}')">편집</button></div>`).join('')||emptyLine('등록된 아이디어가 없습니다.')}</div></div>`;
}
function openIdeaV14(id=''){
 const i=data.ideas.find(x=>x.id===id)||{text:'',project:'',category:'Idea',stage:'Captured',date:'오늘'};
 openModal(id?'아이디어 편집':'아이디어 등록',`<label>아이디어 단편<textarea id="ideaText" placeholder="떠오른 생각을 짧게 기록">${esc(i.text)}</textarea></label><div class="form-grid"><label>프로젝트<select id="ideaProject"><option value="">미분류</option>${data.projects.map(p=>`<option ${i.project===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><label>분류<select id="ideaCategory">${['Idea','Feature','Problem','Direction','Conversation'].map(x=>`<option ${i.category===x?'selected':''}>${x}</option>`).join('')}</select></label></div><label>상태<select id="ideaStage">${['Captured','Discussing','Confirmed','Archived'].map(x=>`<option ${i.stage===x?'selected':''}>${x}</option>`).join('')}</select></label>`,()=>{const text=$('#ideaText').value.trim();if(!text)return toast('아이디어를 입력하세요.');const obj={id:id||uid('b'),text,project:$('#ideaProject').value,category:$('#ideaCategory').value,stage:$('#ideaStage').value,date:id?i.date:'오늘'};if(id){Object.assign(i,obj)}else data.ideas.unshift(obj);saveData();closeModal();renderIdeas();toast('아이디어 단편을 저장했습니다.');});
}
function markIdeaDiscussion(id){const i=data.ideas.find(x=>x.id===id);if(!i)return;i.stage='Discussing';data.aiSessions.unshift({id:uid('S'),project:i.project||'미분류',title:i.text,status:'Ready',date:todayISO(),notes:'Idea Vault에서 AI 논의 대상으로 전환'});saveData();renderIdeas();toast('AI Discussion 대기열에 추가했습니다.');}

function renderDevelopment(){
 const rows=data.projects.map(p=>{const d=getDevelopmentRecord(p.id);const ideas=data.ideas.filter(i=>i.project===p.name&&i.stage==='Discussing').length;const assets=data.digitalAssets.filter(a=>a.project===p.name).length;return `<button class="development-row" onclick="openProject('${p.id}')"><div><strong>${esc(p.name)}</strong><small>${esc(d.currentGoal)} · ${esc(d.sprint)}</small></div><span class="status">${esc(d.status)}</span><b>${ideas} Ideas</b><b>${assets} Assets</b><span>→</span></button>`}).join('');
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">AI Collaboration</span><h1>AI Discussion</h1><p>OS에서 큰 틀을 정하고, AI Report를 전달한 뒤 대화로 방향과 기능을 발전시킵니다.</p></div></div><div class="flow-strip"><span>Idea</span><b>→</b><span>Preset</span><b>→</b><span>AI Report</span><b>→</b><span>Discussion</span><b>→</b><span>Build</span><b>→</b><span>Asset</span></div><div class="panel"><div class="panel-head"><h3>Project Handoff</h3><small>프로젝트를 열어 Report 생성·결과 Import</small></div>${rows||emptyLine('프로젝트가 없습니다.')}</div>`;
}

function renderAssetsV14(){
 const active=data.digitalAssets.filter(a=>a.status!=='Archived').length,reuse=data.digitalAssets.reduce((n,a)=>n+(a.usageProjects||[]).length,0);
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">Digital Asset Lifecycle</span><h1>Assets</h1><p>AI와의 피드백으로 생성된 결과물을 등록하고, 버전·사용처·보완사항을 사후관리합니다.</p></div><button class="primary-btn compact" onclick="openAssetModal()">자산 등록</button></div><div class="constitution-score-grid"><div class="review-score"><small>전체 자산</small><strong>${data.digitalAssets.length}</strong><span>Registered</span></div><div class="review-score"><small>운영 중</small><strong>${active}</strong><span>Active assets</span></div><div class="review-score"><small>재사용 연결</small><strong>${reuse}</strong><span>Project links</span></div><div class="review-score"><small>보완 필요</small><strong>${data.digitalAssets.filter(a=>a.status==='Needs Update').length}</strong><span>Maintenance</span></div></div><div class="panel"><div class="panel-head"><h3>Asset Registry</h3><small>생성 → 사용 → 수정 → 재사용 → 보관</small></div><div class="asset-table">${data.digitalAssets.map(a=>`<div class="asset-row"><div class="asset-main"><strong>${esc(a.name)}</strong><small>${esc(a.project||'공통')} · ${esc(a.type)} · v${esc(a.version)}</small></div><span class="status">${esc(a.status)}</span><div class="asset-links">${(a.usageProjects||[]).slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('')}</div><button class="tab" onclick="openAssetModal('${a.id}')">관리</button></div>`).join('')||emptyLine('아직 등록된 디지털 자산이 없습니다.')}</div></div>`;
}
function openAssetModal(id=''){
 const a=data.digitalAssets.find(x=>x.id===id)||{name:'',project:'',type:'Source',version:'1.0.0',status:'Active',location:'',note:'',usageProjects:[]};
 openModal(id?'디지털 자산 관리':'디지털 자산 등록',`<label>자산명<input id="assetName" value="${esc(a.name)}" placeholder="예: 우리집캐디 Flutter v0.1"></label><div class="form-grid"><label>원본 프로젝트<select id="assetProject"><option value="">공통 자산</option>${data.projects.map(p=>`<option ${a.project===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><label>유형<select id="assetType">${['Source','APK','Design','Image','Audio','Video','Document','Prompt','Template','Data','Other'].map(x=>`<option ${a.type===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="form-grid"><label>버전<input id="assetVersion" value="${esc(a.version)}"></label><label>상태<select id="assetStatus">${['Draft','Active','Needs Update','Deprecated','Archived'].map(x=>`<option ${a.status===x?'selected':''}>${x}</option>`).join('')}</select></label></div><label>파일 위치·참조<input id="assetLocation" value="${esc(a.location||'')}" placeholder="파일명, 폴더, URL 메모"></label><label>사용 프로젝트 (쉼표 구분)<input id="assetUsage" value="${esc((a.usageProjects||[]).join(', '))}"></label><label>보완사항·메모<textarea id="assetNote">${esc(a.note||'')}</textarea></label>`,()=>{const name=$('#assetName').value.trim();if(!name)return toast('자산명을 입력하세요.');const obj={id:id||uid('A'),name,project:$('#assetProject').value,type:$('#assetType').value,version:$('#assetVersion').value.trim()||'1.0.0',status:$('#assetStatus').value,location:$('#assetLocation').value.trim(),usageProjects:$('#assetUsage').value.split(',').map(x=>x.trim()).filter(Boolean),note:$('#assetNote').value.trim(),updated:todayISO(),history:[...(a.history||[]),{date:todayISO(),version:$('#assetVersion').value.trim()||'1.0.0',status:$('#assetStatus').value}]};if(id)Object.assign(a,obj);else data.digitalAssets.unshift(obj);saveData();closeModal();renderAssetsV14();toast('디지털 자산을 저장했습니다.');});
}

const openProjectV13=openProject;
openProject=function(id){openProjectV13(id);const p=data.projects.find(x=>x.id===id);if(!p)return;const root=$('#content');const ideas=data.ideas.filter(i=>i.project===p.name),assets=data.digitalAssets.filter(a=>a.project===p.name||(a.usageProjects||[]).includes(p.name));root.insertAdjacentHTML('beforeend',`<div class="project-ops-grid"><section class="panel"><div class="panel-head"><div><span class="eyebrow">Before Development</span><h3>Idea Fragments</h3></div><button onclick="openIdeaForProject('${p.name}')">추가</button></div>${ideas.slice(0,5).map(i=>`<div class="mini-line"><strong>${esc(i.text)}</strong><small>${esc(i.stage||'Captured')}</small></div>`).join('')||emptyLine('아이디어 단편이 없습니다.')}</section><section class="panel"><div class="panel-head"><div><span class="eyebrow">After Development</span><h3>Digital Assets</h3></div><button onclick="openAssetForProject('${p.name}')">등록</button></div>${assets.slice(0,5).map(a=>`<div class="mini-line"><strong>${esc(a.name)} · v${esc(a.version)}</strong><small>${esc(a.type)} · ${esc(a.status)}</small></div>`).join('')||emptyLine('등록된 자산이 없습니다.')}</section></div>`);};
function openIdeaForProject(name){openIdeaV14();setTimeout(()=>{$('#ideaProject').value=name},30);}
function openAssetForProject(name){openAssetModal();setTimeout(()=>{$('#assetProject').value=name},30);}

const importDevelopmentResultV13=importDevelopmentResult;
importDevelopmentResult=function(projectId){const before=data.digitalAssets.length;const p=data.projects.find(x=>x.id===projectId);const version=$('#resultVersion')?.value.trim();const summary=$('#resultSummary')?.value.trim();importDevelopmentResultV13(projectId);if(version&&p){data.digitalAssets.unshift({id:uid('A'),name:`${p.name} Build ${version}`,project:p.name,type:'Source',version,status:'Draft',location:'',usageProjects:[p.name],note:summary||'AI 개발 결과 Import에서 자동 등록',updated:todayISO(),history:[{date:todayISO(),version,status:'Draft'}]});saveData();}};

renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>생각을 프로젝트로, 프로젝트를 자산으로 전환하는 Studio OS 발전 이력입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI, 일정, 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset과 Pack으로 개발 전 기준 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report 내보내기와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations — 현재</strong><p>Ideas → AI Discussion → Development → Assets → Knowledge 운영 흐름</p></div></div>`;};
renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>현재 브라우저에 저장된 Studio OS 데이터를 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>일정, 아이디어, 프로젝트, AI Handoff와 디지털 자산이 자동 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes</small></div><div class="panel"><h3>Data backup</h3><p>JSON 파일로 전체 운영 데이터를 이동할 수 있습니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.5 · Digital Asset Operations</p></div><div class="panel"><h3>Operating Principle</h3><p>생각을 프로젝트로, 프로젝트를 자산으로.</p></div></div>`;$('#importFile').onchange=importData;};

searchable=function(){return [{title:'Weekly Review',type:'AI Workspace',action:()=>go('review')},...navItems.map(n=>({title:n.label,type:'메뉴',action:()=>go(n.id)})),...data.projects.map(p=>({title:p.name,type:'프로젝트',action:()=>openProject(p.id)})),...data.tasks.map(t=>({title:t.title,type:'일정',action:()=>go('tasks')})),...data.ideas.map(i=>({title:i.text,type:'Idea',action:()=>go('brain')})),...data.digitalAssets.map(a=>({title:`${a.name} v${a.version}`,type:'Asset',action:()=>go('assets')})),...data.constitution.map(c=>({title:`${c.id} ${c.title}`,type:'Constitution',action:()=>{data.knowledgeTab='constitution';go('knowledge');setTimeout(()=>openConstitution(c.id),50)}}))];};



// ===== Studio OS v1.5 · Digital Asset Registry =====
const V15_ASSETS=[
{id:'MA-STUDIO-OS',name:'Studio OS',kind:'Master',type:'Application',project:'Studio OS',version:'1.5',status:'Active',location:'Studio_OS_v1.5_Digital_Asset_Registry.zip',usageProjects:['Studio OS'],note:'개인 프로젝트·AI 협업·디지털 자산 운영체계',relatedIds:['VA-STUDIO-10','VA-STUDIO-11','VA-STUDIO-12','VA-STUDIO-13','VA-STUDIO-14','VA-STUDIO-15'],parentId:'',updated:'2026-08-04'},
{id:'VA-STUDIO-10',name:'Studio OS v1.0 Foundation',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.0',status:'Frozen',location:'studio_os_v1.0_fixed(1).zip',usageProjects:['Studio OS'],note:'공식 UI·레이아웃 기준본',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:'2026-08-04'},
{id:'VA-STUDIO-11',name:'Studio OS v1.1 Knowledge & Constitution',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.1.1',status:'Completed',location:'Studio_OS_v1.1.1_Search_Fix.zip',usageProjects:['Studio OS'],note:'Knowledge, Constitution, Impact Analysis',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:'2026-08-04'},
{id:'VA-STUDIO-12',name:'Studio OS v1.2 Constitution Engine',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.2',status:'Completed',location:'Studio_OS_v1.2_Constitution_Engine.zip',usageProjects:['Studio OS'],note:'Preset, Pack, Project Constitution',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:'2026-08-04'},
{id:'VA-STUDIO-13',name:'Studio OS v1.3 AI Development Handoff',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.3',status:'Completed',location:'Studio_OS_v1.3_AI_Development_Handoff.zip',usageProjects:['Studio OS'],note:'AI Report와 개발 결과 회수',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:'2026-08-04'},
{id:'VA-STUDIO-14',name:'Studio OS v1.5 Digital Asset Operations',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.4',status:'Completed',location:'Studio_OS_v1.4_Digital_Asset_Operations.zip',usageProjects:['Studio OS'],note:'Ideas → AI Discussion → Assets 운영',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:'2026-08-04'},
{id:'VA-STUDIO-15',name:'Studio OS v1.5 Digital Asset Registry',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.5',status:'Active',location:'Studio_OS_v1.5_Digital_Asset_Registry.zip',usageProjects:['Studio OS'],note:'Master Asset, Version Asset, 관계·재사용 등록부',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:'2026-08-04'},
{id:'MA-SAMS',name:'SAMS',kind:'Master',type:'Application',project:'SAMS',version:'1.1.7',status:'Active',location:'Flutter project',usageProjects:['SAMS'],note:'설비 이력·예방정비·고장대응 통합 앱',relatedIds:['AS-SAMS-UI','AS-SAMS-TREE','AS-SAMS-EXCEL'],parentId:'',updated:'2026-08-01'},
{id:'AS-SAMS-UI',name:'SAMS UI Template',kind:'Component',type:'Template',project:'SAMS',version:'1.1.7',status:'Active',location:'Flutter UI',usageProjects:['SAMS'],note:'Edge-to-edge, 단일 SafeArea, 고정 Splash·아이콘',relatedIds:['MA-SAMS','AS-FLUTTER-BASE'],parentId:'MA-SAMS',updated:'2026-08-01'},
{id:'AS-SAMS-TREE',name:'SAMS Asset Tree',kind:'Component',type:'Data',project:'SAMS',version:'1.1',status:'Active',location:'Asset hierarchy',usageProjects:['SAMS'],note:'대·중·소 분류와 태그번호 중심 자산 트리',relatedIds:['MA-SAMS'],parentId:'MA-SAMS',updated:'2026-08-01'},
{id:'AS-SAMS-EXCEL',name:'SAMS Excel Import & Rollback',kind:'Component',type:'Component',project:'SAMS',version:'1.1.6',status:'Active',location:'Flutter module',usageProjects:['SAMS'],note:'버전·중복검사·롤백·날짜 로그',relatedIds:['MA-SAMS'],parentId:'MA-SAMS',updated:'2026-08-01'},
{id:'MA-BPM',name:'BPM 검색도우미',kind:'Master',type:'Application',project:'BPM 검색도우미',version:'1.0',status:'Active',location:'Flutter project',usageProjects:['BPM 검색도우미'],note:'과거 구매이력 기반 자재 구매가격 적정성 조회 앱',relatedIds:['AS-BPM-DATA','AS-BPM-UI'],parentId:'',updated:'2026-07-30'},
{id:'AS-BPM-DATA',name:'BPM Material Purchase History',kind:'Data',type:'Data',project:'BPM 검색도우미',version:'2026',status:'Active',location:'bpm_materials.json / Excel 8,418 rows',usageProjects:['BPM 검색도우미'],note:'자재명·규격·사업장·단가 이력 마스터 데이터',relatedIds:['MA-BPM'],parentId:'MA-BPM',updated:'2026-07-30'},
{id:'AS-BPM-UI',name:'Material Search-first UI',kind:'Template',type:'Template',project:'BPM 검색도우미',version:'1.0',status:'Reusable',location:'Flutter UI template',usageProjects:['BPM 검색도우미'],note:'홈 검색/리스트·상세·등록·업로드·설정 고정 구조',relatedIds:['MA-BPM','AS-FLUTTER-BASE'],parentId:'MA-BPM',updated:'2026-07-30'},
{id:'MA-BECO',name:'BECO Bowling',kind:'Master',type:'Application',project:'BECO Bowling',version:'1.8.4',status:'Active',location:'Flutter/Firebase project',usageProjects:['BECO Bowling'],note:'동호회 경기·랭킹·커뮤니티 운영 앱',relatedIds:['AS-BECO-RESULT','AS-BECO-FIREBASE'],parentId:'',updated:'2026-07-29'},
{id:'AS-BECO-RESULT',name:'Bowling Result Layout',kind:'Template',type:'Template',project:'BECO Bowling',version:'2026-07-15 Freeze',status:'Frozen',location:'Flutter result screen/PDF',usageProjects:['BECO Bowling'],note:'팀합계·게임점수·Avg·총합 고정 결과 레이아웃',relatedIds:['MA-BECO'],parentId:'MA-BECO',updated:'2026-07-15'},
{id:'AS-BECO-FIREBASE',name:'BECO Firebase Data Model',kind:'Data',type:'Data',project:'BECO Bowling',version:'1.8',status:'Active',location:'Firestore/Storage',usageProjects:['BECO Bowling'],note:'users, games, 공지, 게시판, match_media',relatedIds:['MA-BECO'],parentId:'MA-BECO',updated:'2026-07-29'},
{id:'MA-HOMECADDY',name:'우리집캐디',kind:'Master',type:'Application',project:'우리집캐디',version:'0.1.0',status:'Planning',location:'Project blueprint',usageProjects:['우리집캐디'],note:'수입·지출 관리와 목표 달성을 재미있게 돕는 가족 자산관리 앱',relatedIds:['AS-HOMECADDY-AI'],parentId:'',updated:'2026-08-04'},
{id:'AS-HOMECADDY-AI',name:'우리집캐디 AI Development Package',kind:'Document',type:'AI Report',project:'우리집캐디',version:'0.1.0',status:'Active',location:'우리집캐디_AI_Package.md',usageProjects:['우리집캐디'],note:'Project DNA와 Constitution 기반 개발 인수인계 문서',relatedIds:['MA-HOMECADDY'],parentId:'MA-HOMECADDY',updated:'2026-08-04'},
{id:'MA-REPORT-MONTHLY',name:'주간운영팀 월간 보고 체계',kind:'Master',type:'Document',project:'',version:'1.0',status:'Reusable',location:'Fixed report templates',usageProjects:['업무 보고'],note:'월간 계획·결과 보고 고정 레이아웃',relatedIds:['AS-REPORT-PLAN','AS-REPORT-RESULT'],parentId:'',updated:'2026-07-24'},
{id:'AS-REPORT-PLAN',name:'주간운영팀 월간 계획 보고',kind:'Template',type:'Template',project:'',version:'1.0',status:'Frozen',location:'A4 template',usageProjects:['업무 보고'],note:'페이지와 카드 크기 고정, 내용만 변경',relatedIds:['MA-REPORT-MONTHLY'],parentId:'MA-REPORT-MONTHLY',updated:'2026-07-24'},
{id:'AS-REPORT-RESULT',name:'주간운영팀 월간 결과 보고',kind:'Template',type:'Template',project:'',version:'1.0',status:'Frozen',location:'A4 template',usageProjects:['업무 보고'],note:'계획 보고와 동일한 고정 레이아웃',relatedIds:['MA-REPORT-MONTHLY'],parentId:'MA-REPORT-MONTHLY',updated:'2026-07-24'},
{id:'MA-ROADMAP-DOC',name:'2026 H2 Master Plan',kind:'Master',type:'Document',project:'Studio OS',version:'1.0',status:'Active',location:'Design Engine/PNG',usageProjects:['Studio OS'],note:'8~12월 타임라인·목표·프로젝트 로드맵',relatedIds:['AS-DESIGN-ENGINE'],parentId:'',updated:'2026-07-30'},
{id:'AS-DESIGN-ENGINE',name:'Design Engine',kind:'Template',type:'Template',project:'Studio OS',version:'1.0',status:'Reusable',location:'HTML/CSS/JS package',usageProjects:['Studio OS','보고서','인포그래픽'],note:'PNG 기준을 HTML·CSS·JS 실행형 시각 문서로 재현',relatedIds:['MA-ROADMAP-DOC'],parentId:'',updated:'2026-07-30'},
{id:'AS-KEYNOTE-LAYERS',name:'Keynote Design/Text Layer Rule',kind:'Template',type:'Template',project:'',version:'1.0',status:'Reusable',location:'Keynote workflow',usageProjects:['프레젠테이션'],note:'Design Layer와 editable Text Layer 분리',relatedIds:[],parentId:'',updated:'2026-07-30'},
{id:'AS-FLUTTER-BASE',name:'Flutter Base UI Template',kind:'Template',type:'Template',project:'',version:'1.0',status:'Reusable',location:'Flutter baseline',usageProjects:['SAMS','BPM 검색도우미','BECO Bowling','우리집캐디'],note:'투명 상태바, Edge-to-edge, 단일 SafeArea, 시스템바 통일',relatedIds:['AS-SAMS-UI','AS-BPM-UI'],parentId:'',updated:'2026-08-01'},
{id:'MA-IMAGE-ASSETS',name:'Image & Infographic Collection',kind:'Master',type:'Image',project:'',version:'1.0',status:'Active',location:'PNG/JPG outputs',usageProjects:['보고서','프로필','프로젝트 소개'],note:'인포그래픽·보고서 PNG·이미지 합성·아이콘·프로필 이미지 모음',relatedIds:['AS-IMAGE-INFO','AS-IMAGE-ICON'],parentId:'',updated:'2026-08-04'},
{id:'AS-IMAGE-INFO',name:'Project Infographic Assets',kind:'Collection',type:'Image',project:'',version:'1.0',status:'Reusable',location:'PNG outputs',usageProjects:['SAMS','BPM 검색도우미','Studio OS'],note:'프로젝트 설명·구조·로드맵 인포그래픽',relatedIds:['MA-IMAGE-ASSETS'],parentId:'MA-IMAGE-ASSETS',updated:'2026-08-04'},
{id:'AS-IMAGE-ICON',name:'App Icon & Splash Assets',kind:'Collection',type:'Design',project:'',version:'1.0',status:'Reusable',location:'PNG assets',usageProjects:['SAMS','BPM 검색도우미','BECO Bowling'],note:'앱 아이콘, Splash, 로고 자산',relatedIds:['MA-IMAGE-ASSETS'],parentId:'MA-IMAGE-ASSETS',updated:'2026-08-04'},
{id:'MA-MUSIC',name:'Shorts Music Assets',kind:'Master',type:'Music',project:'',version:'0.1',status:'Planning',location:'Audio project',usageProjects:['쇼츠 콘텐츠'],note:'쇼츠용 음원·AI Music Prompt·Master Export',relatedIds:['AS-MUSIC-PROMPT'],parentId:'',updated:'2026-08-03'},
{id:'AS-MUSIC-PROMPT',name:'AI Music Prompt Pack',kind:'Prompt',type:'Prompt',project:'',version:'0.1',status:'Draft',location:'Prompt Library',usageProjects:['쇼츠 음원'],note:'쇼츠 음악 제작 대화와 프롬프트 자산',relatedIds:['MA-MUSIC'],parentId:'MA-MUSIC',updated:'2026-08-03'}
];
function normalizeV15Asset(a){return {id:a.id||uid('A'),name:a.name||'Untitled',kind:a.kind||'Asset',type:a.type||'Other',project:a.project||'',version:a.version||'1.0.0',status:a.status||'Active',location:a.location||'',usageProjects:a.usageProjects||[],note:a.note||'',relatedIds:a.relatedIds||[],parentId:a.parentId||'',updated:a.updated||todayISO(),history:a.history||[{date:a.updated||todayISO(),version:a.version||'1.0.0',status:a.status||'Active'}]};}
(function migrateV15(){
 if(!data.assetView)data.assetView='masters'; if(!data.assetFilter)data.assetFilter='All';
 data.digitalAssets=(data.digitalAssets||[]).map(normalizeV15Asset);
 const ids=new Set(data.digitalAssets.map(a=>a.id));
 V15_ASSETS.forEach(a=>{if(!ids.has(a.id))data.digitalAssets.push(normalizeV15Asset(a));});
 saveData();
})();

function assetChildren(id){return data.digitalAssets.filter(a=>a.parentId===id);}
function assetById(id){return data.digitalAssets.find(a=>a.id===id);}
function renderAssetsV15(){
 const types=['All',...new Set(data.digitalAssets.map(a=>a.type))];
 const shown=data.assetView==='masters'?data.digitalAssets.filter(a=>a.kind==='Master'):data.digitalAssets.filter(a=>data.assetFilter==='All'||a.type===data.assetFilter);
 const reuse=data.digitalAssets.reduce((n,a)=>n+(a.usageProjects||[]).length,0);
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">Digital Asset Registry</span><h1>Assets</h1><p>Master Asset 아래에 버전·결과물·소스·템플릿을 연결하고 재사용과 사후관리를 기록합니다.</p></div><button class="primary-btn compact" onclick="openAssetModalV15()">자산 등록</button></div>
 <div class="constitution-score-grid"><div class="review-score"><small>Master Assets</small><strong>${data.digitalAssets.filter(a=>a.kind==='Master').length}</strong><span>Asset families</span></div><div class="review-score"><small>전체 자산</small><strong>${data.digitalAssets.length}</strong><span>Registered</span></div><div class="review-score"><small>재사용 연결</small><strong>${reuse}</strong><span>Project links</span></div><div class="review-score"><small>보완 필요</small><strong>${data.digitalAssets.filter(a=>a.status==='Needs Update').length}</strong><span>Maintenance</span></div></div>
 <div class="asset-toolbar panel"><div class="segmented"><button class="${data.assetView==='masters'?'active':''}" onclick="data.assetView='masters';saveData();renderAssetsV15()">Master View</button><button class="${data.assetView==='all'?'active':''}" onclick="data.assetView='all';saveData();renderAssetsV15()">All Assets</button></div>${data.assetView==='all'?`<select onchange="data.assetFilter=this.value;saveData();renderAssetsV15()">${types.map(x=>`<option ${data.assetFilter===x?'selected':''}>${esc(x)}</option>`).join('')}</select>`:''}</div>
 <div class="asset-registry-grid">${shown.map(a=>renderAssetCardV15(a)).join('')||emptyLine('등록된 자산이 없습니다.')}</div>`;
}
function renderAssetCardV15(a){const children=assetChildren(a.id), rel=(a.relatedIds||[]).map(assetById).filter(Boolean);return `<article class="asset-card-v15"><div class="asset-card-top"><span class="asset-kind">${esc(a.kind)}</span><span class="status">${esc(a.status)}</span></div><h3>${esc(a.name)}</h3><p>${esc(a.note||'설명 없음')}</p><div class="asset-meta"><span>${esc(a.type)}</span><span>v${esc(a.version)}</span><span>${esc(a.project||'공통')}</span></div>${children.length?`<div class="asset-child-list"><small>Versions / Components</small>${children.slice(0,5).map(c=>`<button onclick="openAssetDetailV15('${c.id}')"><b>${esc(c.name)}</b><span>${esc(c.type)} · v${esc(c.version)}</span></button>`).join('')}</div>`:''}<div class="asset-card-foot"><small>${(a.usageProjects||[]).length} reuse · ${rel.length} relations</small><button class="tab" onclick="openAssetDetailV15('${a.id}')">열기</button></div></article>`;}
function openAssetDetailV15(id){const a=assetById(id);if(!a)return;const children=assetChildren(id), rel=(a.relatedIds||[]).map(assetById).filter(Boolean), parent=assetById(a.parentId);openModal('디지털 자산',`<div class="asset-detail-head"><span class="asset-kind">${esc(a.kind)}</span><h2>${esc(a.name)}</h2><p>${esc(a.note||'')}</p></div><div class="detail-grid"><div><small>Type</small><strong>${esc(a.type)}</strong></div><div><small>Version</small><strong>${esc(a.version)}</strong></div><div><small>Status</small><strong>${esc(a.status)}</strong></div><div><small>Project</small><strong>${esc(a.project||'공통')}</strong></div></div>${parent?`<div class="relation-box"><small>Master Asset</small><button onclick="closeModal();openAssetDetailV15('${parent.id}')">${esc(parent.name)}</button></div>`:''}<div class="relation-box"><small>File / Reference</small><p>${esc(a.location||'미등록')}</p></div><div class="relation-box"><small>Used by</small><div class="asset-links">${(a.usageProjects||[]).map(x=>`<span>${esc(x)}</span>`).join('')||'<span>미등록</span>'}</div></div>${children.length?`<div class="relation-box"><small>Versions / Components</small>${children.map(c=>`<button onclick="closeModal();openAssetDetailV15('${c.id}')">${esc(c.name)} · v${esc(c.version)}</button>`).join('')}</div>`:''}${rel.length?`<div class="relation-box"><small>Related Assets</small>${rel.map(r=>`<button onclick="closeModal();openAssetDetailV15('${r.id}')">${esc(r.name)}</button>`).join('')}</div>`:''}<div class="page-actions"><button class="tab" onclick="closeModal();openAssetModalV15('${a.id}')">편집</button></div>`,()=>closeModal());}
function openAssetModalV15(id=''){const a=id?assetById(id):normalizeV15Asset({});openModal(id?'디지털 자산 편집':'디지털 자산 등록',`<label>자산명<input id="assetName" value="${esc(a.name==='Untitled'?'':a.name)}"></label><div class="form-grid"><label>구조<select id="assetKind">${['Master','Version','Component','Template','Data','Document','Prompt','Collection','Asset'].map(x=>`<option ${a.kind===x?'selected':''}>${x}</option>`).join('')}</select></label><label>유형<select id="assetType">${['Application','Source Code','APK','Design','Image','Music','Video','Document','AI Report','Prompt','Template','Data','Component','Other'].map(x=>`<option ${a.type===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="form-grid"><label>Master Asset<select id="assetParent"><option value="">없음 / 최상위</option>${data.digitalAssets.filter(x=>x.kind==='Master'&&x.id!==id).map(x=>`<option value="${x.id}" ${a.parentId===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label><label>원본 프로젝트<select id="assetProject"><option value="">공통 자산</option>${data.projects.map(p=>`<option ${a.project===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label></div><div class="form-grid"><label>버전<input id="assetVersion" value="${esc(a.version)}"></label><label>상태<select id="assetStatus">${['Planning','Draft','Active','Reusable','Completed','Frozen','Needs Update','Deprecated','Archived'].map(x=>`<option ${a.status===x?'selected':''}>${x}</option>`).join('')}</select></label></div><label>파일 위치·참조<input id="assetLocation" value="${esc(a.location)}"></label><label>사용 프로젝트 (쉼표 구분)<input id="assetUsage" value="${esc((a.usageProjects||[]).join(', '))}"></label><label>관련 자산 ID (쉼표 구분)<input id="assetRelated" value="${esc((a.relatedIds||[]).join(', '))}"></label><label>설명·보완사항<textarea id="assetNote">${esc(a.note)}</textarea></label>`,()=>{const name=$('#assetName').value.trim();if(!name)return toast('자산명을 입력하세요.');const obj=normalizeV15Asset({...a,id:id||uid('A'),name,kind:$('#assetKind').value,type:$('#assetType').value,parentId:$('#assetParent').value,project:$('#assetProject').value,version:$('#assetVersion').value.trim()||'1.0.0',status:$('#assetStatus').value,location:$('#assetLocation').value.trim(),usageProjects:$('#assetUsage').value.split(',').map(x=>x.trim()).filter(Boolean),relatedIds:$('#assetRelated').value.split(',').map(x=>x.trim()).filter(Boolean),note:$('#assetNote').value.trim(),updated:todayISO(),history:[...(a.history||[]),{date:todayISO(),version:$('#assetVersion').value.trim()||'1.0.0',status:$('#assetStatus').value}]});if(id)Object.assign(a,obj);else data.digitalAssets.unshift(obj);saveData();closeModal();renderAssetsV15();toast('디지털 자산을 저장했습니다.');});}
renderAssetsV14=renderAssetsV15;
pages.assets=renderAssetsV15;
renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>생각을 프로젝트로, 프로젝트를 자산으로 전환하는 Studio OS 발전 이력입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI, 일정, 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset과 Pack으로 개발 전 기준 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report 내보내기와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations</strong><p>Ideas → AI Discussion → Development → Assets → Knowledge 운영 흐름</p></div><div class="roadmap-row"><strong>v1.5 · Digital Asset Registry — 현재</strong><p>Master Asset, Version Asset, 관계·재사용·사후관리 등록부</p></div></div>`;};
renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>현재 브라우저에 저장된 Studio OS 데이터를 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>일정, 아이디어, 프로젝트, AI Handoff와 디지털 자산이 자동 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes</small></div><div class="panel"><h3>Data backup</h3><p>JSON 파일로 전체 운영 데이터를 이동할 수 있습니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.5 · Digital Asset Registry</p></div><div class="panel"><h3>Operating Principle</h3><p>생각을 프로젝트로, 프로젝트를 자산으로.</p></div></div>`;$('#importFile').onchange=importData;};

buildNav();go('home');

// ===== Studio OS v1.6 · Asset Workspace =====
const ASSET_DB_NAME='studio_os_asset_workspace_v16';
const ASSET_STORE='files';
function openAssetDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(ASSET_DB_NAME,1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(ASSET_STORE))db.createObjectStore(ASSET_STORE,{keyPath:'id'});};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
async function storeAssetFile(assetId,file){const db=await openAssetDB();return new Promise((resolve,reject)=>{const tx=db.transaction(ASSET_STORE,'readwrite');tx.objectStore(ASSET_STORE).put({id:assetId,file,name:file.name,type:file.type,size:file.size,updated:new Date().toISOString()});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
async function getAssetFile(assetId){const db=await openAssetDB();return new Promise((resolve,reject)=>{const req=db.transaction(ASSET_STORE,'readonly').objectStore(ASSET_STORE).get(assetId);req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error);});}
async function deleteAssetFile(assetId){const db=await openAssetDB();return new Promise((resolve,reject)=>{const tx=db.transaction(ASSET_STORE,'readwrite');tx.objectStore(ASSET_STORE).delete(assetId);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});}
function formatBytes(n=0){if(!n)return '0 B';const u=['B','KB','MB','GB'];const i=Math.min(Math.floor(Math.log(n)/Math.log(1024)),3);return `${(n/Math.pow(1024,i)).toFixed(i?1:0)} ${u[i]}`;}
(function migrateV16(){data.assetWorkspace=data.assetWorkspace||{selectedProject:'',query:'',resourceFilter:'All'};data.digitalAssets=(data.digitalAssets||[]).map(a=>({...a,resource:a.resource||null,externalUrl:a.externalUrl||'',aiSelected:!!a.aiSelected}));if(!data.digitalAssets.some(a=>a.id==='VA-STUDIO-16')){data.digitalAssets.push(normalizeV15Asset({id:'VA-STUDIO-16',name:'Studio OS v1.6 Asset Workspace',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.6',status:'Active',location:'Studio_OS_v1.6_Asset_Workspace.zip',usageProjects:['Studio OS'],note:'실제 파일 연결, 미리보기, 다운로드, 프로젝트 적용, AI Package 연결',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:todayISO()}));}const master=assetById('MA-STUDIO-OS');if(master&&!master.relatedIds.includes('VA-STUDIO-16'))master.relatedIds.push('VA-STUDIO-16');saveData();})();

function assetResourceLabel(a){if(a.resource?.name)return `${a.resource.name} · ${formatBytes(a.resource.size)}`;if(a.externalUrl)return '외부 링크 연결';if(a.location)return '참조 위치 기록';return '리소스 미연결';}
function renderAssetsV16(){
 const q=(data.assetWorkspace.query||'').toLowerCase();
 const types=['All',...new Set(data.digitalAssets.map(a=>a.type))];
 let shown=data.assetView==='masters'?data.digitalAssets.filter(a=>a.kind==='Master'):data.digitalAssets.filter(a=>data.assetFilter==='All'||a.type===data.assetFilter);
 if(q)shown=shown.filter(a=>[a.name,a.note,a.project,a.type,a.location,a.externalUrl].join(' ').toLowerCase().includes(q));
 const connected=data.digitalAssets.filter(a=>a.resource||a.externalUrl).length;
 const selected=data.digitalAssets.filter(a=>a.aiSelected).length;
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">Asset Workspace</span><h1>Assets</h1><p>자산 기록과 실제 파일·링크를 연결하고, 프로젝트와 AI 개발 패키지에서 바로 활용합니다.</p></div><button class="primary-btn compact" onclick="openAssetModalV16()">자산 등록</button></div>
 <div class="constitution-score-grid"><div class="review-score"><small>전체 자산</small><strong>${data.digitalAssets.length}</strong><span>Registered</span></div><div class="review-score"><small>실제 리소스</small><strong>${connected}</strong><span>Connected</span></div><div class="review-score"><small>AI 선택</small><strong>${selected}</strong><span>Handoff ready</span></div><div class="review-score"><small>보완 필요</small><strong>${data.digitalAssets.filter(a=>a.status==='Needs Update'||(!a.resource&&!a.externalUrl&&!a.location)).length}</strong><span>Maintenance</span></div></div>
 <div class="asset-toolbar panel"><div class="segmented"><button class="${data.assetView==='masters'?'active':''}" onclick="data.assetView='masters';saveData();renderAssetsV16()">Master View</button><button class="${data.assetView==='all'?'active':''}" onclick="data.assetView='all';saveData();renderAssetsV16()">All Assets</button></div><input class="asset-search-v16" value="${esc(data.assetWorkspace.query||'')}" placeholder="자산·프로젝트·파일 검색" oninput="data.assetWorkspace.query=this.value;saveData();renderAssetGridV16()">${data.assetView==='all'?`<select onchange="data.assetFilter=this.value;saveData();renderAssetsV16()">${types.map(x=>`<option ${data.assetFilter===x?'selected':''}>${esc(x)}</option>`).join('')}</select>`:''}</div>
 <div id="assetGridV16" class="asset-registry-grid">${shown.map(renderAssetCardV16).join('')||emptyLine('조건에 맞는 자산이 없습니다.')}</div>`;
}
function renderAssetGridV16(){const box=$('#assetGridV16');if(!box)return;const q=(data.assetWorkspace.query||'').toLowerCase();let shown=data.assetView==='masters'?data.digitalAssets.filter(a=>a.kind==='Master'):data.digitalAssets.filter(a=>data.assetFilter==='All'||a.type===data.assetFilter);if(q)shown=shown.filter(a=>[a.name,a.note,a.project,a.type,a.location,a.externalUrl].join(' ').toLowerCase().includes(q));box.innerHTML=shown.map(renderAssetCardV16).join('')||emptyLine('조건에 맞는 자산이 없습니다.');}
function renderAssetCardV16(a){const children=assetChildren(a.id);const resource=a.resource||a.externalUrl;return `<article class="asset-card-v15 asset-card-v16"><div class="asset-card-top"><span class="asset-kind">${esc(a.kind)}</span><span class="status">${esc(a.status)}</span></div><h3>${esc(a.name)}</h3><p>${esc(a.note||'설명 없음')}</p><div class="asset-meta"><span>${esc(a.type)}</span><span>v${esc(a.version)}</span><span>${esc(a.project||'공통')}</span></div><div class="asset-resource-state ${resource?'connected':''}"><b>${resource?'●':'○'}</b><span>${esc(assetResourceLabel(a))}</span></div>${children.length?`<div class="asset-child-list"><small>Versions / Components</small>${children.slice(0,4).map(c=>`<button onclick="openAssetDetailV16('${c.id}')"><b>${esc(c.name)}</b><span>${esc(c.type)} · ${c.resource||c.externalUrl?'연결됨':'기록만'}</span></button>`).join('')}</div>`:''}<div class="asset-card-foot"><small>${(a.usageProjects||[]).length} projects · ${a.aiSelected?'AI selected':'AI off'}</small><button class="tab" onclick="openAssetDetailV16('${a.id}')">활용</button></div></article>`;}
async function openAssetDetailV16(id){const a=assetById(id);if(!a)return;const stored=await getAssetFile(id).catch(()=>null);if(stored&&!a.resource){a.resource={name:stored.name,type:stored.type,size:stored.size,updated:stored.updated};saveData();}const children=assetChildren(id),rel=(a.relatedIds||[]).map(assetById).filter(Boolean),parent=assetById(a.parentId);openModal('Asset Workspace',`<div class="asset-detail-head"><span class="asset-kind">${esc(a.kind)}</span><h2>${esc(a.name)}</h2><p>${esc(a.note||'')}</p></div><div class="detail-grid"><div><small>Type</small><strong>${esc(a.type)}</strong></div><div><small>Version</small><strong>${esc(a.version)}</strong></div><div><small>Status</small><strong>${esc(a.status)}</strong></div><div><small>Project</small><strong>${esc(a.project||'공통')}</strong></div></div><div class="resource-workspace"><div><small>Connected Resource</small><strong>${esc(assetResourceLabel(a))}</strong>${a.externalUrl?`<p>${esc(a.externalUrl)}</p>`:''}</div><div class="resource-actions"><button onclick="attachAssetFileV16('${a.id}')">파일 연결</button>${stored?`<button onclick="previewAssetV16('${a.id}')">미리보기</button><button onclick="downloadAssetV16('${a.id}')">다운로드</button>`:''}${a.externalUrl?`<button onclick="openExternalAssetV16('${a.id}')">링크 열기</button>`:''}</div></div><div class="relation-box"><small>프로젝트에 적용</small><div class="project-apply-list">${data.projects.map(p=>`<label><input type="checkbox" ${((a.usageProjects||[]).includes(p.name))?'checked':''} onchange="toggleAssetProjectV16('${a.id}','${p.id}',this.checked)"><span>${esc(p.name)}</span></label>`).join('')||'<span>등록된 프로젝트 없음</span>'}</div></div><div class="relation-box ai-package-box-v162"><label class="ai-select-line-v162"><span><b>AI Package에 포함</b><small>프로젝트 Handoff 문서에 이 자산과 리소스 정보를 포함합니다.</small></span><input type="checkbox" ${a.aiSelected?'checked':''} onchange="toggleAssetAISelectionV16('${a.id}',this.checked)" aria-label="AI Package에 포함"></label></div>${parent?`<div class="relation-box"><small>Master Asset</small><button onclick="closeModal();openAssetDetailV16('${parent.id}')">${esc(parent.name)}</button></div>`:''}${children.length?`<div class="relation-box"><small>Versions / Components</small>${children.map(c=>`<button onclick="closeModal();openAssetDetailV16('${c.id}')">${esc(c.name)} · v${esc(c.version)}</button>`).join('')}</div>`:''}${rel.length?`<div class="relation-box"><small>Related Assets</small>${rel.map(r=>`<button onclick="closeModal();openAssetDetailV16('${r.id}')">${esc(r.name)}</button>`).join('')}</div>`:''}<div class="page-actions"><button class="tab" onclick="closeModal();openAssetModalV16('${a.id}')">정보 편집</button>${stored?`<button class="tab danger" onclick="removeAssetFileV16('${a.id}')">파일 연결 해제</button>`:''}</div>`,()=>closeModal());}
function attachAssetFileV16(id){const input=document.createElement('input');input.type='file';input.onchange=async()=>{const file=input.files?.[0];if(!file)return;await storeAssetFile(id,file);const a=assetById(id);a.resource={name:file.name,type:file.type||'application/octet-stream',size:file.size,updated:new Date().toISOString()};a.location=file.name;a.updated=todayISO();saveData();closeModal();toast('실제 파일을 자산에 연결했습니다.');openAssetDetailV16(id);};input.click();}
async function previewAssetV16(id){const rec=await getAssetFile(id);if(!rec)return toast('연결된 파일이 없습니다.');const url=URL.createObjectURL(rec.file);const t=rec.type||'';let body='';if(t.startsWith('image/'))body=`<img class="asset-preview-media" src="${url}">`;else if(t.startsWith('audio/'))body=`<audio class="asset-preview-audio" controls autoplay src="${url}"></audio>`;else if(t.startsWith('video/'))body=`<video class="asset-preview-media" controls autoplay src="${url}"></video>`;else if(t==='application/pdf')body=`<iframe class="asset-preview-frame" src="${url}"></iframe>`;else {URL.revokeObjectURL(url);return downloadAssetV16(id);}openModal(`미리보기 · ${rec.name}`,body,()=>{URL.revokeObjectURL(url);closeModal();});}
async function downloadAssetV16(id){const rec=await getAssetFile(id);if(!rec)return toast('연결된 파일이 없습니다.');const url=URL.createObjectURL(rec.file),a=document.createElement('a');a.href=url;a.download=rec.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('파일을 다운로드했습니다.');}
function openExternalAssetV16(id){const a=assetById(id);if(!a?.externalUrl)return;window.open(a.externalUrl,'_blank','noopener');}
async function removeAssetFileV16(id){await deleteAssetFile(id);const a=assetById(id);a.resource=null;saveData();closeModal();toast('파일 연결을 해제했습니다.');openAssetDetailV16(id);}
function toggleAssetProjectV16(assetId,projectId,on){const a=assetById(assetId),p=data.projects.find(x=>x.id===projectId);if(!a||!p)return;const set=new Set(a.usageProjects||[]);on?set.add(p.name):set.delete(p.name);a.usageProjects=[...set];a.updated=todayISO();saveData();toast(on?`${p.name}에 자산을 적용했습니다.`:`${p.name} 연결을 해제했습니다.`);}
function toggleAssetAISelectionV16(id,on){const a=assetById(id);if(!a)return;a.aiSelected=on;saveData();toast(on?'AI Package 포함 자산으로 선택했습니다.':'AI Package 선택을 해제했습니다.');}
function openAssetModalV16(id=''){const a=id?assetById(id):normalizeV15Asset({});openModal(id?'디지털 자산 편집':'디지털 자산 등록',`<label>자산명<input id="assetName" value="${esc(a.name==='Untitled'?'':a.name)}"></label><div class="form-grid"><label>구조<select id="assetKind">${['Master','Version','Component','Template','Data','Document','Prompt','Collection','Asset'].map(x=>`<option ${a.kind===x?'selected':''}>${x}</option>`).join('')}</select></label><label>유형<select id="assetType">${['Application','Source Code','APK','Design','Image','Music','Video','Document','AI Report','Prompt','Template','Data','Component','Other'].map(x=>`<option ${a.type===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="form-grid"><label>Master Asset<select id="assetParent"><option value="">없음 / 최상위</option>${data.digitalAssets.filter(x=>x.kind==='Master'&&x.id!==id).map(x=>`<option value="${x.id}" ${a.parentId===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label><label>원본 프로젝트<select id="assetProject"><option value="">공통 자산</option>${data.projects.map(p=>`<option ${a.project===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label></div><div class="form-grid"><label>버전<input id="assetVersion" value="${esc(a.version)}"></label><label>상태<select id="assetStatus">${['Planning','Draft','Active','Reusable','Completed','Frozen','Needs Update','Deprecated','Archived'].map(x=>`<option ${a.status===x?'selected':''}>${x}</option>`).join('')}</select></label></div><label>외부 URL<input id="assetExternalUrl" value="${esc(a.externalUrl||'')}" placeholder="https://..."></label><label>파일 위치·참조 메모<input id="assetLocation" value="${esc(a.location||'')}"></label><label>사용 프로젝트 (쉼표 구분)<input id="assetUsage" value="${esc((a.usageProjects||[]).join(', '))}"></label><label>관련 자산 ID (쉼표 구분)<input id="assetRelated" value="${esc((a.relatedIds||[]).join(', '))}"></label><label>설명·보완사항<textarea id="assetNote">${esc(a.note||'')}</textarea></label>`,()=>{const name=$('#assetName').value.trim();if(!name)return toast('자산명을 입력하세요.');const obj=normalizeV15Asset({...a,id:id||uid('A'),name,kind:$('#assetKind').value,type:$('#assetType').value,parentId:$('#assetParent').value,project:$('#assetProject').value,version:$('#assetVersion').value.trim()||'1.0.0',status:$('#assetStatus').value,externalUrl:$('#assetExternalUrl').value.trim(),location:$('#assetLocation').value.trim(),usageProjects:$('#assetUsage').value.split(',').map(x=>x.trim()).filter(Boolean),relatedIds:$('#assetRelated').value.split(',').map(x=>x.trim()).filter(Boolean),note:$('#assetNote').value.trim(),updated:todayISO(),resource:a.resource||null,aiSelected:!!a.aiSelected,history:[...(a.history||[]),{date:todayISO(),version:$('#assetVersion').value.trim()||'1.0.0',status:$('#assetStatus').value}]});if(id)Object.assign(a,obj);else data.digitalAssets.unshift(obj);saveData();closeModal();renderAssetsV16();toast('디지털 자산을 저장했습니다.');});}

const projectPackageV15=projectPackage;
projectPackage=function(projectId){const pkg=projectPackageV15(projectId);const p=data.projects.find(x=>x.id===projectId);const selected=data.digitalAssets.filter(a=>a.aiSelected&&((a.usageProjects||[]).includes(p?.name)||!a.project||a.project===p?.name));pkg.studioOSVersion='1.6';pkg.assetWorkspace=selected.map(a=>({id:a.id,name:a.name,type:a.type,version:a.version,status:a.status,project:a.project,resource:a.resource||null,externalUrl:a.externalUrl||'',location:a.location||'',note:a.note||''}));return pkg;};
const packageMarkdownV15=packageMarkdown;
packageMarkdown=function(pkg){return packageMarkdownV15(pkg)+`\n\n## Selected Asset Resources\n${(pkg.assetWorkspace||[]).map(a=>`- ${a.name} · ${a.type} · v${a.version}\n  - Resource: ${a.resource?.name||a.externalUrl||a.location||'Not connected'}\n  - Note: ${a.note||'-'}`).join('\n')||'- None selected'}\n\n## Asset Use Instruction\nReuse the selected assets when appropriate. Ask for the actual attached file when a resource is listed but is not included in the conversation.`;};

renderAssetsV14=renderAssetsV16;pages.assets=renderAssetsV16;
renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>생각을 프로젝트로, 프로젝트를 실제 활용 가능한 자산으로 전환하는 Studio OS 발전 이력입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI, 일정, 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset과 Pack으로 개발 전 기준 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report 내보내기와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations</strong><p>Ideas → AI Discussion → Development → Assets → Knowledge 흐름</p></div><div class="roadmap-row"><strong>v1.5 · Digital Asset Registry</strong><p>Master Asset, Version Asset, 관계·재사용 등록부</p></div><div class="roadmap-row"><strong>v1.6 · Asset Workspace — 현재</strong><p>실제 파일·링크 연결, 미리보기·다운로드, 프로젝트 적용, AI Package 활용</p></div></div>`;};
renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>현재 브라우저에 저장된 Studio OS 데이터와 자산 리소스를 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>운영 정보는 LocalStorage, 연결한 실제 파일은 브라우저 IndexedDB에 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes metadata</small></div><div class="panel"><h3>Data backup</h3><p>JSON 백업에는 자산 메타데이터가 포함되며, 대용량 실제 파일은 별도로 보관해야 합니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.6 · Asset Workspace</p></div><div class="panel"><h3>Operating Principle</h3><p>기록된 자산을 실제 작업에서 열고, 적용하고, AI에게 전달한다.</p></div></div>`;$('#importFile').onchange=importData;};
renderNotifications=function(){const c=counts();notificationPanel.innerHTML=`<div class="notification-head"><strong>알림</strong><button onclick="notificationPanel.classList.add('hidden')">닫기</button></div><div class="notification-item"><strong>미완료 할일 ${c.tasks}건</strong><small>할일 페이지에서 바로 완료할 수 있습니다.</small></div><div class="notification-item"><strong>Studio OS v1.6</strong><small>Asset Workspace가 활성화되었습니다.</small></div><div class="notification-item"><strong>AI 선택 자산 ${data.digitalAssets.filter(a=>a.aiSelected).length}건</strong><small>프로젝트 AI Package에 포함할 수 있습니다.</small></div>`;};

/* Studio OS v1.6.1 · Project Classification & Navigation UX */
const V161_VERSION='1.6.1';
let assetNavStackV161=[];

function projectClassV161(p){
  if(p?.assetClass?.large&&p?.assetClass?.middle)return p.assetClass;
  const n=(p?.name||'').toLowerCase(),d=(p?.desc||'').toLowerCase();
  if(n.includes('game')||d.includes('게임'))return {large:'게임',middle:'아이디어 검증 게임'};
  if(n.includes('studio os'))return {large:'앱',middle:'운영 플랫폼'};
  if(n.includes('sams'))return {large:'앱',middle:'업무용 앱'};
  if(n.includes('bpm'))return {large:'앱',middle:'검색·조회 앱'};
  if(n.includes('bowling')||n.includes('beco'))return {large:'앱',middle:'커뮤니티 앱'};
  if(n.includes('하루1분'))return {large:'앱',middle:'콘텐츠·습관 앱'};
  if(n.includes('우리집캐디'))return {large:'앱',middle:'자산관리 앱'};
  if(d.includes('음원')||d.includes('음악'))return {large:'음악',middle:'음원 제작'};
  if(d.includes('영상'))return {large:'영상',middle:'영상 제작'};
  if(d.includes('문서')||d.includes('보고'))return {large:'문서',middle:'문서·보고서'};
  if(d.includes('디자인'))return {large:'디자인',middle:'디자인 제작'};
  return {large:'기타',middle:'미분류'};
}
function projectGroupsV161(){
  const map={};
  data.projects.forEach(p=>{const c=projectClassV161(p);map[c.large]??={};map[c.large][c.middle]??=[];map[c.large][c.middle].push(p);});
  return map;
}
function projectApplySelectorV161(asset){
  const groups=projectGroupsV161(),large=Object.keys(groups)[0]||'기타',middle=Object.keys(groups[large]||{})[0]||'미분류';
  const applied=(asset.usageProjects||[]).map(name=>{const p=data.projects.find(x=>x.name===name);if(!p)return `<div class="applied-project-row"><span>${esc(name)}</span><button onclick="removeAssetProjectV161('${asset.id}','${esc(name)}')">제거</button></div>`;const c=projectClassV161(p);return `<div class="applied-project-row"><span><small>${esc(c.large)} › ${esc(c.middle)}</small><strong>${esc(p.name)}</strong></span><button onclick="removeAssetProjectV161('${asset.id}','${p.id}')">제거</button></div>`;}).join('');
  return `<div class="project-apply-v161"><div class="project-cascade-grid"><label>대분류<select id="assetProjectLarge" onchange="updateAssetMiddleV161()">${Object.keys(groups).map(x=>`<option>${esc(x)}</option>`).join('')}</select></label><label>중분류<select id="assetProjectMiddle" onchange="updateAssetSmallV161()">${Object.keys(groups[large]||{}).map(x=>`<option>${esc(x)}</option>`).join('')}</select></label><label>프로젝트<select id="assetProjectSmall">${(groups[large]?.[middle]||[]).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></label><button class="primary-btn compact apply-project-btn" onclick="addAssetProjectV161('${asset.id}')">적용 추가</button></div><div class="applied-project-list"><small>적용 중</small>${applied||'<p class="empty-applied">아직 적용된 프로젝트가 없습니다.</p>'}</div></div>`;
}
function updateAssetMiddleV161(){const groups=projectGroupsV161(),large=$('#assetProjectLarge')?.value,m=$('#assetProjectMiddle');if(!m)return;m.innerHTML=Object.keys(groups[large]||{}).map(x=>`<option>${esc(x)}</option>`).join('');updateAssetSmallV161();}
function updateAssetSmallV161(){const groups=projectGroupsV161(),large=$('#assetProjectLarge')?.value,middle=$('#assetProjectMiddle')?.value,s=$('#assetProjectSmall');if(!s)return;s.innerHTML=(groups[large]?.[middle]||[]).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');}
function addAssetProjectV161(assetId){const pid=$('#assetProjectSmall')?.value,a=assetById(assetId),p=data.projects.find(x=>x.id===pid);if(!a||!p)return toast('적용할 프로젝트를 선택하세요.');const set=new Set(a.usageProjects||[]);if(set.has(p.name))return toast('이미 적용된 프로젝트입니다.');set.add(p.name);a.usageProjects=[...set];a.updated=todayISO();saveData();toast(`${p.name}에 자산을 적용했습니다.`);reopenAssetDetailV161(assetId);}
function removeAssetProjectV161(assetId,projectIdOrName){const a=assetById(assetId);if(!a)return;const p=data.projects.find(x=>x.id===projectIdOrName);const name=p?.name||projectIdOrName;a.usageProjects=(a.usageProjects||[]).filter(x=>x!==name);a.updated=todayISO();saveData();toast(`${name} 연결을 해제했습니다.`);reopenAssetDetailV161(assetId);}
function reopenAssetDetailV161(id){const keep=[...assetNavStackV161];openAssetDetailV16(id,false);assetNavStackV161=keep;}
function openAssetRelationV161(id){openAssetDetailV16(id,true);}
function assetBackV161(){if(assetNavStackV161.length<2)return;assetNavStackV161.pop();const prev=assetNavStackV161[assetNavStackV161.length-1];openAssetDetailV16(prev,false);}
function decorateAssetModalV161(){const head=$('#dataModal .modal-head');if(!head)return;head.classList.add('modal-head-v161');let actions=head.querySelector('.modal-head-actions-v161');if(!actions){actions=document.createElement('div');actions.className='modal-head-actions-v161';const close=head.querySelector('button');if(close)actions.appendChild(close);head.appendChild(actions);}if(assetNavStackV161.length>1&&!head.querySelector('.modal-back-v161')){const back=document.createElement('button');back.className='modal-back-v161';back.textContent='← 뒤로';back.onclick=assetBackV161;head.insertBefore(back,head.firstChild);}}

async function openAssetDetailV16(id,push=true){
  const a=assetById(id);if(!a)return;
  if(push){if(assetNavStackV161[assetNavStackV161.length-1]!==id)assetNavStackV161.push(id);}else if(!assetNavStackV161.length)assetNavStackV161=[id];
  const stored=await getAssetFile(id).catch(()=>null);if(stored&&!a.resource){a.resource={name:stored.name,type:stored.type,size:stored.size,updated:stored.updated};saveData();}
  const children=assetChildren(id),rel=(a.relatedIds||[]).map(assetById).filter(Boolean),parent=assetById(a.parentId);
  openModal('Asset Workspace',`<div class="asset-detail-head"><span class="asset-kind">${esc(a.kind)}</span><h2>${esc(a.name)}</h2><p>${esc(a.note||'')}</p></div><div class="detail-grid"><div><small>Type</small><strong>${esc(a.type)}</strong></div><div><small>Version</small><strong>${esc(a.version)}</strong></div><div><small>Status</small><strong>${esc(a.status)}</strong></div><div><small>Project</small><strong>${esc(a.project||'공통')}</strong></div></div><div class="resource-workspace"><div><small>Connected Resource</small><strong>${esc(assetResourceLabel(a))}</strong>${a.externalUrl?`<p>${esc(a.externalUrl)}</p>`:''}</div><div class="resource-actions"><button onclick="attachAssetFileV16('${a.id}')">파일 연결</button>${stored?`<button onclick="previewAssetV16('${a.id}')">미리보기</button><button onclick="downloadAssetV16('${a.id}')">다운로드</button>`:''}${a.externalUrl?`<button onclick="openExternalAssetV16('${a.id}')">링크 열기</button>`:''}</div></div><div class="relation-box"><small>프로젝트에 적용</small>${projectApplySelectorV161(a)}</div><div class="relation-box ai-package-box-v162"><label class="ai-select-line-v162"><span><b>AI Package에 포함</b><small>프로젝트 Handoff 문서에 이 자산과 리소스 정보를 포함합니다.</small></span><input type="checkbox" ${a.aiSelected?'checked':''} onchange="toggleAssetAISelectionV16('${a.id}',this.checked)" aria-label="AI Package에 포함"></label></div>${parent?`<div class="relation-box"><small>Master Asset</small><button onclick="openAssetRelationV161('${parent.id}')">${esc(parent.name)}</button></div>`:''}${children.length?`<div class="relation-box"><small>Versions / Components</small>${children.map(c=>`<button onclick="openAssetRelationV161('${c.id}')">${esc(c.name)} · v${esc(c.version)}</button>`).join('')}</div>`:''}${rel.length?`<div class="relation-box"><small>Related Assets</small>${rel.map(r=>`<button onclick="openAssetRelationV161('${r.id}')">${esc(r.name)}</button>`).join('')}</div>`:''}<div class="page-actions"><button class="tab" onclick="openAssetModalV16('${a.id}')">정보 편집</button>${stored?`<button class="tab danger" onclick="removeAssetFileV16('${a.id}')">파일 연결 해제</button>`:''}</div>`,()=>closeModal());
  $('#modalSave').textContent='닫기';decorateAssetModalV161();
}

const openAssetModalV160=openAssetModalV16;
openAssetModalV16=function(id=''){openAssetModalV160(id);setTimeout(()=>{decorateAssetModalV161();const back=$('#dataModal .modal-back-v161');if(!back&&assetNavStackV161.length){const head=$('#dataModal .modal-head');const b=document.createElement('button');b.className='modal-back-v161';b.textContent='← 뒤로';b.onclick=()=>openAssetDetailV16(assetNavStackV161[assetNavStackV161.length-1],false);head.insertBefore(b,head.firstChild);}},0);};

const closeModalV160=closeModal;
closeModal=function(){closeModalV160();assetNavStackV161=[];};

renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>생각을 프로젝트로, 프로젝트를 실제 활용 가능한 자산으로 전환하는 Studio OS 발전 이력입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI, 일정, 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset과 Pack으로 개발 전 기준 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report 내보내기와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations</strong><p>Ideas → AI Discussion → Development → Assets → Knowledge 흐름</p></div><div class="roadmap-row"><strong>v1.5 · Digital Asset Registry</strong><p>Master Asset, Version Asset, 관계·재사용 등록부</p></div><div class="roadmap-row"><strong>v1.6 · Asset Workspace</strong><p>실제 파일·링크 연결, 미리보기·다운로드, 프로젝트 적용, AI Package 활용</p></div><div class="roadmap-row"><strong>v1.6.1 · Classification & Navigation</strong><p>프로젝트 대·중·소 분류 드롭다운과 자산 참조 화면 뒤로가기 적용</p></div><div class="roadmap-row current-roadmap"><strong>v1.6.2 · Asset Detail UI Polish — 현재</strong><p>적용 프로젝트 목록의 겹침·줄바꿈 문제와 AI Package 선택 UI를 정리</p></div></div>`;};

renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>현재 브라우저에 저장된 Studio OS 데이터와 자산 리소스를 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>운영 정보는 LocalStorage, 연결한 실제 파일은 브라우저 IndexedDB에 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes metadata</small></div><div class="panel"><h3>Data backup</h3><p>JSON 백업에는 자산 메타데이터가 포함되며, 대용량 실제 파일은 별도로 보관해야 합니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.6.2 · Asset Detail UI Polish</p></div><div class="panel"><h3>Operating Principle</h3><p>자산이 많아져도 자산 적용 관계를 읽기 쉽게 표시하고 핵심 선택 기능은 간결하게 유지한다.</p></div></div>`;$('#importFile').onchange=importData;};

const projectPackageV160=projectPackage;
projectPackage=function(projectId){const pkg=projectPackageV160(projectId);pkg.studioOSVersion=V161_VERSION;return pkg;};

renderNotifications=function(){const c=counts();notificationPanel.innerHTML=`<div class="notification-head"><strong>알림</strong><button onclick="notificationPanel.classList.add('hidden')">닫기</button></div><div class="notification-item"><strong>미완료 할일 ${c.tasks}건</strong><small>할일 페이지에서 바로 완료할 수 있습니다.</small></div><div class="notification-item"><strong>Studio OS v1.6.1</strong><small>자산 상세의 적용 목록과 AI Package 선택 UI가 정리되었습니다.</small></div><div class="notification-item"><strong>AI 선택 자산 ${data.digitalAssets.filter(a=>a.aiSelected).length}건</strong><small>프로젝트 AI Package에 포함할 수 있습니다.</small></div>`;};

// ===== Studio OS v1.7.1 · Asset Intelligence =====
const V17_VERSION='1.7';
(function migrateV17(){
  data.assetIntelligence=data.assetIntelligence||{tab:'registry',targetProject:data.projects[0]?.id||'',workspaceProject:data.projects[0]?.id||'',collabProject:data.projects[0]?.id||'',collabGoal:'',collabNotes:[],search:''};
  data.digitalAssets=(data.digitalAssets||[]).map(a=>({...a,quality:a.quality||inferAssetQualityV17(a),tags:Array.isArray(a.tags)?a.tags:inferAssetTagsV17(a)}));
  if(!data.digitalAssets.some(a=>a.id==='VA-STUDIO-17'))data.digitalAssets.push(normalizeV15Asset({id:'VA-STUDIO-17',name:'Studio OS v1.7.1 Asset Intelligence',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.7.1',status:'Active',location:'Studio_OS_v1.7_Asset_Intelligence.zip',usageProjects:['Studio OS'],note:'자산 추천·유사 탐지·재사용 센터와 Workspace Beta, AI Collaboration Preview',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:todayISO(),quality:{reuse:5,complete:4,docs:4,stable:4},tags:['studio os','asset intelligence']}));
  const master=assetById('MA-STUDIO-OS');if(master&&!master.relatedIds.includes('VA-STUDIO-17'))master.relatedIds.push('VA-STUDIO-17');
  saveData();
})();

function inferAssetQualityV17(a){
 const connected=!!(a.resource||a.externalUrl||a.location), reusable=['Reusable','Frozen','Active'].includes(a.status), doc=['Document','AI Report','Prompt','Template'].includes(a.type);
 return {reuse:reusable?4:2,complete:connected?4:2,docs:doc?4:(a.note?3:1),stable:['Frozen','Completed'].includes(a.status)?5:(a.status==='Active'?4:2)};
}
function inferAssetTagsV17(a){return [...new Set([a.type,a.kind,a.project,...(a.usageProjects||[]),...(String(a.note||'').match(/[A-Za-z가-힣0-9+-]{3,}/g)||[]).slice(0,8)].filter(Boolean).map(x=>String(x).toLowerCase()))];}
function avgQualityV17(a){const q=a.quality||inferAssetQualityV17(a);return Math.round((q.reuse+q.complete+q.docs+q.stable)/4*20);}
function assetSearchTextV17(a){return [a.name,a.note,a.type,a.kind,a.project,a.location,a.externalUrl,...(a.usageProjects||[]),...(a.tags||[])].join(' ').toLowerCase();}
function projectKeywordsV17(p){const pc=getProjectConstitution(p.id),cls=projectClassV161(p);return [p.name,p.desc,p.current,p.next,pc?.type,cls.large,cls.middle,...(pc?.dna||[])].filter(Boolean).join(' ').toLowerCase();}
function recommendationScoreV17(a,p){
 if(!p||a.kind==='Version'||a.status==='Archived'||a.status==='Deprecated')return -99;
 const pk=projectKeywordsV17(p),at=assetSearchTextV17(a);let score=0,reasons=[];
 if(a.project===p.name){score+=45;reasons.push('동일 프로젝트 자산');}
 if((a.usageProjects||[]).includes(p.name)){score+=35;reasons.push('이미 적용 중');}
 const pairs=[['flutter',18],['app',9],['게임',15],['game',15],['음악',15],['music',15],['video',15],['영상',15],['document',12],['보고',12],['template',10],['search',8],['검색',8],['data',8],['asset',5],['ui',8],['prompt',8]];
 pairs.forEach(([k,v])=>{if(pk.includes(k)&&at.includes(k)){score+=v;reasons.push(`${k} 연관`);}});
 if(['Template','Component','Prompt','Data','AI Report'].includes(a.type)){score+=10;reasons.push('재사용형 자산');}
 if(a.status==='Reusable'||a.status==='Frozen'){score+=12;reasons.push('재사용 승인 상태');}
 if(a.resource||a.externalUrl){score+=8;reasons.push('실제 리소스 연결');}
 score+=Math.round(avgQualityV17(a)/15);
 return {score,reasons:[...new Set(reasons)].slice(0,3)};
}
function recommendedAssetsV17(projectId){const p=data.projects.find(x=>x.id===projectId);if(!p)return[];return data.digitalAssets.map(a=>({a,...recommendationScoreV17(a,p)})).filter(x=>x.score>12).sort((x,y)=>y.score-x.score).slice(0,12);}
function duplicateGroupsV17(){
 const norm=s=>String(s||'').toLowerCase().replace(/v?\d+(\.\d+)*/g,'').replace(/[^a-z가-힣0-9]/g,'');const map={};
 data.digitalAssets.forEach(a=>{if(a.kind==='Version')return;const k=norm(a.name);if(k.length<5)return;(map[k]||(map[k]=[])).push(a);});
 return Object.values(map).filter(g=>g.length>1);
}
function setAssetIntelligenceTabV17(tab){data.assetIntelligence.tab=tab;saveData();renderAssetsV17();}
function intelligenceTabsV17(){const t=data.assetIntelligence.tab;return `<div class="asset-intel-tabs panel"><button class="${t==='registry'?'active':''}" onclick="setAssetIntelligenceTabV17('registry')">Registry <small>Stable</small></button><button class="${t==='intelligence'?'active':''}" onclick="setAssetIntelligenceTabV17('intelligence')">Intelligence <small>Stable</small></button><button class="${t==='reuse'?'active':''}" onclick="setAssetIntelligenceTabV17('reuse')">Reuse Center <small>Stable</small></button><button class="${t==='workspace'?'active':''}" onclick="setAssetIntelligenceTabV17('workspace')">Workspace <small>Beta</small></button><button class="${t==='collab'?'active':''}" onclick="setAssetIntelligenceTabV17('collab')">AI Collaboration <small>Preview</small></button></div>`;}
function renderAssetsV17(){
 const connected=data.digitalAssets.filter(a=>a.resource||a.externalUrl).length,reusable=data.digitalAssets.filter(a=>['Reusable','Frozen'].includes(a.status)||avgQualityV17(a)>=80).length;
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">Asset Intelligence</span><h1>Assets</h1><p>아이디어를 자산으로. 등록한 자산을 찾고, 평가하고, 다음 프로젝트에 다시 사용합니다.</p></div><button class="primary-btn compact" onclick="openAssetModalV16()">자산 등록</button></div><div class="constitution-score-grid"><div class="review-score"><small>전체 자산</small><strong>${data.digitalAssets.length}</strong><span>Registered</span></div><div class="review-score"><small>실제 리소스</small><strong>${connected}</strong><span>Connected</span></div><div class="review-score"><small>재사용 후보</small><strong>${reusable}</strong><span>Reusable</span></div><div class="review-score"><small>평균 품질</small><strong>${Math.round(data.digitalAssets.reduce((s,a)=>s+avgQualityV17(a),0)/Math.max(1,data.digitalAssets.length))}%</strong><span>Asset quality</span></div></div>${intelligenceTabsV17()}<div id="assetIntelBodyV17"></div>`;
 renderAssetIntelBodyV17();
}
function renderAssetIntelBodyV17(){const box=$('#assetIntelBodyV17');if(!box)return;const t=data.assetIntelligence.tab;if(t==='registry')renderRegistryV17(box);else if(t==='intelligence')renderIntelligenceV17(box);else if(t==='reuse')renderReuseV17(box);else if(t==='workspace')renderWorkspaceV17(box);else renderCollabV17(box);}
function filteredRegistryAssetsV17(){const q=(data.assetIntelligence.search||'').toLowerCase();let arr=data.assetView==='masters'?data.digitalAssets.filter(a=>a.kind==='Master'):data.digitalAssets.filter(a=>data.assetFilter==='All'||a.type===data.assetFilter);if(q)arr=arr.filter(a=>assetSearchTextV17(a).includes(q));return arr;}
function renderRegistryV17(box){const types=['All',...new Set(data.digitalAssets.map(a=>a.type))];box.innerHTML=`<div class="asset-toolbar panel"><div class="segmented"><button class="${data.assetView==='masters'?'active':''}" onclick="data.assetView='masters';saveData();renderAssetIntelBodyV17()">Master View</button><button class="${data.assetView==='all'?'active':''}" onclick="data.assetView='all';saveData();renderAssetIntelBodyV17()">All Assets</button></div><input id="assetSearchV17" class="asset-search-v16" value="${esc(data.assetIntelligence.search||'')}" placeholder="자산·프로젝트·파일 검색" oninput="data.assetIntelligence.search=this.value;saveData();renderRegistryGridV17()">${data.assetView==='all'?`<select onchange="data.assetFilter=this.value;saveData();renderRegistryGridV17()">${types.map(x=>`<option ${data.assetFilter===x?'selected':''}>${esc(x)}</option>`).join('')}</select>`:''}</div><div id="registryGridV17" class="asset-registry-grid"></div>`;renderRegistryGridV17();}
function renderRegistryGridV17(){const box=$('#registryGridV17');if(box)box.innerHTML=filteredRegistryAssetsV17().map(renderAssetCardV17).join('')||emptyLine('조건에 맞는 자산이 없습니다.');}
function renderAssetCardV17(a){const children=assetChildren(a.id),quality=avgQualityV17(a),resource=a.resource||a.externalUrl;return `<article class="asset-card-v15 asset-card-v16 asset-card-v17"><div class="asset-card-top"><span class="asset-kind">${esc(a.kind)}</span><span class="status">${esc(a.status)}</span></div><h3>${esc(a.name)}</h3><p>${esc(a.note||'설명 없음')}</p><div class="asset-meta"><span>${esc(a.type)}</span><span>v${esc(a.version)}</span><span>${esc(a.project||'공통')}</span></div><div class="quality-meter-v17"><span><b style="width:${quality}%"></b></span><small>Quality ${quality}%</small></div><div class="asset-resource-state ${resource?'connected':''}"><b>${resource?'●':'○'}</b><span>${esc(assetResourceLabel(a))}</span></div>${children.length?`<div class="asset-child-list"><small>Versions / Components</small>${children.slice(0,3).map(c=>`<button onclick="openAssetDetailV16('${c.id}')"><b>${esc(c.name)}</b><span>${esc(c.type)}</span></button>`).join('')}</div>`:''}<div class="asset-card-foot"><small>${(a.usageProjects||[]).length} projects · ${a.aiSelected?'AI selected':'AI off'}</small><button class="tab" onclick="openAssetDetailV16('${a.id}')">활용</button></div></article>`;}
function renderIntelligenceV17(box){const pid=data.assetIntelligence.targetProject||data.projects[0]?.id||'',recs=recommendedAssetsV17(pid),dups=duplicateGroupsV17();box.innerHTML=`<div class="intel-layout-v17"><section class="panel"><div class="panel-head"><div><span class="eyebrow">Local Recommendation</span><h3>프로젝트별 추천 자산</h3></div><span class="maturity stable">Stable</span></div><label class="inline-select-v17">대상 프로젝트<select onchange="data.assetIntelligence.targetProject=this.value;saveData();renderAssetIntelBodyV17()">${data.projects.map(p=>`<option value="${p.id}" ${p.id===pid?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><div class="recommend-list-v17">${recs.map(({a,score,reasons})=>`<div class="recommend-row-v17"><div><strong>${esc(a.name)}</strong><small>${esc(a.type)} · ${esc(reasons.join(' · ')||'프로젝트 문맥 기반')}</small></div><b>${Math.min(99,score)}점</b><button onclick="openAssetDetailV16('${a.id}')">검토</button></div>`).join('')||emptyLine('추천 가능한 자산이 없습니다.')}</div><p class="intel-note-v17">현재 추천은 Project DNA·분류·자산 상태·재사용성에 기반한 로컬 규칙입니다.</p></section><section class="panel"><div class="panel-head"><div><span class="eyebrow">Maintenance</span><h3>유사·중복 후보</h3></div><span class="maturity stable">Stable</span></div>${dups.map(g=>`<div class="duplicate-group-v17"><strong>${esc(g[0].name)} 계열</strong>${g.map(a=>`<button onclick="openAssetDetailV16('${a.id}')">${esc(a.name)} · v${esc(a.version)}</button>`).join('')}</div>`).join('')||emptyLine('뚜렷한 중복 후보가 없습니다.')}</section></div>`;}
function renderReuseV17(box){const pid=data.assetIntelligence.targetProject||data.projects[0]?.id||'',assets=data.digitalAssets.filter(a=>a.kind!=='Master'&&a.kind!=='Version'&&(['Reusable','Frozen'].includes(a.status)||avgQualityV17(a)>=75)).sort((a,b)=>avgQualityV17(b)-avgQualityV17(a));box.innerHTML=`<section class="panel"><div class="panel-head"><div><span class="eyebrow">Reuse Center</span><h3>다음 프로젝트에 바로 검토할 자산</h3></div><span class="maturity stable">Stable</span></div><div class="reuse-toolbar-v17"><label>적용 대상<select onchange="data.assetIntelligence.targetProject=this.value;saveData()">${data.projects.map(p=>`<option value="${p.id}" ${p.id===pid?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><small>품질·안정성·재사용 상태를 기준으로 정렬</small></div><div class="reuse-grid-v17">${assets.map(a=>`<article><span class="asset-kind">${esc(a.type)}</span><h4>${esc(a.name)}</h4><p>${esc(a.note||'')}</p><div><b>${avgQualityV17(a)}%</b><small>${(a.usageProjects||[]).length} projects</small></div><button onclick="applyReuseAssetV17('${a.id}')">선택 프로젝트에 적용</button><button class="ghost" onclick="openAssetDetailV16('${a.id}')">상세</button></article>`).join('')||emptyLine('재사용 후보가 없습니다.')}</div></section>`;}
function applyReuseAssetV17(assetId){const pid=data.assetIntelligence.targetProject,p=data.projects.find(x=>x.id===pid),a=assetById(assetId);if(!p||!a)return toast('대상 프로젝트를 선택하세요.');const set=new Set(a.usageProjects||[]);if(set.has(p.name))return toast('이미 적용된 자산입니다.');set.add(p.name);a.usageProjects=[...set];a.updated=todayISO();saveData();toast(`${a.name}을 ${p.name}에 적용했습니다.`);renderAssetIntelBodyV17();}
function renderWorkspaceV17(box){const pid=data.assetIntelligence.workspaceProject||data.projects[0]?.id||'',p=data.projects.find(x=>x.id===pid),assets=data.digitalAssets.filter(a=>p&&((a.usageProjects||[]).includes(p.name)||a.project===p.name));const connected=assets.filter(a=>a.resource||a.externalUrl).length;box.innerHTML=`<section class="panel workspace-beta-v17"><div class="panel-head"><div><span class="eyebrow">Project Asset Workspace</span><h3>프로젝트 자산 작업공간</h3></div><span class="maturity beta">Beta</span></div><label class="inline-select-v17">프로젝트<select onchange="data.assetIntelligence.workspaceProject=this.value;saveData();renderAssetIntelBodyV17()">${data.projects.map(x=>`<option value="${x.id}" ${x.id===pid?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label><div class="workspace-summary-v17"><div><strong>${assets.length}</strong><small>Applied assets</small></div><div><strong>${connected}</strong><small>Resources ready</small></div><div><strong>${assets.filter(a=>a.aiSelected).length}</strong><small>AI package</small></div><div><strong>${assets.filter(a=>a.status==='Needs Update').length}</strong><small>Needs update</small></div></div><div class="workspace-columns-v17"><div><h4>Ready</h4>${assets.filter(a=>a.resource||a.externalUrl).map(a=>workspaceAssetLineV17(a)).join('')||emptyLine('준비된 리소스 없음')}</div><div><h4>Reference only</h4>${assets.filter(a=>!a.resource&&!a.externalUrl).map(a=>workspaceAssetLineV17(a)).join('')||emptyLine('참조 자산 없음')}</div></div></section>`;}
function workspaceAssetLineV17(a){return `<button class="workspace-asset-line-v17" onclick="openAssetDetailV16('${a.id}')"><span><strong>${esc(a.name)}</strong><small>${esc(a.type)} · v${esc(a.version)}</small></span><b>${avgQualityV17(a)}%</b></button>`;}
function renderCollabV17(box){const pid=data.assetIntelligence.collabProject||data.projects[0]?.id||'',p=data.projects.find(x=>x.id===pid),notes=(data.assetIntelligence.collabNotes||[]).filter(n=>n.projectId===pid);box.innerHTML=`<section class="panel collab-preview-v17"><div class="panel-head"><div><span class="eyebrow">AI Session</span><h3>AI Collaboration 준비 화면</h3></div><span class="maturity preview">Preview</span></div><p class="preview-warning-v17">현재 버전은 실제 AI 채팅 연결이 아니라, 대화에 전달할 목표·단편·선택 자산을 한곳에 정리하는 Preview입니다.</p><div class="collab-layout-v17"><section class="collab-config-card-v17"><div class="collab-section-head-v17"><div><small>SESSION SETUP</small><h4>대화 기본 설정</h4></div></div><div class="collab-form-row-v17"><label>프로젝트<select id="collabProjectV17" onchange="data.assetIntelligence.collabProject=this.value;saveData();renderAssetIntelBodyV17()">${data.projects.map(x=>`<option value="${x.id}" ${x.id===pid?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label><label>이번 대화 목표<input id="collabGoalV17" value="${esc(data.assetIntelligence.collabGoal||'')}" placeholder="예: v0.1 핵심 구조 문답"></label></div></section><section class="collab-note-card-v17"><div class="collab-section-head-v17"><div><small>CONTEXT FRAGMENT</small><h4>대화 전 전달할 단편</h4></div><span>짧은 아이디어·질문·조건을 기록</span></div><textarea id="collabNoteV17" placeholder="아직 정리되지 않은 아이디어나 질문을 짧게 기록하세요."></textarea><div class="collab-actionbar-v17"><button class="tab" onclick="saveCollabNoteV17()">단편 저장</button><button class="primary-btn compact" onclick="exportAISessionBriefV17()">AI Session Brief 생성</button></div></section><section class="collab-saved-card-v17"><div class="collab-section-head-v17"><div><small>SAVED FRAGMENTS</small><h4>저장된 대화 단편</h4></div><b>${notes.length}</b></div><div class="collab-note-list-v17">${notes.map(n=>`<div><span>${esc(n.text)}</span><small>${esc(n.date)}</small></div>`).join('')||emptyLine('저장된 대화 단편이 없습니다.')}</div></section></div></section>`;}
function saveCollabNoteV17(){const text=$('#collabNoteV17')?.value.trim(),goal=$('#collabGoalV17')?.value.trim();if(!text&&!goal)return toast('목표 또는 단편을 입력하세요.');data.assetIntelligence.collabGoal=goal;if(text)data.assetIntelligence.collabNotes.unshift({id:uid('CS'),projectId:data.assetIntelligence.collabProject,text,date:todayISO()});saveData();renderAssetIntelBodyV17();toast('AI 대화 단편을 저장했습니다.');}
function exportAISessionBriefV17(){const pid=data.assetIntelligence.collabProject,p=data.projects.find(x=>x.id===pid);if(!p)return toast('프로젝트를 선택하세요.');data.assetIntelligence.collabGoal=$('#collabGoalV17')?.value.trim()||data.assetIntelligence.collabGoal;saveData();const pkg=projectPackage(pid),notes=(data.assetIntelligence.collabNotes||[]).filter(n=>n.projectId===pid);const md=`# Studio OS AI Session Brief\n\n- Studio OS: v1.7\n- Project: ${p.name}\n- Session Goal: ${data.assetIntelligence.collabGoal||'Not defined'}\n\n## Conversation Fragments\n${notes.map(n=>`- ${n.text}`).join('\n')||'- None'}\n\n## Recommended Assets\n${recommendedAssetsV17(pid).slice(0,6).map(x=>`- ${x.a.name} · ${x.a.type} · ${x.reasons.join(', ')}`).join('\n')||'- None'}\n\n## Current AI Package Context\n- Applied Constitution: ${(pkg.rules||[]).length}\n- Selected Asset Resources: ${(pkg.assetWorkspace||[]).length}\n- Open Issues: ${(pkg.development?.openIssues||[]).length}\n\n## Instruction\nUse this brief as a starting point. Develop the product direction through dialogue before fixing the detailed scope.`;downloadText(`${p.name}_AI_Session_Brief.md`,md);toast('AI Session Brief를 생성했습니다.');}
function openAssetQualityV17(id){const a=assetById(id),q=a.quality||inferAssetQualityV17(a);if(!a)return;openModal('Asset Quality',`<p class="intel-note-v17">별점은 다음 프로젝트에서 바로 재사용할 수 있는지를 판단하는 내부 기준입니다.</p>${[['reuse','재사용성'],['complete','완성도'],['docs','문서화'],['stable','안정성']].map(([k,l])=>`<label>${l}<select id="quality_${k}">${[1,2,3,4,5].map(v=>`<option value="${v}" ${q[k]===v?'selected':''}>${'★'.repeat(v)}${'☆'.repeat(5-v)}</option>`).join('')}</select></label>`).join('')}`,()=>{a.quality={reuse:+$('#quality_reuse').value,complete:+$('#quality_complete').value,docs:+$('#quality_docs').value,stable:+$('#quality_stable').value};saveData();closeModal();toast('자산 품질 평가를 저장했습니다.');renderAssetsV17();});}

const openAssetDetailV162=openAssetDetailV16;
openAssetDetailV16=async function(id,push=true){await openAssetDetailV162(id,push);setTimeout(()=>{const a=assetById(id),modal=$('#dataModal .modal-body');if(!a||!modal)return;const actions=modal.querySelector('.page-actions');if(actions&&!actions.querySelector('.quality-btn-v17')){const b=document.createElement('button');b.className='tab quality-btn-v17';b.textContent=`품질 평가 ${avgQualityV17(a)}%`;b.onclick=()=>openAssetQualityV17(id);actions.prepend(b);}},0);};

renderAssetsV14=renderAssetsV17;pages.assets=renderAssetsV17;
renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>아이디어를 자산으로 전환하고, 자산을 다시 프로젝트 가치로 연결하는 발전 이력입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI, 일정, 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset과 Pack으로 개발 전 기준 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report 내보내기와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations</strong><p>Ideas → AI Discussion → Development → Assets → Knowledge 흐름</p></div><div class="roadmap-row"><strong>v1.5 · Digital Asset Registry</strong><p>Master Asset, Version Asset, 관계·재사용 등록부</p></div><div class="roadmap-row"><strong>v1.6 · Asset Workspace</strong><p>실제 파일·링크 연결과 프로젝트 적용</p></div><div class="roadmap-row"><strong>v1.6.1~1.6.2 · UX Stabilization</strong><p>대·중·소 분류, 뒤로가기, 상세 UI 안정화</p></div><div class="roadmap-row current-roadmap"><strong>v1.7.1 · Asset Intelligence — 현재</strong><p>추천·유사 탐지·재사용 센터를 Stable로, Workspace를 Beta, AI Collaboration을 Preview로 통합 검증</p></div><div class="roadmap-row"><strong>v2.0 · Daily Operating Release</strong><p>실제 프로젝트에서 매일 사용 가능한 시점에 Freeze 예정</p></div></div>`;};
renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>현재 브라우저에 저장된 Studio OS 데이터와 자산 리소스를 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>운영 정보와 Intelligence 설정은 LocalStorage, 연결 파일은 IndexedDB에 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes metadata</small></div><div class="panel"><h3>Data backup</h3><p>JSON 백업에는 자산 메타데이터와 추천 설정이 포함되며 실제 파일은 별도 보관합니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.7.1 · Asset Intelligence</p></div><div class="panel"><h3>Feature maturity</h3><p>Recommendation·Reuse는 Stable, Workspace는 Beta, AI Collaboration은 Preview입니다.</p></div></div>`;$('#importFile').onchange=importData;};
const projectPackageV17Base=projectPackage;
projectPackage=function(projectId){const pkg=projectPackageV17Base(projectId);pkg.studioOSVersion=V17_VERSION;pkg.assetRecommendations=recommendedAssetsV17(projectId).slice(0,8).map(x=>({id:x.a.id,name:x.a.name,type:x.a.type,score:x.score,reasons:x.reasons,quality:avgQualityV17(x.a)}));return pkg;};
renderNotifications=function(){const c=counts();notificationPanel.innerHTML=`<div class="notification-head"><strong>알림</strong><button onclick="notificationPanel.classList.add('hidden')">닫기</button></div><div class="notification-item"><strong>미완료 할일 ${c.tasks}건</strong><small>할일 페이지에서 바로 완료할 수 있습니다.</small></div><div class="notification-item"><strong>Studio OS v1.7</strong><small>Asset Intelligence 통합 테스트가 활성화되었습니다.</small></div><div class="notification-item"><strong>재사용 후보 ${data.digitalAssets.filter(a=>avgQualityV17(a)>=75).length}건</strong><small>Reuse Center에서 다음 프로젝트에 적용할 수 있습니다.</small></div>`;};

// ===== Studio OS v1.8 · Project Workspace =====
const V18_VERSION='1.8';
(function migrateV18(){
  data.workspaces=data.workspaces||{};
  data.workspaceUI=data.workspaceUI||{projectId:data.projects[0]?.id||'',tab:'overview'};
  data.projects.forEach(p=>ensureWorkspace18(p.id));
  if(!data.digitalAssets.some(a=>a.id==='VA-STUDIO-18')){
    data.digitalAssets.push(normalizeV15Asset({id:'VA-STUDIO-18',name:'Studio OS v1.8 Workspace',kind:'Version',type:'Source Code',project:'Studio OS',version:'1.8',status:'Active',location:'Studio_OS_v1.8_Project_Workspace.zip',usageProjects:['Studio OS'],note:'프로젝트별 Tasks·Notes·Files·Assets·AI·Activity 실행 작업공간',relatedIds:['MA-STUDIO-OS'],parentId:'MA-STUDIO-OS',updated:todayISO(),quality:{reuse:5,complete:4,docs:4,stable:4},tags:['studio os','workspace','project operations']}));
    const master=assetById('MA-STUDIO-OS');if(master&&!master.relatedIds.includes('VA-STUDIO-18'))master.relatedIds.push('VA-STUDIO-18');
  }
  saveData();
})();

function ensureWorkspace18(projectId){
  if(!data.workspaces[projectId]) data.workspaces[projectId]={
    tasks:[],notes:[],files:[],activity:[],createdAt:todayISO()
  };
  const w=data.workspaces[projectId];
  w.tasks=w.tasks||[];w.notes=w.notes||[];w.files=w.files||[];w.activity=w.activity||[];
  return w;
}
function workspaceProject18(){return data.projects.find(p=>p.id===data.workspaceUI.projectId)||data.projects[0];}
function addActivity18(projectId,type,text){const w=ensureWorkspace18(projectId);w.activity.unshift({id:uid('WA'),type,text,date:new Date().toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})});w.activity=w.activity.slice(0,80);}
function workspaceAssets18(p){return data.digitalAssets.filter(a=>(a.usageProjects||[]).includes(p.name)||a.project===p.name);}
function workspaceOpenTasks18(p){return ensureWorkspace18(p.id).tasks.filter(t=>!t.done);}
function setWorkspaceProject18(id){data.workspaceUI.projectId=id;data.workspaceUI.tab='overview';ensureWorkspace18(id);saveData();renderWorkspace18();}
function setWorkspaceTab18(tab){data.workspaceUI.tab=tab;saveData();renderWorkspace18();}
function workspaceTabs18(){const t=data.workspaceUI.tab;return `<div class="workspace-tabs-v18">${[['overview','Overview'],['tasks','Tasks'],['notes','Quick Notes'],['files','Files'],['assets','Assets'],['ai','AI'],['activity','Activity']].map(([id,label])=>`<button class="${t===id?'active':''}" onclick="setWorkspaceTab18('${id}')">${label}</button>`).join('')}</div>`;}
function renderWorkspace18(){
  const p=workspaceProject18();if(!p){$('#content').innerHTML=emptyLine('프로젝트를 먼저 생성해주세요.');return;}
  const w=ensureWorkspace18(p.id), assets=workspaceAssets18(p), open=w.tasks.filter(t=>!t.done), connected=assets.filter(a=>a.resource||a.externalUrl||a.location).length;
  $('#content').innerHTML=`<div class="page-title workspace-title-v18"><div><span class="eyebrow">Project Workspace</span><h1>${esc(p.name)}</h1><p>프로젝트의 작업·메모·파일·자산·AI 협업을 한 화면에서 실행합니다.</p></div><label class="workspace-project-select-v18">프로젝트<select onchange="setWorkspaceProject18(this.value)">${data.projects.map(x=>`<option value="${x.id}" ${x.id===p.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label></div>
  <div class="workspace-hero-v18"><div><small>${esc(p.status).toUpperCase()} · ${esc(p.desc)}</small><strong>${esc(p.current)}</strong><span>Next · ${esc(p.next)}</span></div><div class="workspace-progress-v18"><b>${p.progress}%</b><span><i style="width:${p.progress}%"></i></span></div></div>
  <div class="workspace-kpis-v18"><div><small>Open Tasks</small><strong>${open.length}</strong></div><div><small>Notes</small><strong>${w.notes.length}</strong></div><div><small>Files</small><strong>${w.files.length}</strong></div><div><small>Applied Assets</small><strong>${assets.length}</strong></div><div><small>Ready Resources</small><strong>${connected}</strong></div></div>
  ${workspaceTabs18()}<div id="workspaceBody18"></div>`;
  renderWorkspaceBody18(p,w,assets);
}
function renderWorkspaceBody18(p,w,assets){
  const box=$('#workspaceBody18');if(!box)return;const tab=data.workspaceUI.tab;
  if(tab==='overview') renderWorkspaceOverview18(box,p,w,assets);
  else if(tab==='tasks') renderWorkspaceTasks18(box,p,w);
  else if(tab==='notes') renderWorkspaceNotes18(box,p,w);
  else if(tab==='files') renderWorkspaceFiles18(box,p,w);
  else if(tab==='assets') renderWorkspaceAssets18(box,p,w,assets);
  else if(tab==='ai') renderWorkspaceAI18(box,p,w,assets);
  else renderWorkspaceActivity18(box,p,w);
}
function renderWorkspaceOverview18(box,p,w,assets){
  const open=w.tasks.filter(t=>!t.done), rec=typeof recommendedAssetsV17==='function'?recommendedAssetsV17(p.id).filter(x=>!(x.a.usageProjects||[]).includes(p.name)).slice(0,4):[];
  box.innerHTML=`<div class="workspace-overview-grid-v18"><section class="panel"><div class="panel-head"><div><span class="eyebrow">Current Sprint</span><h3>실행 작업</h3></div><button onclick="setWorkspaceTab18('tasks')">전체 보기</button></div><div class="workspace-task-list-v18">${open.slice(0,5).map(t=>workspaceTaskRow18(t,p.id)).join('')||emptyLine('열린 작업이 없습니다.')}</div><button class="workspace-add-line-v18" onclick="openWorkspaceTask18('${p.id}')">+ 작업 추가</button></section>
  <section class="panel"><div class="panel-head"><div><span class="eyebrow">Quick Capture</span><h3>최근 메모</h3></div><button onclick="setWorkspaceTab18('notes')">전체 보기</button></div>${w.notes.slice(0,4).map(n=>`<div class="workspace-note-line-v18"><strong>${esc(n.text)}</strong><small>${esc(n.date)}</small></div>`).join('')||emptyLine('저장된 메모가 없습니다.')}<button class="workspace-add-line-v18" onclick="openWorkspaceNote18('${p.id}')">+ 메모 추가</button></section>
  <section class="panel workspace-wide-v18"><div class="panel-head"><div><span class="eyebrow">Asset Quick Apply</span><h3>추천 자산</h3></div><button onclick="go('assets');setTimeout(()=>setAssetIntelligenceTabV17('intelligence'),20)">Intelligence</button></div><div class="workspace-recommend-grid-v18">${rec.map(x=>`<article><span class="asset-kind">${esc(x.a.type)}</span><h4>${esc(x.a.name)}</h4><p>${esc(x.reasons.join(' · ')||x.a.note||'추천 자산')}</p><button onclick="applyAssetWorkspace18('${x.a.id}','${p.id}')">프로젝트에 적용</button></article>`).join('')||emptyLine('현재 추천할 새 자산이 없습니다.')}</div></section>
  <section class="panel"><div class="panel-head"><div><span class="eyebrow">Resources</span><h3>최근 파일·자산</h3></div><button onclick="setWorkspaceTab18('files')">Files</button></div>${[...w.files.slice(0,2).map(f=>({name:f.name,sub:f.location||f.type||'File'})),...assets.slice(0,3).map(a=>({name:a.name,sub:`${a.type} · v${a.version}`}))].slice(0,5).map(x=>`<div class="workspace-resource-line-v18"><strong>${esc(x.name)}</strong><small>${esc(x.sub)}</small></div>`).join('')||emptyLine('등록된 리소스가 없습니다.')}</section>
  <section class="panel"><div class="panel-head"><div><span class="eyebrow">Recent Activity</span><h3>작업 이력</h3></div><button onclick="setWorkspaceTab18('activity')">전체 보기</button></div>${w.activity.slice(0,5).map(workspaceActivityLine18).join('')||emptyLine('아직 작업 이력이 없습니다.')}</section></div>`;
  attachWorkspaceTaskHandlers18();
}
function workspaceTaskRow18(t,pid){return `<div class="workspace-task-row-v18 ${t.done?'done':''}" data-wtask="${t.id}" data-project="${pid}"><button class="workspace-check-v18">${t.done?'✓':''}</button><div><strong>${esc(t.title)}</strong><small>${esc(t.due||'일정 미정')} · ${esc(t.priority||'Normal')}</small></div><button class="workspace-task-delete-v18" onclick="event.stopPropagation();deleteWorkspaceTask18('${pid}','${t.id}')">×</button></div>`;}
function attachWorkspaceTaskHandlers18(){$$('.workspace-task-row-v18').forEach(r=>r.onclick=()=>toggleWorkspaceTask18(r.dataset.project,r.dataset.wtask));}
function openWorkspaceTask18(projectId){openModal('Workspace 작업 추가',`<label>작업명<input id="w18TaskTitle" placeholder="예: 검색 화면 UI 수정"></label><div class="form-grid"><label>우선순위<select id="w18TaskPriority"><option>High</option><option selected>Normal</option><option>Low</option></select></label><label>일정<input id="w18TaskDue" placeholder="예: 오늘 · 1시간"></label></div>`,()=>{const title=$('#w18TaskTitle').value.trim();if(!title)return toast('작업명을 입력해주세요.');const w=ensureWorkspace18(projectId);w.tasks.unshift({id:uid('WT'),title,priority:$('#w18TaskPriority').value,due:$('#w18TaskDue').value.trim()||'일정 미정',done:false,createdAt:todayISO()});addActivity18(projectId,'Task',`작업 추가 · ${title}`);saveData();closeModal();renderWorkspace18();toast('Workspace 작업을 추가했습니다.');});}
function toggleWorkspaceTask18(projectId,id){const w=ensureWorkspace18(projectId),t=w.tasks.find(x=>x.id===id);if(!t)return;t.done=!t.done;addActivity18(projectId,'Task',`${t.done?'완료':'재개'} · ${t.title}`);saveData();renderWorkspace18();}
function deleteWorkspaceTask18(projectId,id){const w=ensureWorkspace18(projectId),t=w.tasks.find(x=>x.id===id);w.tasks=w.tasks.filter(x=>x.id!==id);if(t)addActivity18(projectId,'Task',`삭제 · ${t.title}`);saveData();renderWorkspace18();}
function renderWorkspaceTasks18(box,p,w){box.innerHTML=`<section class="panel"><div class="panel-head"><div><span class="eyebrow">Task Manager</span><h3>${esc(p.name)} 실행 작업</h3></div><button class="primary-btn compact" onclick="openWorkspaceTask18('${p.id}')">+ 작업 추가</button></div><div class="workspace-task-board-v18"><div><h4>Open <span>${w.tasks.filter(t=>!t.done).length}</span></h4>${w.tasks.filter(t=>!t.done).map(t=>workspaceTaskRow18(t,p.id)).join('')||emptyLine('열린 작업이 없습니다.')}</div><div><h4>Completed <span>${w.tasks.filter(t=>t.done).length}</span></h4>${w.tasks.filter(t=>t.done).map(t=>workspaceTaskRow18(t,p.id)).join('')||emptyLine('완료된 작업이 없습니다.')}</div></div></section>`;attachWorkspaceTaskHandlers18();}
function openWorkspaceNote18(projectId){openModal('Quick Note 추가',`<label>메모<textarea id="w18Note" placeholder="아이디어, TODO, 회의 단편을 짧게 기록하세요."></textarea></label><label>유형<select id="w18NoteType"><option>Note</option><option>Idea</option><option>TODO</option><option>Meeting</option><option>Decision</option></select></label>`,()=>{const text=$('#w18Note').value.trim();if(!text)return toast('메모를 입력해주세요.');const type=$('#w18NoteType').value,w=ensureWorkspace18(projectId);w.notes.unshift({id:uid('WN'),text,type,date:new Date().toLocaleDateString('ko-KR')});addActivity18(projectId,'Note',`${type} 기록 · ${text.slice(0,40)}`);saveData();closeModal();renderWorkspace18();toast('Quick Note를 저장했습니다.');});}
function deleteWorkspaceNote18(projectId,id){const w=ensureWorkspace18(projectId);w.notes=w.notes.filter(n=>n.id!==id);saveData();renderWorkspace18();}
function renderWorkspaceNotes18(box,p,w){box.innerHTML=`<section class="panel"><div class="panel-head"><div><span class="eyebrow">Quick Notes</span><h3>아이디어·TODO·회의 단편</h3></div><button class="primary-btn compact" onclick="openWorkspaceNote18('${p.id}')">+ 메모 추가</button></div><div class="workspace-notes-grid-v18">${w.notes.map(n=>`<article><div><span>${esc(n.type)}</span><small>${esc(n.date)}</small></div><p>${esc(n.text)}</p><button onclick="deleteWorkspaceNote18('${p.id}','${n.id}')">삭제</button></article>`).join('')||emptyLine('저장된 메모가 없습니다.')}</div></section>`;}
function openWorkspaceFile18(projectId){openModal('파일 참조 등록',`<label>파일·리소스명<input id="w18FileName" placeholder="예: v0.1 Flutter Source"></label><div class="form-grid"><label>유형<select id="w18FileType"><option>Source</option><option>APK</option><option>ZIP</option><option>PNG</option><option>PDF</option><option>Audio</option><option>Video</option><option>Link</option><option>Other</option></select></label><label>버전<input id="w18FileVersion" placeholder="예: 0.1.0"></label></div><label>경로 또는 URL<input id="w18FileLocation" placeholder="파일명, 로컬 경로 또는 https://..."></label>`,()=>{const name=$('#w18FileName').value.trim();if(!name)return toast('리소스명을 입력해주세요.');const w=ensureWorkspace18(projectId);w.files.unshift({id:uid('WF'),name,type:$('#w18FileType').value,version:$('#w18FileVersion').value.trim(),location:$('#w18FileLocation').value.trim(),date:todayISO()});addActivity18(projectId,'File',`리소스 등록 · ${name}`);saveData();closeModal();renderWorkspace18();toast('파일 참조를 등록했습니다.');});}
function deleteWorkspaceFile18(projectId,id){const w=ensureWorkspace18(projectId);w.files=w.files.filter(f=>f.id!==id);saveData();renderWorkspace18();}
function openWorkspaceFileLink18(location){if(!location)return toast('등록된 위치가 없습니다.');if(/^https?:\/\//i.test(location))window.open(location,'_blank');else navigator.clipboard?.writeText(location).then(()=>toast('파일 위치를 복사했습니다.')).catch(()=>toast(location));}
function renderWorkspaceFiles18(box,p,w){const assetFiles=workspaceAssets18(p).filter(a=>a.resource||a.externalUrl||a.location);box.innerHTML=`<section class="panel"><div class="panel-head"><div><span class="eyebrow">Working Files</span><h3>파일과 실행 리소스</h3></div><button class="primary-btn compact" onclick="openWorkspaceFile18('${p.id}')">+ 파일 참조</button></div><div class="workspace-file-list-v18">${w.files.map(f=>`<div><span class="asset-kind">${esc(f.type)}</span><div><strong>${esc(f.name)}</strong><small>${esc(f.version||'No version')} · ${esc(f.location||'위치 미등록')}</small></div><button onclick="openWorkspaceFileLink18('${esc(f.location)}')">열기</button><button onclick="deleteWorkspaceFile18('${p.id}','${f.id}')">×</button></div>`).join('')||emptyLine('직접 등록한 파일 참조가 없습니다.')}</div><h4 class="workspace-subtitle-v18">Asset Resources</h4><div class="workspace-file-list-v18">${assetFiles.map(a=>`<div><span class="asset-kind">${esc(a.type)}</span><div><strong>${esc(a.name)}</strong><small>v${esc(a.version)} · ${esc(a.location||a.externalUrl||'Connected resource')}</small></div><button onclick="openAssetDetailV16('${a.id}')">자산 열기</button></div>`).join('')||emptyLine('연결된 자산 리소스가 없습니다.')}</div></section>`;}
function applyAssetWorkspace18(assetId,projectId){const a=assetById(assetId),p=data.projects.find(x=>x.id===projectId);if(!a||!p)return;a.usageProjects=a.usageProjects||[];if(!a.usageProjects.includes(p.name))a.usageProjects.push(p.name);addActivity18(projectId,'Asset',`자산 적용 · ${a.name}`);saveData();renderWorkspace18();toast('프로젝트에 자산을 적용했습니다.');}
function removeAssetWorkspace18(assetId,projectId){const a=assetById(assetId),p=data.projects.find(x=>x.id===projectId);if(!a||!p)return;a.usageProjects=(a.usageProjects||[]).filter(n=>n!==p.name);addActivity18(projectId,'Asset',`자산 해제 · ${a.name}`);saveData();renderWorkspace18();}
function renderWorkspaceAssets18(box,p,w,assets){const rec=typeof recommendedAssetsV17==='function'?recommendedAssetsV17(p.id).filter(x=>!(x.a.usageProjects||[]).includes(p.name)).slice(0,8):[];box.innerHTML=`<div class="workspace-assets-layout-v18"><section class="panel"><div class="panel-head"><div><span class="eyebrow">Applied Assets</span><h3>현재 프로젝트 자산</h3></div><button onclick="go('assets')">Registry</button></div>${assets.map(a=>`<div class="workspace-applied-asset-v18"><button onclick="openAssetDetailV16('${a.id}')"><strong>${esc(a.name)}</strong><small>${esc(a.type)} · v${esc(a.version)} · 품질 ${avgQualityV17(a)}%</small></button><button onclick="removeAssetWorkspace18('${a.id}','${p.id}')">해제</button></div>`).join('')||emptyLine('적용된 자산이 없습니다.')}</section><section class="panel"><div class="panel-head"><div><span class="eyebrow">Quick Apply</span><h3>추천 자산</h3></div><small>${rec.length} candidates</small></div>${rec.map(x=>`<div class="workspace-applied-asset-v18"><button onclick="openAssetDetailV16('${x.a.id}')"><strong>${esc(x.a.name)}</strong><small>${esc(x.reasons.join(' · '))}</small></button><button class="apply" onclick="applyAssetWorkspace18('${x.a.id}','${p.id}')">적용</button></div>`).join('')||emptyLine('추천할 새 자산이 없습니다.')}</section></div>`;}
function renderWorkspaceAI18(box,p,w,assets){const dev=getDevelopmentRecord(p.id),notes=(data.assetIntelligence?.collabNotes||[]).filter(n=>n.projectId===p.id);box.innerHTML=`<div class="workspace-ai-grid-v18"><section class="panel"><div class="panel-head"><div><span class="eyebrow">AI Handoff</span><h3>개발 전달 준비</h3></div><span class="status">${esc(dev.status)}</span></div><div class="workspace-ai-context-v18"><div><small>Current Goal</small><strong>${esc(dev.currentGoal)}</strong></div><div><small>Target Version</small><strong>${esc(dev.targetVersion)}</strong></div><div><small>Sprint</small><strong>${esc(dev.sprint)}</strong></div><div><small>Selected Assets</small><strong>${assets.filter(a=>a.aiSelected).length}</strong></div></div><div class="page-actions"><button class="primary-btn compact" onclick="exportAIPackage('${p.id}','md')">AI Package 생성</button><button class="tab" onclick="data.assetIntelligence.collabProject='${p.id}';data.assetIntelligence.tab='collab';saveData();go('assets')">AI Collaboration</button><button class="tab" onclick="openDevelopmentSettings('${p.id}')">목표 편집</button></div></section><section class="panel"><div class="panel-head"><div><span class="eyebrow">Conversation Fragments</span><h3>대화 단편</h3></div><strong>${notes.length}</strong></div>${notes.slice(0,6).map(n=>`<div class="workspace-note-line-v18"><strong>${esc(n.text)}</strong><small>${esc(n.date)}</small></div>`).join('')||emptyLine('AI Collaboration에 저장된 단편이 없습니다.')}<button class="workspace-add-line-v18" onclick="data.assetIntelligence.collabProject='${p.id}';data.assetIntelligence.tab='collab';saveData();go('assets')">+ AI 대화 단편 기록</button></section><section class="panel workspace-wide-v18"><div class="panel-head"><div><span class="eyebrow">AI Preview</span><h3>프로젝트 문맥 요약</h3></div><span class="maturity preview">Preview</span></div><div class="workspace-context-summary-v18"><p><b>프로젝트:</b> ${esc(p.name)} · ${esc(p.desc)}</p><p><b>현재:</b> ${esc(p.current)}</p><p><b>다음:</b> ${esc(p.next)}</p><p><b>열린 작업:</b> ${w.tasks.filter(t=>!t.done).map(t=>esc(t.title)).join(', ')||'없음'}</p><p><b>최근 메모:</b> ${w.notes.slice(0,3).map(n=>esc(n.text)).join(' / ')||'없음'}</p></div></section></div>`;}
function workspaceActivityLine18(a){return `<div class="workspace-activity-line-v18"><span>${esc(a.type)}</span><strong>${esc(a.text)}</strong><small>${esc(a.date)}</small></div>`;}
function renderWorkspaceActivity18(box,p,w){box.innerHTML=`<section class="panel"><div class="panel-head"><div><span class="eyebrow">Activity</span><h3>프로젝트 실행 이력</h3></div><small>${w.activity.length} records</small></div><div class="workspace-activity-list-v18">${w.activity.map(workspaceActivityLine18).join('')||emptyLine('아직 작업 이력이 없습니다.')}</div></section>`;}

// Navigation: keep all operation menus in Workspace group and add the new Project Workspace.
if(!navItems.some(n=>n.id==='workspace')) navItems.splice(3,0,{id:'workspace',label:'Workspace',ico:'▦'});
pages.workspace=renderWorkspace18;
buildNav=function(){
  const c=counts();const badge={tasks:c.tasks,memory:c.memory,projects:c.projects,brain:c.brain,assets:data.digitalAssets.length,workspace:Object.values(data.workspaces||{}).reduce((s,w)=>s+(w.tasks||[]).filter(t=>!t.done).length,0)};
  const workspaceIds=['home','tasks','projects','workspace','brain','development','assets','knowledge','memory'];
  const controlIds=['roadmap','system'];
  const rows=ids=>ids.map(id=>navItems.find(n=>n.id===id)).filter(Boolean).map(n=>`<button class="nav-item ${n.id===current?'active':''}" data-page="${n.id}"><span class="ico">${n.ico}</span><span>${n.label}</span>${badge[n.id]?`<span class="badge">${badge[n.id]}</span>`:''}</button>`).join('');
  $('#nav').innerHTML=`<div class="nav-group"><div class="nav-label">Workspace</div>${rows(workspaceIds)}</div><div class="nav-group"><div class="nav-label">Control</div>${rows(controlIds)}</div>`;
  $$('.nav-item').forEach(b=>b.onclick=()=>go(b.dataset.page));
};

const openProjectV18Base=openProject;
openProject=function(id){openProjectV18Base(id);setTimeout(()=>{const top=$('#content > .tab');if(top&&!$('#openWorkspaceProject18')){const b=document.createElement('button');b.id='openWorkspaceProject18';b.className='tab';b.textContent='Workspace 열기';b.style.marginLeft='8px';b.onclick=()=>{data.workspaceUI.projectId=id;data.workspaceUI.tab='overview';saveData();go('workspace');};top.insertAdjacentElement('afterend',b);}},0);};

const renderHomeV18Base=renderHome;
function renderHomeV18(){
  renderHomeV18Base();
  const dateSmall=$('.date-block small');if(dateSmall)dateSmall.textContent='Studio OS v1.8';
  const open=Object.entries(data.workspaces||{}).flatMap(([pid,w])=>(w.tasks||[]).filter(t=>!t.done).map(t=>({...t,projectId:pid}))), recent=Object.entries(data.workspaces||{}).flatMap(([pid,w])=>(w.activity||[]).map(a=>({...a,projectId:pid}))).slice().sort((a,b)=>String(b.id).localeCompare(String(a.id))).slice(0,5);
  const section=document.createElement('section');section.className='panel home-workspace-v18';section.innerHTML=`<div class="panel-head"><div><span class="eyebrow">Project Workspace</span><h3>오늘의 실행 현황</h3></div><button onclick="go('workspace')">Workspace 열기</button></div><div class="home-workspace-grid-v18"><div><small>프로젝트 작업</small><strong>${open.length}</strong><span>Open tasks</span></div><div><small>진행 프로젝트</small><strong>${data.projects.filter(p=>p.status==='Active').length}</strong><span>Active</span></div><div><small>Workspace 메모</small><strong>${Object.values(data.workspaces||{}).reduce((s,w)=>s+(w.notes||[]).length,0)}</strong><span>Captured</span></div><div><small>최근 활동</small><strong>${recent.length}</strong><span>Tracked</span></div></div>`;
  const brief=$('.brief-card');if(brief)brief.insertAdjacentElement('afterend',section);
}
pages.home=renderHomeV18;

renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>아이디어를 자산으로 전환하고, Workspace에서 실제 프로젝트를 실행하는 발전 이력입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI, 일정, 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset과 Pack으로 개발 전 기준 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report 내보내기와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations</strong><p>Ideas → AI Discussion → Development → Assets → Knowledge 흐름</p></div><div class="roadmap-row"><strong>v1.5 · Digital Asset Registry</strong><p>Master Asset, Version Asset, 관계·재사용 등록부</p></div><div class="roadmap-row"><strong>v1.6 · Asset Workspace</strong><p>실제 파일·링크 연결과 프로젝트 적용</p></div><div class="roadmap-row"><strong>v1.7 · Asset Intelligence</strong><p>자산 추천·유사 탐지·재사용 센터와 AI Collaboration Preview</p></div><div class="roadmap-row current-roadmap"><strong>v1.8 · Project Workspace — 현재</strong><p>프로젝트별 Tasks·Notes·Files·Assets·AI·Activity를 한곳에서 실행</p></div><div class="roadmap-row"><strong>v1.9 · AI Collaboration</strong><p>Workspace 문맥을 기반으로 AI 협업과 결과 회수 심화 예정</p></div><div class="roadmap-row"><strong>v2.0 · Daily Operating Release</strong><p>실제 프로젝트에서 매일 사용할 수 있는 안정화 버전</p></div></div>`;};
renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>현재 브라우저에 저장된 Studio OS 데이터와 자산 리소스를 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>운영·Workspace 정보는 LocalStorage, 연결 파일은 IndexedDB에 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes metadata</small></div><div class="panel"><h3>Data backup</h3><p>JSON 백업에는 Workspace의 작업·메모·파일 참조·활동 이력이 포함됩니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.8 · Project Workspace</p></div><div class="panel"><h3>Operating Principle</h3><p>관리에서 실행으로. 프로젝트에 필요한 작업 문맥을 한 공간에 유지합니다.</p></div></div>`;$('#importFile').onchange=importData;};
const projectPackageV18Base=projectPackage;
projectPackage=function(projectId){const pkg=projectPackageV18Base(projectId),w=ensureWorkspace18(projectId);pkg.studioOSVersion=V18_VERSION;pkg.workspace={openTasks:w.tasks.filter(t=>!t.done),recentNotes:w.notes.slice(0,10),files:w.files,activity:w.activity.slice(0,20)};return pkg;};
renderNotifications=function(){const c=counts(),workspaceOpen=Object.values(data.workspaces||{}).reduce((s,w)=>s+(w.tasks||[]).filter(t=>!t.done).length,0);notificationPanel.innerHTML=`<div class="notification-head"><strong>알림</strong><button onclick="notificationPanel.classList.add('hidden')">닫기</button></div><div class="notification-item"><strong>Workspace 열린 작업 ${workspaceOpen}건</strong><small>프로젝트별 실행 작업을 확인하세요.</small></div><div class="notification-item"><strong>Studio OS v1.8</strong><small>Project Workspace가 활성화되었습니다.</small></div><div class="notification-item"><strong>전체 일정 ${c.tasks}건</strong><small>공통 일정과 프로젝트 작업은 별도로 관리됩니다.</small></div>`;};

// refresh initial UI after all v1.8 overrides are ready
buildNav();if(current==='home')renderHomeV18();

// ===== Studio OS v1.9 · Experience & Patch Engine =====
const V19_VERSION='1.9';
const EXPERIENCE_AREAS=['App Development','Image / PNG','Music / Prompt','Documents','Design Engine','AI Collaboration','Studio OS','Common'];
const EXPERIENCE_SEVERITIES=['Critical','High','Medium','Low'];
const EXPERIENCE_TYPES=['Failure','Dislike','Rework','Best Practice'];

function upsertV19(list,item,key='id'){
  const i=list.findIndex(x=>x[key]===item[key]);
  if(i>=0) list[i]={...list[i],...item}; else list.unshift(item);
}
function ensureV19(){
  data.experiences=data.experiences||[];
  data.patchImports=data.patchImports||[];
  data.patchUI=data.patchUI||{tab:'experience',area:'All',severity:'All',type:'All',query:''};
  const rules=[
    {id:'C-OPS-001',title:'OS–AI 업무 분담 원칙',chapter:'Operations',status:'Approved',content:'Studio OS는 프로젝트 생성, Preset·Constitution 적용, AI Report 출력, 일정·상태·버전·Decision·History·Workspace·디지털 자산·사후관리를 담당한다. GPT는 AI Report를 기반으로 기획 고도화, 문답, 설계와 실제 제작을 담당한다.',scope:'전체 프로젝트',projects:['Studio OS','우리집캐디','SAMS','BPM 검색도우미','BECO Bowling'],related:['C-PATCH-001','C-PJT-001'],note:'Studio OS는 운영, GPT는 사고와 제작을 담당한다.',favorite:true,updated:'2026-08-04'},
    {id:'C-PATCH-001',title:'AI 제작 결과 패치 반환 원칙',chapter:'Operations',status:'Approved',content:'GPT는 프로젝트 진행 또는 완료 시 Studio OS 반영용 Development Patch 또는 Release Patch를 함께 제공한다. 프로젝트 버전은 유지하고 패치 파일명으로 프로젝트명·버전·유형을 구분한다.',scope:'AI 협업 프로젝트',projects:['Studio OS','우리집캐디'],related:['C-OPS-001','C-PJT-001'],note:'StudioOS_Patch_<프로젝트명>_<버전>_<유형>.studioospatch.json',favorite:true,updated:'2026-08-04'},
    {id:'C-EXP-001',title:'경험 기반 재발 방지 원칙',chapter:'Experience',status:'Approved',content:'실패·불만족·재작업·우수 사례를 분야와 영향 등급으로 기록하고 Lesson과 Constitution Candidate로 연결한다. 관련 경험은 이후 AI Report에 포함한다.',scope:'전체 제작 분야',projects:['Studio OS','우리집캐디'],related:['C-OS-001','C-PATCH-001'],note:'Failure → Lesson → Constitution → Best Practice 순환',favorite:true,updated:'2026-08-04'},
    {id:'C-VERIFY-001',title:'검증 상태 표시 원칙',chapter:'Quality',status:'Approved',content:'산출물은 설계 완료, 코드 생성 완료, 정적 검토 완료, 실행 검증 완료, 실기기 검증 완료 상태를 구분한다. 검증하지 않은 결과를 검증 완료로 표시하지 않는다.',scope:'앱·파일 제작',projects:['Studio OS','우리집캐디','SAMS','BPM 검색도우미','BECO Bowling'],related:['C-EXP-001'],note:'완료 선언의 신뢰성을 보호한다.',favorite:true,updated:'2026-08-04'}
  ];
  rules.forEach(r=>upsertV19(data.constitution,r));

  const seeds=[
    ['EXP-APP-001','App Development','Critical','Failure','Freeze UI를 무시한 인터페이스 대규모 변경','확정 기준 UI와 다른 구조로 확장되어 기존 피드백과 사용 습관이 무효화됨.','Freeze된 UI는 승인 없이 레이아웃·컴포넌트 위치를 바꾸지 않고 기능만 확장한다.','C-OS-001','Studio OS','Resolved'],
    ['EXP-COM-001','Common','Critical','Failure','실행 검증 없이 완성본으로 전달','코드 생성과 실제 실행 검증이 구분되지 않아 사용자가 오류를 직접 확인해야 했음.','설계·코드 생성·정적 검토·실행·실기기 검증 상태를 구분한다.','C-VERIFY-001','Common','Active'],
    ['EXP-APP-002','App Development','Critical','Failure','Preset·Type·Pack·DNA 동기화 누락','Game Preset을 선택했지만 App Type과 App Pack이 유지됨.','Preset 변경 시 Type·Pack·DNA·Required Rules·Validation을 한 번에 갱신한다.','C-EXP-001','Studio OS','Resolved'],
    ['EXP-OS-001','Studio OS','High','Rework','확장 가능한 프로젝트 목록을 체크박스로 평면 나열','프로젝트가 늘수록 화면 길이와 선택 복잡도가 급격히 증가함.','증가 가능한 목록은 검색·필터·대분류→중분류→항목 드롭다운을 사용한다.','C-EXP-001','Studio OS','Resolved'],
    ['EXP-OS-002','Studio OS','High','Failure','상세 화면 내부 이동 후 뒤로가기 누락','관련 자산을 탐색한 후 전체 모달을 닫아야만 원래 화면으로 돌아갈 수 있었음.','내부 탐색 스택과 뒤로가기, 전체 닫기를 분리한다.','C-EXP-001','Studio OS','Resolved'],
    ['EXP-UI-001','App Development','High','Rework','동적 한글 텍스트와 버튼이 좁은 영역에서 겹침','적용 중 프로젝트 경로와 제거 버튼이 충돌하고 줄바꿈이 깨짐.','텍스트와 액션 영역을 분리하고 긴 한글 데이터로 반응형 테스트한다.','C-EXP-001','Studio OS','Resolved'],
    ['EXP-REQ-001','AI Collaboration','High','Failure','기존 핵심 요구사항 누락','우리집캐디 전체 정리에서 통계청/KOSIS 생활권 분석 기능이 빠짐.','프로젝트별 Must Not Omit 목록을 AI Report와 패치에 항상 포함한다.','C-EXP-001','우리집캐디','Active'],
    ['EXP-ASSET-001','Studio OS','High','Dislike','실제 파일 없는 자산을 활용 가능한 자산처럼 표시','자산 이력은 보이지만 열기·다운로드·복제·적용이 불가능했음.','Record Only·Reference·Connected·Verified·Reusable 상태를 구분한다.','C-EXP-001','Studio OS','Active'],
    ['EXP-IMG-001','Image / PNG','Critical','Failure','원본 인물 또는 기준 레이아웃 변형','보존형 편집 요청에서 인물·얼굴·카드 배치가 바뀌면 전체 결과를 사용할 수 없음.','기준 이미지가 있으면 신규 생성보다 보존형 편집을 우선하고 변경 금지 요소를 잠근다.','C-EXP-001','Image','Active'],
    ['EXP-DOC-001','Documents','Critical','Failure','확정 보고서 템플릿의 카드 크기·페이지 구조 변경','내용만 바꿔야 하는 고정 템플릿의 재사용성이 무너짐.','고정 템플릿은 페이지 구조와 카드 크기를 유지하고 텍스트만 변경한다.','C-DOC-001','Documents','Active'],
    ['EXP-MUSIC-001','Music / Prompt','High','Rework','음원 완료 기준 없이 분위기 중심 프롬프트 작성','길이·첫 후킹·BPM·루프·보컬 조건이 없어 결과 편차가 컸음.','용도·길이·후킹 시점·BPM·장르·보컬·루프·금지요소를 먼저 고정한다.','C-EXP-001','Music','Active'],
    ['EXP-AI-001','AI Collaboration','Critical','Best Practice','OS는 운영, GPT는 제작으로 역할 분리','OS 입력 부담을 줄이고 대화를 통한 기획 발전과 결과 회수를 동시에 유지함.','AI Report Export → GPT 제작 → Studio OS Patch Import 흐름을 기본 운영 모델로 사용한다.','C-OPS-001','Studio OS','Active']
  ];
  seeds.forEach(x=>upsertV19(data.experiences,{id:x[0],area:x[1],severity:x[2],type:x[3],title:x[4],problem:x[5],lesson:x[6],constitutionId:x[7],project:x[8],status:x[9],date:'2026-08-04',rank:EXPERIENCE_SEVERITIES.indexOf(x[2])+1,tags:[]}));

  let home=data.projects.find(p=>p.name==='우리집캐디');
  if(!home){home={id:'p-home-caddie',name:'우리집캐디',desc:'수입 대비 지출 관리와 목표 달성을 캐디 피드백과 게임화로 돕는 가족 자산관리 앱. KOSIS 생활권 분석은 후속 버전.',progress:20,status:'Active',current:'Flutter v0.1 소스 생성·실행 대기',next:'실기기 확인 및 v0.1 피드백'};data.projects.push(home);}else Object.assign(home,{status:'Active',progress:Math.max(home.progress||0,20),current:'Flutter v0.1 소스 생성·실행 대기',next:'실기기 확인 및 v0.1 피드백'});
  const pc={projectId:home.id,type:'App',presetId:'PRESET-FLUTTER',presetName:'Flutter Internal App',packIds:['PACK-COMMON','PACK-APP'],ruleIds:['C-OS-001','C-UI-001','C-ARC-001','C-DATA-001','C-PJT-001','C-OPS-001','C-PATCH-001','C-EXP-001','C-VERIFY-001'],requiredRuleIds:['C-OS-001','C-UI-001','C-PJT-001','C-OPS-001'],dna:['App','Flutter','Family Finance','Local First','Gamification','Caddie Feedback','KOSIS Later'],createdAt:'2026-08-04T22:00:00+09:00'};
  upsertV19(data.projectConstitutions,pc,'projectId');
  let dev=data.developmentRecords.find(x=>x.projectId===home.id);if(!dev){dev={projectId:home.id,openIssues:[],buildHistory:[]};data.developmentRecords.push(dev);}Object.assign(dev,{status:'Review',currentVersion:'0.1',targetVersion:'0.1.1',currentGoal:'Flutter v0.1 실행 확인 및 핵심 UX 피드백',sprint:'Sprint 01',openIssues:['Flutter 실기기 실행 검증','홈 화면 정보 우선순위 검토','점수 공식 확정','첫 캐디 캐릭터 디자인 확정','KOSIS API 적용 범위 확정'],lastExport:'2026-08-04'});
  dev.buildHistory=dev.buildHistory||[];if(!dev.buildHistory.some(b=>b.version==='0.1'))dev.buildHistory.unshift({version:'0.1',date:'2026-08-04',summary:'Flutter 기반 핵심 MVP 소스 생성',tests:'코드 생성 완료 · 실행 검증 대기',knownIssues:['APK 미빌드','실기기 미검증']});
  const w=ensureWorkspace18(home.id);const wt=[
    ['WHC-01','Flutter v0.1 실행 확인','High',false],['WHC-02','홈 화면 정보 우선순위 피드백','High',false],['WHC-03','점수·등급 공식 확정','Medium',false],['WHC-04','첫 캐디 캐릭터 확정','Medium',false],['WHC-05','KOSIS 생활권 분석 v0.2 범위 정의','Low',false]
  ];wt.forEach(t=>{if(!w.tasks.some(x=>x.id===t[0]))w.tasks.push({id:t[0],title:t[1],priority:t[2],done:t[3],createdAt:'2026-08-04'});});
  if(!w.notes.some(n=>n.id==='N-HC-01'))w.notes.unshift({id:'N-HC-01',type:'Decision',text:'Studio OS는 우리집캐디의 기준·진행·자산·사후관리를 담당하고 GPT는 기획 고도화와 실제 제작을 담당한다.',date:'2026-08-04'});
  if(!w.activity.some(a=>a.id==='A-HC-01'))w.activity.unshift({id:'A-HC-01',type:'Build',text:'우리집캐디 v0.1 Flutter Source 생성',date:'8/4 22:30'});
  const assets=[
    {id:'MA-HOME-CADDIE',name:'우리집캐디',kind:'Master',type:'Application',project:'우리집캐디',version:'Master',status:'Active',location:'',usageProjects:['우리집캐디'],note:'가족 자산관리·목표달성·캐디 피드백 앱',relatedIds:['VA-HOME-CADDIE-01'],parentId:'',updated:'2026-08-04',quality:{reuse:3,complete:2,docs:3,stable:1},tags:['flutter','finance','family','caddie']},
    {id:'VA-HOME-CADDIE-01',name:'우리집캐디 Flutter Source v0.1',kind:'Version',type:'Source Code',project:'우리집캐디',version:'0.1',status:'Review',location:'Our_Home_Caddie_v0.1_Flutter_Source.zip',usageProjects:['우리집캐디'],note:'홈·자산·목표·리포트·마이, SharedPreferences Local First. 실행 검증 대기.',relatedIds:['MA-HOME-CADDIE'],parentId:'MA-HOME-CADDIE',updated:'2026-08-04',quality:{reuse:2,complete:2,docs:4,stable:1},tags:['flutter','source','mvp']}
  ];assets.forEach(a=>{if(typeof normalizeV15Asset==='function')a=normalizeV15Asset(a);upsertV19(data.digitalAssets,a);});
  const decisions=[
    {id:'D-HC-001',title:'우리집캐디 v0.1 MVP 범위 확정',status:'Approved',project:'우리집캐디',date:'2026-08-04',detail:'홈·수입/지출·목표·리포트·마이와 기본 캐디 피드백을 우선 구현한다.'},
    {id:'D-HC-002',title:'KOSIS 생활권 분석은 후속 버전으로 분리',status:'Approved',project:'우리집캐디',date:'2026-08-04',detail:'v0.1은 핵심 생활관리 경험 검증에 집중하고 KOSIS API는 v0.2 이후 적용한다.'},
    {id:'D-OPS-001',title:'OS–GPT 업무 분담 및 Patch 반환 방식 채택',status:'Approved',project:'Studio OS',date:'2026-08-04',detail:'Studio OS는 운영, GPT는 제작, 결과는 Development/Release Patch로 회수한다.'}
  ];decisions.forEach(d=>upsertV19(data.decisions,d));
  localStorage.setItem(KEY,JSON.stringify(data));
}
ensureV19();

function expColor19(s){return s==='Critical'?'critical':s==='High'?'high':s==='Medium'?'medium':'low';}
function expFiltered19(){const u=data.patchUI,q=(u.query||'').toLowerCase();return data.experiences.filter(x=>(u.area==='All'||x.area===u.area)&&(u.severity==='All'||x.severity===u.severity)&&(u.type==='All'||x.type===u.type)&&(!q||[x.title,x.problem,x.lesson,x.project,x.area].join(' ').toLowerCase().includes(q))).sort((a,b)=>EXPERIENCE_SEVERITIES.indexOf(a.severity)-EXPERIENCE_SEVERITIES.indexOf(b.severity));}
function setPatchTab19(tab){data.patchUI.tab=tab;saveData();renderExperience19();}
function setExpFilter19(k,v){data.patchUI[k]=v;saveData();renderExperience19();}
function renderExperience19(){
  const u=data.patchUI,counts19=EXPERIENCE_SEVERITIES.map(s=>[s,data.experiences.filter(x=>x.severity===s).length]);
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Learning operating system</span><h1>Experience & Patch Engine</h1><p>실패·불만족·재작업·우수 사례를 다음 프로젝트의 예방 규칙과 패치로 전환합니다.</p></div>
  <div class="experience-kpis-v19">${counts19.map(([s,n])=>`<div class="${expColor19(s)}"><small>${s}</small><strong>${n}</strong></div>`).join('')}<div><small>Patch imports</small><strong>${data.patchImports.length}</strong></div></div>
  <div class="workspace-tabs-v18"><button class="${u.tab==='experience'?'active':''}" onclick="setPatchTab19('experience')">Experience Library</button><button class="${u.tab==='lessons'?'active':''}" onclick="setPatchTab19('lessons')">Lessons & Candidates</button><button class="${u.tab==='patch'?'active':''}" onclick="setPatchTab19('patch')">Patch Center</button><button class="${u.tab==='history'?'active':''}" onclick="setPatchTab19('history')">Import History</button></div>
  <div id="experienceBody19"></div>`;
  if(u.tab==='experience')renderExperienceLibrary19();else if(u.tab==='lessons')renderLessons19();else if(u.tab==='patch')renderPatchCenter19();else renderPatchHistory19();
}
function renderExperienceLibrary19(){const u=data.patchUI,list=expFiltered19();$('#experienceBody19').innerHTML=`<div class="experience-toolbar-v19"><input placeholder="문제·교훈·프로젝트 검색" value="${esc(u.query||'')}" oninput="setExpFilter19('query',this.value)"><select onchange="setExpFilter19('area',this.value)"><option>All</option>${EXPERIENCE_AREAS.map(x=>`<option ${u.area===x?'selected':''}>${x}</option>`).join('')}</select><select onchange="setExpFilter19('severity',this.value)"><option>All</option>${EXPERIENCE_SEVERITIES.map(x=>`<option ${u.severity===x?'selected':''}>${x}</option>`).join('')}</select><select onchange="setExpFilter19('type',this.value)"><option>All</option>${EXPERIENCE_TYPES.map(x=>`<option ${u.type===x?'selected':''}>${x}</option>`).join('')}</select><button class="primary-btn compact" onclick="openExperienceModal19()">+ 사례 등록</button></div><div class="experience-layout-v19"><aside class="panel experience-areas-v19"><small>분야별</small>${EXPERIENCE_AREAS.map(a=>`<button onclick="setExpFilter19('area','${a}')"><span>${esc(a)}</span><b>${data.experiences.filter(x=>x.area===a).length}</b></button>`).join('')}</aside><section class="experience-list-v19">${list.map(experienceCard19).join('')||emptyLine('조건에 맞는 경험 사례가 없습니다.')}</section></div>`;}
function experienceCard19(x){return `<article class="panel experience-card-v19"><div class="experience-card-head-v19"><span class="severity-v19 ${expColor19(x.severity)}">${x.severity}</span><span class="type-v19">${esc(x.type)}</span><small>${esc(x.area)} · ${esc(x.project||'Common')}</small></div><h3>${esc(x.title)}</h3><div class="experience-split-v19"><div><small>문제 / 관찰</small><p>${esc(x.problem)}</p></div><div><small>Lesson / 예방</small><p>${esc(x.lesson)}</p></div></div><div class="experience-card-foot-v19"><span>${esc(x.constitutionId||'No rule')}</span><span>${esc(x.status||'Active')}</span><button onclick="openExperienceModal19('${x.id}')">상세·편집</button></div></article>`;}
function openExperienceModal19(id=''){const x=data.experiences.find(e=>e.id===id)||{area:'App Development',severity:'High',type:'Failure',title:'',problem:'',lesson:'',constitutionId:'',project:'',status:'Active',tags:[]};openModal(id?'경험 사례 편집':'경험 사례 등록',`<div class="form-grid"><label>분야<select id="eArea">${EXPERIENCE_AREAS.map(v=>`<option ${x.area===v?'selected':''}>${v}</option>`).join('')}</select></label><label>등급<select id="eSeverity">${EXPERIENCE_SEVERITIES.map(v=>`<option ${x.severity===v?'selected':''}>${v}</option>`).join('')}</select></label></div><div class="form-grid"><label>유형<select id="eType">${EXPERIENCE_TYPES.map(v=>`<option ${x.type===v?'selected':''}>${v}</option>`).join('')}</select></label><label>프로젝트<input id="eProject" value="${esc(x.project||'')}"></label></div><label>제목<input id="eTitle" value="${esc(x.title)}"></label><label>문제·불만족 내용<textarea id="eProblem">${esc(x.problem)}</textarea></label><label>원인·교훈·재발 방지<textarea id="eLesson">${esc(x.lesson)}</textarea></label><div class="form-grid"><label>관련 Constitution<input id="eConstitution" value="${esc(x.constitutionId||'')}"></label><label>상태<select id="eStatus">${['Active','Resolved','Candidate','Archived'].map(v=>`<option ${x.status===v?'selected':''}>${v}</option>`).join('')}</select></label></div>`,()=>{const title=$('#eTitle').value.trim();if(!title)return toast('제목을 입력하세요.');const obj={id:id||uid('EXP'),area:$('#eArea').value,severity:$('#eSeverity').value,type:$('#eType').value,title,problem:$('#eProblem').value.trim(),lesson:$('#eLesson').value.trim(),constitutionId:$('#eConstitution').value.trim(),project:$('#eProject').value.trim(),status:$('#eStatus').value,date:todayISO(),tags:[]};upsertV19(data.experiences,obj);saveData();closeModal();renderExperience19();toast('Experience Library에 저장했습니다.');});}
function renderLessons19(){const candidates=data.experiences.filter(x=>x.lesson&&(!x.constitutionId||x.status==='Candidate'));$('#experienceBody19').innerHTML=`<div class="lessons-grid-v19"><section class="panel"><span class="eyebrow">Failure → Lesson</span><h3>재발 방지 교훈</h3>${data.experiences.filter(x=>x.type!=='Best Practice').slice(0,12).map(x=>`<div class="lesson-line-v19"><span class="severity-v19 ${expColor19(x.severity)}">${x.severity}</span><div><strong>${esc(x.title)}</strong><p>${esc(x.lesson)}</p></div></div>`).join('')}</section><section class="panel"><span class="eyebrow">Constitution Candidates</span><h3>칙 승격 검토</h3>${candidates.map(x=>`<div class="candidate-line-v19"><strong>${esc(x.title)}</strong><p>${esc(x.lesson)}</p><button class="tab" onclick="promoteExperience19('${x.id}')">후보 등록</button></div>`).join('')||emptyLine('현재 자동 승격 후보가 없습니다.')}</section><section class="panel best-practice-v19"><span class="eyebrow">Best Practice</span><h3>다음에도 유지할 것</h3>${data.experiences.filter(x=>x.type==='Best Practice').map(x=>`<div class="lesson-line-v19"><span class="severity-v19 low">Best</span><div><strong>${esc(x.title)}</strong><p>${esc(x.lesson)}</p></div></div>`).join('')}</section></div>`;}
function promoteExperience19(id){const x=data.experiences.find(e=>e.id===id);if(!x)return;data.candidates.unshift({id:uid('K'),title:x.title,status:'Review',source:`Experience ${x.id}`,date:todayISO(),detail:x.lesson});x.status='Candidate';saveData();renderExperience19();toast('Constitution Candidate로 등록했습니다.');}
function patchPayload19(type,projectId){const p=data.projects.find(x=>x.id===projectId),pkg=projectPackage(projectId);const exp=data.experiences.filter(x=>!x.project||x.project==='Common'||x.project===p.name||x.area==='App Development').slice(0,20);return {schema:'studio-os-project-patch-v1',patchId:`PATCH-${p.id}-${pkg.development.currentVersion}-${type}`.replace(/\s/g,'-'),patchType:type,generatedAt:new Date().toISOString(),source:'GPT / Studio OS workflow',targetStudioOS:'1.9+',projectVersion:pkg.development.currentVersion,project:pkg.project,development:pkg.development,constitution:pkg.constitution,rules:pkg.rules,decisions:pkg.decisions,workspace:data.workspaces[p.id]||null,assets:pkg.assets,experiences:exp,roadmap:type==='Release'?[{version:'0.1',name:'핵심 MVP',status:'Review'},{version:'0.2',name:'KOSIS 생활권 분석',status:'Planned'},{version:'0.3',name:'가족 기능',status:'Planned'},{version:'1.0',name:'정식 출시',status:'Planned'}]:[]};}
function renderPatchCenter19(){const p=data.projects.find(x=>x.name==='우리집캐디')||data.projects[0];$('#experienceBody19').innerHTML=`<div class="patch-grid-v19"><section class="panel"><span class="eyebrow">Patch Protocol</span><h3>AI 제작 결과를 OS로 회수</h3><div class="patch-flow-v19"><span>AI Report Export</span><b>→</b><span>GPT 제작</span><b>→</b><span>Patch 반환</span><b>→</b><span>Preview·Import</span></div><label>프로젝트<select id="patchProject19">${data.projects.map(x=>`<option value="${x.id}" ${x.id===p.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label><div class="patch-actions-v19"><button class="tab" onclick="downloadPatch19('Development')">Development Patch 생성</button><button class="primary-btn compact" onclick="downloadPatch19('Release')">Release Patch 생성</button></div><small>프로젝트 버전은 유지하고 파일명만 StudioOS_Patch_프로젝트_버전_유형으로 구분합니다.</small></section><section class="panel patch-import-v19"><span class="eyebrow">Import</span><h3>Patch 적용</h3><p>패치를 먼저 검증하고 변경 내역을 미리 본 뒤 적용합니다. 동일 Patch ID는 중복 적용하지 않습니다.</p><input id="patchFile19" type="file" accept=".json,.studioospatch.json,application/json"><button class="primary-btn compact" onclick="previewPatchFile19()">Patch Preview</button><div id="patchPreview19" class="patch-preview-v19">패치 파일을 선택하세요.</div></section><section class="panel"><span class="eyebrow">Supported updates</span><h3>한 번에 반영되는 항목</h3><div class="patch-supported-v19"><span>Project</span><span>Workspace</span><span>Decision</span><span>History</span><span>Assets</span><span>Constitution</span><span>Experience</span><span>Roadmap</span></div></section></div>`;}
function downloadPatch19(type){const id=$('#patchProject19').value,p=data.projects.find(x=>x.id===id),payload=patchPayload19(type,id),name=`StudioOS_Patch_${p.name.replace(/\s+/g,'_')}_${payload.projectVersion}_${type}.studioospatch.json`;downloadBlob(name,JSON.stringify(payload,null,2),'application/json');toast(`${type} Patch를 생성했습니다.`);}
let pendingPatch19=null;
async function previewPatchFile19(){const f=$('#patchFile19')?.files?.[0];if(!f)return toast('패치 파일을 선택하세요.');try{const patch=JSON.parse(await f.text());if(patch.schema!=='studio-os-project-patch-v1')throw new Error('지원하지 않는 Patch schema');pendingPatch19=patch;const duplicate=data.patchImports.some(x=>x.patchId===patch.patchId);$('#patchPreview19').innerHTML=`<div class="patch-preview-card-v19"><strong>${esc(patch.patchType)} Patch · ${esc(patch.project?.name||'-')}</strong><p>Patch ID: ${esc(patch.patchId)}</p><div><span>Rules ${(patch.rules||[]).length}</span><span>Decisions ${(patch.decisions||[]).length}</span><span>Assets ${(patch.assets||[]).length}</span><span>Experiences ${(patch.experiences||[]).length}</span></div>${duplicate?'<b class="duplicate-v19">이미 적용된 패치입니다.</b>':`<button class="primary-btn compact" onclick="applyPatch19()">검증 후 적용</button>`}</div>`;}catch(e){pendingPatch19=null;$('#patchPreview19').textContent=`검증 실패: ${e.message}`;}}
function applyPatch19(){const p=pendingPatch19;if(!p)return;if(data.patchImports.some(x=>x.patchId===p.patchId))return toast('이미 적용된 패치입니다.');try{const project=p.project;if(project){let cur=data.projects.find(x=>x.id===project.id)||data.projects.find(x=>x.name===project.name);if(cur)Object.assign(cur,project);else data.projects.push(project);}
  if(p.constitution)upsertV19(data.projectConstitutions,p.constitution,'projectId');(p.rules||[]).forEach(r=>upsertV19(data.constitution,{...r,projects:r.projects||[p.project?.name].filter(Boolean),related:r.related||[],updated:todayISO()}));(p.decisions||[]).forEach(d=>upsertV19(data.decisions,d));(p.assets||[]).forEach(a=>upsertV19(data.digitalAssets,a));(p.experiences||[]).forEach(e=>upsertV19(data.experiences,e));if(p.development){let d=data.developmentRecords.find(x=>x.projectId===p.development.projectId);if(d)Object.assign(d,p.development);else data.developmentRecords.push(p.development);}if(p.workspace&&p.project?.id)data.workspaces[p.project.id]=p.workspace;data.patchImports.unshift({patchId:p.patchId,type:p.patchType,project:p.project?.name||'-',version:p.projectVersion,date:new Date().toLocaleString('ko-KR'),counts:{rules:(p.rules||[]).length,assets:(p.assets||[]).length,experiences:(p.experiences||[]).length}});saveData();pendingPatch19=null;renderExperience19();toast('Patch를 안전하게 적용했습니다.');}catch(e){toast(`Patch 적용 실패: ${e.message}`);}}
function renderPatchHistory19(){$('#experienceBody19').innerHTML=`<div class="panel"><span class="eyebrow">Audit trail</span><h3>Patch Import History</h3><div class="patch-history-v19">${data.patchImports.map(x=>`<div><span>${esc(x.type)}</span><strong>${esc(x.project)} · v${esc(x.version)}</strong><small>${esc(x.date)}</small><p>${x.counts.rules} Rules · ${x.counts.assets} Assets · ${x.counts.experiences} Experiences</p></div>`).join('')||emptyLine('아직 가져온 패치가 없습니다.')}</div></div>`;}

navItems.splice(7,0,{id:'experience',label:'Experience',ico:'!'});pages.experience=renderExperience19;
const buildNavV19=buildNav;buildNav=function(){const c=counts();const badge={tasks:c.tasks,memory:c.memory,projects:c.projects,brain:c.brain,assets:data.digitalAssets.length,experience:data.experiences.filter(x=>x.severity==='Critical').length};$('#nav').innerHTML=`<div class="nav-group"><div class="nav-label">Workspace</div>${navItems.slice(0,9).map(n=>`<button class="nav-item ${n.id===current?'active':''}" data-page="${n.id}"><span class="ico">${n.ico}</span><span>${n.label}</span>${badge[n.id]?`<span class="badge">${badge[n.id]}</span>`:''}</button>`).join('')}</div><div class="nav-group"><div class="nav-label">Control</div>${navItems.slice(9).map(n=>`<button class="nav-item ${n.id===current?'active':''}" data-page="${n.id}"><span class="ico">${n.ico}</span><span>${n.label}</span></button>`).join('')}</div>`;$$('.nav-item').forEach(b=>b.onclick=()=>go(b.dataset.page));};

const projectPackageV19Base=projectPackage;projectPackage=function(projectId){const pkg=projectPackageV19Base(projectId),p=data.projects.find(x=>x.id===projectId);pkg.studioOSVersion=V19_VERSION;pkg.relevantExperiences=data.experiences.filter(x=>!x.project||x.project==='Common'||x.project===p.name||x.area==='App Development').slice(0,20).map(x=>({id:x.id,area:x.area,severity:x.severity,type:x.type,title:x.title,lesson:x.lesson,constitutionId:x.constitutionId}));pkg.mustNotOmit=['확정 UI·구조','검증 상태','후속 KOSIS 생활권 분석','OS–GPT 업무 분담','관련 Experience 재발 방지'];return pkg;};
const packageMarkdownV19Base=packageMarkdown;packageMarkdown=function(pkg){return packageMarkdownV19Base(pkg)+`\n\n## Relevant Experience / Anti-Patterns\n${(pkg.relevantExperiences||[]).map(x=>`- [${x.severity}] ${x.area} · ${x.title}\n  - 예방: ${x.lesson}`).join('\n')||'- None'}\n\n## Must Not Omit\n${(pkg.mustNotOmit||[]).map(x=>`- ${x}`).join('\n')}`;};

renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>프로젝트를 운영하고, 제작 경험을 다시 규칙과 자산으로 회수하는 발전 이력입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI와 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset·Pack 기반 프로젝트 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations</strong><p>아이디어에서 자산까지의 흐름</p></div><div class="roadmap-row"><strong>v1.5 · Digital Asset Registry</strong><p>Master·Version·Related Asset</p></div><div class="roadmap-row"><strong>v1.6 · Asset Workspace</strong><p>실제 파일 연결과 프로젝트 적용</p></div><div class="roadmap-row"><strong>v1.7 · Asset Intelligence</strong><p>추천·재사용·AI Collaboration Preview</p></div><div class="roadmap-row"><strong>v1.8 · Project Workspace</strong><p>Tasks·Notes·Files·Assets·AI·Activity</p></div><div class="roadmap-row current-roadmap"><strong>v1.9 · Experience & Patch Engine — 현재</strong><p>분야별 오답노트, 등급, Lesson, OS–GPT 업무 분담 칙, Development/Release Patch Import</p></div><div class="roadmap-row"><strong>v2.0 · Daily Operating Release</strong><p>우리집캐디 실전 운영 결과를 반영한 안정화·Freeze</p></div></div>`;};
renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>Studio OS 운영 데이터, Experience와 Patch 이력을 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>프로젝트·자산·칙·Experience·Patch History는 LocalStorage, 연결 파일은 IndexedDB에 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes metadata</small></div><div class="panel"><h3>Data backup</h3><p>JSON 백업에는 v1.9 운영 데이터가 포함되며 실제 대용량 파일은 별도 보관합니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.9 · Experience & Patch Engine</p></div><div class="panel"><h3>Operating Principle</h3><p>OS는 운영하고 GPT는 제작한다. 결과와 경험은 Patch로 회수한다.</p></div></div>`;$('#importFile').onchange=importData;};
renderNotifications=function(){const c=counts(),critical=data.experiences.filter(x=>x.severity==='Critical'&&x.status!=='Archived').length;notificationPanel.innerHTML=`<div class="notification-head"><strong>알림</strong><button onclick="notificationPanel.classList.add('hidden')">닫기</button></div><div class="notification-item"><strong>Critical Experience ${critical}건</strong><small>새 프로젝트 AI Report에 재발 방지 항목으로 포함됩니다.</small></div><div class="notification-item"><strong>우리집캐디 v0.1</strong><small>Flutter 소스 생성 완료 · 실행 검증 대기</small></div><div class="notification-item"><strong>Studio OS v1.9</strong><small>Experience & Patch Engine이 활성화되었습니다.</small></div>`;};

document.title='Studio OS v1.9 · Experience & Patch Engine';
const brandSmall=document.querySelector('.brand small');if(brandSmall)brandSmall.textContent='Experience & Patch · v1.9';
buildNav();

// ===== Studio OS v1.9.1 · Work Mode & Usability Patch =====
const V191_VERSION='1.9.1';
(function ensureV191(){
  data.workMode=data.workMode||{status:'Off',clockIn:null,clockOut:null,logs:[],workdays:[1,2,3,4,5],holidayMode:true};
  const rules=[
    {id:'C-WORK-001',title:'Studio OS 업무 공간 원칙',chapter:'Operations',status:'Approved',content:'Studio OS는 디지털 프로젝트의 기획·제작·운영·자산화·사후관리를 위한 업무 공간으로 사용한다. 개인 생활, 단순 취미, 일회성 정보는 기본 관리 대상에서 제외하며 사업화·콘텐츠화·디지털 자산화가 명확한 경우에만 프로젝트로 승격한다.',scope:'Studio OS 전체',projects:['Studio OS','우리집캐디','SAMS','BPM 검색도우미','BECO Bowling'],related:['C-OPS-001','C-PJT-001'],note:'회사형 업무 운영 기준',favorite:true,updated:'2026-08-04'},
    {id:'C-WORK-002',title:'평일 근무·주말 휴무 운영 원칙',chapter:'Operations',status:'Approved',content:'Studio OS의 기본 운영일은 월요일부터 금요일까지이며 주말과 공휴일은 휴무 상태로 표시한다. 휴무일 작업은 선택적 근무로 기록한다. 출근과 퇴근 시 Daily Work Log를 생성한다.',scope:'Studio OS 운영',projects:['Studio OS'],related:['C-WORK-001'],note:'출퇴근과 일일 업무 로그',favorite:true,updated:'2026-08-04'},
    {id:'C-ASSET-UNLINK-001',title:'프로젝트 자산 연결 해제 원칙',chapter:'Asset',status:'Approved',content:'프로젝트에서 자산을 제거할 때 원본 자산은 삭제하지 않고 해당 프로젝트와의 적용 연결만 해제한다. 다른 프로젝트 전용 자산은 적용 전에 경고한다.',scope:'디지털 자산',projects:['Studio OS','우리집캐디'],related:['C-EXP-001'],note:'원본 보존·연결만 해제',favorite:false,updated:'2026-08-04'}
  ];
  rules.forEach(r=>upsertV19(data.constitution,r));
  if(!data.experiences.some(x=>x.id==='EXP-OS-191-01'))data.experiences.unshift({id:'EXP-OS-191-01',area:'Studio OS',severity:'High',type:'Rework',title:'AI Workspace 카드가 긴 문장에 따라 비정상 확장',problem:'새로운 아이디어 문장이 길어지면서 한 카드만 과도하게 넓어져 메인 화면 균형이 깨짐.',lesson:'메인 요약 카드는 크기를 고정하고 본문은 2줄 말줄임표와 더보기 상세로 관리한다.',constitutionId:'C-EXP-001',project:'Studio OS',status:'Resolved',date:'2026-08-04',rank:2,tags:['card','ellipsis','layout']});
  saveData();
})();

function isHolidayV191(){const d=new Date().getDay();return !data.workMode.workdays.includes(d);}
function workStatusLabelV191(){if(data.workMode.status==='Working')return '근무 중';if(isHolidayV191())return '휴무';return '퇴근';}
function clockInV191(){if(data.workMode.status==='Working')return toast('이미 근무 중입니다.');data.workMode.status='Working';data.workMode.clockIn=new Date().toISOString();data.workMode.clockOut=null;saveData();renderHome();toast(isHolidayV191()?'선택적 근무를 시작했습니다.':'출근 처리했습니다.');}
function clockOutV191(){if(data.workMode.status!=='Working')return toast('현재 근무 중이 아닙니다.');const now=new Date(),start=new Date(data.workMode.clockIn||now),mins=Math.max(0,Math.round((now-start)/60000));const completed=Object.values(data.workspaces||{}).reduce((s,w)=>s+(w.tasks||[]).filter(t=>t.done&&t.createdAt===todayISO()).length,0);const activity=Object.values(data.workspaces||{}).reduce((s,w)=>s+(w.activity||[]).filter(a=>String(a.date||'').includes(`${now.getMonth()+1}/`)).length,0);const log={id:uid('WL'),date:todayISO(),clockIn:data.workMode.clockIn,clockOut:now.toISOString(),minutes:mins,completed,activity};data.workMode.logs.unshift(log);data.workMode.logs=data.workMode.logs.slice(0,60);data.workMode.status='Off';data.workMode.clockOut=now.toISOString();data.memories.unshift({id:uid('m'),title:`Daily Work Log · ${todayISO()}`,detail:`근무 ${mins}분 · 완료 ${completed}건 · 활동 ${activity}건`,type:'Work Log',date:'방금'});saveData();renderHome();toast('퇴근 처리하고 Daily Work Log를 저장했습니다.');}
function workModePanelV191(){const wm=data.workMode,working=wm.status==='Working',holiday=isHolidayV191(),recent=wm.logs.slice(0,4);const since=working?new Date(wm.clockIn).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}):'-';return `<div class="work-mode-panel-v191"><section class="panel work-status-v191"><div class="work-status-head-v191"><div><span class="eyebrow">Company Work Mode</span><h3>${workStatusLabelV191()}</h3><p>${holiday&&!working?'주말·휴일 기본 휴무 상태입니다. 필요하면 선택적 근무를 시작할 수 있습니다.':working?`출근 ${since} · 업무 프로젝트만 운영합니다.`:'평일 업무 시작 전 상태입니다.'}</p></div><span class="work-badge-v191 ${working?'working':holiday?'holiday':'off'}">${working?'WORKING':holiday?'HOLIDAY':'OFF'}</span></div><div class="work-actions-v191">${working?`<button class="primary" onclick="clockOutV191()">퇴근 정리</button>`:`<button class="primary" onclick="clockInV191()">${holiday?'선택적 근무':'출근하기'}</button>`}<button onclick="go('memory')">업무 로그 보기</button></div></section><section class="panel work-summary-v191"><span class="eyebrow">Recent Work Logs</span><div class="work-summary-grid-v191"><div><small>이번 기록</small><strong>${wm.logs.length}</strong></div><div><small>최근 근무</small><strong>${recent[0]?Math.round(recent[0].minutes/60*10)/10+'h':'-'}</strong></div></div><div class="work-log-list-v191">${recent.map(x=>`<div><strong>${esc(x.date.slice(5))}</strong><span>${x.minutes}분</span><small>활동 ${x.activity}</small></div>`).join('')||'<small>아직 퇴근 기록이 없습니다.</small>'}</div></section></div>`;}

const renderHomeV191Base=renderHome;
renderHome=function(){renderHomeV191Base();const title=$('.page-title');if(title)title.insertAdjacentHTML('afterend',workModePanelV191());decorateAISuggestionsV191();};
pages.home=renderHome;
function decorateAISuggestionsV191(){ $$('.ai-suggestion').forEach(btn=>{if(btn.querySelector('.more-v191'))return;const title=btn.querySelector('small')?.textContent||'',text=btn.querySelector('strong')?.textContent||'',detail=btn.querySelector('span')?.textContent||'';const more=document.createElement('button');more.className='more-v191';more.type='button';more.textContent='더보기';more.onclick=e=>{e.preventDefault();e.stopPropagation();openModal(title||'상세 내용',`<h3>${esc(text)}</h3><p style="line-height:1.7;white-space:pre-wrap">${esc(detail)}</p>`,()=>closeModal());};btn.appendChild(more);btn.title=[text,detail].filter(Boolean).join(' · ');}); }

function assetProjectWarningV191(a,p){if(!a||!p||!a.project||a.project==='공통'||a.project===p.name)return '';return `이 자산은 ${a.project} 프로젝트에서 생성된 자산입니다. ${p.name}에 재사용해도 되는지 확인하세요.`;}
applyAssetWorkspace18=function(assetId,projectId){const a=assetById(assetId),p=data.projects.find(x=>x.id===projectId);if(!a||!p)return;const warning=assetProjectWarningV191(a,p);if(warning&&!confirm(`${warning}\n\n그래도 적용하시겠습니까?`))return;a.usageProjects=a.usageProjects||[];if(!a.usageProjects.includes(p.name))a.usageProjects.push(p.name);addActivity18(projectId,'Asset',`자산 적용 · ${a.name}`);saveData();renderWorkspace18();toast('프로젝트에 자산을 적용했습니다.');};
removeAssetWorkspace18=function(assetId,projectId){const a=assetById(assetId),p=data.projects.find(x=>x.id===projectId);if(!a||!p)return;if(a.project===p.name)return toast('프로젝트 원본 자산은 연결 해제할 수 없습니다. Registry에서 상태를 관리하세요.');if(!confirm(`${p.name}에서 ${a.name} 연결만 해제합니다.\n원본 자산은 삭제되지 않습니다.`))return;a.usageProjects=(a.usageProjects||[]).filter(n=>n!==p.name);if(a.aiSelected&&a.aiProjectId===p.id)a.aiSelected=false;addActivity18(projectId,'Asset',`자산 연결 해제 · ${a.name}`);saveData();renderWorkspace18();toast('프로젝트 연결을 해제했습니다.');};
renderWorkspaceAssets18=function(box,p,w,assets){const rec=typeof recommendedAssetsV17==='function'?recommendedAssetsV17(p.id).filter(x=>!(x.a.usageProjects||[]).includes(p.name)).slice(0,8):[];box.innerHTML=`<div class="workspace-assets-layout-v18"><section class="panel"><div class="panel-head"><div><span class="eyebrow">Applied Assets</span><h3>현재 프로젝트 자산</h3></div><button onclick="go('assets')">Registry</button></div>${assets.map(a=>{const own=a.project===p.name;return `<div class="workspace-applied-asset-v18"><button onclick="openAssetDetailV16('${a.id}')"><strong>${esc(a.name)}</strong><small>${esc(a.type)} · v${esc(a.version)} · 품질 ${avgQualityV17(a)}%</small><span class="asset-origin-v191">원본: ${esc(a.project||'공통')} · ${own?'프로젝트 원본':'적용 연결'}</span></button><button class="${own?'locked-v191':'danger-v191'}" ${own?'disabled':''} onclick="removeAssetWorkspace18('${a.id}','${p.id}')">${own?'원본':'해제'}</button></div>`}).join('')||emptyLine('적용된 자산이 없습니다.')}</section><section class="panel"><div class="panel-head"><div><span class="eyebrow">Quick Apply</span><h3>추천 자산</h3></div><small>${rec.length} candidates</small></div>${rec.map(x=>`<div class="workspace-applied-asset-v18"><button onclick="openAssetDetailV16('${x.a.id}')"><strong>${esc(x.a.name)}</strong><small>${esc(x.reasons.join(' · '))}</small><span class="asset-origin-v191">원본: ${esc(x.a.project||'공통')}</span></button><button class="apply" onclick="applyAssetWorkspace18('${x.a.id}','${p.id}')">적용</button></div>`).join('')||emptyLine('추천할 새 자산이 없습니다.')}</section></div>`;};

renderRoadmap=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Timeline</span><h1>Roadmap</h1><p>프로젝트 운영, 제작 경험, 회사형 Work Mode를 단계적으로 완성합니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>기준 UI와 프로젝트 운영 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset·Pack 기반 프로젝트 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report와 개발 결과 회수</p></div><div class="roadmap-row"><strong>v1.4 · Digital Asset Operations</strong><p>아이디어에서 자산까지의 흐름</p></div><div class="roadmap-row"><strong>v1.5 · Digital Asset Registry</strong><p>Master·Version·Related Asset</p></div><div class="roadmap-row"><strong>v1.6 · Asset Workspace</strong><p>실제 파일 연결과 프로젝트 적용</p></div><div class="roadmap-row"><strong>v1.7 · Asset Intelligence</strong><p>추천·재사용·AI Collaboration Preview</p></div><div class="roadmap-row"><strong>v1.8 · Project Workspace</strong><p>Tasks·Notes·Files·Assets·AI·Activity</p></div><div class="roadmap-row"><strong>v1.9 · Experience & Patch Engine</strong><p>오답노트와 프로젝트 패치 회수</p></div><div class="roadmap-row current-roadmap"><strong>v1.9.1 · Work Mode & Usability — 현재</strong><p>자산 연결 해제, 카드 고정·더보기, 평일 출퇴근·주말 휴무, 업무 공간 칙</p></div><div class="roadmap-row"><strong>v2.0 · Daily Operating Release</strong><p>실전 운영 안정화와 공식 Freeze</p></div></div>`;};
renderSystem=function(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Control center</span><h1>System</h1><p>회사형 Studio OS 운영 데이터와 프로젝트 자산을 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Local storage</h3><p>프로젝트·Experience·Work Log·Patch History는 LocalStorage, 연결 파일은 IndexedDB에 저장됩니다.</p><small>${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes metadata</small></div><div class="panel"><h3>Data backup</h3><p>JSON 백업에는 v1.9.1 운영 데이터가 포함됩니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v1.9.1 · Work Mode & Usability</p></div><div class="panel"><h3>Workspace Policy</h3><p>업무 프로젝트만 운영합니다. 개인 생활·단순 취미·일회성 정보는 기본 관리 대상에서 제외합니다.</p></div></div>`;$('#importFile').onchange=importData;};

document.title='Studio OS v1.9.1 · Work Mode & Usability';
const brandSmall191=document.querySelector('.brand small');if(brandSmall191)brandSmall191.textContent='Work Mode & Experience · v1.9.1';
buildNav();if(current==='home')renderHome();

// ===== Studio OS v2.0 · Work Operating System =====
(function ensureV20(){
  data.company=data.company||{
    name:'Studio OS', role:'Founder Studio', timezone:'Asia/Seoul',
    workdays:[1,2,3,4,5], startHour:'09:00', endHour:'18:00',
    holidays:[], operatingPolicy:'Business Only'
  };
  data.workMode=data.workMode||{status:'Off',clockIn:null,clockOut:null,logs:[],events:[],workdays:[1,2,3,4,5],holidayMode:true};
  data.workMode.events=data.workMode.events||[];
  data.workMode.logs=data.workMode.logs||[];
  data.dailyReports=data.dailyReports||[];
  const rules=[
    {id:'C-WORK-003',title:'회사형 Work Operating System',chapter:'Operations',status:'Approved',content:'Studio OS는 출근, 오늘 업무, 프로젝트 실행, 산출물 기록, 퇴근 보고의 일일 업무 흐름을 기본 운영 구조로 사용한다.',scope:'Studio OS 전체',projects:['Studio OS'],related:['C-WORK-001','C-WORK-002'],note:'v2.0 Work OS 공식 기준',favorite:true,updated:'2026-08-04'},
    {id:'C-WORK-004',title:'업무 로그와 프로젝트 이력 분리',chapter:'Operations',status:'Approved',content:'Work Log는 사람과 AI의 일일 업무 활동을 기록하고, Project History는 프로젝트 자체의 변경과 버전 이력을 기록한다.',scope:'Studio OS 운영',projects:['Studio OS'],related:['C-WORK-003','C-PJT-001'],note:'업무와 프로젝트 기록의 목적 분리',favorite:false,updated:'2026-08-04'},
    {id:'C-WORK-005',title:'업무 시간 외 선택 근무 원칙',chapter:'Operations',status:'Approved',content:'주말과 휴일은 기본 휴무로 처리한다. 업무가 필요한 경우 선택 근무로 명시적으로 출근하며 일반 평일 근무와 구분해 기록한다.',scope:'Studio OS 운영',projects:['Studio OS'],related:['C-WORK-002'],note:'휴일 기본 휴무',favorite:false,updated:'2026-08-04'}
  ];
  rules.forEach(r=>upsertV19(data.constitution,r));
  saveData();
})();

function v20DateKey(d=new Date()){return d.toISOString().slice(0,10)}
function v20FormatTime(v){if(!v)return '-';return new Date(v).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'});}
function v20Duration(mins){mins=Math.max(0,Math.floor(mins||0));const h=Math.floor(mins/60),m=mins%60;return h?`${h}h ${String(m).padStart(2,'0')}m`:`${m}m`;}
function v20IsHoliday(){const d=new Date(),key=v20DateKey(d);return !data.company.workdays.includes(d.getDay())||data.company.holidays.includes(key);}
function v20WorkingMinutes(){if(data.workMode.status!=='Working'||!data.workMode.clockIn)return 0;return Math.floor((Date.now()-new Date(data.workMode.clockIn).getTime())/60000);}
function v20LogEvent(type,title,project='Studio OS'){
  data.workMode.events.unshift({id:uid('WE'),date:new Date().toISOString(),type,title,project});
  data.workMode.events=data.workMode.events.slice(0,500);
}
function clockInV20(){
  if(data.workMode.status==='Working')return toast('이미 근무 중입니다.');
  data.workMode.status='Working';data.workMode.clockIn=new Date().toISOString();data.workMode.clockOut=null;
  data.workMode.optional=v20IsHoliday();v20LogEvent('Attendance',data.workMode.optional?'선택 근무 출근':'출근','Studio OS');
  saveData();renderHomeV20();toast(data.workMode.optional?'선택 근무를 시작했습니다.':'출근 처리했습니다.');
}
function v20TodayWorkspaceStats(){
  const key=v20DateKey();let completed=0,activity=0,notes=0,files=0,assets=0;
  Object.values(data.workspaces||{}).forEach(w=>{
    completed+=(w.tasks||[]).filter(t=>t.done&&(t.completedAt||t.createdAt||'').toString().startsWith(key)).length;
    activity+=(w.activity||[]).filter(a=>String(a.date||'').includes(key)||String(a.createdAt||'').startsWith(key)).length;
    notes+=(w.notes||[]).filter(n=>String(n.createdAt||'').startsWith(key)).length;
    files+=(w.files||[]).filter(n=>String(n.createdAt||'').startsWith(key)).length;
  });
  assets=(data.digitalAssets||[]).filter(a=>String(a.updated||a.createdAt||'').startsWith(key)).length;
  return {completed,activity,notes,files,assets};
}
function clockOutV20(){
  if(data.workMode.status!=='Working')return toast('현재 근무 중이 아닙니다.');
  const now=new Date(),start=new Date(data.workMode.clockIn||now),mins=Math.max(0,Math.round((now-start)/60000));
  const s=v20TodayWorkspaceStats();
  const report={id:uid('DR'),date:v20DateKey(now),clockIn:data.workMode.clockIn,clockOut:now.toISOString(),minutes:mins,optional:!!data.workMode.optional,...s,summary:`완료 ${s.completed}건 · 활동 ${s.activity}건 · 자산 ${s.assets}건`};
  data.dailyReports.unshift(report);data.dailyReports=data.dailyReports.slice(0,120);
  data.workMode.logs.unshift({...report,id:uid('WL')});data.workMode.logs=data.workMode.logs.slice(0,120);
  v20LogEvent('Attendance','퇴근 및 Daily Report 생성','Studio OS');
  data.workMode.status='Off';data.workMode.clockOut=now.toISOString();data.workMode.optional=false;
  data.memories.unshift({id:uid('m'),title:`Daily Work Report · ${report.date}`,detail:`${v20Duration(mins)} · ${report.summary}`,type:'Work Log',date:'방금'});
  saveData();renderHomeV20();openDailyReportV20(report.id);toast('퇴근 처리하고 Daily Report를 생성했습니다.');
}
function openDailyReportV20(id){
  const r=data.dailyReports.find(x=>x.id===id);if(!r)return;
  openModal(`Daily Report · ${r.date}`,`<div class="daily-report-v20"><div class="report-time-v20"><div><small>출근</small><strong>${v20FormatTime(r.clockIn)}</strong></div><div><small>퇴근</small><strong>${v20FormatTime(r.clockOut)}</strong></div><div><small>근무</small><strong>${v20Duration(r.minutes)}</strong></div><div><small>구분</small><strong>${r.optional?'선택 근무':'정규 근무'}</strong></div></div><div class="report-metrics-v20"><div><small>완료 업무</small><strong>${r.completed}</strong></div><div><small>프로젝트 활동</small><strong>${r.activity}</strong></div><div><small>메모</small><strong>${r.notes}</strong></div><div><small>파일</small><strong>${r.files}</strong></div><div><small>자산</small><strong>${r.assets}</strong></div></div><p>${esc(r.summary)}</p></div>`,()=>closeModal());
}
function projectStatusV20(p){const s=(p.status||'').toLowerCase();if(s==='active')return ['Active','active'];if(s==='review')return ['Review','review'];if(s==='maintenance')return ['Maintenance','maintenance'];if(s==='paused')return ['Paused','paused'];return [p.status||'Planning','planning'];}
function renderHomeV20(){
  const now=new Date(),holiday=v20IsHoliday(),working=data.workMode.status==='Working',mins=v20WorkingMinutes();
  const date=now.toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric',weekday:'long'});
  const open=data.tasks.filter(t=>!t.done),active=data.projects.filter(p=>['Active','Review','Maintenance'].includes(p.status));
  const stats=v20TodayWorkspaceStats(),recentEvents=(data.workMode.events||[]).slice(0,5),suggestions=aiInsights().suggestions.slice(0,3);
  $('#content').innerHTML=`
  <section class="work-hero-v20 ${working?'is-working':holiday?'is-holiday':'is-off'}">
    <div class="work-hero-main-v20"><span class="eyebrow">WORK OPERATING SYSTEM</span><h1>${working?'근무 중입니다.':holiday?'오늘은 휴무입니다.':'업무를 시작할 준비가 됐습니다.'}</h1><p>${date} · ${holiday&&!working?'주말·휴일 기본 휴무':working?`${data.workMode.optional?'선택 근무':'정규 근무'} · 출근 ${v20FormatTime(data.workMode.clockIn)}`:`기준 근무시간 ${data.company.startHour}–${data.company.endHour}`}</p><div class="attendance-actions-v20">${working?`<button class="primary-v20" onclick="clockOutV20()">퇴근 정리</button><button onclick="go('worklog')">Work Log</button>`:`<button class="primary-v20" onclick="clockInV20()">${holiday?'선택 근무 시작':'출근하기'}</button><button onclick="go('tasks')">오늘 업무 확인</button>`}</div></div>
    <div class="attendance-clock-v20"><small>${working?'WORKING TIME':holiday?'DAY OFF':'OFFLINE'}</small><strong id="workElapsedV20">${working?v20Duration(mins):'--:--'}</strong><span class="live-dot-v20 ${working?'on':''}"></span></div>
    <div class="staff-status-v20"><div><span class="avatar-v20">대</span><p><strong>대표</strong><small>${working?'Online · 근무 중':'Offline'}</small></p></div><div><span class="avatar-v20 ai">AI</span><p><strong>GPT</strong><small>${working?'Available · 협업 가능':'Standby'}</small></p></div></div>
  </section>
  <section class="today-command-v20 panel"><div class="panel-head"><div><span class="eyebrow">TODAY COMMAND</span><h3>오늘의 업무 관제</h3></div><button onclick="go('workspace')">Workspace 열기</button></div><div class="command-metrics-v20"><div><small>미완료 업무</small><strong>${open.length}</strong><span>Open tasks</span></div><div><small>진행 프로젝트</small><strong>${active.length}</strong><span>Operating</span></div><div><small>오늘 완료</small><strong>${stats.completed}</strong><span>Completed</span></div><div><small>오늘 활동</small><strong>${stats.activity}</strong><span>Tracked</span></div></div></section>
  <div class="operations-grid-v20">
    <section class="panel priority-board-v20"><div class="panel-head"><div><span class="eyebrow">PRIORITY</span><h3>오늘 우선 업무</h3></div><button onclick="go('tasks')">전체 보기</button></div>${open.slice(0,4).map((t,i)=>`<button class="priority-row-v20" onclick="go('tasks')"><b>${String(i+1).padStart(2,'0')}</b><span><strong>${esc(t.title)}</strong><small>${esc(t.timing)} · ${esc(t.status)}</small></span></button>`).join('')||emptyLine('오늘 미완료 업무가 없습니다.')}</section>
    <section class="panel project-board-v20"><div class="panel-head"><div><span class="eyebrow">PROJECT PORTFOLIO</span><h3>운영 프로젝트</h3></div><button onclick="go('projects')">전체 보기</button></div>${active.slice(0,5).map(p=>{const st=projectStatusV20(p);return `<button class="project-row-v20" onclick="openProject('${p.id}')"><span class="project-state-v20 ${st[1]}"></span><div><strong>${esc(p.name)}</strong><small>${esc(p.current)} → ${esc(p.next)}</small></div><em>${st[0]}</em><b>${p.progress}%</b></button>`}).join('')||emptyLine('운영 중인 프로젝트가 없습니다.')}</section>
  </div>
  <section class="panel ai-command-v20"><div class="panel-head"><div><span class="eyebrow">AI COLLABORATION</span><h3>GPT 운영 제안</h3></div><button onclick="go('development')">AI Discussion</button></div><div class="ai-command-grid-v20">${suggestions.map(x=>`<button onclick="${x.action}"><small>${esc(x.title)}</small><strong>${esc(x.text)}</strong><span>${esc(x.detail)}</span><i>더보기</i></button>`).join('')||emptyLine('현재 제안이 없습니다.')}</div></section>
  <section class="panel activity-board-v20"><div class="panel-head"><div><span class="eyebrow">LIVE WORK LOG</span><h3>최근 업무 활동</h3></div><button onclick="go('worklog')">Work Log 전체</button></div><div class="activity-timeline-v20">${recentEvents.map(e=>`<div><time>${v20FormatTime(e.date)}</time><span class="event-dot-v20"></span><p><strong>${esc(e.title)}</strong><small>${esc(e.project)} · ${esc(e.type)}</small></p></div>`).join('')||emptyLine('아직 오늘 기록된 업무 활동이 없습니다.')}</div></section>`;
  if(window._v20Timer)clearInterval(window._v20Timer);
  window._v20Timer=setInterval(()=>{const el=$('#workElapsedV20');if(el&&data.workMode.status==='Working')el.textContent=v20Duration(v20WorkingMinutes());},30000);
}

function renderWorkLogV20(){
  const logs=data.dailyReports||[],events=data.workMode.events||[];
  const totalMins=logs.reduce((s,x)=>s+(x.minutes||0),0),thisMonth=new Date().toISOString().slice(0,7);
  const monthLogs=logs.filter(x=>x.date.startsWith(thisMonth));
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">COMPANY OPERATIONS</span><h1>Work Log</h1><p>출퇴근, 일일 보고와 업무 활동을 프로젝트 이력과 분리해 관리합니다.</p></div><div class="worklog-kpis-v20"><div><small>누적 근무</small><strong>${v20Duration(totalMins)}</strong></div><div><small>이번 달 근무일</small><strong>${monthLogs.length}</strong></div><div><small>Daily Reports</small><strong>${logs.length}</strong></div><div><small>업무 이벤트</small><strong>${events.length}</strong></div></div><div class="worklog-layout-v20"><section class="panel"><div class="panel-head"><div><span class="eyebrow">DAILY REPORTS</span><h3>근무 기록</h3></div></div><div class="daily-report-list-v20">${logs.map(r=>`<button onclick="openDailyReportV20('${r.id}')"><time>${esc(r.date)}</time><span>${v20FormatTime(r.clockIn)}–${v20FormatTime(r.clockOut)}</span><strong>${v20Duration(r.minutes)}</strong><em>${r.optional?'선택 근무':'정규 근무'}</em></button>`).join('')||emptyLine('퇴근 후 Daily Report가 생성됩니다.')}</div></section><section class="panel"><div class="panel-head"><div><span class="eyebrow">ACTIVITY STREAM</span><h3>업무 이벤트</h3></div></div><div class="activity-stream-v20">${events.slice(0,80).map(e=>`<div><time>${new Date(e.date).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time><span></span><p><strong>${esc(e.title)}</strong><small>${esc(e.project)} · ${esc(e.type)}</small></p></div>`).join('')||emptyLine('업무 활동이 아직 없습니다.')}</div></section></div>`;
}

function renderRoadmapV20(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">EVOLUTION</span><h1>Roadmap</h1><p>프로젝트 관리에서 회사형 Work Operating System으로 진화한 과정입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0 · Foundation</strong><p>공식 UI와 프로젝트 구조</p></div><div class="roadmap-row"><strong>v1.1 · Knowledge & Constitution</strong><p>규칙과 의사결정 관리</p></div><div class="roadmap-row"><strong>v1.2 · Constitution Engine</strong><p>Preset·Pack 기반 프로젝트 구성</p></div><div class="roadmap-row"><strong>v1.3 · AI Development Handoff</strong><p>AI Report와 제작 결과 회수</p></div><div class="roadmap-row"><strong>v1.4–1.6 · Digital Asset Operations</strong><p>자산 등록·연결·활용</p></div><div class="roadmap-row"><strong>v1.7 · Asset Intelligence</strong><p>추천·재사용·AI Collaboration</p></div><div class="roadmap-row"><strong>v1.8 · Project Workspace</strong><p>Tasks·Notes·Files·Assets·AI·Activity</p></div><div class="roadmap-row"><strong>v1.9 · Experience & Patch Engine</strong><p>오답노트와 프로젝트 패치 회수</p></div><div class="roadmap-row current-roadmap"><strong>v2.0 · Work Operating System — 현재</strong><p>출근 → 업무 → 프로젝트 실행 → 퇴근 보고의 회사형 일일 운영체계</p></div></div>`;}
function renderSystemV20(){
  const c=data.company;
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">CONTROL CENTER</span><h1>System</h1><p>Studio의 근무 기준과 운영 데이터를 관리합니다.</p></div><div class="system-grid"><div class="panel"><h3>Company Profile</h3><p>${esc(c.name)} · ${esc(c.role)}</p><small>Business-only workspace</small></div><div class="panel"><h3>Working Hours</h3><div class="form-grid"><label>출근 기준<input id="v20Start" type="time" value="${c.startHour}"></label><label>퇴근 기준<input id="v20End" type="time" value="${c.endHour}"></label></div><button class="tab" onclick="saveWorkHoursV20()">근무시간 저장</button></div><div class="panel"><h3>Data Backup</h3><p>프로젝트·Experience·Patch·Work Log를 JSON으로 백업합니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile').click()">불러오기</button><input id="importFile" type="file" accept="application/json" hidden></div></div><div class="panel"><h3>Version</h3><p>Studio OS v2.0 · Work Operating System</p><small>Manage Projects. Build Assets. Operate Like a Studio.</small></div><div class="panel"><h3>Workspace Policy</h3><p>업무 프로젝트, 디지털 제작, 사업화 활동만 운영합니다. 개인 생활·단순 취미·일회성 정보는 기본 대상에서 제외합니다.</p></div><div class="panel"><h3>Storage</h3><p>Metadata ${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes</p><small>LocalStorage + IndexedDB</small></div></div>`;
  $('#importFile').onchange=importData;
}
function saveWorkHoursV20(){data.company.startHour=$('#v20Start').value;data.company.endHour=$('#v20End').value;saveData();toast('기준 근무시간을 저장했습니다.');}

// Track key work actions without changing existing project data behavior.
const _v20SaveData=saveData;
saveData=function(next=data){_v20SaveData(next);};
const _v20ToggleTask=toggleTask;
toggleTask=function(id){const before=data.tasks.find(x=>x.id===id)?.done;_v20ToggleTask(id);const t=data.tasks.find(x=>x.id===id);if(t&&!before&&t.done){t.completedAt=new Date().toISOString();v20LogEvent('Task',`업무 완료 · ${t.title}`,'Studio OS');_v20SaveData(data);}};

// Navigation is rebuilt for a company-style operating flow.
if(!navItems.some(x=>x.id==='worklog'))navItems.splice(1,0,{id:'worklog',label:'Work Log',ico:'◷'});
pages.worklog=renderWorkLogV20;pages.home=renderHomeV20;pages.roadmap=renderRoadmapV20;pages.system=renderSystemV20;
buildNav=function(){
  const badge={tasks:data.tasks.filter(t=>!t.done).length,projects:data.projects.length,brain:data.ideas.length,assets:data.digitalAssets.length,experience:data.experiences?.length||0,worklog:data.dailyReports?.length||0};
  const groups=[
    ['OPERATIONS',['home','worklog','tasks','projects','workspace']],
    ['PRODUCTION',['brain','development','assets','experience','knowledge']],
    ['CONTROL',['memory','roadmap','system']]
  ];
  $('#nav').innerHTML=groups.map(([label,ids])=>`<div class="nav-group"><div class="nav-label">${label}</div>${ids.map(id=>{const n=navItems.find(x=>x.id===id);if(!n)return '';return `<button class="nav-item ${id===current?'active':''}" data-page="${id}"><span class="ico">${n.ico}</span><span>${n.label}</span>${badge[id]?`<span class="badge">${badge[id]}</span>`:''}</button>`}).join('')}</div>`).join('');
  $$('.nav-item').forEach(b=>b.onclick=()=>go(b.dataset.page));
};

document.title='Studio OS v2.0 · Work Operating System';
const brandSmall20=document.querySelector('.brand small');if(brandSmall20)brandSmall20.textContent='Work Operating System · v2.0';
const systemChip20=document.querySelector('.system-chip div');if(systemChip20)systemChip20.innerHTML='<strong>Studio ready</strong><small>Projects · Assets · Work Log</small>';
const profile20=document.querySelector('.profile');if(profile20)profile20.innerHTML='<span>대표</span><small>Founder · Offline</small>';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV20();

// ===== Studio OS v2.1 · Project Operations =====
(function ensureV21(){
  data.ideasTrash=data.ideasTrash||[];
  data.manualWorkLogs=data.manualWorkLogs||[];
  data.aiClosingDrafts=data.aiClosingDrafts||[];
  data.sprints=data.sprints||[{id:'SPR-001',name:'Studio Sprint 01',start:v21ISO(new Date()),end:v21ISO(new Date(Date.now()+6*86400000)),goal:'Studio OS v2.1 운영 검증',status:'Active'}];
  data.scheduleSettings=data.scheduleSettings||{selectedDate:v21ISO(new Date()),view:'month',month:v21ISO(new Date()).slice(0,7)};
  const defaultProject=data.projects[0]?.id||'';
  (data.tasks||[]).forEach((t,i)=>{
    t.projectId=t.projectId||defaultProject;
    t.startDate=t.startDate||v21ISO(new Date(Date.now()+(t.bucket==='next'?3:0)*86400000));
    t.dueDate=t.dueDate||t.startDate;
    t.priority=t.priority||(['Critical','High','Medium','Low'][Math.min(i,3)]||'Medium');
    t.progress=Number.isFinite(Number(t.progress))?Number(t.progress):(t.done?100:0);
    t.workflow=t.workflow||(t.done?'Done':'Ready');
    t.estimate=t.estimate||60;
  });
  const rules=[
    {id:'C-OPS-001',title:'Task 프로젝트 귀속 원칙',chapter:'Operations',status:'Approved',content:'모든 업무 Task는 반드시 하나의 프로젝트에 귀속하고 시작일, 마감일, 우선순위, 상태, 진행률을 관리한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-WORK-003'],note:'v2.1 Project Operations',favorite:true,updated:'2026-08-05'},
    {id:'C-OPS-002',title:'캘린더 기반 공정관리 원칙',chapter:'Operations',status:'Approved',content:'단순 오늘·다음 분류 대신 월간 캘린더, D-Day, Sprint, Gantt를 사용해 프로젝트 일정을 운영한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-OPS-001'],note:'일정 기반 운영',favorite:true,updated:'2026-08-05'},
    {id:'C-IDEA-002',title:'아이디어 생애주기 관리 원칙',chapter:'Knowledge',status:'Approved',content:'아이디어는 Captured, Discussing, Confirmed, Archived, Trash 상태로 관리하며 프로젝트 승격 또는 Experience 전환 이력을 보존한다.',scope:'Ideas',projects:['Studio OS'],related:['C-WORK-001'],note:'삭제보다 생애주기 관리 우선',favorite:false,updated:'2026-08-05'},
    {id:'C-NAV-001',title:'브라우저 History 기반 탐색 원칙',chapter:'UI',status:'Approved',content:'페이지와 상세 화면 이동은 브라우저 History에 기록하여 버튼과 트랙패드 앞·뒤 이동이 같은 탐색 스택을 사용하도록 한다.',scope:'Studio OS UI',projects:['Studio OS'],related:['C-UI-001'],note:'Mac trackpad navigation',favorite:false,updated:'2026-08-05'},
    {id:'C-WORK-006',title:'3주체 Work Log 원칙',chapter:'Operations',status:'Approved',content:'OS는 활동을 자동 기록하고, 대표는 업무·회고·내일 계획을 작성하며, GPT용 Daily Closing Brief는 당일 기록에서 생성한다.',scope:'Work Log',projects:['Studio OS'],related:['C-WORK-004'],note:'OS·대표·GPT 역할 분담',favorite:true,updated:'2026-08-05'}
  ];
  rules.forEach(r=>upsertV19(data.constitution,r));
  saveData();
})();

function v21ISO(d){return new Date(d).toISOString().slice(0,10)}
function v21Project(id){return data.projects.find(p=>p.id===id)}
function v21PriorityRank(v){return ({Critical:0,High:1,Medium:2,Low:3})[v]??9}
function v21DayDiff(a,b){return Math.ceil((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/86400000)}
function v21TaskProjectName(t){return v21Project(t.projectId)?.name||'미분류'}
function v21AllTasks(){
  const globals=(data.tasks||[]).map(t=>({...t,source:'global'}));
  const workspaces=Object.entries(data.workspaces||{}).flatMap(([projectId,w])=>(w.tasks||[]).map(t=>({
    ...t,id:`WS:${projectId}:${t.id}`,rawId:t.id,projectId,source:'workspace',
    startDate:t.startDate||t.createdAt||v21ISO(new Date()),dueDate:t.dueDate||t.startDate||t.createdAt||v21ISO(new Date()),
    priority:t.priority||'Medium',progress:Number(t.progress??(t.done?100:0)),workflow:t.workflow||(t.done?'Done':'Ready'),estimate:t.estimate||60
  })));
  return [...globals,...workspaces];
}
function v21SaveTask(task){
  if(task.source==='workspace'){
    const w=data.workspaces[task.projectId],raw=(w?.tasks||[]).find(x=>x.id===task.rawId);if(raw)Object.assign(raw,task);
  }else{
    const raw=data.tasks.find(x=>x.id===task.id);if(raw)Object.assign(raw,task);
  }
  saveData();
}

// --- Ideas lifecycle ---
let v21IdeaFilter='Active';
function renderIdeasV21(){
  const q=(data.ideaSearch||'').toLowerCase();
  const source=v21IdeaFilter==='Trash'?data.ideasTrash:data.ideas;
  const list=source.filter(i=>{
    if(v21IdeaFilter==='Archived'&&i.stage!=='Archived')return false;
    if(v21IdeaFilter==='Active'&&i.stage==='Archived')return false;
    return !q||`${i.text} ${i.project||''} ${(i.tags||[]).join(' ')}`.toLowerCase().includes(q);
  });
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">IDEA LIFECYCLE</span><h1>Ideas</h1><p>생각을 기록하고, 프로젝트·Experience·Archive로 연결합니다.</p></div><button class="primary-btn compact" onclick="openIdeaV21()">+ 아이디어 등록</button></div>
  <div class="idea-toolbar-v21"><div class="segmented-v21">${['Active','Archived','Trash'].map(x=>`<button class="${v21IdeaFilter===x?'active':''}" onclick="v21IdeaFilter='${x}';renderIdeasV21()">${x}</button>`).join('')}</div><input placeholder="아이디어·프로젝트·태그 검색" value="${esc(data.ideaSearch||'')}" oninput="data.ideaSearch=this.value;saveData();renderIdeasV21()"></div>
  <div class="idea-stats-v21"><div><small>Active</small><strong>${data.ideas.filter(x=>x.stage!=='Archived').length}</strong></div><div><small>Archived</small><strong>${data.ideas.filter(x=>x.stage==='Archived').length}</strong></div><div><small>Trash</small><strong>${data.ideasTrash.length}</strong></div><div><small>Projects</small><strong>${new Set(data.ideas.map(x=>x.project).filter(Boolean)).size}</strong></div></div>
  <div class="idea-grid-v21">${list.map(i=>ideaCardV21(i,v21IdeaFilter==='Trash')).join('')||emptyLine('조건에 맞는 아이디어가 없습니다.')}</div>`;
}
function ideaCardV21(i,trash=false){
  const text=esc(i.text),tags=(i.tags||[]).map(x=>`<span>${esc(x)}</span>`).join('');
  return `<article class="idea-card-v21"><div class="idea-card-head-v21"><span class="status">${esc(i.category||'Idea')}</span><button onclick="openIdeaMoreV21('${i.id}',${trash})">•••</button></div><h3 title="${text}">${text}</h3><p>${esc(i.project||'미분류')} · ${esc(i.stage||'Captured')} · ${esc(i.date||'오늘')}</p><div class="idea-tags-v21">${tags}</div><div class="idea-actions-v21">${trash?`<button onclick="restoreIdeaV21('${i.id}')">복원</button><button class="danger" onclick="purgeIdeaV21('${i.id}')">완전 삭제</button>`:`<button onclick="openIdeaV21('${i.id}')">편집</button><button onclick="promoteIdeaV21('${i.id}')">프로젝트 승격</button><button onclick="archiveIdeaV21('${i.id}')">${i.stage==='Archived'?'활성화':'보관'}</button>`}</div></article>`;
}
function openIdeaV21(id=''){
  const i=data.ideas.find(x=>x.id===id)||{text:'',project:'',category:'Idea',stage:'Captured',tags:[],date:'오늘'};
  openModal(id?'아이디어 편집':'아이디어 등록',`<label>아이디어<textarea id="ideaText21" rows="5">${esc(i.text)}</textarea></label><div class="form-grid"><label>프로젝트<select id="ideaProject21"><option value="">미분류</option>${data.projects.map(p=>`<option ${i.project===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><label>분류<select id="ideaCategory21">${['Idea','Feature','Problem','Direction','Conversation'].map(x=>`<option ${i.category===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="form-grid"><label>상태<select id="ideaStage21">${['Captured','Discussing','Confirmed','Archived'].map(x=>`<option ${i.stage===x?'selected':''}>${x}</option>`).join('')}</select></label><label>태그<input id="ideaTags21" value="${esc((i.tags||[]).join(', '))}" placeholder="UI, Flutter, Revenue"></label></div>`,()=>{
    const text=$('#ideaText21').value.trim();if(!text)return toast('아이디어를 입력하세요.');
    const obj={id:id||uid('b'),text,project:$('#ideaProject21').value,category:$('#ideaCategory21').value,stage:$('#ideaStage21').value,tags:$('#ideaTags21').value.split(',').map(x=>x.trim()).filter(Boolean),date:id?i.date:'오늘',updatedAt:new Date().toISOString()};
    if(id)Object.assign(i,obj);else data.ideas.unshift(obj);saveData();closeModal();renderIdeasV21();toast('아이디어를 저장했습니다.');
  });
}
function openIdeaMoreV21(id,trash){
  if(trash)return;
  openModal('아이디어 작업',`<div class="modal-action-list-v21"><button onclick="closeModal();openIdeaV21('${id}')">수정</button><button onclick="closeModal();promoteIdeaV21('${id}')">프로젝트로 승격</button><button onclick="closeModal();ideaToFailureV21('${id}')">Experience로 이동</button><button onclick="closeModal();archiveIdeaV21('${id}')">Archive 전환</button><button class="danger" onclick="closeModal();trashIdeaV21('${id}')">휴지통으로 이동</button></div>`,()=>closeModal());
}
function archiveIdeaV21(id){const i=data.ideas.find(x=>x.id===id);if(!i)return;i.stage=i.stage==='Archived'?'Captured':'Archived';saveData();renderIdeasV21();toast(i.stage==='Archived'?'Archive로 이동했습니다.':'활성 아이디어로 복원했습니다.');}
function trashIdeaV21(id){const ix=data.ideas.findIndex(x=>x.id===id);if(ix<0)return;const [i]=data.ideas.splice(ix,1);i.trashedAt=new Date().toISOString();data.ideasTrash.unshift(i);saveData();renderIdeasV21();toast('휴지통으로 이동했습니다.');}
function restoreIdeaV21(id){const ix=data.ideasTrash.findIndex(x=>x.id===id);if(ix<0)return;const [i]=data.ideasTrash.splice(ix,1);i.stage='Captured';delete i.trashedAt;data.ideas.unshift(i);saveData();renderIdeasV21();toast('아이디어를 복원했습니다.');}
function purgeIdeaV21(id){if(!confirm('완전히 삭제할까요? 복구할 수 없습니다.'))return;data.ideasTrash=data.ideasTrash.filter(x=>x.id!==id);saveData();renderIdeasV21();toast('완전히 삭제했습니다.');}
function promoteIdeaV21(id){const i=data.ideas.find(x=>x.id===id);if(!i)return;openModal('프로젝트로 승격',`<label>프로젝트명<input id="promoteName21" value="${esc(i.text.slice(0,40))}"></label><label>설명<textarea id="promoteDesc21">${esc(i.text)}</textarea></label><label>상위 분야<select id="promoteArea21"><option>App Development</option><option>Game Development</option><option>Music Production</option><option>Image & Design</option><option>Documents</option><option>AI Project</option><option>Digital Product</option></select></label>`,()=>{const name=$('#promoteName21').value.trim();if(!name)return toast('프로젝트명을 입력하세요.');const p={id:uid('p'),name,desc:$('#promoteDesc21').value.trim(),progress:0,status:'Planning',current:'Blueprint',next:'AI Report',area:$('#promoteArea21').value};data.projects.unshift(p);i.project=name;i.stage='Confirmed';saveData();closeModal();renderIdeasV21();toast('프로젝트로 승격했습니다.');});}
function ideaToFailureV21(id){const i=data.ideas.find(x=>x.id===id);if(!i)return;data.experiences=data.experiences||[];data.experiences.unshift({id:uid('EXP'),title:i.text,area:'Common',severity:'Medium',kind:'Lesson',project:i.project||'Common',problem:i.text,cause:'아이디어 검토 과정에서 Experience 전환',lesson:'다음 프로젝트 판단 기준으로 활용',prevention:'AI Report의 관련 Experience에 포함',status:'Active',createdAt:new Date().toISOString()});i.stage='Archived';saveData();renderIdeasV21();toast('Experience Lesson으로 전환했습니다.');}

// --- Browser history and trackpad navigation ---
let v21HistoryLock=false;
function v21PushState(state){if(v21HistoryLock)return;try{history.pushState(state,'',`#${state.page||'home'}${state.detail?'/'+state.detail:''}`);}catch(e){}}
const v21GoBase=go;
go=function(id,opts={}){v21GoBase(id);if(!opts.fromHistory)v21PushState({page:id});};
window.addEventListener('popstate',e=>{const s=e.state||{page:'home'};v21HistoryLock=true;try{if(s.page==='project'&&s.detail)openProject(s.detail,{fromHistory:true});else if(pages[s.page])v21GoBase(s.page);else v21GoBase('home');}finally{v21HistoryLock=false;}});
try{history.replaceState({page:current||'home'},'',`#${current||'home'}`);}catch(e){}
const v21OpenProjectBase=openProject;
openProject=function(id,opts={}){v21OpenProjectBase(id);if(!opts.fromHistory)v21PushState({page:'project',detail:id});};

// --- Project Operations / Calendar ---
let v21SelectedDate=data.scheduleSettings.selectedDate||v21ISO(new Date());
let v21Month=data.scheduleSettings.month||v21ISO(new Date()).slice(0,7);
let v21OpsTab='Calendar';
function v21MonthCells(month){const [y,m]=month.split('-').map(Number),first=new Date(y,m-1,1),last=new Date(y,m,0);const cells=[];for(let i=0;i<first.getDay();i++)cells.push(null);for(let d=1;d<=last.getDate();d++)cells.push(`${month}-${String(d).padStart(2,'0')}`);while(cells.length%7)cells.push(null);return cells;}
function renderTasksV21(){
  const all=v21AllTasks(),today=v21ISO(new Date()),open=all.filter(t=>!t.done&&t.workflow!=='Done'),overdue=open.filter(t=>t.dueDate<today),dueToday=open.filter(t=>t.dueDate===today),sprint=data.sprints.find(x=>x.status==='Active');
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">PROJECT OPERATIONS</span><h1>Schedule & Tasks</h1><p>캘린더, 공정 Task, Sprint, Gantt와 D-Day로 업무를 운영합니다.</p></div><button class="primary-btn compact" onclick="openTaskModalV21()">+ Task 추가</button></div>
  <div class="ops-kpis-v21"><div><small>Open</small><strong>${open.length}</strong></div><div><small>오늘 마감</small><strong>${dueToday.length}</strong></div><div><small>지연</small><strong>${overdue.length}</strong></div><div><small>Active Sprint</small><strong>${sprint?esc(sprint.name):'-'}</strong></div></div>
  <div class="ops-tabs-v21">${['Calendar','List','Gantt','Sprint'].map(x=>`<button class="${v21OpsTab===x?'active':''}" onclick="v21OpsTab='${x}';renderTasksV21()">${x}</button>`).join('')}</div><div id="opsBodyV21"></div>`;
  if(v21OpsTab==='Calendar')renderCalendarV21(all);if(v21OpsTab==='List')renderTaskListV21(all);if(v21OpsTab==='Gantt')renderGanttV21(all);if(v21OpsTab==='Sprint')renderSprintV21(all);
}
function renderCalendarV21(all){
  const cells=v21MonthCells(v21Month),selected=all.filter(t=>t.startDate<=v21SelectedDate&&t.dueDate>=v21SelectedDate).sort((a,b)=>v21PriorityRank(a.priority)-v21PriorityRank(b.priority));
  $('#opsBodyV21').innerHTML=`<div class="calendar-layout-v21"><section class="panel calendar-v21"><div class="calendar-head-v21"><button onclick="moveMonthV21(-1)">←</button><h3>${v21Month.replace('-','년 ')}월</h3><button onclick="moveMonthV21(1)">→</button></div><div class="weekdays-v21">${['일','월','화','수','목','금','토'].map(x=>`<b>${x}</b>`).join('')}</div><div class="month-grid-v21">${cells.map(day=>{if(!day)return '<div class="empty"></div>';const ts=all.filter(t=>t.startDate<=day&&t.dueDate>=day),isToday=day===v21ISO(new Date());return `<button class="day-v21 ${day===v21SelectedDate?'selected':''} ${isToday?'today':''}" onclick="selectDateV21('${day}')"><time>${Number(day.slice(-2))}</time><div>${ts.slice(0,3).map(t=>`<span class="p-${String(t.priority).toLowerCase()}">${esc(v21TaskProjectName(t))}</span>`).join('')}${ts.length>3?`<em>+${ts.length-3}</em>`:''}</div></button>`}).join('')}</div></section><aside class="panel day-agenda-v21"><div class="panel-head"><div><span class="eyebrow">DAY AGENDA</span><h3>${v21SelectedDate}</h3></div><button onclick="openTaskModalV21('${v21SelectedDate}')">+ 추가</button></div>${selected.map(taskRowV21).join('')||emptyLine('이 날짜에 계획된 Task가 없습니다.')}</aside></div>`;
}
function moveMonthV21(step){const [y,m]=v21Month.split('-').map(Number),d=new Date(y,m-1+step,1);v21Month=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;data.scheduleSettings.month=v21Month;saveData();renderTasksV21();}
function selectDateV21(day){v21SelectedDate=day;data.scheduleSettings.selectedDate=day;saveData();renderTasksV21();}
function taskRowV21(t){const dd=v21DayDiff(v21ISO(new Date()),t.dueDate);return `<button class="agenda-task-v21" onclick="openTaskEditorV21('${t.id}')"><span class="priority-dot-v21 ${String(t.priority).toLowerCase()}"></span><div><strong>${esc(t.title)}</strong><small>${esc(v21TaskProjectName(t))} · ${esc(t.workflow)} · ${t.progress}%</small></div><em>${dd===0?'D-Day':dd>0?'D-'+dd:'D+'+Math.abs(dd)}</em></button>`;}
function renderTaskListV21(all){const sorted=all.slice().sort((a,b)=>a.done-b.done||a.dueDate.localeCompare(b.dueDate)||v21PriorityRank(a.priority)-v21PriorityRank(b.priority));$('#opsBodyV21').innerHTML=`<section class="panel task-table-v21"><div class="task-table-head-v21"><span>Task</span><span>Project</span><span>기간</span><span>Priority</span><span>Status</span><span>Progress</span></div>${sorted.map(t=>`<button onclick="openTaskEditorV21('${t.id}')"><span><strong>${esc(t.title)}</strong><small>${t.estimate} min</small></span><span>${esc(v21TaskProjectName(t))}</span><span>${t.startDate.slice(5)} → ${t.dueDate.slice(5)}</span><span class="priority-text-v21 ${String(t.priority).toLowerCase()}">${esc(t.priority)}</span><span>${esc(t.workflow)}</span><span><i><b style="width:${t.progress}%"></b></i>${t.progress}%</span></button>`).join('')||emptyLine('Task가 없습니다.')}</section>`;}
function renderGanttV21(all){const monthStart=`${v21Month}-01`,[y,m]=v21Month.split('-').map(Number),days=new Date(y,m,0).getDate();const list=all.filter(t=>t.dueDate>=monthStart&&t.startDate<=`${v21Month}-${days}`).slice(0,30);$('#opsBodyV21').innerHTML=`<section class="panel gantt-v21"><div class="gantt-head-v21"><strong>Task / Project</strong><div>${Array.from({length:days},(_,i)=>`<span>${i+1}</span>`).join('')}</div></div>${list.map(t=>{const s=Math.max(1,Number(t.startDate.slice(-2))),e=Math.min(days,Number(t.dueDate.slice(-2)));return `<button onclick="openTaskEditorV21('${t.id}')"><label><strong>${esc(t.title)}</strong><small>${esc(v21TaskProjectName(t))}</small></label><div class="gantt-track-v21">${Array.from({length:days},(_,i)=>`<span></span>`).join('')}<i class="${String(t.priority).toLowerCase()}" style="left:${(s-1)/days*100}%;width:${Math.max(1,e-s+1)/days*100}%"><b style="width:${t.progress}%"></b></i></div></button>`}).join('')||emptyLine('이번 달 공정 Task가 없습니다.')}</section>`;}
function renderSprintV21(all){const s=data.sprints.find(x=>x.status==='Active'),tasks=s?all.filter(t=>t.startDate<=s.end&&t.dueDate>=s.start):[];const avg=tasks.length?Math.round(tasks.reduce((n,t)=>n+t.progress,0)/tasks.length):0;$('#opsBodyV21').innerHTML=`<div class="sprint-layout-v21"><section class="panel sprint-hero-v21"><span class="eyebrow">ACTIVE SPRINT</span><h2>${esc(s?.name||'Sprint 없음')}</h2><p>${esc(s?.goal||'새 Sprint를 생성하세요.')}</p><div class="sprint-progress-v21"><i><b style="width:${avg}%"></b></i><strong>${avg}%</strong></div><small>${s?`${s.start} → ${s.end}`:'-'}</small><button class="tab" onclick="openSprintModalV21()">Sprint 설정</button></section><section class="panel"><div class="panel-head"><h3>Sprint Tasks</h3><small>${tasks.length} tasks</small></div>${tasks.map(taskRowV21).join('')||emptyLine('Sprint 기간의 Task가 없습니다.')}</section></div>`;}
function openSprintModalV21(){const s=data.sprints.find(x=>x.status==='Active')||{};openModal('Sprint 설정',`<label>Sprint명<input id="spName21" value="${esc(s.name||'Studio Sprint')}"></label><label>목표<textarea id="spGoal21">${esc(s.goal||'')}</textarea></label><div class="form-grid"><label>시작<input id="spStart21" type="date" value="${s.start||v21ISO(new Date())}"></label><label>종료<input id="spEnd21" type="date" value="${s.end||v21ISO(new Date(Date.now()+6*86400000))}"></label></div>`,()=>{if(s.id)Object.assign(s,{name:$('#spName21').value,goal:$('#spGoal21').value,start:$('#spStart21').value,end:$('#spEnd21').value});else data.sprints.unshift({id:uid('SPR'),name:$('#spName21').value,goal:$('#spGoal21').value,start:$('#spStart21').value,end:$('#spEnd21').value,status:'Active'});saveData();closeModal();renderTasksV21();});}
function openTaskModalV21(date=v21SelectedDate){openTaskEditorV21('',date)}
function openTaskEditorV21(id='',date=v21ISO(new Date())){
  const all=v21AllTasks(),t=all.find(x=>x.id===id)||{title:'',projectId:data.projects[0]?.id||'',startDate:date,dueDate:date,priority:'Medium',workflow:'Ready',progress:0,estimate:60,source:'global'};
  openModal(id?'Task 편집':'Task 추가',`<label>Task명<input id="taskTitle21" value="${esc(t.title)}"></label><div class="form-grid"><label>프로젝트<select id="taskProject21">${data.projects.map(p=>`<option value="${p.id}" ${t.projectId===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><label>우선순위<select id="taskPriority21">${['Critical','High','Medium','Low'].map(x=>`<option ${t.priority===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="form-grid"><label>시작일<input id="taskStart21" type="date" value="${t.startDate}"></label><label>마감일<input id="taskDue21" type="date" value="${t.dueDate}"></label></div><div class="form-grid"><label>상태<select id="taskFlow21">${['Not Started','Ready','In Progress','Review','Blocked','Done','Archive'].map(x=>`<option ${t.workflow===x?'selected':''}>${x}</option>`).join('')}</select></label><label>예상시간(분)<input id="taskEstimate21" type="number" value="${t.estimate||60}"></label></div><label>진행률 <b id="progressVal21">${t.progress}%</b><input id="taskProgress21" type="range" min="0" max="100" value="${t.progress}" oninput="$('#progressVal21').textContent=this.value+'%'"></label>`,()=>{
    const title=$('#taskTitle21').value.trim();if(!title)return toast('Task명을 입력하세요.');const obj={...t,title,projectId:$('#taskProject21').value,startDate:$('#taskStart21').value,dueDate:$('#taskDue21').value,priority:$('#taskPriority21').value,workflow:$('#taskFlow21').value,progress:Number($('#taskProgress21').value),estimate:Number($('#taskEstimate21').value)||60,done:$('#taskFlow21').value==='Done',timing:`${$('#taskDue21').value} · ${$('#taskEstimate21').value}분`,status:$('#taskPriority21').value,bucket:'today'};
    if(id)v21SaveTask(obj);else{obj.id=uid('t');obj.createdAt=new Date().toISOString();data.tasks.unshift(obj);saveData();}
    v20LogEvent('Task',`${id?'Task 수정':'Task 생성'} · ${title}`,v21TaskProjectName(obj));closeModal();renderTasksV21();toast('Task를 저장했습니다.');
  });
}

// --- Work Log: OS + Founder + GPT Brief ---
function addFounderLogV21(){openModal('대표 업무일지',`<label>오늘 한 일<textarea id="founderWork21" rows="4"></textarea></label><label>결정·회고<textarea id="founderReflect21" rows="4"></textarea></label><label>내일 할 일<textarea id="founderTomorrow21" rows="3"></textarea></label><label>연결 프로젝트<select id="founderProject21"><option>Studio OS</option>${data.projects.map(p=>`<option>${esc(p.name)}</option>`).join('')}</select></label>`,()=>{data.manualWorkLogs.unshift({id:uid('MW'),date:new Date().toISOString(),work:$('#founderWork21').value.trim(),reflection:$('#founderReflect21').value.trim(),tomorrow:$('#founderTomorrow21').value.trim(),project:$('#founderProject21').value});v20LogEvent('Founder Log','대표 업무일지 작성',$('#founderProject21').value);saveData();closeModal();renderWorkLogV21();toast('대표 업무일지를 저장했습니다.');});}
function importAISessionV21(){openModal('AI Session Import',`<p class="modal-help-v21">오늘 GPT 대화의 요약 또는 AI Report 내용을 붙여 넣으면 Work Log에 연결합니다.</p><label>세션 제목<input id="aiSessionTitle21" value="GPT Collaboration"></label><label>대화 요약<textarea id="aiSessionText21" rows="10" placeholder="결정사항, 실패사례, 다음 작업..."></textarea></label><label>프로젝트<select id="aiSessionProject21"><option>Studio OS</option>${data.projects.map(p=>`<option>${esc(p.name)}</option>`).join('')}</select></label>`,()=>{const text=$('#aiSessionText21').value.trim();if(!text)return toast('요약을 입력하세요.');data.manualWorkLogs.unshift({id:uid('AIW'),date:new Date().toISOString(),work:$('#aiSessionTitle21').value,reflection:text,tomorrow:'',project:$('#aiSessionProject21').value,type:'AI Session'});v20LogEvent('AI Session','AI Session Import',$('#aiSessionProject21').value);saveData();closeModal();renderWorkLogV21();toast('AI 세션을 가져왔습니다.');});}
function generateClosingBriefV21(){
  const key=v21ISO(new Date()),events=(data.workMode.events||[]).filter(e=>String(e.date).startsWith(key)),manual=(data.manualWorkLogs||[]).filter(x=>String(x.date).startsWith(key)),tasks=v21AllTasks().filter(t=>t.done&&(String(t.completedAt||'').startsWith(key)||t.dueDate===key));
  const delayed=v21AllTasks().filter(t=>!t.done&&t.dueDate<key);
  const lines=[`# GPT Daily Closing Brief · ${key}`,'',`## 오늘 자동 기록 (${events.length})`,...events.slice().reverse().map(e=>`- ${v20FormatTime(e.date)} · ${e.project} · ${e.title}`),'',`## 대표 업무일지 (${manual.length})`,...manual.map(x=>`- [${x.project}] ${x.work}${x.reflection?'\n  - '+x.reflection.replace(/\n/g,'\n  - '):''}${x.tomorrow?'\n  - 내일: '+x.tomorrow:''}`),'',`## 완료 Task (${tasks.length})`,...tasks.map(t=>`- ${v21TaskProjectName(t)} · ${t.title}`),'',`## 지연 Task (${delayed.length})`,...delayed.slice(0,10).map(t=>`- ${v21TaskProjectName(t)} · ${t.title} · ${t.dueDate}`),'', '## GPT 요청','- 오늘의 핵심 성과와 결정사항을 요약하세요.','- Failure / Lesson / Constitution Candidate를 분리하세요.','- 내일 우선순위 3개를 추천하세요.'];
  const text=lines.join('\n');data.aiClosingDrafts.unshift({id:uid('AC'),date:new Date().toISOString(),text});saveData();openModal('GPT Daily Closing Brief',`<label>아래 내용을 GPT에 전달하세요<textarea id="closingBrief21" rows="18">${esc(text)}</textarea></label><div class="page-actions"><button class="tab" onclick="navigator.clipboard.writeText($('#closingBrief21').value);toast('클립보드에 복사했습니다.')">복사</button><button class="tab" onclick="downloadText('GPT_Daily_Closing_${key}.md',$('#closingBrief21').value,'text/markdown')">Markdown 저장</button></div>`,()=>closeModal());
}
function renderWorkLogV21(){
  const events=data.workMode.events||[],manual=data.manualWorkLogs||[],reports=data.dailyReports||[],key=v21ISO(new Date());
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">3-PART WORK LOG</span><h1>Work Log</h1><p>OS 자동 기록, 대표 업무일지, GPT Daily Closing Brief를 하나의 하루 기록으로 관리합니다.</p></div><div class="page-actions"><button class="primary-btn compact" onclick="addFounderLogV21()">+ 대표 업무일지</button><button class="tab" onclick="importAISessionV21()">AI Session Import</button><button class="tab" onclick="generateClosingBriefV21()">GPT Closing Brief</button></div></div>
  <div class="worklog-columns-v21"><section class="panel"><div class="panel-head"><div><span class="eyebrow">OS AUTO</span><h3>자동 활동 기록</h3></div><small>${events.length}</small></div><div class="activity-stream-v20">${events.slice(0,80).map(e=>`<div><time>${new Date(e.date).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time><span></span><p><strong>${esc(e.title)}</strong><small>${esc(e.project)} · ${esc(e.type)}</small></p></div>`).join('')||emptyLine('자동 기록이 없습니다.')}</div></section>
  <section class="panel"><div class="panel-head"><div><span class="eyebrow">FOUNDER</span><h3>대표 업무일지</h3></div><small>${manual.length}</small></div><div class="founder-logs-v21">${manual.map(x=>`<article><time>${new Date(x.date).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time><strong>${esc(x.work||x.type||'업무일지')}</strong><small>${esc(x.project)}</small>${x.reflection?`<p>${esc(x.reflection)}</p>`:''}${x.tomorrow?`<em>내일 · ${esc(x.tomorrow)}</em>`:''}</article>`).join('')||emptyLine('대표가 직접 작성한 업무일지가 없습니다.')}</div></section>
  <section class="panel"><div class="panel-head"><div><span class="eyebrow">DAILY REPORT</span><h3>퇴근 보고</h3></div><small>${reports.length}</small></div><div class="daily-report-list-v20">${reports.map(r=>`<button onclick="openDailyReportV20('${r.id}')"><time>${esc(r.date)}</time><span>${v20FormatTime(r.clockIn)}–${v20FormatTime(r.clockOut)}</span><strong>${v20Duration(r.minutes)}</strong><em>${r.optional?'선택 근무':'정규 근무'}</em></button>`).join('')||emptyLine('퇴근 후 보고가 생성됩니다.')}</div></section></div>`;
}

// --- Home Office Dashboard enhancements ---
const renderHomeV21Base=renderHomeV20;
function renderHomeV21(){renderHomeV21Base();const key=v21ISO(new Date()),all=v21AllTasks(),delayed=all.filter(t=>!t.done&&t.dueDate<key),today=all.filter(t=>!t.done&&t.startDate<=key&&t.dueDate>=key),reviews=all.filter(t=>t.workflow==='Review'),aiToday=(data.manualWorkLogs||[]).filter(x=>x.type==='AI Session'&&String(x.date).startsWith(key)).length;const dash=`<section class="office-dashboard-v21"><div><small>오늘 예정</small><strong>${today.length}</strong><span>Scheduled</span></div><div><small>지연</small><strong>${delayed.length}</strong><span>Overdue</span></div><div><small>Review</small><strong>${reviews.length}</strong><span>Waiting</span></div><div><small>AI Sessions</small><strong>${aiToday}</strong><span>Today</span></div><div><small>Experience</small><strong>${(data.experiences||[]).filter(x=>x.status!=='Archived').length}</strong><span>Learning</span></div></section>`;const hero=$('.work-hero-v20');if(hero)hero.insertAdjacentHTML('afterend',dash);}

function renderRoadmapV21(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">EVOLUTION</span><h1>Roadmap</h1><p>디지털 제작 프로젝트를 회사처럼 운영하는 Work OS의 발전 과정입니다.</p></div><div class="panel roadmap-line"><div class="roadmap-row"><strong>v1.0–1.3 · Foundation & AI Handoff</strong><p>기준 UI, Constitution, AI Report</p></div><div class="roadmap-row"><strong>v1.4–1.6 · Digital Asset Operations</strong><p>자산 등록·연결·실제 활용</p></div><div class="roadmap-row"><strong>v1.7–1.8 · Intelligence & Workspace</strong><p>추천과 프로젝트 실행 공간</p></div><div class="roadmap-row"><strong>v1.9 · Experience & Patch Engine</strong><p>오답노트와 GPT 제작 결과 회수</p></div><div class="roadmap-row"><strong>v2.0 · Work Operating System</strong><p>출근·업무·퇴근의 회사형 운영</p></div><div class="roadmap-row current-roadmap"><strong>v2.1 · Project Operations — 현재</strong><p>Ideas 생애주기, History Navigation, 캘린더·Task·Gantt·Sprint·D-Day, 3주체 Work Log</p></div></div>`;}
function renderSystemV21(){renderSystemV20();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1 · Project Operations</p><small>Operate Projects. Learn from Experience. Build Assets.</small>';}

pages.brain=renderIdeasV21;pages.tasks=renderTasksV21;pages.worklog=renderWorkLogV21;pages.home=renderHomeV21;pages.roadmap=renderRoadmapV21;pages.system=renderSystemV21;
renderIdeas=renderIdeasV21;renderTasks=renderTasksV21;
document.title='Studio OS v2.1 · Project Operations';
const brandSmall21=document.querySelector('.brand small');if(brandSmall21)brandSmall21.textContent='Project Operations · v2.1';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV21();

/* === Studio OS v2.1.1 Work Experience & Usability Patch === */
(function initV211(){
  data.projectJournals=data.projectJournals||{};
  data.ideaView=data.ideaView||'List';
  data.projectFilter211=data.projectFilter211||'All';
  data.releaseNotes=data.releaseNotes||[];
  const exps=[
    {id:'EXP-001',title:'기간 일정이 날짜마다 중복 표시됨',area:'Studio OS',severity:'High',kind:'Rework',project:'Studio OS',problem:'여러 날 일정이 각 날짜 셀에 반복되어 달력 가독성이 저하됨',cause:'일정 범위를 일별 항목으로 렌더링',lesson:'기간 일정은 연속 Timeline Bar로 표현',prevention:'월간 캘린더에서 시작·종료 구간을 하나의 바와 주간 레인으로 렌더링',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-002',title:'프로젝트 상태 필터 미동작',area:'Studio OS',severity:'High',kind:'Failure',project:'Studio OS',problem:'All 외 상태 필터가 프로젝트 목록에 반영되지 않음',cause:'필터 버튼과 데이터 조건 미연결',lesson:'표시용 컨트롤은 반드시 실제 데이터 필터와 연결',prevention:'상태별 개수와 필터 결과를 동일 함수에서 계산',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-003',title:'Ideas 카드형 기본 화면의 관리 효율 저하',area:'Studio OS',severity:'Medium',kind:'Dislike',project:'Studio OS',problem:'긴 아이디어 카드가 화면을 과도하게 점유',cause:'초기 미관 중심 카드 레이아웃',lesson:'운영 데이터는 리스트를 기본으로 사용',prevention:'List 기본, Card 선택 보기',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-004',title:'Roadmap 전체 버전 연혁 누락',area:'Studio OS',severity:'High',kind:'Rework',project:'Studio OS',problem:'일부 버전만 묶어 표시되어 실제 개발 과정 추적이 어려움',cause:'현재 기능 중심 요약',lesson:'Roadmap은 회사 연혁처럼 전체 버전을 보존',prevention:'v0.1부터 현재까지 개별 버전 Timeline 유지',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-005',title:'프로젝트별 간단 메모 공간 부재',area:'Studio OS',severity:'Medium',kind:'Failure',project:'Studio OS',problem:'프로젝트 운영 중 떠오른 판단을 프로젝트 내부에 즉시 기록할 수 없음',cause:'Workspace와 Decision 중심 구조',lesson:'프로젝트마다 가벼운 Journal이 필요',prevention:'Note·Idea·Decision·Reminder·Meeting·Question 지원',status:'Resolved',createdAt:'2026-08-05'}
  ];
  data.experiences=data.experiences||[];exps.forEach(x=>{const i=data.experiences.findIndex(e=>e.id===x.id);if(i>=0)data.experiences[i]={...data.experiences[i],...x};else data.experiences.push(x)});
  const rn={id:'RN-2.1.1',version:'v2.1.1',date:'2026-08-05',title:'Work Experience & Usability Patch',newItems:['Calendar Timeline Bar','Project Journal','Ideas List View','Release Notes'],improved:['Project status filter','Roadmap full history','Work Log linkage','Navigation consistency'],fixed:['EXP-001 Calendar duplicate ranges','EXP-002 Project filter','EXP-003 Ideas card density','EXP-004 Roadmap omissions','EXP-005 Project notes'],experiences:['EXP-001','EXP-002','EXP-003','EXP-004','EXP-005']};
  const rni=data.releaseNotes.findIndex(x=>x.id===rn.id);if(rni>=0)data.releaseNotes[rni]=rn;else data.releaseNotes.unshift(rn);
  const rules=[
    {id:'C-JOURNAL-001',title:'Project Journal 운영 원칙',chapter:'Operations',status:'Approved',content:'각 프로젝트는 간단한 Note, Idea, Decision, Reminder, Meeting, Question을 즉시 기록할 수 있는 Journal을 제공한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-WORK-006'],note:'v2.1.1',favorite:true,updated:'2026-08-05'},
    {id:'C-ROADMAP-001',title:'전체 버전 연혁 보존 원칙',chapter:'Governance',status:'Approved',content:'Roadmap은 v0.1부터 현재 버전까지 실제 개발 이력을 개별 항목으로 보존하고 현재·예정 버전을 구분한다.',scope:'Studio OS',projects:['Studio OS'],related:['C-PATCH-001'],note:'회사 연혁형 Roadmap',favorite:true,updated:'2026-08-05'},
    {id:'C-EXP-002',title:'Experience ID 추적 원칙',chapter:'Experience',status:'Approved',content:'실패·불만족·재작업 사례는 고유 Experience ID로 관리하고 해결 패치, Lesson, Constitution Candidate를 연결한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-EXP-001'],note:'v2.1.1',favorite:true,updated:'2026-08-05'},
    {id:'C-RELEASE-001',title:'Release Note 운영 원칙',chapter:'Governance',status:'Approved',content:'모든 Studio OS 릴리즈는 NEW, IMPROVED, FIXED, EXPERIENCE 항목을 포함하는 Release Note를 남긴다.',scope:'Studio OS',projects:['Studio OS'],related:['C-ROADMAP-001'],note:'v2.1.1',favorite:false,updated:'2026-08-05'}
  ];rules.forEach(r=>upsertV19(data.constitution,r));saveData();
})();

// Projects: real status filters and counts
function renderProjectsV211(){
  const statuses=['All','Planning','Ready','Active','Review','Maintenance','Paused','Completed','Archived'];
  const f=data.projectFilter211||'All';
  const list=data.projects.filter(p=>f==='All'||p.status===f);
  const count=s=>s==='All'?data.projects.length:data.projects.filter(p=>p.status===s).length;
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">Portfolio</span><h1>Projects</h1><p>상태별 프로젝트와 운영 Journal을 관리합니다.</p></div><button class="primary-btn compact" onclick="openProjectModal()">프로젝트 추가</button></div><div class="project-tabs project-filter-211">${statuses.map(s=>`<button class="${f===s?'active':''}" onclick="data.projectFilter211='${s}';saveData();renderProjectsV211()">${s} <small>${count(s)}</small></button>`).join('')}</div><div class="project-grid">${list.map(p=>`<button class="project-card" onclick="openProject('${p.id}')"><div class="project-top"><span class="status status-${String(p.status).toLowerCase()}">${esc(p.status)}</span><b>${p.progress}%</b></div><h3>${esc(p.name)}</h3><p>${esc(p.desc||'')}</p><div class="project-progress"><span style="width:${p.progress}%"></span></div><small>${esc(p.current||'-')} → ${esc(p.next||'-')}</small></button>`).join('')||emptyLine('해당 상태의 프로젝트가 없습니다.')}</div>`;
}
pages.projects=renderProjectsV211;renderProjects=renderProjectsV211;

const openProjectV211Base=openProject;
openProject=function(id,opts={}){openProjectV211Base(id,opts);setTimeout(()=>appendProjectJournal211(id),0)};
function journalList211(id){return data.projectJournals[id]||[]}
function appendProjectJournal211(id){
  const root=$('#content');if(!root)return;const rows=journalList211(id).slice().sort((a,b)=>(b.pinned-a.pinned)||String(b.date).localeCompare(String(a.date)));
  root.insertAdjacentHTML('beforeend',`<section class="panel journal-211"><div class="panel-head"><div><span class="eyebrow">PROJECT JOURNAL</span><h3>Notes & Decisions</h3></div><div class="page-actions"><input id="journalSearch211" placeholder="메모 검색" oninput="filterJournal211('${id}')"><button class="primary-btn compact" onclick="openJournal211('${id}')">+ 기록</button></div></div><div id="journalRows211">${rows.map(journalRow211).join('')||emptyLine('프로젝트 메모가 없습니다.')}</div></section>`);
}
function journalRow211(n){return `<article class="journal-row-211" data-search="${esc((n.title+' '+n.body+' '+n.type).toLowerCase())}"><button class="pin-211" onclick="toggleJournalPin211('${n.projectId}','${n.id}')">${n.pinned?'📌':'○'}</button><span class="status">${esc(n.type)}</span><div><strong>${esc(n.title)}</strong><p>${esc(n.body)}</p></div><time>${esc(n.date.slice(0,10))}</time><button onclick="openJournal211('${n.projectId}','${n.id}')">편집</button><button class="danger" onclick="deleteJournal211('${n.projectId}','${n.id}')">삭제</button></article>`}
function openJournal211(projectId,id=''){const arr=journalList211(projectId),n=arr.find(x=>x.id===id)||{title:'',body:'',type:'Note',pinned:false};openModal(id?'Journal 편집':'Journal 기록',`<label>유형<select id="jType211">${['Note','Idea','Decision','Reminder','Meeting','Question'].map(x=>`<option ${n.type===x?'selected':''}>${x}</option>`).join('')}</select></label><label>제목<input id="jTitle211" value="${esc(n.title)}"></label><label>내용<textarea id="jBody211" rows="7">${esc(n.body)}</textarea></label><label class="inline-check"><input id="jPin211" type="checkbox" ${n.pinned?'checked':''}> 상단 고정</label>`,()=>{const obj={id:id||uid('J'),projectId,type:$('#jType211').value,title:$('#jTitle211').value.trim()||'제목 없음',body:$('#jBody211').value.trim(),pinned:$('#jPin211').checked,date:id?n.date:new Date().toISOString(),updatedAt:new Date().toISOString()};if(id)Object.assign(n,obj);else{data.projectJournals[projectId]=data.projectJournals[projectId]||[];data.projectJournals[projectId].unshift(obj)}saveData();closeModal();openProject(projectId,{fromHistory:true});toast('Journal을 저장했습니다.');});}
function toggleJournalPin211(pid,id){const n=journalList211(pid).find(x=>x.id===id);if(n)n.pinned=!n.pinned;saveData();openProject(pid,{fromHistory:true})}
function deleteJournal211(pid,id){if(!confirm('이 Journal 기록을 삭제할까요?'))return;data.projectJournals[pid]=journalList211(pid).filter(x=>x.id!==id);saveData();openProject(pid,{fromHistory:true})}
function filterJournal211(pid){const q=$('#journalSearch211').value.toLowerCase();document.querySelectorAll('#journalRows211 .journal-row-211').forEach(x=>x.hidden=!x.dataset.search.includes(q))}

// Ideas: list-first, optional card view
function renderIdeasV211(){
 const q=(data.ideaSearch||'').toLowerCase(),source=v21IdeaFilter==='Trash'?data.ideasTrash:data.ideas;
 const list=source.filter(i=>{if(v21IdeaFilter==='Archived'&&i.stage!=='Archived')return false;if(v21IdeaFilter==='Active'&&i.stage==='Archived')return false;return !q||`${i.text} ${i.project||''} ${(i.tags||[]).join(' ')}`.toLowerCase().includes(q)});
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">IDEA LIFECYCLE</span><h1>Ideas</h1><p>리스트를 기본으로 빠르게 검색·분류하고 필요할 때 카드로 확인합니다.</p></div><button class="primary-btn compact" onclick="openIdeaV21()">+ 아이디어 등록</button></div><div class="idea-toolbar-v21"><div class="segmented-v21">${['Active','Archived','Trash'].map(x=>`<button class="${v21IdeaFilter===x?'active':''}" onclick="v21IdeaFilter='${x}';renderIdeasV211()">${x}</button>`).join('')}</div><input placeholder="아이디어·프로젝트·태그 검색" value="${esc(data.ideaSearch||'')}" oninput="data.ideaSearch=this.value;saveData();renderIdeasV211()"><div class="segmented-v21"><button class="${data.ideaView==='List'?'active':''}" onclick="data.ideaView='List';saveData();renderIdeasV211()">≣ List</button><button class="${data.ideaView==='Card'?'active':''}" onclick="data.ideaView='Card';saveData();renderIdeasV211()">□ Card</button></div></div>${data.ideaView==='Card'?`<div class="idea-grid-v21">${list.map(i=>ideaCardV21(i,v21IdeaFilter==='Trash')).join('')||emptyLine('아이디어가 없습니다.')}</div>`:`<section class="panel idea-list-211"><div class="idea-list-head-211"><span>제목</span><span>Type</span><span>Project</span><span>Status</span><span>Date</span><span></span></div>${list.map(i=>`<div class="idea-list-row-211"><button class="idea-title-211" onclick="${v21IdeaFilter==='Trash'?`restoreIdeaV21('${i.id}')`:`openIdeaV21('${i.id}')`}"><strong title="${esc(i.text)}">${esc(i.text)}</strong><small>${(i.tags||[]).map(esc).join(' · ')}</small></button><span>${esc(i.category||'Idea')}</span><span>${esc(i.project||'미분류')}</span><span>${esc(i.stage||'Captured')}</span><time>${esc(i.date||'오늘')}</time><button onclick="openIdeaMoreV21('${i.id}',${v21IdeaFilter==='Trash'})">•••</button></div>`).join('')||emptyLine('아이디어가 없습니다.')}</section>`}`;
}
pages.brain=renderIdeasV211;renderIdeas=renderIdeasV211;

// Calendar: weekly timeline lanes rather than duplicate day labels
function renderCalendarV211(all){
 const cells=v21MonthCells(v21Month),weeks=[];for(let i=0;i<cells.length;i+=7)weeks.push(cells.slice(i,i+7));
 const selected=all.filter(t=>t.startDate<=v21SelectedDate&&t.dueDate>=v21SelectedDate).sort((a,b)=>v21PriorityRank(a.priority)-v21PriorityRank(b.priority));
 const weekHtml=weeks.map(week=>{const real=week.filter(Boolean),ws=real[0],we=real[real.length-1];const tasks=all.filter(t=>ws&&t.dueDate>=ws&&t.startDate<=we).sort((a,b)=>a.startDate.localeCompare(b.startDate));const laneEnds=[];const bars=tasks.map(t=>{const s=Math.max(0,week.findIndex(d=>d&&d>=t.startDate));let e=-1;week.forEach((d,i)=>{if(d&&d<=t.dueDate)e=i});e=Math.max(s,e);let lane=laneEnds.findIndex(x=>x<s);if(lane<0){lane=laneEnds.length;laneEnds.push(e)}else laneEnds[lane]=e;return `<button class="timeline-bar-211 p-${String(t.priority).toLowerCase()}" style="grid-column:${s+1}/${e+2};grid-row:${lane+1}" onclick="openTaskEditorV21('${t.id}')" title="${esc(t.title)} · ${t.startDate}~${t.dueDate}"><strong>${t.startDate>=ws?esc(t.title):'↳ '+esc(t.title)}</strong><span>${t.progress}%</span></button>`}).join('');return `<div class="calendar-week-211"><div class="week-days-211">${week.map(day=>day?`<button class="${day===v21SelectedDate?'selected':''} ${day===v21ISO(new Date())?'today':''}" onclick="selectDateV21('${day}')"><time>${Number(day.slice(-2))}</time></button>`:'<span></span>').join('')}</div><div class="timeline-lanes-211" style="--lanes:${Math.max(1,laneEnds.length)}">${bars||'<span class="no-bars-211">일정 없음</span>'}</div></div>`}).join('');
 $('#opsBodyV21').innerHTML=`<div class="calendar-layout-v21"><section class="panel calendar-v21 timeline-calendar-211"><div class="calendar-head-v21"><button onclick="moveMonthV21(-1)">←</button><h3>${v21Month.replace('-','년 ')}월</h3><button onclick="moveMonthV21(1)">→</button></div><div class="weekdays-v21">${['일','월','화','수','목','금','토'].map(x=>`<b>${x}</b>`).join('')}</div>${weekHtml}</section><aside class="panel day-agenda-v21"><div class="panel-head"><div><span class="eyebrow">DAY AGENDA</span><h3>${v21SelectedDate}</h3></div><button onclick="openTaskModalV21('${v21SelectedDate}')">+ 추가</button></div>${selected.map(taskRowV21).join('')||emptyLine('이 날짜에 계획된 Task가 없습니다.')}</aside></div>`;
}
renderCalendarV21=renderCalendarV211;

// Roadmap full history + release notes
const v211History=[
 ['v0.1','Foundation Prototype','프로젝트·일정·아이디어 기본 구조'],['v0.2','Workspace','업무 화면과 프로젝트 흐름'],['v0.3','Knowledge','지식 페이지와 기록 구조'],['v0.4','AI Workspace','AI 협업 기본 화면'],['v0.6','UI Baseline','기준 UI 규격 확립'],['v0.7','Interaction','검색·전환·알림'],['v0.8','Real Data','로컬 저장과 편집'],['v0.9','Daily OS','Morning Brief와 Review'],['v1.0','Foundation Freeze','공식 기준 UI Freeze'],['v1.1','Knowledge & Constitution','규칙·Decision·Impact'],['v1.2','Constitution Engine','Preset·Pack·Validation'],['v1.3','AI Development Handoff','AI Report·결과 회수'],['v1.4','Digital Asset Operations','제작 결과 자산화'],['v1.5','Digital Asset Registry','Master·Version Asset'],['v1.6','Asset Workspace','파일 연결·미리보기·적용'],['v1.6.1','Classification & Navigation','대·중·소 분류·뒤로가기'],['v1.6.2','Asset Detail UI Polish','자산 상세 UI 안정화'],['v1.7','Asset Intelligence','추천·재사용·AI Collaboration'],['v1.7.1','AI Collaboration UI','협업 입력 화면 정리'],['v1.8','Project Workspace','Task·Notes·Files·Activity'],['v1.9','Experience & Patch Engine','오답노트·패치 회수'],['v1.9.1','Work Mode & Usability','업무 공간 원칙·자산 해제'],['v2.0','Work Operating System','출근·퇴근·Work Log'],['v2.1','Project Operations','Calendar·Gantt·Sprint·Ideas lifecycle'],['v2.1.1','Work Experience & Usability','Timeline·Journal·Ideas List·Roadmap History']
];
function renderRoadmapV211(){$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">STUDIO HISTORY</span><h1>Roadmap</h1><p>v0.1부터 현재까지 Studio OS가 실제로 성장한 전체 연혁입니다.</p></div><div class="roadmap-stats-211"><div><small>Total Versions</small><strong>${v211History.length}</strong></div><div><small>Current</small><strong>v2.1.1</strong></div><div><small>Experience</small><strong>${(data.experiences||[]).length}</strong></div><div><small>Constitution</small><strong>${data.constitution.length}</strong></div></div><section class="panel roadmap-history-211">${v211History.map((r,i)=>`<article class="${r[0]==='v2.1.1'?'current':''}"><span>${i+1}</span><div><strong>${r[0]} · ${r[1]}</strong><p>${r[2]}</p></div><button onclick="openRoadmapDetail211('${r[0]}')">상세</button></article>`).join('')}</section><section class="panel future-211"><span class="eyebrow">NEXT</span><h3>실전 프로젝트 운영 피드백 기반 업데이트</h3><p>우리집캐디·SAMS·BPM 등 실제 프로젝트에서 발생하는 Experience를 우선 반영합니다.</p></section>`}
function openRoadmapDetail211(v){const r=v211History.find(x=>x[0]===v);const rn=(data.releaseNotes||[]).find(x=>x.version===v);openModal(`${r[0]} · ${r[1]}`,`<p>${r[2]}</p>${rn?`<h4>NEW</h4><p>${rn.newItems.join(' · ')}</p><h4>IMPROVED</h4><p>${rn.improved.join(' · ')}</p><h4>FIXED</h4><p>${rn.fixed.join('<br>')}</p>`:'<p class="modal-help-v21">이 버전의 상세 Release Note는 향후 자산으로 연결할 수 있습니다.</p>'}`,()=>closeModal())}
function renderReleaseNotes211(){const list=data.releaseNotes||[];$('#content').innerHTML=`<div class="page-title"><span class="eyebrow">CHANGELOG</span><h1>Release Notes</h1><p>각 릴리즈의 신규·개선·수정·Experience를 공식 기록합니다.</p></div><div class="release-list-211">${list.map(r=>`<section class="panel"><div class="panel-head"><div><span class="eyebrow">${esc(r.date)}</span><h3>${esc(r.version)} · ${esc(r.title)}</h3></div></div><div class="release-cols-211"><div><strong>NEW</strong>${r.newItems.map(x=>`<p>+ ${esc(x)}</p>`).join('')}</div><div><strong>IMPROVED</strong>${r.improved.map(x=>`<p>↑ ${esc(x)}</p>`).join('')}</div><div><strong>FIXED</strong>${r.fixed.map(x=>`<p>✓ ${esc(x)}</p>`).join('')}</div><div><strong>EXPERIENCE</strong>${r.experiences.map(x=>`<p>${esc(x)}</p>`).join('')}</div></div></section>`).join('')}</div>`}
if(!navItems.some(x=>x.id==='release'))navItems.splice(navItems.findIndex(x=>x.id==='roadmap')+1,0,{id:'release',label:'Release Notes',ico:'≡'});
pages.roadmap=renderRoadmapV211;pages.release=renderReleaseNotes211;

function renderSystemV211(){renderSystemV21();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.1 · Work Experience & Usability</p><small>Operate. Learn. Improve.</small>'}
pages.system=renderSystemV211;
document.title='Studio OS v2.1.1 · Work Experience & Usability';
const b211=document.querySelector('.brand small');if(b211)b211.textContent='Work Experience · v2.1.1';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV21();

/* === Studio OS v2.1.2 Responsive Stability Patch === */
(function initV212(){
  const exps=[
    {id:'EXP-019',title:'Project Card 정보 과밀',area:'UI / UX',severity:'High',kind:'Rework',project:'Studio OS',problem:'프로젝트 카드 크기는 작아졌지만 상태·진행률·설명·Current·Next가 압축되어 기준 UI가 무너짐',cause:'Summary와 Detail 정보를 한 카드에 동시에 배치',lesson:'프로젝트 카드는 핵심 요약만 표시하고 상세는 Detail로 분리',prevention:'검증된 v2.0 카드 규격을 Freeze하고 최근 Journal은 한 줄만 노출',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-020',title:'Calendar Timeline이 달력 높이를 과도하게 증가시킴',area:'UI / UX',severity:'High',kind:'Dislike',project:'Studio OS',problem:'기간 바와 일정 레인이 두꺼워 월간 달력의 주차 높이가 계속 늘어남',cause:'일정 정보를 바 내부에 모두 노출하고 레인 수에 따라 높이를 자동 확장',lesson:'월간 달력은 상세 정보가 아니라 공정 상태만 압축 표시',prevention:'주차 높이 고정, Timeline 6px, 최대 표시 레인 제한, 상세는 우측 Agenda에서 확인',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-021',title:'Ideas List Action Area Overflow',area:'UI / UX',severity:'High',kind:'Failure',project:'Studio OS',problem:'Date 오른쪽 액션 버튼이 좁은 화면에서 잘려 조작할 수 없음',cause:'고정 컬럼 폭 합계가 컨테이너 폭을 초과',lesson:'제목만 가변폭으로 두고 액션 컬럼은 항상 보존',prevention:'반응형 컬럼 우선순위와 고정 Action 컬럼 사용',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-022',title:'Sidecar·분할 화면 반응형 검증 누락',area:'UI / UX',severity:'High',kind:'Failure',project:'Studio OS',problem:'맥북에서는 정상이나 Sidecar와 작은 창에서 리스트 우측이 잘림',cause:'대형 데스크톱 뷰포트만 기준으로 확인',lesson:'핵심 액션은 1024px 이하에서도 반드시 접근 가능해야 함',prevention:'Wide·Compact·Narrow 브레이크포인트와 작은 화면 검증을 기본 적용',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-023',title:'Native Time Input Style Mismatch',area:'UI / UX',severity:'Medium',kind:'Dislike',project:'Studio OS',problem:'Working Hours 시간 입력만 브라우저 기본 스타일이 노출되어 UI가 이질적임',cause:'네이티브 입력 요소에 Studio OS Form Style 미적용',lesson:'기본 입력 요소도 공통 디자인 토큰으로 감싸야 함',prevention:'시간·날짜·파일 입력에 공통 Form Shell 적용',status:'Resolved',createdAt:'2026-08-05'}
  ];
  data.experiences=data.experiences||[];exps.forEach(x=>{const i=data.experiences.findIndex(e=>e.id===x.id);if(i>=0)data.experiences[i]={...data.experiences[i],...x};else data.experiences.push(x)});
  const rules=[
    {id:'C-EXP-003',title:'피드백 자동 Experience 등록 원칙',chapter:'Experience',status:'Approved',content:'제작 결과에 대한 사용자 피드백은 단순 오탈자를 제외하고 Experience 후보로 자동 분석·분류한다. 다음 패치에는 해결 상태, Lesson, 재발 방지 기준과 Constitution 영향을 함께 반영한다.',scope:'전체 프로젝트',projects:['Studio OS','SAMS','BPM 검색도우미','BECO Bowling','우리집캐디'],related:['C-EXP-002','C-RELEASE-001'],note:'사용 피드백을 다음 제작의 예방 기준으로 전환',favorite:true,updated:'2026-08-05'},
    {id:'C-UI-FREEZE-001',title:'검증된 Summary UI 동결 원칙',chapter:'UI',status:'Approved',content:'검증된 요약 카드의 크기·간격·정보 계층은 명시적 승인 없이 변경하지 않는다. 신규 상세 정보는 카드에 압축하지 않고 Detail, Journal 또는 확장 영역에 배치한다.',scope:'전체 UI',projects:['Studio OS'],related:['C-UI-001','C-EXP-003'],note:'Project Card v2.0 규격 복원',favorite:true,updated:'2026-08-05'},
    {id:'C-UI-RESP-001',title:'Small Viewport 핵심 액션 보존 원칙',chapter:'UI',status:'Approved',content:'맥북, Sidecar, 분할 화면 등 좁은 뷰포트에서도 핵심 액션은 잘리지 않아야 한다. 1024px 이하에서는 비핵심 컬럼을 축약하고 Action 컬럼을 우선 보존한다.',scope:'Studio OS UI',projects:['Studio OS'],related:['C-NAV-001','C-UI-FREEZE-001'],note:'Responsive stability',favorite:true,updated:'2026-08-05'}
  ];rules.forEach(r=>upsertV19(data.constitution,r));
  const rn={id:'RN-2.1.2',version:'v2.1.2',date:'2026-08-05',title:'Responsive Stability Patch',newItems:['Feedback → Experience 자동 등록 규칙','Small Viewport 디자인 기준'],improved:['Project Summary Card 복원','Compact Calendar Timeline','Ideas responsive list','Working Hours form UI'],fixed:['EXP-019 Project card density','EXP-020 Calendar height','EXP-021 Action overflow','EXP-022 Sidecar responsiveness','EXP-023 Time input mismatch'],experiences:['EXP-019','EXP-020','EXP-021','EXP-022','EXP-023']};
  data.releaseNotes=data.releaseNotes||[];const ri=data.releaseNotes.findIndex(x=>x.id===rn.id);if(ri>=0)data.releaseNotes[ri]=rn;else data.releaseNotes.unshift(rn);
  saveData();
})();

function projectLatestJournal212(pid){return (data.projectJournals?.[pid]||[]).slice().sort((a,b)=>String(b.updatedAt||b.date).localeCompare(String(a.updatedAt||a.date)))[0]}
function renderProjectsV212(){
 const statuses=['All','Planning','Ready','Active','Review','Maintenance','Paused','Completed','Archived'],f=data.projectFilter211||'All',list=data.projects.filter(p=>f==='All'||p.status===f),count=s=>s==='All'?data.projects.length:data.projects.filter(p=>p.status===s).length;
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">PROJECT OVERVIEW</span><h1>Projects</h1><p>검증된 Summary 카드에서 프로젝트 상태를 빠르게 확인합니다.</p></div><button class="primary-btn compact" onclick="openProjectModal()">+ 프로젝트 생성</button></div><div class="project-filter-shell-212"><div class="project-tabs project-filter-211">${statuses.map(s=>`<button class="${f===s?'active':''}" onclick="data.projectFilter211='${s}';saveData();renderProjectsV212()">${s} <small>${count(s)}</small></button>`).join('')}</div></div><div class="project-grid project-grid-212">${list.map(p=>{const j=projectLatestJournal212(p.id);return `<button class="project-card project-card-212" onclick="openProject('${p.id}')"><div class="project-card-head-212"><div><h3>${esc(p.name)}</h3><p>${esc(p.desc||'')}</p></div><span class="status status-${String(p.status).toLowerCase()}">${esc(p.status)}</span></div><div class="project-progress project-progress-212"><span style="width:${Math.max(0,Math.min(100,p.progress||0))}%"></span></div><div class="project-flow-212"><div><small>Current</small><strong>${esc(p.current||'-')}</strong></div><div><small>Next</small><strong>${esc(p.next||'-')}</strong></div></div><div class="project-card-foot-212"><span>${Number(p.progress||0)}% complete</span><strong>${j?'📝 '+esc(j.title):'열기 →'}</strong></div></button>`}).join('')||emptyLine('해당 상태의 프로젝트가 없습니다.')}</div>`;
}
pages.projects=renderProjectsV212;renderProjects=renderProjectsV212;

function renderIdeasV212(){
 const q=(data.ideaSearch||'').toLowerCase(),source=v21IdeaFilter==='Trash'?data.ideasTrash:data.ideas;
 const list=source.filter(i=>{if(v21IdeaFilter==='Archived'&&i.stage!=='Archived')return false;if(v21IdeaFilter==='Active'&&i.stage==='Archived')return false;return !q||`${i.text} ${i.project||''} ${(i.tags||[]).join(' ')}`.toLowerCase().includes(q)});
 $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">IDEA LIFECYCLE</span><h1>Ideas</h1><p>화면 크기에 맞춰 핵심 정보와 액션을 항상 사용할 수 있습니다.</p></div><button class="primary-btn compact" onclick="openIdeaV21()">+ 아이디어 등록</button></div><div class="idea-toolbar-v21 idea-toolbar-212"><div class="segmented-v21">${['Active','Archived','Trash'].map(x=>`<button class="${v21IdeaFilter===x?'active':''}" onclick="v21IdeaFilter='${x}';renderIdeasV212()">${x}</button>`).join('')}</div><input placeholder="아이디어·프로젝트·태그 검색" value="${esc(data.ideaSearch||'')}" oninput="data.ideaSearch=this.value;saveData();renderIdeasV212()"><div class="segmented-v21"><button class="${data.ideaView==='List'?'active':''}" onclick="data.ideaView='List';saveData();renderIdeasV212()">≣ List</button><button class="${data.ideaView==='Card'?'active':''}" onclick="data.ideaView='Card';saveData();renderIdeasV212()">□ Card</button></div></div>${data.ideaView==='Card'?`<div class="idea-grid-v21">${list.map(i=>ideaCardV21(i,v21IdeaFilter==='Trash')).join('')||emptyLine('아이디어가 없습니다.')}</div>`:`<section class="panel idea-list-211 idea-list-212"><div class="idea-list-head-211"><span>제목</span><span>Type</span><span>Project</span><span>Status</span><span>Date</span><span></span></div>${list.map(i=>`<div class="idea-list-row-211 idea-list-row-212"><button class="idea-title-211" onclick="${v21IdeaFilter==='Trash'?`restoreIdeaV21('${i.id}')`:`openIdeaV21('${i.id}')`}"><strong title="${esc(i.text)}">${esc(i.text)}</strong><small>${(i.tags||[]).map(esc).join(' · ')}</small></button><span class="col-type-212">${esc(i.category||'Idea')}</span><span class="col-project-212">${esc(i.project||'미분류')}</span><span class="col-status-212">${esc(i.stage||'Captured')}</span><time>${esc(i.date||'오늘')}</time><button class="idea-action-212" onclick="openIdeaMoreV21('${i.id}',${v21IdeaFilter==='Trash'})" aria-label="아이디어 작업">•••</button></div>`).join('')||emptyLine('아이디어가 없습니다.')}</section>`}`;
}
pages.brain=renderIdeasV212;renderIdeas=renderIdeasV212;

function renderCalendarV212(all){
 const cells=v21MonthCells(v21Month),weeks=[];for(let i=0;i<cells.length;i+=7)weeks.push(cells.slice(i,i+7));
 const selected=all.filter(t=>t.startDate<=v21SelectedDate&&t.dueDate>=v21SelectedDate).sort((a,b)=>v21PriorityRank(a.priority)-v21PriorityRank(b.priority));
 const weekHtml=weeks.map(week=>{const real=week.filter(Boolean),ws=real[0],we=real[real.length-1];const tasks=all.filter(t=>ws&&t.dueDate>=ws&&t.startDate<=we).sort((a,b)=>a.startDate.localeCompare(b.startDate));const laneEnds=[],visible=[];tasks.forEach(t=>{const s=Math.max(0,week.findIndex(d=>d&&d>=t.startDate));let e=s;week.forEach((d,i)=>{if(d&&d<=t.dueDate)e=i});let lane=laneEnds.findIndex(x=>x<s);if(lane<0)lane=laneEnds.length;if(lane<4){laneEnds[lane]=e;visible.push({t,s,e,lane})}});const hidden=Math.max(0,tasks.length-visible.length);const bars=visible.map(({t,s,e,lane})=>`<button class="timeline-bar-212 p-${String(t.priority).toLowerCase()}" style="grid-column:${s+1}/${e+2};grid-row:${lane+1}" onclick="openTaskEditorV21('${t.id}')" title="${esc(t.title)} · ${t.startDate}~${t.dueDate} · ${t.progress}%"><i style="width:${Math.max(2,t.progress||0)}%"></i>${t.startDate>=ws?`<span>${esc(t.title)}</span>`:''}</button>`).join('');return `<div class="calendar-week-211 calendar-week-212"><div class="week-days-211">${week.map(day=>day?`<button class="${day===v21SelectedDate?'selected':''} ${day===v21ISO(new Date())?'today':''}" onclick="selectDateV21('${day}')"><time>${Number(day.slice(-2))}</time></button>`:'<span></span>').join('')}</div><div class="timeline-lanes-211 timeline-lanes-212">${bars}${hidden?`<button class="more-bars-212" onclick="selectDateV21('${ws}')">+${hidden}</button>`:''}</div></div>`}).join('');
 $('#opsBodyV21').innerHTML=`<div class="calendar-layout-v21"><section class="panel calendar-v21 timeline-calendar-211 calendar-212"><div class="calendar-head-v21"><button onclick="moveMonthV21(-1)">←</button><h3>${v21Month.replace('-','년 ')}월</h3><button onclick="moveMonthV21(1)">→</button></div><div class="weekdays-v21">${['일','월','화','수','목','금','토'].map(x=>`<b>${x}</b>`).join('')}</div>${weekHtml}</section><aside class="panel day-agenda-v21"><div class="panel-head"><div><span class="eyebrow">DAY AGENDA</span><h3>${v21SelectedDate}</h3></div><button onclick="openTaskModalV21('${v21SelectedDate}')">+ 추가</button></div>${selected.map(taskRowV21).join('')||emptyLine('이 날짜에 계획된 Task가 없습니다.')}</aside></div>`;
}
renderCalendarV21=renderCalendarV212;

function renderSystemV212(){
 $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">CONTROL CENTER</span><h1>System</h1><p>Studio의 근무 기준과 운영 데이터를 관리합니다.</p></div><div class="system-grid"><section class="panel"><h3>Company Profile</h3><p>${esc(data.company.name)} · ${esc(data.company.role)}</p><small>Business-only workspace</small></section><section class="panel working-hours-212"><div><h3>Working Hours</h3><p>평일 기본 출퇴근 기준을 설정합니다.</p></div><div class="time-fields-212"><label><small>출근 기준</small><span><input id="startHour212" type="time" value="${esc(data.company.startHour)}"><b>◷</b></span></label><label><small>퇴근 기준</small><span><input id="endHour212" type="time" value="${esc(data.company.endHour)}"><b>◷</b></span></label></div><div class="working-actions-212"><button class="primary-btn compact" onclick="data.company.startHour=$('#startHour212').value;data.company.endHour=$('#endHour212').value;saveData();toast('근무시간을 저장했습니다.')">근무시간 저장</button></div></section><section class="panel"><h3>Data Backup</h3><p>프로젝트·Experience·Patch·Work Log를 JSON으로 백업합니다.</p><div class="page-actions"><button class="tab" onclick="exportData()">내보내기</button><button class="tab" onclick="$('#importFile212').click()">불러오기</button><input id="importFile212" type="file" accept="application/json" hidden></div></section><section class="panel"><h3>Version</h3><p>Studio OS v2.1.2 · Responsive Stability</p><small>Frozen summaries. Responsive actions.</small></section><section class="panel"><h3>Workspace Policy</h3><p>업무 프로젝트, 디지털 제작, 사업화 활동만 운영합니다. 개인 생활·단순 취미·일회성 정보는 기본 대상에서 제외합니다.</p></section><section class="panel"><h3>Storage</h3><p>Metadata ${new Blob([JSON.stringify(data)]).size.toLocaleString()} bytes</p><small>LocalStorage + IndexedDB</small></section></div>`;$('#importFile212').onchange=importData;
}
pages.system=renderSystemV212;

const v212h=['v2.1.2','Responsive Stability','Project Card 복원·Compact Calendar·Sidecar 대응·Form UI'];if(typeof v211History!=='undefined'&&!v211History.some(x=>x[0]==='v2.1.2'))v211History.push(v212h);
document.title='Studio OS v2.1.2 · Responsive Stability';const brand212=document.querySelector('.brand small');if(brand212)brand212.textContent='Responsive Stability · v2.1.2';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV21();

/* === Studio OS v2.1.3 UI Rollback & Freeze Patch === */
(function initV213(){
  const exp={id:'EXP-024',title:'기능 패치가 Freeze UI를 훼손함',area:'UI / UX',severity:'Critical',kind:'Rework',project:'Studio OS',problem:'반응형·기능 개선 과정에서 승인 없이 Projects 카드의 크기·열 수·배치가 변경되어 v2.1 기준 UI가 무너짐',cause:'기능 로직과 시각 레이아웃 변경을 하나의 패치에서 함께 처리하고 기준 UI 회귀 검사를 생략함',lesson:'기능 추가와 UI 변경을 분리하고 검증된 화면은 대표의 명시적 승인 없이는 변경하지 않는다',prevention:'Projects는 v2.1의 2열 카드·22px 패딩·Current/Next 구성·진행률 위치를 Freeze하고, 좁은 화면에서만 1열로 전환',status:'Resolved',createdAt:'2026-08-05'};
  data.experiences=data.experiences||[];upsertV19(data.experiences,exp);
  const rule={id:'C-UI-FREEZE-002',chapter:'UI / UX',title:'대표 승인 없는 UI 변경 금지',content:'사용자가 명시적으로 UI 변경을 요청하지 않는 한 레이아웃, 카드 크기, 열 수, 간격, 타이포, 컴포넌트 배치와 시각 스타일을 변경하지 않는다. 기능 추가와 버그 수정은 확정 UI 내부에서 수행하고 공간이 부족하면 Detail, Modal, Tab, Dropdown 등 확장 영역으로 분리한다.',status:'Active',scope:'All Projects',projects:['Studio OS','SAMS','BPM 검색도우미','BECO Bowling','우리집캐디'],related:['C-UI-FREEZE-001','EXP-024'],note:'Projects v2.1 visual baseline frozen',favorite:true,updated:'2026-08-05'};
  upsertV19(data.constitution,rule);
  const rn={id:'RN-2.1.3',version:'v2.1.3',date:'2026-08-05',title:'UI Rollback & Freeze Patch',newItems:['UI Freeze 승인 규칙','Projects 기준 UI 회귀 검사'],improved:['v2.1.2 기능·반응형·Experience 데이터 유지','상태 필터 실제 동작 유지'],fixed:['Projects 디자인을 v2.1 2열 Summary 카드로 롤백','EXP-024 승인 없는 UI 변경'],experiences:['EXP-024']};
  data.releaseNotes=data.releaseNotes||[];const i=data.releaseNotes.findIndex(x=>x.id===rn.id);if(i>=0)data.releaseNotes[i]=rn;else data.releaseNotes.unshift(rn);
  saveData();
})();

function renderProjectsV213(){
  const statuses=['All','Planning','Ready','Active','Review','Maintenance','Paused','Completed','Archived'];
  const f=data.projectFilter211||'All';
  const list=data.projects.filter(p=>f==='All'||p.status===f);
  const count=s=>s==='All'?data.projects.length:data.projects.filter(p=>p.status===s).length;
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Project overview</span><h1>Projects</h1><p>v2.1 카드 규격 안에서 실제 프로젝트 상태를 편집합니다.</p></div><div class="page-actions"><button class="primary-btn compact" onclick="openProjectWizard()">+ 프로젝트 생성</button></div><div class="project-filter-shell-213"><div class="section-tabs">${statuses.map(s=>`<button class="tab ${f===s?'active':''}" onclick="data.projectFilter211='${s}';saveData();renderProjectsV213()">${s} ${count(s)}</button>`).join('')}</div></div><div class="project-classic-grid project-grid-213">${list.map(p=>`<article class="project-classic-card project-card-213" onclick="openProject('${p.id}')"><div class="project-card-top"><div><h3>${esc(p.name)}</h3><div class="project-card-meta">${esc(p.desc||'')}</div></div><span class="status ${p.status==='Paused'?'paused':''}">${esc(p.status)}</span></div><div class="project-progress"><span style="width:${Math.max(0,Math.min(100,p.progress||0))}%"></span></div><div class="project-card-stats"><div class="project-card-stat"><small>Current</small><strong>${esc(p.current||'-')}</strong></div><div class="project-card-stat"><small>Next</small><strong>${esc(p.next||'-')}</strong></div></div><div class="project-card-bottom"><small>${Number(p.progress||0)}% complete</small><strong>열기 →</strong></div></article>`).join('')||emptyLine('해당 상태의 프로젝트가 없습니다.')}</div>`;
}
pages.projects=renderProjectsV213;renderProjects=renderProjectsV213;

if(typeof v211History!=='undefined'&&!v211History.some(x=>x[0]==='v2.1.3'))v211History.push(['v2.1.3','UI Rollback & Freeze','v2.1 Projects UI 복원·UI Freeze 규칙 확정']);
function renderSystemV213(){renderSystemV212();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.3 · UI Rollback & Freeze</p><small>Functions evolve. Approved UI stays frozen.</small>'}
pages.system=renderSystemV213;
document.title='Studio OS v2.1.3 · UI Rollback & Freeze';
const brand213=document.querySelector('.brand small');if(brand213)brand213.textContent='UI Rollback & Freeze · v2.1.3';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV21();

/* === Studio OS v2.1.4 Feature Simplification & State Stability Patch === */
(function initV214(){
  data.projectsTrash=data.projectsTrash||[];
  data.ideaView211=data.ideaView211||'list';
  data.projectFilter211=data.projectFilter211||'All';
  const devIndex=navItems.findIndex(x=>x.id==='development');
  if(devIndex>=0)navItems.splice(devIndex,1);
  delete pages.development;
  const exps=[
    {id:'EXP-025',title:'Ideas View State Reset After Mutation',area:'UI / UX · State',severity:'High',kind:'Failure',project:'Studio OS',problem:'아이디어 수정·승격·보관·휴지통 이동 등 데이터 변경 후 List 보기가 Card로 초기화됨',cause:'CRUD 완료 후 구형 카드 렌더 함수를 호출하여 사용자 보기 상태를 덮어씀',lesson:'데이터 상태와 보기 상태를 분리하고 CRUD는 사용자가 선택한 View Mode를 변경하지 않는다',prevention:'Ideas의 모든 변경·탭 이동·재진입·새로고침에서 전역 View State를 유지',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-026',title:'Project Immediate Deletion Without Recovery',area:'Project · Data',severity:'High',kind:'Failure',project:'Studio OS',problem:'프로젝트 삭제 시 복원 경로 없이 즉시 제거됨',cause:'프로젝트에 Soft Delete와 Trash 데이터 모델이 없었음',lesson:'핵심 데이터는 삭제보다 복구 가능한 휴지통 이동을 기본으로 한다',prevention:'Projects·Ideas·Assets 등 핵심 데이터는 Soft Delete 후 별도 확인을 거쳐 완전 삭제',status:'Resolved',createdAt:'2026-08-05'},
    {id:'EXP-027',title:'Feature Overlap Increases Cognitive Load',area:'Workflow',severity:'High',kind:'Lesson',project:'Studio OS',problem:'AI Discussion이 Project·Journal·Work Log·AI Report와 역할이 겹쳐 사용자가 기능을 혼동함',cause:'기능 추가 시 기존 메뉴와 역할 중복 검토가 부족했음',lesson:'하나의 기능은 하나의 명확한 위치에서만 관리한다',prevention:'신규 기능 전 Feature Audit을 수행하고 중복 시 통합 또는 제거',status:'Resolved',createdAt:'2026-08-05'}
  ];
  data.experiences=data.experiences||[];exps.forEach(x=>upsertV19(data.experiences,x));
  const rules=[
    {id:'C-UX-STATE-001',chapter:'UI / UX',title:'사용자 선택 상태 보존 칙',content:'수정·승격·보관·삭제·복원 등 데이터 변경은 사용자가 선택한 보기 방식, 검색어, 정렬과 필터를 임의로 초기화하지 않는다.',status:'Active',scope:'All Projects',projects:['Studio OS'],related:['EXP-025'],note:'CRUD와 View State 분리',favorite:true,updated:'2026-08-05'},
    {id:'C-DATA-SOFTDELETE-001',chapter:'Data',title:'핵심 데이터 Soft Delete 칙',content:'프로젝트와 아이디어 등 핵심 데이터는 즉시 영구 삭제하지 않고 휴지통으로 이동한다. 복원과 완전 삭제를 분리하고 연결 데이터는 복원 가능하게 보존한다.',status:'Active',scope:'All Projects',projects:['Studio OS'],related:['EXP-026'],note:'Recovery first',favorite:true,updated:'2026-08-05'},
    {id:'C-FEATURE-MIN-001',chapter:'Architecture',title:'Feature Minimalism Rule',content:'새 기능 추가 전에 기존 기능과 역할 중복을 검토한다. 중복되는 경우 새 메뉴를 만들지 않고 기존 기능에 통합하거나 불필요한 기능을 제거한다.',status:'Active',scope:'All Projects',projects:['Studio OS'],related:['EXP-027'],note:'Add less, clarify more',favorite:true,updated:'2026-08-05'}
  ];rules.forEach(x=>upsertV19(data.constitution,x));
  const rn={id:'RN-2.1.4',version:'v2.1.4',date:'2026-08-05',title:'Feature Simplification & State Stability Patch',newItems:['Projects 휴지통·복원·완전 삭제','사용자 선택 상태 보존 칙','Feature Minimalism Rule','Soft Delete 칙'],improved:['Ideas List/Card 보기 상태를 모든 CRUD 후 유지','Projects 필터 상태 유지','Feature Audit 형식 적용'],fixed:['아이디어 변경 시 Card로 초기화되는 EXP-025','프로젝트 즉시 삭제 EXP-026','AI Discussion 역할 중복 EXP-027'],removed:['독립 AI Discussion 메뉴'],experiences:['EXP-025','EXP-026','EXP-027']};
  data.releaseNotes=data.releaseNotes||[];const rni=data.releaseNotes.findIndex(x=>x.id===rn.id);if(rni>=0)data.releaseNotes[rni]=rn;else data.releaseNotes.unshift(rn);
  saveData();
})();

// Every Ideas mutation now returns through the current v2.1.2 list/card renderer.
renderIdeasV21=renderIdeasV212;
pages.brain=renderIdeasV212;renderIdeas=renderIdeasV212;

function deleteProject(id){
  const ix=data.projects.findIndex(p=>p.id===id);if(ix<0)return;
  if(!confirm('이 프로젝트를 휴지통으로 이동할까요? 관련 기록은 보존됩니다.'))return;
  const [p]=data.projects.splice(ix,1);p.trashedAt=new Date().toISOString();p.previousStatus=p.status;data.projectsTrash.unshift(p);
  saveData();go('projects');toast('프로젝트를 휴지통으로 이동했습니다.');
}
function restoreProjectV214(id){const ix=data.projectsTrash.findIndex(p=>p.id===id);if(ix<0)return;const [p]=data.projectsTrash.splice(ix,1);p.status=p.previousStatus||'Planning';delete p.previousStatus;delete p.trashedAt;data.projects.unshift(p);saveData();renderProjectsV214();toast('프로젝트를 복원했습니다.');}
function purgeProjectV214(id){if(!confirm('프로젝트를 완전히 삭제할까요? 이 작업은 되돌릴 수 없습니다.'))return;data.projectsTrash=data.projectsTrash.filter(p=>p.id!==id);saveData();renderProjectTrashV214();toast('프로젝트를 완전히 삭제했습니다.');}
function emptyProjectTrashV214(){if(!data.projectsTrash.length)return;if(!confirm(`휴지통의 ${data.projectsTrash.length}개 프로젝트를 모두 완전 삭제할까요?`))return;data.projectsTrash=[];saveData();renderProjectTrashV214();toast('프로젝트 휴지통을 비웠습니다.');}
function renderProjectTrashV214(){
  $('#pageName').textContent='Projects / Trash';
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">SOFT DELETE</span><h1>Project Trash</h1><p>삭제한 프로젝트와 연결 기록을 복원하거나 완전히 삭제합니다.</p></div><div class="page-actions"><button class="tab" onclick="renderProjectsV214()">← Projects</button><button class="tab danger" onclick="emptyProjectTrashV214()">휴지통 비우기</button></div></div><div class="project-classic-grid project-grid-213">${data.projectsTrash.map(p=>`<article class="project-classic-card project-card-213"><div class="project-card-top"><div><h3>${esc(p.name)}</h3><div class="project-card-meta">${esc(p.desc||'')}</div></div><span class="status paused">Trash</span></div><div class="project-progress"><span style="width:${Math.max(0,Math.min(100,p.progress||0))}%"></span></div><div class="project-card-stats"><div class="project-card-stat"><small>Previous</small><strong>${esc(p.previousStatus||p.status||'-')}</strong></div><div class="project-card-stat"><small>Deleted</small><strong>${esc((p.trashedAt||'').slice(0,10))}</strong></div></div><div class="project-trash-actions-214"><button onclick="restoreProjectV214('${p.id}')">복원</button><button class="danger" onclick="purgeProjectV214('${p.id}')">완전 삭제</button></div></article>`).join('')||emptyLine('휴지통이 비어 있습니다.')}</div>`;
}
function renderProjectsV214(){
  const statuses=['All','Planning','Ready','Active','Review','Maintenance','Paused','Completed','Archived'];
  const f=data.projectFilter211||'All',list=data.projects.filter(p=>f==='All'||p.status===f),count=s=>s==='All'?data.projects.length:data.projects.filter(p=>p.status===s).length;
  $('#pageName').textContent='Projects';
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">Project overview</span><h1>Projects</h1><p>확정된 v2.1 카드 UI에서 프로젝트를 운영합니다.</p></div><div class="page-actions"><button class="primary-btn compact" onclick="openProjectWizard()">+ 프로젝트 생성</button><button class="tab" onclick="renderProjectTrashV214()">휴지통 ${data.projectsTrash.length?`(${data.projectsTrash.length})`:''}</button></div><div class="project-filter-shell-213"><div class="section-tabs">${statuses.map(s=>`<button class="tab ${f===s?'active':''}" onclick="data.projectFilter211='${s}';saveData();renderProjectsV214()">${s} ${count(s)}</button>`).join('')}</div></div><div class="project-classic-grid project-grid-213">${list.map(p=>`<article class="project-classic-card project-card-213" onclick="openProject('${p.id}')"><div class="project-card-top"><div><h3>${esc(p.name)}</h3><div class="project-card-meta">${esc(p.desc||'')}</div></div><span class="status ${p.status==='Paused'?'paused':''}">${esc(p.status)}</span></div><div class="project-progress"><span style="width:${Math.max(0,Math.min(100,p.progress||0))}%"></span></div><div class="project-card-stats"><div class="project-card-stat"><small>Current</small><strong>${esc(p.current||'-')}</strong></div><div class="project-card-stat"><small>Next</small><strong>${esc(p.next||'-')}</strong></div></div><div class="project-card-bottom"><small>${Number(p.progress||0)}% complete</small><strong>열기 →</strong></div></article>`).join('')||emptyLine('해당 상태의 프로젝트가 없습니다.')}</div>`;
}
pages.projects=renderProjectsV214;renderProjects=renderProjectsV214;

const renderHomeV214=()=>{renderHomeV21();document.querySelectorAll('button').forEach(b=>{if(b.textContent.trim()==='AI Discussion'){b.textContent='Projects';b.onclick=()=>go('projects');}});};
pages.home=renderHomeV214;

if(typeof v211History!=='undefined'&&!v211History.some(x=>x[0]==='v2.1.4'))v211History.push(['v2.1.4','Feature Simplification & State Stability','AI Discussion 제거·Ideas State 유지·Project Trash·Feature Minimalism']);
function renderSystemV214(){renderSystemV213();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.4 · Feature Simplification & State Stability</p><small>Fewer overlaps. Stable user state. Recoverable data.</small>'}
pages.system=renderSystemV214;
document.title='Studio OS v2.1.4 · Feature Simplification & State Stability';
const brand214=document.querySelector('.brand small');if(brand214)brand214.textContent='Feature Simplification · v2.1.4';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV214();

/* === Studio OS v2.1.5 Phase 1 Final · Idea Lifecycle Stability === */
(function initV215(){
  data.experiences=data.experiences||[];
  data.releaseNotes=data.releaseNotes||[];
  data.constitution=data.constitution||[];
  data.ideaView=data.ideaView||'List';

  const expRows=[
    {id:'EXP-028',area:'Data / Workflow',severity:'High',type:'Rework',title:'Ideas와 Experience에 동일 항목 중복 표시',problem:'Experience로 전환한 아이디어가 Ideas와 Experience 양쪽에 동시에 남아 단일 원본 원칙이 깨짐',lesson:'Experience 전환은 복사가 아니라 Lifecycle 상태 이동으로 처리해야 한다.',constitutionId:'C-DATA-003',project:'Studio OS',status:'Solved',date:'2026-08-05'},
    {id:'EXP-029',area:'UI / UX',severity:'Medium',type:'Dislike',title:'Ideas 리스트 행 높이가 긴 텍스트에 따라 증가',problem:'프로젝트명이나 제목이 길면 특정 행만 높아져 리스트 스캔성이 저하됨',lesson:'업무용 리스트는 행 높이와 컬럼 폭을 고정하고 상세 내용은 Detail에서 제공한다.',constitutionId:'C-UI-012',project:'Studio OS',status:'Solved',date:'2026-08-05'}
  ];
  expRows.forEach(x=>{if(!data.experiences.some(e=>e.id===x.id))data.experiences.push({...x,kind:x.type,cause:x.problem,prevention:x.lesson,createdAt:new Date().toISOString()})});

  const rules=[
    {id:'C-DATA-003',title:'Single Source Lifecycle 원칙',chapter:'Data',status:'Approved',content:'Idea, Experience, Archive, Trash는 동일 항목의 복사본을 만들지 않고 하나의 원본 데이터가 Lifecycle 상태에 따라 이동하도록 관리한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-EXP-003'],note:'v2.1.5',favorite:true,updated:'2026-08-05'},
    {id:'C-UI-012',title:'업무 리스트 고정 행 원칙',chapter:'UI',status:'Approved',content:'업무용 리스트는 동일한 행 높이와 컬럼 폭을 유지한다. 넘치는 텍스트는 말줄임표로 표시하며 전체 내용은 상세 화면에서 확인한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-UI-FREEZE-001'],note:'v2.1.5',favorite:true,updated:'2026-08-05'}
  ];
  rules.forEach(r=>{if(!data.constitution.some(x=>x.id===r.id))data.constitution.push(r)});

  if(!data.releaseNotes.some(x=>x.id==='RN-2.1.5'))data.releaseNotes.unshift({
    id:'RN-2.1.5',version:'v2.1.5',date:'2026-08-05',title:'Phase 1 Final · Idea Lifecycle Stability',
    newItems:['Single Source Lifecycle Rule','업무 리스트 고정 행 원칙','Studio OS Phase 1 Final 기준'],
    improved:['Ideas 모든 행 높이·컬럼 폭 통일','긴 제목·프로젝트명 말줄임표','상세 화면 중심 정보 확인'],
    fixed:['EXP-028 Experience 전환 후 중복 표시','EXP-029 긴 텍스트로 인한 리스트 높이 변화'],
    removed:['Experience 전환 시 Ideas 원본 복사 유지'],experiences:['EXP-028','EXP-029']
  });
  saveData();
})();

function v215IdeaLists(){
  const source=v21IdeaFilter==='Trash'?(data.ideasTrash||[]):(data.ideas||[]).filter(i=>v21IdeaFilter==='Archived'?i.stage==='Archived':i.stage!=='Archived');
  const q=(data.ideaSearch||'').trim().toLowerCase();
  return source.filter(i=>!q||[i.text,i.project,i.category,i.stage,...(i.tags||[])].join(' ').toLowerCase().includes(q));
}

function renderIdeasV215(){
  data.ideaView=data.ideaView||'List';
  const list=v215IdeaLists();
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">IDEA LIFECYCLE</span><h1>Ideas</h1><p>리스트에서 빠르게 찾고 전체 내용은 상세 화면에서 확인합니다.</p></div><button class="primary-btn compact" onclick="openIdeaV21()">+ 아이디어 등록</button></div>
  <div class="idea-toolbar-v21 idea-toolbar-212"><div class="segmented-v21">${['Active','Archived','Trash'].map(x=>`<button class="${v21IdeaFilter===x?'active':''}" onclick="v21IdeaFilter='${x}';renderIdeasV215()">${x}</button>`).join('')}</div><input placeholder="아이디어·프로젝트·태그 검색" value="${esc(data.ideaSearch||'')}" oninput="data.ideaSearch=this.value;saveData();renderIdeasV215()"><div class="segmented-v21"><button class="${data.ideaView==='List'?'active':''}" onclick="data.ideaView='List';saveData();renderIdeasV215()">≣ List</button><button class="${data.ideaView==='Card'?'active':''}" onclick="data.ideaView='Card';saveData();renderIdeasV215()">□ Card</button></div></div>
  ${data.ideaView==='Card'?`<div class="idea-grid-v21">${list.map(i=>ideaCardV21(i,v21IdeaFilter==='Trash')).join('')||emptyLine('아이디어가 없습니다.')}</div>`:`<section class="panel idea-list-211 idea-list-212 idea-list-215"><div class="idea-list-head-211"><span>제목</span><span>Type</span><span>Project</span><span>Status</span><span>Date</span><span></span></div>${list.map(i=>`<div class="idea-list-row-211 idea-list-row-212 idea-list-row-215"><button class="idea-title-211" onclick="${v21IdeaFilter==='Trash'?`restoreIdeaV21('${i.id}')`:`openIdeaV21('${i.id}')`}"><strong title="${esc(i.text)}">${esc(i.text)}</strong></button><span class="col-type-212 ellipsis-215" title="${esc(i.category||'Idea')}">${esc(i.category||'Idea')}</span><span class="col-project-212 ellipsis-215" title="${esc(i.project||'미분류')}">${esc(i.project||'미분류')}</span><span class="col-status-212 ellipsis-215" title="${esc(i.stage||'Captured')}">${esc(i.stage||'Captured')}</span><time>${esc(i.date||'오늘')}</time><button class="idea-action-212" onclick="openIdeaMoreV21('${i.id}',${v21IdeaFilter==='Trash'})" aria-label="아이디어 작업">•••</button></div>`).join('')||emptyLine('아이디어가 없습니다.')}</section>`}`;
}

/* Experience 전환은 복제가 아니라 Ideas에서 Experience로 이동 */
function ideaToFailureV21(id){
  const ix=data.ideas.findIndex(x=>x.id===id);if(ix<0)return;
  const [i]=data.ideas.splice(ix,1);
  data.experiences=data.experiences||[];
  const nextNo=Math.max(29,...data.experiences.map(x=>Number(String(x.id||'').match(/\d+/)?.[0]||0)))+1;
  data.experiences.unshift({id:`EXP-${String(nextNo).padStart(3,'0')}`,title:i.text,area:'Common',severity:'Medium',kind:'Lesson',type:'Lesson',project:i.project||'Common',problem:i.text,cause:'Idea Lifecycle에서 Experience로 전환',lesson:'다음 프로젝트 판단 기준으로 활용',prevention:'AI Report의 관련 Experience에 포함',status:'Active',sourceIdeaId:i.id,sourceCategory:i.category||'Idea',createdAt:new Date().toISOString(),date:todayISO()});
  saveData();renderIdeasV215();toast('Experience로 이동했습니다. Ideas에는 중복 표시되지 않습니다.');
}

/* 기존 CRUD가 어떤 렌더 함수를 호출해도 최종 v2.1.5 화면과 View State 유지 */
renderIdeasV21=renderIdeasV215;
renderIdeasV211=renderIdeasV215;
renderIdeasV212=renderIdeasV215;
renderIdeas=renderIdeasV215;
pages.brain=renderIdeasV215;

if(typeof v211History!=='undefined'&&!v211History.some(x=>x[0]==='v2.1.5'))v211History.push(['v2.1.5','Phase 1 Final · Idea Lifecycle Stability','Ideas 고정 행·말줄임·Single Source Experience 전환']);
function renderSystemV215(){renderSystemV214();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.5 · Phase 1 Final</p><small>Operate projects. Keep one source. Learn from feedback.</small>'}
pages.system=renderSystemV215;
document.title='Studio OS v2.1.5 · Phase 1 Final';
const brand215=document.querySelector('.brand small');if(brand215)brand215.textContent='Phase 1 Final · v2.1.5';

/* === Studio OS v2.1.6 · UI Finishing Patch === */
(function initV216(){
  data.experiences=data.experiences||[];
  data.releaseNotes=data.releaseNotes||[];
  data.constitution=data.constitution||[];
  const rows=[
    {id:'EXP-030',area:'UI / UX',severity:'High',type:'Failure',title:'Ideas Trash Action Menu Inactive',problem:'Trash 목록의 점 3개 버튼이 반응하지 않아 복원과 완전 삭제를 선택할 수 없었음',lesson:'상태별 목록도 동일한 CRUD 이벤트와 대상 ID를 가져야 한다.',constitutionId:'C-UI-013',project:'Studio OS',status:'Solved',date:'2026-08-05'},
    {id:'EXP-031',area:'UI / UX',severity:'Medium',type:'Dislike',title:'Patch Center Form Alignment',problem:'프로젝트 라벨과 드롭다운이 붙어 있고 폼 크기와 정렬이 일관되지 않음',lesson:'폼은 라벨·입력·액션을 독립된 행으로 구성하고 공통 높이와 간격을 사용한다.',constitutionId:'C-UI-013',project:'Studio OS',status:'Solved',date:'2026-08-05'},
    {id:'EXP-032',area:'UI / UX',severity:'Medium',type:'Dislike',title:'Native File Upload UI Mismatch',problem:'브라우저 기본 파일 선택 입력이 Studio OS 카드 디자인과 어울리지 않음',lesson:'네이티브 파일 입력은 숨기고 동일한 Form Token을 적용한 선택 UI를 제공한다.',constitutionId:'C-UI-013',project:'Studio OS',status:'Solved',date:'2026-08-05'},
    {id:'EXP-033',area:'UI / UX',severity:'Low',type:'Rework',title:'Import History Empty State Line Break',problem:'빈 상태 문구가 단어 중간에서 줄바꿈되어 읽기 어려움',lesson:'짧은 Empty State 문구는 한 줄과 한국어 keep-all을 기본으로 한다.',constitutionId:'C-UI-013',project:'Studio OS',status:'Solved',date:'2026-08-05'}
  ];
  rows.forEach(x=>{if(!data.experiences.some(e=>e.id===x.id))data.experiences.push({...x,kind:x.type,cause:x.problem,prevention:x.lesson,createdAt:new Date().toISOString()})});
  if(!data.constitution.some(x=>x.id==='C-UI-013'))data.constitution.push({id:'C-UI-013',title:'UI Finishing Rule',chapter:'UI',status:'Approved',content:'기능 변경 없이 여백, 정렬, 줄바꿈, Typography, 입력폼, 버튼, Dialog, Empty State를 다듬는 수정은 UI Finishing Patch로 관리한다. 확정된 전체 레이아웃은 변경하지 않는다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-UI-012','C-UI-FREEZE-001'],note:'v2.1.6',favorite:true,updated:'2026-08-05'});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.1.6'))data.releaseNotes.unshift({id:'RN-2.1.6',version:'v2.1.6',date:'2026-08-05',title:'UI Finishing Patch',newItems:['Trash 복원·완전 삭제 메뉴','커스텀 Patch File 선택 UI'],improved:['Patch Center 프로젝트 선택 폼 정렬','Import History Empty State'],fixed:['EXP-030','EXP-031','EXP-032','EXP-033'],removed:[],experiences:['EXP-030','EXP-031','EXP-032','EXP-033']});
  saveData();
})();

/* Trash 액션은 목록 행을 즉시 복원하지 않고 명시적 메뉴로 선택 */
openIdeaMoreV21=function(id,trash){
  if(trash){
    openModal('휴지통 아이디어',`<div class="modal-action-list-v21"><button onclick="closeModal();restoreIdeaV21('${id}')">복원</button><button class="danger" onclick="closeModal();purgeIdeaV216('${id}')">완전 삭제</button></div><p class="modal-help-v21">완전 삭제한 아이디어는 복구할 수 없습니다.</p>`,()=>closeModal());
    return;
  }
  openModal('아이디어 작업',`<div class="modal-action-list-v21"><button onclick="closeModal();openIdeaV21('${id}')">수정</button><button onclick="closeModal();promoteIdeaV21('${id}')">프로젝트로 승격</button><button onclick="closeModal();ideaToFailureV21('${id}')">Experience로 이동</button><button onclick="closeModal();archiveIdeaV21('${id}')">Archive 전환</button><button class="danger" onclick="closeModal();trashIdeaV21('${id}')">휴지통으로 이동</button></div>`,()=>closeModal());
};
function purgeIdeaV216(id){
  openModal('아이디어 완전 삭제',`<p class="confirm-copy-v216"><strong>이 아이디어를 완전히 삭제하시겠습니까?</strong><br>삭제 후에는 복구할 수 없습니다.</p>`,()=>{data.ideasTrash=(data.ideasTrash||[]).filter(x=>x.id!==id);saveData();closeModal();renderIdeasV215();toast('아이디어를 완전히 삭제했습니다.');});
  const ok=document.querySelector('#modal button.primary-btn, #modal .modal-actions button:last-child');if(ok)ok.textContent='완전 삭제';
}

/* Patch Center 폼과 파일 선택 UI */
renderPatchCenter19=function(){
  const p=data.projects.find(x=>x.name==='우리집캐디')||data.projects[0];
  $('#experienceBody19').innerHTML=`<div class="patch-grid-v19 patch-grid-216"><section class="panel"><span class="eyebrow">Patch Protocol</span><h3>AI 제작 결과를 OS로 회수</h3><div class="patch-flow-v19"><span>AI Report Export</span><b>→</b><span>GPT 제작</span><b>→</b><span>Patch 반환</span><b>→</b><span>Preview·Import</span></div><div class="patch-project-field-216"><label for="patchProject19">프로젝트</label><select id="patchProject19">${data.projects.map(x=>`<option value="${x.id}" ${x.id===p.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></div><div class="patch-actions-v19 patch-actions-216"><button class="tab" onclick="downloadPatch19('Development')">Development Patch 생성</button><button class="primary-btn compact" onclick="downloadPatch19('Release')">Release Patch 생성</button></div><small>프로젝트 버전은 유지하고 파일명만 StudioOS_Patch_프로젝트_버전_유형으로 구분합니다.</small></section><section class="panel patch-import-v19 patch-import-216"><span class="eyebrow">Import</span><h3>Patch 적용</h3><p>패치를 먼저 검증하고 변경 내역을 미리 본 뒤 적용합니다. 동일 Patch ID는 중복 적용하지 않습니다.</p><input id="patchFile19" type="file" accept=".json,.studioospatch.json,application/json" hidden><button id="patchFileButton216" class="file-picker-216" onclick="$('#patchFile19').click()"><span>Patch File</span><strong>파일 선택</strong><small id="patchFileName216">선택된 파일이 없습니다.</small></button><button id="patchPreviewButton216" class="primary-btn compact patch-preview-button-216" disabled onclick="previewPatchFile19()">Patch Preview</button><div id="patchPreview19" class="patch-preview-v19 patch-preview-216">패치 파일을 선택하세요.</div></section><section class="panel"><span class="eyebrow">Supported updates</span><h3>한 번에 반영되는 항목</h3><div class="patch-supported-v19"><span>Project</span><span>Workspace</span><span>Decision</span><span>History</span><span>Assets</span><span>Constitution</span><span>Experience</span><span>Roadmap</span></div></section></div>`;
  const input=$('#patchFile19');
  input.onchange=()=>{const f=input.files&&input.files[0],name=$('#patchFileName216'),btn=$('#patchPreviewButton216');if(f){name.textContent=f.name;name.title=f.name;$('#patchFileButton216 strong').textContent='다시 선택';btn.disabled=false;}else{name.textContent='선택된 파일이 없습니다.';$('#patchFileButton216 strong').textContent='파일 선택';btn.disabled=true;}};
};

renderPatchHistory19=function(){
  const list=data.patchImports||[];
  $('#experienceBody19').innerHTML=`<div class="panel"><span class="eyebrow">Audit trail</span><h3>Patch Import History</h3>${list.length?`<div class="patch-history-v19">${list.map(x=>`<div><span>${esc(x.type)}</span><strong>${esc(x.project)} · v${esc(x.version)}</strong><small>${esc(x.date)}</small><p>${x.counts.rules} Rules · ${x.counts.assets} Assets · ${x.counts.experiences} Experiences</p></div>`).join('')}</div>`:`<div class="empty-state-216"><strong>아직 가져온 패치가 없습니다.</strong><span>Patch Center에서 패치를 적용하면 이력이 자동으로 저장됩니다.</span></div>`}</div>`;
};

if(typeof v211History!=='undefined'&&!v211History.some(x=>x[0]==='v2.1.6'))v211History.push(['v2.1.6','UI Finishing Patch','Ideas Trash 액션·Patch Center 폼·파일 선택·Empty State 마감']);
function renderSystemV216(){renderSystemV215();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.6 · UI Finishing</p><small>Stable layout. Clear actions. Polished forms.</small>'}
pages.system=renderSystemV216;
document.title='Studio OS v2.1.6 · UI Finishing';
const brand216=document.querySelector('.brand small');if(brand216)brand216.textContent='UI Finishing · v2.1.6';
buildNav();

/* === Studio OS v2.1.7 · Phase 1 Final Completion === */
(function initV217(){
  data.experiences=data.experiences||[];
  data.releaseNotes=data.releaseNotes||[];
  data.constitution=data.constitution||[];
  data.dailyClosingPackages=data.dailyClosingPackages||[];
  const rules=[
    {id:'C-WORK-007',title:'GPT Daily Closing Rule',chapter:'Operations',status:'Approved',content:'대표가 “퇴근하자”라고 선언하거나 Studio OS에서 퇴근을 실행하면 GPT와 Studio OS는 Daily Patch Report, Experience Update, Constitution Update(변경 시), Next Work Plan을 하나의 Daily Closing Package로 정리한다. 대표는 동일 내용을 다시 입력하지 않는다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-WORK-006','C-EXP-001'],note:'Phase 1 Final · Daily Closing',favorite:true,updated:'2026-08-05'},
    {id:'C-WORK-008',title:'OS·GPT 업무 책임 분리 원칙',chapter:'Operations',status:'Approved',content:'Studio OS는 프로젝트 기준선, 일정, 기록, 자산과 사후관리를 담당하고 GPT는 기획 고도화, 실제 제작, 피드백 분석, Experience 추출, 공정률 제안, 패치 및 Daily Closing 문서 작성을 담당한다. 대표는 방향 결정과 최종 승인을 담당한다.',scope:'전체 프로젝트',projects:['Studio OS','우리집캐디','SAMS','BPM 검색도우미'],related:['C-WORK-007'],note:'OS는 운영, GPT는 제작',favorite:true,updated:'2026-08-05'},
    {id:'C-PHASE-001',title:'Studio OS Phase 1 완료 기준',chapter:'Operations',status:'Approved',content:'Dashboard, Projects, Ideas, Assets, Roadmap, Experience, Constitution, Patch Center, Work Log, 출퇴근, Daily Closing Package가 운영 가능한 상태가 되면 Studio OS Phase 1을 완료로 선언한다. 이후에는 실제 프로젝트 운영에서 검증된 개선만 OS에 반영한다.',scope:'Studio OS',projects:['Studio OS'],related:['C-WORK-007','C-WORK-008','C-UI-013'],note:'v2.1.7 Phase 1 Final',favorite:true,updated:'2026-08-05'}
  ];
  rules.forEach(r=>{const i=data.constitution.findIndex(x=>x.id===r.id);if(i<0)data.constitution.push(r);else data.constitution[i]={...data.constitution[i],...r};});
  const exps=[
    {id:'EXP-035',area:'Workflow',severity:'High',type:'Improvement',title:'Daily Closing Package 부재',problem:'하루 작업이 끝나도 보고·Experience·칙·다음 작업을 대표가 다시 정리해야 했음',lesson:'퇴근을 업무 기록 생성의 마지막 단계로 정의하고 표준 문서를 자동 생성한다.',constitutionId:'C-WORK-007',project:'Studio OS',status:'Solved',date:'2026-08-05'},
    {id:'EXP-036',area:'Workflow',severity:'High',type:'Lesson',title:'OS와 GPT 업무 책임 불명확',problem:'OS에서 직접 개발할지 GPT가 제작하고 OS가 관리할지 역할이 혼재했음',lesson:'OS는 운영, GPT는 제작, 대표는 승인으로 역할을 분리한다.',constitutionId:'C-WORK-008',project:'Studio OS',status:'Solved',date:'2026-08-05'},
    {id:'EXP-037',area:'Studio OS',severity:'Medium',type:'Decision',title:'Phase 1 종료 기준 부재',problem:'기능이 계속 추가되어 실제 프로젝트 운영 전환 시점이 불명확했음',lesson:'Daily Closing까지 포함한 운영 기반 완성을 Phase 1 종료 기준으로 고정한다.',constitutionId:'C-PHASE-001',project:'Studio OS',status:'Solved',date:'2026-08-05'}
  ];
  exps.forEach(x=>{if(!data.experiences.some(e=>e.id===x.id))data.experiences.push({...x,kind:x.type,cause:x.problem,prevention:x.lesson,createdAt:new Date().toISOString()})});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.1.7'))data.releaseNotes.unshift({id:'RN-2.1.7',version:'v2.1.7',date:'2026-08-05',title:'Phase 1 Final Completion',newItems:['GPT Daily Closing Rule','Daily Closing Package','OS·GPT Responsibility Rule','Phase 1 Complete 기준'],improved:['퇴근 Work Log','Patch Center Daily Closing 생성','Roadmap Milestone'],fixed:['EXP-035','EXP-036','EXP-037'],removed:[],experiences:['EXP-035','EXP-036','EXP-037']});
  saveData();
})();

function v217TodayKey(){return new Date().toISOString().slice(0,10);}
function v217ClosingDocuments(log){
  const date=log?.date||v217TodayKey();
  const events=(data.workEvents||[]).filter(e=>String(e.date||'').slice(0,10)===date);
  const founder=(data.founderLogs||[]).filter(x=>String(x.date||'').slice(0,10)===date);
  const solved=(data.experiences||[]).filter(x=>String(x.date||'')===date);
  const changedRules=(data.constitution||[]).filter(x=>String(x.updated||'')===date);
  const completed=(data.tasks||[]).filter(t=>t.done&&String(t.completedAt||t.updatedAt||'').slice(0,10)===date);
  const progress='Phase 1 Complete';
  const daily=[
    '# Studio OS Daily Patch Report','',`- Date: ${date}`,'- Project: Studio OS','- Version: v2.1.7','- Status: WORK COMPLETE','',
    '## 오늘 작업',...(events.length?events.map(e=>`- [${e.project||'Studio OS'}] ${e.title}`):['- Studio OS v2.1.7 Phase 1 Final Completion']),
    '', '## 완료 Task',...(completed.length?completed.map(t=>`- ${t.title}`):['- 기록된 완료 Task 없음']),
    '', '## 대표 업무일지',...(founder.length?founder.map(x=>`- [${x.project||'Studio OS'}] ${x.work||x.title||''}`):['- 별도 업무일지 없음']),
    '', '## 진행 상태',`- Studio OS: ${progress}`,'- 다음 중심: 실제 프로젝트 운영',
    '', '## Closing','- Daily Closing Package 생성','- Work Log 종료','- 퇴근 완료'
  ].join('\n');
  const experience=['# Experience Update','',`- Date: ${date}`,'',...(solved.length?solved.map(x=>`## ${x.id} · ${x.title}\n- 분야: ${x.area||'Common'}\n- 중요도: ${x.severity||'Medium'}\n- 문제: ${x.problem||''}\n- 교훈: ${x.lesson||''}\n- 상태: ${x.status||'Active'}\n`):['오늘 등록된 Experience가 없습니다.'])].join('\n');
  const constitution=['# Constitution Update','',`- Date: ${date}`,'',...(changedRules.length?changedRules.map(x=>`## ${x.id} · ${x.title}\n${x.content}\n`):['오늘 변경된 Constitution이 없습니다.'])].join('\n');
  const next=['# Next Work Plan','',`- Generated: ${date}`,'','## Priority 1','- Studio OS v2.1.7 최종 운영 확인','','## Priority 2','- 우리집캐디 실제 개발 재개','','## Operating Rule','- 실제 프로젝트에서 검증된 개선만 Studio OS에 역반영'].join('\n');
  return {daily,experience,constitution,next};
}
function downloadDailyClosingPackageV217(log){
  const docs=v217ClosingDocuments(log),date=log?.date||v217TodayKey();
  downloadText(`Daily_Patch_Report_${date}.md`,docs.daily,'text/markdown');
  setTimeout(()=>downloadText(`Experience_Update_${date}.md`,docs.experience,'text/markdown'),180);
  setTimeout(()=>downloadText(`Constitution_Update_${date}.md`,docs.constitution,'text/markdown'),360);
  setTimeout(()=>downloadText(`Next_Work_Plan_${date}.md`,docs.next,'text/markdown'),540);
  data.dailyClosingPackages.unshift({id:uid('DCP'),date,version:'2.1.7',files:4,createdAt:new Date().toISOString()});
  data.dailyClosingPackages=data.dailyClosingPackages.slice(0,90);saveData();
  toast('Daily Closing Package 4개 파일을 생성했습니다.');
}
function openDailyClosingV217(log){
  const docs=v217ClosingDocuments(log);
  openModal('Daily Closing Package',`<div class="phase-final-badge-217"><strong>PHASE 1 COMPLETE</strong><span>Studio OS v2.1.7</span></div><p>퇴근 기록과 오늘의 운영 변경사항을 4개의 Markdown 파일로 생성합니다.</p><div class="closing-files-217"><span>Daily Patch Report</span><span>Experience Update</span><span>Constitution Update</span><span>Next Work Plan</span></div><label>미리보기<textarea rows="12" readonly>${esc(docs.daily)}</textarea></label><div class="page-actions"><button class="primary-btn" onclick='downloadDailyClosingPackageV217(${JSON.stringify(log||null)});closeModal()'>4개 파일 생성</button></div>`,()=>closeModal());
}

/* 퇴근 시 Work Log 저장 후 Daily Closing Package 생성 단계로 연결 */
clockOutV191=function(){
  if(data.workMode.status!=='Working')return toast('현재 근무 중이 아닙니다.');
  const now=new Date(),start=new Date(data.workMode.clockIn||now),mins=Math.max(0,Math.round((now-start)/60000));
  const completed=Object.values(data.workspaces||{}).reduce((s,w)=>s+(w.tasks||[]).filter(t=>t.done).length,0);
  const activity=(data.workEvents||[]).filter(e=>String(e.date||'').slice(0,10)===todayISO()).length;
  const log={id:uid('WL'),date:todayISO(),clockIn:data.workMode.clockIn,clockOut:now.toISOString(),minutes:mins,completed,activity,phase:'Phase 1 Complete'};
  data.workMode.logs.unshift(log);data.workMode.logs=data.workMode.logs.slice(0,60);data.workMode.status='Off';data.workMode.clockOut=now.toISOString();
  data.memories.unshift({id:uid('m'),title:`Daily Work Log · ${todayISO()}`,detail:`근무 ${mins}분 · 완료 ${completed}건 · 활동 ${activity}건 · Daily Closing 대기`,type:'Work Log',date:'방금'});
  saveData();renderHome();openDailyClosingV217(log);toast('퇴근 처리했습니다. Daily Closing 파일을 생성하세요.');
};

/* Patch Center에서 퇴근 파일을 다시 생성할 수 있도록 제공 */
const renderPatchCenterV216Base=renderPatchCenter19;
renderPatchCenter19=function(){
  renderPatchCenterV216Base();
  const action=document.querySelector('.patch-actions-216');
  if(action&&!action.querySelector('.daily-closing-btn-217')){
    const b=document.createElement('button');b.className='tab daily-closing-btn-217';b.textContent='Daily Closing 생성';b.onclick=()=>openDailyClosingV217((data.workMode.logs||[])[0]||null);action.appendChild(b);
  }
};

if(typeof v211History!=='undefined'&&!v211History.some(x=>x[0]==='v2.1.7'))v211History.push(['v2.1.7','Phase 1 Final Completion','Daily Closing Package·OS/GPT 책임 칙·Phase 1 Complete']);
const renderRoadmapV216Base=renderRoadmap;
renderRoadmap=function(){
  if(typeof renderRoadmap211==='function')renderRoadmap211();else renderRoadmapV216Base();
  const current=document.querySelector('.current-roadmap');if(current)current.classList.remove('current-roadmap');
  const rows=document.querySelector('.roadmap-line');
  if(rows&&!rows.textContent.includes('v2.1.7'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap phase-final-row-217"><strong>v2.1.7 · Phase 1 Final — 현재</strong><p>Daily Closing Package, OS·GPT 역할 분담, Experience 자동 등록과 운영 기반 완성</p></div><div class="roadmap-row"><strong>Phase 2 · Project Operations</strong><p>우리집캐디·SAMS·BPM 등 실제 프로젝트 중심 운영, 검증된 개선만 OS에 반영</p></div>');
};
pages.roadmap=renderRoadmap;

function renderSystemV217(){renderSystemV216();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.7 · Phase 1 Final</p><small>Phase 1 Complete · Ready for Project Development</small>';const grid=document.querySelector('.system-grid');if(grid&&!grid.textContent.includes('Phase 1 Status'))grid.insertAdjacentHTML('afterbegin','<section class="panel phase-status-217"><h3>Phase 1 Status</h3><strong>COMPLETE</strong><p>운영체계 완성 · 실제 프로젝트 운영 전환</p></section>');}
pages.system=renderSystemV217;
document.title='Studio OS v2.1.7 · Phase 1 Final';
const brand217=document.querySelector('.brand small');if(brand217)brand217.textContent='Phase 1 Complete · v2.1.7';
buildNav();


/* =========================================================
   Studio OS v2.1.8 · Daily Closing Import Patch
   ========================================================= */
(function initV218(){
  data.dailyClosingImports=data.dailyClosingImports||[];
  const rules=[
    {id:'C-WORK-009',title:'Daily Closing Import 원칙',chapter:'Operations',status:'Approved',content:'GPT가 생성한 Daily Closing 전용 파일은 Patch Center에서 Preview 후 Import한다. Import 시 Work Log, Experience, Constitution 변경, 다음 작업과 Import History를 중복 없이 일괄 반영한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-WORK-007','C-PATCH-001'],note:'schema: studio-os-daily-closing-v1',favorite:true,updated:'2026-08-05'}
  ];
  rules.forEach(r=>{if(!data.constitution.some(x=>x.id===r.id))data.constitution.unshift(r)});
  if(!data.experiences.some(x=>x.id==='EXP-038'))data.experiences.unshift({id:'EXP-038',area:'Workflow',severity:'High',type:'Improvement',title:'Daily Closing 파일 업로드 경로 부재',problem:'GPT가 퇴근 파일을 생성해도 Studio OS에서 읽고 반영할 Import 기능이 없었음',lesson:'생성 파일과 Import 기능은 항상 하나의 완결된 흐름으로 함께 제공한다.',constitutionId:'C-WORK-009',project:'Studio OS',status:'Solved',date:'2026-08-05'});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.1.8'))data.releaseNotes.unshift({id:'RN-2.1.8',version:'v2.1.8',date:'2026-08-05',title:'Daily Closing Import Patch',newItems:['Daily Closing 전용 .json 생성','Patch Center Daily Closing Preview·Import','Work Log·Experience·Constitution·Next Work 일괄 반영'],improved:['퇴근 파일 생성·업로드 완결 흐름'],fixed:['EXP-038'],removed:[],experiences:['EXP-038']});
  saveData();
})();

function dailyClosingPayloadV218(log){
  const docs=v217ClosingDocuments(log),date=log?.date||v217TodayKey();
  const experiences=(data.experiences||[]).filter(x=>String(x.date||'')===date);
  const rules=(data.constitution||[]).filter(x=>String(x.updated||'')===date);
  const founder=(data.founderLogs||[]).filter(x=>String(x.date||'').slice(0,10)===date);
  return {
    schema:'studio-os-daily-closing-v1',
    packageId:`DCP-${date}-StudioOS-v2.1.8`,
    generatedAt:new Date().toISOString(),
    date,
    project:'Studio OS',
    version:'2.1.8',
    status:'WORK COMPLETE',
    workLog:log||null,
    reports:docs,
    founderLogs:founder,
    experiences,
    constitution:rules,
    nextWork:[
      {title:'우리집캐디 실제 개발 재개',project:'우리집캐디',status:'Next',priority:'High'},
      {title:'Studio OS 운영 중 검증된 개선만 반영',project:'Studio OS',status:'Next',priority:'Medium'}
    ]
  };
}
function downloadDailyClosingImportV218(log){
  const p=dailyClosingPayloadV218(log),name=`StudioOS_DailyClosing_${p.date}.dailyclosing.json`;
  downloadBlob(name,JSON.stringify(p,null,2),'application/json');
  toast('Studio OS 업로드용 퇴근 파일을 생성했습니다.');
}
const openDailyClosingV217Base218=openDailyClosingV217;
openDailyClosingV217=function(log){
  const docs=v217ClosingDocuments(log);
  openModal('Daily Closing Package',`<div class="phase-final-badge-217"><strong>DAILY CLOSING</strong><span>Studio OS v2.1.8</span></div><p>Studio OS에 바로 업로드할 수 있는 전용 파일을 생성합니다.</p><div class="closing-files-217"><span>Work Log</span><span>Experience</span><span>Constitution</span><span>Next Work</span></div><label>미리보기<textarea rows="12" readonly>${esc(docs.daily)}</textarea></label><div class="page-actions"><button class="primary-btn" onclick='downloadDailyClosingImportV218(${JSON.stringify(log||null)});closeModal()'>OS 업로드 파일 생성</button><button class="tab" onclick='downloadDailyClosingPackageV217(${JSON.stringify(log||null)})'>Markdown 4종 저장</button></div>`,()=>closeModal());
};

function renderPatchCenterV218(){
  const p=data.projects.find(x=>x.name==='우리집캐디')||data.projects[0];
  $('#experienceBody19').innerHTML=`<div class="patch-grid-v19 patch-grid-216"><section class="panel"><span class="eyebrow">Patch Protocol</span><h3>AI 제작 결과를 OS로 회수</h3><div class="patch-flow-v19"><span>AI Report</span><b>→</b><span>GPT 제작</span><b>→</b><span>Patch / Closing</span><b>→</b><span>Preview·Import</span></div><div class="patch-project-field-216"><label for="patchProject19">프로젝트</label><select id="patchProject19">${data.projects.map(x=>`<option value="${x.id}" ${x.id===p.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></div><div class="patch-actions-v19 patch-actions-216"><button class="tab" onclick="downloadPatch19('Development')">Development Patch 생성</button><button class="primary-btn compact" onclick="downloadPatch19('Release')">Release Patch 생성</button><button class="tab" onclick="openDailyClosingV217((data.workMode.logs||[])[0]||null)">Daily Closing 생성</button></div><small>프로젝트 패치와 Daily Closing 파일을 같은 Import 영역에서 검증·적용합니다.</small></section><section class="panel patch-import-v19 patch-import-216"><span class="eyebrow">Import</span><h3>Patch / Daily Closing 적용</h3><p><code>.studioospatch.json</code> 또는 <code>.dailyclosing.json</code> 파일을 선택하세요.</p><input id="patchFile19" type="file" accept=".json,.studioospatch.json,.dailyclosing.json,application/json" hidden><button id="patchFileButton216" class="file-picker-216" onclick="$('#patchFile19').click()"><span>Import File</span><strong>파일 선택</strong><small id="patchFileName216">선택된 파일이 없습니다.</small></button><button id="patchPreviewButton216" class="primary-btn compact patch-preview-button-216" disabled onclick="previewPatchFile19()">Preview</button><div id="patchPreview19" class="patch-preview-v19 patch-preview-216">파일을 선택하세요.</div></section><section class="panel"><span class="eyebrow">Supported updates</span><h3>한 번에 반영되는 항목</h3><div class="patch-supported-v19"><span>Project</span><span>Workspace</span><span>Work Log</span><span>Next Work</span><span>Assets</span><span>Constitution</span><span>Experience</span><span>History</span></div></section></div>`;
  const input=$('#patchFile19');input.onchange=()=>{const f=input.files&&input.files[0],name=$('#patchFileName216'),btn=$('#patchPreviewButton216');if(f){name.textContent=f.name;name.title=f.name;$('#patchFileButton216 strong').textContent='다시 선택';btn.disabled=false;}else{name.textContent='선택된 파일이 없습니다.';$('#patchFileButton216 strong').textContent='파일 선택';btn.disabled=true;}};
}
renderPatchCenter19=renderPatchCenterV218;

const previewProjectPatchV218=previewPatchFile19;
previewPatchFile19=async function(){
  const f=$('#patchFile19')?.files?.[0];if(!f)return toast('파일을 선택하세요.');
  try{
    const patch=JSON.parse(await f.text());
    if(patch.schema==='studio-os-project-patch-v1'){
      pendingPatch19=patch;const duplicate=data.patchImports.some(x=>x.patchId===patch.patchId);
      $('#patchPreview19').innerHTML=`<div class="patch-preview-card-v19"><strong>${esc(patch.patchType)} Patch · ${esc(patch.project?.name||'-')}</strong><p>Patch ID: ${esc(patch.patchId)}</p><div><span>Rules ${(patch.rules||[]).length}</span><span>Assets ${(patch.assets||[]).length}</span><span>Experiences ${(patch.experiences||[]).length}</span></div>${duplicate?'<b class="duplicate-v19">이미 적용된 패치입니다.</b>':`<button class="primary-btn compact" onclick="applyPatch19()">검증 후 적용</button>`}</div>`;
      return;
    }
    if(patch.schema!=='studio-os-daily-closing-v1')throw new Error('지원하지 않는 파일 형식입니다.');
    pendingPatch19=patch;const duplicate=data.dailyClosingImports.some(x=>x.packageId===patch.packageId);
    $('#patchPreview19').innerHTML=`<div class="patch-preview-card-v19"><strong>Daily Closing · ${esc(patch.date||'-')}</strong><p>Package ID: ${esc(patch.packageId)}</p><div><span>Work Log ${patch.workLog?1:0}</span><span>Experiences ${(patch.experiences||[]).length}</span><span>Rules ${(patch.constitution||[]).length}</span><span>Next ${(patch.nextWork||[]).length}</span></div>${duplicate?'<b class="duplicate-v19">이미 적용된 퇴근 파일입니다.</b>':`<button class="primary-btn compact" onclick="applyDailyClosingV218()">검증 후 적용</button>`}</div>`;
  }catch(e){pendingPatch19=null;$('#patchPreview19').textContent=`검증 실패: ${e.message}`;}
};
function applyDailyClosingV218(){
  const p=pendingPatch19;if(!p||p.schema!=='studio-os-daily-closing-v1')return;
  if(data.dailyClosingImports.some(x=>x.packageId===p.packageId))return toast('이미 적용된 퇴근 파일입니다.');
  try{
    if(p.workLog&&!data.workMode.logs.some(x=>x.id===p.workLog.id))data.workMode.logs.unshift(p.workLog);
    (p.founderLogs||[]).forEach(x=>upsertV19(data.founderLogs,x));
    (p.experiences||[]).forEach(x=>upsertV19(data.experiences,x));
    (p.constitution||[]).forEach(x=>upsertV19(data.constitution,x));
    (p.nextWork||[]).forEach((x,i)=>{
      const exists=(data.tasks||[]).some(t=>t.title===x.title&&t.project===x.project&&!t.done);
      if(!exists)data.tasks.unshift({id:uid('T'),title:x.title,project:x.project,status:x.status||'Next',priority:x.priority||'Medium',done:false,createdAt:new Date().toISOString(),dueDate:''});
    });
    data.memories.unshift({id:uid('m'),title:`Daily Closing Import · ${p.date}`,detail:`${p.project||'Studio OS'} · Experience ${(p.experiences||[]).length}건 · Rule ${(p.constitution||[]).length}건`,type:'Work Log',date:'방금'});
    data.dailyClosingImports.unshift({packageId:p.packageId,date:p.date,project:p.project||'Studio OS',version:p.version||'-',importedAt:new Date().toLocaleString('ko-KR'),counts:{rules:(p.constitution||[]).length,experiences:(p.experiences||[]).length,next:(p.nextWork||[]).length}});
    data.patchImports.unshift({patchId:p.packageId,type:'Daily Closing',project:p.project||'Studio OS',version:p.version||'-',date:new Date().toLocaleString('ko-KR'),counts:{rules:(p.constitution||[]).length,assets:0,experiences:(p.experiences||[]).length}});
    saveData();pendingPatch19=null;renderExperience19();toast('Daily Closing 파일을 적용했습니다. 퇴근 기록이 저장되었습니다.');
  }catch(e){toast(`Daily Closing 적용 실패: ${e.message}`);}
}

const renderPatchHistoryV218Base=renderPatchHistory19;
renderPatchHistory19=function(){
  const list=data.patchImports||[];
  $('#experienceBody19').innerHTML=`<div class="panel"><span class="eyebrow">Audit trail</span><h3>Import History</h3>${list.length?`<div class="patch-history-v19">${list.map(x=>`<div><span>${esc(x.type)}</span><strong>${esc(x.project)} · v${esc(x.version)}</strong><small>${esc(x.date)}</small><p>${x.counts.rules} Rules · ${x.counts.assets} Assets · ${x.counts.experiences} Experiences</p></div>`).join('')}</div>`:`<div class="empty-state-216"><strong>아직 가져온 파일이 없습니다.</strong><span>Patch Center에서 Patch 또는 Daily Closing 파일을 적용하면 이력이 저장됩니다.</span></div>`}</div>`;
};

if(typeof v211History!=='undefined'&&!v211History.some(x=>x[0]==='v2.1.8'))v211History.push(['v2.1.8','Daily Closing Import Patch','퇴근 파일 Preview·Import와 Work Log·Experience·Constitution·Next Work 일괄 반영']);
const renderRoadmapV218Base=renderRoadmap;
renderRoadmap=function(){renderRoadmapV218Base();const rows=document.querySelector('.roadmap-line');if(rows&&!rows.textContent.includes('v2.1.8'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.1.8 · Daily Closing Import — 현재</strong><p>GPT 퇴근 파일을 Patch Center에서 업로드하여 일일 기록을 일괄 반영</p></div>');};
pages.roadmap=renderRoadmap;
const renderSystemV218Base=pages.system;
pages.system=function(){renderSystemV218Base();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.8 · Daily Closing Import</p><small>Phase 1 Complete · Closing workflow operational</small>';};
document.title='Studio OS v2.1.8 · Daily Closing Import';
const brand218=document.querySelector('.brand small');if(brand218)brand218.textContent='Daily Closing Import · v2.1.8';
buildNav();

// ===== Studio OS v2.1.9 · Daily Closing Result Visibility Patch =====
(function ensureV219(){
  data.dailyClosingResults=data.dailyClosingResults||[];
  // v2.1.8에서 이미 적용된 Daily Closing 이력도 v2.1.9 결과 화면에서 바로 확인할 수 있도록 마이그레이션한다.
  (data.dailyClosingImports||[]).forEach(x=>{
    if(!data.dailyClosingResults.some(r=>r.packageId===x.packageId)){
      data.dailyClosingResults.push({
        id:x.packageId,packageId:x.packageId,date:x.date||todayISO(),project:x.project||'Studio OS',version:x.version||'-',
        importedAt:x.importedAt||'이전 버전에서 적용',status:'Success',
        counts:{workLog:(x.counts&&x.counts.workLog)||1,experiences:(x.counts&&x.counts.experiences)||0,rules:(x.counts&&x.counts.rules)||0,next:(x.counts&&x.counts.next)||0}
      });
    }
  });
  data.dailyClosingResults.sort((a,b)=>String(b.importedAt||b.date).localeCompare(String(a.importedAt||a.date)));
  const rules=[
    {id:'C-PATCH-010',title:'Import 결과 가시성 원칙',chapter:'Operations',status:'Approved',content:'Patch 또는 Daily Closing 적용 직후 성공 여부, 반영 건수와 확인 위치를 결과 화면으로 안내한다. Import History에서도 같은 결과를 다시 열 수 있어야 한다.',scope:'Studio OS',projects:['Studio OS'],related:['C-WORK-009'],note:'v2.1.9 Result Visibility',favorite:true,updated:'2026-08-05'}
  ];rules.forEach(x=>upsertV19(data.constitution,x));
  if(!data.experiences.some(x=>x.id==='EXP-039'))data.experiences.unshift({id:'EXP-039',area:'Workflow',severity:'High',type:'Improvement',title:'Daily Closing Import 결과 위치 불명확',problem:'퇴근 파일 적용은 완료되지만 무엇이 어디에 반영됐는지 즉시 확인하기 어려웠음',lesson:'모든 Import는 적용 직후 결과 요약과 목적지 바로가기를 제공한다.',constitutionId:'C-PATCH-010',project:'Studio OS',status:'Solved',date:'2026-08-05'});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.1.9'))data.releaseNotes.unshift({id:'RN-2.1.9',version:'v2.1.9',date:'2026-08-05',title:'Daily Closing Result Visibility',newItems:['Import Result 화면','Dashboard 오늘 업무 완료 카드','Import History 결과 재열람'],improved:['Daily Closing 반영 위치 안내','중복 Import 안내'],fixed:['EXP-039'],removed:[],experiences:['EXP-039']});
  saveData();
})();

function dailyClosingResultV219(p,counts){
  return {id:p.packageId,packageId:p.packageId,date:p.date||todayISO(),project:p.project||'Studio OS',version:p.version||'-',importedAt:new Date().toLocaleString('ko-KR'),status:'Success',counts:{workLog:counts.workLog||0,experiences:counts.experiences||0,rules:counts.rules||0,next:counts.next||0}};
}
function openDailyClosingResultV219(id){
  const r=(data.dailyClosingResults||[]).find(x=>x.id===id||x.packageId===id);
  if(!r)return toast('결과 기록을 찾을 수 없습니다.');
  openModal('Daily Closing 적용 결과',`<div class="import-result-219"><div class="result-head-219"><span>DAILY CLOSING</span><strong>적용 완료</strong><small>${esc(r.date)} · ${esc(r.project)} · v${esc(r.version)}</small></div><div class="result-counts-219"><div><small>Work Log</small><strong>${r.counts.workLog}</strong><span>건 생성</span></div><div><small>Experience</small><strong>${r.counts.experiences}</strong><span>건 반영</span></div><div><small>Constitution</small><strong>${r.counts.rules}</strong><span>건 반영</span></div><div><small>Next Work</small><strong>${r.counts.next}</strong><span>건 생성</span></div></div><p class="result-time-219">적용 시각 · ${esc(r.importedAt)}</p><div class="result-links-219"><button onclick="closeModal();go('worklog')">Work Log 보기</button><button onclick="closeModal();data.patchUI.tab='experience';saveData();go('experience')">Experience 보기</button><button onclick="closeModal();go('knowledge')">Constitution 보기</button><button onclick="closeModal();go('tasks')">다음 작업 보기</button></div></div>`,()=>closeModal());
}

applyDailyClosingV218=function(){
  const p=pendingPatch19;if(!p||p.schema!=='studio-os-daily-closing-v1')return;
  if(data.dailyClosingImports.some(x=>x.packageId===p.packageId)){
    const old=(data.dailyClosingResults||[]).find(x=>x.packageId===p.packageId);
    if(old)openDailyClosingResultV219(old.id);
    return toast('이미 적용된 퇴근 파일입니다. 기존 결과를 표시합니다.');
  }
  try{
    let workLog=0,experiences=0,rules=0,next=0;
    if(p.workLog&&!data.workMode.logs.some(x=>x.id===p.workLog.id)){data.workMode.logs.unshift(p.workLog);workLog=1;}
    (p.founderLogs||[]).forEach(x=>upsertV19(data.founderLogs,x));
    (p.experiences||[]).forEach(x=>{const before=data.experiences.some(y=>y.id===x.id);upsertV19(data.experiences,x);if(!before)experiences++;});
    (p.constitution||[]).forEach(x=>{const before=data.constitution.some(y=>y.id===x.id);upsertV19(data.constitution,x);if(!before)rules++;});
    (p.nextWork||[]).forEach(x=>{const exists=(data.tasks||[]).some(t=>t.title===x.title&&t.project===x.project&&!t.done);if(!exists){data.tasks.unshift({id:uid('T'),title:x.title,project:x.project,status:x.status||'Next',priority:x.priority||'Medium',done:false,createdAt:new Date().toISOString(),dueDate:''});next++;}});
    data.memories.unshift({id:uid('m'),title:`Daily Closing Import · ${p.date}`,detail:`${p.project||'Studio OS'} · Experience ${experiences}건 · Rule ${rules}건 · Next ${next}건`,type:'Work Log',date:'방금'});
    data.dailyClosingImports.unshift({packageId:p.packageId,date:p.date,project:p.project||'Studio OS',version:p.version||'-',importedAt:new Date().toLocaleString('ko-KR'),counts:{rules,experiences,next,workLog}});
    data.patchImports.unshift({patchId:p.packageId,type:'Daily Closing',project:p.project||'Studio OS',version:p.version||'-',date:new Date().toLocaleString('ko-KR'),counts:{rules,assets:0,experiences,next,workLog}});
    const result=dailyClosingResultV219(p,{workLog,experiences,rules,next});data.dailyClosingResults.unshift(result);
    saveData();pendingPatch19=null;renderExperience19();openDailyClosingResultV219(result.id);toast('Daily Closing 적용 완료');
  }catch(e){toast(`Daily Closing 적용 실패: ${e.message}`);}
};

renderPatchHistory19=function(){
  const list=data.patchImports||[];
  $('#experienceBody19').innerHTML=`<div class="panel"><span class="eyebrow">Audit trail</span><h3>Import History</h3>${list.length?`<div class="patch-history-v19">${list.map(x=>{const r=(data.dailyClosingResults||[]).find(y=>y.packageId===x.patchId);return `<div class="${r?'history-clickable-219':''}" ${r?`onclick="openDailyClosingResultV219('${esc(r.id)}')"`:''}><span>${esc(x.type)}</span><strong>${esc(x.project)} · v${esc(x.version)}</strong><small>${esc(x.date)}</small><p>${x.counts.rules||0} Rules · ${x.counts.assets||0} Assets · ${x.counts.experiences||0} Experiences${x.type==='Daily Closing'?` · ${x.counts.next||0} Next`:''}</p>${r?'<em>결과 보기 →</em>':''}</div>`}).join('')}</div>`:`<div class="empty-state-216"><strong>아직 가져온 파일이 없습니다.</strong><span>Patch Center에서 파일을 적용하면 이력이 저장됩니다.</span></div>`}</div>`;
};

const renderHomeV219Base=pages.home;
function renderHomeV219(){
  renderHomeV219Base();
  const r=(data.dailyClosingResults||[])[0];if(!r)return;
  const target=document.querySelector('.office-dashboard-v21')||document.querySelector('.work-hero-v20')||document.querySelector('#content .page-title');
  if(target)target.insertAdjacentHTML('afterend',`<section class="daily-complete-card-219"><div><span>DAILY CLOSING · IMPORT RESULT</span><strong>${esc(r.date)} 퇴근 기록 반영 완료</strong><small>${esc(r.project)} · Work Log ${r.counts.workLog}건 · Experience ${r.counts.experiences}건 · Constitution ${r.counts.rules}건 · Next Work ${r.counts.next}건</small></div><button onclick="openDailyClosingResultV219('${esc(r.id)}')">적용 결과 보기 →</button></section>`);
}
pages.home=renderHomeV219;

const renderRoadmapV219Base=renderRoadmap;
renderRoadmap=function(){renderRoadmapV219Base();const rows=document.querySelector('.roadmap-line');if(rows&&!rows.textContent.includes('v2.1.9'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.1.9 · Result Visibility — 현재</strong><p>Daily Closing 적용 결과, Dashboard 완료 카드, Import History 재열람</p></div>');};
pages.roadmap=renderRoadmap;
const renderSystemV219Base=pages.system;
pages.system=function(){renderSystemV219Base();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.1.9 · Result Visibility</p><small>Daily Closing import results are visible and traceable</small>';};
document.title='Studio OS v2.1.9 · Result Visibility';
const brand219=document.querySelector('.brand small');if(brand219)brand219.textContent='Result Visibility · v2.1.9';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV219();

// ===== Studio OS v2.2.0 · Daily Work Summary Patch =====
(function initV220(){
  data.dailyClosingResults=data.dailyClosingResults||[];
  data.constitution=data.constitution||[];
  data.experiences=data.experiences||[];
  data.releaseNotes=data.releaseNotes||[];
  const rules=[
    {id:'C-WORK-010',title:'Daily Closing 업무 맥락 기록 원칙',chapter:'Operations',status:'Approved',content:'Daily Closing은 반영 건수뿐 아니라 그날 업무를 즉시 회상할 수 있도록 한 줄 메시지, 주요 작업 타이틀, 프로젝트별 상세 작업을 함께 저장하고 표시한다.',scope:'전체 프로젝트',projects:['Studio OS'],related:['C-WORK-007','C-WORK-009','C-PATCH-010'],note:'v2.2.0 Daily Work Summary',favorite:true,updated:'2026-08-06'}
  ];rules.forEach(x=>upsertV19(data.constitution,x));
  if(!data.experiences.some(x=>x.id==='EXP-040'))data.experiences.unshift({id:'EXP-040',area:'Workflow',severity:'Medium',type:'Improvement',title:'퇴근 결과에 당일 업무 맥락 부족',problem:'Daily Closing 결과에서 영역별 반영 건수는 확인되지만 그날 무엇을 작업했는지 빠르게 파악하기 어려웠음',lesson:'일일 기록에는 한 줄 요약과 주요 작업 타이틀을 필수로 포함한다.',constitutionId:'C-WORK-010',project:'Studio OS',status:'Solved',date:'2026-08-06'});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.2.0'))data.releaseNotes.unshift({id:'RN-2.2.0',version:'v2.2.0',date:'2026-08-06',title:'Daily Work Summary',newItems:['그날 업무 한 줄 메시지','주요 작업 타이틀','프로젝트별 상세 작업'],improved:['Home Daily Closing 카드 정보성','Daily Closing 결과 모달 가독성','퇴근 파일 데이터 구조'],fixed:['EXP-040'],removed:[],experiences:['EXP-040']});
  (data.dailyClosingResults||[]).forEach(r=>{
    if(!r.dailyHeadline)r.dailyHeadline=r.date==='2026-08-05'?'Studio OS Phase 1을 마무리하고 Daily Closing 운영 흐름을 완성한 날':`${r.project||'Studio OS'} 업무를 정리하고 다음 작업으로 연결한 날`;
    if(!Array.isArray(r.workTitles)||!r.workTitles.length)r.workTitles=['Daily Closing 퇴근 기록 반영','업무 결과와 Experience·Constitution 연결','다음 작업 계획 생성'];
    if(!Array.isArray(r.projectSummaries)||!r.projectSummaries.length)r.projectSummaries=[{project:r.project||'Studio OS',items:r.workTitles.slice(0,4)}];
  });
  saveData();
})();

function v220CleanList(list,max=5){return (Array.isArray(list)?list:[]).map(x=>String(x||'').trim()).filter(Boolean).slice(0,max);}
function v220SummaryFromPayload(p){
  const founder=v220CleanList((p.founderLogs||[]).map(x=>x.work||x.title),4);
  const next=v220CleanList((p.nextWork||[]).map(x=>x.title),3);
  const exp=v220CleanList((p.experiences||[]).map(x=>x.title),3);
  const titles=v220CleanList(p.workTitles,5);
  const fallback=[...founder,...exp,...next];
  const workTitles=titles.length?titles:v220CleanList(fallback.length?fallback:['Daily Closing 퇴근 기록 반영','업무 결과 및 운영 변경 정리','다음 작업 계획 생성'],5);
  const dailyHeadline=String(p.dailyHeadline||'').trim()||`${p.project||'Studio OS'}의 오늘 작업을 정리하고 다음 실행 단계로 연결한 날`;
  let projectSummaries=Array.isArray(p.projectSummaries)?p.projectSummaries.map(g=>({project:String(g.project||p.project||'Studio OS'),items:v220CleanList(g.items,8)})).filter(g=>g.items.length):[];
  if(!projectSummaries.length)projectSummaries=[{project:p.project||'Studio OS',items:workTitles.slice(0,5)}];
  return {dailyHeadline,workTitles,projectSummaries};
}

const dailyClosingPayloadV218Base220=dailyClosingPayloadV218;
dailyClosingPayloadV218=function(log){
  const p=dailyClosingPayloadV218Base220(log);
  p.packageId=`DCP-${p.date}-StudioOS-v2.2.0`;
  p.version='2.2.0';
  const completed=(data.tasks||[]).filter(t=>t.done&&String(t.completedAt||t.updatedAt||'').slice(0,10)===p.date).map(t=>t.title);
  const founder=(p.founderLogs||[]).map(x=>x.work||x.title).filter(Boolean);
  const recentExp=(p.experiences||[]).map(x=>x.title).filter(Boolean);
  const workTitles=v220CleanList([...founder,...completed,...recentExp],5);
  p.dailyHeadline=workTitles.length?`${workTitles[0]}을 중심으로 운영 기록과 다음 작업을 정리한 날`:'Studio OS 운영 흐름을 점검하고 다음 작업을 준비한 날';
  p.workTitles=workTitles.length?workTitles:['Daily Closing 업무 요약 구조 반영','일일 업무 기록과 결과 화면 연결','다음 작업 계획 정리'];
  const groups={};
  (p.founderLogs||[]).forEach(x=>{const k=x.project||p.project;groups[k]=groups[k]||[];if(x.work)groups[k].push(x.work);});
  (p.experiences||[]).forEach(x=>{const k=x.project||p.project;groups[k]=groups[k]||[];if(x.title)groups[k].push(x.title);});
  p.projectSummaries=Object.entries(groups).map(([project,items])=>({project,items:v220CleanList(items,8)})).filter(x=>x.items.length);
  if(!p.projectSummaries.length)p.projectSummaries=[{project:p.project,items:p.workTitles.slice(0,5)}];
  return p;
};

function dailyClosingResultV220(p,counts){
  const s=v220SummaryFromPayload(p);
  return {id:p.packageId,packageId:p.packageId,date:p.date||todayISO(),project:p.project||'Studio OS',version:p.version||'2.2.0',importedAt:new Date().toLocaleString('ko-KR'),status:'Success',counts:{workLog:counts.workLog||0,experiences:counts.experiences||0,rules:counts.rules||0,next:counts.next||0},dailyHeadline:s.dailyHeadline,workTitles:s.workTitles,projectSummaries:s.projectSummaries};
}
dailyClosingResultV219=dailyClosingResultV220;

openDailyClosingResultV219=function(id){
  const r=(data.dailyClosingResults||[]).find(x=>x.id===id||x.packageId===id);
  if(!r)return toast('결과 기록을 찾을 수 없습니다.');
  const titles=v220CleanList(r.workTitles,5);
  const groups=Array.isArray(r.projectSummaries)?r.projectSummaries:[];
  openModal('Daily Closing 적용 결과',`<div class="import-result-219 import-result-220"><div class="result-head-219"><span>DAILY CLOSING</span><strong>적용 완료</strong><small>${esc(r.date)} · ${esc(r.project)} · v${esc(r.version)}</small></div><section class="daily-context-220"><span>오늘의 한 줄</span><strong>${esc(r.dailyHeadline||'오늘 업무를 정리하고 다음 작업으로 연결한 날')}</strong>${titles.length?`<div class="work-titles-220">${titles.map(x=>`<p>• ${esc(x)}</p>`).join('')}</div>`:''}</section><div class="result-counts-219"><div><small>Work Log</small><strong>${r.counts.workLog}</strong><span>건 생성</span></div><div><small>Experience</small><strong>${r.counts.experiences}</strong><span>건 반영</span></div><div><small>Constitution</small><strong>${r.counts.rules}</strong><span>건 반영</span></div><div><small>Next Work</small><strong>${r.counts.next}</strong><span>건 생성</span></div></div>${groups.length?`<section class="project-summary-220"><span>프로젝트별 작업</span>${groups.map(g=>`<div><strong>${esc(g.project)}</strong>${v220CleanList(g.items,8).map(x=>`<p>• ${esc(x)}</p>`).join('')}</div>`).join('')}</section>`:''}<p class="result-time-219">적용 시각 · ${esc(r.importedAt)}</p><div class="result-links-219"><button onclick="closeModal();go('worklog')">Work Log 보기</button><button onclick="closeModal();data.patchUI.tab='experience';saveData();go('experience')">Experience 보기</button><button onclick="closeModal();go('knowledge')">Constitution 보기</button><button onclick="closeModal();go('tasks')">다음 작업 보기</button></div></div>`,()=>closeModal());
};

applyDailyClosingV218=function(){
  const p=pendingPatch19;if(!p||p.schema!=='studio-os-daily-closing-v1')return;
  if(data.dailyClosingImports.some(x=>x.packageId===p.packageId)){
    const old=(data.dailyClosingResults||[]).find(x=>x.packageId===p.packageId);if(old)openDailyClosingResultV219(old.id);
    return toast('이미 적용된 퇴근 파일입니다. 기존 결과를 표시합니다.');
  }
  try{
    let workLog=0,experiences=0,rules=0,next=0;
    if(p.workLog&&!data.workMode.logs.some(x=>x.id===p.workLog.id)){data.workMode.logs.unshift(p.workLog);workLog=1;}
    (p.founderLogs||[]).forEach(x=>upsertV19(data.founderLogs,x));
    (p.experiences||[]).forEach(x=>{const before=data.experiences.some(y=>y.id===x.id);upsertV19(data.experiences,x);if(!before)experiences++;});
    (p.constitution||[]).forEach(x=>{const before=data.constitution.some(y=>y.id===x.id);upsertV19(data.constitution,x);if(!before)rules++;});
    (p.nextWork||[]).forEach(x=>{const exists=(data.tasks||[]).some(t=>t.title===x.title&&t.project===x.project&&!t.done);if(!exists){data.tasks.unshift({id:uid('T'),title:x.title,project:x.project,status:x.status||'Next',priority:x.priority||'Medium',done:false,createdAt:new Date().toISOString(),dueDate:''});next++;}});
    const summary=v220SummaryFromPayload(p);
    data.memories.unshift({id:uid('m'),title:`Daily Closing · ${p.date}`,detail:`${summary.dailyHeadline} · ${summary.workTitles.slice(0,2).join(' / ')}`,type:'Work Log',date:'방금'});
    data.dailyClosingImports.unshift({packageId:p.packageId,date:p.date,project:p.project||'Studio OS',version:p.version||'-',importedAt:new Date().toLocaleString('ko-KR'),counts:{rules,experiences,next,workLog},dailyHeadline:summary.dailyHeadline,workTitles:summary.workTitles});
    data.patchImports.unshift({patchId:p.packageId,type:'Daily Closing',project:p.project||'Studio OS',version:p.version||'-',date:new Date().toLocaleString('ko-KR'),counts:{rules,assets:0,experiences,next,workLog}});
    const result=dailyClosingResultV220(p,{workLog,experiences,rules,next});data.dailyClosingResults.unshift(result);
    saveData();pendingPatch19=null;renderExperience19();openDailyClosingResultV219(result.id);toast('Daily Closing 적용 완료');
  }catch(e){toast(`Daily Closing 적용 실패: ${e.message}`);}
};

function renderHomeV220(){
  renderHomeV219Base();
  const r=(data.dailyClosingResults||[])[0];if(!r)return;
  const target=document.querySelector('.office-dashboard-v21')||document.querySelector('.work-hero-v20')||document.querySelector('#content .page-title');
  const titles=v220CleanList(r.workTitles,3);
  if(target)target.insertAdjacentHTML('afterend',`<section class="daily-complete-card-219 daily-complete-card-220"><div class="daily-card-main-220"><span>DAILY CLOSING · WORK SUMMARY</span><strong>${esc(r.date)} 퇴근 기록 반영 완료</strong><p>${esc(r.dailyHeadline||'오늘 업무를 정리하고 다음 작업으로 연결한 날')}</p>${titles.length?`<div class="daily-card-titles-220">${titles.map(x=>`<em>• ${esc(x)}</em>`).join('')}</div>`:''}<small>${esc(r.project)} · Work Log ${r.counts.workLog}건 · Experience ${r.counts.experiences}건 · Constitution ${r.counts.rules}건 · Next Work ${r.counts.next}건</small></div><button onclick="openDailyClosingResultV219('${esc(r.id)}')">적용 결과 보기 →</button></section>`);
}
pages.home=renderHomeV220;

const renderRoadmapV220Base=renderRoadmap;
renderRoadmap=function(){renderRoadmapV220Base();const rows=document.querySelector('.roadmap-line');if(rows&&!rows.textContent.includes('v2.2.0'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.2.0 · Daily Work Summary — 현재</strong><p>퇴근 기록에 한 줄 메시지, 주요 작업 타이틀과 프로젝트별 상세 업무를 표시</p></div>');};
pages.roadmap=renderRoadmap;
const renderSystemV220Base=pages.system;
pages.system=function(){renderSystemV220Base();const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.2.0 · Daily Work Summary</p><small>Daily Closing now preserves both result counts and work context</small>';};
document.title='Studio OS v2.2.0 · Daily Work Summary';
const brand220=document.querySelector('.brand small');if(brand220)brand220.textContent='Daily Work Summary · v2.2.0';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV220();

/* =========================================================
   Studio OS v2.2.1 · Home Layout Optimization
   - Daily Closing summary card removed from Home
   - Result button moved into attendance actions
   - Hero height compacted to 70%
   - Office dashboard and Today Command removed
   - AI Collaboration moved directly below hero
   ========================================================= */
(function initV221(){
  data.experiences=data.experiences||[];
  data.releaseNotes=data.releaseNotes||[];
  if(!data.experiences.some(x=>x.id==='EXP-041'))data.experiences.unshift({
    id:'EXP-041',
    title:'Home 정보 과밀 및 핵심 흐름 분산',
    domain:'UI/UX',
    severity:'High',
    issue:'Home에 상태 카드, Daily Closing 카드, Today Command가 중복 배치되어 핵심 업무 흐름이 흐려짐',
    cause:'기능 추가 과정에서 요약 카드가 누적되고 Home 우선순위가 재정리되지 않음',
    solution:'Hero를 축소하고 중복 카드를 제거한 뒤 AI Collaboration을 Hero 바로 아래로 이동',
    prevention:'Home은 출퇴근·AI 협업·프로젝트·최근 활동 중심으로 유지하고 중복 지표는 상세 페이지에서 확인',
    status:'Solved',
    project:'Studio OS',
    date:'2026-08-06',
    version:'v2.2.1'
  });
  if(!data.releaseNotes.some(x=>x.id==='RN-2.2.1'))data.releaseNotes.unshift({
    id:'RN-2.2.1',version:'v2.2.1',date:'2026-08-06',title:'Home Layout Optimization',
    newItems:['Hero 영역 내 Daily Closing 결과 버튼'],
    improved:['Work Operating System 카드 높이 70% 조정','AI Collaboration 우선 배치','Home 정보 집중도'],
    fixed:['EXP-041'],
    removed:['Home Daily Closing 요약 카드','오늘 예정·지연·Review·AI Sessions·Experience 지표 카드','Today Command 카드'],
    experiences:['EXP-041']
  });
  saveData();
})();

function renderHomeV221(){
  renderHomeV220();
  const content=document.querySelector('#content');
  const hero=content&&content.querySelector('.work-hero-v20');
  if(!content||!hero)return;

  /* Remove secondary/duplicated Home summaries. */
  content.querySelectorAll('.daily-complete-card-219,.office-dashboard-v21,.today-command-v20').forEach(el=>el.remove());

  /* Place AI Collaboration immediately below Work Operating System. */
  const ai=content.querySelector('.ai-command-v20');
  if(ai)hero.insertAdjacentElement('afterend',ai);

  /* Keep the Daily Closing result accessible without a separate card. */
  const result=(data.dailyClosingResults||[])[0];
  const actions=hero.querySelector('.attendance-actions-v20');
  if(result&&actions&&!actions.querySelector('.daily-result-btn-221')){
    actions.insertAdjacentHTML('beforeend',`<button class="daily-result-btn-221" onclick="openDailyClosingResultV219('${esc(result.id)}')">적용 결과 보기</button>`);
  }

  hero.classList.add('work-hero-compact-221');
}
pages.home=renderHomeV221;

const renderRoadmapV221Base=renderRoadmap;
renderRoadmap=function(){
  renderRoadmapV221Base();
  const rows=document.querySelector('.roadmap-line');
  if(rows&&!rows.textContent.includes('v2.2.1'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.2.1 · Home Layout Optimization — 현재</strong><p>Home 중복 카드를 제거하고 Hero·AI Collaboration 중심으로 업무 흐름을 단순화</p></div>');
};
pages.roadmap=renderRoadmap;

const renderSystemV221Base=pages.system;
pages.system=function(){
  renderSystemV221Base();
  const version=[...document.querySelectorAll('.system-grid .panel')].find(x=>x.textContent.includes('Version'));
  if(version)version.innerHTML='<h3>Version</h3><p>Studio OS v2.2.1 · Home Layout Optimization</p><small>Compact work status, AI-first Home flow, reduced duplicate summaries</small>';
};

document.title='Studio OS v2.2.1 · Home Layout Optimization';
const brand221=document.querySelector('.brand small');if(brand221)brand221.textContent='Home Layout Optimization · v2.2.1';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV221();

/* =========================================================
   Studio OS v2.2.2 · UI Consistency Patch
   - Schedule label unified in English
   - Work Log moved below Workspace
   - System cards converted to a single list
   - History type tags kept on one line
   ========================================================= */
(function initV222(){
  data.experiences=data.experiences||[];
  data.releaseNotes=data.releaseNotes||[];
  if(!data.experiences.some(x=>x.id==='EXP-042'))data.experiences.unshift({
    id:'EXP-042',title:'Navigation·System·History UI consistency',domain:'UI/UX',severity:'Medium',
    issue:'영문 메뉴 사이에 한글 일정이 남고 System 카드 높이가 제각각이며 History 태그가 줄바꿈됨',
    cause:'페이지별 UI가 서로 다른 시기에 확장되어 명칭·레이아웃·태그 규칙이 통일되지 않음',
    solution:'Schedule 영문화, Work Log 순서 조정, System 리스트 전환, History 태그 한 줄 고정',
    prevention:'Navigation 명칭은 한 언어로 유지하고 관리 페이지는 동일한 List Row 규격을 사용',
    status:'Solved',project:'Studio OS',date:'2026-08-06',version:'v2.2.2'
  });
  if(!data.releaseNotes.some(x=>x.id==='RN-2.2.2'))data.releaseNotes.unshift({
    id:'RN-2.2.2',version:'v2.2.2',date:'2026-08-06',title:'UI Consistency Patch',
    newItems:[],
    improved:['Schedule 영문 통일','Work Log 메뉴 순서','System List Layout','History Tag single-line'],
    fixed:['EXP-042'],removed:[],experiences:['EXP-042']
  });
  saveData();
})();

/* Navigation order and grouping. */
const v222NavOrder=['home','tasks','projects','workspace','worklog','brain','assets','experience','knowledge','memory','roadmap','system'];
navItems.sort((a,b)=>v222NavOrder.indexOf(a.id)-v222NavOrder.indexOf(b.id));
const scheduleItem222=navItems.find(x=>x.id==='tasks');if(scheduleItem222)scheduleItem222.label='Schedule';

buildNav=function(){
  const c=counts();
  const badge={tasks:c.tasks,memory:c.memory,projects:c.projects,brain:c.brain,assets:data.digitalAssets.length,experience:(data.experiences||[]).length,worklog:(data.workMode?.logs||[]).length};
  const operations=['home','tasks','projects','workspace','worklog'];
  const production=['brain','assets','experience','knowledge'];
  const control=['memory','roadmap','system'];
  const row=n=>`<button class="nav-item ${n.id===current?'active':''}" data-page="${n.id}"><span class="ico">${n.ico}</span><span>${n.label}</span>${badge[n.id]?`<span class="badge">${badge[n.id]}</span>`:''}</button>`;
  $('#nav').innerHTML=`<div class="nav-group"><div class="nav-label">OPERATIONS</div>${operations.map(id=>navItems.find(n=>n.id===id)).filter(Boolean).map(row).join('')}</div><div class="nav-group"><div class="nav-label">PRODUCTION</div>${production.map(id=>navItems.find(n=>n.id===id)).filter(Boolean).map(row).join('')}</div><div class="nav-group"><div class="nav-label">CONTROL</div>${control.map(id=>navItems.find(n=>n.id===id)).filter(Boolean).map(row).join('')}</div>`;
  $$('.nav-item').forEach(b=>b.onclick=()=>go(b.dataset.page));
};

/* System page: equal list rows instead of uneven cards. */
function renderSystemV222(){
  const c=data.company||{name:'Studio OS',role:'Founder Studio',startHour:'09:00',endHour:'18:00'};
  const size=new Blob([JSON.stringify(data)]).size.toLocaleString();
  $('#content').innerHTML=`<div class="page-title"><span class="eyebrow">CONTROL CENTER</span><h1>System</h1><p>Studio의 근무 기준과 운영 데이터를 한 목록에서 관리합니다.</p></div><section class="panel system-list-222">
    <div class="system-row-222"><div><h3>Phase 1 Status</h3><p>운영체계 완성 · 실제 프로젝트 운영 전환</p></div><div class="system-value-222"><strong>COMPLETE</strong></div></div>
    <div class="system-row-222"><div><h3>Company Profile</h3><p>Business-only workspace</p></div><div class="system-value-222"><strong>${esc(c.name)} · ${esc(c.role)}</strong></div></div>
    <div class="system-row-222 working-row-222"><div><h3>Working Hours</h3><p>평일 기본 출퇴근 기준을 설정합니다.</p></div><div class="time-fields-222"><label><small>Start</small><span><input id="startHour222" type="time" value="${esc(c.startHour)}"><b>◷</b></span></label><label><small>End</small><span><input id="endHour222" type="time" value="${esc(c.endHour)}"><b>◷</b></span></label><button class="primary-btn compact" onclick="data.company.startHour=$('#startHour222').value;data.company.endHour=$('#endHour222').value;saveData();toast('근무시간을 저장했습니다.')">Save</button></div></div>
    <div class="system-row-222"><div><h3>Data Backup</h3><p>프로젝트·Experience·Patch·Work Log를 JSON으로 백업합니다.</p></div><div class="system-actions-222"><button class="tab" onclick="exportData()">Export</button><button class="tab" onclick="$('#importFile222').click()">Import</button><input id="importFile222" type="file" accept="application/json" hidden></div></div>
    <div class="system-row-222"><div><h3>Version</h3><p>UI Consistency Patch</p></div><div class="system-value-222"><strong>Studio OS v2.2.2</strong></div></div>
    <div class="system-row-222"><div><h3>Workspace Policy</h3><p>업무 프로젝트, 디지털 제작, 사업화 활동만 운영합니다.</p></div><div class="system-value-222 muted-value-222">Business Only</div></div>
    <div class="system-row-222"><div><h3>Storage</h3><p>LocalStorage + IndexedDB</p></div><div class="system-value-222"><strong>${size} bytes</strong></div></div>
  </section>`;
  $('#importFile222').onchange=importData;
}
pages.system=renderSystemV222;

const renderRoadmapV222Base=renderRoadmap;
renderRoadmap=function(){
  renderRoadmapV222Base();
  const rows=document.querySelector('.roadmap-line');
  if(rows&&!rows.textContent.includes('v2.2.2'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.2.2 · UI Consistency — 현재</strong><p>Navigation 영문화·순서 정리, System 리스트 전환, History 태그 한 줄 고정</p></div>');
};
pages.roadmap=renderRoadmap;

document.title='Studio OS v2.2.2 · UI Consistency';
const brand222=document.querySelector('.brand small');if(brand222)brand222.textContent='UI Consistency · v2.2.2';
buildNav();current='home';$('#pageName').textContent='Home';renderHomeV221();

/* =========================================================
   Studio OS v2.2.3 · Home State Layout Sync Patch
   - Clock-in / clock-out no longer call the legacy v2.0 Home renderer
   - Offline / Working / Closed states share the same v2.2.1 Home layout
   - Only Hero copy, buttons and attendance values change by state
   ========================================================= */
(function initV223(){
  data.experiences=data.experiences||[];
  data.releaseNotes=data.releaseNotes||[];
  if(!data.experiences.some(x=>x.id==='EXP-043'))data.experiences.unshift({
    id:'EXP-043',title:'출근 상태 전환 시 이전 Home 레이아웃 재등장',domain:'UI/UX',severity:'High',
    issue:'출근 버튼을 누르면 v2.2.1에서 제거한 Today Command가 다시 나타나고 AI Collaboration 위치가 변경됨',
    cause:'clockInV20·clockOutV20이 최신 pages.home이 아니라 과거 renderHomeV20을 직접 호출함',
    solution:'상태 변경 후 항상 현재 등록된 pages.home 렌더러를 호출하도록 출퇴근 함수를 동기화',
    prevention:'상태 변경 함수는 특정 버전 렌더러를 직접 호출하지 않고 라우터의 현재 페이지 렌더러를 사용',
    status:'Solved',project:'Studio OS',date:'2026-08-06',version:'v2.2.3'
  });
  if(!data.releaseNotes.some(x=>x.id==='RN-2.2.3'))data.releaseNotes.unshift({
    id:'RN-2.2.3',version:'v2.2.3',date:'2026-08-06',title:'Home State Layout Sync',
    newItems:[],
    improved:['출근 전·근무 중·퇴근 후 Home 본문 구조 통일','상태 전환 시 Hero만 갱신'],
    fixed:['EXP-043','Today Command 재등장','AI Collaboration 위치 변경'],removed:[],experiences:['EXP-043']
  });
  saveData();
})();

function renderCurrentHomeV223(){
  current='home';
  $('#pageName').textContent='Home';
  buildNav();
  (pages.home||renderHomeV221)();
}

clockInV20=function(){
  if(data.workMode.status==='Working')return toast('이미 근무 중입니다.');
  data.workMode.status='Working';
  data.workMode.clockIn=new Date().toISOString();
  data.workMode.clockOut=null;
  data.workMode.optional=v20IsHoliday();
  v20LogEvent('Attendance',data.workMode.optional?'선택 근무 출근':'출근','Studio OS');
  saveData();
  renderCurrentHomeV223();
  toast(data.workMode.optional?'선택 근무를 시작했습니다.':'출근 처리했습니다.');
};

clockOutV20=function(){
  if(data.workMode.status!=='Working')return toast('현재 근무 중이 아닙니다.');
  const now=new Date(),start=new Date(data.workMode.clockIn||now),mins=Math.max(0,Math.round((now-start)/60000));
  const s=v20TodayWorkspaceStats();
  const report={id:uid('DR'),date:v20DateKey(now),clockIn:data.workMode.clockIn,clockOut:now.toISOString(),minutes:mins,optional:!!data.workMode.optional,...s,summary:`완료 ${s.completed}건 · 활동 ${s.activity}건 · 자산 ${s.assets}건`};
  data.dailyReports.unshift(report);data.dailyReports=data.dailyReports.slice(0,120);
  data.workMode.logs.unshift({...report,id:uid('WL')});data.workMode.logs=data.workMode.logs.slice(0,120);
  v20LogEvent('Attendance','퇴근 및 Daily Report 생성','Studio OS');
  data.workMode.status='Off';data.workMode.clockOut=now.toISOString();data.workMode.optional=false;
  data.memories.unshift({id:uid('m'),title:`Daily Work Report · ${report.date}`,detail:`${v20Duration(mins)} · ${report.summary}`,type:'Work Log',date:'방금'});
  saveData();
  renderCurrentHomeV223();
  openDailyReportV20(report.id);
  toast('퇴근 처리하고 Daily Report를 생성했습니다.');
};

const renderRoadmapV223Base=renderRoadmap;
renderRoadmap=function(){
  renderRoadmapV223Base();
  const rows=document.querySelector('.roadmap-line');
  if(rows&&!rows.textContent.includes('v2.2.3'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.2.3 · Home State Layout Sync — 현재</strong><p>출근·근무·퇴근 상태 전환 시 동일한 Home 구조를 유지하고 Hero 상태만 갱신</p></div>');
};
pages.roadmap=renderRoadmap;

const renderSystemV223Base=pages.system;
pages.system=function(){
  renderSystemV223Base();
  const rows=[...document.querySelectorAll('.system-row-222')];
  const version=rows.find(x=>x.textContent.includes('Version'));
  if(version)version.innerHTML='<div><h3>Version</h3><p>Home State Layout Sync</p></div><div class="system-value-222"><strong>Studio OS v2.2.3</strong></div>';
};

document.title='Studio OS v2.2.3 · Home State Layout Sync';
const brand223=document.querySelector('.brand small');if(brand223)brand223.textContent='Home State Sync · v2.2.3';
buildNav();current='home';$('#pageName').textContent='Home';pages.home();

/* =========================================================
   Studio OS v2.2.4 · Schedule & Daily Work Log Operations
   - Schedule edit / complete / delete
   - Goal criteria instead of manual progress
   - GPT Daily Closing progress evaluation import
   - One Work Log per date, same-day overwrite
   - Year / month Work Log filters
   ========================================================= */
(function initV224(){
  data.workLogFilter224=data.workLogFilter224||{year:String(new Date().getFullYear()),month:String(new Date().getMonth()+1).padStart(2,'0')};
  (data.tasks||[]).forEach(t=>{t.goalCriteria=t.goalCriteria||t.goal||'';t.progressReason=t.progressReason||'';t.progressEvaluatedAt=t.progressEvaluatedAt||'';});
  data.experiences=data.experiences||[];data.releaseNotes=data.releaseNotes||[];
  if(!data.experiences.some(x=>x.id==='EXP-044'))data.experiences.unshift({id:'EXP-044',title:'Schedule 삭제·자동 공정률 및 Work Log 중복 기록',domain:'Operations',severity:'High',issue:'일정 삭제 기능과 목표 기준이 없고 반복 출퇴근 시 동일 날짜 보고가 계속 누적됨',cause:'Task와 Attendance를 생성 중심으로 구현하고 날짜 단위 Upsert 규칙을 적용하지 않음',solution:'Schedule CRUD, GPT 평가 진행률, 날짜별 Work Log 1건 및 연·월 필터 적용',prevention:'소모성 일정은 수정·완료·삭제를 제공하고 일일 운영 기록은 날짜 키로 덮어쓴다',status:'Solved',project:'Studio OS',date:'2026-08-06',version:'v2.2.4'});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.2.4'))data.releaseNotes.unshift({id:'RN-2.2.4',version:'v2.2.4',date:'2026-08-06',title:'Schedule & Work Log Operations',newItems:['Schedule 삭제·완료','목표 기준','GPT 진행률 평가','Work Log 연·월 필터'],improved:['날짜별 Work Log 1건 유지','동일 날짜 덮어쓰기'],fixed:['EXP-044'],removed:['Task 수동 진행률 슬라이더'],experiences:['EXP-044']});
  saveData();
})();

function deleteTaskV224(id){
  const t=v21AllTasks().find(x=>x.id===id);if(!t)return;
  if(!confirm(`“${t.title}” 일정을 삭제할까요?`))return;
  if(t.source==='workspace'){
    const w=data.workspaces[t.projectId];if(w)w.tasks=(w.tasks||[]).filter(x=>x.id!==t.rawId);
  }else data.tasks=(data.tasks||[]).filter(x=>x.id!==t.id);
  v20LogEvent('Task',`일정 삭제 · ${t.title}`,v21TaskProjectName(t));saveData();closeModal();renderTasksV21();toast('일정을 삭제했습니다.');
}
function completeTaskV224(id){
  const t=v21AllTasks().find(x=>x.id===id);if(!t)return;
  t.workflow='Done';t.done=true;t.progress=100;t.progressReason='사용자가 완료 처리';t.progressEvaluatedAt=new Date().toISOString();t.completedAt=new Date().toISOString();v21SaveTask(t);
  v20LogEvent('Task',`일정 완료 · ${t.title}`,v21TaskProjectName(t));closeModal();renderTasksV21();toast('일정을 완료했습니다.');
}
openTaskEditorV21=function(id='',date=v21ISO(new Date())){
  const all=v21AllTasks(),t=all.find(x=>x.id===id)||{title:'',projectId:data.projects[0]?.id||'',startDate:date,dueDate:date,priority:'Medium',workflow:'Ready',progress:0,estimate:60,source:'global',goalCriteria:'',progressReason:'',progressEvaluatedAt:''};
  const evaluated=t.progressEvaluatedAt?new Date(t.progressEvaluatedAt).toLocaleString('ko-KR'):'아직 평가되지 않음';
  openModal(id?'Schedule 편집':'Schedule 추가',`<label>일정명<input id="taskTitle21" value="${esc(t.title)}"></label><label>목표 기준<textarea id="taskGoal224" rows="3" placeholder="완료로 판단할 수 있는 결과물을 적어주세요.">${esc(t.goalCriteria||'')}</textarea></label><div class="form-grid"><label>프로젝트<select id="taskProject21">${data.projects.map(p=>`<option value="${p.id}" ${t.projectId===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><label>우선순위<select id="taskPriority21">${['Critical','High','Medium','Low'].map(x=>`<option ${t.priority===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="form-grid"><label>시작일<input id="taskStart21" type="date" value="${t.startDate}"></label><label>마감일<input id="taskDue21" type="date" value="${t.dueDate}"></label></div><div class="form-grid"><label>상태<select id="taskFlow21">${['Not Started','Ready','In Progress','Review','Blocked','Done','Archive'].map(x=>`<option ${t.workflow===x?'selected':''}>${x}</option>`).join('')}</select></label><label>예상시간(분)<input id="taskEstimate21" type="number" value="${t.estimate||60}"></label></div><section class="gpt-progress-224"><span>GPT 평가 진행률</span><strong>${Number(t.progress||0)}%</strong><i><b style="width:${Number(t.progress||0)}%"></b></i><p>${esc(t.progressReason||'퇴근 파일 적용 시 목표 기준과 결과물을 비교해 자동 평가합니다.')}</p><small>${esc(evaluated)}</small></section>${id?`<div class="modal-actions-224"><button type="button" onclick="completeTaskV224('${id}')">완료 처리</button><button type="button" class="danger" onclick="deleteTaskV224('${id}')">삭제</button></div>`:''}`,()=>{
    const title=$('#taskTitle21').value.trim();if(!title)return toast('일정명을 입력하세요.');const flow=$('#taskFlow21').value;const obj={...t,title,goalCriteria:$('#taskGoal224').value.trim(),projectId:$('#taskProject21').value,startDate:$('#taskStart21').value,dueDate:$('#taskDue21').value,priority:$('#taskPriority21').value,workflow:flow,estimate:Number($('#taskEstimate21').value)||60,done:flow==='Done',timing:`${$('#taskDue21').value} · ${$('#taskEstimate21').value}분`,status:$('#taskPriority21').value,bucket:'today'};
    if(flow==='Done'){obj.progress=100;obj.progressReason=obj.progressReason||'상태를 Done으로 변경';obj.progressEvaluatedAt=new Date().toISOString();obj.completedAt=obj.completedAt||new Date().toISOString();}
    if(id)v21SaveTask(obj);else{obj.id=uid('t');obj.progress=0;obj.createdAt=new Date().toISOString();data.tasks.unshift(obj);saveData();}
    v20LogEvent('Task',`${id?'일정 수정':'일정 생성'} · ${title}`,v21TaskProjectName(obj));closeModal();renderTasksV21();toast('일정을 저장했습니다.');
  });
};

function applyScheduleProgressV224(p){
  const rows=Array.isArray(p?.scheduleProgress)?p.scheduleProgress:[];let changed=0;
  rows.forEach(r=>{
    let t=v21AllTasks().find(x=>r.taskId&&x.id===r.taskId);
    if(!t&&r.title)t=v21AllTasks().find(x=>String(x.title).trim()===String(r.title).trim()&&(!r.project||v21TaskProjectName(x)===r.project));
    if(!t)return;const value=Math.max(0,Math.min(100,Number(r.progress)||0));t.progress=value;t.progressReason=String(r.reason||'GPT Daily Closing 평가');t.progressEvaluatedAt=r.evaluatedAt||new Date().toISOString();
    if(value>=100){t.workflow='Done';t.done=true;t.completedAt=t.completedAt||new Date().toISOString();}else if(value>0&&['Ready','Not Started'].includes(t.workflow))t.workflow='In Progress';
    v21SaveTask(t);changed++;
  });
  return changed;
}
const applyDailyClosingV224Base=applyDailyClosingV218;
applyDailyClosingV218=function(){const p=pendingPatch19;applyDailyClosingV224Base();if(p){const n=applyScheduleProgressV224(p);if(n){saveData();toast(`Schedule 진행률 ${n}건을 GPT 평가로 갱신했습니다.`);}}};
const dailyClosingPayloadV224Base=dailyClosingPayloadV218;
dailyClosingPayloadV218=function(log){const p=dailyClosingPayloadV224Base(log);p.scheduleProgress=p.scheduleProgress||[];return p;};

function consolidateDailyRecordsV224(){
  const merge=(arr)=>{const map=new Map();(arr||[]).forEach(r=>{const key=r.date||String(r.clockOut||r.clockIn||'').slice(0,10);if(!key)return;const old=map.get(key);if(!old){map.set(key,{...r,date:key});return;}const ins=[old.clockIn,r.clockIn].filter(Boolean).sort();const outs=[old.clockOut,r.clockOut].filter(Boolean).sort();const clockIn=ins[0],clockOut=outs[outs.length-1];map.set(key,{...old,...r,date:key,clockIn,clockOut,minutes:clockIn&&clockOut?Math.max(0,Math.round((new Date(clockOut)-new Date(clockIn))/60000)):Math.max(Number(old.minutes)||0,Number(r.minutes)||0)});});return [...map.values()].sort((a,b)=>String(b.date).localeCompare(String(a.date)));};
  data.dailyReports=merge(data.dailyReports).slice(0,366);data.workMode.logs=merge(data.workMode.logs).slice(0,366);
  const seen=new Set();data.workMode.events=(data.workMode.events||[]).filter(e=>{if(e.type!=='Attendance')return true;const key=`${String(e.date).slice(0,10)}|${e.title}`;if(seen.has(key))return false;seen.add(key);return true;});saveData();
}
consolidateDailyRecordsV224();

clockOutV20=function(){
  if(data.workMode.status!=='Working')return toast('현재 근무 중이 아닙니다.');
  const now=new Date(),date=v20DateKey(now),existing=(data.dailyReports||[]).find(x=>x.date===date);const currentStart=new Date(data.workMode.clockIn||now);const oldStart=existing?.clockIn?new Date(existing.clockIn):currentStart;const start=oldStart<currentStart?oldStart:currentStart;const mins=Math.max(0,Math.round((now-start)/60000));const s=v20TodayWorkspaceStats();
  const report={...(existing||{}),id:existing?.id||uid('DR'),date,clockIn:start.toISOString(),clockOut:now.toISOString(),minutes:mins,optional:!!data.workMode.optional,...s,summary:`완료 ${s.completed}건 · 활동 ${s.activity}건 · 자산 ${s.assets}건`};
  data.dailyReports=(data.dailyReports||[]).filter(x=>x.date!==date);data.dailyReports.unshift(report);
  const logExisting=(data.workMode.logs||[]).find(x=>x.date===date);data.workMode.logs=(data.workMode.logs||[]).filter(x=>x.date!==date);data.workMode.logs.unshift({...report,id:logExisting?.id||uid('WL')});
  data.workMode.events=(data.workMode.events||[]).filter(e=>!(e.type==='Attendance'&&String(e.date).startsWith(date)&&String(e.title).includes('퇴근')));v20LogEvent('Attendance','퇴근 및 Daily Report 업데이트','Studio OS');
  data.workMode.status='Off';data.workMode.clockOut=now.toISOString();data.workMode.optional=false;
  const mem=(data.memories||[]).find(x=>x.type==='Work Log'&&String(x.title).includes(date));if(mem){mem.title=`Daily Work Report · ${date}`;mem.detail=`${v20Duration(mins)} · ${report.summary}`;mem.date='방금';}else data.memories.unshift({id:uid('m'),title:`Daily Work Report · ${date}`,detail:`${v20Duration(mins)} · ${report.summary}`,type:'Work Log',date:'방금'});
  saveData();renderCurrentHomeV223();openDailyReportV20(report.id);toast('오늘의 Work Log를 업데이트했습니다.');
};

function setWorkLogFilterV224(kind,value){data.workLogFilter224[kind]=value;saveData();renderWorkLogV224();}
function renderWorkLogV224(){
  consolidateDailyRecordsV224();const reports=data.dailyReports||[],events=data.workMode.events||[],manual=data.manualWorkLogs||[];const years=[...new Set(reports.map(r=>String(r.date).slice(0,4)).filter(Boolean).concat(String(new Date().getFullYear())))].sort().reverse();const f=data.workLogFilter224;const list=reports.filter(r=>String(r.date).startsWith(`${f.year}-${f.month}`));
  $('#content').innerHTML=`<div class="page-title"><div><span class="eyebrow">DAILY OPERATIONS</span><h1>Work Log</h1><p>하루에 하나의 근무 기록을 유지하고 같은 날짜의 재기록은 최신 결과로 갱신합니다.</p></div><div class="page-actions"><button class="primary-btn compact" onclick="addFounderLogV21()">+ 대표 업무일지</button><button class="tab" onclick="importAISessionV21()">AI Session Import</button><button class="tab" onclick="generateClosingBriefV21()">GPT Closing Brief</button></div></div><div class="worklog-filter-224"><label>Year<select onchange="setWorkLogFilterV224('year',this.value)">${years.map(y=>`<option ${f.year===y?'selected':''}>${y}</option>`).join('')}</select></label><label>Month<select onchange="setWorkLogFilterV224('month',this.value)">${Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0')).map(m=>`<option value="${m}" ${f.month===m?'selected':''}>${Number(m)}월</option>`).join('')}</select></label><strong>${f.year}년 ${Number(f.month)}월 · ${list.length}일</strong></div><section class="panel worklog-list-224"><div class="worklog-head-224"><span>Date</span><span>Working Hours</span><span>Duration</span><span>Type</span><span></span></div>${list.map(r=>`<button onclick="openDailyReportV20('${r.id}')"><time>${esc(r.date)}</time><span>${v20FormatTime(r.clockIn)}–${v20FormatTime(r.clockOut)}</span><strong>${v20Duration(r.minutes)}</strong><em>${r.optional?'선택 근무':'정규 근무'}</em><b>보기 →</b></button>`).join('')||emptyLine('선택한 월의 Work Log가 없습니다.')}</section><div class="worklog-secondary-224"><section class="panel"><div class="panel-head"><div><span class="eyebrow">OS AUTO</span><h3>최근 자동 활동</h3></div></div><div class="activity-stream-v20">${events.slice(0,20).map(e=>`<div><time>${new Date(e.date).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time><span></span><p><strong>${esc(e.title)}</strong><small>${esc(e.project)} · ${esc(e.type)}</small></p></div>`).join('')||emptyLine('자동 기록이 없습니다.')}</div></section><section class="panel"><div class="panel-head"><div><span class="eyebrow">FOUNDER</span><h3>대표 업무일지</h3></div></div><div class="founder-logs-v21">${manual.slice(0,20).map(x=>`<article><time>${new Date(x.date).toLocaleDateString('ko-KR')}</time><strong>${esc(x.work||x.type||'업무일지')}</strong><small>${esc(x.project)}</small></article>`).join('')||emptyLine('대표 업무일지가 없습니다.')}</div></section></div>`;
}
pages.worklog=renderWorkLogV224;renderWorkLog=renderWorkLogV224;

const renderRoadmapV224Base=renderRoadmap;renderRoadmap=function(){renderRoadmapV224Base();const rows=document.querySelector('.roadmap-line');if(rows&&!rows.textContent.includes('v2.2.4'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.2.4 · Schedule & Work Log Operations — 현재</strong><p>Schedule CRUD·GPT 자동 진행률·날짜별 Work Log 1건·연월 필터</p></div>');};pages.roadmap=renderRoadmap;
const renderSystemV224Base=pages.system;pages.system=function(){renderSystemV224Base();const rows=[...document.querySelectorAll('.system-row-222')];const version=rows.find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<div><h3>Version</h3><p>Schedule & Work Log Operations</p></div><div class="system-value-222"><strong>Studio OS v2.2.4</strong></div>';};
document.title='Studio OS v2.2.4 · Schedule & Work Log Operations';const brand224=document.querySelector('.brand small');if(brand224)brand224.textContent='Schedule & Work Log · v2.2.4';buildNav();

/* =========================================================
   Studio OS v2.2.5 · Asset Finder & Registry Merge
   - Finder-style project navigation from v0.6
   - Current metadata, quality, version, status and reuse links
   - Compact three-pane management layout
   ========================================================= */
(function initV225(){
  data.assetFinder225=data.assetFinder225||{project:'All',type:'All',search:'',selectedId:''};
  const state=data.assetFinder225;
  if(!state.selectedId||!data.digitalAssets.some(a=>a.id===state.selectedId))state.selectedId=data.digitalAssets[0]?.id||'';
  data.experiences=data.experiences||[];data.releaseNotes=data.releaseNotes||[];
  if(!data.experiences.some(x=>x.id==='EXP-045'))data.experiences.unshift({id:'EXP-045',title:'Assets 카드형 대시보드의 탐색 효율 저하',domain:'UI/UX',severity:'Medium',issue:'자산 메타데이터는 풍부하지만 카드가 커서 프로젝트별 파일을 빠르게 찾기 어렵고 자산 증가 시 스크롤이 길어짐',cause:'자산 소개와 평가 중심으로 화면을 확장하면서 Finder형 분류·탐색 구조가 약화됨',solution:'v0.6의 프로젝트 Finder 구조와 현재 버전·품질·재사용·연결 메타데이터를 3단 레이아웃으로 통합',prevention:'자산 화면은 소개보다 탐색을 우선하고 상세 정보는 선택된 자산 패널에서 제공',status:'Solved',project:'Studio OS',date:'2026-08-06',version:'v2.2.5'});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.2.5'))data.releaseNotes.unshift({id:'RN-2.2.5',version:'v2.2.5',date:'2026-08-06',title:'Asset Finder & Registry Merge',newItems:['프로젝트 Finder','유형 필터','선택 자산 상세 패널'],improved:['자산 탐색 밀도','버전·품질·재사용 정보 접근성'],fixed:['EXP-045'],removed:['Registry의 대형 카드 중심 탐색'],experiences:['EXP-045']});
  saveData();
})();

function assetFinderProjects225(){return ['All',...new Set((data.digitalAssets||[]).map(a=>a.project||'공통').filter(Boolean))];}
function assetFinderTypes225(){return ['All',...new Set((data.digitalAssets||[]).map(a=>a.type||'Other').filter(Boolean))];}
function assetFinderFiltered225(){
  const s=data.assetFinder225||{},q=String(s.search||'').trim().toLowerCase();
  return (data.digitalAssets||[]).filter(a=>{
    const project=a.project||'공통';
    if(s.project&&s.project!=='All'&&project!==s.project)return false;
    if(s.type&&s.type!=='All'&&a.type!==s.type)return false;
    return !q||assetSearchTextV17(a).includes(q);
  }).sort((a,b)=>String(b.updated||'').localeCompare(String(a.updated||''))||String(a.name).localeCompare(String(b.name),'ko'));
}
function setAssetFinder225(key,value){data.assetFinder225[key]=value;if(key==='project'||key==='type'||key==='search'){const first=assetFinderFiltered225()[0];data.assetFinder225.selectedId=first?.id||'';}saveData();renderAssetsV225();}
function selectAssetFinder225(id){data.assetFinder225.selectedId=id;saveData();renderAssetFinderBody225();}
function assetIcon225(type){const t=String(type||'').toLowerCase();if(t.includes('pdf')||t.includes('document')||t.includes('report'))return 'PDF';if(t.includes('image')||t.includes('design'))return '▧';if(t.includes('source')||t.includes('application')||t.includes('html'))return '⌘';if(t.includes('audio')||t.includes('music'))return '♪';if(t.includes('video'))return '▶';if(t.includes('data'))return '▦';if(t.includes('prompt'))return 'AI';return '□';}
function renderAssetsV225(){
  const connected=(data.digitalAssets||[]).filter(a=>a.resource||a.externalUrl||a.location).length;
  const reusable=(data.digitalAssets||[]).filter(a=>['Reusable','Frozen'].includes(a.status)||avgQualityV17(a)>=80).length;
  const avg=Math.round((data.digitalAssets||[]).reduce((s,a)=>s+avgQualityV17(a),0)/Math.max(1,(data.digitalAssets||[]).length));
  $('#content').innerHTML=`<div class="page-title asset-title-225"><div><span class="eyebrow">ASSET FINDER</span><h1>Assets</h1><p>프로젝트별 자산을 빠르게 찾고, 선택한 자산의 버전·품질·재사용·연결 정보를 관리합니다.</p></div><button class="primary-btn compact" onclick="openAssetModalV16()">자산 등록</button></div>
  <div class="asset-summary-225"><div><small>전체 자산</small><strong>${data.digitalAssets.length}</strong></div><div><small>실제 리소스</small><strong>${connected}</strong></div><div><small>재사용 후보</small><strong>${reusable}</strong></div><div><small>평균 품질</small><strong>${avg}%</strong></div></div>
  <div class="asset-finder-tools-225 panel"><input value="${esc(data.assetFinder225.search||'')}" oninput="setAssetFinder225('search',this.value)" placeholder="자산·프로젝트·파일 검색"><select onchange="setAssetFinder225('type',this.value)">${assetFinderTypes225().map(x=>`<option ${data.assetFinder225.type===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div>
  <div id="assetFinderBody225"></div>`;
  renderAssetFinderBody225();
}
function renderAssetFinderBody225(){
  const box=$('#assetFinderBody225');if(!box)return;const state=data.assetFinder225,arr=assetFinderFiltered225();
  if(!arr.some(a=>a.id===state.selectedId))state.selectedId=arr[0]?.id||'';
  const selected=(data.digitalAssets||[]).find(a=>a.id===state.selectedId);
  const projects=assetFinderProjects225();
  box.innerHTML=`<div class="asset-finder-layout-225 panel">
    <aside class="asset-project-tree-225"><button class="${state.project==='All'?'active':''}" onclick="setAssetFinder225('project','All')"><span>▾ All Assets</span><b>${data.digitalAssets.length}</b></button>${projects.filter(x=>x!=='All').map(p=>{const n=data.digitalAssets.filter(a=>(a.project||'공통')===p).length;return `<button class="${state.project===p?'active':''}" onclick="setAssetFinder225('project',${JSON.stringify(p)})"><span>› ${esc(p)}</span><b>${n}</b></button>`}).join('')}</aside>
    <section class="asset-file-list-225"><div class="asset-list-head-225"><strong>${state.project==='All'?'All Assets':esc(state.project)}</strong><small>${arr.length} items</small></div>${arr.map(a=>`<button class="asset-file-row-225 ${state.selectedId===a.id?'active':''}" onclick="selectAssetFinder225('${a.id}')"><span class="asset-file-icon-225">${assetIcon225(a.type)}</span><span class="asset-file-text-225"><strong>${esc(a.name)}</strong><small>${esc(a.type)} · v${esc(a.version)} · ${esc(a.updated||'날짜 없음')}</small></span><em>${esc(a.status)}</em></button>`).join('')||emptyLine('조건에 맞는 자산이 없습니다.')}</section>
    <aside class="asset-detail-225">${selected?assetDetailFinder225(selected):'<div class="asset-empty-detail-225">자산을 선택하세요.</div>'}</aside>
  </div>`;
}
function assetDetailFinder225(a){
  const uses=(a.usageProjects||[]),related=(a.relatedIds||[]).map(id=>assetById(id)).filter(Boolean),quality=avgQualityV17(a);
  return `<div class="asset-detail-head-225"><span class="asset-file-icon-225 large">${assetIcon225(a.type)}</span><div><small>${esc(a.kind||'Asset')} · ${esc(a.type||'Other')}</small><h2>${esc(a.name)}</h2><p>${esc(a.project||'공통')} · v${esc(a.version||'1.0')}</p></div></div>
  <div class="asset-quality-225"><span><i style="width:${quality}%"></i></span><b>Quality ${quality}%</b></div>
  <dl class="asset-detail-list-225"><div><dt>Status</dt><dd>${esc(a.status||'Draft')}</dd></div><div><dt>Updated</dt><dd>${esc(a.updated||'-')}</dd></div><div><dt>Location</dt><dd title="${esc(a.location||a.externalUrl||'연결 없음')}">${esc(a.location||a.externalUrl||'연결 없음')}</dd></div><div><dt>Usage</dt><dd>${uses.length?uses.map(esc).join(' · '):'미연결'}</dd></div><div><dt>Related</dt><dd>${related.length?related.map(x=>esc(x.name)).join(' · '):'없음'}</dd></div></dl>
  <div class="asset-note-225"><small>설명·보완사항</small><p>${esc(a.note||'등록된 메모가 없습니다.')}</p></div>
  <div class="asset-detail-actions-225"><button onclick="openAssetModalV16('${a.id}')">관리</button>${(a.resource||a.externalUrl||a.location)?`<button onclick="openAssetResourceV16('${a.id}')">열기</button>`:''}</div>`;
}
pages.assets=renderAssetsV225;renderAssetsV14=renderAssetsV225;

const renderRoadmapV225Base=renderRoadmap;renderRoadmap=function(){renderRoadmapV225Base();const rows=document.querySelector('.roadmap-line');if(rows&&!rows.textContent.includes('v2.2.5'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.2.5 · Asset Finder & Registry Merge — 현재</strong><p>v0.6 Finder 탐색 구조와 현재 자산 메타데이터·품질·재사용 관리 기능 통합</p></div>');};pages.roadmap=renderRoadmap;
const renderSystemV225Base=pages.system;pages.system=function(){renderSystemV225Base();const rows=[...document.querySelectorAll('.system-row-222')];const version=rows.find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<div><h3>Version</h3><p>Asset Finder & Registry Merge</p></div><div class="system-value-222"><strong>Studio OS v2.2.5</strong></div>';};
document.title='Studio OS v2.2.5 · Asset Finder & Registry Merge';const brand225=document.querySelector('.brand small');if(brand225)brand225.textContent='Asset Finder · v2.2.5';buildNav();

/* =========================================================
   Studio OS v2.2.6 · Asset Finder Interaction & Layout Patch
   - Project tree applies a real filter
   - Expandable project/type navigation
   - Fixed middle-pane header and independent list scroll
   - Type dropdown placed before search
   ========================================================= */
(function initV226(){
  data.assetFinder225=data.assetFinder225||{project:'All',type:'All',search:'',selectedId:''};
  data.assetFinder225.expandedProject=data.assetFinder225.expandedProject||'';
  data.experiences=data.experiences||[];data.releaseNotes=data.releaseNotes||[];
  if(!data.experiences.some(x=>x.id==='EXP-046'))data.experiences.unshift({id:'EXP-046',title:'Asset Finder project filter and list header interaction failure',domain:'UI/UX',severity:'High',issue:'좌측 프로젝트를 눌러도 중앙 목록이 전체 자산으로 유지되고 중앙 헤더와 첫 행이 겹쳐 탐색 상태를 신뢰하기 어려움',cause:'프로젝트 선택 이벤트의 문자열 전달이 불안정했고 헤더와 목록이 하나의 스크롤 컨테이너를 공유함',solution:'dataset 기반 프로젝트 선택, 프로젝트별 실제 필터, 독립 스크롤 목록과 고정 헤더, 필터 우선 툴바로 재구성',prevention:'탐색 트리는 선택 상태뿐 아니라 결과 집합 변화를 반드시 동반하고 헤더와 콘텐츠 스크롤 영역을 분리',status:'Solved',project:'Studio OS',date:'2026-08-06',version:'v2.2.6'});
  if(!data.releaseNotes.some(x=>x.id==='RN-2.2.6'))data.releaseNotes.unshift({id:'RN-2.2.6',version:'v2.2.6',date:'2026-08-06',title:'Asset Finder Interaction & Layout',newItems:['프로젝트별 실제 자산 필터','Finder형 프로젝트/유형 펼침','중앙 목록 독립 스크롤'],improved:['검색·유형 필터 순서','선택 상태 유지','프로젝트별 개수 자동 계산'],fixed:['좌측 프로젝트 클릭 무반응','중앙 헤더와 첫 목록 겹침'],experiences:['EXP-046']});
  saveData();
})();

function assetProjectCount226(project,type='All'){
  return (data.digitalAssets||[]).filter(a=>(a.project||'공통')===project&&(type==='All'||(a.type||'Other')===type)).length;
}
function assetProjectTypes226(project){
  return [...new Set((data.digitalAssets||[]).filter(a=>(a.project||'공통')===project).map(a=>a.type||'Other'))].sort((a,b)=>String(a).localeCompare(String(b),'ko'));
}
function setAssetFinder226Project(project){
  const s=data.assetFinder225;
  if(project==='All'){
    s.project='All';s.expandedProject='';
  }else{
    const same=s.project===project;
    s.project=project;s.expandedProject=same&&s.expandedProject===project?'':project;
  }
  // A type that does not exist in the newly selected project is reset.
  const available=project==='All'?assetFinderTypes225():['All',...assetProjectTypes226(project)];
  if(!available.includes(s.type))s.type='All';
  const first=assetFinderFiltered225()[0];s.selectedId=first?.id||'';
  saveData();renderAssetFinderBody226();
}
function setAssetFinder226Type(type){
  const s=data.assetFinder225;s.type=type;
  const first=assetFinderFiltered225()[0];s.selectedId=first?.id||'';
  saveData();renderAssetFinderBody226();
}
function setAssetFinder226Search(value){
  const s=data.assetFinder225;s.search=value;
  const first=assetFinderFiltered225()[0];s.selectedId=first?.id||'';
  saveData();renderAssetFinderBody226();
}
function selectAssetFinder226(id){data.assetFinder225.selectedId=id;saveData();renderAssetFinderBody226();}

function renderAssetsV226(){
  const connected=(data.digitalAssets||[]).filter(a=>a.resource||a.externalUrl||a.location).length;
  const reusable=(data.digitalAssets||[]).filter(a=>['Reusable','Frozen'].includes(a.status)||avgQualityV17(a)>=80).length;
  const avg=Math.round((data.digitalAssets||[]).reduce((s,a)=>s+avgQualityV17(a),0)/Math.max(1,(data.digitalAssets||[]).length));
  const state=data.assetFinder225;
  const typeOptions=state.project==='All'?assetFinderTypes225():['All',...assetProjectTypes226(state.project)];
  $('#content').innerHTML=`<div class="page-title asset-title-225"><div><span class="eyebrow">ASSET FINDER</span><h1>Assets</h1><p>프로젝트와 유형을 먼저 좁힌 뒤 자산을 검색하고 상세 정보를 관리합니다.</p></div><button class="primary-btn compact" onclick="openAssetModalV16()">자산 등록</button></div>
  <div class="asset-summary-225"><div><small>전체 자산</small><strong>${data.digitalAssets.length}</strong></div><div><small>실제 리소스</small><strong>${connected}</strong></div><div><small>재사용 후보</small><strong>${reusable}</strong></div><div><small>평균 품질</small><strong>${avg}%</strong></div></div>
  <div class="asset-finder-tools-225 asset-finder-tools-226 panel"><select aria-label="자산 유형" onchange="setAssetFinder226Type(this.value)">${typeOptions.map(x=>`<option ${state.type===x?'selected':''}>${esc(x)}</option>`).join('')}</select><input value="${esc(state.search||'')}" oninput="setAssetFinder226Search(this.value)" placeholder="자산·프로젝트·파일 검색"></div>
  <div id="assetFinderBody225"></div>`;
  renderAssetFinderBody226();
}
function renderAssetFinderBody226(){
  const box=$('#assetFinderBody225');if(!box)return;
  const state=data.assetFinder225,arr=assetFinderFiltered225();
  if(!arr.some(a=>a.id===state.selectedId))state.selectedId=arr[0]?.id||'';
  const selected=(data.digitalAssets||[]).find(a=>a.id===state.selectedId);
  const projects=assetFinderProjects225().filter(x=>x!=='All');
  const tree=`<button class="${state.project==='All'?'active':''}" onclick="setAssetFinder226Project('All')"><span>▾ All Assets</span><b>${data.digitalAssets.length}</b></button>`+projects.map(p=>{
    const expanded=state.expandedProject===p;
    const pAttr=esc(p);
    const children=expanded?`<div class="asset-tree-children-226"><button class="${state.project===p&&state.type==='All'?'active':''}" data-project="${pAttr}" onclick="setAssetFinder226Project(this.dataset.project);event.stopPropagation()"><span>All types</span><b>${assetProjectCount226(p)}</b></button>${assetProjectTypes226(p).map(t=>`<button class="${state.project===p&&state.type===t?'active':''}" data-project="${pAttr}" data-type="${esc(t)}" onclick="data.assetFinder225.project=this.dataset.project;setAssetFinder226Type(this.dataset.type);event.stopPropagation()"><span>${esc(t)}</span><b>${assetProjectCount226(p,t)}</b></button>`).join('')}</div>`:'';
    return `<div class="asset-tree-group-226"><button class="${state.project===p?'active':''}" data-project="${pAttr}" onclick="setAssetFinder226Project(this.dataset.project)"><span>${expanded?'⌄':'›'} ${esc(p)}</span><b>${assetProjectCount226(p)}</b></button>${children}</div>`;
  }).join('');
  box.innerHTML=`<div class="asset-finder-layout-225 asset-finder-layout-226 panel">
    <aside class="asset-project-tree-225 asset-project-tree-226">${tree}</aside>
    <section class="asset-file-list-225 asset-file-list-226"><div class="asset-list-head-225 asset-list-head-226"><strong>${state.project==='All'?'All Assets':esc(state.project)}${state.type!=='All'?` · ${esc(state.type)}`:''}</strong><small>${arr.length} items</small></div><div class="asset-file-scroll-226">${arr.map(a=>`<button class="asset-file-row-225 ${state.selectedId===a.id?'active':''}" onclick="selectAssetFinder226('${a.id}')"><span class="asset-file-icon-225">${assetIcon225(a.type)}</span><span class="asset-file-text-225"><strong>${esc(a.name)}</strong><small>${esc(a.type)} · v${esc(a.version)} · ${esc(a.updated||'날짜 없음')}</small></span><em>${esc(a.status)}</em></button>`).join('')||'<div class="asset-empty-list-226">조건에 맞는 자산이 없습니다.</div>'}</div></section>
    <aside class="asset-detail-225">${selected?assetDetailFinder225(selected):'<div class="asset-empty-detail-225">자산을 선택하세요.</div>'}</aside>
  </div>`;
}
pages.assets=renderAssetsV226;renderAssetsV14=renderAssetsV226;renderAssetsV225=renderAssetsV226;renderAssetFinderBody225=renderAssetFinderBody226;

const renderRoadmapV226Base=renderRoadmap;renderRoadmap=function(){renderRoadmapV226Base();const rows=document.querySelector('.roadmap-line');if(rows&&!rows.textContent.includes('v2.2.6'))rows.insertAdjacentHTML('beforeend','<div class="roadmap-row current-roadmap"><strong>v2.2.6 · Asset Finder Interaction & Layout — 현재</strong><p>프로젝트 필터 연결·Finder형 유형 트리·목록 헤더/스크롤 분리·필터 우선 툴바</p></div>');};pages.roadmap=renderRoadmap;
const renderSystemV226Base=pages.system;pages.system=function(){renderSystemV226Base();const rows=[...document.querySelectorAll('.system-row-222')];const version=rows.find(x=>x.textContent.includes('Version'));if(version)version.innerHTML='<div><h3>Version</h3><p>Asset Finder Interaction & Layout</p></div><div class="system-value-222"><strong>Studio OS v2.2.6</strong></div>';};
document.title='Studio OS v2.2.6 · Asset Finder Interaction & Layout';const brand226=document.querySelector('.brand small');if(brand226)brand226.textContent='Asset Finder · v2.2.6';buildNav();
