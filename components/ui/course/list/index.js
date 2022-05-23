// import { CourseCard } from "@components/ui/course";

export default function CourseList({ courses,children }) {
  return (
    <section className='grid md:grid-cols-1 gap-4 mb-5 lg:grid-cols-2'>
      {courses.map((course) => (
        children(course)
      ))}

    </section>
  );
}
        // <CourseCard key={course.id} course={course} />;
// children  goi o trong lay toan bo  CourseCard



