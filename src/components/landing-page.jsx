
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Hot or Cold NFT Rating Game</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-background border border-muted rounded-lg overflow-hidden shadow-lg">
          <div className="relative">
            <img
              src="https://i.seadn.io/s/raw/files/9ac88e35416359f7d1d37890dc1112a6.jpg?auto=format&dpr=1&w=136&h=136&fr=1"
              alt="NFT Image"
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button variant="outline" size="sm" className="bg-background/80">
                <FlameIcon className="w-4 h-4 text-primary" />
              </Button>
              <Button variant="outline" size="sm" className="bg-background/80">
                <SnowflakeIcon className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">NFT Title</h3>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">+10</span> Hot
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-muted-foreground">-5</span> Cold
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="bg-background border border-muted rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b border-muted">
            <div className="font-semibold">#</div>
            <div className="font-semibold">NFT Title</div>
            <div className="font-semibold">Score</div>
          </div>
          <div className="divide-y divide-muted">
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4">
              <div>1.</div>
              <div>Super Cool NFT</div>
              <div className="text-primary font-semibold">+100</div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4">
              <div>2.</div>
              <div>Awesome NFT</div>
              <div className="text-primary font-semibold">+75</div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4">
              <div>3.</div>
              <div>Unique NFT</div>
              <div className="text-muted-foreground font-semibold">-25</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}


function SnowflakeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="m20 16-4-4 4-4" />
      <path d="m4 8 4 4-4 4" />
      <path d="m16 4-4 4-4-4" />
      <path d="m8 20 4-4 4 4" />
    </svg>
  )
}