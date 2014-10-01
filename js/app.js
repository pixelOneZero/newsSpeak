/*

Tasks:
- Cancel voice before right before user closes the window

*/

var app = {
	"name": "NewsSpeak",
	"version": "0.1",
	"endpoints": {
		"headlines": {
			"uri": "http://api.nytimes.com/svc/news/v3/content/",
			"key": "aaee727aef8a550396b23ee9c7710994:18:63206214",
			"response-format": "json"
		}
	},
	init: function() {
		if ("SpeechSynthesisEvent" in window) {
			$.getJSON( app.endpoints.headlines.uri + "all/all.jsonp?api-key=" + app.endpoints.headlines.key + "&callback=?", function(data) {
				$.each(data.results, function(i) {	
					// Remove special characters so speech API does not utter ampersand, hash sign and number
					var articleTitle = data.results[i].title;
					var articleAbstract = data.results[i].abstract;
					articleAbstract = articleAbstract.replace(/&#8217;/g,"").replace(/&#8220;/g,"").replace(/&#8221;/g,"");
					app.speak( articleTitle + ": " + articleAbstract);
				})
			});
		}
		else {
			$('body').append('<div class="error">Your browser does not support text-to-speech.  <p><a href="https://www.google.com/chrome/browser/">Please consider upgrading to Google Chrome.</a></strong></div>');
		}
	},
	speak: function(message) {
		$('body').append('<hr/>' + message);
		var msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		// Note: some voices don't support altering params
		msg.voice = voices[10]; 
		msg.voiceURI = 'native';
		// 0 to 1
		msg.volume = 1;
		// 0.1 to 10
		msg.rate = 1;
		//0 to 2
		msg.pitch = 1; 
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

document.onload = app.init();