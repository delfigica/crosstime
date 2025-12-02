import React, { Suspense } from "react";
import { Otm } from "./Otm";

export default function OtmPage() {
  return (
    <Suspense>
      <Otm />
    </Suspense>
  );
}
