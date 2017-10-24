function $(id) {
    return typeof id === 'string' ? document.getElementById(id):id;
}

window.onload = function () {
    // 瀑布流布局
    waterPull('main','box');

    var data = {'dataImage' : [{'image':"11.jpg"},{'image':"12.jpg"},{'image':"13.jpg"},{'image':"14.jpg"},{'image':"11.jpg"},{'image':"14.jpg"},{'image':"15.jpg"},{'image':"16.jpg"},{'image':"17.jpg"}]}
    window.onscroll = function () {

        if (checkWillLoad()){

            for(var i = 0;i<data.dataImage.length;i++){

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
            waterPull('main','box');

        }

    }

};

/**
 * 判断是否加载到最后一个图片
 */
function checkWillLoad() {

    var allBox = $('main').getElementsByClassName("box");

    var lastBox = allBox[allBox.length - 1];

    var lastBoxHeight = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

    console.log("screenHeight = " + screenHeight + "scrollHeight " + scrollHeight);

    return lastBoxHeight <= screenHeight + scrollHeight;

}

/**
 * 瀑布流布局
 * @param parent
 * @param box
 */
function  waterPull(parent , box) {

    // 居中
    var allBox = $(parent).getElementsByClassName(box);
    var boxWidht = allBox[0].offsetWidth;
    var screenWidht = document.body.offsetWidth;

    var col = Math.floor(screenWidht/boxWidht);

    $(parent).style.width = col * boxWidht + 'px';
    $(parent).style.margin = '0 auto';

    var heightArr = [];

    for(var i = 0;i<allBox.length;i++){

        var boxHeight = allBox[i].offsetHeight;
        if (i < col){
            heightArr.push(boxHeight);
        }else{
            var minHeight = Math.min.apply(this,heightArr);
            var minIndex = getMinHeightIndex(minHeight,heightArr);

            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minHeight + 'px';
            allBox[i].style.left = minIndex * boxWidht + 'px';

            heightArr[minIndex] = minHeight + boxHeight;
        }

    }

}

/**
 * 获取最小高度的坐标
 * @param min
 * @param arr
 * @returns {string}
 */
function getMinHeightIndex(min , arr) {

    for(var i in arr){
        if (min == arr[i]){
            return i;
        }

    }
}