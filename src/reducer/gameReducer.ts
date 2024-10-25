import { CardProps } from "../components/Card";
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
  maxTurn: number;
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
  turn: 1,
  maxTurn: 3,
};

export type Action = {
  type: string;
  payload?: any;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START_GAME":
      const newDeck = createDeck();
      const { updatedDeck: deckAfterPlayer, pickedCards: playerCards } =
        pickCard(newDeck, 4);
      const updatedPlayerCards = playerCards.map((card) => ({
        ...card,
        isLocked: false,
      }));
      const { updatedDeck: deckAfterComputer, pickedCards: computerCards } =
        pickCard(deckAfterPlayer, 4);
      return {
        deck: deckAfterComputer,
        playerHand: updatedPlayerCards,
        computerHand: computerCards,
        status: Status.RUNNING,
        playerAnnonce: "",
        playerHighestCard: "",
        computerAnnonce: "",
        ComputerHighestCard: "",
        turn: 1,
        maxTurn: 3,
      };
    case "TOGGLE_LOCK":
      return {
        ...state,
        playerHand: state.playerHand.map((card, index) =>
          index === action.payload.index
            ? { ...card, isLocked: !card.isLocked }
            : card
        ),
      };
    case "PLAYER_DRAW":
      let currentDeck = [...state.deck];
      const updatedPlayerHand = state.playerHand.map((card) => {
        if (!card.isLocked) {
          const { updatedDeck, pickedCards } = pickCard(state.deck, 1);
          currentDeck = updatedDeck;
          return { ...pickedCards[0], isLocked: false };
        }
        return card;
      });

      return {
        ...state,
        deck: currentDeck,
        playerHand: updatedPlayerHand,
        turn: state.turn + 1,
      };
    case "CHECK_WINNER":
      const playerDict = createHandDict(state.playerHand);
      const computerDict = createHandDict(state.computerHand);

      const playerResult = checkHand(playerDict);
      const computerResult = checkHand(computerDict);

      const winner_status = checkWinnerLogic(playerResult, computerResult);
      return {
        ...state,
        status: winner_status,
        playerAnnonce: playerResult.annonce ? playerResult.annonce : "",
        playerHighestCard: playerResult.card
          ? playerResult.card[playerResult.card.length - 1]
          : "",
        computerAnnonce: computerResult.annonce ? computerResult.annonce : "",
        ComputerHighestCard: computerResult.card
          ? computerResult.card[computerResult.card.length - 1]
          : "",
      };
    default:
      throw Error("Unexpected action");
  }
};
