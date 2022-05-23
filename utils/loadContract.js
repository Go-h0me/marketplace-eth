// import Web3 from "web3";

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

//web3 tuong tu giup load nhanh hon va giam KB

export const loadContract = async (name, web3) => {
  // console.log("loadContract",loadContract);
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  // ket noi mang chinh matamask

  let contract = null;

  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );

  } catch  {
    // console.log(e ,"what is e");
    console.log(`Contract ${name} cannot be loaded`);
  }

  return contract;
};

// k dung goi nay @truffle/contract
// import contract from "@truffle/contract";

// export const loadContract = async (name, provider) => {
//   const res = await fetch(`/contracts/${name}.json`);
//   const Artifact = await res.json();
//   const _contract = window.TruffleContract(Artifact);
//   _contract.setProvider(provider);

//   // ket noi mang chinh matamask

//   let deployedContract = null;

//   try {
//    deployedContract = await _contract.deployed();
//   } catch (error) {
//     console.log(`Contract ${name} cannot be loaded`);
//   }

//   return deployedContract;
// };
