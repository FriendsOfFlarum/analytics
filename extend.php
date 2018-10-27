<?php

namespace Flagrow\Analytics;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(Listeners\AddTrackingJs::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
];
