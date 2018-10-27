import { extend } from 'flarum/extend';
import Page from 'flarum/components/Page';

app.initializers.add('flagrow-analytics', () => {
    extend(Page.prototype, 'init', function (vdom) {
        if (typeof ga !== 'undefined') {
            ga('send', 'pageview', {page: m.route()});
        }
        if (typeof _paq !== 'undefined') {
            _paq.push(['setCustomUrl', m.route()]);
            _paq.push(['trackPageView']);
        }
    });
});
