import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';
import MatomoWidget from './components/MatomoWidget';

export default [
  new Extend.Admin()
    .customSetting(() => <MatomoWidget />)

    .customSetting(() => (
      <h3 className="AnalyticsSettingsPage-heading">{app.translator.trans('fof-analytics.admin.popup.section.googleAnalytics')}</h3>
    ))
    .setting(() => ({
      setting: 'fof-analytics.statusGoogle',
      label: app.translator.trans('fof-analytics.admin.popup.field.statusGoogle'),
      type: 'boolean',
    }))
    .setting(() => ({
      setting: 'fof-analytics.googleTrackingCode',
      label: app.translator.trans('fof-analytics.admin.popup.field.googleTrackingCode'),
      placeholder: 'UA-XXXXXXXX-X / G-XXXXXXXXXX',
      type: 'text',
    }))
    .setting(() => ({
      setting: 'fof-analytics.googleGTMCode',
      label: app.translator.trans('fof-analytics.admin.popup.field.googleGTMCode'),
      placeholder: 'GTM-XXXXXXX',
      type: 'text',
    }))
    .setting(() => ({
      setting: 'fof-analytics.optTrackingCode',
      label: app.translator.trans('fof-analytics.admin.popup.field.optTrackingCode'),
      placeholder: 'GTM-XXXXXX',
      type: 'text',
    }))

    .customSetting(() => <h3 className="AnalyticsSettingsPage-heading">{app.translator.trans('fof-analytics.admin.popup.section.piwik')}</h3>)
    .setting(() => ({
      setting: 'fof-analytics.statusPiwik',
      label: app.translator.trans('fof-analytics.admin.popup.field.statusPiwik'),
      type: 'boolean',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikUrl',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikUrl'),
      placeholder: 'matomo.example.com',
      type: 'text',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikSiteId',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikSiteId'),
      type: 'text',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikTrackSubdomain',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikTrackSubdomain'),
      type: 'boolean',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikPrependDomain',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikPrependDomain'),
      type: 'boolean',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikHideAliasUrl',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikHideAliasUrl'),
      type: 'boolean',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikAliasUrl',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikAliasUrl'),
      type: 'text',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikTrackAccounts',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikTrackAccounts'),
      type: 'select',
      options: {
        none: app.translator.trans('fof-analytics.admin.popup.trackAccounts.none'),
        username: app.translator.trans('fof-analytics.admin.popup.trackAccounts.username'),
        email: app.translator.trans('fof-analytics.admin.popup.trackAccounts.email'),
      },
      default: 'none',
    }))
    .setting(() => ({
      setting: 'fof-analytics.piwikAuthToken',
      label: app.translator.trans('fof-analytics.admin.popup.field.piwikAuthToken'),
      help: app.translator.trans('fof-analytics.admin.popup.placeholder.piwikAuthToken'),
      placeholder: '00112233445566778899aabbccddeeff',
      type: 'text',
    })),
];
