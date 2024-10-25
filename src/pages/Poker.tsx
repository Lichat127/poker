import { FC, useReducer } from "react";
import Card from "../components/Card";
import { Button } from "../components/Button";
import { INITIAL_STATE, reducer } from "../reducer/gameReducer";

const Poker: FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <div className="flex-1 flex flex-col items-center p-4">
        {state.status === "RUNNING" && (
          <>
            <h2 className="text-xl mb-2">Main de l'Ordinateur</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {state.computerHand.map((card, index) => (
                <Card
                  key={index}
                  family={card.family}
                  value={card.value}
                  show={true}
                  //style="transform rotate-180"
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center p-4">
        <Button onClick={() => dispatch({ type: "START_GAME" })}>
          LANCER UNE PARTIE
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center p-4">
        {state.status === "RUNNING" && (
          <>
            <h2 className="text-xl mb-2">Main du Joueur</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {state.playerHand.map((card, index) => (
                <Card
                  key={index}
                  family={card.family}
                  value={card.value}
                  show={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Poker;
