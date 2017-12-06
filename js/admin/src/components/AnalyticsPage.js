import Component from 'flarum/Component';

export default class AnalyticsPage extends Component {

    view() {
        let piwikUrl = app.data.settings['flagrow.analytics.piwikUrl'];

        // Use protocol-relative url if the url contains no protocol
        if (piwikUrl.indexOf('http://') === -1 && piwikUrl.indexOf('https://') === -1 && piwikUrl.indexOf('//') === -1) {
            piwikUrl = '//' + piwikUrl;
        }

        // Add trailing slash if necessary
        if (piwikUrl[piwikUrl.length - 1] !== '/') {
            piwikUrl += '/';
        }

        //Call the piwik application
        this.url = piwikUrl + 'index.php';
        this.url += '?idSite=' + app.data.settings['flagrow.analytics.piwikSiteId'];
        this.url += '&token_auth=' + app.data.settings['flagrow.analytics.piwikAuthToken'];
        this.url += '&module=Widgetize&action=iframe&moduleToWidgetize=Dashboard&actionToWidgetize=index&period=month&date=today';

        return [
            m('div', {className: 'analyticsPage'}, [
                m('div', {className: 'piwik'}, [
                    m('label', ['Piwik']),
                    m('iframe', {
                        frameborder: '0',
                        src: this.url,
                    }),
                ]),
            ]),
        ];
    }
}
