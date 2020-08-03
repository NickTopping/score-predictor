import React from "react"
import Layout from "../components/layout"
import AddFixture from "../components/addFixture"

const ManageFixtures = () => {

  return (
      <Layout>
        <div>
          <h1>Add new teams here</h1>
          <AddFixture/>
        </div>
      </Layout>

  )
  
}

export default ManageFixtures