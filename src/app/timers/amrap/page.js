import React, { Suspense } from "react";
import { Amrap } from "./amrap";

export default function AmrapPage() {
  return (
    <Suspense>
      <Amrap />
    </Suspense>
  );
}
