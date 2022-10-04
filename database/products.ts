import { sql } from './connect';

export type Product = {
  id: number;
  title: string;
  price: string;
};

// Get all animals
export async function getProducts() {
  const products = await sql<Product[]>`
    SELECT * FROM products;
`;
  return products;
}

// Get a single animal by id
export async function getProductById(productId: number) {
  const [product] = await sql<Product[]>`
    SELECT * FROM products WHERE id = ${productId}
  `;

  return product;
}
