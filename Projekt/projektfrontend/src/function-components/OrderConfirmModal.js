import React from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const OrderConfirmModal = ({setSeverityMessage, openAlert, setSeverity, userData, handleCounter, setCart, cart}) => {
    
    return (
        <div className="modal fade" id="orderConfirmModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="1" aria-labelledby="orderConfirmModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="orderConfirmModalLabel">Rendelés megerősítése</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Biztosan leadod a rendelést?
                        <br />
                        <span className="text-danger fw-bold">A rendelés csak az elfogadásig törölhető!</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
                        <button onClick={async () => {

                            await axios.post('https://localhost:7165/webshop/addOrder', {
                              userId: jwtDecode(userData).userId
                            }, {
                              headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${userData}`
                              }
                            }).then((res) => {
                              cart.map(async (item) => {
                                await axios.post('https://localhost:7165/webshop/orderProduct', {
                                  orderId: res.data.orderId,
                                  productId: item.pr.productId,
                                  quantity: item.quantity
                                }, {
                                  headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${userData}`
                                  }
                                })
                              })
                              cart.splice(0, cart.length);
                              localStorage.setItem(`mycart-${jwtDecode(userData).userId}`, JSON.stringify(cart));
                              setCart(JSON.parse(localStorage.getItem(`mycart-${jwtDecode(userData).userId}`)) || []); 
                            })
                        }}  type="button" data-bs-dismiss="modal" className="btn btn-primary">Rendelés</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmModal