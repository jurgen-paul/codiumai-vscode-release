"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Shell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  value: number
}

export function BubblePop() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  const startGame = () => {
    setGameActive(true)
    setScore(0)
    setTimeLeft(30)
    setBubbles([])
  }

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return

    const createBubble = () => {
      if (!gameAreaRef.current) return

      const { width } = gameAreaRef.current.getBoundingClientRect()
      const newBubble: Bubble = {
        id: Date.now(),
        x: Math.random() * (width - 50),
        y: -50,
        size: Math.random() * 20 + 30,
        speed: Math.random() * 2 + 1,
        value: Math.floor(Math.random() * 5) + 1,
      }

      setBubbles((prev) => [...prev, newBubble])
    }

    const bubbleInterval = setInterval(createBubble, 1000)
    const moveInterval = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((bubble) => ({
            ...bubble,
            y: bubble.y + bubble.speed,
          }))
          .filter((bubble) => bubble.y < (gameAreaRef.current?.offsetHeight || 0)),
      )
    }, 50)

    return () => {
      clearInterval(bubbleInterval)
      clearInterval(moveInterval)
    }
  }, [gameActive])

  const popBubble = (id: number, value: number) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id))
    setScore((prev) => prev + value)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-blue-950/50 rounded-lg overflow-hidden">
      <div className="p-4 bg-blue-900/50 flex justify-between items-center">
        <div className="text-cyan-400 font-bold">Score: {score} CORAL</div>
        <div className="text-cyan-400 font-bold">Time: {timeLeft}s</div>
      </div>

      <div
        ref={gameAreaRef}
        className="relative h-[400px] bg-gradient-to-b from-blue-900/30 to-blue-950/30 overflow-hidden"
      >
        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/80">
            <Shell className="w-16 h-16 text-cyan-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Bubble Pop</h3>
            <p className="text-cyan-400 mb-4">Pop bubbles to earn CoralCoins!</p>
            <Button onClick={startGame} className="bg-cyan-600 hover:bg-cyan-700">
              Start Game
            </Button>
          </div>
        )}

        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute cursor-pointer"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => popBubble(bubble.id, bubble.value)}
          >
            <div className="w-full h-full rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/50 flex items-center justify-center text-white text-sm">
              {bubble.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

