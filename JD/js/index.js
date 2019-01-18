window.onload = function() {
    getSearch();
    timeBack();
    bannerEffect();
}

function getSearch() {
    //获取banner
    var banner = document.querySelector('.jd_banner');
    //获取banner的高度
    var bannerHeight = banner.offsetHeight;
    //获取search
    var search = document.querySelector('.jd_search');
    //屏幕滚动事件
    window.onscroll = function() {
        //获取屏幕滚动出去的高度
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // console.log(scrollTop);

        var opacity = 0;
        //判断
        if (scrollTop <= bannerHeight) {
            opacity = scrollTop / bannerHeight;
            //设置search的透明度;
            search.style.backgroundColor = "rgba(235,35,34," + opacity + ")";
        }
    }
}

//倒计时
function timeBack() {
    var spans = document.querySelector('.jd_seckillLeft').querySelectorAll('span');
    var timeEnd = 3800;
    //定义定时器
    var timeId = setInterval(function() {
        timeEnd--;
        if (timeEnd == 0) {
            clearInterval(timeId);
        }
        var hour = Math.floor(timeEnd / 3600);
        var minute = Math.floor(timeEnd % 3600 / 60);
        var second = Math.floor(timeEnd % 60);
        spans[2].innerHTML = Math.floor(hour / 10);
        spans[3].innerHTML = Math.floor(hour % 10);
        spans[5].innerHTML = Math.floor(minute / 10);
        spans[6].innerHTML = Math.floor(minute % 10);
        spans[8].innerHTML = Math.floor(second / 10);
        spans[9].innerHTML = Math.floor(second % 10);
    }, 1000)
}
//轮播图
function bannerEffect() {
    //1.设置修改轮播图的页面结构
    //获取banner
    var banner = document.querySelector('.jd_banner');
    //获取ul
    var bannerImg = document.querySelector('.jd_bannerImg');
    //获取ul中第一个li
    var firstLi = bannerImg.querySelector('li:first-of-type');
    //获取ul中最后一个li
    var lastLi = bannerImg.querySelector('li:last-of-type');
    //克隆第一个li 放在最后面
    bannerImg.appendChild(firstLi.cloneNode(true));
    //克隆原最后一个li 放在最前面
    bannerImg.insertBefore(lastLi.cloneNode(true), firstLi);


    //2.设置对应的样式
    //获取所有的ul中的li
    var lis = bannerImg.querySelectorAll('li');
    //获取li元素的数量
    var count = lis.length;
    //获取banner的宽度
    var bannerWidth = banner.offsetWidth;
    //设置ul的宽度
    bannerImg.style.width = bannerWidth * count + 'px';
    //循环设置每个li的宽度
    for (var i = 0; i < count; i++) {
        //每个li的宽度与banner的宽度一致
        lis[i].style.width = bannerWidth + 'px';
    }
    //3.设置ul默认的偏移
    bannerImg.style.left = -bannerWidth + 'px';


    //定义轮播图片的索引,默认为第二张  索引为1
    var index = 1;

    // 4. 当屏幕变化的时候, 重新计算宽度
    window.onresize = function() {
        //获取banner的宽度,覆盖全局的宽度值*/
        bannerWidth = banner.offsetWidth;
        //设置ul的宽度
        bannerImg.style.width = bannerWidth * count + 'px';
        for (var i = 0; i < count; i++) {
            //每个li的宽度与banner的宽度一致
            lis[i].style.width = bannerWidth + 'px';
        }
        bannerImg.style.left = -index * bannerWidth + 'px';
    }

    //ol下面的小圆点,实现点标记
    function circleAuto(index) {
        var lisobj = document.querySelector('.jd_circle').querySelectorAll('li');
        for (var i = 0; i < lisobj.length; i++) {
            lisobj[i].classList.remove('active');
        }
        lisobj[index - 1].classList.add('active');
    }
    //5.轮播图自动
    var timeId;

    function imgAuto() {
        //定义一个定时器
        timeId = setInterval(function() {
            index++;
            bannerImg.style.left = -index * bannerWidth + 'px';
            //添加过渡效果
            bannerImg.style.transition = "left 0.5s";
            //需要加一个延时,不然不会到最后一张
            // setTimeout(function() {
            //     if (index == count - 1) {
            //         index = 1;
            //         bannerImg.style.transition = "none";
            //         bannerImg.style.left = -index * bannerWidth + 'px';
            //     }
            // }, 500)
        }, 1000);
    }
    imgAuto();


    //6.手动轮播
    var startX, moveX, offsetX;
    //给ul添加触摸开始事件   
    bannerImg.addEventListener('touchstart', function(e) {
            clearInterval(timeId);
            startX = e.targetTouches[0].clientX;
        })
        //给ul添加触摸移动事件   
        //添加节流阀,0.5s后才能触发touchmove;
    var isEnd = true;
    bannerImg.addEventListener('touchmove', function(e) {
            if (isEnd) {
                moveX = e.targetTouches[0].clientX;
                offsetX = moveX - startX;
                //设置偏移值 在原来的基础上偏移
                bannerImg.style.left = (-index * bannerWidth + offsetX) + 'px';
                //清除过渡效果
                bannerImg.style.transition = "none";
            }
        })
        //给ul添加触摸结束事件   
    bannerImg.addEventListener('touchend', function(e) {
            //触摸结束的时候让 isEnd = false;
            isEnd = false;
            if (Math.abs(offsetX) > 100) {
                if (offsetX > 0) {
                    index--;
                } else {
                    index++;
                }
                bannerImg.style.transition = "left 0.5s";
                bannerImg.style.left = -index * bannerWidth + 'px';
            } else if (Math.abs(offsetX) > 0) {
                bannerImg.style.transition = "left 0.5s";
                bannerImg.style.left = -index * bannerWidth + 'px';
            }
            //结果后初始化 startX, moveX, offsetX,因为如果不初始化,offsetX会保留,还会触发结束事件
            startX = 0;
            moveX = 0;
            offsetX = 0;
            //重启定时器
            imgAuto();
        })
        //给ul添加过渡结束监听事件   
    bannerImg.addEventListener('webkitTransitionEnd', function() {
        if (index == count - 1) {
            index = 1;
            bannerImg.style.transition = "none";
            bannerImg.style.left = -index * bannerWidth + 'px';
        } else if (index == 0) {
            index = count - 2;
            bannerImg.style.transition = "none";
            bannerImg.style.left = -index * bannerWidth + 'px';
        }
        //调用函数执行小圆点实现点标记
        circleAuto(index);
        //过渡结束后让isEnd重置为true;
        isEnd = true;
    })
}