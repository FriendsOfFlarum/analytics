<?php

/*
 * This file is part of fof/analytics.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Analytics\Piwik;

class PaqPushList
{
    /**
     * @var array<int, array<int, mixed>>
     */
    protected array $pushs = [];

    /**
     * Wraps a value that should be injected in the javascript without escaping.
     */
    public function raw(string $value): RawExpression
    {
        return new RawExpression($value);
    }

    /**
     * Add a _paq.push() call to the list. Pass each item of the javascript array as a new parameter.
     */
    public function addPush(): void
    {
        $this->pushs[] = func_get_args();
    }

    /**
     * Creates the javascript output for the _paq.push() calls.
     */
    public function asJavascript(): string
    {
        return implode("\n    ", array_map(function ($push) {
            return '_paq.push(['.implode(', ', array_map(function ($item) {
                if ($item instanceof RawExpression) {
                    return $item->value;
                }

                // JSON encoding is used to escape data injected into javascript
                return json_encode($item);
            }, $push)).']);';
        }, $this->pushs));
    }
}
