import React from "react";
import GroupRow from "./GroupRow";
import "./GroupList.css"

const GroupList = ({teamsGroup1, teamsGroup2, teamsGroup3}) => {
    //fetch the database
    //assing new array with group objects
    //update always but only make changes if something changes?
    
    return(

        //map that part numberOfGroups times
        <div>
            <div className="parent">
                <div className="child tc dib br3 pa3 bw2 ma2 shadow-5">
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
                        teamsGroup1.map((team) => {
                            return(
                                <GroupRow key={team.id} standing={team.standing} name={team.name} points={team.points} goals={team.goals}/>
                            )
                        })
                    }
                </div>
                {/*  */}
                <div className="child tc dib br3 pa3 ma2 bw2 shadow-5">
                    <div >
                            <div className="w-auto">
                                <div className="dt dt--fixed w-100 mb2">
                                    <div className="dtc ba">{"standing"}</div>
                                    <div className="dtc ba">{"name"}</div>
                                    <div className="dtc ba">{"points"}</div>
                                    <div className="dtc ba">{"goals"}</div>
                                </div> 
                            </div>
                    </div>
                    {
                    teamsGroup2.map((team) => {
                        return(
                            <GroupRow key={team.id} standing={team.standing} name={team.name} points={team.points} goals={team.goals}/>
                        )
                    })
                    }
                </div>
                <div className=" child tc dib br3 pa3 ma2 bw2 shadow-5">
                    <div >
                            <div className="w-auto">
                                <div className="dt dt--fixed w-100 mb2">
                                    <div className="dtc ba">{"standing"}</div>
                                    <div className="dtc ba">{"name"}</div>
                                    <div className="dtc ba">{"points"}</div>
                                    <div className="dtc ba">{"goals"}</div>
                                </div> 
                            </div>
                    </div>
                    {
                    teamsGroup3.map((team) => {
                        return(
                            <GroupRow key={team.id} standing={team.standing} name={team.name} points={team.points} goals={team.goals}/>
                        )
                    })
                    }
                </div>

            </div>
        </div>
    );
}

export default GroupList;