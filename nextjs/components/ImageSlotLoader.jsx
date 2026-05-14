"use client";

import { useEffect } from "react";

// Loads the <image-slot> custom element on the client. The web component
// itself lives in /public/image-slot.js so it stays a single global registration
// shared across mount/unmount cycles.
export default function ImageSlotLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (customElements.get("image-slot")) return;
    const s = document.createElement("script");
    s.src = "/image-slot.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);
  return null;
}
