import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.css';
import tableStyles from "./leagueTable.module.scss"
import fixtureCardStyles from './fixtureCard.module.scss'
import TeamScorePredictions from "../components/teamScorePredictions"

export default function SetLeagueTable() {

  const [tableData, setTableData] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [inHover, setHover] = useState(null);
  const [allFixtures, setAllFixtures] = useState([]);

  var tablePositionArray = [];

  for (var i = 1; i <= 20; i++) {
    tablePositionArray.push(i);
  }

  useEffect(() => {
      fetch("http://localhost:9000/getLeagueTable")
        .then(response => response.json())
        .then(data => setTableData(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:9000/getAllFixtures')
      .then(response => response.json())
      .then(data => setAllFixtures(data));
  }, []);

  //Iterate through each team and calculate their max possible points
  for (var t = 0; t <= tableData.length; t++) {
    let currentTeam = tableData[t];

    if (currentTeam) {
      currentTeam.maxPoints = getMaxAvailablePoints(currentTeam);
    }
  }

  let showTeamScorePredictions = selectedTeamId > 0 ? true : false;
  let teamScorePredictions;
  
  if (showTeamScorePredictions) {
    let filteredFixtures = filterFixturesByTeamId(allFixtures, selectedTeamId);
    teamScorePredictions = <TeamScorePredictions teamFixtures = {filteredFixtures} teamId = {selectedTeamId} callback = {setSelectedTeamId}/> //get clicked teamId - BUG: CURRRENTLY TRIGGERS ON HOVER???
  } 
  else {
    teamScorePredictions = null;
  }

  const getTableStyles = (minPos, maxPos, td) => {

    let styles = `${tableStyles.rowBorderless} ${tableStyles.column}`; 
 
    if (td <= minPos && td >= maxPos) {
      styles += ` ${tableStyles.posShift}`;

      if (td === minPos) {
        styles += ` ${tableStyles.shiftRightEnd}`;
      }

      if (td === maxPos) {
        styles += ` ${tableStyles.shiftLeftEnd}`;
      }
    }
    
    return styles;
  }

  const hoverStyles = (index) => {

    let styles = `${tableStyles.rowBorderless} ${tableStyles.pointer}`; 

    if (index === inHover) {
      styles += ` ${tableStyles.rowHovered}`;
    }

    return styles;
  }
  
  const getTeamRow = (team, index, tableData) => {

    let positionShifts = getMinAndMaxPositions(team, tableData);
    //console.log(positionShifts);
    //console.log(team);
    //console.log(tableData);

    return (
      <tr id={'teamRow' + (index + 1)} key={team.teamId} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)}>
        <td className={hoverStyles(index)} onClick={() => { setSelectedTeamId(team.teamId) }}>{index + 1}</td>
        <td className={hoverStyles(index)} onClick={() => { setSelectedTeamId(team.teamId) }}>{team.teamName}</td>                       

        {tablePositionArray.map((td) => {
          return <td id={'posCol' + td} className={getTableStyles(positionShifts.minPos, positionShifts.maxPos, td)} key={td}></td>                               
        })}                          
      </tr>
    );
  }

  return (
    <div className={fixtureCardStyles.openSelectedTeam}>
      {teamScorePredictions}
      <Table singleLine className={tableStyles.leagueTableShift}>
          <thead>
            <tr>
              <th className={tableStyles.tableHeader}>Position</th>
              <th className={tableStyles.tableHeader}>Team</th>
              {tablePositionArray.map((pos, i) => <th className={tableStyles.tableHeader} key={i}>{pos}</th>)}           
            </tr>
          </thead>

          <tbody>
            {tableData.map((team, index) => getTeamRow(team, index, tableData))} {/*tableData passed in each time, could just pass index of tableData for given team */}
          </tbody>
      </Table>
    </div>
  )
}

function getMinAndMaxPositions(currentTeam, tableData) {

  let minCounter = 1;
  let maxCounter = tableData.length;

  if (currentTeam && tableData) {
   
    for (var t = 0; t <= tableData.length -1; t++) {

      let compareTeam = tableData[t];
      
      if (currentTeam.teamName === compareTeam.teamName) {
        continue;
      }
      
      if (currentTeam.points <= compareTeam.maxPoints){
        //eg Arsenal have higher min points than Brentford's max points          
        minCounter++;
        //console.log(`getMin1*****${currentTeam.teamName}: ${currentTeam.points} <= ${compareTeam.teamName}: ${compareTeam.maxPoints}*****`); 
      }

      if (currentTeam.maxPoints >= compareTeam.points){
        //eg Sheffield United's counter finishes on 3, as there a 3 teams that can potentially finish below them          
        maxCounter--;
        //console.log(`getMax1*****${currentTeam.teamName}: ${currentTeam.maxPoints} <= ${compareTeam.teamName}: ${compareTeam.points}*****`);
      }
    }
  }

  let shiftPositions = {
    minPos: minCounter,
    maxPos: maxCounter
  };

  return shiftPositions;
}

function getMaxAvailablePoints(team) {
  
  let gamesRemaining = 38 - team.played;
  let maxAvailablePoints = gamesRemaining * 3;
  let maxTotalPoints = team.points + maxAvailablePoints;

  //console.log(team);
  //console.log("Max Possible Total Points: " + maxTotalPoints);

  return maxTotalPoints;
}

// function handleRowClick(teamId) {
//   console.log("teamId: " + teamId);
// }

function filterFixturesByTeamId(allFixtures, selectedTeamId) {

  let filteredFixtures = [];
  let rounds = allFixtures[0].rounds;
  
  //Iterate through rounds
  rounds.filter((roundDetails) => {
    
    let matchArray = [];
    
    //Iterate through each match within a round
    roundDetails.matches.filter((match) => {  
        if (match.homeTeamId == selectedTeamId || match.awayTeamId == selectedTeamId) {
          matchArray.push(match);
        }  	
    });

    if (matchArray.length > 0) {
      filteredFixtures.push({
        gw: roundDetails.gw, 
        matches: matchArray
      });
    }

  });

  console.log('ff', filteredFixtures);

  return filteredFixtures;
}