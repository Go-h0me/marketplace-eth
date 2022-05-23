import { useWeb3 } from "@components/providers";
// import Link from "next/link";
import { Button ,ActiveLink} from "@components/ui/common";
import { useRouter } from "next/router";
import { useAccount } from "@components/hooks/web3";
// import { useRouter } from "next/router";
export default function Navbar() {
  // isWeb3Loaded  = web3 chay
  const { connect, requireInstall, isLoading } = useWeb3();
  // const {account} = useAccount(web3)();
  // console.log(account);
  // goi dien qua account nay
  const { account } = useAccount();

  const { pathname } = useRouter();

  //  const router =  useRouter()

  return (
    <section>
      <div className='relative pt-6 px-4 sm:px-6 lg:px-8'>
        <nav className='relative' aria-label='Global'>
          <div className='flex   xs:flex-row justify-between items-center'>
            <div>
              <ActiveLink href='/'>
                <a className='font-medium mr-8 text-gray-500 hover:text-gray-900'>
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href='/marketplace'>
                <a className='font-medium mr-8 text-gray-500 hover:text-gray-900'>
                  Marketplace
                </a>
              </ActiveLink>
              <ActiveLink href='/blogs'>
                <a className='font-medium mr-8 text-gray-500 hover:text-gray-900'>
                  Blogs
                </a>
              </ActiveLink>
            </div>
            <div className='flex text-center items-center justify-center  space-x-2 md:space-x-10'>
              <ActiveLink href='/wishlist'>
                <a className='font-medium sm:mr-6  mr-2 text-gray-500 hover:text-gray-900'>
                  Wishlist
                </a>
              </ActiveLink>
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : account.data ? (
                <Button hoverable={false} className='cursor-default sm:py-3'>
                  Hi there {account.isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download.html", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className='flex justify-end sm:px-6 sm:py-3 lg:px-8 pt-1'>
          <div className='text-gray-100 bg-indigo-600 rounded-md p-2'>
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}

//  use operator can bac 3 kep

// hide addresss !pathname.includes("/marketplace")

// isWeb3Loaded => web3 != null web3 != null ?
