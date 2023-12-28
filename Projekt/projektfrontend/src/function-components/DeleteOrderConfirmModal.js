import React from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';


const DeleteOrderConfirmModal = ({ handleCounter, orderId, userData, orders, setSeverityMessage, openAlert, setSeverity }) => {
    return (
        <div className="modal fade" id={"orderDeleteModal"+orderId} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="orderDeleteModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="orderDeleteModalLabel">Rendelés visszavonása</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-danger fw-bold">
                        A törlés végleges és nem visszavonható!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
                        <button onClick={async () => {
                            await axios.delete(`https://localhost:7165/webshop/deleteOrder?order=${orderId}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${userData}`
                                }
                            }).then((res) => {
                                console.log(res)
                                if (res.status != 200) {
                                    setSeverity("error");
                                    setSeverityMessage("Sikertelen törlés!");
                                    openAlert();
                                    return;
                                }

                                handleCounter();
                                setSeverity("success");
                                setSeverityMessage(res.data);
                                openAlert();

                            }).catch((error) => {
                                setSeverity("error");
                                setSeverityMessage("Sikertelen törlés!");
                                openAlert();
                            })
                        }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Rendelés visszavonása #{orderId}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteOrderConfirmModal