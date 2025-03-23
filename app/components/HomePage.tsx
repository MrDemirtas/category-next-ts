"use client";

import { Product, ResponseData } from "../api/products/route";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState<ResponseData>({
    products: [],
    categories: [],
  });

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Ürünleri yüklerken bir hata oluştu:", error);
      });
  }, []);

  return (
    <main>
      <h1>Ürünler</h1>
      <div>
        {products.products.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

const Card = ({ product }: { product: Product }) => {
  return (
    <div key={product.id} className="card">
      <h2>{product.name}</h2>
      <p>{product.price} TL</p>
      <p>{product.category}</p>
    </div>
  );
};
