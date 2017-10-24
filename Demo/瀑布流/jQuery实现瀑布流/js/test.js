
$(window).on('load', function () {

    waterFall();

    var data = {'dataImage': [{'image': '10.jpg'}, {'image': '11.jpg'}, {'image': '14.jpg'}, {'image': '15.jpg'}, {'image': '13.jpg'}, {'image': '17.jpg'}]};
    $(window).on('scroll' , function () {

        if (checkWillLoad()){

            $.each(data.dataImage , function (index ,value) {

                var newBox = $('<div>').addClass('box').appendTo($('#main'));
                var newPic = $('<div>').addClass('pic').appendTo($(newBox));

                $('<img>').attr('src','images/' + $(value).attr('image')).appendTo($(newPic));
            });
            waterFall();
        }
    });

});

function checkWillLoad() {

    var lastBox = $('#main>.box').last();

    var lastBoxDis = $(lastBox).outerHeight() * 0.5 + $(lastBox).offset().top;

    var screenHeight = $(window).height();
    var screenScrollTop = $(window).scrollTop();

    return lastBoxDis <= screenHeight + screenScrollTop;

}


/**
 * 瀑布流布局
 */
function waterFall() {

    // 设置居中
    var allBox = $('#main>.box');
    var boxWidth = $(allBox).eq(0).outerWidth();

    var screenWidth = $(window).width();

    var col = Math.floor(screenWidth/boxWidth);

    $('#main').css({
        'width' : boxWidth * col + 'px',
        'margin' : '0 auto'
    });

    var heightArr = [];
    $.each(allBox , function (index , value) {

        var boxHeight = $(value).outerHeight();
        if (index < col){
            heightArr[index] = boxHeight;
        }else{

            var minHeight = Math.min.apply(this,heightArr);
            // 最小高度的坐标
            var minIndex = $.inArray(minHeight,heightArr);
            $(value).css({
                'position' : 'absolute',
                'top' : minHeight + 'px',
                'left' : minIndex * boxWidth + 'px'
            });
            heightArr[minIndex] += boxHeight;

        }
    });

}