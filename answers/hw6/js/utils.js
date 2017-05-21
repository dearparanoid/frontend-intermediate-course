function getGameStream(game, clientID, limit, offset) {
    let requestUrl = "https://api.twitch.tv/kraken/streams/?client_id=" + clientID + "&game=" + game + "&limit=" + limit + "&offset=" + offset;
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                let data = JSON.parse(httpRequest.responseText);
                removeEmptyChannel();
                previewPanel(data.streams, offset);
            }
        }
    }
    httpRequest.open("GET", requestUrl, true);
    httpRequest.send();
}


function previewPanel(streamData, offset) {
    let previewContent = [];

    if (typeof streamData !== 'undefined') {
        streamData.forEach((ele, idx) => {
            let chanelDiv = document.createElement('div');
            chanelDiv.className = 'chanel';
            let previewDiv = document.createElement('div');
            previewDiv.className = 'preview';

            let previewImg = document.createElement('img');
            previewImg.src = ele.preview.large;
            previewDiv.appendChild(previewImg);
            chanelDiv.appendChild(previewDiv);

            let infoDiv = document.createElement('div');
            infoDiv.className = "info";
            let avatarDiv = document.createElement('div');
            avatarDiv.className = "avatar";
            let avatarImg = document.createElement('img');
            avatarImg.src = ele.channel.logo;
            avatarDiv.appendChild(avatarImg);
            infoDiv.appendChild(avatarDiv);
            chanelDiv.appendChild(infoDiv);

            let introDiv = document.createElement('div');
            introDiv.className = "intro";
            let nameDiv = document.createElement('div');
            nameDiv.className = "name";
            nameDiv.innerText = ele.channel.status;
            introDiv.appendChild(nameDiv);
            let onwerDiv = document.createElement('div');
            onwerDiv.classNam = "onwer";
            onwerDiv.innerText = ele.channel.display_name;
            introDiv.appendChild(onwerDiv);
            chanelDiv.appendChild(introDiv);
            infoDiv.appendChild(introDiv);
            document.getElementById("row").appendChild(chanelDiv);

        });
        addEmptyChannel();
    }
}

function addEmptyChannel() {
    for (let i = 0; i < 2; i++) {
        let emptyChannel = document.createElement('div');
        emptyChannel.className = 'chanel';
        emptyChannel.id = "emptyChannel";
        document.getElementById("row").appendChild(emptyChannel);
    }
}

function removeEmptyChannel() {
    let emptyChannel = document.querySelectorAll('#emptyChannel');
    emptyChannel.forEach((ele, idx) => {
        ele.remove();
    });
}

function debounce(fn, delay) {
    var timer = null;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}

function init() {
    let page = 0;
    getGameStream('League of Legends', 'pv5emcr029nlrokiw16n0uh5awus0h', 20, 0);

    document.addEventListener('scroll', debounce(function(event) {
        if (document.body.scrollTop + window.innerHeight > document.body.scrollHeight - 100) {
            page++;
            getGameStream('League of Legends', 'pv5emcr029nlrokiw16n0uh5awus0h', 20, 20 * (page));
        }
    }, 250));
}