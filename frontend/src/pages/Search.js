import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import SearchInput from "../components/Form/SearchInput";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/products/search/${values.keyword}`);
        setProducts(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al obtener el producto!",
          width: "15em",
        });
      }
    };

    if (values.keyword) {
      fetchProducts();
    }
  }, [values.keyword]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Filter products based on the search value
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(values.keyword.toLowerCase())
  );

  return (
    <Layout title={"Search - Horus Santeria"}>
      <div className="container col-md-9">      
        <div className="text-center">          
          <h2>Buscar Producto</h2>          
          <h6>
            {filteredProducts.length < 1            
              ? "Producto no encontrado"
              : `Se encontro ${filteredProducts.length} productos`}
              <SearchInput />
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="card m-2"
                style={{ width: "18rem" }}
              >
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

export default Search;
