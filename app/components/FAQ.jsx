import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function FAQ() {
  const faqData = [
    {
      question: "Comment puis-je participer au concours pour gagner une Abarth ?",
      answer: "Pour participer, achetez un t-shirt ou un hoodie de notre collection. Chaque article vous donne une entrée dans le tirage au sort."
    },
    {
      question: "Dois-je avoir un permis de conduire pour gagner la voiture ?",
      answer: "Non, si vous gagnez et que vous n'avez pas de permis, nous vous offrirons la formation nécessaire pour l'obtenir."
    },
    {
      question: "Combien d'articles dois-je acheter pour participer ?",
      answer: "Il n'y a pas de limite minimum d'achat pour participer. Chaque article acheté est une chance de gagner."
    },
    {
      question: "Quand le tirage au sort aura-t-il lieu ?",
      answer: "Le tirage au sort sera effectué une fois que nous aurons vendu 3000 unités."
    },
    {
      question: "Comment saurai-je si j'ai gagné ?",
      answer: "Le gagnant sera contacté directement via les informations fournies lors de l'achat et annoncé sur nos plateformes de réseaux sociaux."
    },
    {
      question: "Y a-t-il une date limite pour acheter et participer ?",
      answer: "Oui, la date limite pour participer sera annoncée sur notre site web et nos réseaux sociaux."
    },

    {
      question: "Puis-je participer si je suis en dehors du pays ?",
      answer: "Veuillez vérifier les termes et conditions sur notre site web, car des restrictions géographiques peuvent s'appliquer."
    },
    {
      question: "Comment le gagnant sera-t-il choisi ?",
      answer: "Le gagnant sera choisi au hasard parmi tous les participants éligibles une fois que le seuil des 3000 unités vendues est atteint."
    },
    {
      question: " Puis-je échanger la voiture contre de l'argent ?",
      answer: " Les termes du concours ne permettent généralement pas un échange contre de l'argent. Vérifiez les règlements spécifiques sur notre site web."
    },
    {
      question: " Que se passe-t-il si les 3000 unités ne sont pas vendues ?",
      answer: "Si le nombre requis de ventes n'est pas atteint avant la date limite, le concours pourrait être prolongé, modifié ou annulé. Consultez nos termes et conditions pour plus de détail"
    },
    {
      question: "Les frais d'assurance et d'immatriculation de la voiture sont-ils inclus ?",
      answer: "Tous les frais supplémentaires, y compris l'assurance et l'immatriculation, dépendront des règles spécifiques du concours. Veuillez consulter les détails sur notre site."
    },

  ];

  return (
    <div>
      <h2 className="uppercase text-center">Foire aux questions</h2>
      <h4 className="text-center">
        Ne demandez pas votre chemin, trouvez vos réponses ici.
      </h4>
      <div id='accordion' className='pt-52'>
      <Accordion type="single" collapsible>
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
      </Accordion>
      </div>
      
    </div>
  );
}

export default FAQ;
