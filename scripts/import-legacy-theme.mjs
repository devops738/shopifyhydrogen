import {cp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const theme = path.resolve(root, '..', 'shopify-github');
const sections = path.join(theme, 'sections');
const snippets = path.join(theme, 'snippets');
const destinationAssets = path.join(root, 'public', 'theme-assets');

const pages = {
  home: 'main-index.liquid', 'tire-search': 'main-page-tire-search.liquid', 'wheel-search': 'main-page-wheel-search.liquid', 'wheel-brands': 'main-page-wheel-search.liquid', catalog: 'main-page-packages.liquid', packages: 'main-page-packages.liquid', 'package-brands': 'main-page-packages.liquid', services: 'main-page-services.liquid', 'service-oil-change': 'main-page-service-oil-change.liquid', 'oil-change': 'main-page-service-oil-change.liquid', 'service-brake-service': 'main-page-service-brake-service.liquid', 'brake-service': 'main-page-service-brake-service.liquid', 'service-battery-service': 'main-page-service-battery-service.liquid', 'battery-service': 'main-page-service-battery-service.liquid', 'service-tire-installation': 'main-page-service-tire-installation.liquid', 'tire-installation': 'main-page-service-tire-installation.liquid', 'service-tpms': 'main-page-service-tpms.liquid', 'tpms-service': 'main-page-service-tpms.liquid', 'service-wheel-alignment': 'main-page-service-wheel-alignment.liquid', 'wheel-alignment': 'main-page-service-wheel-alignment.liquid', locations: 'main-page-locations.liquid', 'location-ventura-ca': 'main-page-location-ventura-ca.liquid', 'location-thousand-oaks-ca': 'main-page-location-thousand-oaks-ca.liquid', 'location-hollywood-ca': 'main-page-location-los-angeles-ca.liquid', 'location-los-angeles-ca': 'main-page-location-los-angeles-ca.liquid', 'location-glendale-ca': 'main-page-location-glendale-ca.liquid', 'location-glendale-ii-ca': 'main-page-location-glendale-ii-ca.liquid', 'location-bellflower-ca': 'main-page-location-bellflower-ca.liquid', 'location-cathedral-city-ca': 'main-page-location-cathedral-city-ca.liquid', 'location-valencia-ca': 'main-page-location-glendale-ca.liquid', 'location-costa-mesa-ca': 'main-page-location-glendale-ca.liquid', promotions: 'main-page-promotions.liquid', coupons: 'main-page-coupons.liquid', financing: 'main-page-financing.liquid', contact: 'main-page-contact.liquid',
};

pages['promotion-detail'] = 'promo-detail.liquid';
pages['coupon-detail'] = 'main-page-coupon-detail.liquid';

const read = (directory, file) => readFile(path.join(directory, file), 'utf8');
const header = await read(snippets, 'ats-offer-header.liquid');
const footer = await read(snippets, 'ats-site-footer.liquid');

function clean(source) {
  return source
    .replace(/\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}/gi, '')
    .replace(/\{%\s*schema\s*%\}[\s\S]*?\{%\s*endschema\s*%\}/gi, '')
    .replace(/\{%\s*render\s+['"]ats-offer-header['"]\s*%\}/gi, header)
    .replace(/\{%\s*render\s+['"]ats-site-footer['"]\s*%\}/gi, footer)
    .replace(/\{\{\s*'([^']+)'\s*\|\s*asset_url[^}]*\}\}/gi, '/theme-assets/$1')
    .replace(/\{\{[\s\S]*?\}\}/g, '')
    .replace(/\{%[\s\S]*?%\}/g, '');
}

await rm(destinationAssets, {recursive: true, force: true});
await mkdir(path.dirname(destinationAssets), {recursive: true});
await cp(path.join(theme, 'assets'), destinationAssets, {recursive: true});
const output = {};
for (const [handle, file] of Object.entries(pages)) output[handle] = clean(await read(sections, file));
await writeFile(path.join(root, 'app', 'legacy-pages.ts'), `// Generated from the existing Online Store theme. Do not hand-edit.\nexport const legacyPages: Record<string, string> = ${JSON.stringify(output)};\n`);
console.log(`Imported ${Object.keys(output).length} routes and copied theme assets.`);
