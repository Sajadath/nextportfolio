import { ReactNode } from "react";

function TypedText({ children }: { children: ReactNode }) {
  return (
    <div className="w-fit text-4xl font-bold lg:text-7xl">
      <h2 className="writingAnimation text-black dark:text-white">
        {children}
      </h2>
    </div>
  );
}

export default TypedText;
