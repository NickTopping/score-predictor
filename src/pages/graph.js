import React from "react"
import Layout from "../components/layout"
import GraphImg from "../images/predictionsGraph.png";
//import GraphImageStyles from './index.scss'

const Graph = () => {

  return (
      <Layout>
        <div>
          <h1>Modelled Predictions Graph</h1>
          <img className='graphImage' src={GraphImg} alt="Graph of movement possibilities" />
        </div>
      </Layout>

  )
  
}

export default Graph