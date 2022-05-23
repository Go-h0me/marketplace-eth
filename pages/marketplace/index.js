import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
// import { useWeb3 } from "@components/providers";
// import { EthRates, WalletBar } from "@components/ui/web3";
// import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button, Message, Loader } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
// import { useEthPrice } from "@components/hooks/web3/useEthPrice";
import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";
import { withToast } from "@utils/toast";

//CHUẨN BỊ VALUE TRONG KẾT HỢP VỚI SMART CONTRACT
export default function Marketplace({ courses }) {
  // const { web3, isLoading } = useWeb3();
  // console.log(web3);
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [busyCourseId, setBusyCourseId] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);

  const purchaseCourse = async (order, course) => {
    // console.log(order);
    // console.log(course);
    // return;
    const hexCourseId = web3.utils.utf8ToHex(course.id);
    //  console.log(hexCourseId);
    // debugger

    //  lay id trong content/course
    // hex course ID:
    //  0x31343130343734000000000000000000

    // address
    // 0x86b7987f0DDc391f3A1a5B3d0CE6B9c50c4d8b62 this add

    // Order Hash
    // + 2 cai vao a ong noi
    // 3134313034373400000000000000000086b7987f0DDc391f3A1a5B3d0CE6B9c50c4d8b62

    // text to hex tu order hash ra
    // 063703edf9d4c71a0957d0c3a676a969bd9e386d47d4878663ef29ec529d59a9

    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );
    //  console.log(orderHash);

    //test@test.com
    //   ra ket qua  keccak text 747fa38ae85d5f6be1bfe18a5040f3d4fb9fc4b74a4972d440e7bdcb8f1b6c28
    //  console.log(emailHash);

    //  + emailHash + Order Hash
    // lay tu ket qua ra
    //  747fa38ae85d5f6be1bfe18a5040f3d4fb9fc4b74a4972d440e7bdcb8f1b6c28063703edf9d4c71a0957d0c3a676a969bd9e386d47d4878663ef29ec529d59a9

    // console.log(proof);
    // emailHash +orderHash

    const value = web3.utils.toWei(String(order.price));
    // console.log(value,"value ");

    setBusyCourseId(course.id);

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      );

      withToast(_purchaseCourse({ hexCourseId, proof, value }, course));
    } else {
      withToast(_repurchaseCourse({ courseHash: orderHash, value }, course));
    }
  };

  // try {
  //   const result =  await contract.methods
  //       .purchaseCourse(hexCourseId, proof)
  //       .send({ from: account.data, value });
  //     console.log(result,"xem chut nao");
  //   } catch {
  //     // console.log(e,"loi ");
  //     console.log("Purchase course: Operation has failed.");
  //   }

  // const { account } = useAccount();
  // const { network } = useNetwork();
  // const { eth } = useEthPrice();
  // console.log(data);

  // const canPurchaseCourse = !!(account.data && network.isSupported);

  // address={account.data}
  // network={{
  //   data: network.data,
  //   target: network.target,
  //   isSupported: network.isSupported,
  //   hasInitialResponse: network.hasInitialResponse,
  // }}
  // thay the

  // cai nay de xac nhan

  const _purchaseCourse = async ({ hexCourseId, proof, value }, course) => {
    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });
      // console.log(result,"xem chut nao");
      // console.log(result);
      ownedCourses.mutate([
        ...ownedCourses.data,
        {
          ...course,
          proof,
          state: "purchased",
          owner: account.data,
          price: value,
        },
      ]);
      return result;
    } catch (e) {
      throw new Error(e.message);

      // console.log(e,"loi ");
      // console.log("Purchase course: Operation has failed.");
    } finally {
      setBusyCourseId(null);
    }
  };

  const _repurchaseCourse = async ({ courseHash, value }, course) => {
    try {
      const result = await contract.methods
        .repurchaseCourse(courseHash)
        .send({ from: account.data, value });
      // console.log(result);

      const index = ownedCourses.data.findIndex((c) => c.id === course.id);

      if (index >= 0) {
        ownedCourses.data[index].state = "purchased";
        ownedCourses.mutate(ownedCourses.data);
      } else {
        ownedCourses.mutate();
      }

      return result;
    } catch (e) {
      throw new Error(e.message);
      // console.log(e,"loi ");
      // console.log("Purchase course: Operation has failed.");
    } finally {
      setBusyCourseId(null);
    }
  };
  // const notify = () => {
  //   // const resolveWithSomeData = new Promise((resolve) =>
  //   //   setTimeout(() => resolve({
  //   //     transactionHash:"0xab6d18dd539cc6f61eadd106c658996c6ea6fb646f63d900e61f9c6a5fa94e68"
  //   //   }), 3000)
  //   // );
  //   const resolveWithSomeData = new Promise((resolve, reject) =>
  //     setTimeout(() => reject(new Error("Some Error")), 3000)
  //   );
  //  withToast(resolveWithSomeData)
  // };

  const cleanupModal = () => {
    setSelectedCourse(null);
    setIsNewPurchase(true);
  };

  return (
    <>
      <MarketHeader />

      {/* <Button onClick={notify}>Notify!</Button> */}
      {/* {isLoading ? "Is Loading Web3..." : web3 ? "Web 3 Ready!" : "Please install metamask"} */}
      <CourseList courses={courses}>
        {(course) => {
          const owned = ownedCourses.lookup[course.id];

          return (
            <CourseCard
              key={course.id}
              course={course}
              state={owned?.state}
              disabled={!hasConnectedWallet}
              Footer={() => {
                if (requireInstall) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      Install
                    </Button>
                  );
                }
                if (isConnecting) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      <Loader size="sm" />
                    </Button>
                  );
                }

                if (!ownedCourses.hasInitialResponse) {
                  return (
                    // <div style={{ height: "48px" }}></div>
                    // <Button disabled={true} variant="lightPurple">
                    //   Loading State
                    // </Button>
                    <Button variant="white" disabled={true} size="sm">
                      {hasConnectedWallet ? "Loading State..." : "Connect"}
                    </Button>
                  );
                }
                // console.log(ownedCourses.lookup);

                const isBusy = busyCourseId === course.id;
                // const isBusy = true;
                if (owned) {
                  return (
                    <>
                      <div className="flex">
                        <Button
                          onClick={() => alert("You are owner of this course.")}
                          size="sm"
                          disabled={true}
                          variant="green"
                        >
                          Yours &#10003;
                        </Button>
                        {owned.state === "deactivated" && (
                          <div className="ml-1">
                            <Button
                              size="sm"
                              disabled={isBusy}
                              variant="purple"
                              onClick={() => {
                                setIsNewPurchase(false);
                                setSelectedCourse(course);
                              }}
                            >
                              {isBusy ? (
                                <div className="flex">
                                  <Loader size="sm" />
                                  <div className="ml-2">In Progress</div>
                                </div>
                              ) : (
                                <div>Fund to Activate</div>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }

                return (
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    size="sm"
                    disabled={!hasConnectedWallet || isBusy}
                    variant="lightPurple"
                  >
                    {isBusy ? (
                      <div className="flex">
                        <Loader size="sm" />
                        <div className="ml-2">In Progress</div>
                      </div>
                    ) : (
                      <div>Purchase</div>
                    )}
                  </Button>
                );
              }}
            />
          );
        }}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          isNewPurchase={isNewPurchase}
          onSubmit={(formData, course) => {
            purchaseCourse(formData, course);
            cleanupModal();
          }}
          onClose={cleanupModal}
        />
      )}
    </>
  );
}

//nhan du lieu dong

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
//or Fragment <BaseLayout>

{
  /* <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard /> */
}
