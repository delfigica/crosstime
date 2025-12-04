import React, { Suspense } from "react";
import { Configuration } from "./configuration";

export default function ConfigurationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Configuration />
    </Suspense>
  );
}
