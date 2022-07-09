import React, {useEffect, useState} from "react";
import GroupRow from "./GroupRow";
import "./GroupList.css"


const GroupList = ({teamsGroup1, teamsGroup2, teamsGroup3}) => {
    const [groups, setGroups] = useState([]);
    const [groupData, setGroupData] = useState([])
    //fetch while rendering the teams table -> names, standing and goals

    useEffect(() => {
      fetchGroups();
    }, [])

    const fetchGroups = () => {
        fetch("http://localhost:3000/fetchGroups/" + localStorage.getItem("tournament_id"), {
            method: "get",
            headers: {"Content-Type": "application/json"},            
        })
        .then(data => data.json())
        .then(data => {
            setGroups(data);
            let teamData = data.map(group => {
                delete group.group_id;
                delete group.tournament_id;
                return group;
            })
            teamData = teamData.map(group => {
                let team_ids = [];
                for (const item in group) {
                    team_ids.push(group[item]);
                  }
                return team_ids;
            })

            // console.log(teamData);  
            // setTeam_ids(teamData);
            return teamData;
        })
        .then(teamData_ids => {
            fetchTeams(teamData_ids);
        })
    }
    //standing name points and goals
    const fetchTeams = (teamData_ids) => {
        //fetch the teams
        /*
        thats the current format of teamData_ids 
        0: (3) ['991', '983', '984']
        1: (3) ['988', '985', '994']
        2: (3) ['992', '990', '993']
        3: (3) ['986', '987', '989']
        */
       fetch("http://localhost:3000/fetchTeams", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                team_ids: teamData_ids,
                tournament_id: localStorage.getItem("tournament_id")
            })
        })
        .then(data => data.json())
        .then(data => {
            //data; is the final array with all teams and all important information to display
            setGroupData(data);
        })
    }

    return(
        <div className="parent">
        {
            groupData.map((group, i) => {
                return(
                    <div key={i} className="child tc dib br3 pa3 bw2 ma2 shadow-5">
                        <div className="">
                            <div className="">
                                <div className="dt dt--fixed w-100 mb2">
                                    <div className="dtc ba">{"standing"}</div>
                                    <div className="dtc ba">{"name"}</div>
                                    <div className="dtc ba">{"points"}</div>
                                    <div className="dtc ba">{"goals"}</div>
                                </div> 
                            </div>
                        </div>
                        {
                            group.map((team) => {
                                return(
                                    <GroupRow key={team.team_id} standing={team.standing} name={team.name} points={team.points} goals={team.goals}/>
                                )
                            })
                        }
                    </div> 
                )
            })
        }
        </div>
    );
}

export default GroupList;