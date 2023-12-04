import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaStar,
  FaRegStarHalfStroke,
  FaMinus,
  FaPlus,
  FaCartShopping,
  FaCheck,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { LuShoppingBasket } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import Layout from "../components/Layout/Layout";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/products/get-products/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener los productos!",
        width: "15em",
      });
    }
  };

  // Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.product);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener los productos!",
        width: "15em",
      });
    }
  };

  return (
    <Layout title={"Detail Product - Horus Santeria"}>
      <div>
        <section className="py-5">
          <div className="container">
            <div className="row gx-5">
              <aside className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                  <img
                    src={`${product.image}`}
                    className="card2 card-img-top"
                    alt={product.name}
                  />
                </div>
                <div className="d-flex justify-content-center mb-3">
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.name}
                  />
                  <img
                    className="card-img-top ms-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <img
                    className="card-img-top ms-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <img
                    className="card-img-top ms-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <img
                    className="card-img-top ms-2"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              </aside>
              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-dark">{product.name}</h4>
                  <div className="d-flex flex-row my-3">
                    <div className="text-warning mb-1 me-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaRegStarHalfStroke />
                      <span className="ms-1">4.5</span>
                    </div>
                    <span className="text-muted ms-2">
                      <LuShoppingBasket />
                      {product.quantity}
                    </span>
                    <span className="text-success ms-2">In stock</span>
                  </div>
                  <div className="mb-3">
                    <span className="h5">$ {product.price}</span>
                    <span className="text-muted">/por unidad</span>
                  </div>
                  <p>{product.description}</p>
                  <div className="row">
                    <dt className="col-3">Tipo:</dt>
                    <dd className="col-9">Espiritual</dd>
                    <dt className="col-3">Color:</dt>
                    <dd className="col-9">Varios</dd>
                    <dt className="col-3">Origen:</dt>
                    <dd className="col-9">Importado</dd>
                    <dt className="col-3">Categoria:</dt>
                    <dd className="col-9">{product?.category?.name}</dd>
                  </div>
                  <hr />
                  <div className="row mb-4">
                    <div className="col-md-4 col-6">
                      <label className="mb-2">Tamaño</label>
                      <select
                        className="form-select border border-success"
                        style={{ height: 35 }}
                      >
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                    <div className="col-md-4 col-6 mb-3">
                      <label className="mb-2 d-block">Cantidad</label>
                      <div className="input-group mb-3" style={{ width: 170 }}>
                        <button
                          className="btn btn-white border border-secondary px-3"
                          type="button"
                          id="button-addon1"
                          data-mdb-ripple-color="dark"
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="text"
                          className="form-control text-center border border-secondary"
                          placeholder={1}
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                        <button
                          className="btn btn-white border border-secondary px-3"
                          type="button"
                          id="button-addon2"
                          data-mdb-ripple-color="dark"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                              className="btn btn-outline-primary btn-sm ms-2"
                              onClick={() => {
                                setCart([...cart, product]);
                                Swal.fire({
                                  icon: "success",
                                  title: `${product.name} fue agregado al carrito!`,
                                  width: "17em",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                              }}
                            >
                             <FaCartShopping /> Agregar al carrito
                            </button>
                </div>
              </main>
            </div>
          </div>
        </section>

        {/* content */}
        <section className="bg-light border-top py-4">
          <div className="container">
            <div className="row gx-4">
              <div className="col-lg-8 mb-4">
                <div className="border rounded-2 px-3 py-2 bg-white">
                  {/* Pills navs */}
                  <ul
                    className="nav nav-pills nav-justified mb-3"
                    id="ex1"
                    role="tablist"
                  >
                    <li className="nav-item d-flex" role="presentation">
                      <button
                        className="nav-link d-flex align-items-center justify-content-center w-100 active"
                        id="ex1-tab-1"
                        data-mdb-toggle="pill"
                        href="#ex1-pills-1"
                        role="tab"
                        aria-controls="ex1-pills-1"
                        aria-selected="true"
                      >
                        Especificación
                      </button>
                    </li>
                    <li className="nav-item d-flex" role="presentation">
                      <button
                        className="nav-link d-flex align-items-center justify-content-center w-100"
                        id="ex1-tab-2"
                        data-mdb-toggle="pill"
                        href="#ex1-pills-2"
                        role="tab"
                        aria-controls="ex1-pills-2"
                        aria-selected="false"
                      >
                        Garantia
                      </button>
                    </li>
                    <li className="nav-item d-flex" role="presentation">
                      <button
                        className="nav-link d-flex align-items-center justify-content-center w-100"
                        id="ex1-tab-3"
                        data-mdb-toggle="pill"
                        href="#ex1-pills-3"
                        role="tab"
                        aria-controls="ex1-pills-3"
                        aria-selected="false"
                      >
                        Datos de envío
                      </button>
                    </li>
                    <li className="nav-item d-flex" role="presentation">
                      <button
                        className="nav-link d-flex align-items-center justify-content-center w-100"
                        id="ex1-tab-4"
                        data-mdb-toggle="pill"
                        href="#ex1-pills-4"
                        role="tab"
                        aria-controls="ex1-pills-4"
                        aria-selected="false"
                      >
                        Perfil del vendedor
                      </button>
                    </li>
                  </ul>
                  {/* Pills navs */}
                  {/* Pills content */}
                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade show active"
                      id="ex1-pills-1"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-1"
                    >
                      <p>
                        With supporting text below as a natural lead-in to
                        additional content. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur.
                      </p>
                      <div className="row mb-2">
                        <div className="col-12 col-md-6">
                          <ul className="list-unstyled mb-0">
                            <li>
                              <FaCheck className="text-success me-2" />
                              Un gran nombre de característica aquí
                            </li>
                            <li>
                              <FaCheck className="text-success me-2" />
                              Lorem ipsum dolor sit amet, consectetur
                            </li>
                            <li>
                              <FaCheck className="text-success me-2" />
                              Duis aute irure dolor in reprehenderit
                            </li>
                            <li>
                              <FaCheck className="text-success me-2" />
                              Quis nostrud exercitation
                            </li>
                          </ul>
                        </div>
                        <div className="col-12 col-md-6 mb-0">
                          <ul className="list-unstyled">
                            <li>
                              <FaCheck className="text-success me-2" />
                              Easy fast and ver good
                            </li>
                            <li>
                              <FaCheck className="text-success me-2" />
                              Some great feature name here
                            </li>
                            <li>
                              <FaCheck className="text-success me-2" />
                              Modern style and design
                            </li>
                          </ul>
                        </div>
                      </div>
                      <table className="table border mt-3 mb-2">
                        <tbody>
                          <tr>
                            <th className="py-2">Tipo:</th>
                            <td className="py-2">Espirutual y Religioso</td>
                          </tr>
                          <tr>
                            <th className="py-2">Colores:</th>
                            <td className="py-2">Varios</td>
                          </tr>
                          <tr>
                            <th className="py-2">Origen:</th>
                            <td className="py-2">Importados</td>
                          </tr>
                          <tr>
                            <th className="py-2">Categoria:</th>
                            <td className="py-2">{product?.category?.name}</td>
                          </tr>
                          <tr>
                            <th className="py-2">Envio:</th>
                            <td className="py-2">A todo el pais</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="tab-pane fade mb-2"
                      id="ex1-pills-2"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-2"
                    >
                      Tab content or sample information now <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum. Lorem ipsum
                      dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo
                    </div>
                    <div
                      className="tab-pane fade mb-2"
                      id="ex1-pills-3"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-3"
                    >
                      Another tab content or sample information now <br />
                      Dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </div>
                    <div
                      className="tab-pane fade mb-2"
                      id="ex1-pills-4"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-4"
                    >
                      Some other tab content or sample information now <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </div>
                  </div>
                  {/* Pills content */}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="px-0 border rounded-2 shadow-0">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Productos Similares</h5>
                      {relatedProducts?.map((product) => (
                        <div className="d-flex mb-3" style={{ width: "18rem" }}>
                          <img
                            src={`${product.image}`}
                            className="card3 card-img-top"
                            alt={product.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title3">{product.name}</h5>
                            <p className="card-text3">$ {product.price}</p>
                            <p className="card-text3">
                              {product?.category?.name}
                            </p>
                            <button
                              className="btn2 btn btn-outline-success btn-sm mb-2"
                              onClick={() =>
                                navigate(`/product/${product.slug}`)
                              }
                            >
                              Ver mas
                            </button>
                            <button
                      className="btn btn-outline-primary btn-sm ms-2"
                      onClick={() => {
                        setCart([...cart, product])
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        Swal.fire({
                          icon: "success",
                          title: `${product.name} fue agregado al carrito!`,
                          width: "17em",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                      }}
                    >
                      Agregar al carrito
                    </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;
