document.querySelectorAll('.tab').forEach(function(t){
  t.addEventListener('click', function(){
    document.querySelectorAll('.tab').forEach(function(x){ x.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function(x){ x.classList.remove('active'); });
    t.classList.add('active');
    document.getElementById('panel-' + t.dataset.tab).classList.add('active');
  });
});

document.querySelectorAll('.ts').forEach(function(el){
  el.textContent = new Date(parseFloat(el.dataset.ts)*1000).toLocaleString();
});

function addPlan(){
  var wrap = document.getElementById('new-plans');
  var div = document.createElement('div');
  div.style.cssText = 'border:1px dashed var(--border-hi);border-radius:12px;padding:18px;margin-bottom:14px';
  div.innerHTML = '<div class="grid-2" style="gap:12px">'
    + '<div class="form-row"><label>Plan Name</label><input class="input" name="p_name" placeholder="New Plan"></div>'
    + '<div class="form-row"><label>Duration</label><input class="input" name="p_duration" placeholder="30 Days"></div>'
    + '<div class="form-row"><label>Price</label><input class="input" name="p_price" placeholder="499"></div>'
    + '<div class="form-row"><label>Features</label><input class="input" name="p_features" placeholder="feature1, feature2"></div>'
    + '</div>';
  wrap.appendChild(div);
}
