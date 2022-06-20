import { render } from "@testing-library/react";
import Links from "../components/header/links";
import Search from "../components/header/search";
import RequestPanel from "../components/user/requestPanel";

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
