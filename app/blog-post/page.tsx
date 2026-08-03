import { permanentRedirect } from "next/navigation";

// Legacy URL: every blog card used to point at this single static page.
// The content now lives at /blog/getting-surgery-in-mexico.
export default function BlogPostRedirect() {
  permanentRedirect("/blog/getting-surgery-in-mexico");
}
