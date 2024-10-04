import { dryrun } from "@permaweb/aoconnect/browser";

export const Main = async (excludedTokens = []) => {
  try {
    const result = await dryrun({
      process: 'U3TjJAZWJjlWBB4KAXSHKzuky81jtyh0zqH8rUL4Wd0',
      action: "Info",
      tags: [{ name: "Action", value: "Info" }],
    });

    const asset = JSON.parse(result.Messages[0].Data);
    // const asset2 = JSON.parse(result.Messages[0].Data);
    console.log(asset);
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

    const filteredTokens = tokens.filter(token => !excludedTokens.includes(token));
    const uniqueTokens = [...new Set(filteredTokens)];

    return uniqueTokens;
  } catch (error) {
    console.error(error);
    return [];
  }
};
