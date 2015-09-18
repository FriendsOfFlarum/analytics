import Modal from 'flarum/components/Modal';
import Group from 'flarum/models/Group';
import Button from 'flarum/components/Button';
import saveConfig from 'flarum/utils/saveConfig';

export default class AnalyticsSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.googleAnalytics = app.config['hyn.analytics.google-analytics'] || '';
    this.piwik = app.config['hyn.analytics.piwik'] || '';
  }

  className() {
    return 'AnalyticsSettingsModal Modal--small';
  }

  title() {
    return 'Analytics Settings';
  }

  content() {
    return (
      <div className="Modal-body" style="min-height: 400px">
        <div className="Form">


          <div className="Form-group">
            <label>Google analytics</label>
            <input className="FormControl" value={this.googleAnalytics()} oninput={m.withAttr('value', this.googleAnalytics)}/>
          </div>
          //<div className="Form-group">
          //  <label>Piwik</label>
          //  <input className="FormControl" value={this.piwik()} oninput={m.withAttr('value', this.piwik)}/>
          //</div>

        </div>
      </div>
    );
  }



  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    saveConfig({
      'hyn.analytics.google-analytics': this.googleAnalytics(),
      'hyn.analytics.piwik': this.piwik()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
