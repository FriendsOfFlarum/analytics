System.register('hyn/analytics/main', ['flarum/extend', 'flarum/app', 'flarum/components/Page'], function (_export) {
    'use strict';

    var extend, app, Page;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage['default'];
        }],
        execute: function () {

            app.initializers.add('hyn-analytics', function (app) {
                extend(Page.prototype, 'init', function (vdom) {
                    ga('send', 'pageview', { page: m.route() });
                });
            });
        }
    };
});