 /** Scripts del reproductor de audio **/
        let currentSong = null;
        let song = document.getElementById("song");

        function setSong(songFile, title, text, image) {
            currentSong = songFile;
            song.src = songFile;
            song.load();
            document.getElementById('card-title').textContent = title;
            document.getElementById('card-text').textContent = text;
            document.getElementById('card-image').src = image;
            playButton.style.display = "block";
            pauseSong.style.display = "none";
        }

        function init() {
            console.log(song.duration);

            let playButton = document.getElementById("playButton");
            let pauseSong = document.getElementById("pauseSong");
            pauseSong.style.display = "none";

            let stopSong = document.getElementById("stop");

            let muteSong = document.getElementById("mute");
            let unmuteSong = document.getElementById("unmute");
            unmuteSong.style.display = "none";

            let retrasarSong = document.getElementById("retrasar");
            let avanzarSong = document.getElementById("avanzar");

            playButton.addEventListener("click", function () {
                playSong(currentSong, document.getElementById('card-title').textContent, document.getElementById('card-text').textContent, document.getElementById('card-image').src);
                playButton.style.display = "none";
                pauseSong.style.display = "block";
            });

            pauseSong.addEventListener("click", function () {
                song.pause();
                pauseSong.style.display = "none";
                playButton.style.display = "block";
            });

            stopSong.addEventListener("click", function () {
                song.pause();
                song.currentTime = 0;
                playButton.style.display = "block"; 
                pauseSong.style.display = "none"; 
            });

            muteSong.addEventListener("click", function () {
                MuteSong();
                muteSong.style.display = "none";
                unmuteSong.style.display = "block";
            });

            unmuteSong.addEventListener("click", function () {
                UnmuteSong();
                unmuteSong.style.display = "none";
                muteSong.style.display = "block";
            });

            retrasarSong.addEventListener("click", function () {
                song.currentTime -= 10;
            });

            avanzarSong.addEventListener("click", function () {
                song.currentTime += 10;
            });
        }


        function playSong(songFile, title, text, image) {
            var source = document.getElementById('source');
            source.src = songFile;

            document.getElementById('card-title').textContent = title;
            document.getElementById('card-text').textContent = text;
            document.getElementById('card-image').src = image;

            if (!song.paused && !song.ended) {
                song.pause();
                window.clearInterval(bucle);
            } else {
                song.play();
                bucle = setInterval(BarState, 1000);
            }
        }

        function BarState() {
            let barSong = document.getElementById("bar");
            let total = 0;
            if (!song.ended) {
                total = parseInt(song.currentTime * 100 / song.duration);
                barSong.style.width = total + "%";
                bar.innerHTML = total + "%";
            }
        }

        function MuteSong() {
            if (song.muted) {
                song.muted = false;
            } else {
                song.muted = true;
            }
        }

        function UnmuteSong() {
            song.muted = false;
        }

        window.addEventListener("load", init, false);