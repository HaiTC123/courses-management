import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      className="m-auto"
      height={130}
      width={130}
      alt="logo"
      src="/e-learning-logo.svg"
    />
  );
};
