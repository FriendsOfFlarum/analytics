<?php namespace Hyn\Analytics\Listeners;

use Flarum\Events\RegisterLocales;
use Flarum\Events\BuildClientView;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(BuildClientView::class, [$this, 'addAssets']);
    }

    public function addAssets(BuildClientView $event)
    {
        $event->adminAssets([
            __DIR__.'/../../js/admin/dist/extension.js',
        ]);

        $event->adminBootstrapper('analytics/main');
    }
}
