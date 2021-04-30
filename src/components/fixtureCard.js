import React, { useState } from "react";
import fixtureCardStyles from './fixtureCard.module.scss'
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.css';

var newGWArray = [];
var gwOptions = [];

for (var i = 0; i <= 38; i++) {
    gwOptions.push(i.toString()); //Converted to string as 0 was being passed as null for the handleSelect event parameter
}

const FixtureCard = ({ match, setChangedGWArray }) => {

    const [selectedGw, setSelectedGw] = useState(0);
    const handleSelect = (e) => {
        
        console.log(match.fixtureId)
        console.log(e);
     
        setSelectedGw(e);
        
        //if array already contains fixtureId, update
        if (newGWArray.some(e => e.fixtureId === match.fixtureId)) {          
            var fixtureIndex = newGWArray.findIndex((obj => obj.fixtureId === match.fixtureId));
            newGWArray[fixtureIndex].newGW = e;
        }
        //else, add new fixtureId to array
        else {
            newGWArray.push( 
                {
                    fixtureId: match.fixtureId,  
                    gw: e                     
                });
        }
        //TODO
        //if array already contains fixtureId, but now the gw has been reset to current value, remove from array (and/or create a "Cancel" button)

        setChangedGWArray(newGWArray); //useState call
    }
    
    return (
        <div className={fixtureCardStyles.wrapper}>
            <div className={fixtureCardStyles.card}>
                <div className={fixtureCardStyles.teams}>
                    <div className={fixtureCardStyles.teamsText}>{match.homeTeamName}</div>
                    <div className={fixtureCardStyles.teamsText}>vs</div> 
                    <div className={fixtureCardStyles.teamsText}>{match.awayTeamName}</div>                          
                </div> 
                <div className={fixtureCardStyles.dropdownFull}>
                    <Dropdown as={ButtonGroup} onSelect={handleSelect}>
                        <Button className={fixtureCardStyles.button}>Gameweek {selectedGw}</Button> {/*selectedGw needs to match the gameweek currently assigned to the match*/}
                        <Dropdown.Toggle split className={fixtureCardStyles.button} id="dropdown-split-basic" />
                        <Dropdown.Menu className={fixtureCardStyles.dropdownMenu}>
                            {gwOptions.map((gw, i) => <Dropdown.Item className={fixtureCardStyles.dropdownItem} key={i} eventKey={gw}>{gw}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>                 
                {/*retrieve current fixture date from {match.date}
                <div>
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