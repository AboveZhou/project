$(function() {
    var juli;
    var index = 0;
    var timeId = null;
    $('#uu_lb>li').mouseenter(function() {
        $(this).find('img').addClass('cut').siblings('img').removeClass('cut');
    }).mouseleave(function() {
        $(this).find('img').removeClass('cut');
    });
    timeId = setInterval(function() {
        getChange();
    }, 2000);

    $('#oo_lb>li').mouseenter(function() {
        $(this).addClass('current').siblings('li').removeClass('current');
        var pic = $(this).index();
        index = pic;
        var juli = Number(-index * $('#uu_lb>li').width());
        $('#uu_lb').animate({ 'left': juli }, 300);

    })



    function getChange() {
        if (index > 2) {
            $('#uu_lb').offset({ 'left': 0 });
            index = 0;
        }
        var juli = Number(-index * $('#uu_lb>li').width());
        $('#uu_lb').animate({ 'left': juli }, 300);
        $('#oo_lb>li:eq(' + index + ')').addClass('current').siblings('li').removeClass('current');
        index++;
    }
    $('#uu_lb').mouseenter(function() {
        clearInterval(timeId);
    });
    $('#uu_lb').mouseleave(function() {
        timeId = setInterval(function() {
            getChange();
        }, 2000);
    });
});