import { extend } from 'flarum/extend';
import Page from 'flarum/components/Page';

app.initializers.add('flagrow-analytics', () => {
    extend(Page.prototype, 'init', function (vdom) {
        if (app.data.googleTrackingCode && typeof gtag !== 'undefined') {
            gtag('config', app.data.googleTrackingCode, {
                'page_path': m.route()
            });
        }
        if (typeof _paq !== 'undefined') {
            _paq.push(['setCustomUrl', m.route()]);
            _paq.push(['trackPageView']);
        }
    });
});
