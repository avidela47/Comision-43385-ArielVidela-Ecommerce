import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // form functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Hola ${email}!`,
          showConfirmButton: false,
          timer: 1500,
          width: '21em',
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate( location.state ||"/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email o Password son invalidos",
          width: '17em',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al loguear!",
        width: '17em',
      });
    }
  };

  return (
    <Layout title={"Login - Horus Santeria"}>
      <form
        onSubmit={handleSubmit}
        id="form"
        autoComplete="off"
        className="form"
      >
        <p className="title">Ingresar</p>
        <p className="message">
          Ingresa ahora y obtenga acceso completo a nuestra aplicación.
        </p>
        <label>
          <input
            required
            placeholder=""
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            name="email"
            autoComplete="none"
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
            className="input"
            name="password"
            autoComplete="none"
          />
          <span>Password</span>
        </label>
        <button className="submit">Ingresar</button>
        <button className="submit" onClick={() => { navigate('/forgot-password') }}>Olvidaste tu contraseña?</button>        
      </form>
    </Layout>
  );
};

export default Login;

