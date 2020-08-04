import React from "react"
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.css';
import data from "../responses/predictions.json"
import tableStyles from "./leagueTable.module.scss"

var rounds = data.rounds;
var hydratedDT = hydrateDT();

function hydrateDT() {

  var dataTable = [];

  for (var gameWeek in rounds) {
    var fixtures = rounds[gameWeek].matches;

    for (var match in fixtures) {
      var matchdayTeams = [
        {
          homeOrAway: "H",
          teamId: fixtures[match].homeTeamId,
          teamName: fixtures[match].homeTeamName,
          homeGoals: fixtures[match].homeGoals,
          awayGoals: fixtures[match].awayGoals
        },
        {
          homeOrAway: "A",
          teamId: fixtures[match].awayTeamId,
          teamName: fixtures[match].awayTeamName,
          homeGoals: fixtures[match].homeGoals,
          awayGoals: fixtures[match].awayGoals
        }
      ];

      for (var team in matchdayTeams) {

        var homeOrAway = matchdayTeams[team].homeOrAway;
        var teamId = matchdayTeams[team].teamId;
        var teamName = matchdayTeams[team].teamName;
        var win = 0;
        var draw = 0;
        var loss = 0;
        var homeGoals = parseInt(matchdayTeams[team].homeGoals);
        var awayGoals = parseInt(matchdayTeams[team].awayGoals);
        var goalDifference = 0;
        var totalPoints = 0;

        switch (true) {
          case homeGoals > awayGoals && homeOrAway === "H":
            win = 1
            break
          case homeGoals < awayGoals && homeOrAway === "H":
            loss = 1
            break
          case homeGoals < awayGoals && homeOrAway === "A":
            win = 1
            break
          case homeGoals > awayGoals && homeOrAway === "A":
            loss = 1
            break
          default:
            draw = 1
        }

        //Further validation here
        if (teamId === "undefined") {
          console.log("Error, unrecognised TeamId")
          return;
        }

        //If team already exists
        if (dataTable.some(el => el.teamId === teamId)) {         
          updateTable(dataTable, homeOrAway, teamId, win, draw, loss, homeGoals, awayGoals)
        }
        //If team is a new entry
        else {
          totalPoints = win * 3 + draw;
          var gf = 0;
          var ga = 0;

          if (homeOrAway === "H") {
            gf = homeGoals;
            ga = awayGoals;
            goalDifference = homeGoals - awayGoals;
          } 
          else {
            gf = awayGoals;
            ga = homeGoals;
            goalDifference = awayGoals - homeGoals;
          }

          dataTable.push({
            teamId: teamId,
            teamName: teamName,
            wins: win,
            draws: draw,
            losses: loss,
            goalsFor: gf,
            goalsAgainst: ga,
            goalDifference: goalDifference,
            points: totalPoints
          });
        }
      }
    }
  }

  dataTable.sort((a, b) => b.points - a.points) //not sorting by GD at the moment

  return dataTable
}

function getTeamData(team) {
  return {
    totalWins: team.wins,
    totalDraws: team.draws,
    totalLosses: team.losses,
    totalGF: team.goalsFor,
    totalGA: team.goalsAgainst,
    totalGD: team.goalDifference,
    totalPoints: team.points,
  }
}

function updateTable(dataTable, homeOrAway, teamId, win, draw, loss, homeGoals, awayGoals) {
  
  var goalDifference = 0;
  var totalPoints = 0;
  var gf = 0;
  var ga = 0;

  if (homeOrAway === "H") {
    gf = homeGoals
    ga = awayGoals
    goalDifference = homeGoals - awayGoals
  } 
  else {
    gf = awayGoals
    ga = homeGoals
    goalDifference = awayGoals - homeGoals
  }

  totalPoints = win * 3 + draw;

  //Find team in dataTable
  var teamIndex = dataTable.findIndex(element => element.teamId === teamId)

  //Get data for existing team
  var currentTeam = getTeamData(dataTable[teamIndex])
  Object.assign(
    dataTable[teamIndex],
    { wins: win + currentTeam.totalWins },
    { draws: draw + currentTeam.totalDraws },
    { losses: loss + currentTeam.totalLosses },
    { goalsFor: gf + currentTeam.totalGF },
    { goalsAgainst: ga + currentTeam.totalGA },
    { goalDifference: goalDifference + currentTeam.totalGD },
    { points: totalPoints + currentTeam.totalPoints }
  )
}

const LeagueTable = () => {
  return (
    <Table singleLine>
        <thead>
          <tr>
            <th className={tableStyles.tableHeader}>Team</th>
            <th className={tableStyles.tableHeader}>W</th>
            <th className={tableStyles.tableHeader}>D</th>
            <th className={tableStyles.tableHeader}>L</th>
            <th className={tableStyles.tableHeader}>GF</th>
            <th className={tableStyles.tableHeader}>GA</th>
            <th className={tableStyles.tableHeader}>GD</th>
            <th className={tableStyles.tableHeader}>PTS</th>
          </tr>
        </thead>

        <tbody>
          {hydratedDT.map(el => {
            return (
              <tr key={el.teamId}>
                <td className={tableStyles.row}>{el.teamName}</td>
                <td className={tableStyles.row}>{el.wins}</td>
                <td className={tableStyles.row}>{el.draws}</td>
                <td className={tableStyles.row}>{el.losses}</td>
                <td className={tableStyles.row}>{el.goalsFor}</td>
                <td className={tableStyles.row}>{el.goalsAgainst}</td>
                <td className={tableStyles.row}>{el.goalDifference}</td>
                <td className={tableStyles.row}>{el.points}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
  )
}

export default LeagueTable
