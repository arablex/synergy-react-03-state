import React, { useState, useEffect } from 'react'
import './Timer.css'

const MAX_SECONDS = 30 // через столько секунд таймер остановится сам
const MIN_INTERVAL = 100 // нижняя граница интервала, чтобы не «заспамить» React

const Timer = () => {
  // elapsedMs — сколько миллисекунд прошло (храним в мс, чтобы корректно
  // считать при любом интервале обновления)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [intervalTime, setIntervalTime] = useState(1000) // интервал обновления, мс
  const [isRunning, setIsRunning] = useState(true) // идёт ли таймер

  const finished = elapsedMs >= MAX_SECONDS * 1000

  // Асинхронное обновление времени: setInterval вызывает функцию каждые
  // intervalTime миллисекунд. Эффект перезапускается, если меняется
  // isRunning или intervalTime (они указаны в массиве зависимостей).
  useEffect(() => {
    if (!isRunning || finished) return
    const timer = setInterval(() => {
      setElapsedMs((prev) => prev + intervalTime)
    }, intervalTime)
    // Очистка: останавливаем старый интервал перед созданием нового
    return () => clearInterval(timer)
  }, [isRunning, intervalTime, finished])

  // Меняем интервал из поля ввода. Пустое/слишком маленькое значение игнорируем.
  const handleIntervalChange = (e) => {
    const value = Number(e.target.value)
    if (value >= MIN_INTERVAL) setIntervalTime(value)
  }

  const handleReset = () => {
    setElapsedMs(0)
    setIsRunning(true)
  }

  return (
    <div className="timer">
      <h2>Таймер</h2>
      <p>Прошло времени: {(elapsedMs / 1000).toFixed(1)} секунд</p>
      <p className="hint">Обновление каждые {intervalTime} мс</p>
      {/* Сообщение, когда время вышло */}
      {finished && <p className="finished">Время вышло! Таймер остановлен через {MAX_SECONDS} секунд.</p>}
      <button onClick={() => setIsRunning(!isRunning)} disabled={finished}>
        {isRunning ? 'Пауза' : 'Запустить'}
      </button>
      <button onClick={handleReset}>Сброс</button>
      <input
        type="number"
        min={MIN_INTERVAL}
        step="100"
        placeholder="Интервал (мс)"
        onChange={handleIntervalChange}
      />
    </div>
  )
}

export default Timer
