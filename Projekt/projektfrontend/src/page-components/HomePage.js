import React from 'react'
//import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import noimage from '../noimage.png'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


const user = localStorage.getItem("token");

const HomePage = ({ setSeverityMessage, openAlert, setSeverity, handleCounter, setProducts, products, setCart, cart}) => {
    const [isFetchPending, setFetchPending] = useState(false);
    const [userData, setUserData] = useState(localStorage.getItem("token"));

    useEffect(() => {
        setFetchPending(true);
        const fetchData = async () => {
            userData ?
                await axios.get("https://localhost:7165/products/all",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${userData}`
                        }
                    })
                    .then(async (termekek) => {
                        await setProducts(termekek.data.data);
                    })
                    .catch(console.log)
                    .finally(() => {
                        setFetchPending(false);
                    }) : setProducts(null);
        }
        fetchData();
        if(userData) {
            setCart(JSON.parse(localStorage.getItem(`mycart-${jwtDecode(userData).userId}`)) || []); 
        }
    }, [userData]);
    return (
        products ?
            <div className="p-5 m-auto content bg-ivory">
                {
                    isFetchPending ? (<div style={{ position: "absolute", right: "50%", zIndex: "1", top: "50%" }}>
                        <div className="spinner-border" />
                    </div>) : (
                        <div>
                            <h2 className="text-center">Termékek</h2>
                            {products.map((product) => (
                                <div id={product.productId} key={product.productId} className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-4 border-end">
                                            <img src={product.productImage ? (new Image().src = `${"data:image/png;base64," + product.productImage}`) : noimage} style={{ width: "50%" }} className="card-img-top" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{product.productName}</h5>
                                                <p className="card-text text-left">{product.productDescription}</p>
                                                <p className="card-text text-left text-warning">Ár: <span className='text-danger fw-bold'>{product.productPrice}</span>Ft</p>
                                                <button onClick={() => {
                                                    if (cart.find(it => it.pr.productId == product.productId)) {

                                                        setSeverity("warning");
                                                        setSeverityMessage("A kosárban ma van ilyen termék, növeld meg a mennyiséget, ha többet szeretnél egy termékből!");
                                                        openAlert();
                                                        return;
                                                    }
                                                    handleCounter();
                                                    cart.push(
                                                        {
                                                            pr: products.find(item => item.productId == product.productId),
                                                            quantity: 1
                                                        });
                                                    localStorage.setItem(`mycart-${jwtDecode(userData).userId}`, JSON.stringify(cart));
                                                    if (document.getElementById("cartSize").classList.contains("visually-hidden") && cart.length >= 1) {
                                                        document.getElementById("cartSize").classList.remove("visually-hidden");
                                                    }
                                                    document.getElementById("cartSize").innerText = cart.length;
                                                    setCart(cart);
                                                }} type='button' className='btn btn-success'>Kosárba</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }

            </div> :

            (<div>
                <div style={{ position: "absolute", right: "50%", zIndex: "1", top: "50%", transform: "translateY(-50%, -50%)" }}>
                    <ul className='navbar-nav'>
                        <li className="nav-item">
                            <Link to="/login" className="btn btn-outline-success me-2">Bejelentkezés</Link>
                        </li>
                    </ul>
                </div>
            </div>)
    );
}

export default HomePage