## gitbook-plugin-versions

Display a `<select>` with other versions of your gitbook.

### Usage

Put this in your book.json:

```js
{
  "plugins": [ "versions" ],
  "pluginsConfig": {
    "github": {
      "options": [
        { "value": "https://rackt.github.io/history/v1.3.0/", "text": "Version 1.3.0" },
        { "value": "https://rackt.github.io/history/v1.4.0/", "text": "Version 1.4.0", "selected": true }
      ] 
    }
  }
}
```

When the user selects one of the options, they are taken to that URL.

And you're done!
