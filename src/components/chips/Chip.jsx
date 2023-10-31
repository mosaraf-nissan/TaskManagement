/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "./chip.css";
const Chip = (props) => {
  return (
    <div className="chip" style={{ backgroundColor: props?.color }}>
      <p>{props?.text}</p>
      {props.close && (
        <RiCloseCircleFill
          onClick={() => (props.onClose ? props.onClose() : "")}
          style={{ fontSize: "24px", cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default Chip;
