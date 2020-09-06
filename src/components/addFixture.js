import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component
import addFixtureStyles from './addFixture.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.css';
    
async function getFixtures() { //this should be placed in api as /updateGameweek
    
    const fixtureArray = await fetch("http://localhost:9000/getAllFixtures")
        .then(response => response.json());
    
    console.log("This won't run until the await has finished");
    console.log(fixtureArray);

    //use fixtureArray to show all fixtures per gw
}

async function updateGameweek() { //this should be placed in api as /updateGameweek (need to call updateGameweek api in here)
    
    //get json file in order to edit it
    const fixtureArray = await fetch("http://localhost:9000/getAllFixtures")
        .then(response => response.json());
    
    console.log("This won't run until the await has finished");
    console.log(fixtureArray);

    let gameWeekID = 30; //pass gameWeek as args
    let fixtureToMoveIndex = fixtureArray[0].rounds[0].matches.findIndex(e => e.fixtureId === "EVELIV28373"); //pass fixtureId as args

    console.log("Index of fixture to be moved:");
    console.log(fixtureToMoveIndex);

    let fixture = fixtureArray[0].rounds[0].matches[fixtureToMoveIndex]

    fixtureArray[0].rounds[0].matches.splice(fixtureToMoveIndex, 1);
    console.log("Fixture:");
    console.log(fixture);

    let gameWeekIndex = fixtureArray[0].rounds.findIndex(e => e.gw === gameWeekID);
    console.log("GW index:");
    console.log(gameWeekIndex);

    fixtureArray[0].rounds[gameWeekIndex].matches.push(fixture);
    console.log("GW index 2:");
    console.log(fixtureArray[0].rounds[gameWeekIndex]);
    
    console.log("Array:");
    console.log(fixtureArray);
}

export default function AddFixture() {

    const [fixtures, setFixtures] = useState({
        name: '',
        rounds: [],
    });

    const url = "http://localhost:9000/generateFixtures";

    useEffect(() => { //mounts
        fetch(url)
            .then(response => response.json())
            .then(data => setFixtures(data && data[0] || fixtures));
    }, []);

    return (
        <div className={addFixtureStyles.wrapper}>
            <div>teams</div>
            <div className={addFixtureStyles.btnSubmit}>
                <Button id='btnGenerateFixtureList' variant="primary" onClick={() => alert("Need to generate fixtures on button click, not on page load.")}>Generate Fixtures</Button> 
                <div>
                    <span>Round Name: {fixtures.name}</span>
                    <span>Round Length: {fixtures.rounds.length}</span>
                </div>
                
            </div>  
            <div className={addFixtureStyles.btnSubmit}>
                <Button id='btnUpdateGameweek' variant="primary" onClick={() => updateGameweek()}>Update Gameweek</Button>
            </div> 
        </div>    
)}

//Change home/away teams to be dropdown box or type (select from existing teams)
/*const AddFixture = () => {
    return (
        <div className={addFixtureStyles.wrapper}>
            <div className={addFixtureStyles.controlSpacing}>
                <Form.Control placeholder="Home Team" />  
                <label className={addFixtureStyles.versusText}>vs</label> 
                <Form.Control placeholder="Away Team" />          
            </div>           
            <div className={addFixtureStyles.controlSpacing}>
                <label for="start">Fixture Date:</label>
                <input type="date" id="start" name="trip-start"
                    value="2018-07-22"
                    min="2018-01-01" max="2018-12-31">
                </input>
            </div>
            <DropdownButton alignRight title="Gameweek" id="dropdown-menu-gw">
                <div className={addFixtureStyles.dropdownMenu}>
                    {gwOptions.map((gw, i) => <Dropdown.Item key={i}><Dropdown.Divider/>{gw.value}</Dropdown.Item>)}
                </div>
            </DropdownButton>
            <div className={addFixtureStyles.btnSubmit}>
                <Button variant="primary">Primary</Button>{' '}
            </div>          
        </div>
    )
}

export default AddFixture*/

