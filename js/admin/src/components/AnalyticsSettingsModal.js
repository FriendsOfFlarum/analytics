import SettingsModal from 'flarum/components/SettingsModal';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';

const settingsPrefix = 'flagrow.analytics.';

export default class AnalyticsSettingsModal extends SettingsModal {

    className() {
        return 'AnalyticsSettingsModal Modal--small';
    }

    title() {
        return app.translator.trans('flagrow-analytics.admin.popup.title');
    }

    form() {
        const piwikTrackAccountsSetting = this.setting(settingsPrefix + 'piwikTrackAccounts');

        if (!piwikTrackAccountsSetting()) {
            piwikTrackAccountsSetting('none');
        }

        return [
            m('h3', app.translator.trans('flagrow-analytics.admin.popup.section.googleAnalytics')),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'statusGoogle')() > 0,
                    onchange: this.setting(settingsPrefix + 'statusGoogle'),
                    children: app.translator.trans('flagrow-analytics.admin.popup.field.statusGoogle'),
                })),
            ]),
            (this.setting(settingsPrefix + 'statusGoogle')() > 0 ? [
                m('.Form-group', [
                    m('label', app.translator.trans('flagrow-analytics.admin.popup.field.googleTrackingCode')),
                    m('input.FormControl', {
                        bidi: this.setting(settingsPrefix + 'googleTrackingCode'),
                        placeholder: 'UA-XXXXXXXX-X',
                    }),
                ]),
            ] : null),
            m('h3', app.translator.trans('flagrow-analytics.admin.popup.section.piwik')),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'statusPiwik')() > 0,
                    onchange: this.setting(settingsPrefix + 'statusPiwik'),
                    children: app.translator.trans('flagrow-analytics.admin.popup.field.statusPiwik'),
                })),
            ]),
            (this.setting(settingsPrefix + 'statusPiwik')() > 0 ? [
                m('.Form-group', [
                    m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikUrl')),
                    m('input.FormControl', {
                        bidi: this.setting(settingsPrefix + 'piwikUrl'),
                        placeholder: 'piwik.example.com',
                    }),
                ]),
                m('.Form-group', [
                    m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikSiteId')),
                    m('input.FormControl', {
                        bidi: this.setting(settingsPrefix + 'piwikSiteId'),
                    }),
                ]),
                m('.Form-group', [
                    m('label', Switch.component({
                        state: this.setting(settingsPrefix + 'piwikTrackSubdomain')() > 0,
                        onchange: this.setting(settingsPrefix + 'piwikTrackSubdomain'),
                        children: app.translator.trans('flagrow-analytics.admin.popup.field.piwikTrackSubdomain'),
                    })),
                ]),
                m('.Form-group', [
                    m('label', Switch.component({
                        state: this.setting(settingsPrefix + 'piwikPrependDomain')() > 0,
                        onchange: this.setting(settingsPrefix + 'piwikPrependDomain'),
                        children: app.translator.trans('flagrow-analytics.admin.popup.field.piwikPrependDomain'),
                    })),
                ]),
                m('.Form-group', [
                    m('label', Switch.component({
                        state: this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0,
                        onchange: this.setting(settingsPrefix + 'piwikHideAliasUrl'),
                        children: app.translator.trans('flagrow-analytics.admin.popup.field.piwikHideAliasUrl'),
                    })),
                ]),
                (this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0 ? [
                    m('.Form-group', [
                        m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikAliasUrl')),
                        m('input.FormControl', {
                            bidi: this.setting(settingsPrefix + 'piwikAliasUrl'),
                        }),
                    ]),
                ] : null),
                m('.Form-group', [
                    m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikTrackAccounts')),
                    Select.component({
                        options: {
                            none: app.translator.trans('flagrow-analytics.admin.popup.trackAccounts.none'),
                            username: app.translator.trans('flagrow-analytics.admin.popup.trackAccounts.username'),
                            email: app.translator.trans('flagrow-analytics.admin.popup.trackAccounts.email'),
                        },
                        value: piwikTrackAccountsSetting(),
                        onchange: piwikTrackAccountsSetting,
                    }),
                ]),
                m('.Form-group', [
                    m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikAuthToken')),
                    m('input.FormControl', {
                        bidi: this.setting(settingsPrefix + 'piwikAuthToken'),
                        placeholder: '00112233445566778899aabbccddeeff',
                    }),
                    m('.helpText', app.translator.trans('flagrow-analytics.admin.popup.placeholder.piwikAuthToken')),
                ]),
            ] : null),
        ];
    }
}
