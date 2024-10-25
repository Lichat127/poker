import { CardProps } from "../components/Card";

export type CardSituation = {
  updatedDeck: CardProps[];
  pickedCards: CardProps[];
};

export const pickCard = (deck: CardProps[], nb: number): CardSituation => {
  const pickedCards: CardProps[] = [];

  for (let i = 0; i < nb; i++) {
    if (deck.length === 0) {
      break;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    pickedCards.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
  }

  return { updatedDeck: deck, pickedCards };
};
