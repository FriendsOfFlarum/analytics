<?php namespace Hyn\Analytics\Listeners;

use Flarum\Events\RegisterLocales;
use Flarum\Events\BuildClientView;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Core\Settings\SettingsRepository;

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
            if($this->settings('hyn.analytics.google')) {
                $rawJs = file_get_contents(__DIR__ . '/assets/js/analytics.js');
                $js    = str_replace("%%TRACKING_CODE%%", $this->settings('hyn.analytics.google'), $rawJs);
                $event->view->getAssets()->addJs($js);
            }
        }
    }
}
