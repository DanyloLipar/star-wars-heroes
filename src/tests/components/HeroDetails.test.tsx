global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HeroDetails from "../../components/HeroDetails";
import AppService from "../../core/services/app.service";

jest.mock("../../core/services/app.service");

describe("HeroDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display loader while fetching data", () => {
    (AppService.getHero as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={["/hero/1"]}>
        <HeroDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display hero details after fetching", async () => {
    const mockHero = {
      id: 1,
      name: "Luke Skywalker",
      gender: "male",
      birth_year: "19BBY",
      homeworld: 1,
      films: [1],
      starships: [],
    };

    const mockPlanet = { id: 1, name: "Tatooine" };
    const mockFilm = { id: 1, title: "A New Hope" };

    (AppService.getHero as jest.Mock).mockResolvedValue({ data: mockHero });
    (AppService.getPlanet as jest.Mock).mockResolvedValue({ data: mockPlanet });
    (AppService.getFilm as jest.Mock).mockResolvedValue({ data: mockFilm });

    render(
      <MemoryRouter initialEntries={["/hero/1"]}>
        <HeroDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
      expect(screen.getByText(/19bby/i)).toBeInTheDocument();
      expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
    });
  });

  test("displays 'No hero found.' when hero is null", async () => {
    (AppService.getHero as jest.Mock).mockResolvedValue({ data: null });

    render(
      <MemoryRouter initialEntries={["/heroes/1"]}>
        <Routes>
          <Route path="/heroes/:id" element={<HeroDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(AppService.getHero).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/no hero found/i)).toBeInTheDocument();
  });
});
