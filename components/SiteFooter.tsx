import Link from "next/link";
import { EMAIL, PHONE_PRIMARY, PHONE_SECONDARY, TRUSTPILOT_URL } from "@/lib/site";

/** Site-wide footer. Section links point at "/#..." so they work from every page, not only the home page. */
export default function SiteFooter({ topHref = "#top" }: { topHref?: string }) {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link href="/" className="logo logo--light" aria-label="Columbus Home Buyers home">
            <img className="logo__img" src="/assets/images/logo.webp" alt="Columbus Home Buyers logo" width="240" height="240" loading="lazy" decoding="async" />
            <span className="logo__text">Columbus<strong>Home Buyers</strong></span>
          </Link>
          <p>Local cash home buyers helping Columbus homeowners sell fast, as-is, with no fees and no commissions.</p>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li><a href="/#how">How It Works</a></li>
            <li><a href="/#why">Why Sell To Us</a></li>
            <li><a href="/#compare">Compare Options</a></li>
            <li><a href="/#reviews">Reviews</a></li>
            <li><a href="/#video-reviews">Video Testimonials</a></li>
            <li><a href={TRUSTPILOT_URL} target="_blank" rel="noopener">Trustpilot Reviews</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3>We Buy In</h3>
          <ul>
            <li>Columbus</li>
            <li>Westerville</li>
            <li>Dublin</li>
            <li>Reynoldsburg</li>
            <li><a href="/#areas">All service areas</a></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer__contact">
            <li><svg className="icon"><use href="#i-phone"/></svg><a href={`tel:${PHONE_PRIMARY.tel}`}>{PHONE_PRIMARY.display}</a></li>
            <li><svg className="icon"><use href="#i-phone"/></svg><a href={`tel:${PHONE_SECONDARY.tel}`}>{PHONE_SECONDARY.display}</a></li>
            <li><svg className="icon"><use href="#i-mail"/></svg><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><svg className="icon"><use href="#i-clock"/></svg>Open 7 days, 8am to 8pm</li>
            <li><svg className="icon"><use href="#i-pin"/></svg>Columbus, OH &amp; surrounding areas</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__copy">
            <p className="footer__copyright">&copy; <span id="year">{new Date().getFullYear()}</span> Columbus Home Buyers. All rights reserved.</p>
            <p className="footer__legal">Columbus Home Buyers buys properties directly from homeowners. Requesting an offer does not obligate you to sell.</p>
            <nav className="footer__policies" aria-label="Legal">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            </nav>
          </div>
          <a href={topHref} className="footer__top" aria-label="Back to top">
            Back to top
            <span><svg className="icon"><use href="#i-arrow"/></svg></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
