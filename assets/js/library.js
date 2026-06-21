const ACCESS_HASH='b4587def7726374a042eab4694517bfb5e3fcc26c129541a20522da99cf3d74d';
    const ACCESS_KEY='medihim_strategy_access_v3370';
const accessView=document.getElementById('accessView');
    const libraryView=document.getElementById('libraryView');
    const accessForm=document.getElementById('accessForm');
    const passwordInput=document.getElementById('password');
    const errorBox=document.getElementById('error');
    const cardGrid=document.getElementById('cardGrid');
    const filters=document.getElementById('filters');
    const documentSearch=document.getElementById('documentSearch');
    const docCount=document.getElementById('docCount');
    let activeCategory='전체';

    async function digest(value){
      const buffer=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
      return [...new Uint8Array(buffer)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
    }

    function showLibrary(){
      accessView.classList.add('hidden');
      libraryView.classList.remove('hidden');
      renderFilters();
      renderCards();
      window.scrollTo(0,0);
    }

    function showAccess(){
      libraryView.classList.add('hidden');
      accessView.classList.remove('hidden');
      passwordInput.value='';
      errorBox.textContent='';
      setTimeout(()=>passwordInput.focus(),50);
    }

    function escapeHtml(value){
      return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
    }

    function renderFilters(){
      const categories=['전체',...new Set(documents.flatMap(document=>document.categories))];
      filters.innerHTML=categories.map(category=>`<button type="button" class="filter-btn ${category===activeCategory?'active':''}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
      filters.querySelectorAll('.filter-btn').forEach(button=>button.addEventListener('click',()=>{
        activeCategory=button.dataset.category;
        renderFilters();
        renderCards();
      }));
    }

    function renderCards(){
      const query=documentSearch.value.trim().toLowerCase();
      const filtered=documents.filter(document=>{
        const categoryMatch=activeCategory==='전체'||document.categories.includes(activeCategory);
        const searchText=[document.title,document.description,document.note,...document.categories,...document.meta].join(' ').toLowerCase();
        return categoryMatch&&(!query||searchText.includes(query));
      });
      docCount.textContent=`총 ${filtered.length}개 문서`;
      if(!filtered.length){
        cardGrid.innerHTML='<div class="empty-state">조건에 맞는 프레임워크가 없습니다.</div>';
        return;
      }
      cardGrid.innerHTML=filtered.map(document=>{
        const originalIndex=documents.indexOf(document)+1;
        return `<article class="doc-card">
          <div class="card-top"><span class="card-no">FRAMEWORK ${String(originalIndex).padStart(2,'0')}</span><span class="status">${escapeHtml(document.status)}</span></div>
          <div class="tags">${document.categories.map(category=>`<span class="tag">${escapeHtml(category)}</span>`).join('')}</div>
          <h3>${escapeHtml(document.title)}</h3>
          <p class="description">${escapeHtml(document.description)}</p>
          <div class="card-foot">
            <div class="card-meta">${document.meta.map(item=>`<span>${escapeHtml(item)}</span>`).join('')}</div>
            <a class="open-link" href="${encodeURI(document.href)}"><span>${escapeHtml(document.note)}</span><span class="arrow">→</span></a>
          </div>
        </article>`;
      }).join('');
    }

    accessForm.addEventListener('submit',async event=>{
      event.preventDefault();
      const value=passwordInput.value;
      try{
        if(await digest(value)===ACCESS_HASH){
          sessionStorage.setItem(ACCESS_KEY,'granted');
          showLibrary();
        }else{
          errorBox.textContent='접속번호가 일치하지 않습니다.';
        }
      }catch(error){
        if(value==='3370'){
          sessionStorage.setItem(ACCESS_KEY,'granted');
          showLibrary();
        }else{
          errorBox.textContent='접속번호가 일치하지 않습니다.';
        }
      }
    });

    documentSearch.addEventListener('input',renderCards);
    document.getElementById('lockButton').addEventListener('click',()=>{
      sessionStorage.removeItem(ACCESS_KEY);
      showAccess();
    });

    if(sessionStorage.getItem(ACCESS_KEY)==='granted'){
      showLibrary();
    }
