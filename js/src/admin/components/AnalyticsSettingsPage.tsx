import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';
import MatomoWidget from './MatomoWidget';

const settingsPrefix = 'fof-analytics.';

export default class AnalyticsSettingsPage extends ExtensionPage {
  content() {
    const piwikTrackAccountsSetting = this.setting(settingsPrefix + 'piwikTrackAccounts');

    if (!piwikTrackAccountsSetting()) {
      piwikTrackAccountsSetting('none');
    }

    return (
      <div className="container">
        <MatomoWidget />
        <div className="AnalyticsSettingsPage">
          <h3>{app.translator.trans('fof-analytics.admin.popup.section.googleAnalytics')}</h3>
          <div className="Form-group">
            <label>
              <Switch
                state={this.setting(settingsPrefix + 'statusGoogle')() > 0}
                onchange={this.setting(settingsPrefix + 'statusGoogle')}
              >
                {app.translator.trans('fof-analytics.admin.popup.field.statusGoogle')}
              </Switch>
            </label>
          </div>
          {this.setting(settingsPrefix + 'statusGoogle')() > 0 && (
            <>
              <div className="Form-group">
                <label>{app.translator.trans('fof-analytics.admin.popup.field.googleTrackingCode')}</label>
                <input
                  className="FormControl"
                  bidi={this.setting(settingsPrefix + 'googleTrackingCode')}
                  placeholder="UA-XXXXXXXX-X / G-XXXXXXXXXX"
                />
              </div>
              <div className="Form-group">
                <label>{app.translator.trans('fof-analytics.admin.popup.field.googleGTMCode')}</label>
                <input
                  className="FormControl"
                  bidi={this.setting(settingsPrefix + 'googleGTMCode')}
                  placeholder="GTM-XXXXXXX"
                />
              </div>
              <div className="Form-group">
                <label>{app.translator.trans('fof-analytics.admin.popup.field.optTrackingCode')}</label>
                <input
                  className="FormControl"
                  bidi={this.setting(settingsPrefix + 'optTrackingCode')}
                  placeholder="GTM-XXXXXX"
                />
              </div>
            </>
          )}
          <h3>{app.translator.trans('fof-analytics.admin.popup.section.piwik')}</h3>
          <div className="Form-group">
            <label>
              <Switch
                state={this.setting(settingsPrefix + 'statusPiwik')() > 0}
                onchange={this.setting(settingsPrefix + 'statusPiwik')}
              >
                {app.translator.trans('fof-analytics.admin.popup.field.statusPiwik')}
              </Switch>
            </label>
          </div>
          {this.setting(settingsPrefix + 'statusPiwik')() > 0 && (
            <>
              <div className="Form-group">
                <label>{app.translator.trans('fof-analytics.admin.popup.field.piwikUrl')}</label>
                <input
                  className="FormControl"
                  bidi={this.setting(settingsPrefix + 'piwikUrl')}
                  placeholder="matomo.example.com"
                />
              </div>
              <div className="Form-group">
                <label>{app.translator.trans('fof-analytics.admin.popup.field.piwikSiteId')}</label>
                <input
                  className="FormControl"
                  bidi={this.setting(settingsPrefix + 'piwikSiteId')}
                />
              </div>
              <div className="Form-group">
                <label>
                  <Switch
                    state={this.setting(settingsPrefix + 'piwikTrackSubdomain')() > 0}
                    onchange={this.setting(settingsPrefix + 'piwikTrackSubdomain')}
                  >
                    {app.translator.trans('fof-analytics.admin.popup.field.piwikTrackSubdomain')}
                  </Switch>
                </label>
              </div>
              <div className="Form-group">
                <label>
                  <Switch
                    state={this.setting(settingsPrefix + 'piwikPrependDomain')() > 0}
                    onchange={this.setting(settingsPrefix + 'piwikPrependDomain')}
                  >
                    {app.translator.trans('fof-analytics.admin.popup.field.piwikPrependDomain')}
                  </Switch>
                </label>
              </div>
              <div className="Form-group">
                <label>
                  <Switch
                    state={this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0}
                    onchange={this.setting(settingsPrefix + 'piwikHideAliasUrl')}
                  >
                    {app.translator.trans('fof-analytics.admin.popup.field.piwikHideAliasUrl')}
                  </Switch>
                </label>
              </div>
              {this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0 && (
                <div className="Form-group">
                  <label>{app.translator.trans('fof-analytics.admin.popup.field.piwikAliasUrl')}</label>
                  <input
                    className="FormControl"
                    bidi={this.setting(settingsPrefix + 'piwikAliasUrl')}
                  />
                </div>
              )}
              <div className="Form-group">
                <label>{app.translator.trans('fof-analytics.admin.popup.field.piwikTrackAccounts')}</label>
                <Select
                  options={{
                    none: app.translator.trans('fof-analytics.admin.popup.trackAccounts.none'),
                    username: app.translator.trans('fof-analytics.admin.popup.trackAccounts.username'),
                    email: app.translator.trans('fof-analytics.admin.popup.trackAccounts.email'),
                  }}
                  value={piwikTrackAccountsSetting()}
                  onchange={piwikTrackAccountsSetting}
                />
              </div>
              <div className="Form-group">
                <label>{app.translator.trans('fof-analytics.admin.popup.field.piwikAuthToken')}</label>
                <input
                  className="FormControl"
                  bidi={this.setting(settingsPrefix + 'piwikAuthToken')}
                  placeholder="00112233445566778899aabbccddeeff"
                />
                <div className="helpText">
                  {app.translator.trans('fof-analytics.admin.popup.placeholder.piwikAuthToken')}
                </div>
              </div>
            </>
          )}
          <div className="Form-group">
            {this.submitButton()}
          </div>
        </div>
      </div>
    );
  }
}
