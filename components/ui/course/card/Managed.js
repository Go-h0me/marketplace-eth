const Item = ({ title, value, className }) => {
  return (
    <div className={`${className} px-3 py-2  sm:px-6`}>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </div>
    </div>
  );
};

export default function ManagedCourseCard({
  children,
  course,
  isSearched = false,
}) {
  return (
    <div
      className={`${
        isSearched ? "border-indigo-600" : "bg-gray-200"
      } bg-white border shadow overflow-hidden sm:rounded-lg mb-3`}
    >
      {Object.keys(course).map((key, i) => (
        <Item
          key={key}
          className={`${i % 2 ? "bg-gray-100" : "bg-white"}`}
          // title={key} hoac the nay se giuu viet hoa

          title={key[0].toUpperCase() + key.slice(1)}
          value={course[key]}
        />
      ))}

      <div className="bg-white px-4 py-2 sm:px-6">{children}</div>
    </div>
  );
}

// title key se lay toan bo course[key]

{
  /*  RUT GON TOAN BO TRONG NAY
<Item
          className="bg-gray-100"
          title="Course ID" value={course.ownedCourseId} />
          <Item
          
          title="Proof" value={course.proof} />
          <Item 
          className="bg-gray-100"
          
          title="Owner" value={course.owned} />
          <Item title="Price" value={course.price} />
          <Item 
          className="bg-gray-100"
          
          title="State" value={course.state} /> */
}
