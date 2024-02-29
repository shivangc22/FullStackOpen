import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodFeedback = () => setGood(good + 1);
  const onNeutralFeedback = () => setNeutral(neutral + 1);
  const onBadFeedback = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1><br />
      <Button onClick = {onGoodFeedback} label = 'Good' />
      <Button onClick = {onNeutralFeedback} label = 'Neutral' />
      <Button onClick = {onBadFeedback} label = 'Bad' /> <br />
      <h1>Statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

const Button = ({onClick, label}) => <button onClick = {onClick}>{label}</button>

const StatisticLine = ({label, value}) => <tr><td>{label}:</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  if(good + bad + neutral > 0) {
    return(
      <div>
        <table>
          <tbody>
          <StatisticLine label = 'Good' value = {good} />
          <StatisticLine label = 'Neutral' value = {neutral} />
          <StatisticLine label = 'Bad' value = {bad} />
          <StatisticLine label = 'All' value = {good + bad + neutral} />
          <StatisticLine label = 'Average' value = {(good - bad)/(good + bad + neutral)} />
          <StatisticLine label = 'Positive (in %)' value = {(good - bad) * 100/(good + bad + neutral)} />
          </tbody>
        </table>
      </div>
    )
  } else return <p>No feedback given!</p>
}
export default App