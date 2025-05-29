"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, X } from "lucide-react"

interface Block {
  index: number
  timestamp: number
  data: string
  previousHash: string
  hash: string
}

export default function Blockchain() {
  const [chain, setChain] = useState<Block[]>(() => {
    // Create genesis block
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      data: "Genesis Block",
      previousHash: "0",
      hash: calculateHash(0, Date.now(), "Genesis Block", "0"),
    }
    return [genesisBlock]
  })

  const [newBlockData, setNewBlockData] = useState("")

  function calculateHash(index: number, timestamp: number, data: string, previousHash: string): string {
    const input = `${index}${timestamp}${data}${previousHash}`
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16)
  }

  function addBlock() {
    if (!newBlockData.trim()) return

    const previousBlock = chain[chain.length - 1]
    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      data: newBlockData,
      previousHash: previousBlock.hash,
      hash: "",
    }
    newBlock.hash = calculateHash(newBlock.index, newBlock.timestamp, newBlock.data, newBlock.previousHash)

    setChain([...chain, newBlock])
    setNewBlockData("")
  }

  function isChainValid(): boolean {
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i]
      const previousBlock = chain[i - 1]

      // Check hash calculation
      if (
        currentBlock.hash !==
        calculateHash(currentBlock.index, currentBlock.timestamp, currentBlock.data, currentBlock.previousHash)
      ) {
        return false
      }

      // Check chain continuity
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Input
          placeholder="Enter block data..."
          value={newBlockData}
          onChange={(e) => setNewBlockData(e.target.value)}
        />
        <Button onClick={addBlock}>Add Block</Button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm font-medium">Chain Status:</div>
        {isChainValid() ? (
          <div className="flex items-center text-green-500">
            <Check className="w-4 h-4 mr-1" />
            Valid
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <X className="w-4 h-4 mr-1" />
            Invalid
          </div>
        )}
      </div>

      <div className="space-y-4">
        {chain.map((block, index) => (
          <div key={block.index} className="relative">
            {index > 0 && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-muted-foreground">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>
            )}
            <Card>
              <CardHeader>
                <CardTitle>Block #{block.index}</CardTitle>
                <CardDescription>Created: {new Date(block.timestamp).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                  <div className="font-medium">Data:</div>
                  <div className="font-mono">{block.data}</div>
                  <div className="font-medium">Previous Hash:</div>
                  <div className="font-mono truncate">{block.previousHash}</div>
                  <div className="font-medium">Hash:</div>
                  <div className="font-mono truncate">{block.hash}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
