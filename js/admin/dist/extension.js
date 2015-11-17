System.register('analytics/components/AnalyticsSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
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
            return 'Analytics Settings';
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
              m('input', { className: 'FormControl', bidi: this.setting('hyn.analytics.google') })
            )];
          }
        }]);
        return AnalyticsSettingsModal;
      })(SettingsModal);

      _export('default', AnalyticsSettingsModal);
    }
  };
});;
System.register('analytics/main', ['flarum/extend', 'flarum/app', 'analytics/components/AnalyticsSettingsModal'], function (_export) {
  'use strict';

  var extend, app, AnalyticsSettingsModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_analyticsComponentsAnalyticsSettingsModal) {
      AnalyticsSettingsModal = _analyticsComponentsAnalyticsSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('analytics', function (app) {
        app.extensionSettings.analytics = function () {
          return app.modal.show(new AnalyticsSettingsModal());
        };
      });
    }
  };
});