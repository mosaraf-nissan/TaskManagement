/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import "./cardInfo.css";
import Modal from "../../modal/Modal";
import { MdTitle } from "react-icons/md";
import Editable from "../../editableInput/Editable";
import {
  FiCalendar,
  FiCheckSquare,
  FiList,
  FiTag,
  FiTrash,
} from "react-icons/fi";
import Chip from "../../chips/Chip";

const CardInfo = (props) => {
  // setActive Color for tag
  const [isActive, setActiveColor] = useState("");

  //   total value state of obj
  const [values, setValues] = useState({ ...props.card });

  // colors Array
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  // calculate for progress the task
  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };
  console.log(calculatePercent());

  //   add tag fun
  const addLabel = (value, color) => {
    const index = values.labels?.findIndex((item) => item.text === value);
    if (index > -1) {
      return;
    }
    const label = {
      text: value,
      color,
    };
    setValues({ ...values, labels: [...values.labels, label] });
    setActiveColor("");
  };

  //   remove tag
  const removeLabels = (text) => {
    const tempLabels = values.labels?.filter((item) => item.text !== text);
    setValues({ ...values, labels: tempLabels });
  };

  // add Task
  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random(),
      text: value,
      completed: false,
    };

    setValues({ ...values, tasks: [...values.tasks, task] });
  };

  //   remove Task
  const removeTask = (id) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    console.log(index);
    if (index < 0) {
      return;
    }
    const tempTasks = values.tasks?.splice(index, 1);
    setValues({ ...values, task: tempTasks });
  };

  //   update Task
  const updateTask = (id, completed) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    const tempTasks = [...values.tasks];
    tempTasks[index].completed = completed;
    setValues({ ...values, tasks: tempTasks });
  };

  //  observing are values updated or not
  useEffect(() => {
    if (
      values.title === props.card?.title &&
      values.date === props.card?.date &&
      values.description === props.card?.date &&
      values.labels?.length === props.card?.labels?.length &&
      values.task?.length === props.card?.task?.length
    ) {
      return;
    }
    props.updateCard(props.card.id, props.boardId, values);
  }, [values]);

  return (
    <Modal onClose={() => props.onClose()}>
      <div style={{ backgroundColor: "#ede8e4" }} className="cardinfo">
        {/* Title Input */}
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <MdTitle />
            Title
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text={values.title}
              maxLength={100}
              placeholder="Enter Title"
              buttonText="Set Title"
              onSubmit={(value) => setValues({ ...values, title: value })}
            />
          </div>
        </div>

        {/* Description input */}
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <FiList />
            Description
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text={values.description}
              default={values.description}
              maxLength={150}
              placeholder="Enter Description"
              buttonText="Set Description"
              onSubmit={(value) => setValues({ ...values, description: value })}
            />
          </div>
        </div>

        {/* Start date input */}
        <div style={{ display: "flex" }}>
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <FiCalendar />
              Start Date
            </div>
            <div className="cardinfo_box_body">
              <input
                type="date"
                defaultValue={
                  values.date ? new Date().toISOString().substr(0, 10) : ""
                }
                onChange={(event) =>
                  setValues({ ...values, startDate: event.target.value })
                }
              />
            </div>
          </div>
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <FiCalendar />
              End Date
            </div>
            <div className="cardinfo_box_body">
              <input
                type="date"
                defaultValue={
                  values.date ? new Date().toISOString().substr(0, 10) : ""
                }
                onChange={(event) =>
                  setValues({ ...values, endDate: event.target.value })
                }
              />
            </div>
          </div>
        </div>
        {/* Label Tag */}
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <FiTag />
            Priority
          </div>
          <div className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <Chip
                key={index}
                close
                onClose={() => removeLabels(item?.text)}
                color={item.color}
                text={item.text}
              />
            ))}
          </div>
          <div className="cardinfo_box_colors">
            {colors.map((item, ind) => {
              return (
                <li
                  key={ind}
                  style={{ backgroundColor: item }}
                  className={item === isActive ? "active" : ""}
                  onClick={() => setActiveColor(item)}
                />
              );
            })}
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Set Priority"
              placeholder="Enter label here"
              buttonText="Add label"
              onSubmit={(value) => addLabel(value, isActive)}
            />
          </div>
        </div>
        {/* Task Progress */}
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <FiCheckSquare />
            Sub Task
          </div>
          <div className="cardinfo_box_progress-bar">
            <div
              className={`cardinfo_box_progress`}
              style={{
                width: calculatePercent() + "%",
                backgroundColor: calculatePercent() == "100" ? "limegreen" : "",
              }}
            ></div>
          </div>
          <div className="cardinfo_box_box_list">
            {values.tasks?.map((item) => {
              return (
                <div key={item.id} className="cardinfo_task">
                  <input
                    type="checkbox"
                    defaultValue={item.completed}
                    onChange={(event) =>
                      updateTask(item.id, event.target.checked)
                    }
                  />
                  <p>{item.text}</p>
                  <FiTrash onClick={() => removeTask(item.id)} />
                </div>
              );
            })}
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Add New Sub Task"
              placeholder="Enter Sub Task "
              buttonText="Set Sub Task"
              onSubmit={(value) => addTask(value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardInfo;
