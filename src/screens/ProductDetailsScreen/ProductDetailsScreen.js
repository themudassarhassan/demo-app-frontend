import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { ImageViewer, DisplayComments, AddComment } from "../../components";
import { getProductById } from "../../services/productsService";
import UserContext from "../../context/userContext";

export const ProductDetailsScreen = (props) => {
  const { onAddToCart } = props;
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const user = useContext(UserContext);
  const isProductBelongsToUser =
    user && product.user && user.id === product.user.id;

  const handleCommentPost = (comment) => {
    const p = { ...product };
    p.comments.push({
      user: { name: user.name, id: user.id },
      comment,
      date: Date.now(),
    });
    setProduct(p);
  };

  useEffect(() => {
    async function fetch() {
      const response = await getProductById(productId);
      setProduct(response.data);
    }
    fetch();
  }, []);

  const renderAddToCartBtn = () => {
    if (isProductBelongsToUser) return;
    return (
      <Button
        onClick={() =>
          onAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          })
        }
        className="mt-4"
        variant="success"
      >
        Add to Cart
      </Button>
    );
  };

  return (
    <>
      <Row className="mt-4">
        <ImageViewer img={product.img} />
        <Col md={6} className="d-flex flex-column justify-content-around">
          <div>
            <h2 className="text-uppercase">{product.name} </h2>
            <div className="mt-4">
              Suspendisse quos? Tempus cras iure temporibus? Eu laudantium
              cubilia sem sem! Repudiandae et! Massa senectus enim minim
              sociosqu delectus posuere
            </div>
          </div>
          <div>
            <div className="mt-4">
              <span className="text-uppercase">Current Price: </span>
              <span>Rs {product.price}</span>
            </div>
            {renderAddToCartBtn()}
          </div>
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <div style={{ fontSize: "30px" }}>Comments</div>
      </Row>
      <AddComment
        onCommentPost={handleCommentPost}
        productId={productId}
        hide={isProductBelongsToUser}
      />
      <DisplayComments comments={product.comments} />
    </>
  );
};
