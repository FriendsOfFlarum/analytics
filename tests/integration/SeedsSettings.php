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

    /** Connect straight to the test database, whichever driver it uses. */
    private function connect(array $db): \PDO
    {
        if ($db['driver'] === 'sqlite') {
            $path = $db['database'];

            // Relative paths are resolved against the test installation.
            if (!str_starts_with($path, '/')) {
                $path = $this->tmpDir().'/'.$path;
            }

            return new \PDO('sqlite:'.$path);
        }

        $pgsql = $db['driver'] === 'pgsql';

        // MariaDB is driven by PDO's mysql driver.
        $driver = $pgsql ? 'pgsql' : 'mysql';
        $port = $db['port'] ?? ($pgsql ? 5432 : 3306);

        return new \PDO(
            sprintf('%s:host=%s;port=%s;dbname=%s', $driver, $db['host'], $port, $db['database']),
            $db['username'],
            $db['password']
        );
    }

    protected function seedSettings(array $settings): void
    {
        $config = include $this->tmpDir().'/config.php';
        $db = $config['database'];

        $pdo = $this->connect($db);

        // `key` is reserved in both MySQL and PostgreSQL, but each quotes it
        // differently.
        $key = $db['driver'] === 'pgsql' ? '"key"' : '`key`';
        $prefix = $db['prefix'] ?? '';

        foreach ($settings as $setting => $value) {
            $pdo->prepare("DELETE FROM {$prefix}settings WHERE $key = ?")->execute([$setting]);
            $pdo->prepare("INSERT INTO {$prefix}settings ($key, value) VALUES (?, ?)")->execute([$setting, $value]);
        }
    }
}
