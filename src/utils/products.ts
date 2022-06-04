type Product = {
  title: string;
  point: number;
  price: number;
};

export const Products: Product[] = [
  {
    title: "Starter pack",
    point: 80,
    price: 1200,
  },
  {
    title: "Small pack",
    point: 500,
    price: 5900,
  },
  {
    title: "Normal pack",
    point: 1200,
    price: 12000,
  },
  {
    title: "Large pack",
    point: 2500,
    price: 25000,
  },
  {
    title: "Point bucket",
    point: 6500,
    price: 65000,
  },
];

export function getPointFromAmount(amount: number): number {
  for (const product of Products) {
    if (product.price === amount) {
      return product.point;
    }
  }
  return 0;
}
