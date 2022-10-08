import { sql } from './connect';

export type Product = {
  id: number;
  title: string;
  price: string;
};

export async function getProducts() {
  const products = await sql<Product[]>`
    SELECT * FROM products;
`;
  return products;
}

export async function getProductById(productId: number) {
  const [product] = await sql<Product[]>`
    SELECT * FROM products WHERE id = ${productId}
  `;

  return product;
}
