import { CardProps } from "../components/Card";
import { Status } from "../reducer/gameReducer";

type Annonce = "carre" | "brelan" | "double paire" | "paire" | "carte max";
type Result = { annonce: Annonce; card: string[] };

export const createHandDict = (hand: CardProps[]) => {
  const dict: { [key: string]: number } = {};
  hand.forEach((card) => {
    dict[card.value] = (dict[card.value] || 0) + 1;
  });
  return dict;
};

export const checkHand = (hand: { [key: string]: number }): Result => {
  let result: { annonce: Annonce; card: string[] } = {
    annonce: "carte max",
    card: [],
  };
  let pairCount = 0;
  let highestCard = "0";

  Object.entries(hand).forEach(([key, value]) => {
    if (parseInt(key) > parseInt(highestCard)) {
      highestCard = key;
    }

    switch (value) {
      case 4:
        result = { annonce: "carre", card: [key] };
        break;
      case 3:
        result = { annonce: "brelan", card: [key] };
        break;
      case 2:
        pairCount++;
        if (pairCount === 2) {
          result = {
            annonce: "double paire",
            card: [...result.card, key],
          };
        } else {
          result = { annonce: "paire", card: [key] };
        }
        break;
    }
  });

  if (result.annonce === "carte max") {
    result.card = [highestCard];
  }

  return result;
};

export const checkWinnerLogic = (
  playerResult: Result,
  computerResult: Result
): Status => {
  const annonce = ["carre", "brelan", "double paire", "paire", "carte max"];
  const playerRank = annonce.indexOf(playerResult.annonce);
  const computerRank = annonce.indexOf(computerResult.annonce);

  if (playerRank < computerRank) {
    return Status.PLAYER_WIN;
  } else if (computerRank < playerRank) {
    return Status.COMPUTER_WIN;
  } else {
    if (playerResult.annonce !== "double paire") {
      if (parseInt(playerResult.card[0]) > parseInt(computerResult.card[0])) {
        return Status.PLAYER_WIN;
      } else if (
        parseInt(playerResult.card[0]) < parseInt(computerResult.card[0])
      ) {
        return Status.COMPUTER_WIN;
      } else {
        return Status.TIE;
      }
    } else {
      if (parseInt(playerResult.card[1]) > parseInt(computerResult.card[1])) {
        return Status.PLAYER_WIN;
      } else if (
        parseInt(playerResult.card[1]) < parseInt(computerResult.card[1])
      ) {
        return Status.COMPUTER_WIN;
      } else {
        if (parseInt(playerResult.card[0]) > parseInt(computerResult.card[0])) {
          return Status.PLAYER_WIN;
        } else if (
          parseInt(playerResult.card[0]) < parseInt(computerResult.card[0])
        ) {
          return Status.COMPUTER_WIN;
        } else {
          return Status.TIE;
        }
      }
    }
  }
};
