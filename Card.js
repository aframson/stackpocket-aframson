import React from 'react'
import './main.css'
function Card() {
  return (
    <div className='mainCard'> 
        <div className='titlev'>1 vs 2</div>
        <div className='bitebox'>
            <div id='b1' className='bite'></div>
            <div className='line'></div>
            <div id='b2' className='bite'></div>
        </div>
        <div className='grinp'>
            <div className='vrow'>
               <div id='ft' className='tx'>dragon</div>
               <div id='ft' className='numbv'>9.344</div>
               <div id='ft2' className='inputbox'>
                  <input className='iin' type='text' placeholder='Amount'/>
               </div>
            </div>
            <div className='vrow'>
               <div id='ft' className='tx'>dragon</div>
               <div id='ft' className='numbv'>9.344</div>
               <div id='ft2' className='inputbox'>
                  <input className='iin' type='text' placeholder='Amount'/>
               </div>
            </div>
            <div className='vrow'>
               <div  id='ft' className='tx'>dragon</div>
               <div id='ft' className='numbv'>9.344</div>
               <div id='ft2' className='inputbox'>
                  <input className='iin' type='text' placeholder='Amount'/>
               </div>
            </div>
        </div>

    </div>
  )
}

export default Card