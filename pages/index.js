import { Hero } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
// import { useWeb3 } from "@components/providers";

export default function Home({ courses }) {
  // const { web3, isLoading } = useWeb3();
  // console.log(web3);

  return (
    <>
      {/* {isLoading ? "Is Loading Web3..." : web3 ? "Web 3 Ready!" : "Please install metamask"} */}
      <Hero />
      <CourseList courses={courses}>
        {(course) => <CourseCard key={course.id} course={course} />}
      </CourseList>
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

Home.Layout = BaseLayout;
//or Fragment <BaseLayout>

{
  /* <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard /> */
}
