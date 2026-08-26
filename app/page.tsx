import { STORE, formatClock, getStoreStatus } from "@/lib/store";
import { StoreBanner } from "@/app/components/store-banner";

const STORE_PHOTO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Little_Gem_Grocery_on_Superior_Street_in_Victoria_BC_Canada.png/1280px-Little_Gem_Grocery_on_Superior_Street_in_Victoria_BC_Canada.png";

const GALLERY = [
  {
    src: STORE_PHOTO,
    alt: "Little Gem Grocery on Superior Street at dusk",
    caption: "Superior Street, James Bay",
  },
  {
    src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    alt: "Well-stocked grocery shelves",
    caption: "Everyday shelves",
  },
  {
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh produce at a grocery market",
    caption: "Fresh produce",
  },
  {
    src: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=80",
    alt: "Dairy and milk products",
    caption: "Dairy staples",
  },
];

const STOCK = [
  {
    title: "Daily staples",
    copy: "Milk, eggs, butter, cheese, bread, juice, and baking basics for the week.",
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Snacks & frozen",
    copy: "Chips, candy, ice cream, frozen meals, and the hard-to-find treats people come back for.",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Produce & household",
    copy: "A compact fruit-and-veg selection plus cleaning products and other last-minute household needs.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Lottery",
    copy: "Licensed lottery ticket machines on Superior Street \u2014 grab a ticket with the groceries.",
    image:
      "https://images.unsplash.com/photo-1513542789411-95c06dc5da1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "U-Haul dealer",
    copy: "Neighborhood U-Haul point for trailer and moving-truck rentals when you need extra wheels.",
    image:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Pay your way",
    copy: "Debit, credit, and tap. Wheelchair-accessible entrance and in-store shopping.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
  },
];

const REVIEWS = [
  {
    quote:
      "A great, convenient shop with lots of selection \u2014 from fruit to cleaning products and hard-to-find snacks.",
    name: "Neighbour review",
  },
  {
    quote:
      "Good selection for a small independent place: dairy, baking supplies, frozen foods, juice, and ice cream.",
    name: "James Bay regular",
  },
  {
    quote:
      "Friendly service and a surprising range for a compact corner grocery. Easy stop when you only need a few things.",
    name: "Visitor note",
  },
];

export default function HomePage() {
  const status = getStoreStatus();

  return (
    <>
      <StoreBanner />
      <header className="site-header">
        <div className="wrap nav">
          <a className="brand" href="#top">
            <span className="brand-mark">LG</span>
            Little Gem
          </a>
          <ul className="nav-links">
            <li><a href="#hours">Hours</a></li>
            <li><a href="#photos">Photos</a></li>
            <li><a href="#stock">In store</a></li>
            <li><a href="#visit">Visit</a></li>
          </ul>
          <a className="header-cta" href={STORE.phoneHref}>
            Call the shop
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="status-chip">
                <span className={`dot ${status.isOpen ? "open" : "closed"}`} />
                {status.label}
              </div>
              <p className="eyebrow">James Bay \u00b7 Victoria, BC</p>
              <h1>Little Gem Grocery</h1>
              <p className="lede">
                An independent corner store on Superior Street. Come in for milk,
                snacks, household bits, lottery tickets \u2014 the small things that
                keep a neighbourhood moving.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={STORE.mapsUrl} target="_blank" rel="noreferrer">
                  Get directions
                </a>
                <a className="btn btn-ghost" href={STORE.phoneHref}>
                  {STORE.phone}
                </a>
              </div>
            </div>
            <figure className="hero-photo">
              <img
                src={STORE_PHOTO}
                alt="Little Gem Grocery storefront on Superior Street in Victoria"
                width={1280}
                height={853}
              />
              <figcaption>
                Photo: Nevin Thompson ·{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Little_Gem_Grocery_on_Superior_Street_in_Victoria_BC_Canada.png"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-SA 4.0
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="photos">
          <div className="wrap">
            <p className="eyebrow">Around the shop</p>
            <h2 className="section-title">A closer look</h2>
            <div className="photo-grid">
              {GALLERY.map((shot) => (
                <figure className="photo-card" key={shot.caption}>
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="hours">
          <div className="wrap hours-grid">
            <div>
              <p className="eyebrow">Open most days till 9</p>
              <h2 className="section-title">Hours this week</h2>
              <p>
                Times follow the shop\u2019s posted schedule in Pacific time. Always
                worth a quick call if you\u2019re coming late.
              </p>
            </div>
            <div className="card">
              <table className="hours-table">
                <tbody>
                  {STORE.hours.map((row) => (
                    <tr key={row.day} className={row.day === status.weekday ? "today" : undefined}>
                      <td>{row.day}</td>
                      <td>
                        {formatClock(row.open)} \u2013 {formatClock(row.close)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="stock">
          <div className="wrap">
            <p className="eyebrow">What you\u2019ll find</p>
            <h2 className="section-title">A compact shop with the useful stuff</h2>
            <div className="stock-grid">
              {STOCK.map((item) => (
                <article className="card stock-card" key={item.title}>
                  <div className="stock-photo">
                    <img src={item.image} alt="" loading="lazy" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews">
          <div className="wrap">
            <p className="eyebrow">{STORE.rating} on Google \u00b7 {STORE.reviewCount} reviews</p>
            <h2 className="section-title">What neighbours say</h2>
            <div className="review-grid">
              {REVIEWS.map((review) => (
                <figure className="card" key={review.name}>
                  <div className="stars" aria-hidden="true">\u2605\u2605\u2605\u2605\u2606</div>
                  <blockquote className="quote">\u201c{review.quote}\u201d</blockquote>
                  <figcaption className="cite">\u2014 {review.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="visit">
          <div className="wrap visit-grid">
            <div className="card">
              <p className="eyebrow">Find us</p>
              <h2 className="section-title">148 Superior Street</h2>
              <ul className="contact-list">
                <li>
                  {STORE.address}
                  <br />
                  {STORE.city}, {STORE.country}
                </li>
                <li>
                  Phone: <a href={STORE.phoneHref}>{STORE.phone}</a>
                </li>
                <li>
                  <a href={STORE.mapsUrl} target="_blank" rel="noreferrer">
                    Open in Google Maps
                  </a>
                </li>
                <li>James Bay, a short walk from the Inner Harbour.</li>
              </ul>
            </div>
            <div className="map-wrap">
              <iframe
                title="Map of Little Gem Grocery"
                src={STORE.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-row">
          <span>{STORE.name} \u00b7 James Bay, Victoria</span>
          <span>
            Independent neighbourhood grocery.{" "}
            <a href="/admin">Staff desk</a>
          </span>
        </div>
      </footer>
    </>
  );
}
