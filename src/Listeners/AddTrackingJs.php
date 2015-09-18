<?php namespace Hyn\Analytics\Listeners;

use Flarum\Events\RegisterLocales;
use Flarum\Events\BuildClientView;
use Illuminate\Contracts\Events\Dispatcher;

class AddTrackingJs
{
    public function subscribe(Dispatcher $events)
    {
//        $events->listen(RegisterLocales::class, [$this, 'addLocale']);
        $events->listen(BuildClientView::class, [$this, 'addAssets']);
    }

    public function addAssets(BuildClientView $event)
    {
        if($event->action instanceof ForumClientAction) {
            $rawJs = file_get_contents(__DIR__ . '/assets/js/analytics.js');
            $js = str_replace("%%TRACKING_CODE%%", '', $rawJs);
            $event->view->getAssets()->addJs($js);
        }
    }
}
