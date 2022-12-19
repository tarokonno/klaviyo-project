import React, { useEffect, useState } from 'react'
import axios from "axios"
import { CountryData } from "./countryData"
import { PlayersData } from "./playersData"
import Select from 'react-select'
import './App.css'

function App() {

  // Set Current Date
  const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let currentDate = new Date()
  let date = currentDate.getDate() + " " + months[currentDate.getMonth()] + " " + currentDate.getFullYear()

  // Set State and Defaults
  const [allProfilesData, setAllProfilesData] = useState([{}])
  const [isProfileValid, setIsProfileValid] = useState(true)
  const [teamData, setTeamData] = useState({name: 'TBD', flag: '../images/country.png'})
  const [oppositionData, setOppositionData] = useState({name: 'TBD', flag: '../images/country.png'})
  const [playersData, setPlayersData] = useState({name: 'Player', country: 'TBD', image: '../images/player.png'})
  const [formData, setFormData] = useState({email: "", team: "", opposition: "", player: "", result: ""})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [eventsData, setEventsData] = useState([{}])

  // Set Data Variables
  const countries = CountryData
  const players = PlayersData
  const profiles = allProfilesData.data || []
  const events = eventsData.data || []

  // Load All Profiles from Profile API
  useEffect(() => {
    const getProfiles = async () => {
      const res = await axios.get("/api/profiles")
      setAllProfilesData(res.data);
    };
    getProfiles()
  }, []);

  // Load All Events from Events API
  useEffect(() => {
    const getEvents = async () => {
      const res = await axios.get("/api/events")
      setEventsData(res.data);
    };
    getEvents()
  }, []);
  
  // Set Dropdown Options
  const teamOptions = countries.map(country => ({ value: country.name, label: country.name }))
  const oppositionOptions = countries.map(country => ({ value: country.name, label: country.name }))
  const playerOptions = players.filter(player => player.country === teamData.name).map(player => ({ value: player.name, label: player.name }))

  // Update Profile Function
  const updateProfile = (e) => {

    // Validate Input with Profiles API data
    const findProfile = profiles.find((profile) => profile.attributes.email.toLowerCase() === (e.target.value.toLowerCase()))
    
    // Set Form data and Validation flags
    if(findProfile) {
      setIsProfileValid(true)
      setFormData({...formData, email: e.target.value})
    } else {
      setIsProfileValid(false)
      console.log(isProfileValid)
    }
  }

  // Update Team Function
  const updateTeam = (selectedOption) => {
    const findCountry = countries.find((country) => country.name.toLowerCase().includes(selectedOption.value.toLowerCase()))
    setTeamData({name: findCountry.name, flag: findCountry.flag})
    setFormData({...formData, team: findCountry.name})
  }

  // Update Opposition Function
  const updateOpposition = (selectedOption) => {
    const findCountry = countries.find((country) => country.name.toLowerCase().includes(selectedOption.value.toLowerCase()))
    setOppositionData({name: findCountry.name, flag: findCountry.flag })
    setFormData({...formData, opposition: findCountry.name})
  }

  // Update Player Function
  const updatePlayer = (selectedOption) => {
    const findPlayer = players.find((player) => player.name.toLowerCase().includes(selectedOption.value.toLowerCase()))
    setPlayersData({name: findPlayer.name, country: findPlayer.country, image: findPlayer.image })
    setFormData({...formData, player: findPlayer.name})
  }

  // Update Result with Random 50% Chance
  const kickPenalty = () => {
    const result = (Math.floor(Math.random() * 2) === 0)
    if(result){
    	setFormData({...formData, result: 'goal'})
    } else {
      setFormData({...formData, result: 'miss'})
    }
  }

  // Update isSubmitted 
  const updateIsSubmitted = () => {
    setIsSubmitted(!isSubmitted)
  }

  // Submit Form Data Object to /api/shot
  const submitForm = (e) => {
    e.preventDefault()
    kickPenalty()
    setTimeout(updateIsSubmitted(),500)
  }

  // Post Data to /api/shot 
  useEffect(() => {
    const postData = async () => {
      axios.post("/api/shot", {
        email: formData.email,
        team: formData.team,
        opposition: formData.opposition,
        player: formData.player,
        result: formData.result
      }).then(res => {
        console.log(res.data)
      })
    }

    // Ensure result function returns value before posting
    if(formData.result !== "") {
      postData()
      console.log(formData)
    }
  }, [formData])

  return (
    <div className="App">
      <div className="Container">
        <div className={isSubmitted ? "Hide" : "Content"}>
          <h1 className="Title">2022 World Cup Shootout</h1>
          <div className="Form">
            <input className="Profile" type="text" placeholder="Your Email Address..." onChange={e => updateProfile(e)} />
            <p className={isProfileValid ? "Hide" : "EmailError"}><span>Please enter the email to your valid Klaviyo account.</span></p>
            <Select className="Team" placeholder="Your Team" options={teamOptions} onChange={updateTeam} />
            <Select className="Opposition" placeholder="Your Opponent" options={oppositionOptions} onChange={updateOpposition} />
            <Select className="Player" placeholder="Your Player" options={playerOptions} onChange={updatePlayer} />
          </div>
          <div className="MatchDetails">
            <div className="Teams">
              <h4 className="MatchDate">{date}</h4>
              <div className="Country Team">
                  <img alt={teamData.name} src={teamData.flag} />
                  <h3 className="CountryName">{teamData.name}</h3>
              </div>
              <div className="Country Opposition">
                  <img alt={oppositionData.name} src={oppositionData.flag} />
                  <h3 className="CountryName">{oppositionData.name}</h3>
              </div>
            </div>
            <div className="Player">
                <img alt={playersData.name} src={playersData.image} />
                <h3 className="PlayerName">{playersData.name}</h3>
            </div>
          </div>
          <button className="Button" onClick={(e) => submitForm(e)} disabled={(formData.email === '' || isProfileValid === false) || formData.team === '' || formData.opposition === '' || formData.player === ''}>
            Shoot
          </button>
        </div>
        <div className={isSubmitted ? "Confirmation" : "Hide"}>
          <img className="Hero" alt="Confirmation" src="http://localhost:3000/images/penalty-lineup.png" />
          <h1>{playersData.name} shoots...</h1>
          <img className="Icon" alt="Email Sent" src="http://localhost:3000/images/email.gif" />
          <h3>
            An email has been sent to your inbox with the result.
            <br/><br/>
            Check your email to see if you scored a winner!
            <br/><br/>
            Best of luck!
          </h3>
        </div>
      </div>
      <div className="EventsFeed">
        <h3>Recent Results</h3>
          {
            events.map((event,i) => {
              return (
                <div className="Event">
                  <img className="ResultIcon" alt="Result Icon" src={event.attributes.event_properties.result === 'goal' ? "https://cdn-icons-png.flaticon.com/512/4315/4315445.png" : "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"}/>
                  <p className="ResultText">{event.attributes.event_properties.result}</p>
                  <p className="EventPlayer">{event.attributes.event_properties.player}</p>
                  <p className="EventTeams">{event.attributes.event_properties.team} vs {event.attributes.event_properties.opposition}</p>
                </div>
              )
            })
          }
      </div>
    </div>
  )
}

export default App
