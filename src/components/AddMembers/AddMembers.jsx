import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import "./AddMembers.css";
import MemberRow from "./MemberRow";
///to do:
//make a row component -> render the rows -> with map -> like the user list



const AddMembers = ({user}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [numberOfGroups, setNumberOfGroups] = useState(null);
    const [numberOfTables, setNumberOfTables] = useState(null);
    const [members, setMembers] = useState([]);
    let navigate = useNavigate();
    
    //event listener for return key
    useEffect(() => {
        const keydownHandler = (e) => {
            if(e.keyCode===13) {
                onAddMember();
            }
        }
        document.addEventListener('keydown',keydownHandler);
        //important this substitutes the componentUnmount
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        }
    })

    useEffect(() => {
        getMembers();
    }, []) //bei jedem update und mount

    //fetch members from the database
    const getMembers = () => {
        fetch("http://localhost:3000/getmembers/" + localStorage.getItem("tournament_id"), {
            method: "get",
            headers: {"Content-Type": "application/json"},            
        })
        .then(response => response.json())
        .then(members => {
            setMembers(members) //[{first_name, last_name, member_id},{...}]
        })
    }
    //add members to the database
    const onAddMember = () => {
        if(firstName && lastName){
            fetch("http://localhost:3000/addmember", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    tournament_id: localStorage.getItem("tournament_id")
                })
            })
            .then(response => response.json()) 
            .then(member => {
                setMembers(oldmembers => [...oldmembers, member])
            })
            .then(()=> {
                setFirstName("");
                setLastName("");
            })
        }
    }
    //delete members from the database
    const onDelete = (count, firstName, member_id) => {
        // console.log(firstName,"  ", member_id)
        // console.log(count);
        fetch("http://localhost:3000/deletemember/" + member_id, {method: "delete"})
        .then(response => response.json())
        .then(message => {
            if(message === "user deleted"){
                getMembers();
            }
        })
        .catch(err => console.log(err))
    }
    const onCreateTournament = () => {        
        //check all logic on the backend
        if(securityCheck()){
            fetch("http://localhost:3000/createFinalTournament", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    numberOfGroups: numberOfGroups,
                    numberOfTables: numberOfTables,
                    tournament_id: localStorage.getItem("tournament_id")
                })
            })
            .then(response => response.json())
            .then(message => {
                console.log(message);
                // navigate("/tournament");
            })
        }
        
    }

    const securityCheck = () => {
        if(members.length % 2 === 0){
            if(members.length > 24){
                console.log(true)
                if(numberOfGroups !== null && numberOfGroups >= 4){
                    if(numberOfTables !== null){
                        return true
                    }
                    else{
                        alert("Please enter a valid number of tables to be played on.")
                    }
                }
                else{
                    alert("Please enter how many groups should be made.")
                }
            }
            else{
                alert("please enter at least 24 members, 12 Teams.")
            }
            
        }
        else{
            alert("number of members is not even");
        }
    }

    return(
        <>
            <div className="tc mb6">
                <h1 className=''>Add new Members {user.name}!</h1>
                <div className="flex justify-center">
                    <div className="ba ph4 pb3">
                        <p>First Name</p>
                        <input value={firstName} autoFocus onChange={(e) => setFirstName(e.target.value)}/>
                        <p>Last Name</p>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>
                        <button onClick={onAddMember} className="mt3">Add Member</button>
                    </div> 
                </div>
                {
                    members.map((member, i) => {
                        return <MemberRow onDelete={onDelete} member_id={member.member_id} firstName={member.first_name} lastName={member.last_name} count={i+1} key={i} />
                    })
                }
                
                <h3 className="mt5">Number of Groups:</h3>
                <p className="i">Minimum 4</p>
                <input onChange={(e) => setNumberOfGroups(e.target.value)} size={1}/>
                <h3 className="mt2">Number of Tables: </h3>
                <input className="mb3" onChange={(e) => setNumberOfTables(e.target.value)} size={1}/>
                <br/>
                <button onClick={onCreateTournament} className='ma1 mt3 mb3'>Create Tournament</button>
            </div>     
        </>
    )
}

export default AddMembers;