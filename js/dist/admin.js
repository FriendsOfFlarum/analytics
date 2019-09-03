module.exports=function(t){var a={};function n(i){if(a[i])return a[i].exports;var o=a[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=a,n.d=function(t,a,i){n.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,a){if(1&a&&(t=n(t)),8&a)return t;if(4&a&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var o in t)n.d(i,o,function(a){return t[a]}.bind(null,o));return i},n.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(a,"a",a),a},n.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},n.p="",n(n.s=8)}([function(t,a){t.exports=flarum.core.compat.extend},function(t,a){t.exports=flarum.core.compat["components/Switch"]},,function(t,a){t.exports=flarum.core.compat["components/SettingsModal"]},function(t,a){t.exports=flarum.core.compat["components/Select"]},function(t,a){t.exports=flarum.core.compat["components/AdminNav"]},function(t,a){t.exports=flarum.core.compat["components/AdminLinkButton"]},function(t,a){t.exports=flarum.core.compat.Component},function(t,a,n){"use strict";n.r(a);var i=n(0);function o(t,a){t.prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a}var r=n(3),e=n.n(r),p=n(4),l=n.n(p),s=n(1),c=n.n(s),u="flagrow.analytics.",d=function(t){function a(){return t.apply(this,arguments)||this}o(a,t);var n=a.prototype;return n.className=function(){return"AnalyticsSettingsModal Modal--small"},n.title=function(){return app.translator.trans("flagrow-analytics.admin.popup.title")},n.form=function(){var t=this.setting(u+"piwikTrackAccounts");return t()||t("none"),[m("h3",app.translator.trans("flagrow-analytics.admin.popup.section.googleAnalytics")),m(".Form-group",[m("label",c.a.component({state:this.setting(u+"statusGoogle")()>0,onchange:this.setting(u+"statusGoogle"),children:app.translator.trans("flagrow-analytics.admin.popup.field.statusGoogle")}))]),this.setting(u+"statusGoogle")()>0?[m(".Form-group",[m("label",app.translator.trans("flagrow-analytics.admin.popup.field.googleTrackingCode")),m("input.FormControl",{bidi:this.setting(u+"googleTrackingCode"),placeholder:"UA-XXXXXXXX-X"})]),m(".Form-group",[m("label",app.translator.trans("flagrow-analytics.admin.popup.field.googleGTMCode")),m("input.FormControl",{bidi:this.setting(u+"googleGTMCode"),placeholder:"GTM-XXXXXXX"})])]:null,m("h3",app.translator.trans("flagrow-analytics.admin.popup.section.piwik")),m(".Form-group",[m("label",c.a.component({state:this.setting(u+"statusPiwik")()>0,onchange:this.setting(u+"statusPiwik"),children:app.translator.trans("flagrow-analytics.admin.popup.field.statusPiwik")}))]),this.setting(u+"statusPiwik")()>0?[m(".Form-group",[m("label",app.translator.trans("flagrow-analytics.admin.popup.field.piwikUrl")),m("input.FormControl",{bidi:this.setting(u+"piwikUrl"),placeholder:"piwik.example.com"})]),m(".Form-group",[m("label",app.translator.trans("flagrow-analytics.admin.popup.field.piwikSiteId")),m("input.FormControl",{bidi:this.setting(u+"piwikSiteId")})]),m(".Form-group",[m("label",c.a.component({state:this.setting(u+"piwikTrackSubdomain")()>0,onchange:this.setting(u+"piwikTrackSubdomain"),children:app.translator.trans("flagrow-analytics.admin.popup.field.piwikTrackSubdomain")}))]),m(".Form-group",[m("label",c.a.component({state:this.setting(u+"piwikPrependDomain")()>0,onchange:this.setting(u+"piwikPrependDomain"),children:app.translator.trans("flagrow-analytics.admin.popup.field.piwikPrependDomain")}))]),m(".Form-group",[m("label",c.a.component({state:this.setting(u+"piwikHideAliasUrl")()>0,onchange:this.setting(u+"piwikHideAliasUrl"),children:app.translator.trans("flagrow-analytics.admin.popup.field.piwikHideAliasUrl")}))]),this.setting(u+"piwikHideAliasUrl")()>0?[m(".Form-group",[m("label",app.translator.trans("flagrow-analytics.admin.popup.field.piwikAliasUrl")),m("input.FormControl",{bidi:this.setting(u+"piwikAliasUrl")})])]:null,m(".Form-group",[m("label",app.translator.trans("flagrow-analytics.admin.popup.field.piwikTrackAccounts")),l.a.component({options:{none:app.translator.trans("flagrow-analytics.admin.popup.trackAccounts.none"),username:app.translator.trans("flagrow-analytics.admin.popup.trackAccounts.username"),email:app.translator.trans("flagrow-analytics.admin.popup.trackAccounts.email")},value:t(),onchange:t})]),m(".Form-group",[m("label",app.translator.trans("flagrow-analytics.admin.popup.field.piwikAuthToken")),m("input.FormControl",{bidi:this.setting(u+"piwikAuthToken"),placeholder:"00112233445566778899aabbccddeeff"}),m(".helpText",app.translator.trans("flagrow-analytics.admin.popup.placeholder.piwikAuthToken"))])]:null]},a}(e.a),f=n(5),g=n.n(f),w=n(6),h=n.n(w),y=n(7),k=function(t){function a(){return t.apply(this,arguments)||this}return o(a,t),a.prototype.view=function(){var t=app.data.settings["flagrow.analytics.piwikUrl"];return-1===t.indexOgiffgafff("http://")&&-1===t.indexOf("https://")&&-1===t.indexOf("//")&&(t="//"+t),"/"!==t[t.length-1]&&(t+="/"),this.url=t+"index.php",this.url+="?idSite="+app.data.settings["flagrow.analytics.piwikSiteId"],this.url+="&token_auth="+app.data.settings["flagrow.analytics.piwikAuthToken"],this.url+="&module=Widgetize&action=iframe&moduleToWidgetize=Dashboard&actionToWidgetize=index&period=month&date=today",[m("div",{className:"AnalyticsPage"},m("div",{className:"piwik"},m("label",null,"Piwik"),m("iframe",{src:this.url,frameborder:"0"})))]},a}(n.n(y).a),b=function(){m.prop(app.data.settings["flagrow.analytics.statusPiwik"])()&&m.prop(app.data.settings["flagrow.analytics.piwikUrl"])()&&m.prop(app.data.settings["flagrow.analytics.piwikSiteId"])()&&m.prop(app.data.settings["flagrow.analytics.piwikAuthToken"])()&&(app.routes.analytics={path:"/analytics",component:k.component()},Object(i.extend)(g.a.prototype,"items",function(t){t.add("analytics",h.a.component({href:app.route("analytics"),icon:"fas fa-chart-line",children:app.translator.trans("flagrow-analytics.admin.page.nav.title"),description:app.translator.trans("flagrow-analytics.admin.page.nav.description")}))}))};app.initializers.add("giffgaff-analytics",function(t){t.extensionSettings["giffgaff-analytics"]=function(){return t.modal.show(new d)},b()})}]);
//# sourceMappingURL=admin.js.map