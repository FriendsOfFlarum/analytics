import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';

app.initializers.add('fof-analytics', () => {
  extend(Page.prototype, 'oninit', function () {
    if (app.data.googleTrackingCode && typeof gtag !== 'undefined') {
      gtag('config', app.data.googleTrackingCode, {
        page_path: m.route.get(),
      });
    }
    if (app.data.googleGTMCode && typeof gtagpush !== 'undefined') {
      gtagpush({
        event: 'custom_event',
        virtualpath: m.route.get(),
      });
    }
    if (typeof _paq !== 'undefined') {
      _paq.push(['setCustomUrl', m.route.get()]);
      _paq.push(['trackPageView']);
    }
  });
});
