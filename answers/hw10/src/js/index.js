import * as L from './i18n/language';

let $ = require('jquery');

const stream = {
	category: 'League of Legends',
	clientId: 'pv5emcr029nlrokiw16n0uh5awus0h',
};
let page = 0;
let lang = 'zh-tw';

function getGameStream(game, clientID, limit, offset, language) {
	$.ajax({
		url: 'https://api.twitch.tv/kraken/streams',
		type: 'GET',
		data: { client_id: clientID, game: game, limit: limit, offset: offset, language: language },
		dataType: 'json',
		success: function(data) {
			removeEmptyChannel();
			previewPanel(data.streams, offset);
		},
		error: function() {
			//console.log('fail');
		}
	});
}

function previewPanel(data, offset) {
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
	let emptyChannel = '<div class="chanel id="emptyChannel"></div><div class="chanel" id="emptyChannel">';
	$('#row').append(emptyChannel);
}

function removeEmptyChannel() {
	$('.chanel').slice(-2).remove();
}

function debounce(fn, delay) {
	let timer = null;
	return function() {
		let context = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(context, args);
		}, delay);
	};
}

function titleLayout(lang) {
	$('#title').animate({
		opacity: 0,
	}, 200, 'linear', function() {
		$('#title').text('');
	});

	$('#title').animate({
		opacity: 1,
	}, 100, 'linear', function() {
		$('#title').text(L.default[lang].title);
	});

	$('button').removeClass('active');
	$('#' + lang).addClass('active');
	$('.row').empty();

	getGameStream(stream.category, stream.clientId, 20, 0, lang);
}

function changeLan(selectedLang) {
	if (selectedLang === lang) {
		return;
	}

	lang = selectedLang;
	page = 0;
	titleLayout(lang);
}



function init() {

	$('#en').on('click', (e) => {
		e.preventDefault();
		changeLan('en');
	});

	$('#zh-tw').on('click', (e) => {
		e.preventDefault();
		changeLan('zh-tw');
	});

	titleLayout(lang);
	$(window).on('scroll', debounce(function(event) {
		event.preventDefault();
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			page++;
			getGameStream(stream.category, stream.clientId, 20, 20 * (page), lang);
		}
	}, 250));
}


$(document).ready(() => {
	init();
});