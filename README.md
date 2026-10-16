# mckinleighlair.com

Portfolio website for McKinleigh Lair. It's plain HTML, CSS and JavaScript, served by GitHub Pages from the `main` branch. There's no framework and no build step.

## Layout

- Each page lives at `/<page-name>/index.html`, so URLs look like `mckinleighlair.com/vice/`.
- `index.html` is the home/bio page and `404.html` is the not-found page.
- `bio/` and `info/` redirect to the home page, for old links.
- `assets/site.css` is the one shared stylesheet. Mobile styles apply at 800px wide and below.
- `assets/site.js` runs the mobile menu, the "info" menu and the photo viewer on `/environmentalphotography/`.
- `images/` holds every image as WebP in up to three widths (750, 1500 and 2400px).
- `CNAME` holds the custom domain. Don't delete it.

## Editing

1. Edit the HTML directly.
2. To add an image, put WebP versions in `images/` and copy an existing `<img>` tag, including its `srcset`, `width` and `height`.
3. Preview locally before pushing:

   ```sh
   python3 -m http.server 8765
   ```

   Then open http://localhost:8765.
4. Push to `main` and the live site updates within a minute or two.

## Known issues

- The Vimeo videos on `/reel/` (video 546636735) and `/staedtepartnerschaft-sister-cities/` (video 744653618) have been deleted from Vimeo, so they show "This video isn't available". To fix this, swap the `<iframe>` `src` on each page for a new embed URL, or remove the video block.
