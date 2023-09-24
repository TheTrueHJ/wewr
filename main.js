function setup() {
  canvas = createCanvas(300, 200);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function modelLoaded(){
  console.log("Model Loaded");
}

function draw(){
  image(video,0,0, 300, 200);
  classifier.classify(video, gotResult);
}

prev = ""
function gotResult(error, results){
  if(error){
    console.log(error);
  }
  else{
    if(results[0].confidence >= 0.5 && results[0].label != prev){
      console.log(results);
      prev = results[0].label;

      var synth = window.speechSynthesis;
      speak = "Object detected is " + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak);
      synth.speak(utterThis);

      document.getElementById("object").innerHTML = results[0].label;
      document.getElementById("acc").innerHTML = results[0].confidence.toFixed(3);

    }
  }
}

