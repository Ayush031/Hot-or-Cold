import { ScrollView } from "react95";

const LeaderBoardApp = ({ TokenScores }) => {


  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1 className="text-center font-bold text-2xl">LeaderBoard</h1>
      <ScrollView className="h-[80%]">
        <div className="w-full h-full px-3 flex flex-col">
          <div className="w-full px-20  flex justify-center ">
            <div className="font-semibold pb-2 text-center  w-[40%] ">
              Token
            </div>
            <div className="font-semibold  pb-2 text-center pl-24  w-[30%] ">
              Ranking
            </div>
            <div className="font-semibold pb-2  pl-28 text-center w-[30%] ">
              Images
            </div>
          </div>
          <div>
            {Object.entries(TokenScores)
              .sort(([, a], [, b]) => b - a)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="w-full flex items-center justify-between gap-4 py-4"
                >
                  <div className="w-[50%]">
                    <a
                      href={`https://bazar.ar.io/#/asset/${key}`}
                      className="text-blue-500 underline w-[90%]"
                    >
                      {key.length > 30 ? `${key.substring(0, 30)}...` : key}
                    </a>
                  </div>

                  <div className="w-[15%] text-center">{value}</div>

                  <div className="w-[30%] flex justify-center">
                    <div
                      className="size-14 bg-contain pl-10"
                      style={{
                        backgroundImage: `url(https://arweave.net/${key})`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ScrollView>
    </div>
  );
};

export default LeaderBoardApp;
