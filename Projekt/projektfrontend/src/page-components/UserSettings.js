import React, { useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const UserSettings = ({ setSeverityMessage, handleClick, setSeverity, userData, currentLoginLevel, setLoginLevel }) => {
  var user = jwtDecode(userData);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7165/webshop/user/${user.userId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData}`
          }
        });
        const data = response.data.data;
        
        setUsername(data.username);
        setEmail(data.email);

      } catch (error) {
        console.log(error);
      } finally {
        setFetchPending(false);
      }
    };
    fetchData();
  }, []);

  return (

    <div className='container p-2'>
      <h3 className='text-center m-3'>Felhasználói beállításaid</h3>
      <form className='form-group border'>
        <div className="input-group flex-nowrap w-50 m-3">
          <span className="input-group-text" id="addon-wrapping">Felhasználónév</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} id="usernameUpdate" type="text" className="form-control" placeholder="Írj be egy felhasználónevet" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
        <div className="input-group flex-nowrap w-50 m-3">
          <span className="input-group-text" id="addon-wrapping">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} id="emailUpdate" type="email" className="form-control" placeholder="Írj be egy e-mail címet" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
        <div className="input-group flex-nowrap w-50 m-3">
          <span className="input-group-text" id="addon-wrapping">Régi jelszó</span>
          <input id="oldPasswordUpdate" type="password" className="form-control" placeholder="Írd be a régi jelszavad" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
        <div className="input-group flex-nowrap w-50 m-3">
          <span className="input-group-text" id="addon-wrapping">Új jelszó</span>
          <input id="newPasswordUpdate" type="password" className="form-control" placeholder="Írd be az új jelszavad" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>
        <hr />
        <button onClick={async (event) => {
          event.preventDefault();
          event.persist();
          var username = document.getElementById("usernameUpdate").value
          var email = document.getElementById("emailUpdate").value
          var oldPassword = document.getElementById("oldPasswordUpdate").value
          var newPassword = document.getElementById("newPasswordUpdate").value

          var response = await axios.put("https://localhost:7165/webshop/settings", {
            userId: jwtDecode(userData).userId,
            username: username,
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userData}`
            }
          }).then((res) => {
            if (res.data.statusCode === 200) {
              setSeverity("success");
            } else {
              setSeverity("error");
            }
            setSeverityMessage(res.data.responseMessage)
          })
          handleClick();
        }} type="button" className="btn btn-success m-3">Adatok mentése</button>
        <button type="button" className="btn btn-danger m-3">Felhasználó törlése</button>
      </form>
    </div>
  )
}

export default UserSettings