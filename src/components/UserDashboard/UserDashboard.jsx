import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Tournament from '../Tournament/Tournament';

const UserDashboard = ({user}) => {
  const [newTournamentName, setNewTournamentName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedTournament, setSelectedTournament] = useState("");
  let navigate = useNavigate();

  const onSelectTournament = () => {

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
                <select className="ma1" name="tournament">
                    <option value="">Select tournament</option>
                    {/* render options -> from the database
                    view implementation in notes app -> value and state */}
                </select><br/>
                <button onClick={onSelectTournament}className="ma3">Select</button>
            </div>
        </div>
      </div>
    </>
  );
}


export default UserDashboard;
