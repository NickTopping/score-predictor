import React from "react"
import Layout from "../components/layout"
import LeagueTable from "../components/leagueTable"

const IndexPage = () => {
  return (
      <Layout>
        <div>
          <h2>League Table</h2>
          <LeagueTable/>
        </div>
      </Layout>
  ) 
}

export default IndexPage
