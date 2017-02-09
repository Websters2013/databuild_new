
( function() {
    "use strict";

    $( function() {

        $.each( $( '.site__hero-pic' ), function() {

            new HeroParallax ( $( this ) );

        } );

    });

    var HeroParallax = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window );

        //private methods
        var _onEvents = function () {

                _window.on({
                    scroll: function () {
                        _checkScroll( $( this ) )
                    }
                });
            },
            _checkScroll = function ( elem ) {

                var scrolled = elem.scrollTop(),
                    koof = 0 + ( ( scrolled * .25 )+'px');

                _obj.css({
                    'transform': 'scale(1.1) translateY( '+koof+' )'
                });

                console.log(koof);

            },
            _init = function () {
                _obj[0].list = _self;
                _onEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();




