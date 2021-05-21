import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component
import addFixtureStyles from './addFixture.module.scss'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import FixtureCard from "./fixtureCard";
import GWSelector from "./gwSelector";

//Update single GW
async function updateGameweek(newGW, fixtureId) {

    const fixtureArray = await fetch("http://localhost:9000/updateGameweek/" + newGW + "/" + fixtureId)
        .then(response => response);

    console.log("This log won't run until the await for updateGameweek() has finished");
    console.log(fixtureArray);    
}

//Update multiple GWs
async function updateGameweek2(gwUpdateArray) {

    console.log("CHANGED GWs: ", gwUpdateArray);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "gwUpdates": gwUpdateArray                  
        })
    };

    const fixtureArray = await fetch("http://localhost:9000/updateGameweek2", requestOptions)
        .then(response => response);

    console.log("This log won't run until the await for updateGameweek2() has finished");
    console.log(fixtureArray);    
}

async function generateFixtures() {

    const result = await fetch("http://localhost:9000/generateFixtures")
        .then(response => response);

    console.log("All fixtures have been generated");    
    console.log(result);
}

const AddFixture = () => {

    const [newGameweek, setNewGameweek] = useState('');
    const [fixtureID, setFixtureID] = useState('');
    const [allFixtures, setAllFixtures] = useState([]);
    const [filteredFixturesState, setFilteredFixturesState] = useState([]);
    const [gwCounter, setGwCounter] = useState(0);
    const [changedGWArray, setChangedGWArray] = useState([]);

    const getAllFixtures = async() => { //Can't await function unless it's async
        return fetch('http://localhost:9000/getAllFixtures')       
    };

    const getGWCounter = (counter) => { //callback
        setGwCounter(counter);

        //Use instead: allFixturesCopy = [...allFixtures]; DOESN'T WORK?
        var allFixturesCopy = JSON.parse(JSON.stringify(allFixtures)); //NEEDED DEEP COPY OF ALLFIXTURES ARRAY, OTHERWISE REFERENCE WILL MAKE ORIGINAL ARRAY CHANGE ITS STATE AS WELL
        var filteredFixtures = allFixtures[0].rounds.filter(function(round) {
            return round.gw === counter; //why is gwCounter not up to date by this point?
        });

        allFixturesCopy[0].rounds = filteredFixtures; //Only pass rounds that fall under selected gw counter
        setFilteredFixturesState(allFixturesCopy);
    };

    //First mount (ran once)
    useEffect(() => {
        async function fetchData() {
           await getAllFixtures() //Because we use await here, its containing function has to be async
           .then(response => response.json())
            .then(data => {
                setAllFixtures(data)
            });
        } 
        fetchData();
    }, []);

    useEffect(() => {
        if (allFixtures.length) {
            getGWCounter(0);
        }        
    }, [allFixtures]); //Dependancy array - called when allFixtures changes (only happens once)

    let confirmButton;
    if (changedGWArray.length > 0) {
        confirmButton = <Button className={addFixtureStyles.btnConfirm} onClick={() => updateGameweek2(changedGWArray)}>Confirm Gameweek Changes</Button>
    } 
    else {
        confirmButton = null;
    }

    return (
        <div>
            <div className={addFixtureStyles.sectionSpacing}>              
                <Button id='btnGenerateFixtureList' className={addFixtureStyles.button} onClick={() => generateFixtures()}>Generate Fixtures</Button>               
            </div>  
            <div className={addFixtureStyles.sectionSpacing}>
                <label>
                    New Gameweek:
                    <input type="text" className="form-control" id="newGW" onChange={event => setNewGameweek(event.target.value)}></input>
                </label>          
                <label>
                    FixtureId:
                    <input type="text" className="form-control" id="fixture" onChange={event => setFixtureID(event.target.value)}></input>
                </label>                     
                <Button id='btnUpdateGameweek' className={addFixtureStyles.button} onClick={() => updateGameweek(newGameweek, fixtureID)}>Update Gameweek</Button>
            </div>
            <GWSelector gwCounter = {gwCounter} callback = {getGWCounter}/>
            {filteredFixturesState.length ? (
                filteredFixturesState.map(({ name, rounds }, index) => (
                    <div key={index}>
                        <span>{name}</span>  
                        {confirmButton}
                        {rounds.map(({ matches }, index) => (
                            <div className='fixtureCardList' key={index}>
                                {matches.map((match, index) => <FixtureCard key={index} match={match} setChangedGWArray={setChangedGWArray}/>)}
                            </div>
                        ))}     
                        {confirmButton}                     
                    </div>                  
                ))
            ) : null}     
        </div>   
    ); 
};

export default AddFixture;