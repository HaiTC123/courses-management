"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();

  return (
    <Image
      className="m-auto"
      height={130}
      width={130}
      alt="logo"
      src="/e-learning-logo.svg"
      onClick={() => router.push("/")}
    />
  );
};
