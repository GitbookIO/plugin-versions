require([ 'gitbook' ], function (gitbook) {
  var options;

  function createOptionHTML(option) {
    return '<option value="' + option.value + '"' + (option.selected ? ' selected' : '') + '>' + option.text + '</option>';
  }

  function insertVersionsSelect() {
    if (options && jQuery('.versions-select').length === 0) {
      jQuery(
        '<li class="versions-select">' +
          '<div>' +
            '<select>' +
              options.map(createOptionHTML).join('') +
            '</select>' +
          '</div>' +
        '</li>'
      ) .prependTo('.book-summary > ul.summary')
        .change(function (event) {
          var value = jQuery('option:selected', this).val();

          if (value)
            window.location.href = value;
        });
    }
  }

  gitbook.events.bind('start', function (e, config) {
    options = config.versions.options;
    insertVersionsSelect();
  });

  gitbook.events.bind('page.change', function () {
    insertVersionsSelect();
  });
});
