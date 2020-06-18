<?php

/*
 * This file is part of fof/analytics.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        /**
         * @var \Flarum\Settings\SettingsRepositoryInterface
         */
        $settings = app('flarum.settings');

        $keys = [
            'piwikTrackAccounts', 
            'statusGoogle', 
            'googleTrackingCode',
            'googleGTMCode',
            'optTrackingCode',
            'statusPiwik',
            'piwikUrl',
            'piwikSiteId',
            'piwikTrackSubdomain',
            'piwikPrependDomain',
            'piwikHideAliasUrl',
            'piwikAliasUrl',
            'piwikAuthToken'
        ];

        foreach ($keys as $key) {
            if ($value = $settings->get($full = "flagrow.analytics.$key")) {
                $settings->set("fof-analytics.$key", $value);
                $settings->delete($full);
            }
        }
    },
];
