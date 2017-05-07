function getGameStream(game, clientID) {
    let GameStream = "https://api.twitch.tv/kraken/streams/?game=" +
        game +
        "&client_id=pv5emcr029nlrokiw16n0uh5awus0h";
    $.ajax({
        url: GameStream,
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.warn(data);
            previewPanel(20, data.streams);
        },
        error: function() {}
    });

}

function previewPanel(num, data) {
    let BreakException = {};
    let previewContent = [];
    let emptyChannel = '<div class="chanel"></div><div class="chanel"></div><div class="chanel"></div><div class="chanel"></div>';

    try {
        data.forEach((ele, idx) => {
            if (idx === num)
                throw BreakException;
            else {
                previewContent =
                    "<div class='chanel'>" +
                    "<div class='preview'><img src=" + ele.preview.large + " / > " +
                    "</div>" +
                    "<div class='info'>" +
                    "<div class='avatar'><img src=" + ele.channel.logo + " / > " + "</div>" +
                    "<div class='intro'>" +
                    "<div class='name'>" + ele.channel.status + "</div>" +
                    "<div class='owner'>" + ele.channel.display_name + "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                $('#row').append(previewContent);
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }
    $('#row').append(emptyChannel);
}