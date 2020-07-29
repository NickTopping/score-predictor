import React from "react"
import {  Table } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import data from '../responses/predictions.json';
import tableStyles from './leagueTable.module.scss'

var teamList = data;
var hydratedDT= hydrateDT();

function hydrateDT() {
  
  var newDataTable = [];

  for (var team in teamList){

    var fixtures = teamList[team].fixtures;
    var results = getResults(fixtures);    
    newDataTable[team] = results;
    Object.assign(newDataTable[team], {homeTeamId: parseInt(teamList[team].homeTeamId)}, {homeTeamName: teamList[team].homeTeamName});
  }

  newDataTable.sort((a, b) => b.points - a.points); 

  return newDataTable;
}

function getResults(fixtures) {
  
  var totalWins = 0;
  var totalDraws = 0;
  var totalLosses = 0;
  var gf = 0;
  var ga = 0;
  var gd = 0;
  var totalPoints = 0;
  var totalResults;
  
  for (var match in fixtures){  

    var homeGoals = parseInt(fixtures[match].homeGoals);
    var awayGoals = parseInt(fixtures[match].awayGoals);

    if (homeGoals > 0){
      gf += homeGoals
    }

    if (awayGoals > 0){
      ga += awayGoals
    }

    switch(true) {
      case homeGoals > awayGoals:
        totalWins++
        break;
      case homeGoals < awayGoals:
        totalLosses++
        break;
      default:
        totalDraws++
    }
  }

  gd = gf - ga;
  totalPoints = (totalWins * 3) + totalDraws;

  totalResults = {wins: totalWins, draws: totalDraws, losses: totalLosses, goalsFor: gf, goalsAgainst: ga, goalDifference: gd, points: totalPoints};

  return totalResults;
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
              <Table.Row key={el.homeTeamId}>
                <Table.Cell className={tableStyles.row}>{el.homeTeamName}</Table.Cell>
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