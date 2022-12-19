import React from "react";

const Players = ({data}) => {
    return (
        (typeof data === 'undefined') ? (<tr><td>Loading...</td></tr>) : (
            data.map((player, i) => (
                
                <div style={{display: "inline-block", padding: "0 20px"}}>
                    <img width="100" alt={player.name} src={player.image} />
                    <p>{player.name}</p>
                </div>
                
            ))
        )
    )
}

export default Players;