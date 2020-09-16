import React, { useState } from "react";

//importing react-icons for icons
import Icon from "./components/Icon";

//importing react-toastify for notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//importing reactstrap for prebuilt bootstrap-4 classes
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
const itemArray = new Array(9).fill("empty");

function App() {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("click reload to start game!");

  //function to reload game!
  const reloadGame = () => {
    setIsCross(false); //reset isCross to false
    setWinMessage(""); //set winner to ""
    itemArray.fill("empty", 0, 9); //set array to empty value
  };

  //function to check winner
  const checkIsWinner = (itemNumber) => {
    //  checking  winner of the game

    //below 3 conditions for checking cross in rows
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    }
    //below 3 conditions for checking cross in columns
    else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    }
    //below 2 conditions for checking cross in diagnols
    else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    }

    //check for match draw not working!
    else {
      let totalMoves = 0;
      for (let i in itemArray) {
        if (itemArray[i] !== "empty") totalMoves++;
      }
      if (totalMoves === itemArray.length)
        setWinMessage(setWinMessage(`Match Drawn!`));
    }
  };

  //function to flip the chance/turns
  const changeItem = (itemNumber) => {
    //if found a winner
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    //no winner found and current card is empty
    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross); //flip the chance
    }
    //no winner found and card is not empty  (i think here i need to add logic of case==="draw" ie no one wins) come back here!
    else {
      return toast("already filled", { type: "error" });
    }
    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-primary text-uppercase text-center">
                {winMessage}
              </h1>
              <Button color="success" block onClick={reloadGame}>
                Reload the Game
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-success">
              {isCross ? "Cross's " : "Circle's "}turn
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card color="warning" onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item}></Icon>
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
