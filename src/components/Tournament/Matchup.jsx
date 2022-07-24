import React, {useState, useEffect} from "react";
import "./Matchup.css";

const Matchup = ({team1, team2, table, id, phase, index, scoreteam1, scoreteam2}) => {
    const [scoreTeam1, setScoreTeam1] = useState("");
    const [scoreTeam2, setScoreTeam2] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [set, setSet] = useState(false);

    //use the phase parameter -> rounds, quarter, semi, final, Platz3

    useEffect(()=> {
        if(scoreteam1 !== ""){
            setScoreTeam1(scoreteam1);
        }
        if(scoreteam2 !== ""){
            setScoreTeam2(scoreteam2);
        }
        if(scoreteam1 !== "" && scoreteam2 !== ""){
            setSet(true);
        }
        
    }, [])

    const onSubmit = () => {
        
        if(Number(scoreTeam1) === 10 || Number(scoreTeam2) === 10){
            if(scoreTeam1 <= 10 && scoreTeam1 >= 0 && scoreTeam1 <= 10 && scoreTeam1 >= 0 && scoreTeam1 !== "" && scoreTeam2 !== ""  && scoreTeam2 <= 10 && scoreTeam2 >= 0 && scoreTeam2 <= 10 && scoreTeam2 >= 0) {
                if(Number(scoreTeam1) === 10 && Number(scoreTeam2) === 10){
                    alert("Error 3: Ergebnis nicht möglich")
                }
                else{
                    fetch("http://localhost:3000/updateMatchup", {
                        method: "post",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            scoreTeam1: scoreTeam1,
                            scoreTeam2: scoreTeam2,
                            matchup_id: id,
                            phase: phase,
                            team1: team1,
                            team2: team2
                        })
                    })
                    .then(response => response.json())           
                        setSet(true);
                }
                
                //post to database -> depending on phase value(group, quarter finals, semi finals, finals, platz3 with the matchup id
            }
            else {
                alert("Error 2: Ergebnis nicht möglich")
            }
        }
        else {
            alert("Error 1: Ergebnis nicht möglich")
        }
    }
        

    return(
        <div className="table" style={{
            backgroundColor: set ? "silver" : "white"
        }}>
            <div className="cell ba w-10">{(index+1)}</div>
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