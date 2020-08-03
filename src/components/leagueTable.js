/*import React from "react"
import {  Table } from "semantic-ui-react";
//import 'semantic-ui-css/semantic.min.css'
import data from '../responses/predictions2.json';
import tableStyles from './leagueTable.module.scss'

var rounds = data.rounds;
var hydratedDT = hydrateDT();

function hydrateDT() {
  
  var newDataTable = [];

  for (var gameWeek in rounds) {

    var fixtures = rounds[gameWeek].matches;

    for (var match in fixtures) {
      
      var homeTeamId = parseInt(fixtures[match].homeTeamId);
      var homeTeamName = fixtures[match].homeTeamName;
      var awayTeamId = parseInt(fixtures[match].awayTeamId);
      var awayTeamName = fixtures[match].awayTeamName;

      var homeGoals = parseInt(fixtures[match].homeGoals);
      var awayGoals = parseInt(fixtures[match].awayGoals);

      var homeWin = 0;
      var homeLoss = 0;
      var awayWin = 0;
      var awayLoss = 0;
      var draw = 0;

      switch(true) {
        case homeGoals > awayGoals:
          homeWin = 1
          awayLoss = 1;
          break;
        case homeGoals < awayGoals:
          awayWin = 1
          homeLoss = 1
          break;
        default:
          draw = 1
      }
      
      //Further validation here
      if (homeTeamId === 'undefined' || awayTeamId === 'undefined') { 
        console.log("Error, unrecognised TeamId");
        return;
      }
  
      //If home team already exists
      if (newDataTable.some(el => el.teamId === homeTeamId)) {   
        
        const homeTeamIndex = newDataTable.findIndex(element => element.teamId === homeTeamId);
        var goalDifference = homeGoals - awayGoals;
        var totalPoints = (homeWin * 3) + draw;
                     
        var currentHomeTeam = updateTable(newDataTable[homeTeamIndex]); //can this just be teamID and use for both cases?
        Object.assign(newDataTable[homeTeamIndex], 
          {wins: (parseInt(homeWin) + parseInt(currentHomeTeam.totalWins))}, 
          {draws: parseInt(draw) + parseInt(currentHomeTeam.totalDraws)}, 
          {losses: parseInt(homeLoss) + parseInt(currentHomeTeam.totalLosses)},
          {goalsFor: parseInt(homeGoals) + parseInt(currentHomeTeam.totalGF)},
          {goalsAgainst: parseInt(awayGoals) + parseInt(currentHomeTeam.totalGA)},
          {goalDifference: parseInt(goalDifference) + parseInt(currentHomeTeam.totalGD)},
          {points: parseInt(totalPoints) + parseInt(currentHomeTeam.totalPoints)}
          );
          //add new results to existing currentHomeTeam properties
      }
      //If home team doesn't already exist    
      else {    
        newDataTable.push({teamId: homeTeamId, 
                           teamName: homeTeamName,
                           wins: 0, 
                           draws: 0, 
                           losses: 0, 
                           goalsFor: 0, 
                           goalsAgainst: 0, 
                           goalDifference: 0, 
                           points: 0
                          });

        const homeTeamIndex = newDataTable.findIndex(element => element.teamId === homeTeamId);   
        
        //May need to change, as only possible for one game to have been played in this scenario
        var goalDifference = homeGoals - awayGoals;
        var totalPoints = (homeWin * 3) + draw;
        
        Object.assign(newDataTable[homeTeamIndex], 
          {wins: homeWin}, 
          {draws: draw}, 
          {losses: homeLoss},
          {goalsFor: homeGoals},
          {goalsAgainst: awayGoals},
          {goalDifference: goalDifference},
          {points: totalPoints}
          );
      }   

      //If away team already exists
      if (newDataTable.some(el => el.teamId === awayTeamId)) { 

        const awayTeamIndex = newDataTable.findIndex(element => element.teamId === awayTeamId);
        var goalDifference = awayGoals - homeGoals;
        var totalPoints = (awayWin * 3) + draw;
       
        var currentAwayTeam = updateTable(newDataTable[awayTeamIndex]);
        Object.assign(newDataTable[awayTeamIndex], 
          {wins: (parseInt(awayWin) + parseInt(currentAwayTeam.totalWins))}, 
          {draws: parseInt(draw) + parseInt(currentAwayTeam.totalDraws)}, 
          {losses: parseInt(awayLoss) + parseInt(currentAwayTeam.totalLosses)},
          {goalsFor: parseInt(awayGoals) + parseInt(currentAwayTeam.totalGF)},
          {goalsAgainst: parseInt(homeGoals) + parseInt(currentAwayTeam.totalGA)},
          {goalDifference: parseInt(goalDifference) + parseInt(currentAwayTeam.totalGD)},
          {points: parseInt(totalPoints) + parseInt(currentAwayTeam.totalPoints)}
          );
      }
      //If away team doesn't already exist
      else {    
        newDataTable.push({teamId: awayTeamId, 
                           teamName: awayTeamName,
                           wins: 0, 
                           draws: 0, 
                           losses: 0, 
                           goalsFor: 0, 
                           goalsAgainst: 0, 
                           goalDifference: 0, 
                           points: 0
                          });

        const awayTeamIndex = newDataTable.findIndex(element => element.teamId === awayTeamId); 
        
        //May need to change, as only possible for one game to have been played in this scenario
        var goalDifference = awayGoals - homeGoals;
        var totalPoints = (awayWin * 3) + draw;
        
        Object.assign(newDataTable[awayTeamIndex], 
          {wins: awayWin}, 
          {draws: draw}, 
          {losses: awayLoss},
          {goalsFor: awayGoals},
          {goalsAgainst: homeGoals},
          {goalDifference: goalDifference},
          {points: totalPoints}
          );
      }
    }
  }

  newDataTable.sort((a, b) => b.points - a.points); 

  return newDataTable;
}

function updateTable(team) {
  return {totalWins: team.wins, 
          totalDraws: team.draws, 
          totalLosses: team.losses,
          totalGF: team.goalsFor,
          totalGA: team.goalsAgainst,
          totalGD: team.goalDifference,
          totalPoints: team.points,
        }
}

const LeagueTable = () => {
  return (
    <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className={tableStyles.tableHeader}>Team</Table.HeaderCell>
            <Table.HeaderCell className={tableStyles.tableHeader}>W</Table.HeaderCell>
            <Table.HeaderCell className={tableStyles.tableHeader}>D</Table.HeaderCell>
            <Table.HeaderCell className={tableStyles.tableHeader}>L</Table.HeaderCell>
            <Table.HeaderCell className={tableStyles.tableHeader}>GF</Table.HeaderCell>
            <Table.HeaderCell className={tableStyles.tableHeader}>GA</Table.HeaderCell>
            <Table.HeaderCell className={tableStyles.tableHeader}>GD</Table.HeaderCell>
            <Table.HeaderCell className={tableStyles.tableHeader}>PTS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {hydratedDT.map(el => {
            return (
              <Table.Row key={el.teamId}>
                <Table.Cell className={tableStyles.row}>{el.teamName}</Table.Cell>
                <Table.Cell className={tableStyles.row}>{el.wins}</Table.Cell>
                <Table.Cell className={tableStyles.row}>{el.draws}</Table.Cell>
                <Table.Cell className={tableStyles.row}>{el.losses}</Table.Cell>
                <Table.Cell className={tableStyles.row}>{el.goalsFor}</Table.Cell>
                <Table.Cell className={tableStyles.row}>{el.goalsAgainst}</Table.Cell>
                <Table.Cell className={tableStyles.row}>{el.goalDifference}</Table.Cell>
                <Table.Cell className={tableStyles.row}>{el.points}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
  )
}

export default LeagueTable*/