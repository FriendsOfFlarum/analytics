<?php

/*
 * This file is part of fof/analytics.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Analytics\Tests\integration;

use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

/**
 * Only providers actually in use should declare cookies. Listing Matomo's
 * cookies on a forum running Google alone would tell visitors the forum stores
 * things it does not.
 */
class DeclaredCookiesTest extends TestCase
{
    use SeedsSettings;

    private const OFF = [
        'fof-analytics.statusGoogle'       => '0',
        'fof-analytics.googleTrackingCode' => '',
        'fof-analytics.googleGTMCode'      => '',
        'fof-analytics.statusPiwik'        => '0',
        'fof-analytics.piwikUrl'           => '',
        'fof-analytics.piwikSiteId'        => '',
    ];

    private const GOOGLE = [
        'fof-analytics.statusGoogle'       => '1',
        'fof-analytics.googleTrackingCode' => 'UA-1234567-1',
    ];

    private const MATOMO = [
        'fof-analytics.statusPiwik' => '1',
        'fof-analytics.piwikUrl'    => 'https://matomo.example/',
        'fof-analytics.piwikSiteId' => '1',
    ];

    /**
     * Settings must exist before the app boots, since `Extend\Conditional`
     * reads them while extenders run.
     */
    private function boot(array $settings): void
    {
        $this->seedSettings(array_merge(self::OFF, $settings));

        $this->extension('fof-analytics', 'fof-cookie-consent');
    }

    private function categories(): array
    {
        $response = $this->send($this->request('GET', '/api'));

        return json_decode($response->getBody()->getContents(), true)['data']['attributes']['fof-cookie-consent.categories'];
    }

    /** @return string[] */
    private function declared(): array
    {
        return $this->categories()['analytics']['declaredCookies'] ?? [];
    }

    #[Test]
    public function nothing_is_declared_when_no_provider_is_configured(): void
    {
        $this->boot([]);

        $this->assertArrayNotHasKey('analytics', $this->categories());
    }

    #[Test]
    public function google_cookies_are_declared_when_google_is_in_use(): void
    {
        $this->boot(self::GOOGLE);

        $declared = $this->declared();

        $this->assertContains('/^_ga/', $declared);
        $this->assertContains('_gid', $declared);
    }

    #[Test]
    public function matomo_cookies_are_not_declared_when_only_google_is_in_use(): void
    {
        $this->boot(self::GOOGLE);

        $this->assertNotContains('/^_pk_id/', $this->declared());
    }

    #[Test]
    public function matomo_cookies_are_declared_when_matomo_is_in_use(): void
    {
        $this->boot(self::MATOMO);

        $declared = $this->declared();

        $this->assertContains('/^_pk_id/', $declared);
        $this->assertNotContains('_gid', $declared, 'Google cookies should not be declared');
    }

    #[Test]
    public function both_are_declared_when_both_are_in_use(): void
    {
        $this->boot(array_merge(self::GOOGLE, self::MATOMO));

        $declared = $this->declared();

        $this->assertContains('/^_ga/', $declared);
        $this->assertContains('/^_pk_id/', $declared);
    }

    #[Test]
    public function cookies_carry_their_own_translation_keys(): void
    {
        $this->boot(self::GOOGLE);

        $category = $this->categories()['analytics'];

        // The `analytics` section itself is owned and translated by
        // fof/cookie-consent, so nothing is supplied for it here.
        $this->assertNull($category['titleKey']);

        // The cookies are ours to describe, though.
        $this->assertSame('fof-analytics.forum.consent.cookies.gid', $category['descriptions']['_gid']);
        $this->assertSame('fof-analytics.forum.consent.cookies.ga', $category['descriptions']['/^_ga/']);
    }

    #[Test]
    public function google_is_ignored_when_switched_off_despite_a_tracking_code(): void
    {
        $this->boot(['fof-analytics.googleTrackingCode' => 'UA-1234567-1']);

        $this->assertArrayNotHasKey('analytics', $this->categories());
    }
}
