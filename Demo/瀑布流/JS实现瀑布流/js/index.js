function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}


window.onload = function () {

    // 瀑布流布局
    waterFall('main','box');

    // 滚动加载
    window.onscroll = function () {

        if (checkWillLoad()) {
            console.log("onscroll = more");
            var data = {'dataImage': [{'image': '10.jpg'}, {'image': '11.jpg'}, {'image': '14.jpg'}, {'image': '15.jpg'}, {'image': '13.jpg'}, {'image': '17.jpg'}]};

            for (var i = 0; i < data.dataImage.length; i++) {

                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);

                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);

                var newImg = document.createElement('img');
                newImg.src = 'images/' + data.dataImage[i].image;
                newPic.appendChild(newImg);

            }
            waterFall('main','box');
        }
    }

};

// 判断是否加载到最后一个
function checkWillLoad() {

    // 取出所有的盒子
    var allBox = $('main').getElementsByClassName('box');
    // 取出最后一个盒子
    var lastBox = allBox[allBox.length - 1];
    // 求出最后一个盒子高度的一半
    var lasBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    // 求出浏览器高度 标准模式 和混杂模式
    var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;

    // 页面偏离屏幕的高度
    var scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop;

    console.log("screenHeight = " + screenHeight);
    return lasBoxDis <= screenHeight + scrollTopHeight;

}

// 实现瀑布里布局
function waterFall(parent , box) {
    // 父盒子居中
    // 所有子盒子
    var allBox = $(parent).getElementsByClassName(box);

    // 求出盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    // 浏览器的宽度
    var screenWidth = document.body.offsetWidth;

    // 求出列数
    var cols = Math.floor(screenWidth/boxWidth);
    // alert(" cols = " + cols);
    // 父标签居中
    $(parent).style.width = boxWidth * cols + 'px';
    $(parent).style.margin = '0 auto';


    // 子盒子定位
    // 高度数组
    var heightArr = [];
    // 遍历
    for(var i = 0;i<allBox.length;i++){
        // 求出单独盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        if (i < cols){// 第一行
            heightArr.push(boxHeight);
        }else{//需要定位的盒子
            // 求出最矮盒子的高度
            var minBoxHeight = Math.min.apply(this,heightArr);
            // 求出最矮盒子对应索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight,heightArr);

            // 盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';

            // 更新数组中最矮盒子的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
}

// 取出最矮盒子的对应索引
function getMinBoxIndex(val ,arr){
    for(var i in arr){
        if (val == arr[i]){
            return i;
        }
    }
}