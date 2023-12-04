import React from "react";
import { NavLink } from "react-router-dom";

const Usermenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h3>Panel Usuario</h3>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item bg-muted text-black rounded-md hover:bg-secondary transition ease-in-out duration-150"
          >
            Perfil
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item bg-muted text-black rounded-md hover:bg-secondary transition ease-in-out duration-150"
          >
            Ordenes
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Usermenu;
