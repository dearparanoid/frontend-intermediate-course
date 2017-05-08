function getGameStream(game, clientID, limit) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams",
        type: "GET",
        data: { client_id: clientID, game: game, limit: limit },
        dataType: "json",
        success: function(data) {
            previewPanel(data.streams);
        },
        error: function() {}
    });
}

function previewPanel(data) {
    let previewContent = [];
    let emptyChannel = '<div class="chanel-empty "></div><div class="chanel-empty">';

    data.forEach((ele, idx) => {
        $('#row').append($('<div>', { 'class': 'chanel' }));
        $('.chanel').eq(idx).append($('<div>', { 'class': 'preview' }).append($('<img>', { 'src': ele.preview.large })));
        $('.chanel').eq(idx).append($('<div>', { 'class': 'info' }).append($('<div>', { 'class': 'avatar' }).append($('<img>', { 'src': ele.channel.logo }))));
        $('.chanel .info').eq(idx).append($('<div>', { 'class': 'intro' }).append($('<div>', { 'class': 'name', 'text': ele.channel.status })));
        $('.chanel .info .intro').eq(idx).append($('<div>', { 'class': 'onwer', 'text': ele.channel.display_name }));
    });
    $('#row').append(emptyChannel);
}