import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BUDG'UP",
    short_name: "BUDG'UP",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop-screenshot1.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop view of the main dashboard",
      },
      {
        src: "/screenshots/desktop-screenshot2.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "Detailed analytics page on desktop",
      },
    ],
    id: "/?source=pwa",
    start_url: "/?source=pwa",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    description: "Simplifiez votre budget, Maîtrisez vos finances.",
    orientation: "any",
  }
}
