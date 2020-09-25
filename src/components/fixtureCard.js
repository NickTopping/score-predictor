import React, { useState, useEffect } from "react";
import fixtureCardStyles from './fixtureCard.module.scss'
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.css';

var gwOptions = [];

for (var i = 0; i <= 38; i++) {
    gwOptions.push(i);
}

//Change home/away teams to be dropdown box or type (select from existing teams)
const FixtureCard = () => { //state/props to accept value and map list of fixtures per gw
    return (
        <div className={fixtureCardStyles.wrapper}>
            <div className={fixtureCardStyles.card}>
                <div className={fixtureCardStyles.teams}>
                    <div className={fixtureCardStyles.teamsText}>Home Team</div>
                    <div className={fixtureCardStyles.teamsText}>vs</div> 
                    <div className={fixtureCardStyles.teamsText}>Away Team</div>   
                    <Dropdown as={ButtonGroup}>
                        <Button variant="primary">Gameweek</Button>
                        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                        <Dropdown.Menu className={fixtureCardStyles.dropdownMenu}>
                            {gwOptions.map((gw, i) => <Dropdown.Item className={fixtureCardStyles.dropdownItem} key={i}>{gw}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>                        
                <div>
                    <label for="start">Fixture Date:</label>
                    <input type="date" id="start" name="trip-start"
                        value="2018-07-22"
                        min="2018-01-01" max="2018-12-31">
                    </input>
                </div>                
                <div className={fixtureCardStyles.btnSubmit}>
                    <Button variant="primary">Primary</Button>{' '}
                </div> 
            </div>         
        </div>
    )
}

export default FixtureCard