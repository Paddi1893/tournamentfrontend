import React, {useState} from "react";
import {Link} from "react-router-dom";
import GroupList from "./GroupList";
import MatchupsList from "./MatchupsList";
import Playoffs from "./Playoffs";

const Tournament = () => {
    const [playoffs, setPlayoffs] = useState(true) //false is standard

    const proceedToPlayoffs = () => {
        //do a check if a all matchups are played -> have a score only then
        if(1){
            setPlayoffs(true)
        }
        else {
            alert("Some games have not been played yet! Cannot proceed")
        }
    }
    //dummy for the group component
    let teams = [
        {
            standing: 1,
            id: 1,
            name: "Patrick + Nicole",
            points: 3,
            goals: 30
        },
        {
            standing: 2,
            id: 2,
            name: "Klaus + Volker",
            points: 2,
            goals: 25
        }
    ]

    let playoffsComponent;
    if(playoffs){
        playoffsComponent = <Playoffs/>
    }

    return(
        <>
            <div className="tc">
                <Link to={"/dashboard"}><button onClick={() => {localStorage.removeItem("tournamentName")}} className="mb3">Back to Dashboard</button></Link>
                <h1>Groups</h1>
                {/* the props are useless do that in the GroupList Component */}
                <GroupList teamsGroup1={teams} teamsGroup2={teams} teamsGroup3={teams}/>
                <h1>Matchups</h1>
                <MatchupsList/>
                <button onClick={proceedToPlayoffs} className="mt4">Proceed to Playoffs</button>
                {playoffsComponent}
            </div>
        </>
    );
} 



export default Tournament;