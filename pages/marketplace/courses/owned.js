import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";
import { useRouter } from "next/router";
// import { OrderCard } from "@components/ui/order";

export default function OwnedCourses({ courses }) {
  // const { account } = useAccount(); chuyen thanh useWalletInfo()

  const { account } = useAccount();

  const { requireInstall } = useWeb3();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const router = useRouter();

  // console.log(ownedCourses);
  return (
    <>
      {/* {JSON.stringify(OwnedCourses.data) } */}
      <MarketHeader />
      {/* <CourseFilter/> */}
      <section className="grid grid-cols-1">
        {ownedCourses.isEmpty && (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        )}
        {account.isEmpty && (
          <div className="w-1/2">
            <Message type="warning">
              <div>You don&apos;t own any courses</div>
            </Message>
          </div>
        )}{" "}
        {requireInstall && (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        )}
        {ownedCourses.data?.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button onClick={() => router.push(`/courses/${course.slug}`)}>
              Watch the course
            </Button>
          </OwnedCourseCard>
        ))}
      </section>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

OwnedCourses.Layout = BaseLayout;
