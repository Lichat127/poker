import { CardProps, Value } from "../components/Card";
import {
  checkHand,
  checkWinnerLogic,
  createHandDict,
} from "../utils/checkWinner";
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
  playerAnnonce: string;
  playerHighestCard: string;
  computerAnnonce: string;
  ComputerHighestCard: string;
  turn: number;
};

export const INITIAL_STATE: State = {
  deck: [],
  playerHand: [],
  computerHand: [],
  status: Status.INIT,
  playerAnnonce: "",
  playerHighestCard: "",
  computerAnnonce: "",
  ComputerHighestCard: "",
  turn: 0,
};

export type Action = {
  type: string;
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
        deck: deckAfterComputer,
        playerHand: playerCards,
        computerHand: computerCards,
        status: Status.RUNNING,
        playerAnnonce: "",
        playerHighestCard: "",
        computerAnnonce: "",
        ComputerHighestCard: "",
        turn: 0,
      };
    case "CHECK_WINNER":
      const playerDict = createHandDict(state.playerHand);
      const computerDict = createHandDict(state.computerHand);

      const playerResult = checkHand(playerDict);
      const computerResult = checkHand(computerDict);

      console.log(playerResult);

      const winner_status = checkWinnerLogic(playerResult, computerResult);
      return {
        ...state,
        status: winner_status,
        playerAnnonce: playerResult.annonce ? playerResult.annonce : "",
        playerHighestCard: playerResult.card ? playerResult.card[0] : "",
        computerAnnonce: computerResult.annonce ? computerResult.annonce : "",
        ComputerHighestCard: computerResult.card ? computerResult.card[0] : "",
      };
    default:
      throw Error("Unexpected action");
  }
};
