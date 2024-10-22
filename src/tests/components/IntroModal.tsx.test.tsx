import { render, screen, fireEvent } from "@testing-library/react";
import IntroModal from "../../components/IntroModal";

beforeEach(() => {
  sessionStorage.clear();
});

describe("IntroModal", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("renders the modal when intro is not watched", () => {
    render(<IntroModal />);

    const episodeElements = screen.getAllByText(/Episode IV/i);

    expect(episodeElements.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/A long time ago in a galaxy far, far away.../i)
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /OK/i })).toBeInTheDocument();
  });

  test("does not render the modal when intro is already watched", () => {
    sessionStorage.setItem("intro", "true");
    render(<IntroModal />);

    expect(screen.queryByText(/Episode IV/i)).not.toBeInTheDocument();
  });

  test("closes the modal and sets sessionStorage when OK button is clicked", () => {
    render(<IntroModal />);

    fireEvent.click(screen.getByRole("button", { name: /OK/i }));

    expect(screen.queryByText(/Episode IV/i)).not.toBeInTheDocument();
    expect(sessionStorage.getItem("intro")).toBe("true");
  });
});
