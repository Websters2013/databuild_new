
( function() {
    "use strict";

    $( function() {

        $.each( $( '.contact-us__gallery' ), function() {

            new ContactSlider ( $( this ) );

        } );

        $.each( $( '.contact-us__map-container' ), function() {

            new ContactMap ( $( this ) );

        } );

    });

    var ContactSlider = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _swiper = _obj.find( '.swiper-container' );

        //private methods
        var _onEvents = function () {

            },
            _addSwiper = function () {

                new Swiper( _swiper, {
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
    var ContactMap = function( obj ){

        this.obj = obj;
        this.mapWrap = this.obj;

        //private properties
        var _self = this,
            _map,
            _markers = [],
            _data = JSON.parse( this.mapWrap.attr( 'data-map' ) ).marks,
            _zoom = JSON.parse( this.mapWrap.attr( 'data-map' ) ).zoom;

        //private methods
        var _constructor = function () {
                google.maps.event.addDomListener(window, 'load', _initMap);
                _onEvents();
            },
            _initMap = function () {

                var mapOptions = {
                    zoom: _zoom,
                    scrollwheel: false,
                    center:  new google.maps.LatLng( _data[ 0 ].poi_latitude, _data[ 0 ].poi_longitude ),
                    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ec4646"},{"visibility":"on"}]}]
                };

                _map = new google.maps.Map( _self.mapWrap[0], mapOptions );
                _setMarkers( _map );

            },
            _onEvents = function () {


            },
            _setMarkers = function ( map ) {

                $.each(_data, function ( i ) {

                    var curItem = this,
                        curLatLng = new google.maps.LatLng( curItem.poi_latitude, curItem.poi_longitude );

                    _markers[ i ] = new google.maps.Marker( {
                        position: curLatLng,
                        map: map,
                        clickable: false,
                        icon: {
                            url: 'img/map_marker.svg',
                            scaledSize: new google.maps.Size( 48, 48 )
                        }
                    } );

                });

            };

        _constructor();
    };

} )();




