import { useState } from 'react';
import { Chip } from '@mui/material';
import '../App.css';

function createShowList(answerList, reveledList) {
    let retList = []
    for (let i = 0; i < 9; i++) {
        if (reveledList[i] === 1) {
            retList.push(answerList[i])
        }
        else retList.push(" ")
    }
    return retList
}


function InnerGrid(props) {

    const answerList = props.listCase[0];
    const reveledList = props.listCase[1];
    const [showList, setShowList] = useState(createShowList(answerList, reveledList));
    const [update, setUpdate] = useState(false);


    //handle click on cases
    function handleClick(event, key, i) {
        setUpdate(!update);
        const newNum = props.chosenNumber;
        const numList = showList;
        numList[i] = newNum
        setShowList(numList);
        let isEqual = true
        for (let index=0;index<9;index++){
            if (numList[index] !== answerList[index]){isEqual = false}
        }
        props.handleVerif(key,isEqual)
    }

    //handle color for cases
    function handleColor (i) {
        if (!props.isVerified && props.chosenNumber === showList[i] && props.chosenNumber !== " ") {return "case darkgray"}
        else if (!props.isVerified) {return "case gray"}
        else if (answerList[i] === showList[i] && props.chosenNumber === answerList[i]) {return "case darkgreen"}
        else if (answerList[i] === showList[i] ) {return "case green"}
        else {return "case red"}
    }

    function handleReveledColor (i) {
        if (props.chosenNumber === answerList[i]) {return "case darkblue"}
        else {return "case blue"}
    }

    return (

        (showList) && <div className="inner-grid">
            {showList.map((num, i) => <button
                className={(reveledList[i] === 1) ? handleReveledColor (i) : handleColor(i)}
                key={props.cle + i}
                onClick={(e) => handleClick(e, props.cle, i)}
                disabled={(reveledList[i] === 1)}
            >
                {(reveledList[i] === 1 || num === " ") ? num : 
                <Chip label={num} />}
                
            </button>)}
        </div>
    )
}

export default InnerGrid;