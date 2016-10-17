
function openTab(type,titles){
    // here is your code...
    var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;
    var height = $summer.offset($summer.byId('main')).h;
    $('#h-title').html(titles);
    summer.openFrame({
        name: type,
        url: 'html/'+type+'.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        }
    });
}

summerready=function (){
    openTab('main','原有方法');
}