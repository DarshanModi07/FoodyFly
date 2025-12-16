import { Contact } from "../src/components/Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Should Load Contact page", () => {
  render(<Contact />);

  const heading = screen.getByRole("heading", {
    name: /contact foodyfly/i,
  });

  expect(heading).toBeInTheDocument();
});

test("Should Load ", () => {
  render(<Contact />);

  const Email = screen.getByText("Email:");

  expect(Email).toBeInTheDocument();
});
