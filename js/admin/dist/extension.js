System.register('flagrow/analytics/components/AnalyticsSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
    'use strict';

    var SettingsModal, AnalyticsSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }],
        execute: function () {
            AnalyticsSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(AnalyticsSettingsModal, _SettingsModal);

                function AnalyticsSettingsModal() {
                    babelHelpers.classCallCheck(this, AnalyticsSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(AnalyticsSettingsModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(AnalyticsSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'AnalyticsSettingsModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-analytics.admin.analytics_settings.title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                'Google Analytics',
                                m('input', { type: 'checkbox', id: 'status_google', name: 'status_google', bidi: this.setting('flagrow.analytics.status.google') })
                            ),
                            m(
                                'div',
                                { id: 'hidden_google' },
                                m('input', {
                                    placeholder: app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.google.tracking_code'),
                                    className: 'FormControl',
                                    bidi: this.setting('flagrow.analytics.google')
                                })
                            ),
                            m('br', null),
                            m(
                                'label',
                                null,
                                ' Piwik',
                                m('input', { type: 'checkbox', id: 'status_piwik', bidi: this.setting('flagrow.analytics.status.piwik') })
                            ),
                            m(
                                'div',
                                { id: 'hidden_piwik' },
                                m('input', {
                                    placeholder: app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.url'),
                                    className: 'FormControl',
                                    bidi: this.setting('flagrow.analytics.piwik.url')
                                }),
                                m('br', null),
                                m('input', { type: 'checkbox', id: 'piwik1', bidi: this.setting('flagrow.analytics.piwik.1') }),
                                ' ',
                                app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.setting_1'),
                                m('br', null),
                                m('input', { type: 'checkbox', id: 'piwik2', bidi: this.setting('flagrow.analytics.piwik.2') }),
                                ' ',
                                app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.setting_2'),
                                m('br', null),
                                m('input', { type: 'checkbox', id: 'piwik3', bidi: this.setting('flagrow.analytics.piwik.3') }),
                                ' ',
                                app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.setting_3'),
                                m(
                                    'div',
                                    { id: 'piwik_3_hidden', style: 'margin-left:10px; ' },
                                    m('input', { 'class': 'FormControl', bidi: this.setting('flagrow.analytics.piwik.3.url'), placeholder: app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.3_url') })
                                ),
                                m('br', null),
                                m('input', { 'class': 'FormControl', style: 'width:20%; float:left; margin-right:5px', bidi: this.setting('flagrow.analytics.piwik.4'), placeholder: app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.setting_4') }),
                                m(
                                    'div',
                                    { style: 'padding: 10px' },
                                    app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.site_id')
                                )
                            ),
                            m('script', "if($('#piwik3').prop('checked') === false){$('#piwik_3_hidden').hide()} $('#piwik3').change(function(){if($('#piwik3').prop('checked') === false) { $('#piwik_3_hidden').hide()} else $('#piwik_3_hidden').show();})"),
                            m('script', "if($('#status_google').prop('checked') === false){ $('#hidden_google').hide()} $('#status_google').change(function(){if($('#status_google').prop('checked') === false) { $('#hidden_google').hide()} else $('#hidden_google').show();})"),
                            m('script', "if($('#status_piwik').prop('checked') === false){ $('#hidden_piwik').hide()} $('#status_piwik').change(function(){if($('#status_piwik').prop('checked') === false) { $('#hidden_piwik').hide()} else $('#hidden_piwik').show();})")
                        )];
                    }
                }]);
                return AnalyticsSettingsModal;
            })(SettingsModal);

            _export('default', AnalyticsSettingsModal);
        }
    };
});;
System.register('flagrow/analytics/main', ['flarum/extend', 'flarum/app', 'flagrow/analytics/components/AnalyticsSettingsModal'], function (_export) {
  'use strict';

  var extend, app, AnalyticsSettingsModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_flagrowAnalyticsComponentsAnalyticsSettingsModal) {
      AnalyticsSettingsModal = _flagrowAnalyticsComponentsAnalyticsSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('flagrow-analytics', function (app) {
        app.extensionSettings['flagrow-analytics'] = function () {
          return app.modal.show(new AnalyticsSettingsModal());
        };
      });
    }
  };
});