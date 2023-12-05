import React, { useState } from "react";
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        name,
        phone,
        email,
        password,
        answer,
      });
      if (res && res.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario registrado correctamente!",
          showConfirmButton: false,
          timer: 1500,
          width: '17em',
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario registrado, inicie sesion!",
          width: '17em',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al registrar!",
        width: '17em',
      });
    }
  };

  return (
    <Layout title={"Register - Horus Santeria"}>
      <form onSubmit={handleSubmit} id="form" autoComplete="off" className="form">
        <p className="title">Registrar</p>
        <p className="message">
          Regístrese ahora y obtenga acceso completo a nuestra aplicación.
        </p>
        <div className="flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              name="name"
              autoComplete="none"
            />
            <span>Nombre</span>
          </label>
          <label>
            <input
              required
              placeholder=""
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
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
        <label>
          <input
            required
            placeholder=""
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="input"
            name="answer"
            autoComplete="none"
          />
          <span>Deporte favorito?</span>
        </label>
        <button className="submit">Registrar</button>
        <p className="signin">
          Tienes una cuenta ?{" "}
          <Link className="link" to="/login">
            Ingresar
          </Link>{" "}
        </p>
      </form>
    </Layout>
  );
};

export default Register;
