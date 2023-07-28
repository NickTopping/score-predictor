import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import tableStyles from "./teamScorePredictions.module.scss"
import fixtureCardStyles from './fixtureCard.module.scss'

const TeamScorePredictions = ({teamFixtures, teamId, callback}) => { //pass in fixtures or filtered fixtures by team?

    function hideComponent() {
        callback(0);
    }

    const selectedTeam = {
        display: 'inline'
    };
    
    return (
        <div className={ `${fixtureCardStyles.wrapper} ${fixtureCardStyles.predictionsCard}`} >
            <div className={`${fixtureCardStyles.card} ${fixtureCardStyles.vertical}`}>  
            <div>       
                <div style={selectedTeam}> Selected Team ID: {teamId}</div> {/* Change to team name */} 
                <div style={selectedTeam} className={`${tableStyles.pointer} ${fixtureCardStyles.closeSelectedTeam}`} onClick={() => { hideComponent() }}>Close</div>
            </div>  
                {teamFixtures.length ? (
                    teamFixtures.map(({ gw, matches }, index) => (
                        <div key={index}>                                             
                               <div className={fixtureCardStyles.gwBorder}>Gameweek {gw}</div>
                               <div className={`${fixtureCardStyles.fixtureCardList} ${fixtureCardStyles.vertical}`} key={index}>
                                    {matches.map((match) => 
                                    <div className={fixtureCardStyles.teams}>
                                        <div className={fixtureCardStyles.teamsText}>{match.homeTeamName}</div>
                                        <div className={fixtureCardStyles.teamsText}>{match.homeGoals}</div>
                                        <div className={fixtureCardStyles.teamsText}>vs</div> 
                                        <div className={fixtureCardStyles.teamsText}>{match.awayGoals}</div>
                                        <div className={fixtureCardStyles.teamsText}>{match.awayTeamName}</div>                          
                                    </div>)}
                                </div>                                             
                        </div>                                       
                    ))
                ) : null} 
            </div>                       
        </div>   
    )
}

export default TeamScorePredictions