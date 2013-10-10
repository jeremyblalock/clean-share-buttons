(function($) {

    var structures = {
        facebook: {
            countUrl: 'http://graph.facebook.com/?id=',
            shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
            param: 'shares'
        },
        twitter: {
            countUrl: 'http://urls.api.twitter.com/1/urls/count.json?url=',
            shareUrl: function(url) {
                return 'https://twitter.com/intent/tweet?original_referer=' +
                    url + '&text=&tw_p=tweetbutton&url=' + url;
            },
            param: 'count'
        }
    };

    function getUrl(urlStructure, url) {
        if (typeof urlStructure === 'function') {
            return urlStructure(url);
        } else if (typeof urlStructure === 'string') {
            return urlStructure + url;
        } else {
            return false;
        }
    }

    /* Request URLs through a proxy to avoid CORS issues. */
    function proxyWrap(url) {
        return 'http://54.243.13.39/?url=' + encodeURIComponent(url);
    }

    function getDataUrl($el) {
        var url = $el.data('url');
        if (typeof url === 'undefined') {
            url = window.location.href;
        }
        return url;
    }

    function clickLinkWrapper(type) {
        if (!(type in structures)) {
            return false;
        }
        return function(e) {
            var width = 350,
                height = 250,
                left = ($(window.top).width() - width) / 2,
                top = $(window.top).height() / 2 - 100,
                params = $(this).data('params'),
                url = getDataUrl($(this)) + (params ? '&' + params : '');
            window.open(getUrl(structures[type].shareUrl,
                url), '_blank',
                    'width=' + width + ',height=' + height + ',left=' + left +
                    ',top=' + top);
            e.preventDefault();
        };
    }

    function addIndicator($el, type) {
        var structure = structures[type],
            $indicator = $('<span class="share-count-indicator"' +
                'style="display: none"></span>'),
            url = getDataUrl($el);
        $.ajax(proxyWrap(structure.countUrl + encodeURIComponent(url)))
            .done(function(result) {
                var count = result[structure.param];
                if (!count) {
                    count = 0;
                }
                $indicator.text(count);
                $indicator.appendTo($el).fadeIn();
                $el.css({
                    marginRight: ($indicator.width() +
                        parseInt($indicator.css('padding-left'), 10) +
                        parseInt($indicator.css('padding-right'), 10) +
                        parseInt($indicator.css('margin-left'), 10) + 15),
                    marginLeft: 15
                });
            });
    }

    $('a.share-button').livequery(function() {
        var $el = $(this),
            type = $el.data('type');
        $el.on('click', clickLinkWrapper(type));
        $el.css({
            cursor: 'pointer'
        });
        addIndicator($el, type);
    });

})(jQuery);
