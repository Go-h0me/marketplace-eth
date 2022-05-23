import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function ActiveLink({ activeLinkClass, children, ...props }) {
  const { pathname } = useRouter();

  let className = children.props.className || "";

  if (pathname === props.href) {
    className = `${className} ${
      activeLinkClass ? activeLinkClass : "text-indigo-600"
    } `;
  }

  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
}

// React.cloneElement(children,{className})
// cai nay la thanh phan de truyen vao thay cho bo cuc the Link
//wapper
