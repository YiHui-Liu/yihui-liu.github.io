function goMemos(){let e=document.getElementsByClassName("swiper-slide-active")[0].id;pjax.loadUrl(`/memos/\#${e}`)}function initMemos(){if(document.querySelector("#memos-mini")){let e=new Swiper(".swiper",{direction:"vertical",loop:true,autoplay:{delay:3e3,pauseOnMouseEnter:true},enable:true})}}function whenDOMReady(){initMemos();console.warn("memos_mini.js loaded")}async function load_memos(){const e=await fetch("https://memos.foolishfox.cn/api/v1/memos?filter=creator%3D%3D%27users%2F1%27%26%26visibilities%3D%3D%5B%27PUBLIC%27%5D");const i=await e.json();const s=i.memos.slice(0,10).map(e=>{let i=e.content,s=i.replace(/#(.*?)\s|\n/g,"").replace(/\!\[(.*?)\]\((.*?)\)/g,"").replace(/\[(.*?)\]\((.*?)\)/g,`<a href="$2">@$1</a>`).trim();type=i.match(/\!\[(.*?)\]\((.*?)\)/g)?"[图片]":i.match(/{\s*music\s*(.*?)\s*(.*?)\s*}/g)?"[音乐]":i.match(/{\s*player\s*(.*)\s*}/g)||i.match(/{\s*bilibili\s*(.*?)\s*}/g)?"[视频]":"";if(e.resources)type="[图片]";return`<div class="li-style swiper-slide" id="${e.name.replace("/","-")}">${s+type}</div>`});document.querySelector("#memos-mini").innerHTML=s.join(" ")}var html=`
    <div class="memos-mini wow animation-slide-in" data-wow-duration="1s" data-wow-delay="200ms" data-wow-offset="100" data-wow-iteration="1">
        <i class="iconfont icon-jike" title="即刻" onclick="goMemos()" style="font-size:1rem;margin-right:.5rem"></i>
        <div class="swiper swiper-no-swiping" id="memos" tabindex="-1" onclick="goMemos()">
            <div class="swiper-wrapper" id="memos-mini">
                <div class="li-style memos-loading" style="text-align: center">正在加载...</div>
            </div>
        </div>
        <i class="iconfont icon-xiangyou" title="查看全文" onclick="goMemos()" style="margin-left:1rem"></i>
    </div>
`;var container=document.getElementById("recent-posts");if(container){container.innerHTML=html+container.innerHTML;load_memos();setTimeout(function(){whenDOMReady()},1500)}