import React, { useState } from "react";

import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar,
} from "react95";


export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <AppBar className=" -translate-y-[100%]  mt-[100vh] " style={{}}>
      <Toolbar  style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "flex" }} className="w-full">
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold" }}
          >
            <img
              src={"/assets/images.png"}
              alt="react95 logo"
              style={{ height: "20px", marginRight: 4 }}
            />
            Start
          </Button>
   
    
          
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "-6px",
                top: "-50%",
                transform: "translateY(-91.4%)",
              }}
              onClick={() => setOpen(false)}
            >
              <MenuListItem>
                <span role="img" aria-label="👨‍💻">
                  👨‍💻
                </span>
                Profile
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="📁">
                  📁
                </span>
                My account
              </MenuListItem>

              <Separator />
              <MenuListItem disabled>
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
