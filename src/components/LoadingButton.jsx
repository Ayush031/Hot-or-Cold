import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const VoteButton = ({ label, isLoading, onClick }) => {
  return (
    <Button 
      className="w-32" 
      disabled={isLoading} 
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Voting
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default VoteButton;
