import React, { useState, useEffect } from 'react'
import './Counter.css'

// Счётчик: хранит число в состоянии (useState) и меняет его кнопками
// и стрелками клавиатуры (дополнительное задание *).
const Counter = () => {
  // count — текущее значение, setCount — функция для его изменения
  const [count, setCount] = useState(0)

  // Доп. задание: подписываемся на нажатия клавиш на всём окне.
  // ArrowUp увеличивает значение, ArrowDown уменьшает.
  // Используем форму setCount((prev) => ...), потому что эффект создаётся
  // один раз ([] в зависимостях) и не «видит» свежий count.
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowUp') setCount((prev) => prev + 1)
      if (event.key === 'ArrowDown') setCount((prev) => prev - 1)
    }
    window.addEventListener('keydown', handleKeyPress)
    // Функция очистки: убираем обработчик, когда компонент удаляется
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="counter">
      <h2>Счетчик</h2>
      <p>Текущее значение: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
      <button onClick={() => setCount(count - 1)}>Уменьшить</button>
      <p className="hint">Можно также нажимать клавиши ↑ и ↓</p>
    </div>
  )
}

export default Counter
