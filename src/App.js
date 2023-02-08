import { useState } from 'react';
import InnerGrid from './innerGrid/innerGrid';
import { Button, ButtonGroup } from '@mui/material';

import './App.css';

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function randomOneList (difficulty){
  let firstList = [0,0,0,0,0,0,0,0,0];
  for (let i = 0;i<9;i++){
    if (Math.random() > difficulty) {
      firstList[i] = 1;
    }
  }
  return firstList;
}


function create(){
  let number = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  let list1 = number.slice(0,3);
  let list2 = number.slice(3,6);
  let list3 = number.slice(-3);

  let list4 = [list1[2],list1[0],list1[1]];
  let list5 = [list2[1],list2[2],list2[0]];
  let list6 = [list3[1],list3[2],list3[0]];

  let list7 = [list1[1],list1[2],list1[0]];
  let list8 = [list2[2],list2[0],list2[1]];
  let list9 = [list3[2],list3[0],list3[1]];

  const diff = 0.33;

  const listCase =[
    [list1.concat(list2).concat(list3), randomOneList(diff)],
    [list3.concat(list1).concat(list2), randomOneList(diff)],
    [list2.concat(list3).concat(list1), randomOneList(diff)],
    [list4.concat(list5).concat(list6), randomOneList(diff)],
    [list6.concat(list4).concat(list5), randomOneList(diff)],
    [list5.concat(list6).concat(list4), randomOneList(diff)],
    [list7.concat(list8).concat(list9), randomOneList(diff)],
    [list9.concat(list7).concat(list8), randomOneList(diff)],
    [list8.concat(list9).concat(list7), randomOneList(diff)],

  ]
  console.log("here",listCase)
  return listCase
}

function verif(array) {
  let newVerif = [false,false,false,false,false,false,false,false,false]

  for (let i = 0;i<9;i++){
    if (!array[i][1].includes(0)) {newVerif[i] = true}
  }
  console.log(newVerif)
  return newVerif
  }


function App() {
  // const value = [
  //   [[9, 7, 6, 2, 4, 1, 5, 8, 3], [1, 1, 0, 0, 1, 0, 1, 0, 1]],
  //   [[4, 8, 3, 5, 6, 9, 7, 2, 1], [1, 1, 1, 1, 0, 0, 1, 1, 0]],
  //   [[2, 1, 5, 8, 7, 3, 6, 4, 9], [1, 0, 1, 0, 0, 0, 1, 0, 1]],
  //   [[3, 9, 5, 7, 1, 8, 4, 6, 2], [1, 0, 1, 1, 1, 1, 1, 1, 0]],
  //   [[2, 4, 7, 6, 9, 5, 1, 3, 8], [0, 1, 1, 1, 1, 1, 0, 1, 0]],
  //   [[1, 6, 8, 3, 2, 4, 9, 5, 7], [1, 0, 0, 0, 1, 0, 0, 1, 0]],
  //   [[8, 5, 7, 1, 2, 9, 6, 3, 4], [0, 1, 1, 0, 1, 0, 0, 1, 0]],
  //   [[3, 1, 6, 8, 7, 4, 9, 5, 2], [1, 1, 0, 1, 1, 1, 0, 1, 0]],
  //   [[4, 9, 2, 5, 3, 6, 7, 8, 1], [0, 0, 1, 0, 0, 0, 1, 0, 1]]
  // ]
  
  const [value, setValue] = useState(() => create())

  let numberValue = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const [chosenNumber, setChosenNumber] = useState(1)
  const [isVerified, setIsVerified] = useState(false);
  const [isGridFinished, setIsGridFinished] = useState(() => verif(value));
  const [isFinished, setIsFinished] = useState(false)

  function handleClick(e, v) {
    setChosenNumber(v)
  }

  function handleVerif(i, bool) {
    let newList = isGridFinished;
    newList[i] = bool;
    setIsGridFinished(newList)
    if (!isGridFinished.includes(false)) {
      setIsFinished(true);
      console.log(isFinished)
    }
    else {setIsFinished(false);}
  }

  function handleVaraint(value) {
    if (value === chosenNumber) { return "contained" }
    else { return "outlined" }
  }

  function handleClickVerified() {
    setIsVerified(!isVerified);
  }

  return (
    <div className="App">
      <div className="grid">
        {value.map((v, i) => <InnerGrid 
          listCase={v} 
          cle={i} 
          chosenNumber={chosenNumber} 
          isVerified={isVerified} 
          handleVerif={handleVerif}
          key={i} >
          </InnerGrid>)}
      </div>

      <div className='actionMenu'>
        <ButtonGroup
          disableElevation
        >
          {numberValue.map((value, i) => <Button
            onClick={(e) => handleClick(e, value)}
            variant={handleVaraint(value)}
            key={i}>
            {value}
          </Button>
          )}
          <Button
            onClick={(e) => handleClick(e, " ")}
            variant={handleVaraint(" ")}
            key="_">
            _
          </Button>
        </ButtonGroup>
        <Button onClick={handleClickVerified}
          variant={(isVerified) ? "contained" : "outlined"}
          key={"hint"}
        >HINT</Button>
        
      </div>
      {(isFinished) && <div className='victory'>
        <div>VICTORY!!!</div>
        <Button  variant="contained" onClick={() => {document.location.reload()}}>New Grid</Button>
        </div>}
    </div>
  );
}

export default App;
