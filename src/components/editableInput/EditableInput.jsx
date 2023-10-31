/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "./editabl.css";

const Editable = (props) => {
  const [showEdit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(props.default || "");

  // input validation
  function validateForm() {
    if (!inputValue) {
      alert("This field is required");
      return;
    } else if (props.maxLength && inputValue.length > props.maxLength) {
      alert(`Maximum ${props.maxLength} characters allowed`);
      return;
    }
  }

  return (
    <div className="editable">
      {showEdit ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (props.onSubmit) {
              props?.onSubmit(inputValue);
              setEdit(false);
              setInputValue("");
            }
          }}
          className={`editable_edit ${props?.editClass || ""}`}
        >
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={props?.placeholder || "Enter Item"}
            required
          />
          <div className="editable_edit_footer">
            <button onClick={() => validateForm()} type="submit">
              {props?.buttonText || "Add"}
            </button>
            {/* close button */}
            <RiCloseCircleFill
              style={{
                fontSize: "24px",
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => setEdit(false)}
            />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${props?.displayClass || ""}`}
          onClick={() => setEdit(true)}
        >
          {props?.text || "Add Item"}
        </p>
      )}
    </div>
  );
};

export default Editable;
