window.onload = function() {
    //1.获取元素
    //获取.ct_left
    var leftBox = document.querySelector('.ct_left');
    //获取leftBox高度
    var leftBoxHeight = leftBox.offsetHeight;
    //.ct_left里面的ul
    var ulBox = document.querySelector('.ct_left_ul');
    //获取.ct_left里面的ul高度
    var ulBoxHeight = ulBox.offsetHeight;
    //获取li的所有元素
    var lis = ulBox.querySelectorAll('li');
    //获取li的高度
    var liHeight = lis[0].offsetHeight;
    //2.实现滑动
    var startY = 0;
    var moveY = 0;
    var offsetY = 0;
    /*记录当前元素滑动到的距离*/
    var currentY = 0;
    //开始事件
    ulBox.addEventListener('touchstart', function(e) {
        startY = e.targetTouches[0].clientY;
        // console.log(startY);
    });
    //移动事件
    //向下滚动的最大值
    var bottomHeiht = liHeight;
    //向上滚动的最大值
    var topHeight = leftBoxHeight - ulBoxHeight - liHeight;
    ulBox.addEventListener('touchmove', function(e) {
        moveY = e.targetTouches[0].clientY;
        offsetY = moveY - startY;
        //向下拉动如果超过向下滚动的最大值或者向上拉动如果超过向上滚动的最大值则不让其操作
        if (currentY + offsetY > liHeight || currentY + offsetY < topHeight) {
            return;
        }
        //设置ulBox的偏移值  在原来的基础上偏移
        ulBox.style.transition = "none";
        ulBox.style.top = (currentY + offsetY) + 'px';
    });
    //结束事件
    ulBox.addEventListener('touchend', function(e) {
        //如果向下拉动的距离大于0,则让其弹回或者向上拉动的距离大于能滑动的最大距离也让其弹回底部,向上拉动的时候偏移值为负数
        if (currentY + offsetY > 0) {
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = 0;
            currentY = 0;

        } else if (Math.abs(currentY + offsetY) >= Math.abs(leftBoxHeight - ulBoxHeight)) {
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = leftBoxHeight - ulBoxHeight + 'px';
            currentY = leftBoxHeight - ulBoxHeight;
        } else {
            //每次移动结束松开手指的时候记录当前的滑动距离
            currentY += offsetY;
        }
    });

    //3. 实现点击改变样式
    //引入fastclick.js文件
    /*绑定fastclick*/
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
            FastClick.attach(document.body);
        }, false);
    };
    //添加li的点击事件
    ulBox.addEventListener('click', function(e) {
        //点击去除li的active样式,然后为当前的li添加active样式
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
            //给li设定一个自定义属性,知道这是第几个li
            lis[i].index = i;
        }
        //获取当前的li对象
        var li = e.target.parentNode;
        li.classList.add('active');
        //让当前的li移动到顶部
        //设定ul的偏移值  让li偏移到顶部  需要知道这是第几个li
        //先获取点击的这个li是第几个li
        var index = li.index;
        // console.log(li.index);
        //向上拉动的距离大于能滑动的最大距离让其弹回底部,向上拉动的时候偏移值为负数
        if (index * liHeight >= Math.abs(leftBoxHeight - ulBoxHeight)) {
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = leftBoxHeight - ulBoxHeight + 'px';
            //记录当前的滑动距离
            currentY = leftBoxHeight - ulBoxHeight;
        } else {
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = -index * liHeight + 'px';
            currentY = -index * liHeight;
        }
    });




    //用iscroll.js插件实现滚动

    var myScroll = new IScroll('.ct_hotCategory', {
        mouseWheel: true,
        scrollbars: true
    });
}