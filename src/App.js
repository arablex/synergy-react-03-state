import React from 'react'
import Counter from './components/Counter'
import Timer from './components/Timer'

// Корневой компонент: собирает вместе Counter и Timer
const App = () => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>React State App</h1>
      <Counter />
      <Timer />
    </div>
  )
}

export default App
