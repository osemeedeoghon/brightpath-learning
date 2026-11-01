# BrightPath Learning — local prototype

An original, responsive learning-practice prototype for Grades 1–6. Includes mathematics, English, science, geography/social studies and logic practice; immediate feedback; hints; points; and browser-local progress.

## Requirements
- A modern browser (Safari, Chrome, Firefox, or Edge)
- Optional: VS Code
- No Node.js, npm, API key, database account, or internet connection is required to run the app locally.

## Run it
1. Open this folder in VS Code.
2. Open `index.html` in a browser. You can double-click it in Finder.
3. Choose a grade, subject and skill, then start practising.
4. Select **My progress** to see points and accuracy.

Recommended for development: use the VS Code extension **Live Server** if already installed, or start a simple local server from the project folder with Python:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Stop the server with `Ctrl+C`.

## Test on an iPhone
To view the local version on your iPhone, your MacBook and iPhone must be on the same Wi-Fi network. Start the Python server, find your Mac's local IP address in System Settings > Wi-Fi > Details, then open `http://YOUR-MAC-IP:8000` on your iPhone. This local test is not public hosting.

## Files
- `index.html` — page structure and navigation
- `styles.css` — responsive design
- `app.js` — original practice questions, quiz flow, points and local progress

## Current limitations
- Progress is saved only in the current browser on the current device.
- There are a small set of sample questions per skill. The grade selector changes the grade label and saved progress category; it does not yet provide a fully differentiated curriculum for each grade.
- No accounts, cloud sync, teacher console, backend, or AI-generated question service yet.
- Font loading uses Google Fonts if internet is available; the app remains usable without it by falling back to system fonts.

## Suggested next stages
1. Verify the core practice flow and persistence.
2. Create age-appropriate, grade-specific original question banks and curriculum mapping.
3. Add a local test suite and accessibility checks.
4. Add optional accounts and cloud sync only when needed, selecting a free tier carefully.
5. Add PWA install support and public hosting when ready.

## Branding note
“BrightPath Learning” is a provisional working name. Check trademarks and domain availability before public commercial use.
