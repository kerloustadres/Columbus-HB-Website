"use client";

import { useEffect } from "react";
import { initSite } from "@/lib/site-behavior";

/** Attaches the page's vanilla-JS interactions (particles, nav, carousel, offer form) after hydration. */
export default function SiteBehavior() {
  useEffect(() => {
    initSite();
  }, []);
  return null;
}
