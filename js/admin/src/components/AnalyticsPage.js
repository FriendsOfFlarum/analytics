import Component from 'flarum/Component';

export default class AnalyticsPage extends Component {

    view() {
        //set the values into the string
        this.url = m.prop(app.settings['flagrow.analytics.piwikUrl'])()
        this.url += '?idSite=' + m.prop(app.settings['flagrow.analytics.piwikSiteId'])()
        this.url += '&token_auth=' + m.prop(app.settings['flagrow.analytics.piwikAuthToken'])()
        this.url += '&module=Widgetize&action=iframe&moduleToWidgetize=Dashboard&actionToWidgetize=index&period=month&date=today'
        return [
            m('div', {className: 'analyticsPage'}, [
                m('div', {className: 'piwik'}, [
                    m('label', ['Piwik']),
                    m('iframe', {
                        frameborder: '0',
                        src: this.url
                    })
                ])
            ])
        ]
    }
}
