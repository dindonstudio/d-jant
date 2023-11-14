import { keyframes } from "@emotion/react";
import { Reveal } from "react-awesome-reveal";

const customAnimation = keyframes`
from {
    opacity: 0;
    transform: translate3d(-200px, -100px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

`;

function VideoHeroReveal({ children }) {
  return <Reveal keyframes={customAnimation}>{children}</Reveal>;
}
export default VideoHeroReveal