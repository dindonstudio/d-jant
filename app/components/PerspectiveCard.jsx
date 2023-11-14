import React, {useEffect, useRef} from 'react';

const PerspectiveCard = ({number}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    function perspectiveHover(intensity) {
      const cards = document.querySelectorAll('.js-perspective-card');

      cards.forEach((card) => {
        card.addEventListener('mousemove', function (e) {
          const rect = this.getBoundingClientRect();

          const elX = rect.left + window.scrollX;
          const elY = rect.top + window.scrollY;
          const elWidth = this.offsetWidth;
          const elHeight = this.offsetHeight;

          const mouseX = e.pageX;
          const mouseY = e.pageY;

          const rotateY = -(
            ((elWidth / 2 - (mouseX - elX)) / (elWidth / 2)) *
            intensity
          );
          const rotateX =
            ((elHeight / 2 - (mouseY - elY)) / (elHeight / 2)) * intensity;

          this.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function () {
          this.style.transform = '';
          this.style.transition = ' transform 0.5s ease; ';
        });
      });
    }

    perspectiveHover(12);
  }, []);

  const tickets = Array.from({ length: number }, (_, index) => (

        <svg
        key={index}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              height="40px"
  viewBox="0 0 256 191"
  enable-background="new 0 0 256 256"
  xml:space="preserve"
          
            >
              <metadata>
                {' '}
                Svg Vector Icons : http://www.onlinewebfonts.com/icon{' '}
              </metadata>
              <g>
                <g>
                  <path
                    fill="#DB202E"
                    d="M147.8,113.1h-5.3l-14.7,14.7v-14.7H124v29.7h3.9v-10.3l4.8-4.7l10.5,15h5.2l-13-17.7L147.8,113.1z M111.2,138.1c-1.5,1.3-3.4,1.9-5.6,1.9c-1.8,0-3.5-0.5-5-1.4c-1.5-0.9-2.7-2.3-3.4-4.2c-0.7-1.9-1.1-4.1-1.1-6.6c0-2,0.3-3.9,0.9-5.7c0.6-1.9,1.7-3.3,3.2-4.4c1.5-1.1,3.4-1.6,5.7-1.6c2,0,3.6,0.5,4.9,1.5c1.3,1,2.3,2.6,3,4.7l3.9-0.9c-0.8-2.7-2.2-4.9-4.2-6.4c-2-1.5-4.5-2.3-7.5-2.3c-2.6,0-5,0.6-7.2,1.8s-3.9,3-5,5.3c-1.2,2.3-1.8,5-1.8,8.1c0,2.8,0.5,5.5,1.6,8c1,2.5,2.6,4.4,4.6,5.7c2,1.3,4.6,1.9,7.8,1.9c3.1,0,5.7-0.8,7.8-2.6c2.1-1.7,3.6-4.2,4.4-7.4l-3.9-1C113.8,134.9,112.8,136.8,111.2,138.1z M81.4,142.8h3.9v-29.7h-3.9V142.8z M53.8,116.6h9.8v26.2h3.9v-26.2h9.8v-3.5H53.8V116.6L53.8,116.6z M156.7,129.2H173v-3.5h-16.4v-9.1h17.4v-3.5h-21.4v29.7h22.1v-3.5h-18.1L156.7,129.2L156.7,129.2z M210.6,81.1H45.4c-7.8,0-14.1,6.4-14.1,14.2v65.3c0,7.8,6.3,14.2,14.1,14.2h165.2c7.8,0,14.1-6.4,14.1-14.2V95.3C224.7,87.5,218.4,81.1,210.6,81.1z M216.5,160.7c0,3.3-2.6,5.9-5.9,5.9H45.4c-3.3,0-5.9-2.6-5.9-5.9V95.3c0-3.3,2.6-5.9,5.9-5.9h165.2c3.3,0,5.9,2.6,5.9,5.9V160.7z M179.1,116.6h9.8v26.2h3.9v-26.2h9.8v-3.5h-23.5V116.6L179.1,116.6z M243.1,89.4h2.9v-5.9h-5.9c-6.5,0-11.8-5.3-11.8-11.9v-5.9H27.7v5.9c0,6.5-5.3,11.9-11.8,11.9H10v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v6h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h3c1.6,0,2.9,1.3,2.9,3c0,1.6-1.3,3-2.9,3h-3v5.9h5.9c6.5,0,11.8,5.3,11.8,11.9v5.9h200.6v-5.9c0-6.5,5.3-11.9,11.8-11.9h5.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9V131h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-6h-2.9c-1.6,0-3-1.3-3-3s1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3c0-1.6,1.3-3,3-3h2.9v-5.9h-2.9c-1.6,0-3-1.3-3-3C240.1,90.7,241.4,89.4,243.1,89.4z M233.6,110.2c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9c0,0.8,0.1,1.5,0.2,2.3c-6.4,2.8-11.1,8.9-11.9,16.2H35.7c-0.8-7.2-5.5-13.3-11.9-16.2c0.1-0.7,0.2-1.5,0.2-2.3c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-2.2-0.6-4.2-1.7-5.9c1.1-1.7,1.7-3.8,1.7-5.9c0-0.8-0.1-1.5-0.2-2.3c6.4-2.8,11.1-8.9,11.9-16.2h184.6c0.8,7.2,5.5,13.3,11.9,16.2c-0.2,0.7-0.2,1.5-0.2,2.3c0,2.2,0.6,4.2,1.7,5.9c-1.1,1.7-1.7,3.8-1.7,5.9C231.9,106.4,232.6,108.5,233.6,110.2z"
                  />
                </g>
              </g>
            </svg>
        
 
));
  return (
    <div ref={cardRef} className="js-perspective absolute -top-6 -right-4 z-20">
      <div className="perspective-card-wrap">
        <div className="js-perspective-card perspective-card">
          <div className="perspective-card__content flex flex-col">
          {tickets}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PerspectiveCard;
