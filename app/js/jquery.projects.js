
( function() {
    "use strict";

    $( function() {

        $.each( $( '.projects__gallery' ), function() {

            new ProjectSlider ( $( this ) );

        } );

    });

    var ProjectSlider = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj;

        //private methods
        var _onEvents = function () {

            },
            _addSwiper = function () {

                new Swiper( _obj, {
                    nextButton: _obj.find( '.swiper-button-next' ),
                    prevButton: _obj.find( '.swiper-button-prev' ),
                    pagination: _obj.find( '.swiper-pagination' ),
                    paginationClickable: true,
                    slidesPerView: 'auto',
                    centeredSlides: true
                });
            },
            _init = function () {
                _obj[0].list = _self;
                _onEvents();
                _addSwiper();
            };

        //public properties

        //public methods

        _init();
    };

} )();




