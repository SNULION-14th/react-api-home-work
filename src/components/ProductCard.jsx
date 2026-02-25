import React, { useState } from "react";

function ProductCard({ product, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit({ ...editedProduct, price: parseFloat(editedProduct.price) });
    setIsEditing(false);
  };

  return (
    <div className="border rounded p-4 shadow">
      {isEditing ? (
        <>
          <input
            className="border p-1 w-full mb-2"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
          />
          <input
            className="border p-1 w-full mb-2"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
          />
          <textarea
            className="border p-1 w-full mb-2"
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
          />
          <button className="text-blue-500 mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="text-gray-500" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <img
            src={product.image}
            alt={product.title}
            className="h-40 object-contain mb-2"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600">${product.price}</p>
          <p className="text-sm mt-2">{product.description}</p>
          <div className="mt-2 flex gap-2">
            <button
              className="text-blue-500"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductCard;
