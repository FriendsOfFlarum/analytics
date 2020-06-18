import {extend} from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';

import AnalyticsPage from './components/AnalyticsPage';

export default function () {
    // add the Analytics tab to the admin navigation menu if piwik is enabled
    if (m.prop(app.data.settings['fof-analytics.statusPiwik'])() &&
        m.prop(app.data.settings['fof-analytics.piwikUrl'])() &&
        m.prop(app.data.settings['fof-analytics.piwikSiteId'])() &&
        m.prop(app.data.settings['fof-analytics.piwikAuthToken'])()) {

        app.routes['analytics'] = {
            path: '/analytics',
            component: AnalyticsPage.component(),
        };

        extend(AdminNav.prototype, 'items', items => {
            items.add('analytics', AdminLinkButton.component({
                href: app.route('analytics'),
                icon: 'fas fa-chart-line',
                children: app.translator.trans('fof-analytics.admin.page.nav.title'),
                description: app.translator.trans('fof-analytics.admin.page.nav.description'),
            }));
        });
    }
}
