/* eslint-disable jsx-a11y/scope */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Pagination } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import ProductForm from "../../components/Form/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

   // Get Products
 const getProducts = async (page) => {
  try {
    const { data } = await axios.get(`/products/get-products?page=${page}`);
    setProducts(data.product);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal al obtener las categorías!",
      width: "15em",
    });
  }
};

// Lifecycle method
useEffect(() => {
  getProducts(currentPage);
}, [currentPage]);

  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/products/update-products/${selected._id}`,
        {
          name: name,
          code: code,
          description: description,
          price: price,
          quantity: quantity,
          image: image,
          id: selected,
        }
      );
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: `${name} fue actualizada con exito!`,
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
        setSelected(null);
        setName("");
        setVisible(false);
        getProducts(currentPage);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al actualizar el producto!",
          width: "15em",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al actualizar el producto!",
        width: "15em",
      });
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/products/delete-products/${id}`, {
        name: name,
        id: selected,
      });
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: `${name} fue eliminado con exito!`,
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
        getProducts(currentPage);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al eliminar el producto!",
          width: "15em",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al eliminar el producto!",
        width: "15em",
      });
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <Layout title={"All Products - Horus Santeria"}>
      <div className="container-fuid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Productos</h1>
            <div className="w-100">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Imagen</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <>
                      <tr>
                        <td scope="row">{index + 1}</td>
                        <td key={product._id}>{product.name}</td>
                        <td>{product.code}</td>
                        <td>{product.description}</td>
                        <td>$ {product.price}</td>
                        <td>{product.category.name}</td>
                        <td>{product.quantity}</td>
                        <td>
                          <img
                            src={`${product.image}`}
                            className="card-img-top"
                            alt={product.name}
                          />
                        </td>
                        <td>
                          <button
                            className=" btn1 btn btn-outline-primary btn-sm ms-2"
                            onClick={() => {
                              setVisible(true);
                              setName(product.name);
                              setCode(product.code);
                              setDescription(product.description);
                              setPrice(product.price);
                              setQuantity(product.quantity);
                              setImage(`${product.image}`);
                              setSelected(product);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn1 btn btn-outline-danger btn-sm ms-2"
                            onClick={() => {
                              handleDelete(product._id);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              visible={visible}
              onOk={handleUpdate}
              onCancel={() => {
                setVisible(false);
                setSelected(null);
              }}
            >
              <h4>Editar productos</h4>
              <h6>Nombre</h6>
              <ProductForm
                value={name}
                setValue={setName}
                handleSubmit={handleUpdate}
              />
              <h6>Codigo</h6>
              <ProductForm
                value={code}
                setValue={setCode}
                handleSubmit={handleUpdate}
              />
              <h6>Descripcion</h6>
              <ProductForm
                value={description}
                setValue={setDescription}
                handleSubmit={handleUpdate}
              />
              <h6>Precio</h6>
              <ProductForm
                value={price}
                setValue={setPrice}
                handleSubmit={handleUpdate}
              />
              <h6>Cantidad</h6>
              <ProductForm
                value={quantity}
                setValue={setQuantity}
                handleSubmit={handleUpdate}
              />
              <h6>Imagen</h6>
              <ProductForm
                value={image}
                setValue={setImage}
                handleSubmit={handleUpdate}
              />
            </Modal>
            <Pagination
              current={currentPage}
              total={totalPages * itemsPerPage}
              pageSize={itemsPerPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
