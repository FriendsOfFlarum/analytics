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
                'Google Analytics'
              ),
              m('input', { placeholder: app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.google'),
                className: 'FormControl', bidi: this.setting('flagrow.analytics.google') }),
              m('br', null),
              m(
                'label',
                null,
                ' Piwik '
              ),
              m('textarea', { placeholder: app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik'),
                className: 'FormControl', rows: '3', bidi: this.setting('flagrow.analytics.piwik') })
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