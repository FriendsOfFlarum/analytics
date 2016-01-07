import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Page from 'flarum/components/Page';

app.initializers.add('hyn-analytics', app => {
    extend(Page.prototype, 'init', function(vdom)
    {
        if(typeof ga != 'undefined') {
            ga('send', 'pageview', {page: m.route()});
        }
    });
});
