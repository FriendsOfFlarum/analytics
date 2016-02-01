<?php namespace Flagrow\Analytics\Listeners;

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;

class AddTrackingJs
{
    /**
     * @var SettingsRepository
     */
    protected $settings;


    /**
     * AddTrackingJs constructor.
     *
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
    }

    /**
     * @param ConfigureClientView $event
     */
    public function addAssets(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            // Add google analytics if tracking UA has been configured.
            if ($this->settings->get('flagrow.analytics.status.google') && $this->settings->get('flagrow.analytics.google')) {
                $rawJs = file_get_contents(realpath(__DIR__ . '/../../assets/js/google-analytics.js'));
                $js    = str_replace("%%TRACKING_CODE%%", $this->settings->get('flagrow.analytics.google'), $rawJs);
                $event->view->addHeadString($js);
            }

            // Add piwik specific tracking code if configured in the admin.
            if ($this->settings->get('flagrow.analytics.status.piwik') && $this->settings->get('flagrow.analytics.piwik.url')) {
                $rawJs = file_get_contents(realpath(__DIR__ . '/../../assets/js/piwik-analytics.js'));

                $options = [];

                if ($this->settings->get('flagrow.analytics.piwik.1')) {
                    $options[] = "_paq.push(['setCookieDomain', '*." . $_SERVER['HTTP_HOST'] . "']);";
                }

                if ($this->settings->get('flagrow.analytics.piwik.2')) {
                    $options[] = "_paq.push(['setDocumentTitle', document.domain + '/' + document.title]);";
                }

                if ($this->settings->get('flagrow.analytics.piwik.3') && $this->settings->get('flagrow.analytics.piwik.3.url')) {
                    $options[] = "_paq.push(['setDomains', ['*." . $this->settings->get('flagrow.analytics.piwik.3.url') . "']]);";
                }

                // Sanity check, add empty string or the combined array.
                if(count($options)) {
                    $options = implode('\n', $options);
                } else {
                    $options = '';
                }

                // Replace the ##piwik_options## has with the settings or an empty string.
                $rawJs = str_replace('##piwik_options##', $options, $rawJs);

                $rawJs = str_replace("##piwik_url##", $this->settings->get('flagrow.analytics.piwik.url'), $rawJs);
                $event->view->addHeadString($rawJs);
            }
        }
    }
}
