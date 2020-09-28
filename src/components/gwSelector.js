import React, { useState } from "react";
import fixtureCardStyles from './fixtureCard.module.scss'
import gwSelectorStyles from './gwSelector.module.scss'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const GWSelector = () => {

    const [gwCounter, setGWCounter] = useState(0);
    
    return (
            <div className={gwSelectorStyles.gwCounter}>
                <Button className={fixtureCardStyles.button} onClick={() => setGWCounter(gwCounter - 1)}>&lt;</Button>
                <div className={gwSelectorStyles.gwCounterSpacing}>Gameweek {gwCounter}</div>
                <Button className={fixtureCardStyles.button} onClick={() => setGWCounter(gwCounter + 1)}>&gt;</Button>
            </div>          
    )
}

export default GWSelector