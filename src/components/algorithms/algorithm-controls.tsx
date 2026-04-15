import { Pause, Play, RotateCcw, Shuffle, SkipForward } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { formatMilliseconds } from "@/lib/format"

type AlgorithmControlsProps = {
  isPlaying: boolean
  isStepDisabled: boolean
  onRandomize: () => void
  onReset: () => void
  onStep: () => void
  onTogglePlay: () => void
  onSpeedChange: (value: number) => void
  speed: number
}

export function AlgorithmControls({
  isPlaying,
  isStepDisabled,
  onRandomize,
  onReset,
  onStep,
  onTogglePlay,
  onSpeedChange,
  speed,
}: AlgorithmControlsProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Button onClick={onTogglePlay} size="sm" type="button">
          {isPlaying ? <Pause /> : <Play />}
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <Button
          onClick={onStep}
          size="sm"
          type="button"
          variant="outline"
          disabled={isStepDisabled}
        >
          <SkipForward />
          Step
        </Button>

        <Button onClick={onReset} size="sm" type="button" variant="outline">
          <RotateCcw />
          Reset
        </Button>

        <Button onClick={onRandomize} size="sm" type="button" variant="secondary">
          <Shuffle />
          Randomize
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium">Playback speed</span>
          <span className="text-muted-foreground">
            {formatMilliseconds(speed)}
          </span>
        </div>

        <Slider
          min={150}
          max={1200}
          step={50}
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0] ?? speed)}
        />
      </div>
    </div>
  )
}
