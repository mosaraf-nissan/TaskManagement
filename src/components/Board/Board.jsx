import React, { useState } from "react";
// style file
import "./board.css";
// import react-icons
import { FiMoreHorizontal } from "react-icons/fi";
import Card from "../card/Card";
import Editable from "../editableInput/Editable";
import Dropdown from "../dropdown/Dropdown";

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props?.board?.title}{" "}
          <span style={{ marginLeft: "5px" }}>
            {" "}
            {`${props?.board?.cards?.length}`}
          </span>
        </p>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="board_top_more"
        >
          <FiMoreHorizontal style={{ cursor: "pointer" }} />
          {showDropdown && (
            <Dropdown onClick={() => setShowDropdown(false)}>
              <div className="board_dropdown">
                <p
                  onClick={() => props.removeBoard(props?.board?.id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete Board
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => {
          return (
            <Card
              key={item.id}
              card={item}
              removeTaskCard={props?.removeTaskCard}
              boardId={props.board?.id}
              handleDragEnd={props?.handleDragEnd}
              handleDragEnter={props?.handleDragEnter}
              updateCard={props?.updateCard}
            />
          );
        })}

        <Editable
          displayClass="board_cards_add"
          text="Create Task"
          maxLength={100}
          placeholder="Enter Task Title"
          buttonText="Set Task"
          onSubmit={(value) => props?.addTaskCard(value, props?.board?.id)}
        />
      </div>
    </div>
  );
};

export default Board;
