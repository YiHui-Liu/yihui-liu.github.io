(async()=>{"serviceWorker"in navigator?(console.log("FOW_SW is uninstalling."),navigator.serviceWorker.getRegistrations().then(function(e){for(let i of e)i.active.scriptURL.includes("foolishfox.cn/sw.js")&&i.unregister()})):console.log("FOW_SW is not supported.")})();