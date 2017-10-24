// 1. $() --->jQuery对象
// 2. 拿到对应的标签

// 3: 查看那发哦的标签的属性值
console.log("class = " + $('#main .word').attr('class'));
var mWord = $('#main .word');

mWord.text('ssssss');

// 4.改变拿到的标签
$('img').attr('src' , "images/pic2.jpg");

// 5.如何查看标签中的内容
console.log($('p').text());

// 6.改变
$('p').text('woshi ii');

// 7.事件

$('button').eq(0).on('click',function () {
    $('img').show();
});

$('button').eq(1).on('click',function () {
    $('img').hide();
});

$('button').eq(2).on('click',function () {
    $('img').toggle(2000);
});

// 遍历
var data = [20,3,4,12,4,54];
$.each(data,function (index , value) {
    console.log(index , value);
});

// 9.取出对应的下标
$.inArray(2,data);

// 10.写CSS
$('.word').css({
    background: 'red' ,
    border:'1px solid green'
});