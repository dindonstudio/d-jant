import React from 'react';
import RevealTitle from '~/components/RevealTitleWrapper';
import {useRef, useEffect} from 'react';
import VideoPlayer from '~/components/VideoPlayer';
import RevealListWrapper from '~/components/RevealListWrapper';

function VideoPresentation(props) {
  const {sanity} = props;
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          videoContainerRef.current.classList.add('video-reveal-centered');
        }
      },
      {threshold: 0.5}, // Trigger when 50% of the video is visible
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);
  return (
    <div className="grid md:px-8 px-6 videoPresentation">
      <div className="col-start-1 md:col-end-11 col-end-13 md:pb-40 pb-16">
        <h2 className="uppercase maxCh21">
          <RevealTitle>{sanity.videoTitle}</RevealTitle>
        </h2>
        {/* <h4>Ressentez chaque virage, chaque accélération, chaque instant de liberté.</h4> */}
      </div>
      <div className="md:col-start-2 md:col-end-12 col-start-1 col-end-13" ref={videoContainerRef}>
        <VideoPlayer
          url={
         sanity.videoPresentationUrl
          }
          controls
        />
      </div>
      <div className="md:col-start-3 md:col-end-9 col-start-2 col-end-12 md:pt-96 pt-32">
        <RevealListWrapper delay={600} interval={300}>
          <h4>
          {sanity.storyTelling} <br /> <br />  </h4>
            <h3 className=" italic">Bienvenue chez Déjanté.</h3>
        
        </RevealListWrapper>
      </div>
    </div>
  );
}

export default VideoPresentation;
