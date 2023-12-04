import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { Pagination } from "antd";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import Usermenu from "../../components/Layout/Usermenu";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/auth/orders`);
      setOrders(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener las ordenes!",
        width: "15em",
      });
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders(currentPage);
  }, [auth?.token, currentPage]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <Layout title={"Orders - Horus Santeria"}>
      <div className="container-fluid p-3 m-3 dashboard navbar-light bg-light">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Ordenes</h1>
            {orders?.map((o, index) => {
              return (
                <div className="w-100">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">fecha</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Exitoso" : "Fallido"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((product, index) => (
                      <div
                        className="row mb-2 p-3 card flex-row"
                        key={product._id}
                      >
                        <div className="col-md-4">
                          <img
                            src={`${product.image}`}
                            className="card3 card-img-top1"
                            alt={product.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <p className="small text-muted">Nombre:</p>
                          <p className="lead fw-normal">{product.name}</p>
                          <p className="small text-muted">Codigo:</p>
                          <p className="lead fw-normal">{product.code}</p>
                          <p className="small text-muted">Cantidad:</p>
                          <p className="lead fw-normal">
                            {product.quantity}
                          </p>
                          <p className="small text-muted">Precio:</p>
                          <p className="lead fw-normal">
                            $ {product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
              className="pagination"
              current={currentPage}
              total={totalPages * itemsPerPage}
              pageSize={itemsPerPage}
              onChange={(page) => setCurrentPage(page)}
            />
        </div>
      </div>      
    </Layout>
  );
};

export default Orders;
