import React from "react";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>
      <ProductList />
    </div>
  );
}

export default App;
