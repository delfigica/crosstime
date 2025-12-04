import React, { Suspense } from "react";

export default function OnePerOnePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnePerOnePage />
    </Suspense>
  );
}
