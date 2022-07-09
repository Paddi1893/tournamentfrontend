import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Tournament from '../Tournament/Tournament';

const UserDashboard = ({user}) => {
  const [newTournamentName, setNewTournamentName] = useState("");
  const [availableTournaments, setAvailableTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  useEffect(()=> {
    fetchTournamentSelections();    
  }, [])
  
  let navigate = useNavigate();
  
  const fetchTournamentSelections = () => {
    fetch("http://localhost:3000/getTournamentSelection/" + localStorage.getItem("id"), {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data); //{tournament_id: '38', tournament_name: 'dummy'}
      setAvailableTournaments(data);
    })
  }
  
  const onSelectTournament = () => {
    console.log(selectedTournament);
    const tournament_id = selectedTournament.substring(0, selectedTournament.indexOf(" "));
    const tournament_name = selectedTournament.substring((selectedTournament.indexOf(" ")+1));
    
    localStorage.setItem("tournament_id", tournament_id);
    navigate("/tournament");

  }
  const onCreateTournament = () => {
    if(newTournamentName){
      fetch("http://localhost:3000/createT", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              newTournamentName: newTournamentName,
              user: user
            })
        })
        .then(response => response.json())
        .then(tournament => {
            if(tournament[0].tournament_id){
              localStorage.setItem("tournament_id", tournament[0].tournament_id);
              navigate("/members");
            }
            else {
              alert(tournament);
              setNewTournamentName("");
            }
        })
        .catch(err => console.log(err));
    }
  }

  return(
    <>
      <div className='tc'>
        <h1 className=''>Welcome Back {user.name}</h1>
        <div className='flex justify-center'>
            <div className='ba w-50'>
                <h2>Create Tournament</h2>
                <input className='mt3' value = {newTournamentName} onChange={(event) => setNewTournamentName(event.target.value)} placeholder='Tournament Name'/><br/>
                <button onClick={onCreateTournament} className='ma1 mb3'>Create New Tournament</button>  
            </div>
            <div className='ba w-50'>
                <h2>Select Tournament</h2>
                <select className="ma1" name="tournament" onChange={(event) => {
                  setSelectedTournament(event.target.value);
                }}>
                    <option value="">Select tournament</option>
                    {
                      availableTournaments.map(tournament =>  {
                        return <option key={tournament.tournament_id} value={tournament.tournament_id  + " " + tournament.tournament_name}>{tournament.tournament_id + " " + tournament.tournament_name}</option>
                      })
                    }
                </select><br/>
                <button onClick={onSelectTournament}className="ma3">Select</button>
            </div>
        </div>
      </div>
    </>
  );
}


export default UserDashboard;
