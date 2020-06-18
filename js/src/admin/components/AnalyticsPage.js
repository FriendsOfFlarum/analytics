import Component from 'flarum/Component';

export default class AnalyticsPage extends Component {

    view() {
        let piwikUrl = app.data.settings['fof-analytics.piwikUrl'];

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
        this.url += '?idSite=' + app.data.settings['fof-analytics.piwikSiteId'];
        this.url += '&token_auth=' + app.data.settings['fof-analytics.piwikAuthToken'];
        this.url += '&module=Widgetize&action=iframe&moduleToWidgetize=Dashboard&actionToWidgetize=index&period=month&date=today';

        return [
            <div className="AnalyticsPage">
                <div className="piwik">
                    <label>Piwik</label>
                    <iframe src={this.url} frameborder="0"></iframe>
                </div>
            </div>
        ];
    }
}
