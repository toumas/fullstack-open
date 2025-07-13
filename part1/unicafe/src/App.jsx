import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={() => {setGood(good + 1)}}>good</Button>
      <Button onClick={() => {setNeutral(neutral + 1)}}>neutral</Button>
      <Button onClick={() => {setBad(bad + 1)}}>bad</Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
