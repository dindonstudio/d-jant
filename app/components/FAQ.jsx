import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RevealTitle from '~/components/RevealTitleWrapper';
import RevealOpacity from '~/components/RevealOpacity';

import RevealListWrapper from '~/components/RevealListWrapper';
function FAQ() {
  const faqData = [
    {
      question: "Comment participer au concours pour gagner la Abarth Déjanté ?",
      answer: "L’achat d’un T-shirt, Hoodie ou le pack vous garantit 1, 2 ou 3 participations automatiques au concours. "
    },
    {
      question: "Dois-je avoir un permis de conduire pour gagner la voiture ?",
      answer: "Non ! Si le gagnant n'a pas le permis, nous lui offrons ! Vous devez cependant avoir atteint l'âge légal de 18 ans. "
    },

    {
      question: "Quand le tirage au sort aura-t-il lieu ?",
      answer: "Le tirage au sort s’effectuera dans les 2 semaines suivant la vente de la 5000ème unité textile vendue. "
    },
    {
      question: "Comment saurai-je si j'ai gagné ?",
      answer: "Le gagnant sera contacté par mail, téléphone et voie postale pour l’informer du gain ! "
    },
    {
      question: "Y a-t-il une date limite pour acheter et participer ?",
      answer: "Non mais la participation doit se faire avant la vente de 5000 unités ! "
    },

    {
      question: "Puis-je participer si je suis en dehors du pays ?",
      answer: "Oui ! Depuis Monaco, la Belgique, la Suisse et le Luxembourg."
    },
    {
      question: "Comment le gagnant sera-t-il choisi ?",
      answer: "Ce concours est encadré par la loi. Le gagnant sera tiré dans la liste des participations nominatives. Un tirage 100% transparent retransmis en vidéo et réalisé par Maître Bernard DELATRE, huissier de justice de ATLAS JUSTICE. Retrouvez le règlement     <a href='/policies/refund-policy'>ici</a> "
    },

    {
      question: " Puis-je échanger la voiture contre de l'argent ?",
      answer: "Non ! Cependant le gagnant garde le droit une fois détenteur légal de celle-ci d’en faire ce qu’il souhaite.  "
    },
    {
      question: " Que se passe-t-il si les 5000 unités ne sont pas vendues ?",
      answer: "Impossible ! C’est à grâce à vous et votre engagement que nous atteindrons cet objectif ensemble ! "
    },
    {
      question: "Les frais d'assurance et d'immatriculation de la voiture sont-ils inclus ?",
      answer: "Les frais d’immatriculation sont à la charge de D-JAN-T3 SAS. Cependant les frais d’assurance restent à la charge du gagnant dès lors que celle-ci lui est livrée et qu’il en est le détenteur légal."
    },

  ];

  return (
    <div className='md:px-0 px-6'>
      <h2 className="uppercase text-center ">
        <RevealOpacity delay={500}>
        Foire aux questions
        </RevealOpacity>
    </h2>
      <h4 className="text-center">
      <RevealOpacity delay={500}>
        Ne demandez pas votre chemin, trouvez vos réponses ici.
        </RevealOpacity>
      </h4>
      <div id='accordion' className='md:pt-52 pt-24 md:px-0 px-12'>
      <Accordion type="single" collapsible>
      < RevealListWrapper delay={600} interval={60} reset={false} >
        {faqData.map((faq, index) => (
         <div 
         className={index % 2 === 0 ? "col-start-3 col-end-7" : "col-start-7 col-end-11"}
         
         key={`faq-item-${index}`}
       >
  

         <AccordionItem value={`item-${index}`}>
           <AccordionTrigger>{faq.question}</AccordionTrigger>
           <AccordionContent className='relative'>{faq.answer}</AccordionContent>
         </AccordionItem>

       </div>
        ))}
                 </RevealListWrapper>
      </Accordion>
      </div>
      
    </div>
  );
}

export default FAQ;
