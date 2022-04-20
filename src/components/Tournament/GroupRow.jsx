import React from "react";

const GroupRow = ({standing, name, points, goals}) => {
    
    return(
        <div>
            <div className="">
                <div className="w-auto">
                    <div className="dt dt--fixed w-100">
                        <div className="dtc ba">{standing}</div>
                        <div className="dtc ba ">{name}</div>
                        <div className="dtc ba">{points}</div>
                        <div className="dtc ba">{goals}</div>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default GroupRow;