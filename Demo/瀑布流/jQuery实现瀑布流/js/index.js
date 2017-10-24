// 页面加载完毕
$(window).on('load',function () {
    // 实现瀑布流布局
    waterFall();
    $(window).on('scroll',function () {
        // 是否加载
        if(checkWillLoad()){
            var data = {'dataImage': [{'image': '10.jpg'}, {'image': '11.jpg'}, {'image': '14.jpg'}, {'image': '15.jpg'}, {'image': '13.jpg'}, {'image': '17.jpg'}]};
            // 遍历创建
            $.each(data.dataImage, function (index , value) {
                var newBox = $('<div>').addClass('box').appendTo($('#main'));

                var newPic = $('<div>').addClass('pic').appendTo($(newBox));

                $('<img>').attr('src','images/' + $(value).attr('image')).appendTo($(newPic));

            });

        }
        waterFall();
    });

});

function checkWillLoad() {

    // v/ar allBox = $('#main .box');
    // var lastBox = allBox[allBox.length - 1];

    var lastBox = $('#main>div').last();

    var lastBoxDis = $(lastBox).outerHeight() * 0.5 + $(lastBox).offset().top;

    var screenHeight = $(window).height();
    var scrollTopHeight = $(window).scrollTop();

    // console.log(lastBoxDis , screenHeight , scrollTopHeight);

    return lastBoxDis <= screenHeight + scrollTopHeight;

}

function waterFall() {
    // 拿到所有盒子
    var allBox = $('#main>.box');

    // var boxWidht = allBox[0].offsetWidth;
    var boxWidth = $(allBox).eq(0).outerWidth();

    // 屏幕的宽度
    var screenWidth = $(window).width();

    console.log(screenWidth , boxWidth);
    // 求出列数
    var col = Math.floor(screenWidth/boxWidth);

    // 父标签居中
    $('#main').css({
       'width' : col * boxWidth + 'px',
        'margin' : '0 auto'
    });

    var heightArr = [];
    $.each(allBox , function (index , value) {
        var boxHeight = $(value).outerHeight();
        if (index < col){
            // heightArr.push(boxHeight);
            heightArr[index] = boxHeight;
        }else{
            var minHeight = Math.min.apply(this,heightArr);
            // 最小高度的坐标
            var minIndex = $.inArray(minHeight,heightArr);
            $(value).css({
               'position' : 'absolute',
               'top' : minHeight + 'px',
               'left' : boxWidth * minIndex + 'px'
            });
            heightArr[minIndex] += boxHeight;
        }

    });

}