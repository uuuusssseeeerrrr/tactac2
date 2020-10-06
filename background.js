var play;
var delay = 0;

chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg.status == "start") {
            (function () {
                if (play) clearInterval(play);
                play = setInterval(async function () {
                    const response = await fetch('http://tagtag.co.kr/product/detail.html?product_no=' + msg.pno);
                    const text = await response.text();
                    const target = text.substr(text.indexOf('is_soldout_icon')+19, 1);
                    console.log('called');

                    if(target == 'F') {
                        alert('재고가 떴습니다2!');
                        if (play) clearInterval(play);
                    }
                }, msg.time);
            })();
        } else if(msg.status == "stop") {
            if (play) clearInterval(play);
        }
    });
});
