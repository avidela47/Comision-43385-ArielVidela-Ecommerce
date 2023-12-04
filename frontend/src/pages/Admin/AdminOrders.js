import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { Pagination, Select } from "antd";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "No Procesado",
    "Procesando",
    "Enviado",
    "Entregado",
    "Cancelado",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`/auth/all-orders`);
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

  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al actualizar el estado de la orden!",
        width: "15em",
      });
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <Layout title={"Admin Orders - Horus Santeria"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Ordenes</h1>

            {orders?.map((o, index) => {
              return (
                <div className="w-100">
                  <table className="table">
                    <thead>
                      <tr className=" dashboard navbar-light bg-primary">
                        <th scope="col">#</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">fecha</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="navbar-light bg-light">
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value, orderId) => handleChangeStatus(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, index) => (
                              // eslint-disable-next-line react/jsx-no-undef
                              <Option key={index} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Exitoso" : "Fallido"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container navbar-light bg-light">
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
                          <p className="lead fw-normal">{product.quantity}</p>
                          <p className="small text-muted">Precio:</p>
                          <p className="lead fw-normal">$ {product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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

export default AdminOrders;
