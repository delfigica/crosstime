import React, { Suspense } from "react";
import { RoundPlusRest } from "./RoundPlusRest";

export default function RoundPlusRestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoundPlusRest />
    </Suspense>
  );
}
