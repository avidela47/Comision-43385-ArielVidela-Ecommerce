import React from "react";
import Layout from "../../components/Layout/Layout";
import Usermenu from "../../components/Layout/Usermenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Horus Santeria"}>
     <div className="container-fuid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
          <div className="card6">
            <div className="card-photo" />
            <div className="card-title">
              <span>Nombre: {auth?.user?.name}</span>
              <hr />
              <span>Rol: {auth?.user?.role}</span>
            </div>
            <div className="card-title">
              <span>Email: {auth?.user?.email}</span>
            </div>
            <div className="card-title">
              <span>Telefono: {auth?.user?.phone}</span>
            </div>
          </div>
          </div>
          <div className="col-md-3">
            <Usermenu />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
