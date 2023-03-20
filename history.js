import React from 'react'
import './main.css'



//  Conditions for rules of gametypes
const arrayFunc = (array) => {
    return {
      dragon: array.slice(0, 2).reduce((prev, curr) => prev > curr),
      tiger: array.slice(0, 2).reduce((prev, curr) => prev < curr),
      and: array.slice(0, 2).reduce((prev, curr) => prev === curr)
    };
  };
  

//   Draw Numbers
  const drawNumbers = [
    [9, 8, 3, 2, 7],
    [9, 1, 3, 2, 7],
    [7, 8, 3, 2, 7],
    [9, 9, 3, 2, 7],
    [7, 8, 3, 2, 7],
    [7, 8, 3, 2, 7],
    [7, 8, 3, 2, 7],
    [7, 8, 3, 2, 7],
    [7, 8, 3, 2, 7],
    [7, 7, 3, 2, 7],
    [7, 7, 3, 2, 7],
    [7, 7, 3, 2, 7],
    [9, 8, 3, 2, 7],
    [9, 8, 3, 2, 7],
    [9, 8, 3, 2, 7],
    [9, 8, 3, 2, 7],
    [9, 8, 3, 2, 7],
    [9, 8, 3, 2, 7],
  ];
  

//   results of game types from the draw numbers
  const arr = drawNumbers.map((drawNumber) => arrayFunc(drawNumber));

  
  let temp = {}; // individaul objects
  let result = []; // final results
  
  for (let i = 0; i < arr.length; i++) {
    for (let prop in arr[i]) {
      if (arr[i][prop]) {
        if (temp[prop]) {
          temp[prop]++;
        } else {
          temp[prop] = 1;
        }
      } else {
        if (temp[prop] && temp[prop] > 1) {
          result.push({
            typeOfPaly: prop,
            consecPeriod: `${temp[prop]} issues in a row`,
            coverTime: "00:17:54",
            opt1: "One",
            opt2: "Big"
          });
        }
        delete temp[prop];
      }
    }
  }
  
  for (let prop in temp) {
    if (temp[prop] > 1) {
      result.push({
        typeOfPaly: prop,
        consecPeriod: `${temp[prop]} issues in a row`,
        coverTime: "00:17:54",
        opt1: "One",
        opt2: "Big"
      });
    }
  }

  


function History() {
  return (
    <div className='tableboard'>
        <div className='thx'>
            <div className='txx'>Type of play</div>
            <div className='txx'>Consecutive Periods</div>
            <div className='txx'>Cover Time</div>
            <div className='txx'>Option1</div>
            <div className='txx'>Option2</div>
        </div>
        {result && result.map((item,i)=>{

              let isEven = (i % 2) === 0;

            return (
                <div style={{backgroundColor:isEven?'white':'#eaeaea'}} className='tb'>
                <div className='b'>{item.typeOfPaly}</div>
                <div className='b'>{item.consecPeriod}</div>
                <div className='b'>{item.coverTime}</div>
                <div className='b'><button className='opt' >{item.opt1}</button></div>
                <div className='b'><button className='opt' >{item.opt2}</button></div>
            </div>
            )
        })}
     
    </div>
  )
}

export default History