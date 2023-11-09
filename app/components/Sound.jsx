import React, { useState } from 'react';

function Sound(sanity) {
  const [playbackPercentage, setPlaybackPercentage] = useState(0);
  const [activeCircleIndex, setActiveCircleIndex] = useState(null);

  const playSound = (url, index) => {
    const audio = new Audio(url);
    audio.play();

    setActiveCircleIndex(index); // Store the index of the clicked circle

    audio.addEventListener('timeupdate', () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setPlaybackPercentage(percentage);
    });

    audio.addEventListener('ended', () => {
      setPlaybackPercentage(0);
      setActiveCircleIndex(null);
    });
  }



  return (
    <div className='w-screen absolute bottom-16 ml-48 overflow-hidden'>
      <div className="flex borderTop  mr-60  left-0 overflow-hidden">
        <div className='pt-12'>
          <h2>{sanity.sanity.sanity.soundTitle}</h2>
          <h3>{sanity.sanity.sanity.soundSubTitle}</h3>
        </div>
        <div className='flex items-center gap-16 pl-24 pt-20'>
          {sanity.sanity.sanity.itemmp3.map((item, index) => (
            <div
              className="roundCircle flex justify-center items-center"
              key={index}
              onClick={() => playSound(item.text, index)}
              style={{
                background: index === activeCircleIndex ? `conic-gradient(#0000FF ${playbackPercentage}%, #FFFFFF ${playbackPercentage}%)` : ""
              }}
            >
              <h3>{item.icon}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sound;
