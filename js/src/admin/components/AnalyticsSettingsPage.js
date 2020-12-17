import ExtensionPage from 'flarum/components/ExtensionPage';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';
import Stream from 'flarum/utils/Stream';
import AnalyticsPage from './AnalyticsPage';

const settingsPrefix = 'fof-analytics.';

export default class AnalyticsSettingsModal extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);
    }

    content() {
        const piwikTrackAccountsSetting = this.setting(settingsPrefix + 'piwikTrackAccounts');

        if (!piwikTrackAccountsSetting()) {
            piwikTrackAccountsSetting('none');
        }

        return [
            m('.container', [
                Stream(app.data.settings['fof-analytics.statusPiwik'])() &&
                Stream(app.data.settings['fof-analytics.piwikUrl'])() &&
                Stream(app.data.settings['fof-analytics.piwikSiteId'])() &&
                Stream(app.data.settings['fof-analytics.piwikAuthToken'])()
                    ? [AnalyticsPage.component()]
                    : null,
                m('.AnalyticsSettingsPage', [
                    m('h3', app.translator.trans('fof-analytics.admin.popup.section.googleAnalytics')),
                    m('.Form-group', [
                        m(
                            'label',
                            Switch.component(
                                {
                                    state: this.setting(settingsPrefix + 'statusGoogle')() > 0,
                                    onchange: this.setting(settingsPrefix + 'statusGoogle'),
                                },
                                app.translator.trans('fof-analytics.admin.popup.field.statusGoogle')
                            )
                        ),
                    ]),
                    this.setting(settingsPrefix + 'statusGoogle')() > 0
                        ? [
                              m('.Form-group', [
                                  m('label', app.translator.trans('fof-analytics.admin.popup.field.googleTrackingCode')),
                                  m('input.FormControl', {
                                      bidi: this.setting(settingsPrefix + 'googleTrackingCode'),
                                      placeholder: 'UA-XXXXXXXX-X',
                                  }),
                              ]),
                              m('.Form-group', [
                                  m('label', app.translator.trans('fof-analytics.admin.popup.field.googleGTMCode')),
                                  m('input.FormControl', {
                                      bidi: this.setting(settingsPrefix + 'googleGTMCode'),
                                      placeholder: 'GTM-XXXXXXX',
                                  }),
                              ]),
                              m('.Form-group', [
                                  m('label', app.translator.trans('fof-analytics.admin.popup.field.optTrackingCode')),
                                  m('input.FormControl', {
                                      bidi: this.setting(settingsPrefix + 'optTrackingCode'),
                                      placeholder: 'GTM-XXXXXX',
                                  }),
                              ]),
                          ]
                        : null,
                    m('h3', app.translator.trans('fof-analytics.admin.popup.section.piwik')),
                    m('.Form-group', [
                        m(
                            'label',
                            Switch.component(
                                {
                                    state: this.setting(settingsPrefix + 'statusPiwik')() > 0,
                                    onchange: this.setting(settingsPrefix + 'statusPiwik'),
                                },
                                app.translator.trans('fof-analytics.admin.popup.field.statusPiwik')
                            )
                        ),
                    ]),
                    this.setting(settingsPrefix + 'statusPiwik')() > 0
                        ? [
                              m('.Form-group', [
                                  m('label', app.translator.trans('fof-analytics.admin.popup.field.piwikUrl')),
                                  m('input.FormControl', {
                                      bidi: this.setting(settingsPrefix + 'piwikUrl'),
                                      placeholder: 'piwik.example.com',
                                  }),
                              ]),
                              m('.Form-group', [
                                  m('label', app.translator.trans('fof-analytics.admin.popup.field.piwikSiteId')),
                                  m('input.FormControl', {
                                      bidi: this.setting(settingsPrefix + 'piwikSiteId'),
                                  }),
                              ]),
                              m('.Form-group', [
                                  m(
                                      'label',
                                      Switch.component(
                                          {
                                              state: this.setting(settingsPrefix + 'piwikTrackSubdomain')() > 0,
                                              onchange: this.setting(settingsPrefix + 'piwikTrackSubdomain'),
                                          },
                                          app.translator.trans('fof-analytics.admin.popup.field.piwikTrackSubdomain')
                                      )
                                  ),
                              ]),
                              m('.Form-group', [
                                  m(
                                      'label',
                                      Switch.component(
                                          {
                                              state: this.setting(settingsPrefix + 'piwikPrependDomain')() > 0,
                                              onchange: this.setting(settingsPrefix + 'piwikPrependDomain'),
                                          },
                                          app.translator.trans('fof-analytics.admin.popup.field.piwikPrependDomain')
                                      )
                                  ),
                              ]),
                              m('.Form-group', [
                                  m(
                                      'label',
                                      Switch.component(
                                          {
                                              state: this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0,
                                              onchange: this.setting(settingsPrefix + 'piwikHideAliasUrl'),
                                          },
                                          app.translator.trans('fof-analytics.admin.popup.field.piwikHideAliasUrl')
                                      )
                                  ),
                              ]),
                              this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0
                                  ? [
                                        m('.Form-group', [
                                            m('label', app.translator.trans('fof-analytics.admin.popup.field.piwikAliasUrl')),
                                            m('input.FormControl', {
                                                bidi: this.setting(settingsPrefix + 'piwikAliasUrl'),
                                            }),
                                        ]),
                                    ]
                                  : null,
                              m('.Form-group', [
                                  m('label', app.translator.trans('fof-analytics.admin.popup.field.piwikTrackAccounts')),
                                  Select.component({
                                      options: {
                                          none: app.translator.trans('fof-analytics.admin.popup.trackAccounts.none'),
                                          username: app.translator.trans('fof-analytics.admin.popup.trackAccounts.username'),
                                          email: app.translator.trans('fof-analytics.admin.popup.trackAccounts.email'),
                                      },
                                      value: piwikTrackAccountsSetting(),
                                      onchange: piwikTrackAccountsSetting,
                                  }),
                              ]),
                              m('.Form-group', [
                                  m('label', app.translator.trans('fof-analytics.admin.popup.field.piwikAuthToken')),
                                  m('input.FormControl', {
                                      bidi: this.setting(settingsPrefix + 'piwikAuthToken'),
                                      placeholder: '00112233445566778899aabbccddeeff',
                                  }),
                                  m('.helpText', app.translator.trans('fof-analytics.admin.popup.placeholder.piwikAuthToken')),
                              ]),
                          ]
                        : null,
                    this.submitButton(),
                ]),
            ]),
        ];
    }
}
