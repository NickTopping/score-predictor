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

async function updateGameweek(newGW, fixtureId) { //this should be placed in api as /updateGameweek (need to call updateGameweek api in here)
    
    //const newGW = 4;
    //const fixtureId = "WOLSHE80172";

    const fixtureArray = await fetch("http://localhost:9000/updateGameweek/" + newGW + "/" + fixtureId)
        //.then(response => response.json());
        .then(response => response);
    
    console.log("This won't run until the await has finished");
    //console.log("client-side response: " + response);
    //console.log(fixtureArray);
}

export default function AddFixture() {

    const [fixtures, setFixtures] = useState({
        name: '',
        rounds: [],
    });

    const [newGW, setNewGW] = useState('');
    const [fixtureId, setfixtureId] = useState('');

    const url = "http://localhost:9000/generateFixtures";

    useEffect(() => { //mounts
        fetch(url)
            .then(response => response.json())
            .then(data => setFixtures(data && data[0] || fixtures));
    }, []);

    return (
        <div className={addFixtureStyles.wrapper}>
            <div className={addFixtureStyles.btnSubmit}>
                <Button id='btnGenerateFixtureList' variant="primary" onClick={() => alert("Need to generate fixtures on button click, not on page load.")}>Generate Fixtures</Button> 
                <div>
                    <span>Round Name: {fixtures.name}</span>
                    <span>Round Length: {fixtures.rounds.length}</span>
                </div>                
            </div>  
            <label>
                New Gameweek:
                <input type="text" class="form-control" id="newGW" onChange={event => setNewGW(event.target.value)}></input>
            </label>          
            <label>
                FixtureId:
                <input type="text" class="form-control" id="fixture" onChange={event => setfixtureId(event.target.value)}></input>
            </label>           
            <div className={addFixtureStyles.btnSubmit}>
                <Button id='btnUpdateGameweek' variant="primary" onClick={() => updateGameweek(newGW, fixtureId)}>Update Gameweek</Button>
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

