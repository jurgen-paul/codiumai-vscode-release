import { BubblePop } from "@/components/games/bubble-pop"
import { ConversionPortal } from "@/components/exchange/conversion-portal"
import { Shell, Waves } from "lucide-react"

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-blue-950 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Shell className="w-8 h-8 text-cyan-400" />
            CoralCoin Games
          </h1>
          <p className="text-cyan-400">Play games to earn CoralCoins and convert them to ETH!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-blue-900/20 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Waves className="w-6 h-6 text-cyan-400" />
                Available Games
              </h2>
              <BubblePop />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-900/20 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Convert Your Earnings</h2>
              <ConversionPortal />
            </div>

            <div className="bg-blue-900/20 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">How It Works</h2>
              <div className="space-y-4 text-gray-300">
                <p>1. Play games to earn CoralCoins</p>
                <p>2. Collect your earnings in your wallet</p>
                <p>3. Convert CoralCoins to ETH at any time</p>
                <p>4. Transfer ETH to your external wallet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

