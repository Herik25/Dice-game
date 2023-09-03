import { useEffect, useState } from 'react'
import './App.css'
import Dice from './components/Dice'
import { nanoid } from 'nanoid';
import Confetti  from 'react-confetti';

function App() {

  const [ num, setNum ] = useState(allNewDice());
  const [ tenzies, setTenzies ] = useState(false);
  const [ timer, setTimer ] = useState(20);
  const [ gameover, setGameover ] = useState(false)

  useEffect(() => {
    const held = num.every(dice => dice.isHeld === true);
    const firstNum = num[0].value;
    const check = num.every(dice => dice.value === firstNum)
    if (held && check) {
      setTenzies(true)
      setTimer(timer)
    }
  }, [num])
 
  function generateNew(){
    return{
      value : Math.ceil(Math.random() * 6) ,
      isHeld : false,
      id : nanoid()
    }
  }

  function allNewDice(){
    const arr =[];
    for(let i = 0; i < 10; i++){
      arr.push(generateNew());
    }
    return arr;
  }

  function rollDice(){
    setNum(oldDice => oldDice.map(dice => {
      return dice.isHeld === true ?
        dice : generateNew()
    }))
  }
  
  useEffect(() => {
    if(tenzies===false && timer > 0){
      const interval = setInterval(() => {
        setTimer(timer => timer - 1)
      }, 1000);
      return () => {
        clearInterval(interval);
      }
    } else if(timer === 0 ){
      setGameover(true)
    }
  },[timer])

  function playAgain(){
    setTenzies(false)
    setNum(allNewDice)
    setTimer(20);
    setGameover(false)
  }

  function holdDice(id){
    setNum(oldDice => oldDice.map(dice => {
      return dice.id === id ?
        {...dice, isHeld: !dice.isHeld} :
        dice
    }))
  }

  const Elemts = num.map(dice => <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)} />)

  return (
    <div className='container'>
      <main>
          {tenzies && gameover===false && <Confetti />}
          <div>
            <img onClick={playAgain} className='restart' src="https://cdn4.iconfinder.com/data/icons/game-interface-outline/100/objects-07-512.png" alt="restart" />
            <span className='timer'>{timer > 0 ? timer : 0}</span>
          <h1 className='title'>Tenzies</h1>
          </div>
          <p className='instructions'>Roll untill all dice are the same. Click each dice to freeze it at its current value between rolls and before timer ends</p>
        
        <div className='dice-container'>
          {Elemts}
        </div>
        <button onClick={gameover || tenzies ? playAgain : rollDice}>{gameover || tenzies ? 'Playagain' : 'Roll' }</button>
      </main>
    </div>
  )
}

export default App
