import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  
  // form functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contraseña actualizada correctamente!",
          showConfirmButton: false,
          timer: 1500,
          width: "17em",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Respuesta de seguridad incorrecta",
          width: "17em",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar contraseña!",
        width: "17em",
      });
    }
  };

  return (
    <Layout title={"Forgot Password - Horus Santeria"}>
      <form
        onSubmit={handleSubmit}
        id="form"
        autoComplete="off"
        className="form"
      >
        <p className="title2">Restablecer contraseña</p>
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
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="input"
            name="answer"
            autoComplete="none"
          />
          <span>Ingrese deporte favorito?</span>
        </label>
        <label>
          <input
            required
            placeholder=""
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
            name="password"
            autoComplete="none"
          />
          <span>New Password</span>
        </label>
        <button className="submit">Restablecer</button>
     </form>
    </Layout>
  );
};

export default ForgotPassword;
