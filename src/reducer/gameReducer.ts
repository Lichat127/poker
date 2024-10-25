import { CardProps } from "../components/Card";
import { createDeck } from "../utils/createDeck";
import { pickCard } from "../utils/pickCard";

export enum Status {
  INIT = "INIT",
  RUNNING = "RUNNING",
  PLAYER_WIN = "PLAYER_WIN",
  COMPUTER_WIN = "COMPUTER_WIN",
  TIE = "TIE",
}

type State = {
  deck: CardProps[];
  playerHand: CardProps[];
  computerHand: CardProps[];
  status: Status;
};

export const INITIAL_STATE: State = {
  deck: [],
  playerHand: [],
  computerHand: [],
  status: Status.INIT,
};

export type Action = {
  type: string;
  payload?: string;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START_GAME":
      const newDeck = createDeck();
      const { updatedDeck: deckAfterPlayer, pickedCards: playerCards } =
        pickCard(newDeck, 4);
      const { updatedDeck: deckAfterComputer, pickedCards: computerCards } =
        pickCard(deckAfterPlayer, 4);

      return {
        ...state,
        deck: deckAfterComputer,
        playerHand: playerCards,
        computerHand: computerCards,
        status: Status.RUNNING,
      };
    default:
      throw Error("Unexpected action");
  }
};
