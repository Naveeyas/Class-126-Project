song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
ScoreLeftWrist = 0;
ScoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill('#FF0000');
    stroke('#FF0000');

if(ScoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 20);

    song2.stop();

    if(song1_status == false)
    {
        song1.play();
        document.getElementById("song").innerHTML = "Centuries";
    }
}
if(ScoreLeftWrist > 0.2)
{
    circle(leftWristX, leftWristY, 20);

    song1.stop();

    if(song2_status == false)
    {
        song2.play();
        document.getElementById("song").innerHTML = "Hall of Fame";
    }
}
}


function preload()
{
    song1 = loadSound("song1_centuries.mp3");
    song2 = loadSound("song2_Hall_of_Fame.mp3");
}

function play()
{
    song1.play();
    song1.volume(1);
    song1.rate(1);
}

function modelLoaded()
{
    console.log("poseNet is Intialized!");
}

function gotPoses(results)
{
    ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWrist = " + ScoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(leftWristX);
        console.log(leftWristY);
        console.log(rightWristX);
        console.log(rightWristY);
}