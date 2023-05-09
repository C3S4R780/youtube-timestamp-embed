// Creates the youtube video player and replaces its placeholder
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'b1Fo_M_tj6w',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// For each timestamp listed...
document.querySelectorAll('.timestamp').forEach(timestamp => {

    // Converts timestamp time to seconds
    var timestampTime = timestamp.innerText.split(' - ')[0],
        minutes = parseInt(timestampTime.split(':')[0]),
        seconds = parseInt(timestampTime.split(':')[1]),
        timeInSeconds = (minutes*60)+seconds;
    timestamp.setAttribute('data-time', timeInSeconds);

    // Upon clicking onto one of the timestamps...
    timestamp.addEventListener('click', e => {

        // Change the current video time to the timestamp selected
        player.seekTo(timeInSeconds);
    });
})

// Update button states based on the current video's timestamp
function onPlayerStateChange(event) {
    if (event.data == -1) { // Not finished...
        setInterval(() => { // Check every 0.3 seconds

            // For each timestamp listed...
            document.querySelectorAll('.timestamp').forEach(timestamp => {

                // If the video's timestamp is greater than the button's timestamp...
                if (Math.round(player.getCurrentTime()) >= parseInt(timestamp.dataset.time)) {
                    timestamp.classList.add('passed');

                    // If there is an next timestamp, make it the new current timestamp
                    if (timestamp.nextElementSibling && !timestamp.nextElementSibling.classList.contains('passed')) {
                        timestamp.classList.add('current');
                    } else {
                        timestamp.classList.remove('current');
                    }
                } else if (timestamp.classList.contains('passed')) {
                    timestamp.classList.remove('passed');
                }
            });
        }, 300);
    }
}