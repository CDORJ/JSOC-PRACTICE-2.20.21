import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { fetchColors as mockFetchColors } from "../helpers/fetchColors";
import { res } from "../helpers/res";
import ColorList from "./ColorList";
import Bubbles from "./Bubbles";

jest.mock("../helpers/fetchColors");

test("Renders BubblePage without errors", () => {
  // Finish this test
  render(<BubblePage />);
});

test("Fetches data and renders the bubbles on mounting", async () => {
  // Finish this test
  mockFetchColors.mockResolvedValueOnce(res);
  render(<BubblePage />);
  // console.log("BubblePage RENDERED", <BubblePage props={res}/>)

  await waitFor(() => {
    // expect(screen.findByText(/aliceblue/i)).toBeInTheDocument();
    expect(screen.findAllByTestId(/bubble/i)).toBeInTheDocument();
  });
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading

