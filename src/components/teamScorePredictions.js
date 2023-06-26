import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import tableStyles from "./teamScorePredictions.module.scss"
import fixtureCardStyles from './fixtureCard.module.scss'

const TeamScorePredictions = ({teamId, callback}) => { //pass in fixtures or filtered fixtures by team?

    function hideComponent() {
        callback(0);
        console.log("Component hidden"); //this component works, but why doesn't the log show?
    }
    
    return (
        <div className={fixtureCardStyles.wrapper}>
            <div className={fixtureCardStyles.card}>           
                <span>Selected Team ID: {teamId}</span> {/* Change to team name */}
                <span className={tableStyles.pointer} onClick={() => { hideComponent() }}>X</span>  
                <div className={fixtureCardStyles.teams}>
                    {/* <div className={fixtureCardStyles.teamsText}>{match.homeTeamName}</div>
                    <div className={fixtureCardStyles.teamsText}>vs</div> 
                    <div className={fixtureCardStyles.teamsText}>{match.awayTeamName}</div>                           */}
                </div>                            
            </div>                       
        </div>   
    )
}

export default TeamScorePredictions