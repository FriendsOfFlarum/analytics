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


    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
    }

    public function addAssets(ConfigureClientView $event)
    {
        if($event->isForum()) {
            if($this->settings->get('flagrow.analytics.status.google') && $this->settings->get('flagrow.analytics.google')) {
                $rawJs = file_get_contents(realpath(__DIR__ . '/../../assets/js/google-analytics.js'));
                $js    = str_replace("%%TRACKING_CODE%%", $this->settings->get('flagrow.analytics.google'), $rawJs);
                $event->view->addHeadString($js);
            }

            if($this->settings->get('flagrow.analytics.status.piwik') && $this->settings->get('flagrow.analytics.piwik.url')) {
               $rawJs = file_get_contents(realpath(__DIR__ . '/../../assets/js/piwik-analytics.js'));
               if($this->settings->get('flagrow.analytics.piwik.1'))
                   $rawJs = str_replace("//1st", "_paq.push(['setCookieDomain', '*." . $_SERVER['HTTP_HOST'] . "']);", $rawJs);

               if($this->settings->get('flagrow.analytics.piwik.2'))
                   $rawJs = str_replace("//2nd", "_paq.push(['setDocumentTitle', document.domain + '/' + document.title]);", $rawJs);

               if($this->settings->get('flagrow.analytics.piwik.3') && $this->settings->get('flagrow.analytics.piwik.3.url'))
                   $rawJs = str_replace("//3rd", "_paq.push(['setDomains', ['*." . $this->settings->get('flagrow.analytics.piwik.3.url') . "']]);", $rawJs);

              $rawJs = str_replace("##piwik_url##", $this->settings->get('flagrow.analytics.piwik.url'), $rawJs);
               $event->view->addHeadString($rawJs);
            }
        }
    }
}
