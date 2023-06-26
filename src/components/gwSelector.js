import React from "react";
import fixtureCardStyles from './fixtureCard.module.scss'
import gwSelectorStyles from './gwSelector.module.scss'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const GWSelector = ({gwCounter, callback}) => {

    const maxGW = 38;
    const minGW = 0;
    let selectedGWTitle;

    gwCounter > 0 ? (
        selectedGWTitle = `Gameweek ${gwCounter}`
    ): selectedGWTitle = 'Gameweek unassigned'

    function changeCounter(changeBy) {
        
        gwCounter = gwCounter + changeBy;
        
        if (gwCounter > maxGW) {
            gwCounter = minGW;           
        } 
        else if (gwCounter < minGW) {
            gwCounter = maxGW;
        }     
        
        callback(gwCounter);
    }
    
    return (
            <div className={gwSelectorStyles.gwCounter}>
                <Button className={fixtureCardStyles.button} onClick={()=> changeCounter(-1)}>&lt;</Button>
                    <div className={gwSelectorStyles.gwCounterSpacing}>{selectedGWTitle}</div>                
                <Button className={fixtureCardStyles.button} onClick={()=> changeCounter(+1)}>&gt;</Button>
            </div>          
    )
}

export default GWSelector