import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-green-custom min-h-screen flex flex-col justify-center items-center font-righteous text-white relative">
      <header className="absolute top-0 w-full py-4 flex justify-center bg-green-custom">
        <nav className="flex space-x-6 text-lg">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>
          <Link to="/poker" className="hover:underline">
            Poker
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default NavBar;
