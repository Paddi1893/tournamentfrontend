import React, {useState} from "react";
import {Link} from "react-router-dom";
import GroupList from "./GroupList";
import MatchupsList from "./MatchupsList";
import Playoffs from "./Playoffs";

const Tournament = () => {
    const [playoffs, setPlayoffs] = useState(false) //false is standard

    //make a useEffect to check if playoffs are played or not -> if the playoffs are setup

    const proceedToPlayoffs = () => {
        //do a check if a all matchups are played -> have a score only then
        if(1){
            setPlayoffs(true)
        }
        else {
            alert("Some games have not been played yet! Cannot proceed")
        }
    }
    

    let playoffsComponent;
    if(playoffs){
        playoffsComponent = <Playoffs/>
    }

    return(
        <>
            <div className="tc">
                <Link to={"/dashboard"}><button onClick={() => {localStorage.removeItem("tournament_id")}} className="mb3">Back to Dashboard</button></Link>
                <h1>Groups</h1>
                <GroupList/>
                <h1>Matchups</h1>
                <MatchupsList/>
                <button onClick={proceedToPlayoffs} className="mt4">Proceed to Playoffs</button>
                {playoffsComponent}
            </div>
        </>
    );
} 



export default Tournament;