import React from "react";
import Image from "next/image";

interface Props {
  errorMessage: string;
}

// A component that appears instead of the main page when an error occurs
const ErrorState = ({ errorMessage }: Props) => {
  return (
    <section className="flex-center mt-25 flex-col gap-2 text-center">
      <Image src="ui-icons/error.svg" alt="error" width={125} height={125} />
      <h2 className="text-4xl">Something went wrong</h2>
      <p className="max-w-md">{errorMessage}</p>
    </section>
  );
};
export default ErrorState;
