/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var record = document.getElementById("record");
 var recoprdstop = document.getElementById("stop");
 var recordpause = document.getElementById("pause");
 var rdata = document.getElementById("rdata");
navigator.getUserMedia =  navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia;
if(navigator.getUserMedia ){
    console.log("supported");
  navigator.getUserMedia ({
        video:false,
        audio:true},
      function(stream) {
		   var mediaRecorder = new MediaRecorder(stream);
		  
		   
		   rdata.onclick = function(){
				if(mediaRecorder.state === "recording")
				{
					mediaRecorder.requestData();
						
					
				}
				else{
					console.log("no data");	
				}
		   }
		   
		   record.onclick = function() {
			    var myStream = mediaRecorder.stream;
               mediaRecorder.start();
			   		console.log(myStream);
               	console.log("recorder started :",mediaRecorder.state );
           }

           recoprdstop.onclick = function() {
			  
               mediaRecorder.stop();
			   cosole.log("recorder stopped, data available :",mediaRecorder.state );
			 
           }
		   recordpause.onclick = function(){
				if(mediaRecorder.state === "recording") {
               mediaRecorder.pause();
               console.log( "recording paused:",mediaRecorder.state );
             } else if(mediaRecorder.state === "paused") {
               mediaRecorder.resume();
               console.log("resume recording",mediaRecorder.state ); 
             }
		   }
		   
         	 
			 mediaRecorder.ondataavailable = function(e) {
            	console.log(mediaRecorder.state);
				var audioblob= e.data;
					console.log(audioblob);
					
					var sdcard = navigator.getDeviceStorage('music');
					var filename = Date.now()+".ogg";
						var request = sdcard.addNamed(audioblob, filename);
					request.onsuccess = function () {
							  var name = this.result;
							  console.log('File "' + name + '" successfully wrote on the sdcard storage area');
							  
							  var audio = document.createElement('audio');
             audio.setAttribute('controls', '');
             var audioURL = window.URL.createObjectURL(audioblob);
			 console.log(audioURL);
             audio.src = audioURL;
			 audio.play();
							  
							  
							}
							
							// An error typically occur if a file with the same name already exist
							request.onerror = function () {
							  console.warn('Unable to write the file: ' + this.error);
							}
					
            	 
			 
           }
      },

      // errorCallback
      function(err) {
         console.log("The following error occured: " + err);
      }
   );
}
else{
    
    console.log("not working");
}

