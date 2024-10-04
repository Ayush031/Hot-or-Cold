import Image from "next/image";
import { ScrollView } from "react95";
import { contributors } from "@/data";

const AboutApp = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-evenly items-center mb-4">
        <div className="w-[40%] h-[90%]">
          <Image
            className="scale-1 -mt-10"
            alt="bazarmash_logo"
            src={"/bazarmash.png"}
            width={1000}
            height={1000}
          />
        </div>
        <ScrollView className="flex   py-8 justify-center text-center gap-5 items-center">
          <h1 className="text-2xl font-bold py-2">Netscape Navigator</h1>
          <h2 className="text-xl">Version 2.01</h2>
          <p className="text-center py-2">Copyright © 1994-1995 baZarMash</p>
          <p className="text-center">
            This software is subject to license agreements.
          </p>
          <p className="text-center">made /w lobe ~</p>
        </ScrollView>
      </div>
      <div className="flex flex-row gap-5 justify-center items- ">
        {contributors.map(({ name, role, image }) => (
          <div
            key={name}
            className="flex flex-col justify-center items-center m-4"
          >
            <Image
              className="w-[35%] h-[40%] rounded-3xl"
              alt={image.alt}
              src={image.src}
              width={image.width}
              height={image.height}
            />
            <h1 className="text-lg font-semibold">{name}</h1>
            <p className="text-sm">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutApp;
