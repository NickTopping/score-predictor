import React from "react"
<<<<<<< HEAD

export default function Home() {
  return <div>Hello world!</div>
}
=======
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
>>>>>>> feature-1
