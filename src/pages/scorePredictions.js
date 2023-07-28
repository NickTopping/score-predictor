import React from "react"
import Layout from "../components/layout"
import ScoresTestTemp from "../components/getScores"
import LeagueTableShifts from "../components/leagueTableShifts"
import layoutStyles from '../components/layout.module.scss'

const ScorePredictionsPage = () => {
console.log(layoutStyles);
  return (
      <Layout>
        <div className={layoutStyles.wrapper}>
          {/* <ScoresTestTemp/> */}
          <LeagueTableShifts/>
        </div>
      </Layout>

  )
  
}

export default ScorePredictionsPage