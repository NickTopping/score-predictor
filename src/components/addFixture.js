import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component
import addFixtureStyles from './addFixture.module.scss'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import FixtureCard from "./fixtureCard";
import GWSelector from "./gwSelector";

async function updateGameweek(newGW, fixtureId) {

    const fixtureArray = await fetch("http://localhost:9000/updateGameweek/" + newGW + "/" + fixtureId)
        .then(response => response);

    console.log("This log won't run until the await for updateGameweek() has finished");
    console.log(fixtureArray);    
}

const AddFixture = () => {
    // const [fixtures, setFixtures] = useState({
    //     name: '',
    //     rounds: [],
    // });

    const [newGameweek, setNewGameweek] = useState('');
    const [fixtureID, setFixtureID] = useState('');
    const [allFixtures, setAllFixtures] = useState([]);

    // const generateFixtures = () => {
    //     fetch('/generateFixtures')
    //         .then(response => response.json())
    //         .then(data => setFixtures(data && data[0] || fixtures));
    // };

    const getAllFixtures = () => {
        fetch('http://localhost:9000/getAllFixtures')
            .then(response => response.json())
            .then(data => setAllFixtures(data || allFixtures));
    };

    // First mount (ran once)
    useEffect(() => {
        getAllFixtures();
    }, []);

    return (
        <div className={addFixtureStyles.wrapper}>
            <div className={addFixtureStyles.sectionSpacing}>              
                <div>
                    {/*<span>Round Name: {fixtures.name}</span>
                    <span>Round Length: {fixtures.rounds.length - 1}</span>*/}
                </div>  
                <Button id='btnGenerateFixtureList' className={addFixtureStyles.button} onClick={() => alert("Need to generate fixtures on button click, not on page load.")}>Generate Fixtures</Button>               
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
            <GWSelector/>
            {allFixtures.length ? (
                allFixtures.map(({ name, rounds }, index) => (
                    <div className='years' key={index}>
                        <span>{name}</span>
                        {rounds.map(({ gw, matches }, index) => (
                            <div className='fixtureCardList' key={index}>
                                {matches.map((match, index) => <FixtureCard key={index} match={match}/>)}
                            </div>
                        ))}                           
                    </div>                  
                ))
            ) : null}     
        </div>   
    ); 
};

export default AddFixture;