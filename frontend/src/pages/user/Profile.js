import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import Usermenu from "../../components/Layout/Usermenu";
import { useAuth } from "../../context/auth";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
  }, [auth?.user]);

  // form functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/auth/profile", {
        name,
        phone,
        email,
        password,
      });
      if (data?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al actualizar prerfil!",
          width: "17em",
        });
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        Swal.fire({
          icon: "success",
          title: "Perfil actualizado con exito!",
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar prerfil!",
        width: "17em",
      });
    }
  };

  return (
    <Layout title={"My Profile - Horus Santeria"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <form
              onSubmit={handleSubmit}
              id="form"
              autoComplete="off"
              className="form2"
            >
              <p className="title">Actualizar Perfil de Usuario</p>
              <p className="message">
                Actualiza tu perfil y obtenga acceso completo a nuestra
                aplicación.
              </p>
              <div className="flex">
                <label>
                  <input
                    placeholder=""
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input2"
                    name="name"
                    autoComplete="none"
                  />
                  <span>Nombre</span>
                </label>
                <label>
                  <input
                    placeholder=""
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input2"
                    name="phone"
                    autoComplete="none"
                  />
                  <span>Telefono</span>
                </label>
              </div>
              <label>
                <input
                  required
                  placeholder=""
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input2"
                  name="email"
                  autoComplete="none"
                  disabled={true}
                />
                <span>Email</span>
              </label>
              <label>
                <input
                  required
                  placeholder=""
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input2"
                  name="password"
                  autoComplete="none"
                />
                <span>Password</span>
              </label>
              <button className=" btn btn-outline-success ms-5">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
