import Link from "next/link";
import IconSprite from "@/components/IconSprite";
import SiteFooter from "@/components/SiteFooter";
import { PHONE_PRIMARY, SITE_URL, jsonLd } from "@/lib/site";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. The last crumb is the current page. */
function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) =>
          i < crumbs.length - 1 ? (
            <li key={c.path}><Link href={c.path}>{c.name}</Link></li>
          ) : (
            <li key={c.path} aria-current="page">{c.name}</li>
          )
        )}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </nav>
  );
}

/** Layout for every page other than the home page: compact header, breadcrumbs, content, shared footer. */
export default function PageShell({ crumbs, children }: { crumbs?: Crumb[]; children: React.ReactNode }) {
  return (
    <>
      <IconSprite />
      <header className="page-top" id="top">
        <div className="container page-top__inner">
          <Link href="/" className="logo" aria-label="Columbus Home Buyers home">
            <img className="logo__img" src="/assets/images/logo.webp" alt="Columbus Home Buyers logo" width="240" height="240" />
            <span className="logo__text">Columbus<strong>Home Buyers</strong></span>
          </Link>
          <div className="page-top__actions">
            <a href={`tel:${PHONE_PRIMARY.tel}`} className="nav__phone">
              <svg className="icon"><use href="#i-phone"/></svg>
              <span>{PHONE_PRIMARY.display}</span>
            </a>
            <a href="/#offer" className="btn btn--primary btn--sm">Get Cash Offer</a>
          </div>
        </div>
      </header>
      <main className="page-main">
        <div className="container container--narrow">
          {crumbs && <Breadcrumbs crumbs={crumbs} />}
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
