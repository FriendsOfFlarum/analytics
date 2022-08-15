import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';

app.initializers.add('fof-analytics', () => {
  // Supply user IDs for cross-device tracking
  setTimeout(() => {
    if (app.data.googleTrackingCode && typeof gtag !== 'undefined') {
      gtag('config', app.data.googleTrackingCode);

      if (app.session.user) {
        gtag('config', app.data.googleTrackingCode, {
          user_id: app.session.user.id(),
        });
      }
    }
  }, 0);

  extend(Page.prototype, 'oninit', function () {
    // Don't run this if tracking code starts with "G-..."
    // GA4 automatically tracks history changes for SPAs with `page_view` events under the `page_location` property
    if (app.data.googleTrackingCode && !app.data.googleTrackingCode.startsWith('G-') && typeof gtag !== 'undefined') {
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
