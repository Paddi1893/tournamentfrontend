import React,{useState} from "react";
import Matchup from "./Matchup";

const Playoffs = () => {
    const [semi_finals, setSemi_finals] = useState(true); //default false
    const [finals, setFinals] = useState(true); //default false

    const activateSemiFinals = () => {
        //check if all games have been played in the database all values need to be the conditions then get a true or false from the base
        setSemi_finals(true);
    }

    const activateFinals = () => {
        //check if all games have been played in the database all values need to be the conditions then get a true or false from the base
        setFinals(true);
    }

    //dummy
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
    return (
        <div>
            <h1>Quarter Finals</h1>
            {
                matchups.map(matchup => {
                    return <Matchup  key={matchup.id} id={matchup.id} group={matchup.group} team1={matchup.team1} team2={matchup.team2} table={matchup.table}/>
                })
            }{
                matchups.map(matchup => {
                    return <Matchup  key={matchup.id} id={matchup.id} group={matchup.group} team1={matchup.team1} team2={matchup.team2} table={matchup.table}/>
                })
            
            }
            <button onClick={activateSemiFinals} className="mt4">Proceed to Semi Finals</button>
            {
                semi_finals ? (
                    <>
                        <h1>Semi Finals</h1>
                        {
                            matchups.map(matchup => {
                                return <Matchup  key={matchup.id} id={matchup.id} group={matchup.group} team1={matchup.team1} team2={matchup.team2} table={matchup.table}/>
                            })
                        
                        }
                        <button onClick={activateFinals} className="mt4">Proceed to FINALS</button>
                        </> 
                ) : <></>
            }
            {
                finals ? (
                    <>
                        <h1>Spiel um Platz 3</h1>
                        <Matchup  key={matchups[0].id} id={matchups[0].id} group={matchups[0].group} team1={matchups[0].team1} team2={matchups[0].team2} table={matchups[0].table}/>
                        <h1>FINALE</h1>
                        <Matchup  key={matchups[1].id} id={matchups[1].id} group={matchups[1].group} team1={matchups[1].team1} team2={matchups[1].team2} table={matchups[1].table}/>
                        <div className="pb6"></div>
                    </>
                    ): <></>
            }            
        </div>
    );

    
}

export default Playoffs