import {extend} from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import Stream from 'flarum/utils/Stream';

import AnalyticsPage from './components/AnalyticsPage';

export default function () {
    // add the Analytics tab to the admin navigation menu if piwik is enabled
    if (Stream(app.data.settings['fof-analytics.statusPiwik'])() &&
        Stream(app.data.settings['fof-analytics.piwikUrl'])() &&
        Stream(app.data.settings['fof-analytics.piwikSiteId'])() &&
        Stream(app.data.settings['fof-analytics.piwikAuthToken'])()) {

        app.routes['analytics'] = {
            path: '/analytics',
            component: AnalyticsPage,
        };

        extend(AdminNav.prototype, 'items', items => {
            items.add('analytics', AdminLinkButton.component({
                href: app.route('analytics'),
                icon: 'fas fa-chart-line',
                description: app.translator.trans('fof-analytics.admin.page.nav.description'),
            }, app.translator.trans('fof-analytics.admin.page.nav.title')));
        });
    }
}
