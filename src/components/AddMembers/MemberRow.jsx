import React from "react";

const MemberRow = ({onDelete, firstName, lastName, count, member_id}) => {

    return(
        <div className="parentMembers">
            <div className="childMembers ba mt3 w-40">
                <div className="dt dt--fixed w-100 bg-white">
                    <div className="dtc ba">{count}</div>
                    <div className="dtc ba">{firstName}</div>
                    <div className="dtc ba">{lastName}</div>
                    <div className="dtc ba pointer bg-dark-red"><p onClick={() => onDelete(count, firstName, member_id)}><b>DELETE</b></p></div>
                </div>
            </div>    
        </div>
    )
}

export default MemberRow;