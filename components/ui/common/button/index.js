const SIZE = {
  sm: "p-1 text-sm xs:px-4",
  md: "p-2 text-base xs:px-8",
  lg: "p-3 text-lg xs:px-8",
};

export default function Button({
  children,
  className = "md",
  size = "md",
  hoverable = true,
  variant = "purple",
  ...rest
}) {
  const sizeClass = SIZE[size];
  const variants = {
    white: `text-black bg-white-300`,
    green: `bg-green-600 text-white ${hoverable && "hover:bg-green-700"}`,
    purple: `bg-indigo-600 text-white ${hoverable && "hover:bg-indigo-700"}`,
    red: `bg-red-600 text-white ${hoverable && "hover:bg-red-700"}`,
    lightPurple: `bg-indigo-600 text-gray-900 bg-indigo-100 ${
      hoverable && "hover:bg-indigo-200"
    }`,
  };

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-50 rounded-lg shadow   font-medium mr-1.5 ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
