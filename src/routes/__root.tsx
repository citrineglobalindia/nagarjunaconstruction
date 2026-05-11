import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow"><span className="gold-rule" />Error 404</p>
        <h1 className="mt-4 font-display text-6xl text-primary">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-gold mt-8">Return Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold mt-6">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nagarjuna Corporation — Iconic Living. Crafted for the Few." },
      { name: "description", content: "Nagarjuna Corporation crafts iconic luxury residences across Dubai, the Maldives, and London. Live & Let-live." },
      { property: "og:title", content: "Nagarjuna Corporation — Iconic Living. Crafted for the Few." },
      { property: "og:description", content: "Nagarjuna Corporation crafts iconic luxury residences across Dubai, the Maldives, and London. Live & Let-live." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nagarjuna Corporation — Iconic Living. Crafted for the Few." },
      { name: "twitter:description", content: "Nagarjuna Corporation crafts iconic luxury residences across Dubai, the Maldives, and London. Live & Let-live." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/50d76c98-d87f-423c-bfe7-691a70378465/id-preview-4318a65c--7ac36c3b-84d9-4530-89b6-fab5a22963ed.lovable.app-1778479408356.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/50d76c98-d87f-423c-bfe7-691a70378465/id-preview-4318a65c--7ac36c3b-84d9-4530-89b6-fab5a22963ed.lovable.app-1778479408356.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster position="top-center" toastOptions={{ style: { background: "var(--navy)", color: "var(--cream)", border: "1px solid var(--gold)", borderRadius: 0 } }} />
      </div>
    </QueryClientProvider>
  );
}
