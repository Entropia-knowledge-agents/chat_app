"use client";

import { Button } from "@mui/material";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-neutral-50/80 backdrop-blur-lg py-2 px-4 z-50">
      <div className=" flex items-center justify-between">
        <div>Chat App</div>
        <div className="flex space-x-4">
          <Button
            variant="contained"
            
            sx={{
              backgroundColor: "#6D28D9", 
              color: "white", 
              "&:hover": {
                backgroundColor: "#5B21B6", 
              },
              m:0
            }}
          >
            Tracking
          </Button>
        </div>
      </div>
    </div>
  );
}
