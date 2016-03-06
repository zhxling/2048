window.onload=function(){
    // 获取需要操作的元素
    waterFall("main","box")
    var data={"data":[{"src":"images/20.jpg"},{"src":"images/21.jpg"},{"src":"images/22.jpg"},{"src":"images/23.jpg"},{"src":"images/24.jpg"}]};
    var load="no"

    window.onscroll=function(){
        if(isGetData()){
            var oParent=document.getElementById("main");            
            for(var i=0;i<data.data.length;i++){
                var oBoxs=document.createElement("div");
                oBoxs.className="box";
                oParent.appendChild(oBoxs);
                var picBox=document.createElement("div");
                picBox.className="pic";
                oBoxs.appendChild(picBox);
                var img=document.createElement("img");
                img.src=data.data[i].src;
                picBox.appendChild(img);
            }
            waterFall("main","box");
        };
    }
   
}

// 瀑布流主函数
function waterFall(parent,box){
    var oParent=document.getElementById(parent);
    var oBoxs=getClass(oParent,box);

    // 获取页面的列数（页面宽度/box盒子宽度）
    var oBoxWidth=oBoxs[0].offsetWidth,
        cols=Math.floor(document.documentElement.clientWidth/oBoxWidth);
    
    // 设置box盒子居中
    oParent.style.cssText="width"+":"+cols*oBoxWidth+"px;margin:0 auto;"

    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minHeight=Math.min.apply(null,hArr);
            var minIndex=0;
            for(var j=0;j<cols;j++){
                if(hArr[j]===minHeight){
                    minIndex=j;
                    break;
                }
            }
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top=minHeight+"px";
            oBoxs[i].style.left=oBoxs[minIndex].offsetLeft+"px";
            hArr[minIndex]=+hArr[minIndex]+oBoxs[i].offsetHeight;
        }
    }

    

}

// 根据Class获取HTML页面元素
    function getClass(parent,cls){
        var els=parent.getElementsByTagName("*");
        var clsArray=[];

        for(var i=0;i<els.length;i++){
            if(els[i].className===cls){
                clsArray.push(els[i]);
            }
        }
        return clsArray;

    }
// 判断页面是否具备加载数据的条件
function isGetData(){
    var oParent=document.getElementById("main");
    var oBoxs=getClass(oParent,"box");

    var lastHeight=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var winHeight=document.documentElement.clientHeight||document.body.clientHeight;
    return (lastHeight<scrollTop+winHeight) ? true:false;

}