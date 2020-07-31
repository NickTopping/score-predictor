import React from "react"
import {  Table } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import data from '../responses/predictions2.json';
import tableStyles from './leagueTable.module.scss'

var rounds = data.rounds;
var hydratedDT = hydrateDT();

function hydrateDT() {
  
  var dataTable = [];

  for (var gameWeek in rounds) {

    var fixtures = rounds[gameWeek].matches;

    for (var match in fixtures) {
      
      var homeTeamId = parseInt(fixtures[match].homeTeamId);
      var homeTeamName = fixtures[match].homeTeamName; 
      var homeGoals = parseInt(fixtures[match].homeGoals);
      var homeWin = 0;
      var homeLoss = 0;
      var draw = 0;
      var awayTeamId = parseInt(fixtures[match].awayTeamId);
      var awayTeamName = fixtures[match].awayTeamName;
      var awayGoals = parseInt(fixtures[match].awayGoals); 
      var awayWin = 0;
      var awayLoss = 0;
      var goalDifference = 0;
      var totalPoints = 0;
      
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

      goalDifference = homeGoals - awayGoals;
      totalPoints = (homeWin * 3) + draw;
  
      //If home team already exists
      if (dataTable.some(el => el.teamId === homeTeamId)) {   
        
        const homeTeamIndex = dataTable.findIndex(element => element.teamId === homeTeamId);
                 
        var currentHomeTeam = getTeamData(dataTable[homeTeamIndex]);
        Object.assign(dataTable[homeTeamIndex], 
          {wins: (homeWin + currentHomeTeam.totalWins)}, 
          {draws: draw + currentHomeTeam.totalDraws}, 
          {losses: homeLoss + currentHomeTeam.totalLosses},
          {goalsFor: homeGoals + currentHomeTeam.totalGF},
          {goalsAgainst: awayGoals + currentHomeTeam.totalGA},
          {goalDifference: goalDifference + currentHomeTeam.totalGD},
          {points: totalPoints + currentHomeTeam.totalPoints}
          );
      }
      //If home team doesn't already exist    
      else {    

        dataTable.push({teamId: homeTeamId, 
                           teamName: homeTeamName,
                           wins: homeWin, 
                           draws: draw, 
                           losses: homeLoss, 
                           goalsFor: homeGoals, 
                           goalsAgainst: awayGoals, 
                           goalDifference: goalDifference, 
                           points: totalPoints
                          });
      }  
      
      goalDifference = awayGoals - homeGoals;
      totalPoints = (awayWin * 3) + draw;

      //If away team already exists
      if (dataTable.some(el => el.teamId === awayTeamId)) { 

        const awayTeamIndex = dataTable.findIndex(element => element.teamId === awayTeamId);     
       
        var currentAwayTeam = getTeamData(dataTable[awayTeamIndex]);
        Object.assign(dataTable[awayTeamIndex], 
          {wins: (awayWin + currentAwayTeam.totalWins)}, 
          {draws: draw + currentAwayTeam.totalDraws}, 
          {losses: awayLoss + currentAwayTeam.totalLosses},
          {goalsFor: awayGoals + currentAwayTeam.totalGF},
          {goalsAgainst: homeGoals + currentAwayTeam.totalGA},
          {goalDifference: goalDifference + currentAwayTeam.totalGD},
          {points: totalPoints + currentAwayTeam.totalPoints}
          );
      }
      //If away team doesn't already exist
      else {

        dataTable.push({teamId: awayTeamId, 
                           teamName: awayTeamName,
                           wins: awayWin, 
                           draws: draw, 
                           losses: awayLoss, 
                           goalsFor: awayGoals, 
                           goalsAgainst: homeGoals, 
                           goalDifference: goalDifference, 
                           points: totalPoints
                          });
      }
    }
  }

  dataTable.sort((a, b) => b.points - a.points); //not sorting by GD at the moment

  return dataTable;
}

function getTeamData(team) {
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

export default LeagueTable