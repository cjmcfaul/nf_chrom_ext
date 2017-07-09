var video_list = [];
var played_video = [];
var counter = 0;




function nextVideo(){


		$.ajax({
			url:'http://netflipper.herokuapp.com/api/channels/?format=json',
			dataType:'json',
			method:'GET'
		}).then(function(body){
				console.log(body);
				var json = body;
				console.log(JSON.stringify(body));
				var videos = body[0].content;
				console.log(JSON.stringify(videos));
				for (i = 0; i < json[0].content.length; i++){
					console.log(JSON.stringify(videos[i].netflix_id));
					video_list.push(videos[i]['netflix_id']);
			};
		})


		console.log(video_list);
		console.log('this far');
	  var b = video_list[counter];
		counter++;
	  return b;

};

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('homeBtn');
  checkPageButton.addEventListener('click', function() {

  var homeUrl = "https://netflipper.herokuapp.com";
  chrome.tabs.update({url: homeUrl});
}, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('nextBtn');
  checkPageButton.addEventListener('click', function() {

  var baseUrl = 'https://www.netflix.com/watch/';

  var epId = nextVideo();

  var episodeUrl = baseUrl.concat(epId);

   chrome.tabs.update({url: episodeUrl});

}, false);
}, false);
