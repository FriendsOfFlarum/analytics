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

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

/**
 * Analytics scripts must not run until the visitor has consented.
 *
 * With fof/cookie-consent installed, the tracking tags are held inert —
 * `type="text/plain"` with a `data-category`, which the consent library
 * activates only once the analytics category is accepted. Without it, nothing
 * changes and the scripts load as before.
 */
class ConsentTest extends TestCase
{
    use RetrievesAuthorizedUsers;
    use SeedsSettings;

    protected function setUp(): void
    {
        parent::setUp();

        // Seeded rather than set through `setting()`: Extend\Conditional reads
        // settings while extenders run, which is before the test harness
        // applies them.
        $this->seedSettings([
            'fof-analytics.statusGoogle'       => '1',
            'fof-analytics.googleTrackingCode' => 'UA-1234567-1',
        ]);

        $this->extension('fof-analytics', 'fof-cookie-consent');
    }

    private function html(): string
    {
        return (string) $this->send($this->request('GET', '/'))->getBody();
    }

    #[Test]
    public function the_tracking_script_is_held_until_consent(): void
    {
        $html = $this->html();

        $this->assertStringContainsString('googletagmanager.com/gtag/js', $html);
        $this->assertStringContainsString('type="text/plain"', $html);
        $this->assertStringContainsString('data-category="analytics"', $html);
    }

    #[Test]
    public function no_tracking_script_executes_directly(): void
    {
        $html = $this->html();

        // Every script tag in the analytics block must be gated; an ungated
        // one would run before the visitor answered.
        $start = strpos($html, '<!-- Global Site Tag');
        $block = substr($html, $start, strpos($html, '</head>', $start) - $start);

        $this->assertNotFalse($start, 'analytics block not found');
        $this->assertSame(
            substr_count($block, '<script'),
            substr_count($block, 'data-category="analytics"'),
            'every analytics script tag should carry a data-category'
        );
    }

    #[Test]
    public function the_analytics_category_is_declared_with_its_cookies(): void
    {
        $response = $this->send($this->request('GET', '/api'));
        $attributes = json_decode($response->getBody()->getContents(), true)['data']['attributes'];

        $categories = $attributes['fof-cookie-consent.categories'];

        $this->assertArrayHasKey('analytics', $categories);
        $this->assertFalse($categories['analytics']['readOnly']);

        $declared = $categories['analytics']['declaredCookies'];

        // Google Analytics' cookie family.
        $this->assertContains('/^_ga/', $declared);
        $this->assertContains('_gid', $declared);
    }
}
