import type { CSSProperties } from "react";
import SiteBehavior from "@/components/SiteBehavior";

export default function Home() {
  return (
    <>
      {/* ============ SVG ICON SPRITE ============ */}
        <svg width="0" height="0" style={{ "position": "absolute" } as CSSProperties} aria-hidden="true">
          <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/></symbol>
          <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
          <symbol id="i-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
          <symbol id="i-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
          <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></symbol>
          <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
          <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
          <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
          <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
          <symbol id="i-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/></symbol>
          <symbol id="i-dollar" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></symbol>
          <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></symbol>
          <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
          <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></symbol>
          <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></symbol>
          <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></symbol>
          <symbol id="i-lock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
          <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></symbol>
          <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></symbol>
          <symbol id="i-handshake" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></symbol>
          <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></symbol>
          <symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></symbol>
          <symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></symbol>
        </svg>

        {/* ============ NAV ============ */}
        <header className="nav" id="nav">
          <div className="container nav__inner">
            <a href="#home" className="logo" aria-label="Columbus Home Buyers home">
              <img className="logo__img" src="/assets/images/logo.webp" alt="" width="240" height="240" />
              <span className="logo__text">Columbus<strong>Home Buyers</strong></span>
            </a>

            <nav className="nav__links" id="navLinks" aria-label="Main">
              <a href="#how">How It Works</a>
              <a href="#why">Why Us</a>
              <a href="#compare">Compare</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
              <a href="tel:+16144901163" className="nav__phone-mobile">
                <svg className="icon"><use href="#i-phone"/></svg> (614) 490-1163
              </a>
              <a href="tel:+17402725378" className="nav__phone-mobile">
                <svg className="icon"><use href="#i-phone"/></svg> (740) 272-5378
              </a>
              <a href="mailto:info@columbushb.com" className="nav__phone-mobile">
                <svg className="icon"><use href="#i-mail"/></svg> info@columbushb.com
              </a>
            </nav>

            <div className="nav__actions">
              <a href="tel:+16144901163" className="nav__phone">
                <svg className="icon"><use href="#i-phone"/></svg>
                <span>(614) 490-1163</span>
              </a>
              <a href="#offer" className="btn btn--primary btn--sm">Get Cash Offer</a>
              <button className="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">
                <svg className="icon"><use href="#i-menu"/></svg>
              </button>
            </div>
          </div>

          {/* Section jump bar (appears after the hero) */}
          <div className="subnav" id="subnav">
            <div className="container">
              <nav className="subnav__links" id="subnavLinks" aria-label="Jump to section">
                <a href="#how">How It Works</a>
                <a href="#why">Why Us</a>
                <a href="#guarantee">Guarantee</a>
                <a href="#compare">Compare</a>
                <a href="#situations">Situations</a>
                <a href="#reviews">Reviews</a>
                <a href="#video-reviews">Videos</a>
                <a href="#areas">Areas</a>
                <a href="#offer">Get Offer</a>
                <a href="#faq">FAQ</a>
              </nav>
            </div>
            <span className="subnav__progress" id="scrollProgress" aria-hidden="true"></span>
          </div>
        </header>

        <main>
          {/* ============ HERO ============ */}
          <section className="hero" id="home">
            <div className="hero__gradient" aria-hidden="true"></div>
            <canvas className="hero__particles" id="particles" aria-hidden="true"></canvas>
            <div className="hero__vignette" aria-hidden="true"></div>

            <div className="hero__content">
              <p className="hero__eyebrow reveal">
                <span className="dot"></span> Columbus, Ohio &middot; Local Cash Buyers
              </p>

              <h1 className="hero__name reveal">
                Columbus <span className="accent">Home Buyers</span>
              </h1>

              <h2 className="hero__title reveal">
                Sell Your House Fast. <span className="nowrap">Get Paid in Cash.</span>
              </h2>

              <p className="hero__tagline reveal">
                A fair cash offer in 24 hours. No repairs, no fees, no commissions.
                Close in as little as 7 days, on your timeline.
              </p>

              <div className="hero__actions reveal">
                <a href="#offer" className="btn btn--primary">
                  Get My Cash Offer
                  <svg className="icon"><use href="#i-arrow"/></svg>
                </a>
                <a href="tel:+16144901163" className="btn btn--ghost">
                  <svg className="icon"><use href="#i-phone"/></svg>
                  Call (614) 490-1163
                </a>
              </div>

              <ul className="hero__trust reveal">
                <li><svg className="icon"><use href="#i-check"/></svg> 24-Hour Cash Offers</li>
                <li><svg className="icon"><use href="#i-check"/></svg> No Repairs. No Fees.</li>
                <li><svg className="icon"><use href="#i-check"/></svg> Trusted Local Buyer</li>
              </ul>
            </div>

            <a href="#stats" className="hero__scroll" aria-label="Scroll down"><span></span></a>
          </section>

          {/* ============ STATS ============ */}
          <section className="stats" id="stats" aria-label="Company stats">
            <div className="container stats__grid">
              <div className="stat" data-animate>
                <span className="stat__value"><span data-count="100">0</span>+</span>
                <span className="stat__label">Homes Purchased</span>
              </div>
              <div className="stat" data-animate>
                <span className="stat__value"><span data-count="10">0</span>+</span>
                <span className="stat__label">Years in Columbus, OH</span>
              </div>
              <div className="stat" data-animate>
                <span className="stat__value"><span data-count="4.9" data-decimals="1">0</span><svg className="icon icon--fill stat__star"><use href="#i-star"/></svg></span>
                <span className="stat__label">Google Rating</span>
              </div>
              <div className="stat" data-animate>
                <span className="stat__value"><span data-count="100">0</span>%</span>
                <span className="stat__label">Locally Owned</span>
              </div>
            </div>
          </section>

          {/* ============ HOW IT WORKS ============ */}
          <section className="section" id="how">
            <div className="container">
              <header className="section__head" data-animate>
                <p className="eyebrow">How It Works</p>
                <h2 className="section__title">Three simple steps to <span className="hl">sold</span></h2>
                <p className="section__lead">No showings, no open houses, no waiting on a buyer's bank. Here's the whole process.</p>
              </header>

              <ol className="steps">
                <li className="step" data-animate>
                  <span className="step__num">01</span>
                  <span className="step__icon"><svg className="icon"><use href="#i-doc"/></svg></span>
                  <h3>Tell Us About Your Property</h3>
                  <p>Fill out our simple form or give us a call. We'll gather basic info about your property. It takes less than 2 minutes.</p>
                </li>
                <li className="step" data-animate>
                  <span className="step__num">02</span>
                  <span className="step__icon"><svg className="icon"><use href="#i-clock"/></svg></span>
                  <h3>Get Your Cash Offer</h3>
                  <p>We'll evaluate your property and present you with a no-obligation cash offer within 24 hours.</p>
                </li>
                <li className="step" data-animate>
                  <span className="step__num">03</span>
                  <span className="step__icon"><svg className="icon"><use href="#i-calendar"/></svg></span>
                  <h3>Close On Your Timeline</h3>
                  <p>Accept our offer and choose your closing date. Get paid fast, often in as little as 7 days.</p>
                </li>
              </ol>

              <div className="center" data-animate>
                <a href="#offer" className="btn btn--dark">Start Step 1 Now <svg className="icon"><use href="#i-arrow"/></svg></a>
              </div>
            </div>
          </section>

          {/* ============ WHY US ============ */}
          <section className="section section--alt" id="why">
            <div className="container">
              <header className="section__head" data-animate>
                <p className="eyebrow">Why Sell To Us</p>
                <h2 className="section__title">The easiest way to sell a house in Columbus</h2>
                <p className="section__lead">We're local, we buy with our own cash, and we make the whole thing simple.</p>
              </header>

              <div className="features">
                <article className="feature" data-animate>
                  <span className="feature__icon"><svg className="icon"><use href="#i-wrench"/></svg></span>
                  <h3>No Repairs Needed</h3>
                  <p>Sell your house as-is. No fixing, no cleaning. Leave behind anything you don't want.</p>
                </article>
                <article className="feature" data-animate>
                  <span className="feature__icon"><svg className="icon"><use href="#i-dollar"/></svg></span>
                  <h3>No Fees or Commissions</h3>
                  <p>Keep more money. We pay all closing costs, so there are zero hidden costs.</p>
                </article>
                <article className="feature" data-animate>
                  <span className="feature__icon"><svg className="icon"><use href="#i-bolt"/></svg></span>
                  <h3>Close Fast</h3>
                  <p>Get cash in as little as 7 days, or pick a later date that works for you.</p>
                </article>
                <article className="feature" data-animate>
                  <span className="feature__icon"><svg className="icon"><use href="#i-clock"/></svg></span>
                  <h3>24-Hour Offer</h3>
                  <p>Submit your property info and have a fair cash offer in your hands within 24 hours. No waiting. No wondering.</p>
                </article>
                <article className="feature" data-animate>
                  <span className="feature__icon"><svg className="icon"><use href="#i-handshake"/></svg></span>
                  <h3>We Do All The Work</h3>
                  <p>We handle the paperwork, title, and closing. You just show up and sign.</p>
                </article>
                <article className="feature" data-animate>
                  <span className="feature__icon"><svg className="icon"><use href="#i-pin"/></svg></span>
                  <h3>Columbus Local Experts</h3>
                  <p>We know Columbus and surrounding areas: Westerville, Dublin, Reynoldsburg, and more.</p>
                </article>
              </div>
            </div>
          </section>

          {/* ============ PRICE LOCK GUARANTEE ============ */}
          <section className="guarantee" id="guarantee">
            <div className="guarantee__glow" aria-hidden="true"></div>
            <div className="container guarantee__inner">
              <div className="guarantee__badge" data-animate>
                <svg className="icon"><use href="#i-shield"/></svg>
                <span>Price Lock<br />Guarantee</span>
              </div>

              <div className="guarantee__copy" data-animate>
                <p className="eyebrow eyebrow--light">Your Price. Guaranteed.</p>
                <h2 className="section__title section__title--light">Our offer never changes.</h2>
                <p>
                  Most cash buyers quote high to get you locked in. Then they send someone to inspect the
                  property and chip away at the number. By the time they're done adjusting, the offer barely
                  resembles what they promised.
                </p>
                <p className="guarantee__punch">
                  We do our homework first. The number we give you is the number you get at closing. Every single time.
                </p>

                <ul className="guarantee__points">
                  <li><svg className="icon"><use href="#i-search"/></svg> No Inspection Tricks</li>
                  <li><svg className="icon"><use href="#i-dollar"/></svg> Zero Fees. Zero Commissions.</li>
                  <li><svg className="icon"><use href="#i-lock"/></svg> Locked-In Price</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ============ COMPARISON ============ */}
          <section className="section" id="compare">
            <div className="container container--narrow">
              <header className="section__head" data-animate>
                <p className="eyebrow">Compare Your Options</p>
                <h2 className="section__title">Selling to us vs. listing with an agent</h2>
                <p className="section__lead">Listing can make sense for some homes. But if you want speed, certainty, and zero out-of-pocket costs, here's how it stacks up.</p>
              </header>

              <div className="compare" data-animate>
                <table>
                  <thead>
                    <tr>
                      <th scope="col"><span className="sr-only">Category</span></th>
                      <th scope="col" className="compare__us">
                        <span className="compare__brand"><svg className="icon"><use href="#i-home"/></svg> Columbus Home Buyers</span>
                      </th>
                      <th scope="col" className="compare__them">Traditional Agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Closing Costs</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> None. We cover all costs</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> 2 to 5% of sale price</td>
                    </tr>
                    <tr>
                      <th scope="row">Commissions</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> No commissions</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> Up to 6% of sale price</td>
                    </tr>
                    <tr>
                      <th scope="row">Inspection &amp; Financing</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> None required</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> Required, deals can fall through</td>
                    </tr>
                    <tr>
                      <th scope="row">Appraisal</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> No appraisal needed</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> Yes, required by lender</td>
                    </tr>
                    <tr>
                      <th scope="row">Average Days to Close</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> 7 to 14 days</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> 30 to 90+ days</td>
                    </tr>
                    <tr>
                      <th scope="row">Showings</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> Zero showings</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> Multiple showings</td>
                    </tr>
                    <tr>
                      <th scope="row">Repairs</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> None. Sold as-is</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> Negotiated after inspection</td>
                    </tr>
                    <tr>
                      <th scope="row">Closing Date</th>
                      <td className="compare__us" data-label="Columbus Home Buyers"><svg className="icon yes"><use href="#i-check"/></svg> You choose the date</td>
                      <td className="compare__them" data-label="Traditional Agent"><svg className="icon no"><use href="#i-x"/></svg> Depends on buyer's lender</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ============ SITUATIONS ============ */}
          <section className="section section--alt" id="situations">
            <div className="container">
              <header className="section__head" data-animate>
                <p className="eyebrow">Any House. Any Situation.</p>
                <h2 className="section__title">We help Columbus homeowners through tough spots</h2>
                <p className="section__lead">Whatever's going on, you don't have to figure it out alone. We've seen it before, and we can usually help.</p>
              </header>

              <ul className="chips" data-animate>
                <li>Foreclosure</li>
                <li>Divorce</li>
                <li>Financial Struggles</li>
                <li>Relocation</li>
                <li>Inherited Property</li>
                <li>Structural Damage</li>
                <li>Code Violations</li>
                <li>Low Equity</li>
                <li>Bad Tenants</li>
                <li>Tax Liens</li>
                <li>Vacant Property</li>
                <li>Fire Damage</li>
              </ul>

              <p className="situations__note" data-animate>
                Don't see yours? <a href="tel:+16144901163">Call us at (614) 490-1163</a> and let's talk it through. No pressure.
              </p>
            </div>
          </section>

          {/* ============ REVIEWS ============ */}
          <section className="section" id="reviews">
            <div className="container">
              <header className="section__head section__head--split" data-animate>
                <div>
                  <p className="eyebrow">Real Sellers. Real Results.</p>
                  <h2 className="section__title">What Columbus homeowners say</h2>
                </div>
                <div className="reviews__summary">
                  <span className="reviews__score">4.9</span>
                  <div>
                    <span className="stars" aria-label="5 out of 5 stars">
                      <svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg>
                    </span>
                    <span className="reviews__meta">Google Rating &middot; <a href="https://www.trustpilot.com/review/columbushb.com" target="_blank" rel="noopener">See us on Trustpilot</a></span>
                  </div>
                </div>
              </header>

              <div className="carousel" data-animate>
                <div className="carousel__track" id="reviewTrack">
                  <article className="review">
                    <span className="review__tag">Closed in 10 days</span>
                    <span className="stars" aria-label="5 stars"><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg></span>
                    <blockquote>"I was facing foreclosure and didn't know what to do. They gave me a fair offer in 24 hours and we closed in 10 days. Got $127K cash. Lifesaver!"</blockquote>
                    <footer className="review__who"><span className="avatar">SM</span><span><strong>Sarah M.</strong>Franklinton, Columbus</span></footer>
                  </article>
                  <article className="review">
                    <span className="review__tag">Sold as-is for $145K</span>
                    <span className="stars" aria-label="5 stars"><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg></span>
                    <blockquote>"Inherited my mom's house and it needed a ton of work. They bought it as-is for $145K and made the whole process so simple. Highly recommend."</blockquote>
                    <footer className="review__who"><span className="avatar">JT</span><span><strong>James T.</strong>Westerville, OH</span></footer>
                  </article>
                  <article className="review">
                    <span className="review__tag">Closed in 9 days</span>
                    <span className="stars" aria-label="5 stars"><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg></span>
                    <blockquote>"After my divorce, I needed to sell fast. No realtors, no showings, no stress. Got a cash offer and closed in 9 days on my timeline. Thank you!"</blockquote>
                    <footer className="review__who"><span className="avatar">ML</span><span><strong>Maria L.</strong>Reynoldsburg, OH</span></footer>
                  </article>
                  <article className="review">
                    <a className="review__tag review__tag--tp" href="https://www.trustpilot.com/review/columbushb.com" target="_blank" rel="noopener">Trustpilot &middot; Jun 2026</a>
                    <span className="stars" aria-label="5 stars"><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg></span>
                    <h3 className="review__title">Smooth, straightforward closing</h3>
                    <blockquote>"They were reasonable and straightforward on the closing and it went smoothly without any issues. Would deal with home buyer Joseph again."</blockquote>
                    <footer className="review__who"><span className="avatar">G</span><span><strong>Gilliland</strong>Verified review</span></footer>
                  </article>
                  <article className="review">
                    <a className="review__tag review__tag--tp" href="https://www.trustpilot.com/review/columbushb.com" target="_blank" rel="noopener">Trustpilot &middot; Jul 2026</a>
                    <span className="stars" aria-label="5 stars"><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg><svg className="icon icon--fill"><use href="#i-star"/></svg></span>
                    <h3 className="review__title">Excellent company</h3>
                    <blockquote>"Good communication and awesome to work with!"</blockquote>
                    <footer className="review__who"><span className="avatar">RM</span><span><strong>Ruth McRoy</strong>Verified review</span></footer>
                  </article>
                </div>

                <div className="carousel__controls">
                  <button className="carousel__btn" data-dir="-1" aria-label="Previous review"><svg className="icon"><use href="#i-left"/></svg></button>
                  <button className="carousel__btn" data-dir="1" aria-label="Next review"><svg className="icon"><use href="#i-right"/></svg></button>
                </div>
              </div>

              {/* Video testimonials */}
              <div className="vids" id="video-reviews">
                <div className="vids__copy" data-animate>
                  <p className="eyebrow">Video Testimonials</p>
                  <h3 className="vids__title">Hear it straight from our sellers</h3>
                  <p className="section__lead">Real Columbus homeowners sharing what it was like to sell their house to us. No scripts, no actors.</p>

                  <a href="https://www.trustpilot.com/review/columbushb.com" target="_blank" rel="noopener" className="tp-card">
                    <span className="tp-card__logo" aria-hidden="true">
                      <svg className="icon icon--fill"><use href="#i-star"/></svg>
                    </span>
                    <span className="tp-card__body">
                      <strong>Read our reviews on Trustpilot</strong>
                      <span className="tp-card__stars" aria-hidden="true">
                        <i><svg className="icon icon--fill"><use href="#i-star"/></svg></i><i><svg className="icon icon--fill"><use href="#i-star"/></svg></i><i><svg className="icon icon--fill"><use href="#i-star"/></svg></i><i><svg className="icon icon--fill"><use href="#i-star"/></svg></i><i><svg className="icon icon--fill"><use href="#i-star"/></svg></i>
                      </span>
                      <small>Verified reviews from real sellers</small>
                    </span>
                    <svg className="icon tp-card__arrow"><use href="#i-arrow"/></svg>
                  </a>
                </div>

                <div className="vids__grid">
                  <figure className="vid" data-animate>
                    <video preload="none" playsInline poster="/assets/videos/testimonial-1.jpg">
                      <source src="/assets/videos/testimonial-1.mp4" type="video/mp4" />
                    </video>
                    <button className="vid__play" aria-label="Play seller testimonial 1">
                      <span><svg className="icon icon--fill"><use href="#i-play"/></svg></span>
                    </button>
                    <figcaption className="vid__cap"><strong>Seller Story</strong>Columbus homeowner</figcaption>
                  </figure>
                  <figure className="vid" data-animate style={{ "--delay": "0.12s" } as CSSProperties}>
                    <video preload="none" playsInline poster="/assets/videos/testimonial-2.jpg">
                      <source src="/assets/videos/testimonial-2.mp4" type="video/mp4" />
                    </video>
                    <button className="vid__play" aria-label="Play seller testimonial 2">
                      <span><svg className="icon icon--fill"><use href="#i-play"/></svg></span>
                    </button>
                    <figcaption className="vid__cap"><strong>Seller Story</strong>Columbus homeowner</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SERVICE AREAS ============ */}
          <section className="section section--dark" id="areas">
            <div className="container areas">
              <div className="areas__copy" data-animate>
                <p className="eyebrow eyebrow--light">Where We Buy</p>
                <h2 className="section__title section__title--light">Buying houses across Central Ohio</h2>
                <p>We're Columbus locals, not an out-of-state call center. We buy in the city and throughout the surrounding suburbs and counties.</p>

                <ul className="areas__list">
                  <li>Columbus</li><li>Westerville</li><li>Dublin</li><li>Reynoldsburg</li>
                  <li>Hilliard</li><li>Grove City</li><li>Gahanna</li><li>Upper Arlington</li>
                  <li>Worthington</li><li>Pickerington</li><li>Groveport</li><li>New Albany</li>
                  <li>Canal Winchester</li><li>Whitehall</li><li>Delaware</li><li>Lancaster</li>
                </ul>

                <a href="#offer" className="btn btn--primary">See What We'll Pay <svg className="icon"><use href="#i-arrow"/></svg></a>
              </div>

              <div className="map" data-animate aria-hidden="true">
                <div className="map__rings"><span></span><span></span><span></span></div>
                <span className="map__pin map__pin--hq" style={{ "--x": "50%", "--y": "50%" } as CSSProperties}>Columbus</span>
                <span className="map__pin" style={{ "--x": "47%", "--y": "10%" } as CSSProperties}>Delaware</span>
                <span className="map__pin" style={{ "--x": "30%", "--y": "30%" } as CSSProperties}>Dublin</span>
                <span className="map__pin" style={{ "--x": "61%", "--y": "24%" } as CSSProperties}>Westerville</span>
                <span className="map__pin" style={{ "--x": "77%", "--y": "34%" } as CSSProperties}>New Albany</span>
                <span className="map__pin" style={{ "--x": "22%", "--y": "48%" } as CSSProperties}>Hilliard</span>
                <span className="map__pin" style={{ "--x": "71%", "--y": "45%" } as CSSProperties}>Gahanna</span>
                <span className="map__pin" style={{ "--x": "78%", "--y": "58%" } as CSSProperties}>Reynoldsburg</span>
                <span className="map__pin" style={{ "--x": "34%", "--y": "72%" } as CSSProperties}>Grove City</span>
                <span className="map__pin" style={{ "--x": "56%", "--y": "78%" } as CSSProperties}>Groveport</span>
                <span className="map__pin" style={{ "--x": "77%", "--y": "72%" } as CSSProperties}>Pickerington</span>
                <span className="map__pin" style={{ "--x": "84%", "--y": "90%" } as CSSProperties}>Lancaster</span>
              </div>
            </div>
          </section>

          {/* ============ OFFER FORM ============ */}
          <section className="section offer" id="offer">
            <div className="container offer__grid">
              <div className="offer__copy" data-animate>
                <p className="eyebrow">Get Your Fair Cash Offer</p>
                <h2 className="section__title">Find out what we'll pay for your house</h2>
                <p className="section__lead">Answer a few quick questions and we'll prepare a no-obligation cash offer within 24 hours.</p>

                <ul className="checklist">
                  <li><svg className="icon"><use href="#i-check"/></svg> Takes about 30 seconds</li>
                  <li><svg className="icon"><use href="#i-check"/></svg> 100% free, no obligation</li>
                  <li><svg className="icon"><use href="#i-check"/></svg> Offer locked with our Price Lock Guarantee</li>
                  <li><svg className="icon"><use href="#i-check"/></svg> A real local person follows up, not a bot</li>
                </ul>

                <div className="offer__call">
                  <span className="offer__call-icon"><svg className="icon"><use href="#i-phone"/></svg></span>
                  <div>
                    <span>Rather talk to someone?</span>
                    <a href="tel:+16144901163">(614) 490-1163</a>
                    <a href="tel:+17402725378" className="offer__call-alt">(740) 272-5378</a>
                    <a href="mailto:info@columbushb.com" className="offer__call-mail"><svg className="icon"><use href="#i-mail"/></svg> info@columbushb.com</a>
                    <small>Open 7 days &middot; 8am to 8pm</small>
                  </div>
                </div>
              </div>

              <div className="form-card" data-animate>
                <div className="form-card__progress" aria-hidden="true"><span id="formBar"></span></div>
                <p className="form-card__step" id="formStepLabel">Step 1 of 6</p>

                <form id="offerForm" noValidate>
                  {/* Step 1: address */}
                  <fieldset className="fstep is-active" data-step="1">
                    <legend>What's the property address?</legend>
                    <p className="fhint">Enter your address to start.</p>
                    <label className="field">
                      <span className="sr-only">Property address</span>
                      <svg className="icon field__icon"><use href="#i-pin"/></svg>
                      <input type="text" name="address" placeholder="123 Main St, Columbus, OH" autoComplete="street-address" required />
                    </label>
                    <p className="ferror" data-error-for="address">Please enter the property address.</p>
                    <button type="button" className="btn btn--primary btn--block" data-next>Continue <svg className="icon"><use href="#i-arrow"/></svg></button>
                  </fieldset>

                  {/* Step 2: condition */}
                  <fieldset className="fstep" data-step="2">
                    <legend>What's the property's current condition?</legend>
                    <p className="fhint">Be honest. We buy in any condition.</p>
                    <div className="options">
                      <label className="option"><input type="radio" name="condition" value="Needs Lots of Work" /><span>Needs Lots of Work</span></label>
                      <label className="option"><input type="radio" name="condition" value="Needs Some Repairs" /><span>Needs Some Repairs</span></label>
                      <label className="option"><input type="radio" name="condition" value="Just Needs Cleaning Out" /><span>Just Needs Cleaning Out</span></label>
                      <label className="option"><input type="radio" name="condition" value="Move-In Ready" /><span>Move-In Ready</span></label>
                    </div>
                  </fieldset>

                  {/* Step 3: timeline */}
                  <fieldset className="fstep" data-step="3">
                    <legend>What's your timeline for selling?</legend>
                    <p className="fhint">You pick the closing date either way.</p>
                    <div className="options">
                      <label className="option"><input type="radio" name="timeline" value="Immediately" /><span>Immediately</span></label>
                      <label className="option"><input type="radio" name="timeline" value="Within 1 month" /><span>Within 1 month</span></label>
                      <label className="option"><input type="radio" name="timeline" value="Within 3 months" /><span>Within 3 months</span></label>
                      <label className="option"><input type="radio" name="timeline" value="3+ months" /><span>3+ months</span></label>
                    </div>
                  </fieldset>

                  {/* Step 4: reason */}
                  <fieldset className="fstep" data-step="4">
                    <legend>What's the reason for selling?</legend>
                    <p className="fhint">This helps us prepare a competitive offer quickly.</p>
                    <div className="options">
                      <label className="option"><input type="radio" name="reason" value="Financial Reasons" /><span>Financial Reasons</span></label>
                      <label className="option"><input type="radio" name="reason" value="Inherited Property" /><span>Inherited Property</span></label>
                      <label className="option"><input type="radio" name="reason" value="Tired of Managing" /><span>Tired of Managing</span></label>
                      <label className="option"><input type="radio" name="reason" value="Relocation" /><span>Relocation</span></label>
                      <label className="option"><input type="radio" name="reason" value="Divorce" /><span>Divorce</span></label>
                      <label className="option"><input type="radio" name="reason" value="Other" /><span>Other</span></label>
                    </div>
                  </fieldset>

                  {/* Step 5: listed + price */}
                  <fieldset className="fstep" data-step="5">
                    <legend>Is your property currently listed?</legend>
                    <div className="options options--2">
                      <label className="option"><input type="radio" name="listed" value="No" /><span>No</span></label>
                      <label className="option"><input type="radio" name="listed" value="Yes" /><span>Yes</span></label>
                    </div>
                    <p className="fnotice" id="listedNotice">Heads up: we typically don't make offers on listed properties, but we're happy to talk once your listing ends.</p>

                    <label className="field field--stacked">
                      <span>Do you have a specific price in mind? <em>(optional)</em></span>
                      <span className="field__wrap">
                        <svg className="icon field__icon"><use href="#i-dollar"/></svg>
                        <input type="text" name="price" inputMode="numeric" placeholder="e.g. 150,000" />
                      </span>
                    </label>
                    <p className="ferror" data-error-for="listed">Please choose Yes or No.</p>
                    <button type="button" className="btn btn--primary btn--block" data-next>Continue <svg className="icon"><use href="#i-arrow"/></svg></button>
                  </fieldset>

                  {/* Step 6: contact */}
                  <fieldset className="fstep" data-step="6">
                    <legend>Almost done! Where should we send your offer?</legend>
                    <p className="fhint">We'll prepare your no-obligation offer within 24 hours.</p>
                    <label className="field field--stacked">
                      <span>Full name</span>
                      <input type="text" name="name" autoComplete="name" required />
                    </label>
                    <p className="ferror" data-error-for="name">Please enter your name.</p>
                    <label className="field field--stacked">
                      <span>Phone</span>
                      <input type="tel" name="phone" autoComplete="tel" placeholder="(614) 555-0123" required />
                    </label>
                    <p className="ferror" data-error-for="phone">Please enter a valid 10-digit phone number.</p>
                    <label className="field field--stacked">
                      <span>Email</span>
                      <input type="email" name="email" autoComplete="email" required />
                    </label>
                    <p className="ferror" data-error-for="email">Please enter a valid email.</p>
                    <button type="submit" className="btn btn--primary btn--block">Get My Cash Offer <svg className="icon"><use href="#i-arrow"/></svg></button>
                    <p className="ferror" id="submitError" role="alert">We couldn't send your info. Please try again, or call us at (614) 490-1163.</p>
                    <p className="fprivacy"><svg className="icon"><use href="#i-lock"/></svg> Your information is private and never sold.</p>
                  </fieldset>

                  {/* Success */}
                  <div className="fsuccess" id="formSuccess" hidden>
                    <span className="fsuccess__icon"><svg className="icon"><use href="#i-check"/></svg></span>
                    <h3>Thanks, <span id="successName">friend</span>!</h3>
                    <p>We've got your info. A member of our local team will reach out shortly and have your cash offer ready within 24 hours.</p>
                    <a href="tel:+16144901163" className="btn btn--dark btn--block"><svg className="icon"><use href="#i-phone"/></svg> Can't wait? Call (614) 490-1163</a>
                  </div>
                </form>

                <button type="button" className="form-card__back" id="formBack" hidden>
                  <svg className="icon"><use href="#i-left"/></svg> Back
                </button>
              </div>
            </div>
          </section>

          {/* ============ FAQ ============ */}
          <section className="section section--alt" id="faq">
            <div className="container container--narrow">
              <header className="section__head" data-animate>
                <p className="eyebrow">Questions?</p>
                <h2 className="section__title">Frequently asked questions</h2>
              </header>

              <div className="faq" data-animate>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">How do you come up with your cash offer?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>We look at your home's location, condition, recent comparable sales nearby, and what it will cost to repair. Because we do that homework up front, the offer you get is the offer you keep. That's our Price Lock Guarantee.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">Are there any fees or commissions?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>None. There are no agent commissions and we pay all normal closing costs. The number on your offer is what you take home.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">Do I need to make repairs or clean the house?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>No. We buy houses as-is, in any condition. You don't need to fix, paint, or even clean. Take what you want and leave the rest.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">How fast can you close?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>We can close in as little as 7 days. Most of our closings happen in 7 to 14 days. Need more time to move? You choose the closing date.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">Will your offer drop after you see the house?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>No. A lot of buyers start high and chip away after inspection. We don't play that game. Once we give you a number, that's the number at closing.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">Am I obligated to accept your offer?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>Not at all. Our offers are 100% free and no-obligation. If it doesn't work for you, no hard feelings.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">Can you help if I'm behind on payments or facing foreclosure?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>Yes. We regularly help homeowners facing foreclosure, tax liens, and other financial pressure. Because we pay cash and close quickly, we can often move before deadlines hit. Call us as early as you can.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">Do you buy houses that are listed with an agent?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>We typically don't make offers on listed properties. If your listing is ending or you're thinking about pulling it, reach out and we'll talk.</p></div></div>
                </div>
                <div className="faq__item">
                  <button className="faq__q" aria-expanded="false">Can you buy a rental with tenants still living there?<svg className="icon"><use href="#i-plus"/></svg></button>
                  <div className="faq__a"><div><p>Yes. Whether you're tired of managing or dealing with difficult tenants, we can buy rental properties with tenants in place.</p></div></div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ FINAL CTA ============ */}
          <section className="cta-band">
            <div className="container cta-band__inner" data-animate>
              <div>
                <h2>Ready to see your cash offer?</h2>
                <p>No repairs. No fees. No obligation. Just a fair number in 24 hours.</p>
              </div>
              <div className="cta-band__actions">
                <a href="#offer" className="btn btn--light">Get My Cash Offer <svg className="icon"><use href="#i-arrow"/></svg></a>
                <a href="tel:+16144901163" className="btn btn--outline-light"><svg className="icon"><use href="#i-phone"/></svg> (614) 490-1163</a>
              </div>
            </div>
          </section>
        </main>

        {/* ============ FOOTER ============ */}
        <footer className="footer">
          <div className="container footer__grid">
            <div className="footer__brand">
              <a href="#home" className="logo logo--light">
                <img className="logo__img" src="/assets/images/logo.webp" alt="" width="240" height="240" />
                <span className="logo__text">Columbus<strong>Home Buyers</strong></span>
              </a>
              <p>Local cash home buyers helping Columbus homeowners sell fast, as-is, with no fees and no commissions.</p>
            </div>

            <div>
              <h3>Company</h3>
              <ul>
                <li><a href="#how">How It Works</a></li>
                <li><a href="#why">Why Sell To Us</a></li>
                <li><a href="#compare">Compare Options</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#video-reviews">Video Testimonials</a></li>
                <li><a href="https://www.trustpilot.com/review/columbushb.com" target="_blank" rel="noopener">Trustpilot Reviews</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3>We Buy In</h3>
              <ul>
                <li>Columbus</li>
                <li>Westerville</li>
                <li>Dublin</li>
                <li>Reynoldsburg</li>
                <li><a href="#areas">All service areas</a></li>
              </ul>
            </div>

            <div>
              <h3>Contact</h3>
              <ul className="footer__contact">
                <li><svg className="icon"><use href="#i-phone"/></svg><a href="tel:+16144901163">(614) 490-1163</a></li>
                <li><svg className="icon"><use href="#i-phone"/></svg><a href="tel:+17402725378">(740) 272-5378</a></li>
                <li><svg className="icon"><use href="#i-mail"/></svg><a href="mailto:info@columbushb.com">info@columbushb.com</a></li>
                <li><svg className="icon"><use href="#i-clock"/></svg>Open 7 days, 8am to 8pm</li>
                <li><svg className="icon"><use href="#i-pin"/></svg>Columbus, OH &amp; surrounding areas</li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="container footer__bottom-inner">
              <div className="footer__copy">
                <p className="footer__copyright">&copy; <span id="year">2026</span> Columbus Home Buyers. All rights reserved.</p>
                <p className="footer__legal">Columbus Home Buyers buys properties directly from homeowners. Requesting an offer does not obligate you to sell.</p>
              </div>
              <a href="#home" className="footer__top" aria-label="Back to top">
                Back to top
                <span><svg className="icon"><use href="#i-arrow"/></svg></span>
              </a>
            </div>
          </div>
        </footer>

        {/* Mobile sticky action bar */}
        <div className="mobile-bar" id="mobileBar">
          <a href="tel:+16144901163" className="btn btn--ghost-dark"><svg className="icon"><use href="#i-phone"/></svg> Call</a>
          <a href="#offer" className="btn btn--primary">Get Cash Offer</a>
        </div>

      <SiteBehavior />
    </>
  );
}