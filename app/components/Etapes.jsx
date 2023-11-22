import React from 'react';
import { useEffect,useState,useRef } from 'react';
import FilledButton from './FilledButton';
import RevealOpacity from '~/components/RevealOpacity';
import RevealTitle from '~/components/RevealTitleWrapper';
import RevealListWrapper from '~/components/RevealListWrapper';
function Etapes(props) {
  const { sanity } = props;
  const [scrollPosition, setScrollPosition] = useState(0);
  const lineDottedRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const dottedLine = lineDottedRef.current;
      if (!dottedLine) return;
    
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
    
      // Getting the top position of the dotted line element relative to the document
      const dottedLineTop = dottedLine.getBoundingClientRect().top + window.scrollY - 300;
    
      // Calculate the scroll position where the top of the dotted line enters the middle of the screen
      const startAnimationScrollY = dottedLineTop - windowHeight / 2;
    
      // Adjusted scroll position calculation
      let newScrollPosition = (scrollY - startAnimationScrollY) / windowHeight;
    
      // Clamping the scroll position between 0 and 1
      newScrollPosition = Math.min(1, Math.max(0, newScrollPosition));
    
      setScrollPosition(newScrollPosition);
    };
    
    

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the background position based on the scroll position
  const height = `${scrollPosition * 100}%`;
  return (

    <div id="decouverte" className="md:px-8 px-6 ">
      <div className="md:gridCustom block">
        <h2 className="col-start-2 col-end-9 md:pr-0 pr-12">
          <RevealTitle>
          RENTRER DANS LA COURSE EN 4 ÉTAPES
          </RevealTitle>

        </h2>
        <div className="flex-col col-start-3 col-end-9 flex  md:mt-52 mt-32 md:gap-48 gap-28 relative ">
          <div className="flex md:gap-24 ">
            <RevealListWrapper reset={true} classname={'flex md:gap-24 gap-20'}>

       
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">1</h3>
              </div>
            </div>

            <h4 className="">
              <strong>Choisissez votre pack et décrochez votre ticket</strong>  - l'aventure
              commence avec <strong> un T-shirt (1 ticket)</strong>, s'accélère avec <strong>un Hoodie (2
              tickets)</strong> , et passe à la vitesse supérieure avec <strong>le combo T-shirt +
              Hoodie (3 tickets).</strong> 
            </h4>
            </RevealListWrapper>
          </div>
          <div className="flex gap-24">
          <RevealListWrapper reset={true} classname={'flex md:gap-24 gap-20'}>
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">2</h3>
              </div>
            </div>
            <h4>
              La ligne d'arrivée est fixée à <strong>5000 participations</strong>,   ne
              laissez pas cette chance vous échapper !
            </h4>
            </RevealListWrapper>
          </div>
          <div className="flex gap-24">
          <RevealListWrapper reset={true} classname={'flex md:gap-24 gap-20'}>
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">3</h3>
              </div>
            </div>
            <h4>
               La <strong>"Rota Fortunae" </strong> tourne - un tirage au sort par <strong>un huissier de
              justice</strong>  vous mène vers la victoire.
            </h4>
            </RevealListWrapper>
          </div>
          
          <div className="flex gap-24">
          <RevealListWrapper reset={true} classname={'flex md:gap-24 gap-20'}>
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">4</h3>
              </div>
            </div>
            <h4>
              <strong> Clef en main</strong>
             , avec ou sans permis - <strong>nous vous offrons même le
              permis si nécessaire.</strong>  Chez Déjanté, Personne n’est laissé sur le
              bord de la route.
            </h4>
            </RevealListWrapper>
          </div>
          <div className="flex gap-24 ">
          <RevealListWrapper reset={true} classname={'flex md:gap-24 gap-20 py-2 relative damier md:-left-20'}>
            <div className="relative ">
              <FilledButton text={'PARTICIPER'} />
            </div>
            </RevealListWrapper>
          </div>
          <div className="lineDotted" ref={lineDottedRef} style={{ height }}></div>
        </div>
      </div>
    </div>
  );
}

export default Etapes;
