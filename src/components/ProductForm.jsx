import React, { useState } from "react";

function ProductForm({ onAdd }) {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;
    onAdd({
      ...newProduct,
      price: parseFloat(newProduct.price),
      rating: { rate: 0, count: 0 },
    });
    setNewProduct({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        name="title"
        value={newProduct.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-1 w-full"
      />
      <input
        name="price"
        value={newProduct.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-1 w-full"
        type="number"
      />
      <input
        name="description"
        value={newProduct.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-1 w-full"
      />
      <input
        name="image"
        value={newProduct.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-1 w-full"
      />
      <input
        name="category"
        value={newProduct.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-1 w-full"
      />
      <button type="submit" className="bg-[#dee2e6] px-4 py-1 rounded">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
