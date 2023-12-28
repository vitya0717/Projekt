import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useState } from 'react'
import noimage from '../noimage.png'
import OrderConfirmModal from '../function-components/OrderConfirmModal';

const Cart = ({ setSeverityMessage, openAlert, setSeverity, userData, handleCounter, setCart, cart }) => {
  const [quantity, setQuantity] = useState({});

  const handleQuantity = (productId, quantity) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: quantity
    }));
    if (userData != null) {
      cart.map((item) => {
        if (item.pr.productId === productId) {
          item.quantity = quantity;
        }
      })
    }
  }
  if (userData != null) {
    cart.map((item) => {
      quantity[item.pr.productId] = cart.find((it) => it.pr.productId === item.pr.productId).quantity;
    })
  }
  //https://via.placeholder.com/40
  return (
    userData !== null && cart !== null ?
      <div>
        <OrderConfirmModal quantity={quantity} setQuantity={setQuantity} cart={cart} setCart={setCart} userData={userData} setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} />
        <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasScrollingLabel"><i className="bi bi-basket2-fill" /> Kosaram</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <hr />
          <div className="offcanvas-body">
            {cart.length > 0 ?
              <ol className="list-group list-group-numbered">
                {
                  cart.map((item) => (
                    <li key={item.pr.productId} className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className='row'>
                          <div className='col-2'>
                            <img style={{ marginRight: "50px", width: "40px" }} src={item.pr.productImage ? (new Image().src = `${"data:image/png;base64," + item.pr.productImage}`) : noimage} />
                          </div>
                          <div className='col-10'>
                            <a href='#' title={item.pr.productName} className="fw-bold fs-6">{item.pr.productName.substring(0, 21) + "..."}</a><br />
                            {item.pr.productPrice} Ft x <input onChange={(e) => {
                              handleQuantity(item.pr.productId, e.target.value);
                              cart.find((it) => it.pr.productId === item.pr.productId).quantity = e.target.value;
                              localStorage.setItem(`mycart-${jwtDecode(userData).userId}`, JSON.stringify(cart));
                            }} key={item.pr.productId + "quantity"} id={item.pr.productId + "quantity"} style={{ width: "40px", textAlign: "center" }} max={10} type='number' min={1} value={quantity[item.pr.productId] || 1} /> db
                          </div>
                        </div>
                      </div>
                      <div>
                        <button onClick={async () => {
                          cart.splice(cart.indexOf(item), 1);
                          localStorage.setItem(`mycart-${jwtDecode(userData).userId}`, JSON.stringify(cart));
                          handleCounter();
                          await setCart(cart);
                        }} className="btn btn-close" />
                      </div>
                    </li>
                  ))}
                <br />
                <p className='fw-bold'>Végösszeg: {cart.reduce((acc, item) => acc + item.pr.productPrice * item.quantity, 0)} Ft</p>
                <button type='button' data-bs-toggle="modal" data-bs-target="#orderConfirmModal" className='btn btn-primary rounded-0'>Rendelés megerősítés</button>
              </ol>
              :
              <div>A kosarad üres! :C</div>
            }
          </div>
        </div>
      </div>
      :
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel"><i className="bi bi-basket2-fill" /> Kosaram</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr />
        <div className="offcanvas-body">
          <div>A kosarad üres! :C</div>
        </div>
      </div>
  );
}

export default Cart