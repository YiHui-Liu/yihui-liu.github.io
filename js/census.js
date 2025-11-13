let maxDays=180;function generatePieces(e,t){var n=[];var a=1;var l={lt:1,label:"0",color:t[0]};n.push(l);if(e&&e>=10){a=Math.floor(e/10)+1;for(var o=1;o<=10;o++){var l={};if(o==1)l.gte=1;else l.gte=a*(o-1);l.lte=a*o;l.color=t[o];n.push(l)}}return JSON.stringify(n)}function append_div_visitcalendar(e,t){if(e!==null){if(typeof t==="string"){var n=document.createElement("div");n.innerHTML=t;var a=document.createDocumentFragment();while(n.firstChild){a.appendChild(n.firstChild)}e.appendChild(a)}else{e.appendChild(t)}}}function compareFunction(l){return function(e,t){var n=e[l];var a=t[l];return n>a?1:n==a?0:-1}}function filterTime(e){const t=new Date(e);const n=t.getFullYear();const a=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1;const l=t.getDate()<10?"0"+t.getDate():t.getDate();return`${n}-${a}-${l}`}function calChartFunc(){let c=document.createElement("script");let m=new Date;let e=new Date;e.setFullYear(m.getFullYear()-1);let t=m.getTime();let n=e.getTime()-3600*24*((e.getDay()+1)%7);if(n<t-maxDays*86400*1e3)n=t-maxDays*86400*1e3;fetch("https://api.foolishfox.cn/umami/day_view?startAt="+n+"&endAt="+t).then(e=>e.json()).then(a=>{a=a.pageviews;a.sort(compareFunction("x"));let l=[];let t=0,n=0,o=0,r=0;let e=["#EBEDF0","#FFE9BB","#FFD1A7","#FFBB95","#FFA383","#FF8D70","#FF745C","#FF5C4A","#FF4638","#FF2E26","#FF1812"];for(let e=0;e<a.length;e++){if(e>0){let t=new Date(a[e-1].x.replace(/-/g,"/"));let n=new Date(a[e].x.replace(/-/g,"/"));if(n.getTime()-t.getTime()!=86400*1e3)for(let e=1;e<(n.getTime()-t.getTime())/(86400*1e3);e++){n=new Date(t.getTime()+86400*1e3*e);l.push([filterTime(n).slice(0,10),0])}}l.push([a[e].x.slice(0,10),a[e].y]);t=a[e].y>t?a[e].y:t;n+=a[e].y}if(l[l.length-1][0]!=filterTime(m))l.push([filterTime(m),0]);for(let e=l.length-1;e>=l.length-7;e--)o+=l[e][1];for(let e=l.length-1;e>=l.length-30;e--)r+=l[e][1];let i=JSON.stringify(l);c.innerHTML=`
        var calChart = echarts.init(document.getElementById("calendar_container"));
        var option = {
            title: { text: '访问日历', x: 'center' },
            tooltip: {
                padding: 10,
                backgroundColor: '#555',
                borderColor: '#777',
                borderWidth: 1,
                textStyle: { color: '#fff' },
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="font-size: 14px;">' + value[0] + ': ' + value[1] + '</div>';
                }
            },
            visualMap: {
                show: false,
                showLabel: true,
                min: 0,
                max: ${t},
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                bottom: 0,
                pieces: ${generatePieces(t,e)}
            },
            calendar: [{
                left: 'center',
                range: ['${l[0][0]}', '${l[l.length-1][0]}'],
                cellSize: [14, 14],
                splitLine: {
                    show: false
                },
                itemStyle: {
                    color: '#ebedf0',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                yearLabel: {
                    show: false
                },
                monthLabel: {
                    nameMap: 'cn',
                    fontSize: 11
                },
                dayLabel: {
                    formatter: '{start}  1st',
                    nameMap: 'cn',
                    fontSize: 11
                }
            }],
            series: [{
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 0,
                data: ${i},
            }]
        };
        calChart.setOption(option);`;let s="<style>.number{margin-top: 10px;text-align:center;width:100%;padding:10px;margin:0 auto;}.contrib-column{text-align:center;border-left:1px solid #ddd;border-top:1px solid #ddd;}.contrib-column-first{border-left:0;}.table-column{padding:10px;display:table-cell;flex:1;vertical-align:top;}.contrib-number{font-weight:400;line-height:1.3em;font-size:24px;display:block;}.left.text-muted{float:left;margin-left:9px;color:#767676;}.left.text-muted a{color:#4078c0;text-decoration:none;}.left.text-muted a:hover{text-decoration:underline;}h2.f4.text-normal.mb-3{display:none;}.float-left.text-gray{float:left;}.position-relative{width:100%;}@media screen and (max-width:650px){.contrib-column{display:none}}</style>";s='<div style="display:flex;width:100%" class="number"><div class="contrib-column contrib-column-first table-column"><span class="text-muted">过去'+maxDays+'天访问</span><span class="contrib-number">'+n+'</span><span class="text-muted">'+l[0][0]+"&nbsp;-&nbsp;"+l[l.length-1][0]+'</span></div><div class="contrib-column table-column"><span class="text-muted">最近30天访问</span><span class="contrib-number">'+r+'</span><span class="text-muted">'+l[l.length-30][0]+"&nbsp;-&nbsp;"+l[l.length-1][0]+'</span></div><div class="contrib-column table-column"><span class="text-muted">最近7天访问</span><span class="contrib-number">'+o+'</span><span class="text-muted">'+l[l.length-7][0]+"&nbsp;-&nbsp;"+l[l.length-1][0]+"</span></div></div>"+s;document.getElementById("calendar_container").after(c);append_div_visitcalendar(calendar_container,s)}).catch(function(e){console.log(e)})}function mapChartFunc(){let l=document.createElement("script");let e=new Date;let t=new Date;t.setFullYear(2021,9,1);let n=t.getTime();let a=e.getTime();fetch("https://api.foolishfox.cn/umami/country?startAt="+n+"&endAt="+a).then(e=>e.json()).then(t=>{let n=[];let a=0;for(let e=0;e<t.length;e++){a=t[e].y>a?t[e].y:a;n.push({name:t[e].x,value:t[e].y})}let e=JSON.stringify(n);l.innerHTML=`
        var mapChart = echarts.init(document.getElementById('map_container'), 'light');
        var mapOption = {
            title: { text: '访问地点(按人数记)', x: 'center' },
            tooltip: { trigger: 'item' },
            visualMap: {
                min: 0,
                max: ${a},
                left: 'left',
                top: 'bottom',
                text: ['高','低'],
                color: ['#1E90FF', '#AAFAFA'],
                calculable: true
            },
            series: [{
                name: '访问人数',
                type: 'map',
                mapType: 'world',
                showLegendSymbol: false,
                label: {
                    emphasis: { show: false }
                },
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#121212'
                    },
                    emphasis: { areaColor: 'gold' }
                },
                data: ${e}
            }]
        };
        mapChart.setOption(mapOption);`;document.getElementById("map_container").after(l)}).catch(function(e){console.log(e)})}function get_year(e){return parseInt(e.substr(0,4))}function get_month(e){return parseInt(e.substr(5,2))}function trendsChartFunc(){let e=document.createElement("script");let t=new Date;let n=new Date;n.setFullYear(2021,9,1);let a=n.getTime();let l=t.getTime();fetch("https://api.foolishfox.cn/umami/month_view?startAt="+a+"&endAt="+l).then(e=>e.json()).then(a=>{a=a.pageviews;let t=new Date;let l={};for(let e=2020;e<=t.getFullYear();e++)l[String(e)]=[,,,,,,,,,,,];for(let n=0;n<a.length;n++){let e=get_year(a[n].x);let t=get_month(a[n].x);l[String(e)][String(t-1)]=a[n].y}e.innerHTML=`
        var trendsChart = echarts.init(document.getElementById('trends_container'), 'light');
        var trendsOption = {
            title: { text: '访问趋势', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { data: ['2021', '2022', '2023', '2024', '2025'], x: 'right' },
            xAxis: {
                name: '日期', type: 'category', boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: { type: 'log', name: '访问次数' },
            series: [
                {
                    name: '2021', type: 'line', smooth: true,
                    data: [654,865,334,769,866,673,659,981,518,${l["2021"][9]},${l["2021"][10]},${l["2021"][11]}],
                },
                {
                    name: '2022', type: 'line', smooth: true,
                    data: [${l["2022"]}],
                },
                {
                    name: '2023', type: 'line', smooth: true,
                    data: [${l["2023"]}],
                },
                {
                    name: '2024', type: 'line', smooth: true,
                    data: [${l["2024"]}],
                },
                {
                    name: '2025', type: 'line', smooth: true,
                    data: [${l["2025"]}],
                }
            ]
        };
        trendsChart.setOption(trendsOption);`;document.getElementById("trends_container").after(e)}).catch(function(e){console.log(e)})}function sourcesChartFunc(){let e=document.createElement("script");var a=0,l=0,o=0;var r=0,i=0,s=0;var c=0,m=0,d=0;let t=new Date;let n=new Date;n.setFullYear(2021,9,1);let u=n.getTime();let p=t.getTime();fetch("https://api.foolishfox.cn/umami/referrer?startAt="+u+"&endAt="+p).then(e=>e.json()).then(t=>{for(let e=0;e<t.length;e++){var n=t[e].x;if(n==null||n==""||n.includes("foolishfox.cn"))l+=t[e].y;else if(n.includes("bing.com"))s+=t[e].y;else if(n.includes("baidu.com"))i+=t[e].y;else if(n.includes("google.com"))r+=t[e].y;else if(n.includes("sogou.com")||n.includes("sm.cn")||n.includes("toutiao.com")||n.includes("so.com"))o+=t[e].y;else if(n.includes("github.com"))c+=t[e].y;else if(n.includes("travellings")||n.includes("foreverblog"))m+=t[e].y;else if(n.includes("weibo.cn"))d+=t[e].y;else a+=t[e].y}a+=c+m+d;o+=i+r+s;e.innerHTML+=`
        var sourcesChart = echarts.init(document.getElementById('sources_container'), 'light');
        var sourcesOption = {
            title: { text: '访问来源', x: 'center', },
            tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
            legend: {
                data: ['直达', '外链', '搜索', '百度', '谷歌', '必应', 'Github', '开往/十年之约', '微博'],
                y: 'bottom'
            },
            series: [
                {
                    name: '来源明细', type: 'pie', radius: ['45%', '60%'],
                    labelLine: { length: 30 },
                    label: {
                        formatter: '{a|{a}}{abg|}\\n{hr|}\\n  {b|{b}: }{c}  {per|{d}%}  ',
                        backgroundColor: '#F6F8FC', borderColor: '#8C8D8E',
                        borderWidth: 1, borderRadius: 4,
                        rich: {
                            a: { color: '#6E7079', lineHeight: 22, align: 'center' },
                            hr: { borderColor: '#8C8D8E', width: '100%', borderWidth: 1, height: 0 },
                            b: { color: '#4C5058', fontSize: 14, fontWeight: 'bold', lineHeight: 33 },
                            per: { color: '#fff', backgroundColor: '#4C5058', padding: [3, 4], borderRadius: 4 }
                        }
                    },
                    data: [
                        {value: ${o-r-i-s}, name: '其他', itemStyle: { color : '#008000' }},
                        {value: ${r}, name: '谷歌', itemStyle: { color : '#009000' }},
                        {value: ${i}, name: '百度', itemStyle: { color : '#00A000' }},
                        {value: ${s}, name: '必应', itemStyle: { color : '#00B000' }},
                        {value: ${l}, name: '直达', itemStyle: { color : '#FFDB5C' }},
                        {value: ${c}, name: 'Github', itemStyle: { color : '#87CEFA' }},
                        {value: ${d}, name: '微博', itemStyle: { color : '#00BFFF' }},
                        {value: ${m}, name: '开往/十年之约', itemStyle: { color : '#1E90FF' }},
                        {value: ${a-c-m-d}, name: '其他', itemStyle: { color : '#4682B4' }}
                    ]
                },
                {
                    name: '访问来源', type: 'pie', selectedMode: 'single', radius: [0, '30%'],
                    label: { position: 'inner', fontSize: 14},
                    labelLine: { show: false },
                    data: [
                        {value: ${o}, name: '搜索', itemStyle: { color : '#008000' }},
                        {value: ${l}, name: '直达', itemStyle: { color : '#FFDB5C' }},
                        {value: ${a}, name: '外链', itemStyle: { color : '#4682B4' }}
                    ]
                },
            ]
        };
        sourcesChart.setOption(sourcesOption);
        window.addEventListener("resize", () => { 
            calChart.resize();
            mapChart.resize();
            trendsChart.resize();
            sourcesChart.resize();
        });`}).catch(function(e){console.log(e)});document.getElementById("sources_container").after(e)}if(document.getElementById("calendar_container"))calChartFunc();if(document.getElementById("map_container"))mapChartFunc();if(document.getElementById("trends_container"))trendsChartFunc();if(document.getElementById("sources_container"))sourcesChartFunc();