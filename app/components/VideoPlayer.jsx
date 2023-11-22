import React from 'react';

// Props:
// - url: the video source URL
// - loop: boolean, whether the video should loop or not
// - mute: boolean, whether the video should be muted or not
// - autoplay: boolean, whether the video should autoplay or not

const VideoPlayer = ({ url, loop = false, mute = false, autoplay = false, controls= false }) => {
    return (
        <video
        className='borderRadius'
            width="100%"
            height="100%"
        playsInline
            loop={loop}
            muted={mute}
            autoPlay={autoplay}
            src={url}
            controls={controls}
        ></video>
    );
};

export default VideoPlayer;
