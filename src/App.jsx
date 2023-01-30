import React, { useState, useEffect } from 'react'
import './App.css'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [win, setWin] = React.useState(false)
  const [rollCount, setRollCount] = React.useState(0)
  const [highScore, setHighScore] = React.useState(localStorage.getItem("key") || undefined)
  const [newHighScore, setNewHighScore] = React.useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSame = dice.every(die => die.value === firstValue)
    if (allHeld & allSame) {
      setWin(true)
    }
  }, [dice])


  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    setNewHighScore(false)
    if(win) {
      setWin(false)
      setDice(allNewDice())
      if (!highScore) {
        localStorage.setItem("key", rollCount)
        setHighScore(rollCount)
        setNewHighScore(true)
      }
      if (rollCount < highScore) {
        localStorage.setItem("key", rollCount)
        setHighScore(rollCount)
        setNewHighScore(true)
      }
      setRollCount(-1)
    }
    setRollCount(prevCount => prevCount + 1)
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }

  function holdDice(id) {
    setNewHighScore(false)
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  const diceElements = dice.map(die => <Die value={die.value} key={die.id} 
    isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)


  return (
    <div className="main"  >
        {newHighScore && <Confetti />}
        <div className="title" >Tenzies</div>
        <div className="title-text">
        The objective of this game is to have all of the dice held at the same number.
        To hold a number, click on the die. Click roll to generate new dice.
        </div>
        <div className="container">
          {diceElements}
        </div>
        <div>Current Count: {rollCount}</div>
        <div>Best Score: {highScore}</div>
        <button onClick={rollDice}>{win ? "New Game" : "Roll"}</button>
        {newHighScore && <div>New High Score!</div>}
    </div>
  )
}

export default App
