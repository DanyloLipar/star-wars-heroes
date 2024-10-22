import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import {
  fetchHeroes,
  setPage,
} from "../../core/store/reducers/app/appDataSlice";
import HeroesList from "../../components/HeroesList";

jest.mock("../../core/hooks/useRedux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../core/store/reducers/app/appDataSlice", () => ({
  fetchHeroes: jest.fn(),
  setPage: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockUseAppDispatch = useAppDispatch as jest.Mock;
const mockUseAppSelector = useAppSelector as jest.Mock;

describe("HeroesList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  test("renders heroes correctly", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [{ id: 1, name: "Luke Skywalker" }],
      page: 1,
      totalPages: 1,
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    expect(getByText("Luke Skywalker")).toBeInTheDocument();
  });

  test("dispatches fetchHeroes on mount if no heroes", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [],
      page: 1,
      totalPages: 1,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith(fetchHeroes(1));
  });

  test("shows loader when loading", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [],
      page: 1,
      totalPages: 1,
      loading: true,
      error: null,
    });

    const { getByText } = render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when there is an error", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [],
      page: 1,
      totalPages: 1,
      loading: false,
      error: "Something went wrong!",
    });

    const { getByText } = render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    expect(getByText("Error: Something went wrong!")).toBeInTheDocument();
  });

  test("navigates to previous page when Prev button is clicked", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [{ id: 1, name: "Luke Skywalker" }],
      page: 2,
      totalPages: 5,
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    const prevButton = getByText("<");
    fireEvent.click(prevButton);

    expect(mockDispatch).toHaveBeenCalledWith(setPage(1));
    expect(mockDispatch).toHaveBeenCalledWith(fetchHeroes(1));
  });

  test("navigates to next page when Next button is clicked", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [{ id: 1, name: "Luke Skywalker" }],
      page: 1,
      totalPages: 5,
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    const nextButton = getByText(">");
    fireEvent.click(nextButton);

    expect(mockDispatch).toHaveBeenCalledWith(setPage(2));
    expect(mockDispatch).toHaveBeenCalledWith(fetchHeroes(2));
  });

  test("does not navigate to previous page if on first page", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [{ id: 1, name: "Luke Skywalker" }],
      page: 1,
      totalPages: 5,
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    const prevButton = getByText("<");
    expect(prevButton).toBeDisabled();
  });

  test("does not navigate to next page if on last page", () => {
    mockUseAppSelector.mockReturnValue({
      heroes: [{ id: 1, name: "Luke Skywalker" }],
      page: 5,
      totalPages: 5,
      loading: false,
      error: null,
    });

    const { getByText } = render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    const nextButton = getByText(">");
    expect(nextButton).toBeDisabled();
  });
});
