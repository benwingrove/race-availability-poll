# Cold Rum Race Availability Poll

This is a static poll page that can be hosted with GitHub Pages.

## Files

- `index.html` is the page to publish.
- `google-apps-script.js` is the optional shared-results backend.

## Preview Locally

Open `index.html` in a browser. Without a backend URL, entries are saved only in that browser so you can preview the flow.

## Make Results Shared

1. Create a new Google Sheet.
2. In the Sheet, go to `Extensions` > `Apps Script`.
3. Paste the contents of `google-apps-script.js`.
4. Click `Deploy` > `New deployment`.
5. Choose `Web app`.
6. Set `Execute as` to `Me`.
7. Set `Who has access` to `Anyone`.
8. Deploy and copy the Web app URL.
9. In `index.html`, paste that URL into:

```js
endpoint: "",
```

For example:

```js
endpoint: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
```

## Publish On GitHub Pages

1. Create a GitHub repo.
2. Upload `index.html` to the repo root.
3. In the repo settings, open `Pages`.
4. Set the source to the default branch and root folder.
5. Share the GitHub Pages URL with your friends.

## Edit Races

Change the race list in `index.html`:

```js
races: [
  { id: "cold-rum-1", title: "8/12 - Cold Rum #1" },
  { id: "cold-rum-2", title: "8/19 - Cold Rum #2" },
  { id: "cold-rum-3", title: "8/26 - Cold Rum #3" }
]
```
