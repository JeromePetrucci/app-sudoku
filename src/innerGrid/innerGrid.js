import { useState } from 'react';
import '../App.css';

function createShowList(answerList, reveledList) {
    let retList = []
    for (let i=0;i<9;i++) {
        if (reveledList[i] === 1){
            retList.push(answerList[i])
        }
        else retList.push("_")
    }
    return retList
}




function InnerGrid(props) {

    const answerList= props.listCase[0]
    const reveledList = props.listCase[1]
    const [showList, setShowList] = useState(createShowList(answerList, reveledList))



    function handleClick(event,key,i){
        console.log(key,i)
        //TODO setShowList
    }

    return (

    <div className="inner-grid">
        {showList.map( (num,i) =>  <div className="case" key={props.cle+i} onClick={(e) => handleClick(e,props.cle,i)}>
            
            {num}</div> )}
    </div>
)
}

export default InnerGrid;