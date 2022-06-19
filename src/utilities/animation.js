import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Animation() {
  // AOS animation initialization here
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 1300,
      easing: "ease",
    });
  });
}
