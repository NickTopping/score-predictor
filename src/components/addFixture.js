import React from "react"
import addFixtureStyles from './addFixture.module.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.css';
import allTeams from '../responses/teams.json';

//read teamId and Team name from teams.json file
//flag in array to say fixture has been confirmed or score confirmed?
var teamList = allTeams;
var arr = []; 

function generateFixtures(teamList) {
  for (var firstTeam = 0; firstTeam < teamList["teams"].length; firstTeam++) {
    for (var secondTeam = firstTeam + 1; secondTeam < teamList["teams"].length; secondTeam++) {
        
        arr.push( 
            {
             date:"2000-01-01",
             homeTeamId: teamList["teams"][firstTeam].teamId,
             homeTeamName: teamList["teams"][firstTeam].teamName,
             awayTeamId: teamList["teams"][secondTeam].teamId,
             awayTeamName: teamList["teams"][secondTeam].teamName,
             homeGoals: 0, 
             awayGoals: 0,        
            });
    }
  }
  for (var firstTeam = 0; firstTeam < teamList["teams"].length; firstTeam++) {
    for (var secondTeam = firstTeam + 1; secondTeam < teamList["teams"].length; secondTeam++) {
        
        arr.push( 
            {
            date:"2000-01-01",
            homeTeamId: teamList["teams"][secondTeam].teamId,
            homeTeamName: teamList["teams"][secondTeam].teamName,
            awayTeamId: teamList["teams"][firstTeam].teamId,
            awayTeamName: teamList["teams"][firstTeam].teamName,
            homeGoals: 0, 
            awayGoals: 0,         
            });
    }
  }
  console.log(arr);
}

const AddFixture = () => {
    return (<div>teams</div>
    )}

    export default AddFixture

generateFixtures(teamList);


/*const gwOptions = [];

for(let i=1; i<=38; i++)
{
    gwOptions.push({key: i, text: i, value: i});
} 
//Change home/away teams to be dropdown box or type (select from existing teams)
const AddFixture = () => {
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

