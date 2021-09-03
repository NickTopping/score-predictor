import React from "react"
import Layout from "../components/layout"
import ScoresTestTemp from "../components/getScores"
import LeagueTableShifts from "../components/leagueTableShifts"

const ScorePredictionsPage = () => {

  return (
      <Layout>
        <div>
          <h1>Score predictions here</h1>
          <ScoresTestTemp/>
          <LeagueTableShifts/>
        </div>
      </Layout>

  )
  
}

export default ScorePredictionsPage