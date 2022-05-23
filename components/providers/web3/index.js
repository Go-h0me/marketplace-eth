import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "utils/loadContract";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require("react");

const We3Context = createContext(null);

const setListeners = (provider) => {
  provider.on("chainChanged",_ => window.location.reload())

}

const createWeb3State = ({ web3, provider, contract, isLoading }) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);

        // contract ket hop tai day
        const contract = await loadContract("CourseMarketplace", web3);
        // console.log(contract); //cai nay k chay con me no roi

        setListeners(provider)
        setWeb3Api(
          createWeb3State({
            web3,
            provider,
            contract,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.log("Please,install Metamask.");
      }
    };
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    //provider tiny refactor tai cau truc nho,
    //  no se giup rut gon hon
    const { web3, provider, isLoading } = web3Api;

    return {
      ...web3Api,
      // isWeb3Loaded: !web3Api.isLoading && web3Api.web3,
      // isWeb3Loaded: web3 != null,
      requireInstall: !isLoading && !web3,

      // hooks:abstraction setupHooks(web3), di tao 1 ham duoi
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
            } catch (error) {
              //   console.log("Cannot retrieve accounts!");
              location.reload();
            }
          }
        : () =>
            console.log(
              "Cannot connect to Metamask,try to reload your browser please."
            ),
    };
  }, [web3Api]);

  return <We3Context.Provider value={_web3Api}>{children}</We3Context.Provider>;
}

export function useWeb3() {
  return useContext(We3Context);
}

// su dung moc abstraction
// cb callback
export function useHooks(cb) {
  const { hooks } = useWeb3();
  // const hooks = getHooks()
  return cb(hooks);
  //
}
