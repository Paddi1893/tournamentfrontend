import React, {useState, useEffect} from "react";
import Matchup from "./Matchup";

const MatchupsList = () => {
    const [matchupsList, setMatchupsList] = useState([])
    
    useEffect(() => {
        fetchMatchups();        
    }, [])

    const compareFunction = (a,b) => {
        if (a.matchup_id < b.matchup_id){
            return -1;
        }
        if (a.matchup_id > b.matchup_id){
            return 1;
        }
        return 0;
    }
    
    const fetchMatchups = () => {
        fetch("http://localhost:3000/fetchMatchups/" + localStorage.getItem("tournament_id"), {
            method: "get",
            headers: {"Content-Type": "application/json"},            
        })
        .then(data => data.json())
        .then(matchups => {
            matchups = matchups.sort(compareFunction);
            /*
            {
                matchup_id: '87',
                team_id1: '992',
                team_id2: '990',
                scoreteam1: null,
                scoreteam2: null,
                winner_id: null,
                table_id: 3,
                tournament_id: '48',
                nameTeam1: 'chiara s. + nicole sieber',  
                nameTeam2: 'leah m. + volker sieber'     
            }
            */
           setMatchupsList(matchups);
        })
    }

    return(
        <>
            <div className="dib">
        {
                    matchupsList.map((matchup, i) => {
                        return <Matchup
                        phase="rounds"
                        index={i} 
                        key={matchup.matchup_id}
                        id={matchup.matchup_id} 
                        team1={matchup.nameTeam1} team2={matchup.nameTeam2}
                        table={matchup.table_id} 
                        scoreteam1={matchup.scoreteam1}
                        scoreteam2={matchup.scoreteam2}/>
                    })
                }
                
            </div>
            <br/>
        </>
    );
}



export default MatchupsList;