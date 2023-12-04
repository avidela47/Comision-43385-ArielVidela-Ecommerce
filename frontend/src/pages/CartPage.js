import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import Swal from "sweetalert2";
import { FaLongArrowAltLeft } from "react-icons/fa";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   // Precio Total
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener el total!",
        width: "15em",
      });
    }
  };

  // Delete Item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al eliminar el producto!",
        width: "15em",
      });
    }
  };

  // Get Payment Gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/products/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener el token!",
        width: "15em",
      });
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle Payment
  const handlePayment = async () => {
    try {
      try {
        setLoading(true);
        const { nonce } = await instance.requestPaymentMethod();
        const { data } = await axios.post("/products/braintree/payment", {
          nonce,
          cart,
        });
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        Swal.fire({
          icon: "success",
          title: "La Compra fue realizada con exito!",
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart - Horus Santeria"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1">
              {`Hola ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `Tenes ${cart.length} productos en tu carrito ${
                    auth?.token
                      ? ""
                      : "Inicia sesión para continuar con tu compra"
                  }`
                : "Tu carrito esta vacio"}
            </h4>
          </div>
        </div>

        <h6 className="mb-3">
          <Link to={"/categories"} class="text-body">
            <FaLongArrowAltLeft />
            Continua Comprando
          </Link>
        </h6>

        <div className="row">
          <div className="col-md-9">
            {cart?.map((product) => (
              <div className="card mb-4">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={`${product.image}`}
                        className="img-fluid"
                        alt={product.name}
                      />
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Nombre</p>
                        <p className="lead fw-normal mb-0">{product.name}</p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Codigo</p>
                        <p className="lead fw-normal mb-0">{product.code}</p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Stock</p>
                        <p className="lead fw-normal mb-0">
                          {product.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Categoria</p>
                        <p className="lead fw-normal mb-0">{product?.category?.name}</p>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                      <div>
                        <p className="small text-muted mb-4 pb-2">Precio x unidad</p>
                        <p className="lead fw-normal mb-0">
                         $ {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => removeCartItem(product._id)}
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <h2>Tu Compra</h2>

            <h4 className="navbar-light bg-light">Compra Total: {totalPrice()}</h4>
            {auth?.user?.name ? (
              <>
                <div className="mb-3">
                  <h4 className="navbar-light bg-light">HOLA:</h4>
                  <h5 className="navbar-light bg-light">{auth?.user?.name}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                    disabled={!loading || instance || auth?.user?.phone}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Inicia sesión para checkout
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Inicia sesión para checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-outline-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.phone}
                  >
                    {loading ? "Procesando..." : "Pagar"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
