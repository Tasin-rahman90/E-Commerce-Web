import React from "react";
import Container from "../Components/Container";
import BreadCrump from "../Components/BreadCrump";
import CartItem from "../Components/CartItem";
import { useSelector } from 'react-redux'
const Cart = () => {

  const data = useSelector(state => state.products.cart)

  return (
    <>
      <div className="pt-20 pb-35">
        <Container>
          <BreadCrump />

          <div className="pt-20">

            <div className="grid grid-cols-4 items-center py-6 px-10 rounded-sm shadow-sm">
              <h4>Product</h4>
              <h4>Price</h4>
              <h4>Quantity</h4>
              <h4>Subtotal</h4>
            </div>
            {
              data.map((item) => {
                return <CartItem
                  imgScr={item.thumbnail}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  subTotal={item.price}
                />
              })
            }
          </div>
        </Container>
      </div>
    </>
  );
};

export default Cart;