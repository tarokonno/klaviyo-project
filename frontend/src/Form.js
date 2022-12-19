import React, { Fragment, useEffect, useState } from 'react';
import axios, { Axios } from "axios"
import Select from 'react-select'
import { PlayersData } from "./playersData"

function Form() {

  const players = PlayersData
  const playerOptions = players.map(player => ({ value: player.name, label: player.name }))

  const [data, setData] = useState({
    team: "",
    opposition: "",
    player: ""
  })

  const updateForm = (e) => {
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const updateTeam = (selectedOption) => {
    setData({...data, player: selectedOption.value})
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log(data)
    axios.post("/api/shot", {
        team: data.team,
        opposition: data.opposition,
        player: data.player
    }).then(res => {
        console.log(res.data)
    })
  }

  return (
    <div className="App" style={{display: "block"}}>
        <Select options={playerOptions} onChange={updateTeam} />
        <input onChange={(e) => updateForm(e)} id="team" value={data.team} type="text" placeholder="Team..." className="" style={{display: "block"}} />
        <input onChange={(e) => updateForm(e)} id="opposition" value={data.opposition} type="text" placeholder="Opposition..." className="" style={{display: "block"}} />
        <input onChange={(e) => updateForm(e)} id="player" value={data.player} type="text" placeholder="Player..." className="" style={{display: "block"}} />
        <button onClick={(e) => submitForm(e)} className="Form">Shoot</button>
    </div>
  );
}

export default Form;
