window.onload = function () {
    var port = chrome.extension.connect({ name: 'background' });
    port.postMessage({ status: 'stop' });    

    document.getElementById('run').addEventListener('click', function () {
        var time = document.getElementById('time').value;
        var pno = document.getElementById('pno').value;
        var run = document.getElementById('run').value;
        
        if (time == 0) {
            alert('실행시간은 0초이상 숫자로 입력해주세요');
            return;
        }

        if(run == 'Run!!') {
            time = parseInt(time) * 1000;

            document.getElementsByTagName('label')[0].innerText = (time/1000) + '초';
            document.getElementsByTagName('span')[0].innerText = 'run';
            document.getElementById('run').value = 'STOP!!';

            port.postMessage({
                status: 'start',
                time,
                pno
            });
        } else {
            document.getElementsByTagName('label')[0].innerText = '';
            document.getElementsByTagName('span')[0].innerText = 'stop';
            document.getElementById('run').value = 'Run!!';

            port.postMessage({
                status: 'stop',
                time,
                pno
            });
        }
            
        
    });
}