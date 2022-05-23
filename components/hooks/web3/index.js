import { useHooks, useWeb3 } from "@components/providers/web3";
import { useRouter } from "next/router";
import { useEffect } from "react";

const _isEmpty = (data) => {
  return (
    data == null ||
    data == "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

// cai nay check trong F12, CHECK EMPTY TRONG OWNRED

const enhanceHook = (swrRes) => {
  const { data, error } = swrRes;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);

  // debugger
  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse,
  };
};

// su dung mang
export const useNetwork = () => {
  // return { account: web3 ? "Test Account" : "null" };
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
  return {
    network: swrRes,
  };
};

//su dung acount
export const useAccount = () => {
  // return { account: web3 ? "Test Account" : "null" };
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)());
  return {
    account: swrRes,
  };
};

export const useAdmin = ({ redirectTo }) => {
  const { account } = useAccount();
  const { requireInstall } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (
      requireInstall ||
      (account.hasInitialResponse && !account.isAdmin) ||
      account.isEmpty
    ) {
      router.push(redirectTo);
    }
  }, [account]);

  return { account };
};

export const useOwnedCourses = (...args) => {
  const resSWR = enhanceHook(
    useHooks((hooks) => hooks.useOwnedCourses)(...args)
  );

  return {
    ownedCourses: resSWR,
  };
};
export const useOwnedCourse = (...args) => {
  const resSWR = enhanceHook(
    useHooks((hooks) => hooks.useOwnedCourse)(...args)
  );
  // console.log(resSWR,"hihihi loi dau");

  return {
    ownedCourse: resSWR,
  };
};
export const useManagedCourses = (...args) => {
  const resSWR = enhanceHook(
    useHooks((hooks) => hooks.useManagedCourses)(...args)
  );
  // console.log(resSWR,"hihihi loi dau");

  return {
    managedCourses: resSWR,
  };
};

//  {
//   data: resSWR,
// },
//thong tong su dung vi
export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();



  const isConnecting = 

  !account.hasInitialResponse &&
  !network.hasInitialResponse

  return {
    account,
    network,
    isConnecting,
    hasConnectedWallet: !!(account.data && network.isSupported),
  };
};
