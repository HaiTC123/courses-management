"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();

  return (
    <Image
      className="cursor-pointer"
      height={60}
      width={60}
      alt="logo"
      src="/e-learning-logo.svg"
      onClick={() => router.push("/")}
    />
  );
};
