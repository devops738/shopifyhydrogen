import {useEffect, useRef} from 'react';

declare global { interface Window { TCWidget?: {init: (options: Record<string, unknown>) => void} } }
const tireConnectKey = import.meta.env.VITE_TIRECONNECT_API_KEY;

export function meta() { return [{title: 'Tire Search | American Tire Stores'}, {name: 'description', content: 'Find tires that fit your vehicle at American Tire Stores.'}]; }

function TireConnectMount() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => { if (tireConnectKey && mount.current) window.TCWidget?.init({apikey: tireConnectKey, container: 'tireconnect-search', product_type: 'tire', layout: 'full'}); }, []);
  return <section className="search-panel" aria-labelledby="search-panel-title"><p className="eyebrow">Start here</p><h2 id="search-panel-title">Shop tires by your fit</h2><div id="tireconnect-search" ref={mount} className="tireconnect-mount">{!tireConnectKey && <p>Connect the approved TireConnect API key to activate vehicle and tire-size search.</p>}</div></section>;
}

export default function TireSearch() {
  return <><header className="site-header"><a className="brand" href="/" aria-label="American Tire Stores home">American<br />Tire Stores</a><nav aria-label="Primary navigation"><a className="active" href="/search/tires">Tire Search</a><a href="/search/wheels">Wheel Search</a><a href="/packages">Packages</a><a href="/services">Services</a><a href="/locations">Locations</a></nav><a className="appointment" href="/services">Book a quick appointment</a></header><main><section className="hero"><div className="hero-image" aria-hidden="true" /><div className="hero-content"><p className="eyebrow">Tires · 36 brands · 9 locations</p><h1>Tires that fit your vehicle at the right price</h1><p className="lead">Search all-season, performance, truck, SUV, and off-road tires matched to your vehicle and available at your nearest American Tire Stores location.</p><ul className="benefits"><li>Fitment matched</li><li>Same-day installation</li><li>Live local pricing</li></ul></div><TireConnectMount /></section><section className="content-section"><p className="eyebrow">How it works</p><h2>Find tires with confidence</h2><div className="steps"><article><strong>1</strong><h3>Choose your vehicle</h3><p>Enter the year, make, model, and preferred store.</p></article><article><strong>2</strong><h3>Compare tire options</h3><p>Review brands, fitment, availability, and local pricing.</p></article><article><strong>3</strong><h3>Book installation</h3><p>Choose an appointment at your local store.</p></article></div></section></main><footer>© {new Date().getFullYear()} American Tire Stores. All rights reserved.</footer></>;
}
