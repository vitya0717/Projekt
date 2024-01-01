import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import DeleteOrderConfirmModal from '../function-components/DeleteOrderConfirmModal'


const UserOrders = ({ setSeverityMessage, openAlert, setSeverity, userData, currentLoginLevel, setLoginLevel }) => {

  const [orders, setOrders] = useState([])

  const [counter, setCounter] = useState(0);

  var vegosszeg = 0

  const handleCounter = () => {
    setCounter((a) => a + 1);
  }


  const response = async () => {
    const response = await axios.get(`https://localhost:7165/webshop/orders?id=${jwtDecode(userData).userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userData}`
      }
    }).then(async (res) => {
      setOrders(res.data.data.orders);
    })
  }
  useEffect(() => {
    if (userData !== null) {
      response()
    }
    console.log("asd")
  }, [counter])
  return (
    userData !== null ?
      (orders.length > 0 ?
        <div className="container d-flex justify-content-center">
          {
            orders.map((order) => (
              console.log(order.orderId),
              <div idvalue={order.orderId} id={"card" + order.orderId} key={"card" + order.orderId} className="card m-3" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Rendelés azonosító #{order.orderId}</h5>
                  <p className="card-text text-muted">Rendelés dátuma: {new Date(order.orderDate).getFullYear() + "-" + (new Date(order.orderDate).getMonth() + 1) + "-" + new Date(order.orderDate).getDate() + " " + new Date(order.orderDate).getHours() + ":" + new Date(order.orderDate).getMinutes() + ":" + new Date(order.orderDate).getSeconds()} {""}</p>
                  <p className="card-text">Rendelés státusza: <span className='text-warning'>Fizetésre vár</span></p>
                </div>
                <ul className="list-group list-group-flush">
                  {order.orderedItems.map((orderedItem) => (
                    vegosszeg += orderedItem.item.productPrice * orderedItem.quantity,
                    <li key={"list" + orderedItem.orderDeatilId} className="list-group-item">{orderedItem.item.productName}  <span className='fw-bold text-primary'>x{orderedItem.quantity}</span></li>
                  )
                  )}
                </ul>
                <div className="card-body">
                  <p className="card-text">Összesen fizetendő: <span className='text-success'>{vegosszeg}Ft</span></p>
                  <button id='orderDeleteButton' orderid={order.orderId} data-bs-toggle="modal" data-bs-target={"#orderDeleteModal" + order.orderId} href="#" className="btn btn-danger text-warning text-decoration-none">Rendelés visszavonás</button>
                  <DeleteOrderConfirmModal handleCounter={handleCounter} orderId={order.orderId} userData={userData} setSeverityMessage={setSeverityMessage} openAlert={openAlert} setSeverity={setSeverity} />
                </div>
              </div>
            ))

          }
        </div> : <h2 className='text-warning text-center mt-5'>Még nincs egy rendelésed sem! :c</h2>)
      :
      (<div>
        <div style={{ position: "absolute", right: "50%", zIndex: "1", top: "50%", transform: "translateY(-50%, -50%)" }}>
          <ul className='navbar-nav'>
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-success me-2">Bejelentkezés</Link>
            </li>
          </ul>
        </div>
      </div>)
  )
}

export default UserOrders