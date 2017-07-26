var channel_list =[];
var video_list = [];
var played_video = [];
var counter = 0;
var baseUrl = 'https://www.netflix.com/watch/';
var random_id = ''

function getUserChannels(userName){
	$.ajax({
		url:'http://netflipper.herokuapp.com/api/users/?format=json',
		dataType:'json',
		method:'GET'
	}).then(function(body){
		console.log(userName);
		console.log('hey');
		for(i = 0; i < body.length; i++){
			console.log(body[i].username);
			if(body[i].username === userName){
				for(t=0; t < body[i].channels.length; t++){
					console.log(body[i].channels[t].name);
					var chan_vids_list =[];
					for(v=0; v < body[i].channels[t].content.length; v++){
							chan_vids_list.push(body[i].channels[t].content[v]['netflix_id']);
					};
					channel_list.push([body[i].channels[t]['name'],chan_vids_list]);
				};
			};
		};
	});
};


function randomVideo(){

	$.ajax({
		url:'http://netflipper.herokuapp.com/api/videos/?format=json',
		dataType:'json',
		method:'GET'
	}).then(function(body){
		var videolen = body.length;
		var random = Math.floor(Math.random() * videolen);
		var video = body[random];
		var show_id = video['netflix_id'];
		random_id = baseUrl.concat(show_id);
	});
};

function nextVideo(){

		$.ajax({
			url:'http://netflipper.herokuapp.com/api/channels/?format=json',
			dataType:'json',
			method:'GET'
		}).then(function(body){
				var videos = body[0].content;
				for (i = 0; i < videos.length; i++){
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
  var checkPageButton = document.getElementById('submitUser');
  checkPageButton.addEventListener('click', function() {

	var userName = document.getElementById('usernameEnter').value;
	console.log(userName);
  var epUrl = getUserChannels(userName);

	console.log(channel_list);

}, false);
}, false);

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

  var epId = nextVideo();



   chrome.tabs.update({url: episodeUrl});

}, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('randomBtn');
  checkPageButton.addEventListener('click', function() {


  var epUrl = randomVideo();


   chrome.tabs.update({url: random_id});

}, false);
}, false);
