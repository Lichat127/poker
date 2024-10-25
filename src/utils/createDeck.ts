import { CardProps } from "../components/Card";

export const createDeck = (): CardProps[] => {
  const families: Array<CardProps["family"]> = [
    "hearts",
    "diamonds",
    "clubs",
    "spades",
  ];
  const values: Array<CardProps["value"]> = [
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
  ];

  const deck: CardProps[] = [];

  for (const family of families) {
    for (const value of values) {
      deck.push({ value, family });
    }
  }

  return deck;
};
