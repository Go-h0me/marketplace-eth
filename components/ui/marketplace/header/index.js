import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "@components/ui/common";
// import { BaseLayout } from "@components/ui/layout";
import { EthRates, WalletBar } from "@components/ui/web3";

//goi ham link

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/managed",
    value: "Managed Courses",
    requireAdmin: true,
  },
];

export default function Header() {
  const { account } = useAccount();

  return (
    <>
      <div className="pt-4">
        <WalletBar

        // targetNetwork={network.target}
        // isSupported={network.isSupported}
        //  eth={eth.data} ethPerItem={eth.perItem} nằm trong Breadcrumbs
        />
      </div>

      <EthRates />
      <div className="flex flex-row-reverse p-4  sm:px-6 lg:px-8">
        <Breadcrumbs isAdmin={account.isAdmin} items={LINKS} />
      </div>
    </>
  );
}

// Header.Layout= BaseLayout
