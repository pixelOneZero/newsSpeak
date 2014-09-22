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
	speak: function(message) {  
		if ("SpeechSynthesisEvent" in window) {
			console.log(message);
			var msg = new SpeechSynthesisUtterance();
			var voices = window.speechSynthesis.getVoices();
			msg.voice = voices[10]; // Note: some voices don't support altering params
			msg.voiceURI = 'native';
			msg.volume = 1; // 0 to 1
			msg.rate = 1; // 0.1 to 10
			msg.pitch = 1; //0 to 2
			msg.text = message;
			msg.lang = 'en-US';

			msg.onend = function(e) {
			  console.log('Finished in ' + event.elapsedTime + ' seconds.');
			};

			msg.onerror = function(e) {
				alert("An error occurred.");
			}

			speechSynthesis.speak(msg);
		}

	}
}

document.onload = app.init();