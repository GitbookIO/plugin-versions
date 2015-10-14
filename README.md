## gitbook-plugin-versions

Display a `<select>` with other versions of your gitbook.

### Usage

Put this in your book.json:

```js
{
  "plugins": [ "versions" ],
  "pluginsConfig": {
    "versions": {
      "gitbookConfigURL": "https://raw.githubusercontent.com/rackt/history/gh-pages/book.json",
      "options": [
        { "value": "https://rackt.github.io/history/v1.3.0/", "text": "Version 1.3.0" },
        { "value": "https://rackt.github.io/history/v1.4.0/", "text": "Version 1.4.0", "selected": true }
      ] 
    }
  }
}
```

A `<select>` element will be created with the given `options` and placed at the top of the book summary. When the user selects one of the options, they are taken to that URL.

The `gitbookConfigURL` variable is a publicly accessible URL to your `book.json`. If this is present, the plugin will fetch the latest config when the page loads, so even older versions of your book will have updated `options`.

### Credits

Original work by [@mjackson](https://github.com/mjackson).
