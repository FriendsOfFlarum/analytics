module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/admin/addAnalyticsPage.js":
/*!***************************************!*\
  !*** ./src/admin/addAnalyticsPage.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/AdminNav */ "flarum/components/AdminNav");
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/AdminLinkButton */ "flarum/components/AdminLinkButton");
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_AnalyticsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/AnalyticsPage */ "./src/admin/components/AnalyticsPage.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  // add the Analytics tab to the admin navigation menu if piwik is enabled
  if (m.prop(app.data.settings['flagrow.analytics.statusPiwik'])() && m.prop(app.data.settings['flagrow.analytics.piwikUrl'])() && m.prop(app.data.settings['flagrow.analytics.piwikSiteId'])() && m.prop(app.data.settings['flagrow.analytics.piwikAuthToken'])()) {
    app.routes['analytics'] = {
      path: '/analytics',
      component: _components_AnalyticsPage__WEBPACK_IMPORTED_MODULE_3__["default"].component()
    };
    Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'items', function (items) {
      items.add('analytics', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        href: app.route('analytics'),
        icon: 'fas fa-chart-line',
        children: app.translator.trans('flagrow-analytics.admin.page.nav.title'),
        description: app.translator.trans('flagrow-analytics.admin.page.nav.description')
      }));
    });
  }
});

/***/ }),

/***/ "./src/admin/components/AnalyticsPage.js":
/*!***********************************************!*\
  !*** ./src/admin/components/AnalyticsPage.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnalyticsPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);



var AnalyticsPage =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AnalyticsPage, _Component);

  function AnalyticsPage() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AnalyticsPage.prototype;

  _proto.view = function view() {
    var piwikUrl = app.data.settings['flagrow.analytics.piwikUrl']; // Use protocol-relative url if the url contains no protocol

    if (piwikUrl.indexOf('http://') === -1 && piwikUrl.indexOf('https://') === -1 && piwikUrl.indexOf('//') === -1) {
      piwikUrl = '//' + piwikUrl;
    } // Add trailing slash if necessary


    if (piwikUrl[piwikUrl.length - 1] !== '/') {
      piwikUrl += '/';
    } //Call the piwik application


    this.url = piwikUrl + 'index.php';
    this.url += '?idSite=' + app.data.settings['flagrow.analytics.piwikSiteId'];
    this.url += '&token_auth=' + app.data.settings['flagrow.analytics.piwikAuthToken'];
    this.url += '&module=Widgetize&action=iframe&moduleToWidgetize=Dashboard&actionToWidgetize=index&period=month&date=today';
    return [m("div", {
      className: "AnalyticsPage"
    }, m("div", {
      className: "piwik"
    }, m("label", null, "Piwik"), m("iframe", {
      src: this.url,
      frameborder: "0"
    })))];
  };

  return AnalyticsPage;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/components/AnalyticsSettingsModal.js":
/*!********************************************************!*\
  !*** ./src/admin/components/AnalyticsSettingsModal.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnalyticsSettingsModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__);




var settingsPrefix = 'flagrow.analytics.';

var AnalyticsSettingsModal =
/*#__PURE__*/
function (_SettingsModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AnalyticsSettingsModal, _SettingsModal);

  function AnalyticsSettingsModal() {
    return _SettingsModal.apply(this, arguments) || this;
  }

  var _proto = AnalyticsSettingsModal.prototype;

  _proto.className = function className() {
    return 'AnalyticsSettingsModal Modal--small';
  };

  _proto.title = function title() {
    return app.translator.trans('flagrow-analytics.admin.popup.title');
  };

  _proto.form = function form() {
    var piwikTrackAccountsSetting = this.setting(settingsPrefix + 'piwikTrackAccounts');

    if (!piwikTrackAccountsSetting()) {
      piwikTrackAccountsSetting('none');
    }

    return [m('h3', app.translator.trans('flagrow-analytics.admin.popup.section.googleAnalytics')), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.setting(settingsPrefix + 'statusGoogle')() > 0,
      onchange: this.setting(settingsPrefix + 'statusGoogle'),
      children: app.translator.trans('flagrow-analytics.admin.popup.field.statusGoogle')
    }))]), this.setting(settingsPrefix + 'statusGoogle')() > 0 ? [m('.Form-group', [m('label', app.translator.trans('flagrow-analytics.admin.popup.field.googleTrackingCode')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'googleTrackingCode'),
      placeholder: 'UA-XXXXXXXX-X'
    })])] : null, m('h3', app.translator.trans('flagrow-analytics.admin.popup.section.piwik')), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.setting(settingsPrefix + 'statusPiwik')() > 0,
      onchange: this.setting(settingsPrefix + 'statusPiwik'),
      children: app.translator.trans('flagrow-analytics.admin.popup.field.statusPiwik')
    }))]), this.setting(settingsPrefix + 'statusPiwik')() > 0 ? [m('.Form-group', [m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikUrl')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'piwikUrl'),
      placeholder: 'piwik.example.com'
    })]), m('.Form-group', [m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikSiteId')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'piwikSiteId')
    })]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.setting(settingsPrefix + 'piwikTrackSubdomain')() > 0,
      onchange: this.setting(settingsPrefix + 'piwikTrackSubdomain'),
      children: app.translator.trans('flagrow-analytics.admin.popup.field.piwikTrackSubdomain')
    }))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.setting(settingsPrefix + 'piwikPrependDomain')() > 0,
      onchange: this.setting(settingsPrefix + 'piwikPrependDomain'),
      children: app.translator.trans('flagrow-analytics.admin.popup.field.piwikPrependDomain')
    }))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0,
      onchange: this.setting(settingsPrefix + 'piwikHideAliasUrl'),
      children: app.translator.trans('flagrow-analytics.admin.popup.field.piwikHideAliasUrl')
    }))]), this.setting(settingsPrefix + 'piwikHideAliasUrl')() > 0 ? [m('.Form-group', [m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikAliasUrl')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'piwikAliasUrl')
    })])] : null, m('.Form-group', [m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikTrackAccounts')), flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      options: {
        none: app.translator.trans('flagrow-analytics.admin.popup.trackAccounts.none'),
        username: app.translator.trans('flagrow-analytics.admin.popup.trackAccounts.username'),
        email: app.translator.trans('flagrow-analytics.admin.popup.trackAccounts.email')
      },
      value: piwikTrackAccountsSetting(),
      onchange: piwikTrackAccountsSetting
    })]), m('.Form-group', [m('label', app.translator.trans('flagrow-analytics.admin.popup.field.piwikAuthToken')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'piwikAuthToken'),
      placeholder: '00112233445566778899aabbccddeeff'
    }), m('.helpText', app.translator.trans('flagrow-analytics.admin.popup.placeholder.piwikAuthToken'))])] : null];
  };

  return AnalyticsSettingsModal;
}(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_AnalyticsSettingsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AnalyticsSettingsModal */ "./src/admin/components/AnalyticsSettingsModal.js");
/* harmony import */ var _addAnalyticsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addAnalyticsPage */ "./src/admin/addAnalyticsPage.js");



app.initializers.add('flagrow-analytics', function (app) {
  app.extensionSettings['flagrow-analytics'] = function () {
    return app.modal.show(new _components_AnalyticsSettingsModal__WEBPACK_IMPORTED_MODULE_1__["default"]());
  };

  Object(_addAnalyticsPage__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/components/AdminLinkButton":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/AdminLinkButton']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminLinkButton'];

/***/ }),

/***/ "flarum/components/AdminNav":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/AdminNav']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminNav'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/SettingsModal":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsModal']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsModal'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map