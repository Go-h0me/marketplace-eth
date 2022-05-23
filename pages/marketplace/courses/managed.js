import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
// import { Button } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { normalizeOwnedCourse } from "@utils/normalize";
import { withToast } from "@utils/toast";
import { useEffect, useState } from "react";
// import { OrderCard } from "@components/ui/order";

// BEFORE TX BALANCE ---->99560602930000000000
//  Ether gas  99.56060293
// gas 133021 * 20000000000 -> 2.66042e+15 ->0.00266042

// gas +value sen : 99.56060293 + 0.00266042

//  AFFTER TX -> 99.56326335
//  AFFTER TX -> '97555282090000000000'

const VerificationInput = ({ onVerify }) => {
  // console.log(onVerify);

  const [email, setEmail] = useState("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 shadow-md focus:ring-indigo-500
block pl-7 p-4 sm:text-sm border-x-gray-300 rounded-md"
        placeholder="0x23131..."
      />
      <Button
        onClick={() => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};
// onVerify thay ham nay
//   verifyCourse(email, {
// hash: course.hash,
// proof: course.proof,

export default function ManagedCourses() {
  const [proofOwnership, setProofOwnership] = useState({});
  const [searchedCourse, setSearchedCourse] = useState(null);
  const [filters, setFilters] = useState({ state: "all" });

  const { web3, contract } = useWeb3();
  const { account } = useAdmin({ redirectTo: "/marketplace" });

  const { managedCourses } = useManagedCourses(account);
  // console.log(managedCourses.data);

  // xac nhan khoa hoc
  const verifyCourse = (email, { hash, proof }) => {
    if (!email) {
      return;
    }
    const emailHash = web3.utils.sha3(email);
    // console.log(emailHash, "xem nao");
    const proofToCheck = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: hash,
      }
    );
    proofToCheck === proof
      ? setProofOwnership({
          ...proofOwnership,
          [hash]: true,
        })
      : setProofOwnership({
          ...proofOwnership,

          [hash]: false,
        });
    // console.log(proofToCheck, "check xem");
  };

  const changeCourseState = async (courseHash, method) => {
    try {
      const result = await contract.methods[method](courseHash).send({
        // await contract.methods.activateCourse(courseHash).send({
        from: account.data,
      });
      return result;
    } catch (e) {
      // console.log(e.message, "what happen");
      throw new Error(e.message);
    }
  };

  const activateCourse = async (courseHash) => {
    withToast(changeCourseState(courseHash, "activateCourse"));
  };
  const deactivateCourse = async (courseHash) => {
    withToast(changeCourseState(courseHash, "deactivateCourse"));
  };

  // useEffect(() => {
  //   console.log(searchedCourse);
  // }, [searchedCourse]);

  // ham nay de loc tu khoa okie con de
  const searchCourse = async (hash) => {
    var re = /[0-9A-Fa-f]{6}/g;

    if (hash && hash.length === 66 && re.test(hash)) {
      const course = await contract.methods.getCourseByHash(hash).call();
      if (course.owner !== "0x000000000000000000000000000000000000000000") {
        const normalized = normalizeOwnedCourse(web3)({ hash }, course);
        setSearchedCourse(normalized);
        // console.log(normalized);

        return;
      }
    }
    setSearchedCourse(null);
  };

  //  search course toan man hinh display

  const renderCard = (course, isSearched) => {
    return (
      <ManagedCourseCard
        key={course.ownedCourseId}
        isSearched={isSearched}
        course={course}
      >
        <VerificationInput
          onVerify={(email) => {
            verifyCourse(email, { hash: course.hash, proof: course.proof });
          }}
        />
        {proofOwnership[course.hash] && (
          <div>
            <Message className="mt-2">Verified</Message>
          </div>
        )}
        {proofOwnership[course.hash] === false && (
          <div className="mt-2">
            <Message type="danger">Wrong Proof!!!</Message>
          </div>
        )}
        {course.state === "purchased" && (
          <div className="mt-2">
            <Button onClick={() => activateCourse(course.hash)} variant="green">
              Activate
            </Button>
            <Button onClick={() => deactivateCourse(course.hash)} variant="red">
              Deactivate
            </Button>
          </div>
        )}
      </ManagedCourseCard>
    );
  };

  // useEffect(() => {
  //   console.log(filters);
  // },[filters]) de check test

  if (!account.isAdmin) {
    return null;
  }

  const filteredCourses = managedCourses.data
    ?.filter((course) => {
      if (filters.state === "all") {
        return true;
      }

      return course.state === filters.state;
    })
    ?.map((course) => renderCard(course));

  return (
    <>
      <MarketHeader />
      <CourseFilter
        onFilterSelected={(value) => setFilters({ state: value })}
        onSearchSubmit={searchCourse}
      />
      <section className="grid grid-cols-1">
        {searchedCourse && (
          <div>
            <h1 className="text-lg font-bold p-5">Search</h1>
            {renderCard(searchedCourse, true)}
          </div>
        )}
        <h1 className="text-lg font-bold p-5">ALL Courses</h1>
        {filteredCourses}
        {filteredCourses?.length === 0 && (
          <Message type="warning">More courses to display</Message>
        )}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
