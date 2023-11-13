import React from 'react';

import FilledButton from './FilledButton';

function Etapes(props) {
  const {sanity} = props;

  return (
    <div id='decouverte' className="px-8 ">
      <div className="grid">
        <h2 className="col-start-2 col-end-9">
          RENTRER DANS LA COURSE EN 4 ÉTAPES
        </h2>
        <div className="flex-col col-start-3 col-end-9 flex  mt-52 gap-48 relative ">
          <div className="flex gap-24">
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">1</h3>
              </div>
            </div>

            <h4 className="">
               Choisissez votre pack et décrochez votre ticket - l'aventure
              commence avec un T-shirt (1 ticket), s'accélère avec un Hoodie (2
              tickets), et passe à la vitesse supérieure avec le combo T-shirt +
              Hoodie (3 tickets).
            </h4>
          </div>
          <div className="flex gap-24">
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">2</h3>
              </div>
            </div>
            <h4>
              La ligne d'arrivée est fixée à 5000 participations <br /> ne
              laissez pas cette chance vous échapper !
            </h4>
          </div>
          <div className="flex gap-24">
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">3</h3>
              </div>
            </div>
            <h4>
               La "Rota Fortunae" tourne - un tirage au sort par un huissier de
              justice vous mène vers la victoire.
            </h4>
          </div>
          <div className="flex gap-24">
            <div>
              <div className="bulle relative">
                <h3 className="w-full text-center">4</h3>
              </div>
            </div>
            <h4>
              Clef en main, avec ou sans permis - nous vous offrons même le
              permis si nécessaire. Chez Déjanté, Personne n’est laissé sur le
              bord de la route.
            </h4>
          </div>
          <div className="flex gap-24">
            <div className='relative -left-16'>
            <FilledButton text={'PARTICIPER'}/>
            </div>
          <h4></h4>
          </div>
       <div className="lineDotted"></div>
        </div>
      </div>
    </div>
  );
}

export default Etapes;
