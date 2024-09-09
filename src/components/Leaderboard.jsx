function Leaderboard() {
  return (
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
  );
}

export default Leaderboard;
