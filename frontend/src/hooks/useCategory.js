import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //Get Categories Functionality
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal al obtener la categoría!",
        width: "15em",
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
