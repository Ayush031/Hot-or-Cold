import { dryrun } from "@permaweb/aoconnect";

export const Main = async () => {
    try {
      const result = await dryrun({
        process: 'U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0',
        action: "Info", 
        tags: [{ name: "Action", value: "Info" }]
      });
        const asset = JSON.parse(result.Messages[0].Data)
        
    //   console.log(asset.Orderbook[1].Orders[1].Token);
      // console.log(asset.Orderbook.Orders.length);
    //   console.log(asset.Orderbook[0].Orders.length)

      
          const some = []
      const size = asset.Orderbook.forEach(element => {
        some.push(element.Orders)
      });

    //   console.log(some)

        
      
      const token = []

      some.forEach(element => {
       element.forEach(element => {
        token.push(element.Token)
       })
      })

    //   console.log(token)

      return token;

    } catch (error) {
      console.error(error);
      return[];
    }
  };

  