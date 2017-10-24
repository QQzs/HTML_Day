
function $(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
}

// 当网页加载完毕
window.onload = function () {
    // 拿到所有的标签

    var lis = $('tab-header').getElementsByTagName('li');
    var content = $('tab-content').getElementsByClassName('dom');

    // 验证
    if (lis.length !== content.length){
        return;
    }

    // 遍历
    for(var i = 0;i<lis.length;i++){
        var li = lis[i];
        li.id = i;

        // 监听鼠标
        li.onmouseover = function () {

            for(var j = 0;j<lis.length;j++){
                lis[j].className = '';
                content[j].style.display = 'none';
            }
            // 设置鼠标在li上的移动
            this.className = 'selected';
            content[this.id].style.display = 'block';

        }
    }


};