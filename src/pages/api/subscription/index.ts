import { Role, Subscription } from "@prisma/client";
import axios from "axios";
import { handleRoute, RouteParams } from "../../../utils/types";

async function createSubscription({
  req,
  res,
  prisma,
  session,
}: RouteParams<Subscription>) {
  axios
    .post(
      "https://api.tosspayments.com/v1/billing/authorizations/qQEpek-c00EGU9Lt1Anvk",
      { customerKey: session?.user.id },
      {
        headers: {
          Authorization:
            "Basic dGVzdF9za19ZWjFhT3dYN0s4bUVlTE0yamRBOHlReHp2TlBHOg==",
        },
      }
    )
    .then((res) => {
      const {} = res.data;
    });
}

export default handleRoute({ POST: createSubscription }, { role: Role.User });
