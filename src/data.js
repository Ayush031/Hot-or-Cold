import { BadgeInfo, Shield, ShieldBan } from "lucide-react";
import { BazarIcon } from "./components/icons";

export const asset = [
  {
    Token: "FfwCUcfrXGIgwFvoocLH2TGlqy3oZuwq9LhFeFDkP4o",
    OriginalQuantity: "2",
    Price: "1000000000000",
    Id: "MW6uASOq8JquGoG2QqD6Xi2Y03KExLSARbVRDjSQz0s",
    Creator: "xCuJwYWBUnZcrsZwKSrxu3cthWEjwxLkY-N6q_-Sr9s",
    DateCreated: 1725098527817,
    Quantity: "2",
  },
  {
    Token: "FfwCUcfrXGIgwFvoocLH2TGlqy3oZuwq9LhFeFDkP4o",
    OriginalQuantity: "3",
    Price: "1000000000000",
    Id: "0uUsX0gNbXCX52MxAruXLOpC4-UOYLt2Sjrlj1qxulA",
    Creator: "fPC1LwA56ulfle_joad3FKrCFP4yCiLtGzwUjUzGBB8",
    DateCreated: 1724853537561,
    Quantity: "3",
  },

]

export const desktopApps = [
  {
    name: "About",
    href: "https://bazar.arweave.net",
    icon: "/assets/aboutUs.png",
  },
  {
    name: "LeaderBoard",
    href: "https://bazar.arweave.net",
    icon: <ShieldBan fill="gray" height={45} width={45} />,
  },
  {
    name: "Bazar",
    href: "https://bazar.arweave.net",
    icon: <BazarIcon height={45} width={45} />,
  },
];

export const processId = "qXjKuUAqnzi9vXmGgZ-U3KExQv1J8UqQ-zZYDwfYCHQ";

import Ayush from "../public/assets/67.png";
import Anukul from "../public/assets/68.png";
import Satyansh from "../public/assets/70.png";
import Rahul from "../public/assets/70.png";

export const contributors = [
  {
    "name": "Ayush aka",
    "role": "Full-Stack Dev",
    "image": {
      "src": { Ayush },
      "alt": "Ayush",
      "width": 1000,
      "height": 1000,
      "className": "w-[35%] h-[40%] rounded-3xl"
    }
  },
  {
    "name": "Anukul",
    "role": "Front-End Designer",
    "image": {
      "src": { Anukul },
      "alt": "Anukul",
      "width": 1000,
      "height": 1000,
      "className": "w-[35%] h-[40%] rounded-3xl"
    }
  },
  {
    "name": "Satynash",
    "role": "Web3 Backend",
    "image": {
      "src": { Satyansh },
      "alt": "Satynash",
      "width": 1000,
      "height": 1000,
      "className": "w-[35%] h-[40%] rounded-3xl"
    }
  },
  {
    "name": "Rahul",
    "role": "Web3 Backend",
    "image": {
      "src": { Rahul },
      "alt": "Rahul",
      "width": 1000,
      "height": 1000,
      "className": "w-[35%] h-[40%] rounded-3xl"
    }
  }
]
