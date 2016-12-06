import styles from './styles.css';

/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 */

;(function ( $, window, document, undefined ) {

    const pluginName = 'autoTextTape',
          defaults = {
            speed: 50,
            tapeOffset: 5
          };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.checkDefaultOptions( this.init.call(this) );
    }

    Plugin.prototype = {
        init() {
            this.$wrapper = $(this.element);
            this.$wrapper.addClass( styles.wrapper );
            this.$wrapper.html( `<div class='${styles.tape}'>${this.$wrapper.text()}</div>` );
            this.$textContainer = this.$wrapper.find( `.${styles.tape}` );

            this.startEngine();
        },

        checkDefaultOptions(callback) {
            $.each(this._defaults, (key) => {
                switch(this.options[key]) {
                  case 'speed':
                    // ...
                    break;

                  case 'tapeOffset':
                    // ...
                    break;

                  default:
                    break;
                }
            })

            if(callback) callback();
        },

        startEngine() {
            this.compareWidthOfContainers();
            this.watchWindowResize();
        },

        restartEngine() {
            this.stopMoveTextTape( this.compareWidthOfContainers );
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

            (this.txtContainerWidth > this.wrapperWidth) ? this.startMoveTextTape(): this.stopMoveTextTape();
        },

        startMoveTextTape() {
            const containersWidthDiff = this.txtContainerWidth - this.wrapperWidth;

            if(!this.tapeInterval) {
                this.tapeReverse = null;

                this.tapeInterval = setInterval(() => {
                    const txtContainerPosition = parseInt( this.$textContainer.css('left').slice(0, -2), 10 );

                    if(txtContainerPosition > -containersWidthDiff && !this.tapeReverse) {
                        this.$textContainer.css({left: txtContainerPosition - 1})
                    } else {
                        this.tapeReverse = true;
                    }

                    if(txtContainerPosition && this.tapeReverse) {
                        this.$textContainer.css({left: txtContainerPosition + 1})
                    } else {
                        this.tapeReverse = false;
                    }
                }, this.options.speed);
            }
        },

        stopMoveTextTape(callback) {
            if(this.tapeInterval) {
                clearInterval(this.tapeInterval);
                this.tapeInterval = null;
                this.tapeReverse = null;
            }

            this.$textContainer.animate({left: 0}, 'slow', () => {
                $(this).css({left: 'auto'});
            });

            if (callback) callback.call(this);
        }
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
