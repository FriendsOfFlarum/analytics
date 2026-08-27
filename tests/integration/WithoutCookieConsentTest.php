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
 * Most installs will not have fof/cookie-consent. Referencing its classes
 * outside a `whenExtensionEnabled` guard is fatal on those forums, so this
 * boots analytics on its own and checks nothing breaks.
 */
class WithoutCookieConsentTest extends TestCase
{
    use SeedsSettings;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seedSettings([
            'fof-analytics.statusGoogle'       => '1',
            'fof-analytics.googleTrackingCode' => 'UA-1234567-1',
            'fof-analytics.statusPiwik'        => '0',
        ]);

        // Deliberately NOT enabling fof-cookie-consent.
        $this->extension('fof-analytics');
    }

    #[Test]
    public function the_forum_boots_without_cookie_consent_installed(): void
    {
        $response = $this->send($this->request('GET', '/'));

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function tracking_still_loads_normally(): void
    {
        $html = (string) $this->send($this->request('GET', '/'))->getBody();

        $this->assertStringContainsString('googletagmanager.com/gtag/js', $html);

        // Nothing to gate against, so the script runs as it always did.
        $this->assertStringNotContainsString('data-category="analytics"', $html);
    }
}
