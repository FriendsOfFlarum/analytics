<?php

/*
 * This file is part of fof/analytics.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Analytics\Consent;

use FoF\CookieConsent\Category;

/**
 * The cookies each analytics provider sets, declared so fof/cookie-consent can
 * erase them when a visitor declines and describe them in the preferences
 * dialog.
 *
 * Which of these are declared is decided in extend.php, so a forum running
 * Google alone does not tell visitors it stores Matomo's cookies.
 */
class Cookies
{
    /** The consent category these belong to. */
    public const CATEGORY = 'analytics';

    private const T = 'fof-analytics.forum.consent';

    /**
     * Google Analytics and Tag Manager.
     *
     * `^_ga` covers the base cookie and GA4's per-property `_ga_XXXXXXX`;
     * `^_gat` covers its throttling cookies.
     */
    public static function google(Category $category): void
    {
        $category
            ->cookiePattern('^_ga', self::T.'.cookies.ga')
            ->cookiePattern('^_gat', self::T.'.cookies.gat')
            ->cookie('_gid', self::T.'.cookies.gid')
            ->cookiePattern('^__utm', self::T.'.cookies.utm');

        self::finish($category);
    }

    /**
     * Matomo (formerly Piwik). Most carry a site-id suffix, so they are
     * matched as patterns.
     */
    public static function matomo(Category $category): void
    {
        $category
            ->cookiePattern('^_pk_id', self::T.'.cookies.pk_id')
            ->cookiePattern('^_pk_ses', self::T.'.cookies.pk_ses')
            ->cookiePattern('^_pk_ref', self::T.'.cookies.pk_ref')
            ->cookiePattern('^_pk_cvar', self::T.'.cookies.pk_cvar')
            ->cookiePattern('^_pk_hsr', self::T.'.cookies.pk_hsr')
            ->cookie('MATOMO_SESSID', self::T.'.cookies.matomo_sessid');

        self::finish($category);
    }

    private static function finish(Category $category): void
    {
        // The `analytics` section is defined and translated by
        // fof/cookie-consent, so only the cookies are described here.
        //
        // Tracking scripts cannot cleanly undo themselves once loaded, so a
        // rejection needs a fresh page.
        $category->reloadOnReject();
    }
}
