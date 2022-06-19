import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import type { NextApiRequest, NextApiResponse } from "next";
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
