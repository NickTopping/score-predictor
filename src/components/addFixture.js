import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component
import addFixtureStyles from './addFixture.module.scss'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import FixtureCard from "./fixtureCard";
import GWSelector from "./gwSelector";
    
async function getFixtures() {
    
    const fixtureArray = await fetch("http://localhost:9000/getAllFixtures")
        .then(response => response.json());
    
    console.log("This log won't run until the await for getFixtures() has finished");
    console.log(fixtureArray);
    return fixtureArray;
    //use fixtureArray to show all fixtures per gw
}

async function updateGameweek(newGW, fixtureId) {

    const fixtureArray = await fetch("http://localhost:9000/updateGameweek/" + newGW + "/" + fixtureId)
        .then(response => response);

    console.log("This log won't run until the await for updateGameweek() has finished");
    console.log(fixtureArray);    
}

var loop = [];
for (var i = 0; i <= 38; i++) {
    loop.push(i);
}

const fixtureArray = //test data - needs deleting
[
    {
        "name": "Premier League 2019/20",
        "rounds": [
          {
            "gw": 22,
            "matches": [
            {
                "fixtureId": "LEEWOL71141",
                "date": "2000-01-01",
                "homeTeamId": 9,
                "homeTeamName": "Leeds United",
                "awayTeamId": 20,
                "awayTeamName": "Wolverhampton Wanderers",
                "homeGoals": 0,
                "awayGoals": 0
            },
            {
                "fixtureId": "CHELIV92469",
                "date": "2000-01-01",
                "homeTeamId": 6,
                "homeTeamName": "Chelsea",
                "awayTeamId": 11,
                "awayTeamName": "Liverpool",
                "homeGoals": 0,
                "awayGoals": 0
            },
            {
                "fixtureId": "WESAST94394",
                "date": "2000-01-01",
                "homeTeamId": 18,
                "homeTeamName": "West Bromwich Albion",
                "awayTeamId": 2,
                "awayTeamName": "Aston Villa",
                "homeGoals": 0,
                "awayGoals": 0
            }
            ]
        }
        ]
    }
];

export default function AddFixture() {

    //const fixtureArray = getFixtures();
    const allRounds = fixtureArray[0].rounds;
    var gwFixtures = allRounds.filter(fixture => fixture.gw === 22); //Change to gwSelector value

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
            <div className={addFixtureStyles.sectionSpacing}>              
                <div>
                    <span>Round Name: {fixtures.name}</span>
                    <span>Round Length: {fixtures.rounds.length - 1}</span>
                </div>  
                <Button id='btnGenerateFixtureList' className={addFixtureStyles.button} onClick={() => alert("Need to generate fixtures on button click, not on page load.")}>Generate Fixtures</Button>               
            </div>  
            <div className={addFixtureStyles.sectionSpacing}>
                <label>
                    New Gameweek:
                    <input type="text" class="form-control" id="newGW" onChange={event => setNewGW(event.target.value)}></input>
                </label>          
                <label>
                    FixtureId:
                    <input type="text" class="form-control" id="fixture" onChange={event => setfixtureId(event.target.value)}></input>
                </label>                     
                <Button id='btnUpdateGameweek' className={addFixtureStyles.button} onClick={() => updateGameweek(newGW, fixtureId)}>Update Gameweek</Button>
            </div>
            <GWSelector/>
            <div id='fixtureCardList'>
                {loop.map(function(index){
                    return <div key={ index }><FixtureCard fixtures={gwFixtures}/></div>;
                })}
            </div>         
        </div>    
)}

