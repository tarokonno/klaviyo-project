import React, { Fragment, useEffect, useState } from 'react';
import Profiles from './Profiles'
import axios, { Axios } from "axios"
import { PlayersData } from "./playersData"
import Players from './Players'
import Form from './Form'

function App() {

  const [profileData, setProfileData] = useState([{}])
  const [queryProfiles, setQueryProfiles] = useState("")
  const profiles = profileData.data || []

  const [playersData, setPlayersData] = useState([{}])
  const [queryPlayers, setQueryPlayers] = useState("")
  const players = PlayersData

  const searchProfiles = (data) => {
    return data.filter((profile) => profile.attributes.first_name.toLowerCase().includes(queryProfiles.toLowerCase()))
  }

  const searchPlayers = (data) => {
    return data.filter((player) => player.name.toLowerCase().includes(queryPlayers.toLowerCase()))
  }

  useEffect(() => {
    const getProfiles = async () => {
      const res = await axios.get("/api/profiles")
      setProfileData(res.data);
    };
    getProfiles()
  }, []);

  return (
    <div className="App" style={{display: "block"}}>
      {/* <div className="Profiles">
        <h1>Profiles</h1>
        <input type="text" placeholder="Search..." className="searchprofiles" onChange={e => setQueryProfiles(e.target.value)} style={{display: "block"}} />
        <Profiles data={searchProfiles(profiles)} />
      </div>
      <div className="Players" style={{display: "block"}}>
        <h1>Players</h1>
        <input type="text" placeholder="Search..." className="searchplayers" onChange={e => setQueryPlayers(e.target.value)} style={{display: "block"}} />
        <Players data={searchPlayers(players)} />
      </div> */}
      <Form />
      <Players data={searchPlayers(players)} />
    </div>
  );
}

export default App;
