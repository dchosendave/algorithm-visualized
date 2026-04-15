import { useEffect, useMemo, useState } from "react"

export function useAlgorithmPlayer<T>(steps: T[], initialSpeed = 450) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(initialSpeed)

  useEffect(() => {
    setStepIndex(0)
    setIsPlaying(false)
  }, [steps])

  useEffect(() => {
    if (!isPlaying || steps.length === 0) {
      return
    }

    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setStepIndex((current) => Math.min(current + 1, steps.length - 1))
    }, speed)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isPlaying, speed, stepIndex, steps])

  const currentStep = useMemo(() => {
    return steps[stepIndex] ?? null
  }, [stepIndex, steps])

  function play() {
    if (steps.length <= 1) {
      return
    }

    setStepIndex((current) => {
      if (current >= steps.length - 1) {
        return 0
      }

      return current
    })

    setIsPlaying(true)
  }

  function pause() {
    setIsPlaying(false)
  }

  function togglePlay() {
    if (isPlaying) {
      pause()
      return
    }

    play()
  }

  function nextStep() {
    setIsPlaying(false)
    setStepIndex((current) => Math.min(current + 1, steps.length - 1))
  }

  function reset() {
    setIsPlaying(false)
    setStepIndex(0)
  }

  return {
    currentStep,
    isPlaying,
    speed,
    stepIndex,
    totalSteps: steps.length,
    isAtEnd: stepIndex >= Math.max(steps.length - 1, 0),
    nextStep,
    pause,
    play,
    reset,
    setSpeed,
    togglePlay,
  }
}
