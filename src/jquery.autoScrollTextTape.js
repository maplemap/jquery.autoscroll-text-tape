import './styles.css';

/*
 *  Project: Auto scroll text tape jQuery plugin
 *  Description: jQuery plugin for autoscrolling of tape of text
 *  Author: Sergey Illarionov <easthunch@gmail.com> (http://maplemap.net/)
 *  License: MIT License
 */

;(function ( $, window, document, undefined ) {

    const pluginName = 'autoTextTape',
        settings = {
          speed: {
              slow: 100,
              normal: 50,
              fast: 10
          }
        },
        defaults = {
            speed: 'normal',
            tapeOffset: 0,
            moveOnHover: false
        };

    function Plugin( element, options ) {
        this.element = element;

        options = this._deleteUnValidateOptions(options);
        this.options = $.extend( {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init() {
            this.$wrapper = $(this.element);
            this.$wrapper.addClass("autoscroll-tape__wrapper");
            this.$wrapper.html( `<div class="autoscroll-tape__tape">${this.$wrapper.text()}</div>` );
            this.$textContainer = this.$wrapper.find(".autoscroll-tape__tape");

            this.startEngine();
        },

        startEngine() {
            this.compareWidthOfContainers();
            this.watchWindowResize();
        },

        restartEngine() {
            this.stopMoveTextTape(() => {
                this.tapeToStartPosition();
                this.compareWidthOfContainers();
            });
        },

        watchWindowResize() {
            $(window).resize(() => {
                clearTimeout(this.resizeTimeout);

                this.resizeTimeout = setTimeout(() => {
                    this.restartEngine.call(this)
                }, 500);
            });
        },

        compareWidthOfContainers() {
            this.wrapperWidth = this.$wrapper.innerWidth();
            this.txtContainerWidth = this.$textContainer.innerWidth();
            this.$textContainer.off('mouseenter mouseleave');

            if(this.options.moveOnHover) {
                if(this.txtContainerWidth > this.wrapperWidth) {
                    this.$textContainer.on({
                        mouseenter: () => {
                            this.startMoveTextTape()
                        },
                        mouseleave: () => {
                            this.stopMoveTextTape();
                        }
                    });
                } else {
                }
            } else {
                if(this.txtContainerWidth > this.wrapperWidth) {
                    this.startMoveTextTape()
                } else {
                    this.tapeToStartPosition();
                    this.stopMoveTextTape();
                }
            }
        },

        startMoveTextTape() {
            let containersWidthDiff = this.txtContainerWidth - this.wrapperWidth;
            containersWidthDiff = containersWidthDiff + this.options.tapeOffset;

            if(!this.tapeInterval) {
                this.tapeReverse = null;

                this.tapeInterval = setInterval(() => {
                    let txtContainerPosition = parseInt( this.$textContainer.css('left').slice(0, -2), 10 );

                    if(txtContainerPosition > -containersWidthDiff && !this.tapeReverse) {
                        this.$textContainer.css({left: txtContainerPosition - 1})
                    } else {
                        this.tapeReverse = true;
                    }


                    if(txtContainerPosition - this.options.tapeOffset && this.tapeReverse) {
                        this.$textContainer.css({left: txtContainerPosition + 1})
                    } else {
                        this.tapeReverse = false;
                    }
                }, settings.speed[this.options.speed]);
            }
        },

        stopMoveTextTape(callback) {
            if(this.tapeInterval) {
                clearInterval(this.tapeInterval);
                this.tapeInterval = null;
                this.tapeReverse = null;
            }

            if (callback) callback.call(this);
        },

        tapeToStartPosition() {
            this.$textContainer.animate({left: 0}, 'slow', () => {
                $(this).css({left: 'auto'});
            });
        },

        _deleteUnValidateOptions(options) {
            $.each(options, (key, value) => {
                if (key in defaults) {

                    switch (key) {
                      case 'speed':
                      case 'moveOnHover':
                        if(settings.speed[options.speed] === undefined) {
                            delete options.speed;
                        }

                        break;

                      case 'tapeOffset':
                        if(typeof options[key] !== typeof defaults[key]) {
                            delete options[key];
                        }

                        break;

                      default:
                    }
                }
            })

            return options;
        },
    };


    // You don't need to change something below:
    $.fn[pluginName] = function(options) {
        const args = arguments;

        if (options === undefined || typeof options === 'object') {
            return this.each(function() {

                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });

        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            let returns;

            this.each(function () {
                const instance = $.data(this, 'plugin_' + pluginName);

                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));
