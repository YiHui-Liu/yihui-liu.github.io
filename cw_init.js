navigator.serviceWorker?("true"!==localStorage.getItem("cw_installed")&&window.stop(),navigator.serviceWorker.register("/cw.js?t="+new Date().getTime()).then(async e=>{if("true"!==localStorage.getItem("cw_installed")){let r=()=>{console.log("[CW] Installing Success,Configuring..."),fetch("/cw-cgi/api?type=config").then(e=>e.text()).then(e=>{"ok"===e?(console.log("[CW] Installing Success,Configuring Success,Starting..."),localStorage.setItem("cw_installed","true"),window.location.reload()):(console.warn("[CW] Installing Success,Configuring Failed,Sleeping 200ms..."),setTimeout(()=>{r()},200))}).catch(e=>{console.log("[CW] Installing Success,Configuring Error,Exiting...")})};setTimeout(()=>{r()},50)}}).catch(e=>{console.error("[CW] Installing Failed,Error: "+e.message)})):console.error("[CW] Installing Failed,Error: Browser not support service worker");