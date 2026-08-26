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

/**
 * Writes settings straight to the test database before the app boots.
 *
 * `TestCase::setting()` applies its values through an extender that runs
 * *after* OverrideExtensionManagerForTests has already booted every extension
 * — so anything read during boot, such as `Extend\Conditional::whenSetting`,
 * sees nothing. Writing the rows first is the only way to have them in place
 * by the time extenders run.
 */
trait SeedsSettings
{
    use \Flarum\Testing\integration\UsesTmpDir;

    protected function seedSettings(array $settings): void
    {
        $config = include $this->tmpDir().'/config.php';
        $db = $config['database'];

        if ($db['driver'] === 'sqlite') {
            $path = $db['database'];

            // Relative paths are resolved against the test installation.
            if (! str_starts_with($path, '/')) {
                $path = $this->tmpDir().'/'.$path;
            }

            $pdo = new \PDO('sqlite:'.$path);
        } else {
            $pdo = new \PDO(
                sprintf('mysql:host=%s;port=%s;dbname=%s', $db['host'], $db['port'] ?? 3306, $db['database']),
                $db['username'],
                $db['password']
            );
        }

        $prefix = $db['prefix'] ?? '';

        foreach ($settings as $key => $value) {
            $pdo->prepare("DELETE FROM {$prefix}settings WHERE `key` = ?")->execute([$key]);
            $pdo->prepare("INSERT INTO {$prefix}settings (`key`, `value`) VALUES (?, ?)")->execute([$key, $value]);
        }
    }
}
