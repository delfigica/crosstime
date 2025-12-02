import React, { Suspense } from "react";

export default function OnePerOnePage() {
  return (
    <Suspense>
      {" "}
      <OnePerOnePage />
    </Suspense>
  );
}
