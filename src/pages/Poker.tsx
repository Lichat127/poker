import { FC, useEffect, useReducer, useState } from "react";
import Card, { displayValue } from "../components/Card";
import { Button } from "../components/Button";
import { INITIAL_STATE, reducer, Status } from "../reducer/gameReducer";

const Poker: FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [winnerText, setWinnerText] = useState("");

  useEffect(() => {
    if (state.status === Status.RUNNING) {
      setVisibleCards([]);
      setCardsRevealed(false);

      let currentIndex = -1;
      const interval = setInterval(() => {
        if (currentIndex < state.computerHand.length) {
          setVisibleCards((prev) => [...prev, currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setCardsRevealed(true);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [state.status, state.computerHand.length]);

  useEffect(() => {
    if (cardsRevealed) {
      dispatch({ type: "CHECK_WINNER" });
    }
  }, [cardsRevealed]);

  useEffect(() => {
    switch (state.status) {
      case Status.PLAYER_WIN:
        setWinnerText("Vous avez gagné !");
        break;
      case Status.COMPUTER_WIN:
        setWinnerText("Vous avez perdu...");
        break;
      case Status.TIE:
        setWinnerText("Egalité !");
        break;
      default:
        setWinnerText("");
    }
  }, [state.status]);

  const renderGameContent = () => {
    console.log(winnerText);
    if (state.status === Status.INIT) {
      return (
        <Button onClick={() => dispatch({ type: "START_GAME" })}>
          LANCER UNE PARTIE
        </Button>
      );
    } else if (state.status === Status.RUNNING) {
      return <div></div>;
    } else {
      return (
        <div className="text-center">
          <h2 className="text-2xl mb-4 font-bold">{winnerText}</h2>
          <Button onClick={() => dispatch({ type: "START_GAME" })}>
            REJOUER
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <div className="flex-1 flex flex-col items-center p-4">
        {state.status !== "INIT" && (
          <>
            <h2 className="text-xl mb-2">Main de l'Ordinateur</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {state.computerHand.map((card, index) => (
                <Card
                  key={index}
                  family={card.family}
                  value={card.value}
                  show={visibleCards.includes(index)}
                />
              ))}
            </div>
            {state.status !== "RUNNING" && (
              <div className="flex justify-between w-full mt-4">
                <p className="text-l mb-2">Annonce : {state.computerAnnonce}</p>
                <p className="text-l mb-2">
                  Carte la plus haute :{" "}
                  {displayValue(state.ComputerHighestCard)}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col justify-center items-center p-4">
        {renderGameContent()}
      </div>

      <div className="flex-1 flex flex-col items-center p-4">
        {state.status !== "INIT" && (
          <>
            <h2 className="text-xl mb-2">Main du Joueur</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {state.playerHand.map((card, index) => (
                <Card
                  key={index}
                  family={card.family}
                  value={card.value}
                  show={visibleCards.includes(index)}
                />
              ))}
            </div>
            {state.status !== "RUNNING" && (
              <div className="flex justify-between w-full mt-4">
                <p className="text-l mb-2">Annonce : {state.playerAnnonce}</p>
                <p className="text-l mb-2">
                  Carte la plus haute : {displayValue(state.playerHighestCard)}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Poker;
