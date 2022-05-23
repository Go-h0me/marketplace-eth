import { Web3Provider } from "@components/providers";
import { Footer, Navbar } from "@components/ui/common";

// import Script from "next/script";

export default function BaseLayout({children}) {

  //script giam thieu KB load nhanh hon va tai sao lai co no
  return (

    <Web3Provider>
    <div className='relative max-w-7xl mx-auto px-4'>
      <Navbar />
      <div className='fit'>
      {children}
      </div>
    </div>
    <Footer />
  </Web3Provider>
   

  );
}

 // <>
    {/* <Script
    src="/js/truffle-contract.js"
    strategy="beforeInteractive"
    /> */}

    
   
    // </>


//   <Hero />
        //   <Breadcrumbs />
        //   <WalletBar />
        //   <EthRates />
        //   <OrderCard />
        //   <CourseList /> 

        // toan bo cai nay la children