!function($) {

    var structures = {
        facebook: {
            countUrl: 'http://graph.facebook.com/?id=',
            shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
            param: 'shares'
        },
        twitter: {
            countUrl: 'http://urls.api.twitter.com/1/urls/count.json?url=',
            shareUrl: function(url) {
                return 'https://twitter.com/intent/tweet?original_referer='
                    + url + '&text=&tw_p=tweetbutton&url=' + url;
            },
            param: 'count'
        }
    }

    function getUrl(urlStructure, url) {
        if (typeof urlStructure === 'function') {
            return urlStructure(url);
        } else if (typeof urlStructure === 'string') {
            return urlStructure + url;
        } else {
            return false;
        }
    }

    function clickLinkWrapper(type) {
        if (!type in structures) {
            return false;
        }
        return function(e) {
            e.preventDefault();
            console.log('Clicked', type, 'link');
        };
    }

    function addIndicator($el, type) {
        var structure = structures[type],
            $indicator = $('<span class="share-count-indicator"></span>'),
            url = $el.data('url');
        $el.append($indicator);
        $.ajax(structure.countUrl + encodeURIComponent(url)).done(function(result) {
            $indicator.text(result[structure.param]);
            $indicator.appendTo($el);
        });
    }

    $('a.share-button').livequery(function() {
        console.log('Just added', $(this).size(),
            'elements, the first of which is', $(this).get(0));
        var $el = $(this),
            type = $el.data('type');
        $el.on('click', clickLinkWrapper(type));
        $el.attr('href', '#');
        addIndicator($el, type);
    });

}(jQuery);
