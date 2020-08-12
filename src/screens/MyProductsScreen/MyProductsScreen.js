import React, { useEffect, useState } from "react";
import { getUserProducts } from "../../services/productsService";
import { Table, Button, Modal } from "react-bootstrap";
import { deleteProduct } from "../../services/productsService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

export const MyProudcutsScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [productId, setProuductId] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await getUserProducts();
      setProducts(response.data);
    }
    fetch();
  }, []);
  const handleProductDelete = async () => {
    try {
      const response = await deleteProduct(productId);
      if (response.status === 200) {
        const p = products.filter((p) => p.id !== productId);
        setProducts(p);
        setShow(false);
        toast.dark(response.data.message);
      }
    } catch (e) {
      console.log(e.response);
    }
  };
  if (products.length === 0) return <p>No Proudcts</p>;
  return (
    <div>
      <h3>My Products</h3>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Catagory</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <NavLink to={`/products/${product.id}`}>
                <td>{product.name}</td>
              </NavLink>

              <td>{product.price}</td>
              <td>{product.catagory}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShow(true);
                    setProuductId(product.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleProductDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
