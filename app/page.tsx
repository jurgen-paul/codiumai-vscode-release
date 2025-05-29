import Blockchain from "@/blockchain"

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Cryptocurrency Blockchain</h1>
          <p className="text-muted-foreground">
            A simple blockchain implementation demonstrating how blocks are linked together
          </p>
        </div>
        <Blockchain />
      </div>
    </div>
  )
}
