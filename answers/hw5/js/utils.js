function getGameStream(game, clientID, limit, offset) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams",
        type: "GET",
        data: { client_id: clientID, game: game, limit: limit, offset: offset },
        dataType: "json",
        success: function(data) {
            removeEmptyChannel();
            previewPanel(data.streams, offset);
        },
        error: function() {
            console.log("fail");
        }
    });
}


function previewPanel(data, offset) {
    let previewContent = [];

    if (typeof data !== 'undefined') {
        data.forEach((ele, idx) => {
            idx = idx + offset;
            $('#row').append($('<div>', { 'class': 'chanel' }));
            $('.chanel').eq(idx).append($('<div>', { 'class': 'preview' }).append($('<img>', { 'src': ele.preview.large })));
            $('.chanel').eq(idx).append($('<div>', { 'class': 'info' }).append($('<div>', { 'class': 'avatar' }).append($('<img>', { 'src': ele.channel.logo }))));
            $('.chanel .info').eq(idx).append($('<div>', { 'class': 'intro' }).append($('<div>', { 'class': 'name', 'text': ele.channel.status })));
            $('.chanel .info .intro').eq(idx).append($('<div>', { 'class': 'onwer', 'text': ele.channel.display_name }));
        });
        addEmptyChannel();
    }
}

function addEmptyChannel() {
    let emptyChannel = '<div class="chanel"></div><div class="chanel">';
    $('#row').append(emptyChannel);
}

function removeEmptyChannel() {
    $('.chanel').slice(-2).remove();
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

    $(window).on('scroll', debounce(function(event) {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            page++;
            getGameStream('League of Legends', 'pv5emcr029nlrokiw16n0uh5awus0h', 20, 20 * (page));
        }
    }, 250));
}