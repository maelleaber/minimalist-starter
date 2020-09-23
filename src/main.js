import config from './config.js'


const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 500
const ctx = canvas.getContext('2d')

let i = 0 
let startTime 
let time
let time_s
let time_min
let name
let result = []

var Recording = function(cb){
  var recorder = null;
  var recording = true;
  var audioInput = null;
  var volume = null;
  var audioContext = null;
  var callback = cb;

  navigator.getUserMedia = navigator.getUserMedia    || navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia || navigator.msGetUserMedia;

  if(navigator.getUserMedia){
    navigator.getUserMedia({audio:true},
      function(e){ //success
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        volume = audioContext.createGain(); // creates a gain node
        audioInput = audioContext.createMediaStreamSource(e); // creates an audio node from the mic stream
        audioInput.connect(volume);// connect the stream to the gain node
        recorder = audioContext.createScriptProcessor(2048, 1, 1);

        recorder.onaudioprocess = function(e){
            if(!recording) return;
            var left = e.inputBuffer.getChannelData(0);
            callback(new Float32Array(left));
        };
        volume.connect(recorder);// connect the recorder
        recorder.connect(audioContext.destination);
      },
      function(e){ //failure
        alert('Error capturing audio.');
      }
    );
  } else {
    alert('getUserMedia not supported in this browser.');
  }
};

var lastClap = (new Date()).getTime();

function detectClap(data){
    var t = (new Date()).getTime();
    if(t - lastClap < 200) return false; 
    var zeroCrossings = 0, highAmp = 0;
    for(var i = 1; i < data.length; i++){
      if(Math.abs(data[i]) > 0.25) highAmp++; 
      if(data[i] > 0 && data[i-1] < 0 || data[i] < 0 && data[i-1] > 0) zeroCrossings++;
    }

    if(highAmp > 20 && zeroCrossings > 30){ 
      lastClap = t;
      return true;
    }
    return false;
}


const button = document.createElement('button')
button.innerText = 'Start game'

button.addEventListener('click', () => {

  Recording(function(data){
    if(detectClap(data)){
      console.log('clap!');
      loop(detectClap)
    }
  })
    var date1 = new Date
    startTime = date1.getTime()
    console.log('start time' + startTime)
    
})


function loop(detectClap) {

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, 800, 500)
  ctx.lineCap ="round"
  
  let maxHeight = 460
  let height = maxHeight -i
  let width = 15 
  const noodle1 = new Path2D()
  noodle1.rect(360, 0, width, height)
  ctx.fillStyle ='#e1e3ac'
  ctx.fill(noodle1)

  const noodle2 = new Path2D()
  noodle2.rect(390, 0, width, height)
  ctx.fillStyle ='#e1e3ac'
  ctx.fill(noodle2)

  const noodle3 = new Path2D()
  noodle3.rect(420, 0, width, height)
  ctx.fillStyle ='#e1e3ac'
  ctx.fill(noodle3)

  const rectangle = new Path2D
  rectangle.rect(300, 400, 200, 100)
  ctx.fillStyle ='white'
  ctx.fill(rectangle)
  const bowl = new Path2D()
  bowl.arc(400, 390, 100, 0, Math.PI)
  ctx.stroke(bowl)
  
  ctx.moveTo(300,390)
  ctx.lineTo(500,390)
  ctx.stroke()

  ctx.fillStyle ="red"
  ctx.fill(bowl)

  
  if(detectClap){
    i += 10
  }

  if(height < 0){
    height = 0
  }

  if(height == 0){
      // alert('you won')
      let date2 = new Date
      let endtime = date2.getTime()
      time = endtime - startTime
      time_s = Math.floor(((time) / 1000) % 60)
      time_min = Math.floor(((time) / (1000 * 60)) % 60)
      time_min = (time_min < 10) ? "0" + time_min : time_min;
      time_s = (time_s < 10) ? "0" + time_s : time_s;
      console.log('time: ' + time_min + ':'+ time_s)
      name = prompt('Congrats! You ate everything in '+ time_min + 'm'+ time_s+'s. Please enter your name', '')
      result = [{name: name}, {time : time}]
      console.log(result)

      }
  }


  // window.requestAnimationFrame(loop)




document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  app.append(canvas)
  app.append(button)
  loop()
  
})



