$(function() {
    function imgUrl() {
        //获取img
        var img = document.querySelectorAll(".swiper-wrapper img");
        //获取屏幕宽度
        var srceenWidth = document.documentElement.clientWidth || document.body.clientWidth;
        // console.log(srceenWidth);

        if (srceenWidth > 640) {
            img.forEach(function(value, index) {
                value.src = value.dataset.lg;
            })
        } else {
            img.forEach(function(value, index) {
                value.src = value.dataset.sm;
            })
        }
    }
    //调用函数
    imgUrl();
    //当屏幕改变时触发
    window.onresize = function() {
        imgUrl();
    }
})