import React,{useState,useEffect,useCallback} from 'react'
import './mainmain.css'
import LotteryNumbers from "../LotteryBounceEffect";
// import {Bu}
import BullBull from './trial';


const Section1data =[
    {
        first:[
            'Bull big',
            'Bull odd'
         ]
    },
    {
        second:[
            'Bull 1',
            'Bull 2',
            'Bull 3',
            'Bull 4',
            'Bull 5',
            'Bull 6',
            'Bull 7',
            'Bull 8',
            'Bull 9',
            'Bull Bull',
            'No Bull',

         ]
    },
    {
        third:[
            'Bull small',
            'Bull even'
         ]
    },
   
]


const Section2data =[
    {
        max:[
            'ten thousand',
            'thousand',
            'hundreds',
            'tens',
            'once',
         ]
    },
    {
        min:[
            'Ten thousand',
            'Thousand',
            'Hundreds',
            'Tens',
            'Once',
         ]
    },
    {
        third:[
            'Dragon',
            'Tiger',
            'And'
         ]
    },
   
]
const MoneyData = [1,5,10,50,100,500,1000]

function BoardGames() {



    const [selectedValue,setValue] = useState([])
    const [money,setMoney] =  useState(1)
    const [drawNumbers, setDrawNumbers] = useState([]);
    const [highlight,setHighLight] = useState([])



    const [timeRemaining, setTimeRemaining] = useState(
      parseInt(localStorage.getItem("timeRemaining")) || 10
    );
    const [randomNumber, setRandomNumber] = useState(
      localStorage.getItem("randomNumber") || 0
    );
  
    const RenderTimer = useCallback(
      ({ randomNumber }) => (
        <center>
          <div
            style={{
              marginTop: 100,
              padding: 10,
              width: 400,
              overflow: "hidden"
            }}
          >
            <LotteryNumbers
              numbers={randomNumber.toString().split("").map(Number)}
            />
          </div>
        </center>
      ),
      [randomNumber]
    );
  
    function generateRandomNumber() {
      const randomNumber = Math.floor(Math.random() * 100000).toString(10);
      return randomNumber.padStart(5, "0");
    }
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
  
      if (timeRemaining === 0) {
        clearInterval(intervalId);
      }
  
      return () => clearInterval(intervalId);
    }, [timeRemaining]);
  
    useEffect(() => {
      localStorage.setItem("timeRemaining", timeRemaining);
  
      if (timeRemaining === 0) {
        setTimeRemaining(10);
        let random_number = generateRandomNumber();
        localStorage.setItem("randomNumber", random_number);
        setRandomNumber(random_number);
      }
    }, [timeRemaining]);
  
    useEffect(() => {
      setDrawNumbers((prev) => [
        ...prev,
        randomNumber.toString().split("").map(Number)
      ]);
      console.log("history :", drawNumbers);
    }, [randomNumber]);
  
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    };
  


    const addMoney = (value, money) => {
        const existingObject = selectedValue.find(obj => obj.value === value);
      
        if (existingObject) {
          // If the object already exists in the array, update its money value
          const updatedObject = {
            ...existingObject,
            money: existingObject.money + money
          };
          setValue(prevValue => prevValue.map(obj => obj.value === value ? updatedObject : obj));
        } else {
          // If the object doesn't exist in the array, add it to the array
          setValue(prevValue => [...prevValue, { value, money }]);
        }
      };

      
    
      

    


    useEffect(()=>{
      const nr = randomNumber.toString().split("").map(Number)
      console.log('>>>',nr)
        // console.log(checkBullBull(nr))
        console.log('xxxxxxxxx*',BullBull(nr))

        const final = BullBull(nr);
        if (final === 'Does not qualify as bull bull') {
          setHighLight([]);
          setValue([])
        }else{
          setHighLight(final);
          setTimeout(()=>{
            setValue([])
          },3000)
        }



        console.log('high::',highlight)


    },[randomNumber])


    const TotalValue = selectedValue.reduce((total,obj)=>total + obj.money,0)

  return (
    <>
      <center>
        <h1 className="time_remaining">{formatTime(timeRemaining)}</h1>
      </center>
      <div className="barbox">
        <div
          style={{ width: timeRemaining * 10 + "%", transition: 0.3 + "s" }}
          className="bar"
        ></div>
      </div>

       {randomNumber && <RenderTimer randomNumber={randomNumber} />}
    
    
       <div className='board1'>
        <div className='board2'>
            <div className='board3'>
               <div className='arfro'>

                  <div className='b1'>
                   {Section1data[0].first.map((item,i)=>{
                   
                   const isPart  = selectedValue.find(data=>data.value === item)
                   const high = highlight.find(y=> y === item)
                   
                   return (
                        <div  onClick={()=>addMoney(item,money)} 
                        className={`gr ${high ? 'blink' : ''}`} // Apply the 'blink' class conditionally
                        >
                             {isPart?(
                                <div className='ballmoney'>{isPart.money}</div>
                             ):null}
                            {item}
                        </div>
                   )})}
                  </div>

                  <div className='b12'>
                   {Section1data[1].second.map((item,i)=>{
                   const isPart  = selectedValue.find(data=>data.value === item)
                   const high = highlight.find(y=> y === item)
                   return (
                        <div  onClick={()=>addMoney(item,money)} 
                        className={`gr2 ${high ? 'blink' : ''}`}>
                              {isPart?(
                                <div className='ballmoney'>{isPart.money}</div>
                             ):null}
                           <div  className='xx'>{item}</div>
                        </div>
                   )}
                   )}
                  </div>
                  <div className='b1'>
                   {Section1data[2].third.map((item,i)=>{
                   const isPart  = selectedValue.find(data=>data.value === item)
                   const high = highlight.find(y=> y === item)
                   
                   return (
                        <div  onClick={()=>addMoney(item,money)}  className={`gr ${high ? 'blink' : ''}`}>
                           
                            {item}
                            {isPart?(
                                <div className='ballmoney'>{isPart.money}</div>
                             ):null}
                        </div>
                   )})}
                  </div>
               </div>


               <div className='arfro2'>

                <div className='tit'>
                     <div className='fd'>
                       <div className='cc'>
                          MAXIMUM
                       </div> 
                     </div>
                     <div className='fd'>
                        <div className='cc'>
                            MINIMUM
                        </div> 
                     </div>
                </div>

                 <div className='b12x'>
                   {Section2data[0].max.map((item,i)=>{
                   const isPart  = selectedValue.find(data=>data.value === item)
                   const high = highlight.find(y=> y === item)
                   
                   
                   return (
                        <div   onClick={()=>addMoney(item,money)} className={`gr2 ${high ? 'blink' : ''}`}>
                              {isPart?(
                                <div className='ballmoney'>{isPart.money}</div>
                             ):null}
                           <div className='xx'>{item}</div>
                        </div>
                   )})}

                   {Section2data[1].min.map((item,i)=>{
                   const isPart  = selectedValue.find(data=>data.value === item)
                   const high = highlight.find(y=> y === item)
                   
                   
                   return (
                        <div   onClick={()=>addMoney(item,money)} className={`gr2 ${high ? 'blink' : ''}`}>
                              {isPart?(
                                <div className='ballmoney'>{isPart.money}</div>
                             ):null}
                           <div className='xx'>{item}</div>
                        </div>
                   )})}

                  </div>

                  <div className='b1'>
                    {Section2data[2].third.map((item,i)=>{
                  
                    const isPart  = selectedValue.find(data=>data.value === item)
                    const high = highlight.find(y=> y === item)
                    
                    
                    return (
                            <div  onClick={()=>addMoney(item,money)} className={`gr ${high ? 'blink' : ''}`}>
                                {item}
                                {isPart?(
                                <div className='ballmoney'>{isPart.money}</div>
                             ):null}
                            </div>
                    )})}
                  </div>

               </div>

               <div className={'moneystyle'}>
                    <div className='moneybox'>
                        {MoneyData.map((data)=>(
                            <div style={{transform:data === money?'scale(1.5)':null}} onClick={()=>setMoney(data)} className='mo'>
                                <div className='bal'>{data}</div>
                            </div>
                        ))}
                    </div>
                    <div className='betbutt'>
                        <div className='sa'>
                            Bet
                        </div>                                                                                               
                    </div>
                    <div className='moneys'>
                        {TotalValue} yarn                                                                          
                    </div>
               </div>

               
            </div>
        </div>
    </div>
    </>
   
  )
}

export default BoardGames