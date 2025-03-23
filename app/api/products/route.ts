export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface ResponseData {
  products: Product[];
  categories: string[];
}

let products: ResponseData = {
  products: [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: 42999,
      category: "elektronik",
    },
    {
      id: 2,
      name: "Samsung Akıllı TV",
      price: 24999,
      category: "elektronik",
    },
    {
      id: 3,
      name: "Erkek Gömlek",
      price: 899,
      category: "giyim",
    },
    {
      id: 4,
      name: "Kadın Elbise",
      price: 1199,
      category: "giyim",
    },
    {
      id: 5,
      name: "Kahve Makinesi",
      price: 3499,
      category: "ev",
    },
    {
      id: 6,
      name: "Koşu Ayakkabısı",
      price: 1499,
      category: "spor",
    },
    {
      id: 7,
      name: "Laptop",
      price: 18999,
      category: "elektronik",
    },
    {
      id: 8,
      name: "Buzdolabı",
      price: 15499,
      category: "ev",
    },
    {
      id: 9,
      name: "Spor Şortu",
      price: 399,
      category: "spor",
    },
    {
      id: 10,
      name: "Çalışma Masası",
      price: 2899,
      category: "mobilya",
    },
    {
      id: 11,
      name: "Tablet",
      price: 8999,
      category: "elektronik",
    },
    {
      id: 12,
      name: "Koltuk Takımı",
      price: 22999,
      category: "mobilya",
    },
    {
      id: 13,
      name: "Kadın Çanta",
      price: 1299,
      category: "aksesuar",
    },
    {
      id: 14,
      name: "Erkek Ceket",
      price: 2499,
      category: "giyim",
    },
    {
      id: 15,
      name: "Akıllı Saat",
      price: 4999,
      category: "elektronik",
    },
  ],
  categories: ["elektronik", "giyim", "ev", "spor", "mobilya", "aksesuar"],
};

export async function GET(request: Request) {
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, category } = body;

  if (!name || !price || !category) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const newProduct: Product = {
    id: products.products.length + 1,
    name,
    price,
    category,
  };
  products.products = [newProduct, ...products.products];
  products.categories = Array.from(new Set(products.products.map((product) => product.category)));
  return new Response(JSON.stringify(newProduct), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, name, price, category } = body;

  if (!id || !name || !price || !category) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const productIndex = products.products.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  products.products[productIndex] = { id, name, price, category };
  products.categories = Array.from(new Set(products.products.map((product) => product.category)));
  return new Response(JSON.stringify(products.products[productIndex]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const productIndex = products.products.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  products.products = products.products.filter((product) => product.id !== id);
  products.categories = Array.from(new Set(products.products.map((product) => product.category)));
  return new Response(JSON.stringify({ message: "Product deleted successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
