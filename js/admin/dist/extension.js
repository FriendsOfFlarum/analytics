System.register('flagrow/analytics/addAnalyticsPage', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'flagrow/analytics/components/AnalyticsPage'], function (_export) {
    'use strict';

    var extend, AdminNav, AdminLinkButton, AnalyticsPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav['default'];
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
        }, function (_flagrowAnalyticsComponentsAnalyticsPage) {
            AnalyticsPage = _flagrowAnalyticsComponentsAnalyticsPage['default'];
        }],
        execute: function () {
            _export('default', function () {
                // add the Analytics tab to the admin navigation menu if piwik is enabled
                if (m.prop(app.settings['flagrow.analytics.statusPiwik'])() && m.prop(app.settings['flagrow.analytics.piwikUrl'])() && m.prop(app.settings['flagrow.analytics.piwikSiteId'])() && m.prop(app.settings['flagrow.analytics.piwikAuthToken'])()) {

                    app.routes['analytics'] = { path: '/analytics', component: AnalyticsPage.component() };

                    extend(AdminNav.prototype, 'items', function (items) {
                        items.add('analytics', AdminLinkButton.component({
                            href: app.route('analytics'),
                            icon: 'line-chart',
                            children: app.translator.trans('flagrow-analytics.admin.page.nav.title'),
                            description: app.translator.trans('flagrow-analytics.admin.page.nav.description')
                        }));
                    });
                }
            });
        }
    };
});;
System.register('flagrow/analytics/components/AnalyticsPage', ['flarum/Component'], function (_export) {
    'use strict';

    var Component, AnalyticsPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }],
        execute: function () {
            AnalyticsPage = (function (_Component) {
                babelHelpers.inherits(AnalyticsPage, _Component);

                function AnalyticsPage() {
                    babelHelpers.classCallCheck(this, AnalyticsPage);
                    babelHelpers.get(Object.getPrototypeOf(AnalyticsPage.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(AnalyticsPage, [{
                    key: 'view',
                    value: function view() {
                        //Call the piwik application
                        this.url = '//' + m.prop(app.settings['flagrow.analytics.piwikUrl'])() + '/index.php';
                        this.url += '?idSite=' + m.prop(app.settings['flagrow.analytics.piwikSiteId'])();
                        this.url += '&token_auth=' + m.prop(app.settings['flagrow.analytics.piwikAuthToken'])();
                        this.url += '&module=Widgetize&action=iframe&moduleToWidgetize=Dashboard&actionToWidgetize=index&period=month&date=today';
                        return [m('div', { className: 'analyticsPage' }, [m('div', { className: 'piwik' }, [m('label', ['Piwik']), m('iframe', {
                            frameborder: '0',
                            src: this.url
                        })])])];
                    }
                }]);
                return AnalyticsPage;
            })(Component);

            _export('default', AnalyticsPage);
        }
    };
});;
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
                        return app.translator.trans('flagrow-analytics.admin.popup.title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        var _this = this;

                        // the fields we need to save
                        this.fields = ['googleTrackingCode', 'piwikUrl', 'piwikSiteId', 'piwikAliasUrl', 'piwikAuthToken'];

                        // the checkboxes we need to save.
                        this.checkboxes = ['statusGoogle', 'statusPiwik', 'piwikTrackSubdomain', 'piwikPrependDomain', 'piwikHideAliasUrl'];

                        this.inputs = [];
                        this.checkbox = [];

                        // our package prefix (to be added to every field and checkbox in the setting table)
                        this.settingsPrefix = 'flagrow.analytics';

                        // the input fields
                        this.fields.forEach(function (key) {
                            return _this.inputs[key] = m('input', {
                                id: key,
                                className: 'FormControl',
                                bidi: _this.setting(_this.settingsPrefix + '.' + key),
                                placeholder: app.translator.trans('flagrow-analytics.admin.popup.field.' + key)
                            });
                        });

                        // the checkboxes
                        this.checkboxes.forEach(function (key) {
                            return _this.checkbox[key] = m('input', {
                                id: key,
                                type: 'checkbox',
                                style: 'float:left; margin-right:3px; margin-top: 2px;',
                                bidi: _this.setting(_this.settingsPrefix + '.' + key)
                            });
                        });

                        // the labels
                        this.checkboxes.forEach(function (key) {
                            return _this.checkbox['label.' + key] = m('div', [app.translator.trans('flagrow-analytics.admin.popup.checkbox.label.' + key)]);
                        });

                        return [m('div', { className: 'Form-group' }, [m('label', ['Google Analytics ', this.checkbox['statusGoogle']]), m('div', { style: { display: $('#statusGoogle').prop('checked') === true ? "block" : "none" } }, [this.inputs['googleTrackingCode']]), m('br'), m('label', ['Piwik ', this.checkbox['statusPiwik']]), m('div', { className: 'piwik', style: { display: $('#statusPiwik').prop('checked') === true ? "block" : "none" } }, [this.inputs['piwikUrl'], m('br'), this.inputs['piwikSiteId'], this.inputs['piwikAuthToken'], m('br'), this.checkbox['piwikTrackSubdomain'], this.checkbox['label.piwikTrackSubdomain'], m('br'), this.checkbox['piwikPrependDomain'], this.checkbox['label.piwikPrependDomain'], m('br'), this.checkbox['piwikHideAliasUrl'], this.checkbox['label.piwikHideAliasUrl'], m('div', { style: { display: $('#piwikHideAliasUrl').prop('checked') === true ? "block" : "none" } }, [this.inputs['piwikAliasUrl']])])])];
                    }
                }]);
                return AnalyticsSettingsModal;
            })(SettingsModal);

            _export('default', AnalyticsSettingsModal);
        }
    };
});;
System.register('flagrow/analytics/main', ['flarum/extend', 'flarum/app', 'flagrow/analytics/components/AnalyticsSettingsModal', 'flagrow/analytics/addAnalyticsPage'], function (_export) {
  'use strict';

  var extend, app, AnalyticsSettingsModal, addAnalyticsPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_flagrowAnalyticsComponentsAnalyticsSettingsModal) {
      AnalyticsSettingsModal = _flagrowAnalyticsComponentsAnalyticsSettingsModal['default'];
    }, function (_flagrowAnalyticsAddAnalyticsPage) {
      addAnalyticsPage = _flagrowAnalyticsAddAnalyticsPage['default'];
    }],
    execute: function () {

      app.initializers.add('flagrow-analytics', function (app) {
        app.extensionSettings['flagrow-analytics'] = function () {
          return app.modal.show(new AnalyticsSettingsModal());
        };
        addAnalyticsPage();
      });
    }
  };
});
