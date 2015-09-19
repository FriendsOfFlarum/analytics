import SettingsModal from 'flarum/components/SettingsModal';

export default class AnalyticsSettingsModal extends SettingsModal {
  className() {
    return 'AnalyticsSettingsModal Modal--small';
  }

  title() {
    return 'Analytics Settings';
  }

  form() {
    return [
      <div className="Form-group">
        <label>Google Analytics</label>
        <input className="FormControl" bidi={this.setting('hyn.analytics.google')}/>
      </div>
    ];
  }
}