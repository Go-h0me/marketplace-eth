import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (course, account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
    async () => {
      // console.log("Calling useOwnedCourses");

      //   debugger
      // ownedCourses.push(course.id);

      // same ascii to hex

      const courseHash = createCourseHash(web3)(course.id, account);

      // const hexCourseId = web3.utils.utf8ToHex(course.id);
      // const courseHash = web3.utils.soliditySha3(
      //   { type: "bytes16", value: hexCourseId },
      //   { type: "address", value: account }
      // );
      // CAI NAY TUONG TU NHU useOwnedCourses rut gon lay trong hash.utils rat de dan phai khong nao

      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();
      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
        // debugger;
      }
      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
    // 40 so
    // debugger;
  );
  return swrRes;

  // console.log(courses);
  // console.log(account);

  // return "UseOwnedCourses is working!"
};
