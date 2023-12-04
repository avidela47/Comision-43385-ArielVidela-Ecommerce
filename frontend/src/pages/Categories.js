/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Swal from "sweetalert2";
import { Pagination, Checkbox, Radio } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // Get all Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener las categorías!",
        width: "15em",
      });
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Get Products
  const getAllProducts = async (page) => {
    try {
      const { data } = await axios.get(`/products/get-products?page=${page}`);
      setProducts(data.product);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener los productos!",
        width: "15em",
      });
    }
  };

  // Filter by Category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts(currentPage);
  }, [checked.length, radio.length, currentPage]);

  useEffect(() => {
    if (checked.length || radio.length) filtererProduct(currentPage);
  }, [checked, radio, currentPage]);

  // Get filter Product
  const filtererProduct = async () => {
    try {
      const { data } = await axios.post("/products/products-filters", {
        checked,
        radio,
      });
      setProducts(data?.product);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener los productos!",
        width: "15em",
      });
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <Layout title={"Home - Horus Santeria"}>      
      <div className="container-fluid">       
        <div className="row mt-3">
          <div className="col-md-3">
            <h6 className="text-center mt-5">Filtrar por Categorias</h6>            
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h6 className="text-center">Filtrar por Precios</h6>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={() => window.location.reload()}
              >
                Limpiar
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="text-center mt-4">Todas las Categorias</h2>
            <h6 className="text-center">{products.length} productos</h6>         
            <div className="d-flex flex-wrap mt-4">
              {products?.map((product) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${product.image}`}
                    className="card-img-top2"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title2">{product.name}</h5>
                    <p className="card-text2">
                      {product.description.substring(0, 30)}...
                    </p>
                    <p className="card-text3">$ {product.price}</p>
                    <button
                      className="btn btn-outline-success btn-sm ms-4"
                      onClick={() => navigate(`/product/${product.slug}`)}
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
        <Pagination
          className="pagination"
          current={currentPage}
          total={totalPages * itemsPerPage}
          pageSize={itemsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default Home;
