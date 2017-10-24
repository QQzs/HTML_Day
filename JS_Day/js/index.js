// JS CRUD

// 增
    document.write("hello world!");
    // 拿到div
    var main = document.getElementById("main");
    // 1.1 创建一个图像标签
    var img = document.createElement("img");
    img.src = "image/img_01.jpg";
    // 1.2 添加
    main.appendChild(img);

// 删除
//     img.remove();

// 修改

// 查找

console.log(main.childNodes);