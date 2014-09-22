var app = {
	"name": "newsSpeak",
	"version": "0.1",
	"endpoints": {
		"headlines": {
			"uri": "http://api.nytimes.com/svc/news/v3/content/",
			"key": "aaee727aef8a550396b23ee9c7710994:18:63206214",
			"response-format": "json"
		}
	},
	init: function() {
		$.getJSON( app.endpoints.headlines.uri + "all/all.jsonp?api-key=" + app.endpoints.headlines.key + "&callback=?", function(data) {
			$.each(data.results, function(i) {
				app.speak(data.results[i].title + ": " + data.results[i].abstract);
			})
		});
	},
	speak: function(words) {
		if ("SpeechSynthesisEvent" in window) {

		}
	}
}

document.onload = app.init();