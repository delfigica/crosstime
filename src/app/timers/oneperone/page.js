import React, { Suspense } from "react";
import { OnePerOne } from "./OnePerOne";

export default function OnePerOnePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnePerOne />
    </Suspense>
  );
}
