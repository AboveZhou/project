$(function() {
    $('.nav_items').mouseenter(function() {
        var index = $(this).index();

        $(this).addClass('nav_items_b').siblings().removeClass('nav_items_b');
        $(this).find('span').css('color', '#03B7F4');
        $('.nav_link:eq(' + index + ')').show();
    })
    $('.nav_items').mouseleave(function() {
        $(this).removeClass('nav_items_b');
        $(this).find('span').css('color', '#898989');
        var index = $(this).index();
        $('.nav_link:eq(' + index + ')').hide();
    })

    // content

    $('.u_right_a').mouseenter(function() {
        $(this).addClass('col');
        $('.u_icon_r').css({ 'backgroundPosition': ' -4px -777px' })
    })
    $('.u_right_a').mouseleave(function() {
        $(this).removeClass('col')
        $('.u_icon_r').css({ 'backgroundPosition': '  -4px -790px' })
    })
    $('.u_icon_r').mouseenter(function() {
        $(this).css({ 'backgroundPosition': ' -4px -777px' })
    })
    $('.u_icon_r').mouseleave(function() {
        $(this).css({ 'backgroundPosition': '  -4px -790px' })
    });
    $('.u_content_top_l').mousedown(function() {
            $(this).addClass('u_content_current').siblings().removeClass('u_content_current');
            var index = $(this).index();
            console.log(index);
            $('.u_content_bottom_li:eq(' + index + ')').siblings('li').removeClass('set');
            $('.u_content_bottom_li:eq(' + index + ')').addClass('set')
        })
        // $('.u_content_mid>a:even').css("backgroundColor", "#1B1C1F");
        // $('.u_content_mid>a:odd').css("backgroundColor", "#18191C");
    $('.u_content_mid:eq(0)').find($(".u_content_b:even")).css("backgroundColor", "#18191C");
    $('.u_content_mid:eq(0)').find($(".u_content_b:odd")).css("backgroundColor", "#1B1C1F");
    $('.u_content_mid:eq(1)').find($(".u_content_b:even")).css("backgroundColor", "#1B1C1F");
    $('.u_content_mid:eq(1)').find($(".u_content_b:odd")).css("backgroundColor", "#18191C");
    $('.u_content_mid:eq(2)').find($(".u_content_b:even")).css("backgroundColor", "#18191C");
    $('.u_content_mid:eq(2)').find($(".u_content_b:odd")).css("backgroundColor", "#1B1C1F");
    $('.u_content_mid:eq(3)').find($(".u_content_b:even")).css("backgroundColor", "#1B1C1F");
    $('.u_content_mid:eq(3)').find($(".u_content_b:odd")).css("backgroundColor", "#18191C");
    $('#uu_b>li').mouseenter(function() {
        $('.uu_cut').removeClass('uu_a');
        $(this).find('.uu_cut').addClass('uu_a').siblings('.uu_cut').removeClass('uu_a');
        var index = $(this).index();
        $('.uu_box:eq(' + index + ')').siblings().removeClass('show');
        $('.uu_box:eq(' + index + ')').addClass('show');
    });
    $('.uu_dv_bo').mouseenter(function() {
        $(this).css({ 'backgroundPosition': '0 -28px' });
    }).mouseleave(function() {
        $(this).css({ 'backgroundPosition': '0 0' });
    });
    $('.uu_cot').mousedown(function() {

        var a = $(this).find('span').html();
        if (a == '展开') {
            $('.uu_bott').animate({ 'height': 500 }, 500);
            $('.uu_cot_b').css({ 'backgroundPosition': '  -17px 0px' });
            $(this).find('span').html('收起')
        }

        if (a == '收起') {
            $('.uu_bott').animate({ 'height': 322 }, 500);
            $('.uu_cot_b').css({ 'backgroundPosition': '  0px 0px' });
            $(this).find('span').html('展开')
        }
    });
    $('.uu_box_up>a').mouseenter(function() {
        $('.uu_box_up>a>img').removeClass('uu_img');
        $(this).find('img').addClass('uu_img').siblings().removeClass('uu_img')
    })
});