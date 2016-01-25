import SettingsModal from 'flarum/components/SettingsModal';

export default class AnalyticsSettingsModal extends SettingsModal {
  className() {
    return 'AnalyticsSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('flagrow-analytics.admin.analytics_settings.title');
  }

  form() {
    return [
      <div className="Form-group">
        <label>Google Analytics</label>
        <input placeholder={app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.google')}
           className="FormControl" bidi={this.setting('flagrow.analytics.google')}/>
        <br/>
        <label> Piwik </label>
        <textarea placeholder={app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik')}
           className="FormControl" rows="3" bidi={this.setting('flagrow.analytics.piwik')}/>
      </div>
    ];
  }
}
