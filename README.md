# FOR ATENE.

A responsive birthday website built with plain HTML, CSS and JavaScript.

## Files

* `index.html` is the page structure.
* `styles.css` contains the design and responsive styling.
* `script.js` controls the chapters, menus, letter and background music.
* `content.json` contains the supplied birthday letter, separated into chapters.
* `assets/music.wav` is the original looping instrumental for the card.

## No photographs

This version intentionally contains no photographs or photo gallery.

## Music

The card includes an original, gentle instrumental loop at `assets/music.wav`. It attempts to start after the password is entered, when the visitor has interacted with the page. Some browsers or device settings may still block playback; use the music control in the header to start or stop it manually.

## Password screen

The card opens only after the password is entered: `AteneDaGoat129!.*`. This is a playful front end password gate with no database or server. It is not strong security because the password is included in the website's JavaScript and someone with technical knowledge could inspect the site files.

## Publish with Cloudflare Pages

1. Sign in to Cloudflare.
2. Open Workers & Pages.
3. Choose Create application, then Pages, then Upload assets.
4. Upload the contents of this project folder, not the ZIP file itself.
5. Give the project a name such as `for-atene`.
6. Deploy it.

Cloudflare will provide a temporary address ending in `pages.dev`.

## Connect a subdomain

1. Open the Pages project in Cloudflare.
2. Open Custom domains.
3. Choose Set up a custom domain.
4. Enter the subdomain you want, for example `atene.yourdomain.com`.
5. Follow Cloudflare's DNS prompts.

You need to control the parent domain and have it active in the relevant Cloudflare account. Do not print the QR code until the final custom domain works on a phone.

## QR code

Once the final address is live, create a QR code pointing to the complete HTTPS address. Test it from a second phone before printing it.

## Privacy

This is a public static website unless you add an access control layer. A hard to guess address is not a password. Avoid publishing private contact details, school details or private conversations.

## Editing the letter

Edit `content.json`. Each section has a title, paragraphs and an optional list. Keep the JSON punctuation valid when editing.
