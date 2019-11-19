window.onload=function () {
    searchEffect();

    timeBack();

    bannerEffect();
}

/*搜索栏JS效果*/
function  searchEffect() {
    /*头部搜索快*/
    var banner = document.querySelector('.jd_banner');
    var bannerheight = banner.offsetHeight;
    var search = document.querySelector('.jd_search');
    window.onscroll = function () {
        var offetTop = window.pageYOffset;
        if (offetTop <= 311) {
            opacity = offetTop / 311;
            search.style.backgroundColor = 'rgba(233,35,34,' + opacity + ')';
        } else {
            opacity = 1;
        }
    }
}

/*倒计时JS效果*/
function timeBack() {
    var spans = document.querySelector('.jd_sk_time');
    span = spans.querySelectorAll('span');
    var totalTime = 3600;
    var timer = setInterval(function () {
        totalTime--;
        if (totalTime == 0){
            clearInterval(timer);
        }
        var hour =  Math.floor(totalTime/3600);
        var minute = Math.floor(totalTime%3600/60);
        var second = Math.floor(totalTime%3600%60%60);
        span[0].innerText=''+Math.floor(hour/10%10);
        span[1].innerText=''+hour%10;
        span[3].innerText=''+Math.floor(minute/10%10);
        span[4].innerText=''+minute%10;
        span[6].innerText=''+Math.floor(second/10%10);
        span[7].innerText=''+second%10;
        console.log(hour+':'+minute+':'+second);
    },1000)
}

/*轮播图*/
function bannerEffect() {
    /*图片索引*/
    var index = 1;
    /*小圆点*/
    var indicators = document.querySelectorAll('.jd_bannerIndicator>li');
    indicators[index-1].className='active';
    var banner= document.querySelector('.jd_banner');
    var imgBox = banner.querySelectorAll('ul')[0];
    var first = imgBox.querySelectorAll('li')[0];
    var last = imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
    /*获取li数量*/
    var lis = imgBox.querySelectorAll('li');
    var count = imgBox.querySelectorAll('li').length;

    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count*bannerWidth+'px';
    for (var i = 0; i < lis.length ; i++){
        lis[i].style.width = bannerWidth+'px';
    }
    /*默认偏移*/
    imgBox.style.left = -bannerWidth+'px';
    /*当屏幕尺寸变化时，应重新计算宽度*/
    window.onresize =function () {
        /*获取banner宽度*/
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count*bannerWidth+'px';
        for (var i = 0; i < lis.length ; i++){
            lis[i].style.width = bannerWidth+'px';
        }
        /*默认偏移*/
        imgBox.style.left = -index*bannerWidth+'px';
    }

    /*自动轮播效果*/
    var timer;
    var starttimer = function () {
            timer = setInterval(function () {
            index++;
            imgBox.style.transition='left 1s ease-in-out';
            imgBox.style.left=(-index*bannerWidth)+'px';
            setTimeout(function () {
                if (index ==count-1){
                    index = 1;
                    imgBox.style.transition='none';
                    imgBox.style.left=(-index*bannerWidth)+'px';
                }
            },1000);
        },3000);
    }
    starttimer();

    /*手动轮播*/
    var startX,moveX,distanceX;
    var isEnd = true;/*节流阀*/
    imgBox.addEventListener('touchstart',function (e) {
        clearInterval(timer);
        startX=e.targetTouches[0].clientX;
    })
    imgBox.addEventListener('touchmove',function (e) {
        if (isEnd == true){
            moveX = e.targetTouches[0].clientX ;
            distanceX = moveX-startX;
            /*自动滚动之后会添加过度效果，造成手动拖动时产生延迟*/
            imgBox.style.transition = 'none';
            imgBox.style.left = (-index*bannerWidth+distanceX)+'px';
        }
    })
    imgBox.addEventListener('touchend',function () {
        isEnd = false;
        if (Math.abs(distanceX)>100){
            if (distanceX>0){
                index--;
            }
            else {
                index++;
            }
            imgBox.style.transition='left 0.5s ease-in-out';
            imgBox.style.left = -index*bannerWidth+'px';
        }
        if (Math.abs(distanceX)<100 && Math.abs(distanceX)>0){
            imgBox.style.transition = 'left 0.5s ease-in-out';
            imgBox.style.left = -index*bannerWidth+'px';
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        /*重开定时器*/
        starttimer();
    });

    imgBox.addEventListener('webkitTransitionEnd',function () {
        if (index == count-1){
            index=1;
            imgBox.style.transition = 'none';
            imgBox.style.left = -index*bannerWidth+'px';
        }
        else if (index == 0){
            index=count-2;
            imgBox.style.transition = 'none';
            imgBox.style.left = -index*bannerWidth+'px';
        }
        for (var i=0; i<indicators.length; i++){
            indicators[i].className='';
        }
        indicators[index-1].className='active';
        isEnd = true;

    })
}

