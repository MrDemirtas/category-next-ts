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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const price = formData.get("price");
    const category = formData.get("category");
    const newProduct = {
      name,
      price,
      category,
    };
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => setProducts({ products: [data, ...products.products], categories: products.categories }));
  };

  return (
    <main>
      <h1>Ürünler</h1>
      <div className="add-product-contents">
        <form onSubmit={handleSubmit}>
          <label>
            Ürün Adı:
            <input type="text" placeholder="Ürün adı" name="name" />
          </label>
          <label>
            Fiyat:
            <input type="number" placeholder="Fiyat" name="price" />
          </label>
          <label>
            Kategori:
            <input type="text" placeholder="Kategori" name="category" />
          </label>
          <button type="submit">Ürün Ekle</button>
        </form>
      </div>
      <div>
        {products.products.map((product: Product) => (
          <Card key={product.id} product={product} setProducts={setProducts} />
        ))}
      </div>
    </main>
  );
}

const Card = ({ product, setProducts }: { product: Product; setProducts: any }) => {
  const handleDelete = () => {
    fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: product.id }),
    })
      .then((response) => response.json())
      .then((data) =>
        setProducts((prev: ResponseData) => ({
          ...prev,
          products: prev.products.filter((p: Product) => p.id !== product.id),
        }))
      );
  };

  return (
    <div key={product.id} className="card">
      <h2>{product.name}</h2>
      <p>{product.price} TL</p>
      <p>{product.category}</p>
      <button onClick={handleDelete}>Sil</button>
    </div>
  );
};
