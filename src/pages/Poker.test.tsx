import { fireEvent, render, screen } from "@testing-library/react";
import Poker from "./Poker";

describe("Poker Component", () => {
  it("renders the initial state correctly", () => {
    render(<Poker />);
    expect(screen.getByText(/lancer une partie/i)).toBeInTheDocument();
  });

  it("starts the game and displays tour", () => {
    const { container } = render(<Poker />);
    fireEvent.click(screen.getByText(/lancer une partie/i));
    expect(container).toHaveTextContent("Tour : 1/3");
  });
});
