$(function() {
    var juli;
    var pic = 0;
    var timeId = null;
    $('#oo>li').mousedown(function() {
        $(this).addClass('current').siblings('li').removeClass('current')
        var index = $(this).index();
        pic = index;
        var juli = Number(-index * $('#uu>li').width());
        $('#uu').animate({ 'left': juli }, 150)
    });
    var clone = $('#uu>li:eq(0)').clone();
    $('#uu').append(clone);
    $('.arrRight').mousedown(function() {
        if (pic == $('#oo>li').length) {
            pic = 0;
            $('#uu').offset({ 'left': 0 });
        }
        pic++;
        if (pic < $('#oo>li').length) {
            $('#oo>li:eq(' + pic + ')').mousedown();
        } else {
            $('#uu').animate({ 'left': -pic * $('#uu>li').width() }, 100);
            $('#oo>li:eq(0)').addClass('current').siblings('li').removeClass('current')
        }
    });
    $('.arrLeft').mousedown(function() {
        if (pic == 0) {
            pic == $('#oo>li').length;
            $('#uu').offset({ 'left': -pic * $('#uu>li').width() });
        }
        pic--;
        $('#oo>li:eq(' + pic + ')').mousedown();
    });
    timeId = setInterval(function() {
        $('.arrRight').mousedown();
    }, 3000);
    $('.mid').mouseenter(function() {
        clearInterval(timeId);
    }).mouseleave(function() {
        timeId = setInterval(function() {
            $('.arrRight').mousedown();
        }, 3000);
    });
});