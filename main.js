r = 256;
g = 256;
b = 256;
object = [];
status = "";
video = "";
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}
function draw() {
    canvas = createCanvas(1000,440);
    canvas.center();
    image(video, 0, 0, 1000, 440);
    if (status != "") {
        objectDetector.detect(viedo, gotResults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML="Status: Object Is Detected";
            document.getElementById("number_of_objects").innerHTML="Objects Observed: "+object.length;
            fill(math.random(r, g, b));
            percent = floor(object[i].confidence * 100);
            text(object[i].label+""+percent+"%", object[i].x+15, object[i].y+15);
            stroke(math.random(r, g, b));
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="STATUS: DETECTING OBJECTS";
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(-1);
    video.volume(1);
}