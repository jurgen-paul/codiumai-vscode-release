"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightLeft, Shell, Wallet } from "lucide-react"

interface ConversionRates {
  CORAL_TO_ETH: number
  ETH_TO_CORAL: number
}

const RATES: ConversionRates = {
  CORAL_TO_ETH: 0.0001, // 1 CORAL = 0.0001 ETH
  ETH_TO_CORAL: 10000, // 1 ETH = 10000 CORAL
}

export function ConversionPortal() {
  const [amount, setAmount] = useState("")
  const [convertFrom, setConvertFrom] = useState<"CORAL" | "ETH">("CORAL")
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    setLoading(true)
    // Simulate conversion delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    // Reset form
    setAmount("")
  }

  const toggleConversion = () => {
    setConvertFrom(convertFrom === "CORAL" ? "ETH" : "CORAL")
    setAmount("")
  }

  const calculateConversion = () => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount)) return "0"

    if (convertFrom === "CORAL") {
      return (numAmount * RATES.CORAL_TO_ETH).toFixed(6)
    } else {
      return (numAmount * RATES.ETH_TO_CORAL).toFixed(2)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Shell className="w-5 h-5 text-cyan-400" />
          Conversion Portal
        </CardTitle>
        <CardDescription>Convert between CoralCoin and Ethereum</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">From</label>
          <div className="flex gap-4">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount in ${convertFrom}`}
              className="flex-1"
            />
            <Button variant="outline" className="w-24 text-cyan-400 border-cyan-400/50">
              {convertFrom}
            </Button>
          </div>
        </div>

        <Button variant="ghost" className="w-full text-cyan-400" onClick={toggleConversion}>
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Swap
        </Button>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">To</label>
          <div className="flex gap-4">
            <Input type="text" value={calculateConversion()} readOnly className="flex-1" />
            <Button variant="outline" className="w-24 text-cyan-400 border-cyan-400/50">
              {convertFrom === "CORAL" ? "ETH" : "CORAL"}
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <Button
            className="w-full bg-cyan-600 hover:bg-cyan-700"
            onClick={handleConvert}
            disabled={!amount || loading}
          >
            {loading ? (
              "Converting..."
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Convert
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-gray-400 text-center">
          Current Exchange Rate:
          <br />1 CORAL = {RATES.CORAL_TO_ETH} ETH
        </div>
      </CardContent>
    </Card>
  )
}

