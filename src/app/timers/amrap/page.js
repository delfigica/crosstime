import React, { Suspense } from "react";
import { Amrap } from "./amrap";

export default function AmrapPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Amrap />
    </Suspense>
  );
}
