import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import React from "react";

const data = [
  { id: 0, available: true, value: 0 },
  { id: 1, available: true, value: 100 },
  { id: 2, available: true, value: 25000 },
];

describe("Home", () => {
  it("The home page renders", () => {
    render(<Home data={data} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();

    const grid = screen.getByTestId("grid");
    expect(grid).toBeInTheDocument();

    const gridItems = screen.getAllByTestId("grid-item");
    expect(gridItems).toHaveLength(3);
  });
});
