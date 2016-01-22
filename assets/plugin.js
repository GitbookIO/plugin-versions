require(['gitbook', 'jQuery', 'lodash'], function (gitbook, $, _) {
    var versions = [],
        current  = undefined,
        pluginConfig = {};

    // Update the select with a list of versions
    function updateVersions(_versions) {
        versions = _versions || versions;
        current  = $('.versions-select select').val();

        // Cleanup existing selector
        $('.versions-select').remove();

        if (versions.length == 0) return;

        var $li = $('<li>', {
            'class': 'versions-select',
            'html': '<div><select></select></div>'
        });
        var $select = $li.find('select');

        _.each(versions, function(version) {
            var $option = $('<option>', {
                'selected': (current === undefined ? version.selected : (current === version.value)),
                'value': version.value,
                'text': version.text
            });

            $option.appendTo($select);
        });

        $select.change(function() {
            var version = _.find(versions, {
                value: $select.val()
            });
            var filePath = location.href.replace(gitbook.state.bookRoot, '');
            window.location.href = version.includeFilepath? (version.value + filePath) : version.value;
        })

        $li.prependTo('.book-summary ul.summary');
    }

    // Fetch version from book.json (legacy plugin)
    function fetchBookOptionsVersions(gitbookConfigURL) {
        $.getJSON(gitbookConfigURL, function (bookConfig) {
            options = bookConfig.pluginsConfig.versions.options;
            updateVersions(options);
        });
    }

    // Fetch gitbook.com versions
    function fetchBookVersions(type) {
        $.getJSON(gitbook.state.bookRoot+'/gitbook/api/versions/'+type, function (versions) {
            updateVersions(_.map(versions, function(v) {
                return {
                    text: v.name,
                    value: v.urls.website,
                    selected: v.current,
                    includeFilepath: pluginConfig.includeFilepath !== false && type !== 'languages'
                };
            }));
        });
    }

    gitbook.events.bind('start', function (e, config) {
        pluginConfig = config.versions || {};
        if (pluginConfig.options) updateVersions(pluginConfig.options);

        // Make sure we have a current book.json
        if (pluginConfig.gitbookConfigURL)  fetchBookOptionsVersions(pluginConfig.gitbookConfigURL);
        else fetchBookVersions(pluginConfig.type || 'branches');
    });

    gitbook.events.bind('page.change', function () {
        updateVersions();
    });
});
