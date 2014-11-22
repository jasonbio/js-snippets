  var positionCookie = 0; // in production, use server side language to get value of any previous cookie and echo here
  var startTime = 0;
  var resume_position = 0;

  if (positionCookie > 0) {
    startTime = positionCookie;
  }

function setCookie(c_name,value,expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

function rememberPosition() {
	// in production, use server side language to get unique number value of video and echo after mv_
	setCookie("mv_1234", Math.round(jwplayer('vid').getPosition()),2); // 2 = days to store cookie
	setTimeout("rememberPosition()", 5000); 
}

jwplayer("video").setup({
    width: "100%",
    height: "100%",
    dock: true,
    display: true,
    autostart: true,
    volume: 100,
    start: startTime, // catch start time
    bufferlength: 1,
    smoothing: true,
    wmode: "transparent",
    allowscriptaccess: "always",
    allowfullscreen: true,
    stretching: "exactfit",
    playlist:
    			[{ 
        			file:'whatever.mp4', 
        			streamer:'videoserver.sample.com', 
        			provider:'rtmp', 
        			start:startTime, 
        			image:'preview.jpg'
        		}],
    modes: 	
    		[{
    			type:'flash', 
    			src:'player.swf'
    		}]
});

// delete previously set cookie if video finishes since there's no more need to remember the last position
jwplayer('video').onComplete(function() { 
	setCookie("mv_1234", 0,-1);
});

// start the loop once the video starts
jwplayer('video').onPlay(function() {
	setTimeout("rememberPosition()", 5000);
});

// update the resume_position variable throughout playback
jwplayer('video').onTime(function(event) {
	if (event.position > 0) {
		resume_position = event.position;
	}
});