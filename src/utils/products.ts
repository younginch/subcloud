type Product = {
  title: string;
  point: number;
  price: number;
};

export const Products: Product[] = [
  {
    title: "Starter pack",
    point: 800,
    price: 1200,
  },
  {
    title: "Small pack",
    point: 5000,
    price: 6900,
  },
  {
    title: "Normal pack",
    point: 10000,
    price: 12000,
  },
  {
    title: "Large pack",
    point: 21000,
    price: 23000,
  },
  {
    title: "Point bucket",
    point: 65000,
    price: 65000,
  },
];

export function getPointFromAmount(amount: number): number {
  // eslint-disable-next-line no-restricted-syntax
  for (const product of Products) {
    if (product.price === amount) {
      return product.point;
    }
  }
  return 0;
}
