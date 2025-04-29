import React from "react";

export default function Heading({
  children,
  cyan,
}: {
  children: React.ReactNode;
  cyan?: boolean;
}) {
  if (!cyan) return <h2 className="styledHeading mx-auto w-fit">{children}</h2>;
  if (cyan)
    return <h2 className="styledHeadingCyan mx-auto w-fit">{children}</h2>;
}
