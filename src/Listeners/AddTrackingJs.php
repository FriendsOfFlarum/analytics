<?php

namespace Flagrow\Analytics\Listeners;

use Flagrow\Analytics\Piwik\PaqPushList;
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
        // Add google analytics if tracking UA has been configured.
        if ($this->settings->get('flagrow.analytics.statusGoogle') && $code = $this->settings->get('flagrow.analytics.googleTrackingCode')) {
            $rawJs = file_get_contents(realpath(__DIR__ . '/../../resources/js/google-analytics.html'));
            $js = str_replace("%%TRACKING_CODE%%", $code, $rawJs);
            $document->head[] = $js;

            $document->payload['googleTrackingCode'] = $code;
        }
    }

    private function piwik(Document &$document, ServerRequestInterface $request)
    {
        // get the validation data
        $settings = [
            'statusPiwik' => $this->settings->get('flagrow.analytics.statusPiwik'),
            'piwikUrl' => $this->settings->get('flagrow.analytics.piwikUrl'),
            'piwikSiteId' => $this->settings->get('flagrow.analytics.piwikSiteId'),
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
                'piwikHideAliasUrl' => $this->settings->get('flagrow.analytics.piwikHideAliasUrl'),
                'piwikAliasUrl' => $this->settings->get('flagrow.analytics.piwikAliasUrl'),
                'piwikTrackSubdomain' => $this->settings->get('flagrow.analytics.piwikTrackSubdomain'),
                'piwikPrependDomain' => $this->settings->get('flagrow.analytics.piwikPrependDomain'),
                'piwikTrackAccounts' => $this->settings->get('flagrow.analytics.piwikTrackAccounts'),
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
