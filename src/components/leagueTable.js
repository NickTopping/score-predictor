import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.css';
import tableStyles from "./leagueTable.module.scss"

export default function SetLeagueTable() {

  const [tableData, setTableData] = useState([]);
  const url = "http://localhost:9000/getLeagueTable";

  useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => setTableData(data));
  }, []);

  return (
    <Table singleLine>
        <thead>
          <tr>
            <th className={tableStyles.tableHeader}>Team</th>
            <th className={tableStyles.tableHeader}>P</th>
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
          {tableData.map(el => {
            return (
              <tr key={el.teamId}>
                <td className={tableStyles.row}>{el.teamName}</td>
                <td className={tableStyles.row}>{el.played}</td>
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