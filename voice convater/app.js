let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let audio = document.getElementById("audioPlayback");
let startBtn = document.getElementById("startRecord");
let stopBtn = document.getElementById("stopRecord");
let downloadBtn = document.getElementById("downloadAudio");

startBtn.addEventListener("click", async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };
    
    mediaRecorder.onstop = () => {
        audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioUrl = URL.createObjectURL(audioBlob);
        audio.src = audioUrl;
        downloadBtn.disabled = false;
    };
    
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

downloadBtn.addEventListener("click", () => {
    let link = document.createElement("a");
    link.href = audioUrl;
    link.download = "voice_recording.wav";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Apply Effects
document.getElementById("applyEffects").addEventListener("click", () => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let source = audioContext.createBufferSource();
    
    fetch(audioUrl)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            source.buffer = audioBuffer;

            let gainNode = audioContext.createGain();
            let speedControl = document.getElementById("speedControl").value;
            let pitchControl = document.getElementById("pitchControl").value;
            
            source.playbackRate.value = speedControl;
            gainNode.gain.value = pitchControl;

            source.connect(gainNode).connect(audioContext.destination);
            source.start();
        });
});
