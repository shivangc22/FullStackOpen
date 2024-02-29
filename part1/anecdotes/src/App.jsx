import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initialVotes = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  }
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(initialVotes)

  const onNextClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const onVoteClick = () => {
    const updatedVotes = { ...votes}
    updatedVotes[selected] += 1
    setVote(updatedVotes)
    console.log(updatedVotes)
  }

  return (
    <div>
      <h1>{anecdotes[selected]}</h1>
      <p>This has {votes[selected]} votes!</p>
      <Button onClick = {onNextClick} label = 'Next' />
      <Button onClick = {onVoteClick} label = 'Vote' /><br />
      <HighestAnecdote anecdotesList={anecdotes} voteList={votes} />
    </div>
  )
}

const Button = ({onClick, label}) => <button onClick = {onClick}>{label}</button>

const HighestAnecdote = ({anecdotesList, voteList}) => {
  const maxVotes = Math.max(...Object.values(voteList))
  if(maxVotes === 0) {
    return <p>No anecdote has been voted for!</p>
  }
  const maxVotesIndices = Object.keys(voteList).filter(index => voteList[index] === maxVotes)
  if(maxVotesIndices.length === 1) {
    return(
      <>
        <p>The highest voted anecdote, with {maxVotes} votes is: </p>
        <h1>{anecdotesList[maxVotesIndices[0]]}</h1>
      </>
    )
  } else {
    return(
      <>
        <p>The highest voted anecdotes, with {maxVotes} votes each, are: </p>
        {maxVotesIndices.map(index => (
          <div key = {index}>
            <h1>{anecdotesList[index]}</h1>
          </div>
        ))}
      </>
    )
  }
}
export default App