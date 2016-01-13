(function ($) {
    "use strict";
    var templates = {},
        queue = {},
        formatters = {};

    function loadTemplate(template, data, options) {
        var $that = this,
            $template,
            isFile,
            settings;

        data = data || {};

        settings = $.extend(true, {
            // These are the defaults.
            async: true,
            overwriteCache: false,
            complete: null,
            success: null,
            error: function () {
                $(this).each(function () {
                    $(this).html(settings.errorMessage);
                });
            },
            errorMessage: "There was an error loading the template.",
            paged: false,
            pageNo: 1,
            elemPerPage: 10,
            append: false,
            prepend: false,
            beforeInsert: null,
            afterInsert: null,
            bindingOptions: {
                ignoreUndefined: false,
                ignoreNull: false,
                ignoreEmptyString: false
            }
        }, options);

        if ($.type(data) === "array") {
            return processArray.call(this, template, data, settings);
        }

        if (!containsSlashes(template)) {
            $template = $(template);
            if (typeof template === 'string' && template.indexOf('#') === 0) {
                settings.isFile = false;
            }
        }

        isFile = settings.isFile || (typeof settings.isFile === "undefined" && (typeof $template === "undefined" || $template.length === 0));

        if (isFile && !settings.overwriteCache && templates[template]) {
            prepareTemplateFromCache(template, $that, data, settings);
        } else if (isFile && !settings.overwriteCache && templates.hasOwnProperty(template)) {
            addToQueue(template, $that, data, settings);
        } else if (isFile) {
            loadAndPrepareTemplate(template, $that, data, settings);
        } else {
            loadTemplateFromDocument($template, $that, data, settings);
        }
        return this;
    }

    function addTemplateFormatter(key, formatter) {
        if (formatter) {
            formatters[key] = formatter;
        } else {
            formatters = $.extend(formatters, key);
        }
    }

    function containsSlashes(str) {
        return typeof str === "string" && str.indexOf("/") > -1;
    }

    function processArray(template, data, settings) {
        settings = settings || {};
        var $that = this,
            todo = data.length,
            doPrepend = settings.prepend && !settings.append,
            done = 0,
            success = 0,
            errored = false,
            errorObjects = [],
            newOptions;

        if (settings.paged) {
            var startNo = (settings.pageNo - 1) * settings.elemPerPage;
            data = data.slice(startNo, startNo + settings.elemPerPage);
            todo = data.length;
        }

        newOptions = $.extend(
            {},
            settings,
            {
                async: false,
                complete: function () {
                    if (this.html) {
                        if (doPrepend) {
                            $that.prepend(this.html());
                        } else {
                            $that.append(this.html());
                        }
                    }
                    done++;
                    if (done === todo || errored) {
                        if (errored && settings && typeof settings.error === "function") {
                            settings.error.call($that, errorObjects);
                        }
                        if (settings && typeof settings.complete === "function") {
                            settings.complete();
                        }
                    }
                },
                success: function () {
                    success++;
                    if (success === todo) {
                        if (settings && typeof settings.success === "function") {
                            settings.success();
                        }
                    }
                },
                error: function (e) {
                    errored = true;
                    errorObjects.push(e);
                }
            }
        );

        if (!settings.append && !settings.prepend) {
            $that.html("");
        }

        if (doPrepend) data.reverse();
        $(data).each(function () {
            var $div = $("<div/>");
            loadTemplate.call($div, template, this, newOptions);
            if (errored) {
                return false;
            }
        });

        return this;
    }

    function addToQueue(template, selection, data, settings) {
        if (queue[template]) {
            queue[template].push({ data: data, selection: selection, settings: settings });
        } else {
            queue[template] = [{ data: data, selection: selection, settings: settings}];
        }
    }

    function prepareTemplateFromCache(template, selection, data, settings) {
        var $templateContainer = templates[template].clone();

        prepareTemplate.call(selection, $templateContainer, data, settings);
        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function uniqueId() {
        return new Date().getTime();
    }

    function urlAvoidCache(url) {
        if (url.indexOf('?') !== -1) {
            return url + "&_=" + uniqueId();
        }
        else {
            return url + "?_=" + uniqueId();
        }
    }

    function loadAndPrepareTemplate(template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        templates[template] = null;
        var templateUrl = template;
        if (settings.overwriteCache) {
            templateUrl = urlAvoidCache(templateUrl);
        }
        $.ajax({
            url: templateUrl,
            async: settings.async,
            success: function (templateContent) {
                $templateContainer.html(templateContent);
                handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings);
            },
            error: function (e) {
                handleTemplateLoadingError(template, selection, data, settings, e);
            }
        });
    }

    function loadTemplateFromDocument($template, selection, data, settings) {
        var $templateContainer = $("<div/>");

        if ($template.is("script") || $template.is("template")) {
            $template = $.parseHTML($.trim($template.html()));
        }

        $templateContainer.html($template);
        prepareTemplate.call(selection, $templateContainer, data, settings);

        if (typeof settings.success === "function") {
            settings.success();
        }
    }

    function prepareTemplate(template, data, settings) {
        bindData(template, data, settings);

        $(this).each(function () {
            var $templateHtml = $(template.html());
            if (settings.beforeInsert) {
                settings.beforeInsert($templateHtml, data);
            }
            if (settings.append) {

                $(this).append($templateHtml);
            } else if (settings.prepend) {
                $(this).prepend($templateHtml);
            } else {
                $(this).html($templateHtml);
            }
            if (settings.afterInsert) {
                settings.afterInsert($templateHtml, data);
            }
        });

        if (typeof settings.complete === "function") {
            settings.complete.call($(this));
        }
    }

    function handleTemplateLoadingError(template, selection, data, settings, error) {
        var value;

        if (typeof settings.error === "function") {
            settings.error.call(selection, error);
        }

        $(queue[template]).each(function (key, value) {
            if (typeof value.settings.error === "function") {
                value.settings.error.call(value.selection, error);
            }
        });

        if (typeof settings.complete === "function") {
            settings.complete.call(selection);
        }

        while (queue[template] && (value = queue[template].shift())) {
            if (typeof value.settings.complete === "function") {
                value.settings.complete.call(value.selection);
            }
        }

        if (typeof queue[template] !== 'undefined' && queue[template].length > 0) {
            queue[template] = [];
        }
    }

    function handleTemplateLoadingSuccess($templateContainer, template, selection, data, settings) {
        var value;

        templates[template] = $templateContainer.clone();
        prepareTemplate.call(selection, $templateContainer, data, settings);

        if (typeof settings.success === "function") {
            settings.success.call(selection);
        }

        while (queue[template] && (value = queue[template].shift())) {
            prepareTemplate.call(value.selection, templates[template].clone(), value.data, value.settings);
            if (typeof value.settings.success === "function") {
                value.settings.success.call(value.selection);
            }
        }
    }

    function bindData(template, data, settings) {
        data = data || {};

        processElements("data-content", template, data, settings, function ($elem, value) {
            $elem.html(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-append", template, data, settings, function ($elem, value) {
            $elem.append(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-prepend", template, data, settings, function ($elem, value) {
            $elem.prepend(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-content-text", template, data, settings, function ($elem, value) {
            $elem.text(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-innerHTML", template, data, settings, function ($elem, value) {
            $elem.html(applyFormatters($elem, value, "content", settings));
        });

        processElements("data-src", template, data, settings, function ($elem, value) {
            $elem.attr("src", applyFormatters($elem, value, "src", settings));
        }, function ($elem) {
            $elem.remove();
        });

        processElements("data-href", template, data, settings, function ($elem, value) {
            $elem.attr("href", applyFormatters($elem, value, "href", settings));
        }, function ($elem) {
            $elem.remove();
        });

        processElements("data-alt", template, data, settings, function ($elem, value) {
            $elem.attr("alt", applyFormatters($elem, value, "alt", settings));
        });

        processElements("data-id", template, data, settings, function ($elem, value) {
            $elem.attr("id", applyFormatters($elem, value, "id", settings));
        });

        processElements("data-value", template, data, settings, function ($elem, value) {
            $elem.attr("value", applyFormatters($elem, value, "value", settings));
        });

        processElements("data-class", template, data, settings, function ($elem, value) {
            $elem.addClass(applyFormatters($elem, value, "class", settings));
        });

        processElements("data-link", template, data, settings, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link", settings));
            $linkElem.html($elem.html());
            $elem.html($linkElem);
        });

        processElements("data-link-wrap", template, data, settings, function ($elem, value) {
            var $linkElem = $("<a/>");
            $linkElem.attr("href", applyFormatters($elem, value, "link-wrap", settings));
            $elem.wrap($linkElem);
        });

        processElements("data-options", template, data, settings, function ($elem, value) {
            $(value).each(function () {
                var $option = $("<option/>");
                $option.attr('value', this).text(this).appendTo($elem);
            });
        });

        processAllElements(template, data, settings);
    }

    function processElements(attribute, template, data, settings, dataBindFunction, noDataFunction) {
        $("[" + attribute + "]", template).each(function () {
            var $this = $(this),
                param = $this.attr(attribute),
                value = getValue(data, param);

            if (!valueIsAllowedByBindingOptions($this, value, settings)) {
                $this.remove();
                return;
            }

            $this.removeAttr(attribute);

            if (typeof value !== 'undefined' && dataBindFunction) {
                dataBindFunction($this, value);
            } else if (noDataFunction) {
                noDataFunction($this);
            }
        });
        return;
    }

    function valueIsAllowedByBindingOptions(bindingOptionsContainer, value, settings) {

        var bindingOptions = getBindingOptions(bindingOptionsContainer, settings);

        if (bindingOptions.ignoreUndefined && typeof value === "undefined") {
            return false;

        } else if (bindingOptions.ignoreNull && value === null) {
            return false;

        } else if (bindingOptions.ignoreEmptyString && value === "") {
            return false;

        } else {
            return true;
        }
    }

    function getBindingOptions(bindingOptionsContainer, settings) {

        var bindingOptions = {};

        // binding options passed as template attribute, i.e. 'data-binding-options'
        if (bindingOptionsContainer instanceof jQuery && bindingOptionsContainer.attr("data-binding-options")) {

            bindingOptions = $.parseJSON(bindingOptionsContainer.attr("data-binding-options"));
            bindingOptionsContainer.removeAttr("data-binding-options");

            // binding options defined in a "data-template-bind" attribute
        } else if (typeof bindingOptionsContainer === "object" && bindingOptionsContainer.hasOwnProperty('bindingOptions')) {
            bindingOptions = bindingOptionsContainer.bindingOptions;
        }

        // extend general bindingOptions with specific settings
        return $.extend({}, settings.bindingOptions, bindingOptions);
    }

    function processAllElements(template, data, settings) {
        $("[data-template-bind]", template).each(function () {
            var $this = $(this),
                param = $.parseJSON($this.attr("data-template-bind"));

            $this.removeAttr("data-template-bind");

            $(param).each(function () {
                var value;

                if (typeof (this.value) === 'object') {
                    value = getValue(data, this.value.data);
                } else {
                    value = getValue(data, this.value);
                }
                if (this.attribute) {

                    if (!valueIsAllowedByBindingOptions(this, value, settings)) {
                        $this.remove();
                        return;
                    }

                    switch (this.attribute) {
                        case "content":
                        case "innerHTML":
                            $this.html(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentAppend":
                            $this.append(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentPrepend":
                            $this.prepend(applyDataBindFormatters($this, value, this));
                            break;
                        case "contentText":
                            $this.text(applyDataBindFormatters($this, value, this));
                            break;
                        case "options":
                            var optionsData = this;
                            $(value).each(function () {
                                var $option = $("<option/>");
                                $option
                                    .attr('value', this[optionsData.value.value])
                                    .text(applyDataBindFormatters($this, this[optionsData.value.content], optionsData))
                                    .attr('selected', typeof this[optionsData.value.selected] == undefined ? false : this[optionsData.value.selected])
                                    .appendTo($this);
                            });
                            break;
                        default:
                            $this.attr(this.attribute, applyDataBindFormatters($this, value, this));
                    }
                }
            });
        });
    }

    function applyDataBindFormatters($elem, value, data, settings) {
        if (data.formatter && formatters[data.formatter]) {
            return (function (formatterSettings) {
                return formatters[data.formatter].call($elem, value, data.formatOptions, formatterSettings);
            })(settings);
        }
        return value;
    }

    function getValue(data, param) {
        if (param === "this") {
            return data;
        }
        var paramParts = param.split('.'),
            part,
            value = data;

        while ((part = paramParts.shift()) && typeof value !== "undefined" && value != null) {
            value = value[part];
        }

        return value;
    }

    function applyFormatters($elem, value, attr, settings) {
        var formatterTarget = $elem.attr("data-format-target"),
            formatter;

        if (formatterTarget === attr || (!formatterTarget && attr === "content")) {
            formatter = $elem.attr("data-format");
            if (formatter && typeof formatters[formatter] === "function") {
                var formatOptions = $elem.attr("data-format-options");
                return (function (formatterSettings) {
                    return formatters[formatter].call($elem[0], value, formatOptions, $.extend({}, formatterSettings));
                })(settings);
            }
        }

        return value;
    }
    addTemplateFormatter("nestedTemplateFormatter", function (value, options, internalSettings) {
        if (!options) {
            return;
        }

        if (typeof options === "string" && options[0] === "{") {
            options = $.parseJSON(options);
        }

        var parentElement = options.parentElement || "div";
        var template = options.template || options;

        //If a parent is specified, return it; otherwise only return the generated children.
        if (options.parentElement)
            return $("<" + parentElement + "/>").loadTemplate(template, value, internalSettings);
        else
            return $("<" + parentElement + "/>").loadTemplate(template, value, internalSettings).children();
    });
    $.fn.loadTemplate = loadTemplate;
    $.addTemplateFormatter = addTemplateFormatter;

})(jQuery);


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.ScrollReveal = factory();
  }
}(this, function(require, exports, module) {

/*
            _____                 ________                       __
           / ___/______________  / / / __ \___ _   _____  ____ _/ /
           \__ \/ ___/ ___/ __ \/ / / /_/ / _ \ | / / _ \/ __ `/ /
          ___/ / /__/ /  / /_/ / / / _, _/  __/ |/ /  __/ /_/ / /
         /____/\___/_/   \____/_/_/_/ |_|\___/|___/\___/\__,_/_/    v3.0.6

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   Copyright 2014–2016 Julian Lloyd (@jlmakes) Open source under MIT license
————————————————————————————————————————————————————————————————————————————————
    https://scrollrevealjs.org — https://github.com/jlmakes/scrollreveal.js
______________________________________________________________________________*/

(function() {
  var Tools, sr, _requestAnimationFrame;

  this.ScrollReveal = (function() {
    ScrollReveal.prototype.defaults = {
      // Animation
      origin      : 'bottom',
      distance    : '20px',
      duration    : 500,
      delay       : 0,
      rotate      : { x: 0, y: 0, z: 0 },
      opacity     : 0,
      scale       : 0.9,
      easing      : 'cubic-bezier( 0.6, 0.2, 0.1, 1 )',
      // Options
      container   : null,
      mobile      : true,
      reset       : false,
      useDelay    : 'always',
      viewFactor  : 0.2,
      viewOffset  : { top: 0, right: 0, bottom: 0, left: 0 },
      afterReveal : function( domEl ) {},
      afterReset  : function( domEl ) {}
    };

    function ScrollReveal( config ) {
      if ( window == this ) {
        return new ScrollReveal( config );
      }
      sr = this;
      sr.tools = new Tools();
      sr.tools.extend( sr.defaults, config || {} );

      if ( sr.tools.isMobile() && !sr.defaults.mobile ) {
        return false;
      } else if ( !sr.tools.isSupported('transform') || !sr.tools.isSupported('transition') ) {
        return console.warn('ScrollReveal is not supported in this browser.');
      }

      sr.store = {
        elements   : {},
        containers : []
      };
      sr.history     = [];
      sr.counter     = 0;
      sr.running     = false;
      sr.initialized = false;
      return sr;
    }

    ScrollReveal.prototype.reveal = function( selector, config, sync ) {
      var elements, container, elem, elemId;

      if ( config && config.container ) {
        container = config.container;
      } else if ( sr.defaults.container ) {
        container = sr.defaults.container;
      } else {
        container = window.document.documentElement;
      }

      elements = Array.prototype.slice.call( container.querySelectorAll( selector ) );
      if ( !elements.length ) {
        console.warn('reveal(\'' + selector + '\') failed: no elements found.');
        return sr;
      }
      for ( var i = 0; i < elements.length; i++ ) {
        elem   = {}
        elemId = elements[ i ].getAttribute('data-sr-id');

        if ( elemId ) {
          elem = sr.store.elements[ elemId ];
        } else {
          elem = {
            id       : ++sr.counter,
            domEl    : elements[ i ],
            seen     : false,
            revealed : false
          };
          elem.domEl.setAttribute( 'data-sr-id', elem.id );
        }

        sr.configure( elem, config || {} );
        sr.style( elem );
        sr.updateStore( elem );

        if ( !elem.revealed ) {
          elem.domEl.setAttribute( 'style',
              elem.styles.inline
            + elem.styles.transform.initial
          );
        }
      }
      if ( !sync ) {
        sr.record( selector, config );
        if ( sr.initTimeout ) {
          window.clearTimeout( sr.initTimeout );
        }
        sr.initTimeout = window.setTimeout( sr.init, 0 );
      }
      return sr;
    };

    ScrollReveal.prototype.configure = function( elem, config ) {
      if ( !elem.config ) {
        elem.config = sr.tools.extendClone( sr.defaults, config );
      } else {
        elem.config = sr.tools.extendClone( elem.config, config );
      }

      if ( elem.config.origin === 'top' || elem.config.origin === 'bottom' ) {
        elem.config.axis = 'Y';
      } else {
        elem.config.axis = 'X';
      }

      if ( elem.config.origin === 'top' || elem.config.origin === 'left' ) {
        elem.config.distance = '-' + elem.config.distance;
      }
    };

    ScrollReveal.prototype.style = function( elem ) {
      var config   = elem.config;
      var computed = window.getComputedStyle( elem.domEl );

      if ( !elem.styles ) {
        elem.styles = {
          transition : {},
          transform  : {},
          computed   : {}
        };
        elem.styles.inline           = elem.domEl.getAttribute('style') || '';
        elem.styles.inline          += '; visibility: visible; ';
        elem.styles.computed.opacity = computed.opacity;

        if ( !computed.transition || computed.transition == 'all 0s ease 0s' ) {
          elem.styles.computed.transition = '';
        } else {
          elem.styles.computed.transition = computed.transition + ', ';
        }
      }

      elem.styles.transition.instant = '-webkit-transition: ' + elem.styles.computed.transition + '-webkit-transform ' + config.duration / 1000 + 's ' + config.easing + ' 0s, opacity ' + config.duration / 1000 + 's ' + config.easing + ' 0s; ' +
                                               'transition: ' + elem.styles.computed.transition + 'transform ' + config.duration / 1000 + 's ' + config.easing + ' 0s, opacity ' + config.duration / 1000 + 's ' + config.easing + ' 0s; ';

      elem.styles.transition.delayed = '-webkit-transition: ' + elem.styles.computed.transition + '-webkit-transform ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's, opacity ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's; ' +
                                               'transition: ' + elem.styles.computed.transition + 'transform ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's, opacity ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's; ';

      elem.styles.transform.initial = ' -webkit-transform:';
      elem.styles.transform.target  = ' -webkit-transform:';
      generateTransform( elem.styles.transform );

      elem.styles.transform.initial += 'transform:';
      elem.styles.transform.target  += 'transform:';
      generateTransform( elem.styles.transform );

      function generateTransform( transform ) {
        if ( parseInt( config.distance ) ) {
          transform.initial += ' translate' + config.axis + '(' + config.distance + ')';
          transform.target  += ' translate' + config.axis + '(0)';
        }
        if ( config.scale ) {
          transform.initial += ' scale(' + config.scale + ')';
          transform.target  += ' scale(1)';
        }
        if ( config.rotate.x ) {
          transform.initial += ' rotateX(' + config.rotate.x + 'deg)';
          transform.target  += ' rotateX(0)';
        }
        if ( config.rotate.y ) {
          transform.initial += ' rotateY(' + config.rotate.y + 'deg)';
          transform.target  += ' rotateY(0)';
        }
        if ( config.rotate.z ) {
          transform.initial += ' rotateZ(' + config.rotate.z + 'deg)';
          transform.target  += ' rotateZ(0)';
        }
        transform.initial += '; opacity: ' + config.opacity + ';';
        transform.target  += '; opacity: ' + elem.styles.computed.opacity + ';';
      }
    };

    ScrollReveal.prototype.updateStore = function( elem ) {
      var container = elem.config.container;
      if ( container && sr.store.containers.indexOf( container ) == -1 ) {
        sr.store.containers.push( elem.config.container );
      }
      sr.store.elements[ elem.id ] = elem;
    };

    ScrollReveal.prototype.record = function( selector, config ) {
      var record = {
        selector : selector,
        config   : config
      };
      sr.history.push( record );
    };

    ScrollReveal.prototype.init = function() {
      sr.animate();
      for ( var i = 0; i < sr.store.containers.length; i++ ) {
        sr.store.containers[ i ].addEventListener( 'scroll', sr.handler );
        sr.store.containers[ i ].addEventListener( 'resize', sr.handler );
      }
      if ( !sr.initialized ) {
        window.addEventListener( 'scroll', sr.handler );
        window.addEventListener( 'resize', sr.handler );
        sr.initialized = true;
      }
      return sr;
    };

    ScrollReveal.prototype.handler = function() {
      if ( !sr.running ) {
        _requestAnimationFrame(function(){
          sr.running = true;
          sr.animate();
        });
      }
    };

    ScrollReveal.prototype.animate = function() {
      var elem, visible;

      sr.tools.forOwn( sr.store.elements, function( elemId ) {
        elem    = sr.store.elements[ elemId ];
        visible = sr.isElemVisible( elem );
        if ( visible && !elem.revealed ) {

          if ( elem.config.useDelay === 'always'
          || ( elem.config.useDelay === 'onload' && !sr.initialized )
          || ( elem.config.useDelay === 'once'   && !elem.seen ) ) {
            elem.domEl.setAttribute( 'style',
                elem.styles.inline
              + elem.styles.transform.target
              + elem.styles.transition.delayed
            );
          } else {
            elem.domEl.setAttribute( 'style',
                elem.styles.inline
              + elem.styles.transform.target
              + elem.styles.transition.instant
            );
          }
          elem.seen = true;
          queueCallback( 'reveal', elem );

        } else if ( !visible && elem.config.reset && elem.revealed ) {
          elem.domEl.setAttribute( 'style',
              elem.styles.inline
            + elem.styles.transform.initial
            + elem.styles.transition.instant
          );
          queueCallback( 'reset', elem );
        }
      });

      sr.running = false;

      function queueCallback( type, elem ) {
        var elapsed  = 0;
        var duration = 0;
        var callback = 'after';

        switch ( type ) {
          case 'reveal':
            duration = elem.config.duration + elem.config.delay;
            callback += 'Reveal';
            break;
          case 'reset':
            duration = elem.config.duration;
            callback += 'Reset';
            break;
        }

        if ( elem.timer ) {
          elapsed = Math.abs( elem.timer.started - new Date() );
          window.clearTimeout( elem.timer.clock );
        }

        elem.timer = { started: new Date() };

        elem.timer.clock = window.setTimeout(function() {
          elem.config[ callback ]( elem.domEl );
          elem.timer = null;
        }, duration - elapsed );
        return type === 'reveal' ? elem.revealed = true : elem.revealed = false;
      }
    };

    ScrollReveal.prototype.getContainer = function( container ) {
      if ( !container ) {
        container = window.document.documentElement;
      }
      var w = container.clientWidth;
      var h = container.clientHeight;
      return {
        width:  w,
        height: h
      };
    };

    ScrollReveal.prototype.getScrolled = function( container ) {
      if ( !container ) {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      } else {
        var offset = sr.getOffset( container );
        return {
          x: container.scrollLeft + offset.left,
          y: container.scrollTop  + offset.top
        };
      }
    };

    ScrollReveal.prototype.getOffset = function( domEl ) {
      var offsetTop    = 0;
      var offsetLeft   = 0;
      var offsetHeight = domEl.offsetHeight;
      var offsetWidth  = domEl.offsetWidth;

      do {
        if ( !isNaN( domEl.offsetTop ) ) {
          offsetTop += domEl.offsetTop;
        }
        if ( !isNaN( domEl.offsetLeft ) ) {
          offsetLeft += domEl.offsetLeft;
        }
      } while ( domEl = domEl.offsetParent );

      return {
        top    : offsetTop,
        left   : offsetLeft,
        height : offsetHeight,
        width  : offsetWidth
      };
    };

    ScrollReveal.prototype.isElemVisible = function( elem ) {
      var offset     = sr.getOffset( elem.domEl );
      var container  = sr.getContainer( elem.config.container );
      var scrolled   = sr.getScrolled( elem.config.container );
      var vF         = elem.config.viewFactor;

      var elemHeight = offset.height;
      var elemWidth  = offset.width;
      var elemTop    = offset.top;
      var elemLeft   = offset.left;
      var elemBottom = elemTop  + elemHeight;
      var elemRight  = elemLeft + elemWidth;

      return ( confirmBounds() || isPositionFixed() );

      function confirmBounds() {
        var top        = elemTop    + elemHeight * vF;
        var left       = elemLeft   + elemWidth  * vF;
        var bottom     = elemBottom - elemHeight * vF;
        var right      = elemRight  - elemWidth  * vF;

        var viewTop    = scrolled.y + elem.config.viewOffset.top;
        var viewLeft   = scrolled.x + elem.config.viewOffset.left;
        var viewBottom = scrolled.y - elem.config.viewOffset.bottom + container.height;
        var viewRight  = scrolled.x - elem.config.viewOffset.right  + container.width;

        return ( top    < viewBottom )
            && ( bottom > viewTop    )
            && ( left   > viewLeft   )
            && ( right  < viewRight  );
      }

      function isPositionFixed() {
        return ( window.getComputedStyle( elem.domEl ).position === 'fixed' );
      }
    };

    ScrollReveal.prototype.sync = function() {
      if ( sr.history.length ) {
        for ( var i = 0; i < sr.history.length; i++ ) {
          var record = sr.history[ i ];
          sr.reveal( record.selector, record.config, true );
        };
        sr.init();
      } else {
        console.warn('sync() failed: no reveals found.');
      }
      return sr;
    };

    return ScrollReveal;

  })();

  var Tools = (function() {

    Tools.prototype.isObject = function( object ) {
      return object !== null && typeof object === 'object' && object.constructor == Object;
    };

    Tools.prototype.forOwn = function( object, callback ) {
      if ( !this.isObject( object ) ) {
        throw new TypeError('Expected \'object\', but received \'' + typeof object + '\'.');
      } else {
        for ( var property in object ) {
          if ( object.hasOwnProperty( property ) ) {
            callback( property );
          }
        }
      }
    };

    Tools.prototype.extend = function( target, source ) {
      this.forOwn( source, function( property ) {
        if ( this.isObject( source[ property ] ) ) {
          if ( !target[ property ] || !this.isObject( target[ property ] ) ) {
            target[ property ] = {};
          }
          this.extend( target[ property ], source[ property ] );
        } else {
          target[ property ] = source[ property ];
        }
      }.bind( this ));
      return target;
    };

    Tools.prototype.extendClone = function( target, source ) {
      return this.extend( this.extend( {}, target ), source );
    };

    Tools.prototype.isMobile = function() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
    };

    Tools.prototype.isSupported = function( feature ) {
      var sensor    = document.createElement('sensor');
      var cssPrefix = 'Webkit,Moz,O,'.split(',');
      var tests     = ( feature + cssPrefix.join( feature + ',' ) ).split(',');

      for ( var i = 0; i < tests.length; i++ ) {
        if ( !sensor.style[ tests[ i ] ] === '' ) {
          return false;
        }
      }
      return true;
    };

    function Tools() {};
    return Tools;

  })();

  var _requestAnimationFrame = window.requestAnimationFrame       ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame;

}).call( this );

return this.ScrollReveal;

}));
