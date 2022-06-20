Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class IntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { q: "test" },
      asPath: "",
      push: jest.fn(),
    };
  },
}));

import * as mediaQueryHooks from "@chakra-ui/media-query";
jest.spyOn(mediaQueryHooks, "useBreakpointValue").mockImplementation(() => 2);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

const arrayFn = jest.fn(() => Promise.resolve([]));
const objectFn = jest.fn(() => Promise.resolve({}));

const dbActions = {
  findMany: arrayFn,
  findUnique: objectFn,
  create: objectFn,
  update: objectFn,
  delete: objectFn,
  deleteMany: arrayFn,
};

jest.mock("./src/utils/prisma", () => ({
  __esModule: true,
  default: {
    account: dbActions,
    session: dbActions,
    user: dbActions,
    verificationToken: dbActions,
    video: dbActions,
    exampleVideo: dbActions,
    youtubeVideo: dbActions,
    youtubeChannel: dbActions,
    request: dbActions,
    file: dbActions,
    sub: dbActions,
    subHistory: dbActions,
    review: dbActions,
    rating: dbActions,
    order: dbActions,
    subscription: dbActions,
    coupon: dbActions,
    requestPoint: dbActions,
    settle: dbActions,
    settlePoint: dbActions,
    withdraw: dbActions,
  },
}));
