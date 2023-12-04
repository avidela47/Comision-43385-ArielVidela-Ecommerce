/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal } from "antd";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category/create-category", {
        name,
      });
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: `${name} fue creada con exito!`,
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllCategory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al crear la categoría!",
          width: "15em",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al crear la categoría!",
        width: "15em",
      });
    }
  };

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

  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/category/update-category/${selected._id}`,
        {
          name: updatedName,
          id: selected,
        }
      );
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: `${updatedName} fue actualizada con exito!`,
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al actualizar la categoría!",
          width: "15em",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al actualizar la categoría!",
        width: "15em",
      });
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/category/delete-category/${id}`);
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: `${name} fue eliminada con exito!`,
          width: "17em",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllCategory();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al eliminar la categoría!",
          width: "15em",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al eliminar la categoría!",
        width: "15em",
      });
    }
  };

  return (
    <Layout title={"Create Category - Horus Santeria"}>
      <div className="container-fuid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Gestionar Categoria</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-50">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category, index) => (
                    <>
                      <tr>
                        <td scope="row">{index + 1}</td>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => {
                              handleDelete(category._id);
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
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
