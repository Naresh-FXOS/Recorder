/*var wavesurfer = Object.create(WaveSurfer);
wavesurfer.init({
    container: document.querySelector('#wave'),
    waveColor: 'violet',
    progressColor: 'purple'
});

wavesurfer.on('ready', function () {
    wavesurfer.play();
});*/



navigator.getUserMedia =  navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia;
if(navigator.getUserMedia ){
    
  navigator.getUserMedia ({
        video:false,
        audio:true},
      function(stream) {
		 
		 var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
		 var mediaRecorder = new MediaRecorder(stream);
		 	context = new AudioContext();
			analyser = context.createAnalyser();
			canvas = document.getElementById('analyser_render');
			ctx = canvas.getContext('2d');
		 	source = context.createMediaStreamSource(mediaRecorder.stream);
			source.connect(analyser);
			//analyser.connect(context.destination);
			frameLooper();
			
					function frameLooper(){
	window.mozRequestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#00CCFF'; // Color of the bars
	bars = 300;//100
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;//i*3
		bar_width = 2;//2
		bar_height = -(fbc_array[i] / 2);
		//fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}
			
			
		 	console.log(source);
			
			if(window.mozRequestAnimationFrame)
			{
					console.log("supported");
					
			}
			else{
				console.log("not supported");	
			}
			
		 	//console.log(context);

        // console.log(localMediaStream);
	   
		 
      },

      // errorCallback
      function(err) {
         console.log("The following error occured: " + err);
      }
   );
}
else{
    
    alert("not working");
}
/*
var wavesurfer = Object.create(WaveSurfer);

wavesurfer.init({
  container     : '#wave',
  waveColor     : 'black',
  loopSelection : false,
  cursorWidth   : 0
});

var microphone = Object.create(WaveSurfer.Microphone);

microphone.init({
    wavesurfer: wavesurfer
});

*/