import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { getAllCatagories } from "../../services/catagoriesService";
import { createProduct } from "../../services/productsService";
import { ProfileImage } from "../../components";
import { toast } from "react-toastify";

export const AddProductScreen = (props) => {
  const [catagories, setCatagories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    product_catagory_id: "",
    image: "",
  });

  useEffect(() => {
    async function fetch() {
      const response = await getAllCatagories();
      setCatagories(response.data);
    }
    fetch();
  }, []);

  const handleImageChange = (image) => {
    const p = { ...product };
    p.image = image;
    setProduct(p);
  };
  // const imageChangeHandle = (e) => {
  //   const files = e.target.files;
  //   const imgs = [],
  //     previews = [];
  //   for (let i = 0; i < files.length; i++) {
  //     imgs.push(files[i]);
  //     previews.push(URL.createObjectURL(files[i]));
  //   }
  //   const p = { ...product };
  //   p.images = imgs;
  //   setProduct(p);
  //   setPreviews(previews);
  // };

  const handleProductUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(product).forEach((key) => data.append(key, product[key]));

    try {
      const response = await createProduct(data);
      if (response.status === 201) {
        toast.dark("Product created successfully.");
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  const handleFieldChange = ({ currentTarget: input }) => {
    const p = { ...product };
    p[input.name] = input.value;
    setProduct(p);
  };

  return (
    <div>
      <Row>
        <Col className="mt-5">
          <h3>Product Info</h3>
          <Form
            id="productForm"
            className="mt-3"
            onSubmit={handleProductUpload}
          >
            <Form.Group className="mb-4" controlId="name">
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={handleFieldChange}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="price">
              <Form.Control
                type="numberic"
                placeholder="Product Price"
                value={product.price}
                name="price"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="quantity">
              <Form.Control
                type="numberic"
                placeholder="Product Quantity"
                value={product.quantity}
                name="quantity"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Control
              as="select"
              custom
              name="product_catagory_id"
              value={product.product_catagory_id}
              onChange={handleFieldChange}
            >
              {catagories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
            <Button className="mt-4" variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Col>
        <ProfileImage
          imgSrc={product.image}
          onImageChange={handleImageChange}
        />
      </Row>
    </div>
  );
};
