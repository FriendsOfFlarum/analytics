<?php

/*
 * This file is part of fof/analytics.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoF\Analytics\Listeners;

use FoF\Analytics\Piwik\PaqPushList;
use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Guest;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;

class AddTrackingJs
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        $this->analytics($document);

        $this->piwik($document, $request);
    }

    private function analytics(Document &$document)
    {
        if($statusGoogle = $this->settings->get('fof-analytics.statusGoogle')) {
            $js = file_get_contents(realpath(__DIR__ . '/../../resources/js/google-tag-manager.html'));

            // Add google analytics if tracking UA has been configured.
            if ($googleTrackingCode = $this->settings->get('fof-analytics.googleTrackingCode')) {
                $js = str_replace("%%TRACKING_CODE%%", $googleTrackingCode, $js);

                $document->payload['googleTrackingCode'] = $googleTrackingCode;
            }

            // Add google tag manager if tracking GTM has been configured.
            if ($googleGTMCode = $this->settings->get('fof-analytics.googleGTMCode')) {
                $js = str_replace("%%GTM_TRACKING_CODE%%", $googleGTMCode, $js);
                $js = str_replace("%%TRACKING_CODE%%", $googleTrackingCode, $js);

                $document->payload['googleGTMCode'] = $googleGTMCode;
            }

            if ($optTrackingCode = $this->settings->get('fof-analytics.optTrackingCode')) {
                $js = str_replace("%%OPT_TRACKING_CODE%%", $optTrackingCode, $js);

                $document->payload['optTrackingCode'] = $optTrackingCode;
            }

            $document->head[] = $js;
        }
    }

    private function piwik(Document &$document, ServerRequestInterface $request)
    {
        // get the validation data
        $settings = [
            'statusPiwik' => $this->settings->get('fof-analytics.statusPiwik'),
            'piwikUrl' => $this->settings->get('fof-analytics.piwikUrl'),
            'piwikSiteId' => $this->settings->get('fof-analytics.piwikSiteId'),
        ];
        // Add piwik specific tracking code if configured in admin.
        if ($settings['statusPiwik'] && $settings['piwikUrl'] && $settings['piwikSiteId']) {
            $piwikUrl = $settings['piwikUrl'];

            // Use protocol-relative url if no protocol is defined
            if (!Str::startsWith($piwikUrl, ['http://', 'https://', '//'])) {
                $piwikUrl = '//' . $piwikUrl;
            }

            // Add trailing slash if not already present
            if (!Str::endsWith($piwikUrl, '/')) {
                $piwikUrl .= '/';
            }

            // get all the data
            $settings += [
                'piwikHideAliasUrl' => $this->settings->get('fof-analytics.piwikHideAliasUrl'),
                'piwikAliasUrl' => $this->settings->get('fof-analytics.piwikAliasUrl'),
                'piwikTrackSubdomain' => $this->settings->get('fof-analytics.piwikTrackSubdomain'),
                'piwikPrependDomain' => $this->settings->get('fof-analytics.piwikPrependDomain'),
                'piwikTrackAccounts' => $this->settings->get('fof-analytics.piwikTrackAccounts'),
            ];

            $rawJs = file_get_contents(realpath(__DIR__ . '/../../resources/js/piwik-analytics.html'));

            $options = new PaqPushList();

            $options->addPush('setSiteId', $settings['piwikSiteId']);

            if ($settings['piwikTrackSubdomain']) {
                $options->addPush('setCookieDomain', '*.' . $_SERVER['HTTP_HOST']);
            }

            if ($settings['piwikPrependDomain']) {
                $options->addPush('setDocumentTitle', $options->raw('document.domain + \'/\' + document.title'));
            }

            if ($settings['piwikHideAliasUrl'] && $settings['piwikAliasUrl']) {
                $options->addPush('setDomains', '*.' . $settings['piwikAliasUrl']);
            }

            if (in_array($settings['piwikTrackAccounts'], ['username', 'email'])) {
                $user = $request->getAttribute('actor');

                if (!($user instanceof Guest)) {
                    $userId = $user->{$settings['piwikTrackAccounts']};

                    $options->addPush('setUserId', $userId);
                }
            }

            // Replace the ##piwik_options## has with the settings or an empty string.
            $js = str_replace('##piwik_options##', $options->asJavascript(), $rawJs);

            $js = str_replace("##piwik_url##", $piwikUrl, $js);
            $document->head[] = $js;
        }
    }
}
