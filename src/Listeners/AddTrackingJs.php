<?php namespace Hyn\Analytics\Listeners;

use Flarum\Events\RegisterLocales;
use Flarum\Events\BuildClientView;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Core\Settings\SettingsRepository;
use Flarum\Forum\Actions\ClientAction as ForumClientAction;

class AddTrackingJs
{
    /**
     * @var SettingsRepository
     */
    protected $settings;


    public function __construct(SettingsRepository $settings) {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
//        $events->listen(RegisterLocales::class, [$this, 'addLocale']);
        $events->listen(BuildClientView::class, [$this, 'addAssets']);
    }

    public function addAssets(BuildClientView $event)
    {
        if($event->action instanceof ForumClientAction) {
            if($this->settings->get('hyn.analytics.google')) {
                $rawJs = file_get_contents(realpath(__DIR__ . '/../../assets/js/google-analytics.js'));
                $js    = str_replace("%%TRACKING_CODE%%", $this->settings->get('hyn.analytics.google'), $rawJs);
                $event->view->getAssets()->addJs(function() use ($js) { return $js; });
            }
        }
    }
}
