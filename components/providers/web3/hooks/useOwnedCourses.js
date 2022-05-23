import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (courses, account) => {
  const swrRes = useSWR(
    () =>
      web3 && contract && account 
        ? `web3/ownedCourses/${account}`
        : null,
    async () => {
      // console.log("Calling useOwnedCourses");
      const ownedCourses = [];

      for (let i = 0; i < courses.length; i++) {
        //   debugger
        const course = courses[i];
        // ownedCourses.push(course.id);

        if (!course.id) {
          continue;
        }

        // same ascii to hex

        const courseHash = createCourseHash(web3)(course.id, account);

        // const hexCourseId = web3.utils.utf8ToHex(course.id);
        // const courseHash = web3.utils.soliditySha3(
        //   { type: "bytes16", value: hexCourseId },
        //   { type: "address", value: account }
        // );
        //  cai nay truyen vao hash trong utils rut gon dua ra rat gon ha

        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call();
        if (
          ownedCourse.owner !== "0x0000000000000000000000000000000000000000"
        ) {
          // debugger;
          const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);

          ownedCourses.push(normalized);
        }
      }
      // 40 so
      // debugger;
      return ownedCourses;
    }
  );
  // console.log(swrRes,"xem");

  return {
    ...swrRes,

    lookup:
      swrRes.data?.reduce((a, c) => {
        a[c.id] = c;
        return a;
      }, {}) ?? {},
  };

  // console.log(courses);
  // console.log(account);
  //a  accumulator
  // c course
  // return "UseOwnedCourses is working!"
};
