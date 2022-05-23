import { useEffect } from "react";

import useSWR from "swr";

// const adminAddress = {
//   "0x47Db40dab0f2bec83113e1af0af6b42674acE6dd": true,
// };
const adminAddress = {
  "0xa1707e86970bb94aa24361fa97d4e58df94f93df78e25e6cdc5e2599d23cb8c2": true,
  "0x5b6f32d04d7f1c9aaa8c37a6608227dabd0616ee6051593f1e44e405420a2e5c": true,
};

export const handler = (web3, provider) => () => {
  // const [account, setAccount] = useState(null);

  const { data, mutate, ...swrRes } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts[0]);
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retrieve an account.Please refresh the browser."
        );
      }

      return account;
    }
  );
  // swrResponse.data;

  // useEffect(() => {
  //   const getAccount = async () => {
  //     const accounts = await web3.eth.getAccounts();
  //     setAccount(accounts[0]);
  //   };
  //   web3 && getAccount();
  // }, [web3]);

  //load account changed
  //  window.ethereum chuyen =>  provider

  useEffect(() => {
    // ONE TIME EVENT ****

    // console.log("SUBSCRIBING TO EVENT");
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);
    // console.log("ON ACCOUNT DATA");
    // mutate(accounts[0] ?? null); cai nay cuyen thanh ham TREN SAU DOC CHET MIA LUON
    // console.log(provider,);
    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  // if(data) {
  //   console.log(web3.utils.keccak256(data)); // chuyen sang hash keccak
  // }

  return {
    data,
    isAdmin: (data && adminAddress[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...swrRes,
  };
};
