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

class RawExpression
{
    public $value;

    public function __construct($value)
    {
        $this->value = $value;
    }
}
