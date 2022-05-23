import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
  const { data, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();

      if (!chainId) {
        throw new Error(
          "Cannot retrieve an network.Please refresh the browser."
        );
      }
      return NETWORKS[chainId];
    }
  );

  // tuong tu nhu ben use Account se vua chay thoi gian vua xoa provider ?k biet phai the ke me no tinh sau vay
  // useEffect(() => {
  //   provider &&
  //     provider.on("chainChanged", (chainId) => {
  //       mutate(NETWORKS[parseInt(chainId, 16)]);
  //     });
  // }, [web3]);

  //  mutate(NETWORKS[parseInt(chainId, 16)] thay bang window.location.reload
  // useEffect(() => {
  //   // ONE TIME EVENT ****
  //   //  co 2 cai the nay provider && provider dungs khong thi minh chuyeen snag thang day thi minh dung 1 dau hoi thoi
  //   // console.log("SUBSCRIBING TO EVENT");
  //   const mutator = (chainId) => window.location.reload();
  //   provider?.on("chainChanged", mutator);
  //   // console.log("ON ACCOUNT DATA");
  //   // mutate(accounts[0] ?? null); cai nay cuyen thanh ham TREN SAU DOC CHET MIA LUON
  //   // console.log(provider);
  //   return () => {
  //     provider?.removeListener("chainChanged", mutator);
  //   };
  // }, [provider]);

  return {
    data,
    // hasInitialResponse: data || error,
    // mutate,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};
//getId tao ra Id
// data:"Testing Network"
