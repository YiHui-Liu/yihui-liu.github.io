window.addEventListener("load",()=>{const{algolia:e}=GLOBAL_CONFIG;const{appId:t,apiKey:a,indexName:n,hitsPerPage:i=5,languages:s}=e;if(!t||!a||!n){return console.error("Algolia setting is invalid!")}const o=document.getElementById("search-mask");const l=document.querySelector("#algolia-search .search-dialog");const r=e=>{const t=e?"animateIn":"animateOut";const a=e?"to_show 0.5s":"to_hide 0.5s";const n=e?"titleScale 0.5s":"search_close .5s";btf[t](o,a);btf[t](l,n)};const c=()=>{if(window.innerWidth<768){l.style.setProperty("--search-height",`${window.innerHeight}px`)}};const d=()=>{btf.overflowPaddingR.add();r(true);setTimeout(()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()},100);const t=e=>{if(e.code==="Escape"){g();document.removeEventListener("keydown",t)}};document.addEventListener("keydown",t);c();window.addEventListener("resize",c)};const g=()=>{btf.overflowPaddingR.remove();r(false);window.removeEventListener("resize",c)};const h=()=>{btf.addEventListenerPjax(document.querySelector("#search-button > .search"),"click",d)};const u=()=>{o.addEventListener("click",g);document.querySelector("#algolia-search .search-close-button").addEventListener("click",g)};const f=e=>{if(!e)return"";const t=e.indexOf("<mark>");let a=t-30;let n=t+120;let i="";let s="";if(a<=0){a=0;n=140}else{i="..."}if(n>e.length){n=e.length}else{s="..."}return`${i}${e.substring(a,n)}${s}`};const m=[document.getElementById("algolia-hits"),document.getElementById("algolia-pagination"),document.querySelector("#algolia-info .algolia-stats")];const p=instantsearch({indexName:n,searchClient:algoliasearch(t,a),searchFunction(t){m.forEach(e=>{e.style.display=t.state.query?"":"none"});if(t.state.query)t.search()}});const w=[instantsearch.widgets.configure({hitsPerPage:i}),instantsearch.widgets.searchBox({container:"#algolia-search-input",showReset:false,showSubmit:false,placeholder:s.input_placeholder,showLoadingIndicator:true}),instantsearch.widgets.hits({container:"#algolia-hits",templates:{item(e){const t=e.permalink||GLOBAL_CONFIG.root+e.path;const a=e._highlightResult;const n=a.contentStripTruncate?f(a.contentStripTruncate.value):a.contentStrip?f(a.contentStrip.value):a.content?f(a.content.value):"";return`
            <a href="${t}" class="algolia-hit-item-link">
              <span class="algolia-hits-item-title">${a.title.value||"no-title"}</span>
              ${n?`<div class="algolia-hit-item-content">${n}</div>`:""}
            </a>`},empty(e){return`<div id="algolia-hits-empty">${s.hits_empty.replace(/\$\{query}/,e.query)}</div>`}}}),instantsearch.widgets.stats({container:"#algolia-info > .algolia-stats",templates:{text(e){const t=s.hits_stats.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS);return`<hr>${t}`}}}),instantsearch.widgets.poweredBy({container:"#algolia-info > .algolia-poweredBy"}),instantsearch.widgets.pagination({container:"#algolia-pagination",totalPages:5,templates:{first:'<i class="fas fa-angle-double-left"></i>',last:'<i class="fas fa-angle-double-right"></i>',previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}})];p.addWidgets(w);p.start();h();u();window.addEventListener("pjax:complete",()=>{if(!btf.isHidden(o))g();h()});if(window.pjax){p.on("render",()=>{window.pjax.refresh(document.getElementById("algolia-hits"))})}});