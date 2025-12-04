
import React, { Suspense } from "react";
import { Cap } from "./cap";


export default function CapPage() {
  return (<Suspense fallback={<div>Loading...</div>}>
    <Cap />
  </Suspense>)
}
