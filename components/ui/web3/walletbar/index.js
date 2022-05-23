import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";


//{ address, network } loai bo cai nay
export default function WalletBar() {
  const {requireInstall} = useWeb3()
  const {account,network} = useWalletInfo()
// chuyen tu marketplace sang ben nay

  return (
    <section className='text-white bg-indigo-600 rounded-lg '>
      <div className='p-8'>
        <h1 className='text-base  xs:text-xl break-words'>Hello, {account.data}</h1>
        <h2 className='subtitle mb-5 text-sm xs:text-base'>
          I hope you are having a great day!
        </h2>
        <div className='flex justify-between items-center'>
          <div className='sm:flex sm:justify-center lg:justify-start'>
            <div className='rounded-md shadow'>
              <Button 
              className="mr-1 text-sm xs:text-lg p-2"
              variant="white">
              Learn how to purchase

                </Button>
{/* 
              <a
                href='#'
                className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10'
                >
              </a> */}
            </div>
          </div>
          <div>
            {network.hasInitialResponse && !network.isSupported && (
              <div className='bg-red-400 p-4 rounded-lg'>
                <div>Connected to wrong Network</div>
                <div>
                  Connect to: {` `}
                  <strong className='text-2xl'>{network.target}</strong>
                </div>
              </div>
            )}
            {requireInstall &&
            <div className=" bg-yellow-500 p-4 rounded-lg">
              Cannot connect to network ,Please install metamask
              </div>
            }
            {network.data && (
              <div>
                <span className='mr-3'>Currently on</span>
                <strong className='text-2xl'>{network.data}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
