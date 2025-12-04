import React, { Suspense } from "react";
import { Tabata } from "./Tabata";

export default function TabataPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tabata />
    </Suspense>
  );
}
