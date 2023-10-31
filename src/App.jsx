/* eslint-disable no-undef */
import Board from "./components/Board/Board";
import Editable from "./components/editableInput/EditableInput";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // hide icon when toggle
  const [isToggle, setToggle] = useState(true);
  console.log(isToggle);

  // main tasks state and get from localStorage
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("taskBoard")) || []
  );

  // target set for draggable
  const [target, setTarget] = useState({
    cardId: "",
    boardId: "",
  });

  // add Task Card
  const addTaskCard = (title, boardId) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      startDate: "",
      endDate: "",
      description: "",
    };

    // find index for board
    const index = boards.findIndex((item) => item.id === boardId);
    if (index < 0) return;
    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  // remove Task Card
  const removeTaskCard = (cardId, boardId) => {
    const boardInx = boards.findIndex((item) => item.id === boardId);
    if (boardInx < 0) return;
    const cardInx = boards[boardInx].cards.findIndex(
      (item) => item.id === cardId
    );
    if (cardInx < 0) return;
    const tempBoards = [...boards];
    tempBoards[boardInx].cards.splice(cardInx, 1);
    setBoards(tempBoards);
  };

  // addBoard
  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ]);
  };

  // remove board
  const removeBoard = (boardId) => {
    const tempBoards = boards.filter((item) => item.id !== boardId);
    setBoards(tempBoards);
  };

  // handle onDragEnd task card
  const handleDragEnd = (cardId, boardId) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;
    s_bIndex = boards.findIndex((item) => item.id === boardId);
    if (s_bIndex < 0) {
      return;
    }
    s_cIndex = boards[s_bIndex].cards.findIndex((item) => item.id === cardId);
    if (s_cIndex < 0) {
      return;
    }

    t_bIndex = boards.findIndex((item) => item.id === target.boardId);
    if (t_bIndex < 0) {
      return;
    }
    t_cIndex = boards[t_bIndex].cards.findIndex(
      (item) => item.id === target.cardId
    );
    if (t_cIndex < 0) {
      return;
    }
    const tempBoards = [...boards];
    const tempCards = tempBoards[s_bIndex].cards[s_cIndex];
    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCards);
    setBoards(tempBoards);
  };

  // handle onDragEnter task card
  const handleDragEnter = (cardId, boardId) => {
    setTarget({
      cardId,
      boardId,
    });
  };

  // update task card
  const updateCard = (cardId, boardId, card) => {
    const boardInx = boards.findIndex((item) => item.id === boardId);
    if (boardInx < 0) return;
    const cardInx = boards[boardInx].cards.findIndex(
      (item) => item.id === cardId
    );
    if (cardInx < 0) return;
    const tempBoards = [...boards];
    tempBoards[boardInx].cards[cardInx] = card;
    setBoards(tempBoards);
  };

  // set in local storage
  useEffect(() => {
    localStorage.setItem("taskBoard", JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="app">
      <div className="app_navbar">
        <h2 style={{ color: "red", fontSize: "28px" }}>
          Task Management System
        </h2>
        <span>Make your own Board then add you task as much as you want</span>
        <br />
        <span>
          Click:-Add Board to make your own board:ex:-TODO, InProgress, DONE
        </span>
      </div>

      <div className="app_outer">
        <div className="app_boards ">
          {boards.map((item) => {
            return (
              <Board
                key={item.id}
                board={item}
                addTaskCard={addTaskCard}
                removeBoard={removeBoard}
                removeTaskCard={removeTaskCard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                updateCard={updateCard}
              />
            );
          })}

          <div className="app_boards_board">
            <div style={{ position: "relative" }}>
              <div onClick={() => setToggle(!isToggle)}>
                <Editable
                  displayClass="app_boards_board_add"
                  text="Add Board"
                  placeholder="ex:-ToDo || InProgress || Completed"
                  buttonText="Set Board"
                  onSubmit={(value) => addBoard(value)}
                />
              </div>
              {isToggle && (
                <div
                  style={{
                    position: "absolute",
                    top: -5,
                    left: 10,
                    color: "white",
                    fontSize: "40px",
                  }}
                >
                  +
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
