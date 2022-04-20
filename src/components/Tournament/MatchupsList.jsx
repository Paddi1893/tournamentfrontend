import React, {useState} from "react";
import Matchup from "./Matchup";

const MatchupsList = () => {
    const [matchupsList, setMatchupsList] = useState([])
    
    const matchups = [
        {
            id: 1,
            group: 2,
            team1: "Patrick + Nicole",
            team2: "Klaus + Volker",
            table: 1
        },
        {
            id: 2,
            group: 3,
            team1: "Bernd + Anelies",
            team2: "Silke + Diane",
            table: 2
        }
    ] 

    return(
        <>
            <div className="dib">
                {
                    matchups.map(matchup => {
                        return <Matchup phase="rounds" key={matchup.id} id={matchup.id} group={matchup.group} team1={matchup.team1} team2={matchup.team2} table={matchup.table}/>
                    })
                }
                
            </div>
            <br/>
        </>
    );
}



export default MatchupsList;