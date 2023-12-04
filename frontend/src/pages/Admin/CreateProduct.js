import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

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

  // Create Product Function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/products/create-product", {
        name,
        code,
        description,
        price,
        category,
        quantity,
        image,
      });
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: `${name} fue creado con exito!`,
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
        setName("");
        setCode("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setImage("");
        navigate("/dashboard/admin/products");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al crear el producto!",
          width: "15em",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al crear el producto!",
        width: "15em",
      });
    }
  };

  return (
    <Layout title={"Create Product - Horus Santeria"}>
      <div className="container-fuid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Crear Producto</h1>
            <div className="m-1 w-50">
              <Select
                bordered={false}
                placeholder="Seleccione categoria"
                required
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3 w-50">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 w-50">
                <input
                  type="text"
                  placeholder="Codigo"
                  className="form-control"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 w-50">
                <textarea
                  type="text"
                  placeholder="Descripcion"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 w-50">
                <input
                  type="number"
                  placeholder="Precio"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 w-50">
                <input
                  type="number"
                  placeholder="Cantidad"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3 w-50">
                <input
                  type="text"
                  placeholder="Imagen"
                  className="form-control"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <button className="btn btn-outline-primary" onClick={handleCreate}>
                Crear Producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
