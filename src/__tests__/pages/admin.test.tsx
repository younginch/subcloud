import AdminExample from "../../pages/admin/example";
import Admin from "../../pages/admin";
import AdminSettle from "../../pages/admin/settle";
import AdminUser from "../../pages/admin/user";
import AdminWithdraw from "../../pages/admin/withdraw";
import { render } from "@testing-library/react";

describe("Pages (admin)", () => {
  it("renders AdminExample", () => {
    render(<AdminExample />);
  });

  it("renders Admin", () => {
    render(<Admin />);
  });

  it("renders AdminSettle", () => {
    render(<AdminSettle />);
  });

  it("renders AdminUser", () => {
    render(<AdminUser />);
  });

  it("renders AdminWithdraw", () => {
    render(<AdminWithdraw />);
  });
});
