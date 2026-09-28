document.querySelectorAll('.tab').forEach(function(t){
  t.addEventListener('click', function(){
    document.querySelectorAll('.tab').forEach(function(x){ x.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function(x){ x.classList.remove('active'); });
    t.classList.add('active');
    document.getElementById('panel-' + t.dataset.tab).classList.add('active');
  });
});

var expEl = document.getElementById('expires-at');
if(expEl){
  var ts = parseFloat(expEl.dataset.ts);
  expEl.textContent = ts > 0 ? new Date(ts*1000).toLocaleString() : 'Lifetime';
}

async function startFile(name){
  var r = await fetch('/server/start', {method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:'file=' + encodeURIComponent(name)});
  var j = await r.json();
  toast(j.msg, j.ok ? 'ok' : 'err');
  refresh();
}

async function ctl(action){
  if(action==='stop' && !confirm('Stop the running process?')) return;
  if(action==='delete' && !confirm('Kill process and clear logs?')) return;
  var map = {
    restart: '/server/restart',
    stop: '/server/stop',
    delete: '/server/delete'
  };
  var rr = await fetch(map[action], {method:'POST'});
  var j = await rr.json();
  toast(j.msg || 'done', j.ok ? 'ok' : 'err');
  refresh();
}

async function doInstall(e){
  e.preventDefault();
  var cmd = document.getElementById('install-cmd').value;
  var r = await fetch('/install', {method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:'command=' + encodeURIComponent(cmd)});
  var j = await r.json();
  toast(j.msg, j.ok ? 'ok' : 'err');
  return false;
}

var term = document.getElementById('term');
var installTerm = document.getElementById('install-term');
var logStatus = document.getElementById('log-status');
var statusText = document.getElementById('status-text');

async function refresh(){
  try{
    var r = await fetch('/logs');
    var j = await r.json();
    logStatus.textContent = j.running ? '● Running' : '● Stopped';
    logStatus.className = 'pill ' + (j.running ? 'pill-ok' : 'pill-off');
    if(statusText) statusText.textContent = j.running ? ('Running: ' + j.file) : 'Stopped';
    if(term){ term.textContent = j.logs.length ? j.logs.join('\n') : 'No logs yet.'; term.scrollTop = term.scrollHeight; }
    if(installTerm){
      installTerm.textContent = j.install.length ? j.install.join('\n') : 'Install log will appear here…';
      installTerm.scrollTop = installTerm.scrollHeight;
    }
  } catch(e) {}
}
refresh();
setInterval(refresh, 1500);
