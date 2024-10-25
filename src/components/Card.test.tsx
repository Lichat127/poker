import { render, screen, fireEvent } from "@testing-library/react";
import Card, { displayValue } from "./Card";

describe("Card Component", () => {
  it("displays the correct value for different inputs", () => {
    expect(displayValue("11", "hearts")).toBe("J");
    expect(displayValue("12", "hearts")).toBe("Q");
    expect(displayValue("13", "hearts")).toBe("K");
    expect(displayValue("14", "hearts")).toBe("♥");
    expect(displayValue("10", "hearts")).toBe("10");
  });

  it("renders the placeholder when not shown", () => {
    render(<Card family="hearts" value="11" show={false} />);

    expect(screen.getByText("Casino No Jose")).toBeInTheDocument();
  });

  it("toggles lock state correctly", () => {
    const onToggleLock = jest.fn();
    render(
      <Card
        family="hearts"
        value="10"
        show={true}
        player={true}
        isLocked={false}
        onToggleLock={onToggleLock}
      />
    );

    const lockButton = screen.getByLabelText(/cadenas ouvert/i);
    fireEvent.click(lockButton);

    expect(onToggleLock).toHaveBeenCalledTimes(1);
  });
});
