<?php namespace Flagrow\Analytics\Listeners;

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
    }

    public function addAssets(ConfigureClientView $event)
    {
        if($event->isAdmin()) {
            $event->addAssets([
                __DIR__ . '/../../js/admin/dist/extension.js',
            ]);

            $event->addBootstrapper('flagrow/analytics/main');
        } elseif($event->isForum())
        {
            $event->addAssets([
                __DIR__ . '/../../js/forum/dist/extension.js'
            ]);

            $event->addBootstrapper('flagrow/analytics/main');
        }
    }
}
