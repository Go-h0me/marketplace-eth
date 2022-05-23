import useSWR from "swr";

//lay api price ETH
const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

export const COURSE_PRICE = 15;

const fetcher = async (url) => {
  const res = await fetch(url);
  const json = await res.json();
  // console.log("Refetching USE ETH PRICE");
  // debugger
  // console.log(fetcher);
  return json.market_data.current_price.usd ?? null;
};
export const useEthPrice = () => {
  // console.log("CALLING USE ETH PRICE");
  //  lay ETH
  const { data, ...rest } = useSWR(URL, fetcher, { refreshInterval: 1000 });


  //  USD
  const perItem = (data && (COURSE_PRICE / Number(data)).toFixed(6)) ?? null;
  return { eth: { data, perItem, ...rest } };
};

// { data, ...rest }

// https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false
