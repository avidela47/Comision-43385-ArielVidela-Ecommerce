import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Pagination } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/products/products-category/${params.slug}`
      );
      setProduct(data?.product);
      setCategory(data?.category);
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
    <Layout title={"Category Product - Horus Santeria"}>
      <div className="container-fluid mt-3 ms-5">
        <h2 className="text-center">Categoria {category?.name}</h2>
        <h6 className="text-center">{product.length} productos</h6>
        <div className="d-flex flex-wrap">
          {product?.map((product) => (
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

export default CategoryProduct;
