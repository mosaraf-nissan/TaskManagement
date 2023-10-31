/* eslint-disable no-undef */
import React, { useState } from "react";
import "./card.css";
import { FiMoreHorizontal, FiClock, FiCheckSquare } from "react-icons/fi";
import Chip from "../chips/Chip";
import Dropdown from "../dropdown/Dropdown";
import CardInfo from "./cardInfo/CardInfo";

const Card = (props) => {
  // toggle task card modal
  const [showModal, setModal] = useState(false);

  // toggle Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      {/* TASK CARD INFO MODAL */}
      {!showDropdown && showModal && (
        <CardInfo
          card={props.card}
          updateCard={props?.updateCard}
          boardId={props.boardId}
          onClose={() => setModal(false)}
        />
      )}
      <div
        style={{ backgroundColor: "#f5e1ce", color: "black" }}
        className="card"
        draggable={true}
        onDragEnter={() =>
          props?.handleDragEnter(props.card?.id, props.boardId)
        }
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
      >
        <div onClick={() => setModal(true)}>
          <div className="card_top">
            <div className="card_top_labels">
              {props.card?.labels?.map((item, index) => {
                return <Chip key={index} text={item.text} color={item.color} />;
              })}
            </div>
            <div
              className="card_top_more"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FiMoreHorizontal
                style={{
                  cursor: "pointer",
                }}
              />
              {showDropdown && (
                <Dropdown onClick={() => setShowDropdown(false)}>
                  <div className="card_dropdown">
                    <p
                      onClick={() =>
                        props?.removeTaskCard(props?.card?.id, props?.boardId)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      Delete Card
                    </p>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="card_title">Task title:- {props.card?.title}</div>
          <div className="card_footer">
            {props?.card?.startDate && (
              <p>
                <FiClock /> Str: {props.card?.startDate}
              </p>
            )}
          </div>
          <div className="card_footer">
            {props?.card?.endDate && (
              <p>
                {" "}
                <FiClock />
                End: {props.card?.endDate}
              </p>
            )}
            {props.card?.tasks?.length > 0 && (
              <p>
                <FiCheckSquare />
                {props.card?.tasks?.filter((item) => item.completed)?.length}/
                {props.card?.tasks?.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
