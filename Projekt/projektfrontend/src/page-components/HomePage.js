import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import noimage from '../noimage.png'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [userData, setUserData] = useState(localStorage.getItem("token"));

    useEffect(() => {
        setFetchPending(true);
        userData ?
            axios.get("https://localhost:7165/products/all",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userData}`
                    }
                })
                .then((termekek) => setProducts(termekek.data.data))
                .catch(console.log)
                .finally(() => {
                    setFetchPending(false);
                }) : setProducts(null);
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
                                <div key={product.productId} className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={product.productImage ? (new Image().src = `${"data:image/png;base64," + product.productImage}`) : noimage} style={{ width: "50%" }} className="card-img-top" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{product.productName}</h5>
                                                <p className="card-text text-left">{product.productDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div> :

            <div>
                <div style={{ position: "absolute", right: "50%", zIndex: "1", top: "50%", transform: "translateY(-50%, -50%)" }}>
                    <ul className='navbar-nav'>
                        <li className="nav-item">
                            <Link to="/login" className="btn btn-outline-success me-2">Bejelentkezés</Link>
                        </li>
                    </ul>
                </div>
            </div>
    );
}

export default HomePage