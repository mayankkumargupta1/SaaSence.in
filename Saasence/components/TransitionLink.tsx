"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

interface TransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");

    body?.classList.add("page-transition-complex");

    try {
      await sleep(500);
      await router.push(href);
      await sleep(500);
    } catch (error) {
      console.error("Error during page transition:", error);
    } finally {
      body?.classList.remove("page-transition-complex");
    }
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
