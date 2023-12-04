import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h3>Panel Administrador</h3>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item bg-muted text-black rounded-md hover:bg-secondary transition ease-in-out duration-150"
          >
            Crear Categoria
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item bg-muted text-black rounded-md hover:bg-primary transition ease-in-out duration-150"
          >
            Crear Producto
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item bg-muted text-black rounded-md hover:bg-primary transition ease-in-out duration-150"
          >
            Productos
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item bg-muted text-black rounded-md hover:bg-primary transition ease-in-out duration-150"
          >
            Ordenes
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item bg-muted text-black rounded-md hover:bg-primary transition ease-in-out duration-150"
          >
            Usuarios
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
