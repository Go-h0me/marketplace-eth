// import Link from "next/link";
import { ActiveLink } from "@components/ui/common";
import React from "react";

//trong nay cung su dung requireAdmin
const BreadcrumbsItem = ({ item, index }) => {
  return (
    <li
      className={`${
        index == 0 ? "pr-4" : "px-4"
      } font-medium text-gray-500 hover:text-gray-900`}
    >
      <ActiveLink href={item.href}>
        <a>{item.value}</a>
      </ActiveLink>
    </li>
  );
};

export default function Breadcrumbs({ items, isAdmin }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="pl-3 flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map((item, i) => (
          <React.Fragment key={item.href}>
            {!item.requireAdmin && <BreadcrumbsItem item={item} index={i} />}
            {item.requireAdmin && isAdmin && (
              <BreadcrumbsItem item={item} index={i} />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

// key={item.href}
//
{
  /* <></>  React.Fragment*/
}
//   <li className='pr-4 font-medium text-gray-500 hover:text-gray-900'>
{
  /* <a href='#'>Buy</a>
</li>
<li className='px-4 font-medium text-gray-500 hover:text-gray-900'>
  <a href='#'>My Courses</a>
</li>
<li className='px-4 font-medium text-gray-500 hover:text-gray-900'>
  <a href='#'>Manager Courses</a>
</li> */
}
