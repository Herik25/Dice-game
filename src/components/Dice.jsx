import React from "react";
import './Dice.css';

function Dice(props) {

    function addDots(){
        if (props.value === 1) {
            return 'one'
        }
        else if(props.value === 2) {
            return 'two'
        }
        else if(props.value === 3) {
            return 'three'
        }
        else if(props.value === 4) {
            return 'four'
        }
        else if(props.value === 5) {
            return 'five'
        }
        else {
            return 'six'
        }
    }

    return(
        <div
            className={`dice ${props.isHeld && 'green'}`}
            onClick={props.holdDice}
        >
            <div className={`${addDots()}`}>
                <div><span></span></div>
            </div>
        </div>
    )
}

export default Dice