import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import noimage from './noimage.png'

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get("https://localhost:7165/products/all")
            .then((termekek) => setProducts(termekek.data.data))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        /*
        <img src={product.productImage ? (new Image().src = `${"data:image/png;base64,"+product.productImage}`) : noimage} style={{width: "100%"}} className="card-img-top" alt="..." />
        */
        <div className="p-5 m-auto content bg-ivory">
            {
                isFetchPending ? (<div style={{ position: "absolute", right: "50%", zIndex: "1",  top: "50%"}}>
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
        </div>
    );
}