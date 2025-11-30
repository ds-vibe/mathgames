"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/store/useAppState";
import { ArrowLeft, Play, RotateCcw, Trophy, Car } from "lucide-react";

// Types
interface VehicleConfig {
  name: string;
  mass: number;
  friction: number;
  color: number;
  emoji: string;
}

interface RaceResult {
  position: number;
  time: number;
  distance: number;
}

const VEHICLES: VehicleConfig[] = [
  { name: "Sports Car", mass: 1, friction: 0.1, color: 0xff3366, emoji: "🏎️" },
  { name: "Monster Truck", mass: 3, friction: 0.3, color: 0x00aa44, emoji: "🚚" },
  { name: "Motorcycle", mass: 0.5, friction: 0.05, color: 0x3366ff, emoji: "🏍️" },
  { name: "Bus", mass: 5, friction: 0.4, color: 0xffaa00, emoji: "🚌" },
];

interface ForceMotionDerbyProps {
  level: number;
  onComplete: (score: number, stars: number) => void;
  onQuit: () => void;
}

function ForceMotionDerbyGame({ level, onComplete, onQuit }: ForceMotionDerbyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const { addXP } = useAppState();

  const [gameState, setGameState] = useState<"menu" | "setup" | "racing" | "question" | "results">("menu");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleConfig | null>(null);
  const [force, setForce] = useState(50);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [question, setQuestion] = useState<{
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const TOTAL_ROUNDS = 5;

  // Physics questions based on what happened
  const generateQuestion = useCallback((vehicle: VehicleConfig, appliedForce: number, result: RaceResult) => {
    const questions = [
      {
        text: `Your ${vehicle.name} had more mass than the motorcycle. What happens when you push heavier objects with the same force?`,
        options: [
          "They go faster",
          "They go slower",
          "Speed stays the same",
          "They float",
        ],
        correct: 1,
        explanation: "Heavier objects (more mass) accelerate more slowly when pushed with the same force. F = ma means bigger m = smaller a!",
      },
      {
        text: "What is friction?",
        options: [
          "A force that speeds things up",
          "A force that slows things down",
          "A type of fuel",
          "A color",
        ],
        correct: 1,
        explanation: "Friction is a force that opposes motion and slows things down. Rough surfaces have more friction!",
      },
      {
        text: `If you pushed the ${vehicle.name} with MORE force, what would happen?`,
        options: [
          "It would go slower",
          "Nothing different",
          "It would go faster",
          "It would turn left",
        ],
        correct: 2,
        explanation: "More force = more acceleration. That's Newton's Second Law: F = m × a",
      },
      {
        text: "Why did the vehicle eventually stop?",
        options: [
          "It ran out of gas",
          "Friction and air resistance",
          "It got tired",
          "The track ended",
        ],
        correct: 1,
        explanation: "Friction between the wheels and ground, plus air resistance, gradually slow down moving objects.",
      },
      {
        text: `The ${vehicle.name} has ${vehicle.friction > 0.2 ? "high" : "low"} friction. What does this mean?`,
        options: [
          vehicle.friction > 0.2 ? "It slides easily" : "It grips the road well",
          vehicle.friction > 0.2 ? "It grips the road well" : "It slides more easily",
          "It's very loud",
          "It uses less fuel",
        ],
        correct: 1,
        explanation: vehicle.friction > 0.2 
          ? "High friction means the vehicle grips the road but also slows down faster."
          : "Low friction means less grip but the vehicle can slide and coast farther.",
      },
    ];

    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }, []);

  // Initialize Phaser game
  useEffect(() => {
    if (!containerRef.current || gameState !== "racing" || !selectedVehicle) return;

    let Phaser: typeof import("phaser");

    const initPhaser = async () => {
      Phaser = (await import("phaser")).default;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: containerRef.current!,
        width: containerRef.current!.clientWidth,
        height: 300,
        backgroundColor: "#87CEEB",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 300 },
            debug: false,
          },
        },
        scene: {
          preload: function (this: Phaser.Scene) {
            // Create vehicle sprite
            const graphics = this.make.graphics({ x: 0, y: 0 });
            graphics.fillStyle(selectedVehicle.color);
            graphics.fillRoundedRect(0, 0, 80, 40, 8);
            graphics.fillStyle(0x333333);
            graphics.fillCircle(15, 40, 12);
            graphics.fillCircle(65, 40, 12);
            graphics.generateTexture("vehicle", 80, 52);
            graphics.destroy();

            // Create ground
            const groundGraphics = this.make.graphics({ x: 0, y: 0 });
            groundGraphics.fillStyle(0x8B4513);
            groundGraphics.fillRect(0, 0, 64, 64);
            groundGraphics.generateTexture("ground", 64, 64);
            groundGraphics.destroy();

            // Create finish line
            const finishGraphics = this.make.graphics({ x: 0, y: 0 });
            finishGraphics.fillStyle(0xffffff);
            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                  finishGraphics.fillRect(i * 16, j * 16, 16, 16);
                }
              }
            }
            finishGraphics.generateTexture("finish", 64, 128);
            finishGraphics.destroy();
          },

          create: function (this: Phaser.Scene) {
            const width = this.cameras.main.width;
            const height = this.cameras.main.height;

            // Ground
            const ground = this.physics.add.staticGroup();
            for (let x = 0; x < width * 3; x += 64) {
              ground.create(x, height - 32, "ground");
            }

            // Finish line
            const finishX = width * 2;
            this.add.image(finishX, height - 96, "finish");

            // Vehicle
            const vehicle = this.physics.add.sprite(100, height - 80, "vehicle");
            vehicle.setCollideWorldBounds(false);
            vehicle.setBounce(0.2);
            vehicle.setDrag(selectedVehicle.friction * 100, 0);
            vehicle.setMass(selectedVehicle.mass);

            // Collide with ground
            this.physics.add.collider(vehicle, ground);

            // Camera follows vehicle
            this.cameras.main.startFollow(vehicle, true, 0.1, 0.1);
            this.cameras.main.setBounds(0, 0, width * 3, height);

            // Apply force
            const acceleration = (force * 10) / selectedVehicle.mass;
            vehicle.setVelocityX(acceleration);

            // Track distance and time
            const startTime = Date.now();
            let maxDistance = 0;

            // Update loop
            this.events.on("update", () => {
              const currentDistance = vehicle.x - 100;
              if (currentDistance > maxDistance) {
                maxDistance = currentDistance;
              }

              // Check if crossed finish line
              if (vehicle.x >= finishX) {
                const time = (Date.now() - startTime) / 1000;
                setRaceResult({
                  position: 1,
                  time: Math.round(time * 100) / 100,
                  distance: Math.round(maxDistance),
                });
                
                // Generate physics question
                const q = generateQuestion(selectedVehicle, force, {
                  position: 1,
                  time,
                  distance: maxDistance,
                });
                setQuestion(q);
                setGameState("question");
                this.scene.pause();
              }

              // Check if stopped
              if (Math.abs(vehicle.body?.velocity?.x || 0) < 10 && vehicle.x > 150) {
                const time = (Date.now() - startTime) / 1000;
                setRaceResult({
                  position: 2,
                  time: Math.round(time * 100) / 100,
                  distance: Math.round(maxDistance),
                });
                
                const q = generateQuestion(selectedVehicle, force, {
                  position: 2,
                  time,
                  distance: maxDistance,
                });
                setQuestion(q);
                setGameState("question");
                this.scene.pause();
              }
            });

            // Add distance text
            const distanceText = this.add.text(16, 16, "Distance: 0m", {
              fontSize: "20px",
              color: "#333",
              backgroundColor: "#fff",
              padding: { x: 8, y: 4 },
            });
            distanceText.setScrollFactor(0);

            this.events.on("update", () => {
              const dist = Math.round(vehicle.x - 100);
              distanceText.setText(`Distance: ${Math.max(0, dist)}m`);
            });
          },
        },
      };

      gameRef.current = new Phaser.Game(config);
    };

    initPhaser();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [gameState, selectedVehicle, force, generateQuestion]);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setAnswered(true);

    if (index === question?.correct) {
      setScore((prev) => prev + 100);
      setCorrectAnswers((prev) => prev + 1);
      addXP(20);
    }

    setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        setGameState("results");
        // Call onComplete with score and stars based on performance
        const stars = correctAnswers >= 4 ? 3 : correctAnswers >= 2 ? 2 : 1;
        onComplete(score + (index === question?.correct ? 100 : 0), stars);
      } else {
        setRound((prev) => prev + 1);
        setGameState("menu");
        setAnswered(false);
        setQuestion(null);
        setSelectedVehicle(null);
        setRaceResult(null);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setGameState("menu");
    setSelectedVehicle(null);
    setForce(50);
    setRaceResult(null);
    setScore(0);
    setRound(1);
    setQuestion(null);
    setAnswered(false);
    setCorrectAnswers(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-600 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={onQuit} className="text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Exit
        </Button>
        <div className="flex items-center gap-4 text-white">
          <span className="bg-white/20 px-4 py-2 rounded-full font-medium">
            Round {round}/{TOTAL_ROUNDS}
          </span>
          <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold">
            {score} pts
          </span>
        </div>
      </div>

      {/* Menu State */}
      {gameState === "menu" && (
        <div className="max-w-2xl mx-auto">
          <Card padding="lg" className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-2">🏎️ Force & Motion Derby</h2>
            <p className="text-center text-deep-space/60 mb-6">
              Choose a vehicle, apply force, and learn about physics!
            </p>

            <h3 className="font-bold mb-3">Select Your Vehicle:</h3>
            <div className="grid grid-cols-2 gap-5 mb-8">
              {VEHICLES.map((vehicle) => (
                <button
                  key={vehicle.name}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedVehicle?.name === vehicle.name
                      ? "border-cosmic-purple bg-cosmic-purple/10"
                      : "border-cloud-gray hover:border-cosmic-purple/50"
                  }`}
                >
                  <span className="text-3xl block mb-2">{vehicle.emoji}</span>
                  <span className="font-medium">{vehicle.name}</span>
                  <div className="text-xs text-deep-space/60 mt-1">
                    Mass: {vehicle.mass === 0.5 ? "Light" : vehicle.mass <= 1 ? "Medium" : vehicle.mass <= 3 ? "Heavy" : "Very Heavy"}
                  </div>
                </button>
              ))}
            </div>

            {selectedVehicle && (
              <div className="text-center">
                <Button size="lg" onClick={() => setGameState("setup")}>
                  Configure Force ⚡
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Setup State */}
      {gameState === "setup" && selectedVehicle && (
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-center mb-4">
              {selectedVehicle.emoji} {selectedVehicle.name}
            </h2>

            <div className="mb-6">
              <label className="block font-medium mb-2">
                Apply Force: {force} Newtons
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={force}
                onChange={(e) => setForce(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none bg-gradient-to-r from-green-400 to-red-500 cursor-pointer"
              />
              <div className="flex justify-between text-sm text-deep-space/60 mt-1">
                <span>Gentle Push</span>
                <span>Full Power!</span>
              </div>
            </div>

            <div className="bg-cloud-gray rounded-xl p-4 mb-6">
              <h4 className="font-medium mb-2">🔬 Physics Info:</h4>
              <p className="text-sm text-deep-space/80">
                <strong>Newton's 2nd Law:</strong> Force = Mass × Acceleration
              </p>
              <p className="text-sm text-deep-space/60 mt-1">
                Your {selectedVehicle.name} has mass {selectedVehicle.mass}. 
                With {force}N of force, it will accelerate at {Math.round((force / selectedVehicle.mass) * 10) / 10} m/s²!
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setGameState("menu")}>
                Back
              </Button>
              <Button size="lg" onClick={() => setGameState("racing")}>
                <Play className="w-4 h-4 mr-2" />
                Start Race!
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Racing State */}
      {gameState === "racing" && (
        <div className="max-w-4xl mx-auto">
          <Card className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedVehicle?.emoji} Racing with {force}N of force!
              </h2>
            </div>
            <div
              ref={containerRef}
              className="w-full h-[300px] rounded-xl overflow-hidden"
            />
          </Card>
        </div>
      )}

      {/* Question State */}
      {gameState === "question" && question && raceResult && (
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <div className="text-center mb-4">
              <span className="text-4xl">{raceResult.position === 1 ? "🏆" : "🏁"}</span>
              <h2 className="text-xl font-bold mt-2">
                {raceResult.position === 1 ? "You crossed the finish line!" : "Race Complete!"}
              </h2>
              <p className="text-deep-space/60">
                Distance: {raceResult.distance}m | Time: {raceResult.time}s
              </p>
            </div>

            <div className="bg-cosmic-purple/10 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-cosmic-purple mb-2">🧠 Physics Question!</h3>
              <p className="text-lg">{question.text}</p>
            </div>

            <div className="space-y-2">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    answered
                      ? i === question.correct
                        ? "bg-vibrant-green text-white"
                        : "bg-cloud-gray text-deep-space/50"
                      : "bg-cloud-gray hover:bg-cosmic-purple hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {answered && (
              <div className="mt-4 p-4 bg-sunny-yellow/20 rounded-xl">
                <p className="text-sm">{question.explanation}</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Results State */}
      {gameState === "results" && (
        <div className="max-w-2xl mx-auto">
          <Card gradient="cosmic" className="p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Race Complete!</h2>
            <p className="text-white/80 mb-6">You've learned about force and motion!</p>

            <div className="bg-white/20 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">Final Score</p>
                  <p className="text-3xl font-bold text-white">{score}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Questions Correct</p>
                  <p className="text-3xl font-bold text-white">
                    {correctAnswers}/{TOTAL_ROUNDS}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={onQuit}
              >
                Exit
              </Button>
              <Button
                className="bg-white text-cosmic-purple hover:bg-white/90"
                onClick={handleRestart}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// Dynamic import to avoid SSR issues
export default dynamic(() => Promise.resolve(ForceMotionDerbyGame), {
  ssr: false,
});

