import React, { useEffect } from 'react';

const ProgressBar = () => {
    // const [progress, setProgress] = useState(20);
    // const canvasRef = useRef(null);
  
    useEffect(() => {
        let c = document.getElementById('myCanvas');
        let ctx = c.getContext("2d");
        
        let xOffset = c.offsetWidth * 0.5;
        let offsetTarget = xOffset;
        let offsetPrev = xOffset;
        let move = false;
        let moveDur = 50;
        let moveCur = 0;
        
        let waveCurrent = c.offsetWidth * 0.5;
        let waveSpd = 0.035;
        let waveSpdFast;
        let waveSpdF0 = waveSpd * 2;
        let waveSpdF1 = waveSpd * 3;
        let waveSpdF2 = waveSpd * 4;
        let waveSpdCur = waveSpd;
        let waveDur = 80;
        let waveDiff = 0;
        let waveCur = 0;
        let waveDown = false;
        
        let amp = 12;
        let freq = 0.020;
        
        function init() {
            window.requestAnimationFrame(draw);
        }
        
        function draw() {
            ctx.clearRect(0,0, c.offsetWidth, c.offsetHeight);
            ctx.save();
        
            ctx.beginPath();
            ctx.lineWidth = 5;
        
            // Move amount to the target offset if not set
            if (move) {
                var step = moveCur / moveDur;
                step = 1 - Math.pow(1 - step, 3);
                xOffset = lerp(offsetPrev, offsetTarget, step);
                moveCur += 1;
                if (xOffset == offsetTarget) move = false;
            }
        
            var x = amp * Math.sin(c.offsetHeight * freq + waveCurrent);
            ctx.moveTo(xOffset + x, c.offsetHeight);
            ctx.lineTo(0, c.offsetHeight);
            ctx.lineTo(0, 0);
            x = amp * Math.sin(waveCurrent);
            ctx.lineTo(xOffset + x, 0);
            for (var i = 0; i <= c.offsetHeight; i++) {
                x = amp * Math.sin(i * freq + waveCurrent);
                ctx.lineTo(xOffset + x, i);
            }
            ctx.clip();
        
            ctx.fillStyle = "#DB202E";
            ctx.fillRect(0, 0, c.offsetWidth, c.offsetHeight);
            ctx.restore();
        
            // Wave quicker while moving
            if (move) {
                switch(waveDiff) {
                    case 0:
                        waveSpdFast = waveSpdF0;
                        break;
                    case 1:
                        waveSpdFast = waveSpdF1;
                        break;
                    case 2:
                        waveSpdFast = waveSpdF2;
                        break;
                }
                waveCurrent += waveSpdFast;
                waveDown = true;
            }
            else if (waveDown) {
                var step = waveCur / waveDur;
                //step = 1 - Math.pow(1 - step, 3);
                waveSpdCur = lerp(waveSpdFast, waveSpd, step);
                waveCur += 1;
                waveCurrent += waveSpdCur;
                if (waveSpdCur == waveSpd) waveDown = false;
            } else waveCurrent += waveSpd;
        
            window.requestAnimationFrame(draw);
        }
        
        c.addEventListener("click", event => {
            offsetTarget = event.clientX;
            offsetPrev = xOffset;
            move = true;
            moveCur = 0;
            waveCur = 0;
            waveDown = false;
            var difference = Math.abs(offsetTarget - offsetPrev);
            if (difference > 800) waveDiff = 2;
            else if (difference > 300) waveDiff = 1;
            else waveDiff = 0;
        });
        
        function lerp(a, b, t) {
            return a + t * (b - a);
        }
        
        init();
    }, []); // Empty dependency array ensures this effect runs only once after mounting
  
    const updateProgress = (value) => {
      setProgress(value);
      // Update canvas drawing based on the new progress
    };

  return (
    <div className='flex justify-center items-center relative -top-4'>
                <h5 className='mix-blend-difference absolute Mix uppercase'>Plus que 1200 !</h5>
    <div className="progress-bar-container">

   <canvas  id="myCanvas" width="1600" height="165"></canvas>
     
    </div>
    </div>

  );
};

export default ProgressBar;
