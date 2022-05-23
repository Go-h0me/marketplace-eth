import { useEthPrice } from "@components/hooks/useEthPrice";
import { useEffect, useState } from "react";

const useCounter = () => {
  const [account, setAccount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setAccount((c) => c + 1);
    }, 1000);
  }, []);
  // console.log("Calling useCounter!");
  return account;
};

const SimpleComponent = () => {
  // const count = useCounter();
  const { eth } = useEthPrice();
  //   console.log("CALLING - SimpleComponent");
  return <h1>Simple Component - {eth.data}</h1>;
};

export default function HooksPage() {
  //   const count = useCounter();
  //   console.log("CALLING - HOOKS PAGE");
  const { eth } = useEthPrice();

  return (
    <>
      <h1>Hello World - {eth.data}</h1>
      <SimpleComponent />
    </>
  );
}
