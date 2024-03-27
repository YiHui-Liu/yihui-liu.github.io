function generatePieces(e,t){var n=[],a=1,r={lt:1,label:"0",color:t[0]};if(n.push(r),e&&e>=10){a=Math.floor(e/10)+1;for(var l=1;l<=10;l++){var r={};1==l?r.gte=1:r.gte=a*(l-1),r.lte=a*l,r.color=t[l],n.push(r)}}return JSON.stringify(n)}function append_div_visitcalendar(e,t){if(null!==e){if("string"==typeof t){var n=document.createElement("div");n.innerHTML=t;for(var a=document.createDocumentFragment();n.firstChild;)a.appendChild(n.firstChild);e.appendChild(a)}else e.appendChild(t)}}function compareFunction(e){return function(t,n){var a=t[e],r=n[e];return a>r?1:a==r?0:-1}}function filterTime(e){let t=new Date(e),n=t.getFullYear(),a=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,r=10>t.getDate()?"0"+t.getDate():t.getDate();return`${n}-${a}-${r}`}function calChart(){let e=document.createElement("script"),t=new Date,n=new Date;n.setFullYear(t.getFullYear()-1);let a;fetch("https://api.foolishfox.cn/umami/day_view?startAt="+(n.getTime()-86400*((n.getDay()+1)%7))+"&endAt="+t.getTime()).then(e=>e.json()).then(n=>{(n=n.pageviews).sort(compareFunction("x"));let a=[],r=0,l=0,o=0,i=0;for(let s=0;s<n.length;s++){if(s>0){let c=new Date(n[s-1].x.replace(/-/g,"/")),m=new Date(n[s].x.replace(/-/g,"/"));if(m.getTime()-c.getTime()!=864e5)for(let d=1;d<(m.getTime()-c.getTime())/864e5;d++)m=new Date(c.getTime()+864e5*d),a.push([filterTime(m),0])}a.push([n[s].x,n[s].y]),r=n[s].y>r?n[s].y:r,l+=n[s].y}a[a.length-1][0]!=filterTime(t)&&a.push([filterTime(t),0]);for(let $=a.length-1;$>=a.length-7;$--)o+=a[$][1];for(let p=a.length-1;p>=a.length-30;p--)i+=a[p][1];let u=JSON.stringify(a);e.innerHTML=`
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
                max: ${r},
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                bottom: 0,
                pieces: ${generatePieces(r,["#EBEDF0","#FFE9BB","#FFD1A7","#FFBB95","#FFA383","#FF8D70","#FF745C","#FF5C4A","#FF4638","#FF2E26","#FF1812"])}
            },
            calendar: [{
                left: 'center',
                range: ['${a[0][0]}', '${a[a.length-1][0]}'],
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
                data: ${u},
            }]
        };
        calChart.setOption(option);`;let g="<style>.number{margin-top: 10px;text-align:center;width:100%;padding:10px;margin:0 auto;}.contrib-column{text-align:center;border-left:1px solid #ddd;border-top:1px solid #ddd;}.contrib-column-first{border-left:0;}.table-column{padding:10px;display:table-cell;flex:1;vertical-align:top;}.contrib-number{font-weight:400;line-height:1.3em;font-size:24px;display:block;}.left.text-muted{float:left;margin-left:9px;color:#767676;}.left.text-muted a{color:#4078c0;text-decoration:none;}.left.text-muted a:hover{text-decoration:underline;}h2.f4.text-normal.mb-3{display:none;}.float-left.text-gray{float:left;}.position-relative{width:100%;}@media screen and (max-width:650px){.contrib-column{display:none}}</style>";g='<div style="display:flex;width:100%" class="number"><div class="contrib-column contrib-column-first table-column"><span class="text-muted">过去1年访问</span><span class="contrib-number">'+l+'</span><span class="text-muted">'+a[0][0]+"&nbsp;-&nbsp;"+a[a.length-1][0]+'</span></div><div class="contrib-column table-column"><span class="text-muted">最近30天访问</span><span class="contrib-number">'+i+'</span><span class="text-muted">'+a[a.length-30][0]+"&nbsp;-&nbsp;"+a[a.length-1][0]+'</span></div><div class="contrib-column table-column"><span class="text-muted">最近7天访问</span><span class="contrib-number">'+o+'</span><span class="text-muted">'+a[a.length-7][0]+"&nbsp;-&nbsp;"+a[a.length-1][0]+"</span></div></div>"+g,document.getElementById("calendar_container").after(e),append_div_visitcalendar(calendar_container,g)}).catch(function(e){console.log(e)})}function mapChart(){let e=document.createElement("script"),t=new Date,n=new Date;n.setFullYear(2021,9,1);let a;fetch("https://api.foolishfox.cn/umami/country?startAt="+n.getTime()+"&endAt="+t.getTime()).then(e=>e.json()).then(t=>{let n=[],a=0;for(let r=0;r<t.length;r++)a=t[r].y>a?t[r].y:a,n.push({name:t[r].x,value:t[r].y});let l=JSON.stringify(n);e.innerHTML=`
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
                data: ${l}
            }]
        };
        mapChart.setOption(mapOption);`,document.getElementById("map_container").after(e)}).catch(function(e){console.log(e)})}function get_year(e){return parseInt(e.substr(0,4))}function get_month(e){return parseInt(e.substr(5,2))}function trendsChart(){let e=document.createElement("script"),t=new Date,n=new Date;n.setFullYear(2021,9,1);let a;fetch("https://api.foolishfox.cn/umami/month_view?startAt="+n.getTime()+"&endAt="+t.getTime()).then(e=>e.json()).then(t=>{t=t.pageviews;let n=new Date,a={};for(let r=2020;r<=n.getFullYear();r++)a[String(r)]=[,,,,,,,,,,,];for(let l=0;l<t.length;l++){let o=get_year(t[l].x),i=get_month(t[l].x);a[String(o)][String(i-1)]=t[l].y}e.innerHTML=`
        var trendsChart = echarts.init(document.getElementById('trends_container'), 'light');
        var trendsOption = {
            title: { text: '访问趋势', x: 'center' },
            tooltip: { trigger: 'axis' },
            legend: { data: ['2021', '2022', '2023', '2024'], x: 'right' },
            xAxis: {
                name: '日期', type: 'category', boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: { name: '访问次数', type: 'value' },
            series: [
                {
                    name: '2021', type: 'line', smooth: true,
                    data: [654,865,334,769,866,673,659,981,518,${a["2021"][9]},${a["2021"][10]},${a["2021"][11]}],
                    markLine: { data: [{type: 'average', name: '平均值'}] }
                },
                {
                    name: '2022', type: 'line', smooth: true,
                    data: [${a["2022"]}],
                    markLine: { data: [{type: 'average', name: '平均值'}] }
                },
                {
                    name: '2023', type: 'line', smooth: true,
                    data: [${a["2023"]}],
                    markLine: { data: [{type: 'average', name: '平均值'}] }
                },
                {
                    name: '2024', type: 'line', smooth: true,
                    data: [${a["2024"]}],
                    markLine: { data: [{type: 'average', name: '平均值'}] }
                }
            ]
        };
        trendsChart.setOption(trendsOption);`,document.getElementById("trends_container").after(e)}).catch(function(e){console.log(e)})}function sourcesChart(){let e=document.createElement("script");var t=0,n=0,a=0,r=0,l=0,o=0,i=0,s=0,c=0;let m=new Date,d=new Date;d.setFullYear(2021,9,1);let $;fetch("https://api.foolishfox.cn/umami/referrer?startAt="+d.getTime()+"&endAt="+m.getTime()).then(e=>e.json()).then(m=>{for(let d=0;d<m.length;d++){var $=m[d].x;null==$||""==$||$.includes("foolishfox.cn")?n+=m[d].y:$.includes("bing.com")?o+=m[d].y:$.includes("baidu.com")?l+=m[d].y:$.includes("google.com")?r+=m[d].y:$.includes("sogou.com")||$.includes("sm.cn")||$.includes("toutiao.com")||$.includes("so.com")?a+=m[d].y:$.includes("github.com")?i+=m[d].y:$.includes("travellings")||$.includes("foreverblog")?s+=m[d].y:$.includes("weibo.cn")?c+=m[d].y:t+=m[d].y}t+=i+s+c,a+=l+r+o,e.innerHTML+=`
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
                        {value: ${a-r-l-o}, name: '其他', itemStyle: { color : '#008000' }},
                        {value: ${r}, name: '谷歌', itemStyle: { color : '#009000' }},
                        {value: ${l}, name: '百度', itemStyle: { color : '#00A000' }},
                        {value: ${o}, name: '必应', itemStyle: { color : '#00B000' }},
                        {value: ${n}, name: '直达', itemStyle: { color : '#FFDB5C' }},
                        {value: ${i}, name: 'Github', itemStyle: { color : '#87CEFA' }},
                        {value: ${c}, name: '微博', itemStyle: { color : '#00BFFF' }},
                        {value: ${s}, name: '开往/十年之约', itemStyle: { color : '#1E90FF' }},
                        {value: ${t-i-s-c}, name: '其他', itemStyle: { color : '#4682B4' }}
                    ]
                },
                {
                    name: '访问来源', type: 'pie', selectedMode: 'single', radius: [0, '30%'],
                    label: { position: 'inner', fontSize: 14},
                    labelLine: { show: false },
                    data: [
                        {value: ${a}, name: '搜索', itemStyle: { color : '#008000' }},
                        {value: ${n}, name: '直达', itemStyle: { color : '#FFDB5C' }},
                        {value: ${t}, name: '外链', itemStyle: { color : '#4682B4' }}
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
        });`}).catch(function(e){console.log(e)}),document.getElementById("sources_container").after(e)}document.getElementById("calendar_container")&&calChart(),document.getElementById("map_container")&&mapChart(),document.getElementById("trends_container")&&trendsChart(),document.getElementById("sources_container")&&sourcesChart();