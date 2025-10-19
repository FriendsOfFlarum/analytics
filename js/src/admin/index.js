import app from 'flarum/admin/app';
import AnalyticsSettingsPage from './components/AnalyticsSettingsPage';

app.initializers.add('fof-analytics', (app) => {
  app.registry.for('fof-analytics').registerPage(AnalyticsSettingsPage);
});
