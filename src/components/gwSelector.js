import React, { useState } from "react";
import fixtureCardStyles from './fixtureCard.module.scss'
import gwSelectorStyles from './gwSelector.module.scss'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const GWSelector = () => {

    const [gwCounter, setGWCounter] = useState(0);
    const maxGW = 38;
    const minGW = 0;

    function decrementCounter() {
        //Don't go below 0, loop back to 38
        if (gwCounter !== minGW) {
            setGWCounter(gwCounter - 1)
        }
        else {
            setGWCounter(maxGW);
        }       
    }
    
    function incrementCounter() {
        //Don't go above 38, loop back to 0
        if (gwCounter !== maxGW) {
            setGWCounter(gwCounter + 1)
        }
        else {
            setGWCounter(minGW);
        }       
    }
    
    return (
            <div className={gwSelectorStyles.gwCounter}>
                <Button className={fixtureCardStyles.button} onClick={decrementCounter}>&lt;</Button>
                <div className={gwSelectorStyles.gwCounterSpacing}>Gameweek {gwCounter}</div>
                <Button className={fixtureCardStyles.button} onClick={incrementCounter}>&gt;</Button>
            </div>          
    )
}

export default GWSelector