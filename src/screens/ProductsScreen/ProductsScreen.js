import React, { useEffect, useState } from "react";

import { Row } from "react-bootstrap";
import { ProductItem, FilterBar } from "../../components";
import {
  getAllProducts,
  getProductCatagories,
} from "../../services/productsService";

export const ProductsScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [catagories, setCatagories] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCatagoryChange = (catagoryName) => {
    if (catagoryName === "All Products") return setFilteredProducts(products);
    const p = products.filter((item) => item.catagory === catagoryName);
    setFilteredProducts(p);
  };

  const handleSearchTextChange = (text) => {
    const p = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(p);
  };
  useEffect(() => {
    async function fetch() {
      let response = await getAllProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
      response = await getProductCatagories();
      const cat = [{ id: 0, name: "All Products" }, ...response.data];
      setCatagories(cat);
    }
    fetch();
  }, []);

  return (
    <div className="mt-5 mb-5">
      <FilterBar
        onSearchTextChange={handleSearchTextChange}
        onCatagoryChange={handleCatagoryChange}
        catagories={catagories}
      />
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <Row>
          {filteredProducts.map((product, index) => (
            <ProductItem
              key={index}
              id={product.id}
              name={product.name}
              price={product.price}
              catagory={product.catagory}
              img={product.img}
            />
          ))}
        </Row>
      )}
    </div>
  );
};
