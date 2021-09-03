import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component
import addFixtureStyles from './addFixture.module.scss'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import FixtureCard from "./fixtureCard";
import GWSelector from "./gwSelector";

//Update multiple GWs
async function updateGameweeks(gwUpdateArray) {

    console.log("CHANGED GWs: ", gwUpdateArray);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "gwUpdates": gwUpdateArray                  
        })
    };

    await fetch("http://localhost:9000/updateGameweeks", requestOptions);
}

async function generateFixtures() {

    const result = await fetch("http://localhost:9000/generateFixtures")
        .then(response => response);

    console.log("All fixtures have been generated");    
    console.log(result);
}

const AddFixture = () => {

    const [allFixtures, setAllFixtures] = useState([]);
    const [filteredFixturesState, setFilteredFixturesState] = useState([]);
    const [gwCounter, setGwCounter] = useState(0);
    const [changedGWArray, setChangedGWArray] = useState([]);
    const [isLoadingFixtures, setIsLoadingFixtures] = useState(false);

    const getAllFixtures = async() => { //Can't await function unless it's async
        return fetch('http://localhost:9000/getAllFixtures')       
    };

    const getGWCounter = (counter) => { //callback
        setGwCounter(counter);

        //Use instead: allFixturesCopy = [...allFixtures]; DOESN'T WORK?
        var allFixturesCopy = JSON.parse(JSON.stringify(allFixtures)); //NEEDED DEEP COPY OF ALLFIXTURES ARRAY, OTHERWISE REFERENCE WILL MAKE ORIGINAL ARRAY CHANGE ITS STATE AS WELL
        var filteredFixtures = allFixtures[0].rounds.filter(function(round) {
            return round.gw === counter;
        });

        allFixturesCopy[0].rounds = filteredFixtures; //Only pass rounds that fall under selected gw counter
        setFilteredFixturesState(allFixturesCopy);
    };

    //First mount (ran once)
    useEffect(() => {
        setIsLoadingFixtures(true)
    }, []);

    useEffect(() => {
        if(isLoadingFixtures) {
            async function fetchData() {
                await getAllFixtures() //Because we use await here, its containing function has to be async
                .then(response => response.json())
                    .then(data => {
                        setAllFixtures(data)
                        setIsLoadingFixtures(false)
                    });
            } 
            fetchData();
        }
    }, [isLoadingFixtures]); //Dependency on if isLoadingFixtures - if the bool value changes, run useEffect to retrieve all fixtures

    useEffect(() => {     
        if (allFixtures.length) {
            getGWCounter(0);
        }        
    }, [allFixtures]); //Dependancy array - called when allFixtures changes (only happens once)

    const onConfirmClick = async (changedGWArray) => {
        setIsLoadingFixtures(true);
        await updateGameweeks(changedGWArray);
    }

    let confirmButton;
    if (changedGWArray.length > 0) {
        confirmButton = <Button className={addFixtureStyles.btnConfirm} onClick={() => onConfirmClick(changedGWArray)}>Confirm Gameweek Changes</Button>
    } 
    else {
        confirmButton = null;
    }

    return (
        <div>
            <div className={addFixtureStyles.sectionSpacing}>              
                <Button id='btnGenerateFixtureList' className={addFixtureStyles.button} onClick={() => generateFixtures()}>Generate Fixtures</Button>               
            </div>  
            <GWSelector gwCounter = {gwCounter} callback = {getGWCounter}/>
            {filteredFixturesState.length ? (
                filteredFixturesState.map(({ name, rounds }, index) => (
                    <div key={index}>
                        <span>{name}</span>  
                        {confirmButton}
                        {rounds.map(({ matches }, index) => (
                            <div className='fixtureCardList' key={index}>
                                {matches.map((match, index) => <FixtureCard key={index} gwValue={gwCounter} match={match} setChangedGWArray={setChangedGWArray}/>)}
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