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
                <label>Google Analytics
                    <input type="checkbox" id="status_google" name="status_google" bidi={this.setting('flagrow.analytics.status.google')}/></label>
                <div id="hidden_google">
                    <input
                        placeholder={app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.google.tracking_code')}
                        className="FormControl"
                        bidi={this.setting('flagrow.analytics.google')}
                    />
                </div>
                <br/>

                <label> Piwik
                    <input type="checkbox" id="status_piwik" bidi={this.setting('flagrow.analytics.status.piwik')}/>
                </label>
                <div id="hidden_piwik">
                    <input
                        placeholder={app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.url')}
                        className="FormControl"
                        bidi={this.setting('flagrow.analytics.piwik.url')}
                    />
                    <br/>
                    <input type="checkbox" id="piwik1" bidi={this.setting('flagrow.analytics.piwik.1')}/> {app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.setting_1')}
                    <br/>
                    <input type="checkbox" id="piwik2" bidi={this.setting('flagrow.analytics.piwik.2')}/> {app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.setting_2')}
                    <br/>
                    <input type="checkbox" id="piwik3" bidi={this.setting('flagrow.analytics.piwik.3')}/> {app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.setting_3')}
                    <div id="piwik_3_hidden" style="margin-left:10px; ">
                        <input class="FormControl" bidi={this.setting('flagrow.analytics.piwik.3.url')} placeholder={app.translator.trans('flagrow-analytics.admin.analytics_settings.placeholder.piwik.3_url')}/>
                    </div>
                </div>
                  {m(
                      'script',
                      "if($('#piwik3').prop('checked') === false){$('#piwik_3_hidden').hide()} $('#piwik3').change(function(){if($('#piwik3').prop('checked') === false) { $('#piwik_3_hidden').hide()} else $('#piwik_3_hidden').show();})"
                  )}
                  {m(
                      'script',
                      "if($('#status_google').prop('checked') === false){ $('#hidden_google').hide()} $('#status_google').change(function(){if($('#status_google').prop('checked') === false) { $('#hidden_google').hide()} else $('#hidden_google').show();})"
                  )}
                  {m(
                      'script',
                      "if($('#status_piwik').prop('checked') === false){ $('#hidden_piwik').hide()} $('#status_piwik').change(function(){if($('#status_piwik').prop('checked') === false) { $('#hidden_piwik').hide()} else $('#hidden_piwik').show();})"
                  )}
            </div>
        ];
    }
}
