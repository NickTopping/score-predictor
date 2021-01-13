import React from "react";
import fixtureCardStyles from './fixtureCard.module.scss'
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.css';

var gwOptions = [];

for (var i = 0; i <= 38; i++) {
    gwOptions.push(i);
}

const FixtureCard = ({ match }) => { //state/props to accept value and map list of fixtures per gw

    return (
        <div className={fixtureCardStyles.wrapper}>
            <div className={fixtureCardStyles.card}>
                <div className={fixtureCardStyles.teams}>
                    <div className={fixtureCardStyles.teamsText}>{match.homeTeamName}</div>
                    <div className={fixtureCardStyles.teamsText}>vs</div> 
                    <div className={fixtureCardStyles.teamsText}>{match.awayTeamName}</div>                     
                </div>   
                <div className={fixtureCardStyles.dropdownFull}>
                    <Dropdown as={ButtonGroup}>
                        <Button className={fixtureCardStyles.button}>Gameweek</Button>
                        <Dropdown.Toggle split className={fixtureCardStyles.button} id="dropdown-split-basic" />
                        <Dropdown.Menu className={fixtureCardStyles.dropdownMenu}>
                            {gwOptions.map((gw, i) => <Dropdown.Item className={fixtureCardStyles.dropdownItem} key={i}>{gw}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>    
                </div>                 
                {/*<div>
                    <label for="start">Fixture Date:</label>
                    <input type="date" id="start" name="trip-start"
                        value="2018-07-22"
                        min="2018-01-01" max="2018-12-31">
                    </input>
                </div>*/}                
            </div>         
        </div>
    )
}

export default FixtureCard