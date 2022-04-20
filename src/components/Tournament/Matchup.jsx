import React, {useState} from "react";
import "./Matchup.css";

const Matchup = ({team1, team2, table, id, phase}) => {
    const [scoreTeam1, setScoreTeam1] = useState("");
    const [scoreTeam2, setScoreTeam2] = useState("");
    const [set, setSet] = useState(false);
    // const [teamInfo1, setTeamInfo1] = useState(team1);
    // const [teamInfo2, setTeamInfo2] = useState(team2);
    // const [matchupId]

    const onSubmit = () => {
        if(scoreTeam1 <= 10 && scoreTeam1 >= 0 && scoreTeam1 <= 10 && scoreTeam1 >= 0 && scoreTeam1 !== "" && scoreTeam2 !== ""){
            console.log("scoreTeam1: " + scoreTeam1);
            console.log("scoreTeam2: " + scoreTeam2);
            //post to database -> depending on phase value(group, quarter finals, semi finals, finals, platz3 with the matchup id
            setSet(true);
        }
        else {
            alert("Ergebnis nicht möglich")
        }
        
    }

    if(set){
        //fetch the matchup from the database and update the state as default with the result
    }

    return(
        <div className="table">
            <div className="cell ba w-10">{id}</div>
            <div className="cell ba w-20">{team1}</div>
            {/* <div className="dtc ba w-10"><input onChange={onInputChangeTeam1} size={1}/></div> */}
            <div className="cell ba w-10"><input value={scoreTeam1} onChange={(event) => setScoreTeam1(event.target.value)} size={1}/></div>
            <div className=" cell ba w-10">vs</div>
            <div className=" cell ba w-20">{team2}</div>
            <div className="cell ba w-10"><input value={scoreTeam2} onChange={(event) => setScoreTeam2(event.target.value)} size={1}/></div>            
            <div className="cell ba w-10">{table}</div>
            <div className="cell ba w-10"><button onClick={onSubmit}>Submit</button></div>
        </div>
    );
}

export default Matchup;