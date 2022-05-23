import Image from "next/image";
import Link from "next/link";
import { AnimateKeyframes } from "react-simple-animate";

export default function Card({ course, disabled, Footer, state }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={course.coverImage}
            layout="responsive"
            width="200"
            height="230"
            alt={course.title}
          />
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="flex items-center">
            <div className="mr-2 uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {course.type}
            </div>
            <div>
              {state === "activated" && (
                <div className="text-xs text-black bg-green-400 p-1 px-3 rounded-full">
                  Activated
                </div>
              )}
              {state === "deactivated" && (
                <div className="text-xs text-black bg-red-400 p-1 px-3 rounded-full">
                  Deactivated
                </div>
              )}
              {state === "purchased" && (
                <AnimateKeyframes
                  play
                  duration={2}
                  keyframes={["opacity: 0.5", "opacity: 1"]}
                  iterationCount="infinite"
                >
                  {/* <div style={divStyle} /> */}
                  <div className="text-xs text-black bg-yellow-600 p-1 px-3 rounded-full">
                    Pending
                  </div>
                </AnimateKeyframes>
              )}
            </div>
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className=" block mt-1 text-lg xs:text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>

          <p className="my-2 mb-4  text-sm xs:text-base text-gray-500">
            {course.description.substring(0, 70)}...
          </p>
          {Footer && (
            <div className="mt-2">
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
