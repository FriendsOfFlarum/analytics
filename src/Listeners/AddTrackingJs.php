<?php namespace Hyn\Analytics\Listeners;

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
            if($this->settings->get('hyn.analytics.google')) {
                $rawJs = file_get_contents(realpath(__DIR__ . '/../../assets/js/google-analytics.js'));
                $js    = str_replace("%%TRACKING_CODE%%", $this->settings->get('hyn.analytics.google'), $rawJs);
                $event->view->getAssets()->addJs(function() use ($js) { return $js; });
            }
        }
    }
}