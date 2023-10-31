import React, { useEffect, useRef } from "react";

import "./Dropdown.css";

function Dropdown(props) {
  const dropdownRef = useRef();

  // handle dropdown trigger
  const handleClick = (event) => {
    if (
      dropdownRef &&
      !dropdownRef?.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose();
  };

  //   add and remove eventlistener
  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      ref={dropdownRef}
      className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
