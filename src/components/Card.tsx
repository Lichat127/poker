type Family = "hearts" | "diamonds" | "clubs" | "spades";
export type Value = "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14";

export type CardProps = {
  family: Family;
  value: Value;
  show?: boolean;
  style?: string;
  player?: boolean;
  isLocked?: boolean;
  onToggleLock?: () => void;
};

const familySymbols: Record<Family, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

export const displayValue = (value: string, family?: Family): string => {
  switch (value) {
    case "11":
      return family ? "J" : "Valet";
    case "12":
      return family ? "Q" : "Reine";
    case "13":
      return family ? "K" : "Roi";
    case "14":
      return family ? familySymbols[family] : "As";
    default:
      return value;
  }
};

const Card: React.FC<CardProps> = ({
  family,
  value,
  show = false,
  style = "",
  player = false,
  isLocked = false,
  onToggleLock,
}) => {
  let cardColor = "";

  if (family === "hearts" || family === "diamonds") {
    cardColor = "text-red-custom";
  } else {
    cardColor = "text-black-custom";
  }

  if (!show) {
    return (
      <div
        className={`w-32 h-48 rounded-lg border-2 border-white flex items-center justify-center bg-red-custom ${style}`}
      >
        <p className="text-white text-xl font-bold text-center">
          Casino No Jose
        </p>
      </div>
    );
  }

  return (
    <div
      className={`w-32 h-48 rounded-lg shadow-lg flex flex-col justify-between p-3 bg-white ${cardColor} ${style} transition-all duration-500`}
    >
      <div className="flex justify-between">
        <div className="text-4xl">{familySymbols[family]}</div>
        {player && (
          <div className="self-start" onClick={onToggleLock}>
            {isLocked ? (
              <span role="img" aria-label="cadenas fermé">
                🔒
              </span>
            ) : (
              <span role="img" aria-label="cadenas ouvert">
                🔓
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-6xl font-righteous">
          {displayValue(value, family)}
        </div>
      </div>
      <div className="text-4xl self-end transform rotate-180">
        {familySymbols[family]}
      </div>
    </div>
  );
};

export default Card;
