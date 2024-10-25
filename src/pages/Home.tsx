import { Link } from "react-router-dom";
import leftImage from "../img/card_and_poker.png";
import rightImage from "../img/cards.png";

const Home = () => {
  return (
    <div>
      <main className="text-center ">
        <h1 className="text-4xl md:text-6xl">Bienvenue au</h1>
        <h1 className="text-5xl md:text-7xl mt-2">CASINO</h1>
        <h1 className="text-2xl md:text-5xl mt-2">de Lisa</h1>
        <div className="mt-10">
          <Link
            to="/poker"
            className="px-6 py-3  bg-red-custom hover:bg-red-custom-dark transition-colors text-xl rounded-md"
          >
            Jouer
          </Link>
        </div>
      </main>
      <div className=" absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={leftImage}
          alt="Left graphic"
          className="w-80 md:w-96 lg:w-[32rem] absolute bottom-0 left-0"
        />
        <img
          src={rightImage}
          alt="Right graphic"
          className="w-80 md:w-96 lg:w-[32rem] absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};

export default Home;
