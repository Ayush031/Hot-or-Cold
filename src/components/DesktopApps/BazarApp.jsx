import React, { useState } from "react";

const BazarApp = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-[100vw] h-[100vh]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <span className="text-lg">Loading...</span>
        </div>
      )}
      <iframe
        src="https://bazar.arweave.dev"
        className="w-full h-full"
        onLoad={handleLoad}
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
};

export default BazarApp;
