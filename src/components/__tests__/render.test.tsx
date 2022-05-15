import { render } from "@testing-library/react";
import Links from "../header/links";
import Search from "../header/search";
import RequestPanel from "../user/requestPanel";

describe("Components", () => {
  it("renders a Footer", () => {
    render(<Links />);
  });

  it("renders a Search", () => {
    render(<Search />);
  });

  it("renders a RequestPanel", () => {
    render(<RequestPanel requests={[]} />);
  });
});
