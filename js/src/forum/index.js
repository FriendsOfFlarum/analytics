import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';

/**
 * Configure Google Analytics, supplying the user ID for cross-device tracking.
 *
 * Returns whether it ran: with fof/cookie-consent installed the tracking script
 * is held inert until the visitor accepts, so `gtag` may not exist yet.
 */
function configureGoogle() {
  if (!app.data.googleTrackingCode || typeof gtag === 'undefined') return false;

  gtag('config', app.data.googleTrackingCode);

  if (app.session.user) {
    gtag('config', app.data.googleTrackingCode, {
      user_id: app.session.user.id(),
    });
  }

  return true;
}

app.initializers.add('fof-analytics', () => {
  // Supply user IDs for cross-device tracking
  setTimeout(() => {
    if (configureGoogle()) return;

    // The script was held pending consent. fof/cookie-consent activates it
    // when the visitor accepts, so configure it then instead — otherwise this
    // first `config` call would be lost and only later page views tracked.
    window.addEventListener('cc:onConsent', configureGoogle);
    window.addEventListener('cc:onChange', configureGoogle);
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
