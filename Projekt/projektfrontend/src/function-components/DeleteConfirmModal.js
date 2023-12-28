import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const DeleteConfirmModal = ({ setSeverityMessage, openAlert, setSeverity, userData, currentLoginLevel, setLoginLevel }) => {

    var navigate = useNavigate();

    return (
        <div id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Felhasználó törlése megerősítés</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>A megerősítéshez írd az inputba a MEGERŐSÍTEM szót!</p>
                    </div>
                    <div className="modal-footer">
                        <input onChange={() => {
                            var input = document.getElementById("deleteConfirmInput").value;
                            var button = document.getElementById("deleteConfirmButton");

                            if (input === "MEGERŐSÍTEM") {
                                button.setAttribute("data-bs-dismiss", "modal");
                            } else {
                                button.removeAttribute("data-bs-dismiss");
                            }

                        }} id="deleteConfirmInput" type="text" className="form-control" placeholder="MEGERŐSÍTEM" />

                        <button id='deleteConfirmButton'
                            onClick={async () => {
                                var input = document.getElementById("deleteConfirmInput").value;
                                var button = document.getElementById("deleteConfirmButton");

                                if (input !== "MEGERŐSÍTEM") {

                                    button.removeAttribute("data-bs-dismiss");

                                    setSeverity("error");
                                    setSeverityMessage("Sikertelen törlés, ellenőrízd az inputot!");
                                    openAlert();
                                    return;
                                }
                                await axios.delete(`https://localhost:7165/webshop/deleteUser?userId=${jwtDecode(userData).userId}`, {
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${userData}`
                                    }
                                }).then((res) => {
                                    console.log(res)
                                    if(res.data.statusCode != 200) {
                                        setSeverity("error");
                                        setSeverityMessage("Sikertelen törlés!");
                                        openAlert();
                                        return;
                                    }
                                    navigate("/logout");

                                }).catch((error) => {
                                    setSeverity("error");
                                    setSeverityMessage("Sikertelen törlés!");
                                    openAlert();
                                })
                            }} type="button" data-bs-dismiss="modal" className="btn btn-danger w-100">Megerősítés</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmModal