import { render } from "@testing-library/react";
import AdminExample from "../../pages/admin/example";
import Admin from "../../pages/admin";
import AdminSettle from "../../pages/admin/settle";
import AdminUser from "../../pages/admin/user";
import AdminWithdraw from "../../pages/admin/withdraw";
import AdminNotice from "../../pages/admin/notice";

describe("Pages (admin)", () => {
  it("renders AdminExample", () => {
    render(<AdminExample />);
  });

  it("renders Admin", () => {
    render(<Admin />);
  });

  it("renders AdminNotice", () => {
    render(<AdminNotice />);
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
