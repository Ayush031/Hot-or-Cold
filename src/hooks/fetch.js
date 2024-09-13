import { dryrun } from "@permaweb/aoconnect";

export const Main = async () => {
  try {
    const result = await dryrun({
      process: 'U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0',
      action: "Info",
      tags: [{ name: "Action", value: "Info" }],
    });

    const asset = JSON.parse(result.Messages[0].Data);
    const some = [];
    
    asset.Orderbook.forEach((element) => {
      some.push(element.Orders);
    });
    
    let tokens = [];
    some.forEach((element) => {
      element.forEach((order) => {
        tokens.push(order.Token);
      });
    });

    const uniqueTokens = [...new Set(tokens)];

    return uniqueTokens;
  } catch (error) {
    console.error(error);
    return [];
  }
};
