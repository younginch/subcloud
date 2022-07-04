import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react";
import { Role } from "@prisma/client";
import { render } from "@testing-library/react";
import type { NextApiRequest, NextApiResponse } from "next";
import * as NextAuth from "next-auth/react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { createMocks, RequestMethod } from "node-mocks-http";
import { ReactElement } from "react";

export const renderWithTheme = (ui: ReactElement) => {
  const Wrapper = ({ children }: ChakraProviderProps) => (
    <ChakraProvider>{children}</ChakraProvider>
  );

  return render(ui, { wrapper: Wrapper });
};

export const renderWithSession = (ui: ReactElement) => {
  const Wrapper = ({ children }: SessionProviderProps) => (
    <SessionProvider>{children}</SessionProvider>
  );

  return render(ui, { wrapper: Wrapper });
};

export const renderWithThemeAndSession = (ui: ReactElement) => {
  const Wrapper = ({
    children,
  }: SessionProviderProps & ChakraProviderProps) => (
    <ChakraProvider>
      <SessionProvider>{children}</SessionProvider>
    </ChakraProvider>
  );

  return render(ui, { wrapper: Wrapper });
};

export function mockRequestResponse(method: RequestMethod) {
  const { req, res } = createMocks({ method });
  return {
    req: req as unknown as NextApiRequest,
    res: res as unknown as NextApiResponse,
  };
}

export function testRes(
  route: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  method: RequestMethod,
  statusCode: number,
  additionalSetup?: (req: NextApiRequest) => void
) {
  return async () => {
    const { req, res } = mockRequestResponse(method);
    if (additionalSetup) additionalSetup(req);
    await route(req, res);
    expect(res.statusCode).toBe(statusCode);
  };
}

type RouteInfo = [
  route: (req: NextApiRequest, res: NextApiResponse<unknown>) => Promise<void>,
  methods: RequestMethod[]
];

export function testAllMethod(
  routeArray: RouteInfo[],
  statusCode: number,
  role?: Role
) {
  return async () => {
    if (role) {
      jest.spyOn(NextAuth, "getSession").mockResolvedValue({
        user: { id: "", role, point: 0 },
        expires: "",
      });
    }
    routeArray.forEach(([route, methods]) => {
      methods.forEach(async (method) => {
        const { req, res } = mockRequestResponse(method);
        await route(req, res);
        expect(res.statusCode).toBe(statusCode);
      });
    });
  };
}
