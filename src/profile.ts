import type { ImageMetadata } from "astro";
import profileImage from "./images/profile.jpg";

export type Link = {
  label: string;
  url: string;
  network: Network;
  highlight?: true;
};

export type Network =
  | "bluesky"
  | "github"
  | "instagram"
  | "linkedin"
  | "mastodon"
  | "threads"
  | "coffee";

export type Profile = {
  title: string;
  name: string;
  avatar: {
    src: ImageMetadata;
    alt: string;
  };
  links: Link[];
};

export const profile: Profile = {
  title: "David Vekony",
  name: "David Vekony",
  avatar: {
    src: profileImage,
    alt: "Profile photo of David Vekony",
  },
  links: [
    { label: "Bluesky", url: "https://bsky.app/profile/davidvekony.bsky.social", network: "bluesky" },
    { label: "GitHub", url: "https://github.com/davidvekony", network: "github" },
    { label: "Instagram", url: "https://www.instagram.com/vekonydavid/", network: "instagram" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/davidvekony/", network: "linkedin" },
    { label: "Mastodon", url: "https://mas.to/@davidvekony", network: "mastodon" },
    { label: "Threads", url: "https://www.threads.net/@vekonydavid", network: "threads" },
    { label: "Buy Me A Coffee", url: "https://buymeacoffee.com/davidvekony", network: "coffee", highlight: true },
  ],
};
