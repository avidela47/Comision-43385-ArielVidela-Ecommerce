import React from "react";
import { FaShippingFast } from "react-icons/fa";
import {
  BsFillCreditCardFill,
  BsCartCheck,
  BsClockHistory,
} from "react-icons/bs";

const data = [
  {
    icon: <FaShippingFast size={30} color="#8cb4f5" />,
    heading: "Envi­o gratis desde $ 10.000",
    text: "Ofrecemos envi­o gratuito en productos especiales.",
  },
  {
    icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
    heading: "Pago seguro",
    text: "Seguridad, de principio a fin.",
  },
  {
    icon: <BsCartCheck size={30} color="#fa82ea" />,
    heading: "Productos de calidad",
    text: "Vendemos productos solo de marcas probadas y comprobadas.",
  },
  {
    icon: <BsClockHistory size={30} color="#82fa9e" />,
    heading: "Soporte 24/7",
    text: "Obtenga acceso al soporte de nuestro equipo de soporte experto.",
  },
];

const HomeInfoBox = () => {
  return (
    <div className="infoboxes --mb2">
      {data.map((item, index) => {
        const { icon, heading, text } = item;
        return (
          <div className="infobox" key={index}>
            <div className="icon">{icon}</div>
            <div className="text">
              <h4>{heading}</h4>
              <p className="text">{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeInfoBox;
