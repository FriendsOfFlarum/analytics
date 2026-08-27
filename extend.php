<?php

/*
 * This file is part of fof/analytics.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Analytics;

use Flarum\Extend;
use FoF\Analytics\Consent\Cookies;
use FoF\CookieConsent\Extend\CookieConsent;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(Listeners\AddTrackingJs::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    // Declare what tracking stores and hold its scripts until the visitor
    // consents. Wrapped in whenExtensionEnabled so the CookieConsent classes
    // are only referenced when that extension is installed — without it the
    // classes do not exist and constructing one would be fatal.
    //
    // Each provider is declared only when it is in use, so a forum running
    // Google alone does not list Matomo's cookies to visitors.
    (new Extend\Conditional())
        ->whenExtensionEnabled('fof-cookie-consent', fn () => [
            (new Extend\Conditional())
                ->whenSetting('fof-analytics.statusGoogle', true, fn () => [
                    (new CookieConsent())
                        ->category(Cookies::CATEGORY, fn ($c) => Cookies::google($c))
                        ->gate(Cookies::CATEGORY),
                ])
                ->whenSetting('fof-analytics.statusPiwik', true, fn () => [
                    (new CookieConsent())
                        ->category(Cookies::CATEGORY, fn ($c) => Cookies::matomo($c))
                        ->gate(Cookies::CATEGORY),
                ]),
        ]),
];
