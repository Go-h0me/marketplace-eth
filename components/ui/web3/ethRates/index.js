import { COURSE_PRICE, useEthPrice } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/common";
import Image from "next/image";

// { eth, ethPerItem } loai bo cai nay thay chi bang {eth}
export default function EthRates() {
  const { eth } = useEthPrice();
  return (
    <div className="flex flex-col sm:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {eth.data ? (
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
                alt=""
              />

              <span className="text-xl font-bold"> = {eth.data}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
          <p className="text-lg text-gray-600">Current eth Price</p>
      </div>
      <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {eth.data ? (
            <>
              <span className="text-xl font-bold">{eth.perItem} </span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
                alt=""
              />
              <span className="text-2xl font-bold">= {COURSE_PRICE}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-600">Price per course</p>
      </div>
    </div>
  );
}
