"use strict";
( function(){

    $( function () {

        $.each( $( '.production_more' ), function() {

            new MoreProjects ( $( this ) );

        } );

    } );

    var MoreProjects = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnMore = _obj.find( '.btn-more' ),
            _actionUrl = _btnMore.data( 'action' ),
            _projectsWrapper = _obj.find( '.production__list' ),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function() {

                _btnMore.on( {

                    click: function() {
                        
                        _ajaxRequest();
                        return false;
                    }

                } );

            },
            _addContent = function( msg ){

                var hasItems = msg.has_items;

                $.each( msg.items, function() {

                    var curItem = this;

                    var newItem = $( '' +
                        '<a href="'+ curItem.href +'" class="production__item hidden" style="background-image: url('+curItem.pic+')">' +
                        '<div class="production__item-name">' +
                        ''+curItem.name+'' +
                        '<span>'+curItem.location+'</span>' +
                        '</div>' +
                        '<ul class="production__item-info">' +
                        '<li><i>'+curItem.area[0].icon+'</i><span>'+curItem.area[0].text+'<sup>2</sup></span></li>' +
                        '<li><i>'+curItem.parking[0].icon+'</i><span>'+curItem.parking[0].text+'</span></li>' +
                        '<li><i>'+curItem.shop[0].icon+'</i><span>'+curItem.shop[0].text+'</span></li>' +
                        '</ul>' +
                        '</a>'
                    );

                    _projectsWrapper.append( newItem );

                } );

                var newItems = _projectsWrapper.find( '.hidden' );

                setTimeout( function() {

                    _heightAnimation( hasItems, newItems );

                }, 50 );

            },
            _heightAnimation = function( hasItems, newItems ){

                newItems.each( function( i ){

                    _showNewItems( $( this ),i );

                } );

                if ( hasItems == 0 ){

                    _removeBtnMore();

                }

            },
            _showNewItems = function( item, index ){

                setTimeout( function() {
                    item.removeClass( 'hidden' );
                }, index * 100 );

            },
            _ajaxRequest = function() {

                var newsItem = _obj.find( '.production__item' );

                _request.abort();

                _request = $.ajax( {
                    url: _actionUrl,
                    data: {
                        loadedCount: newsItem.length
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'GET',
                    success: function ( msg ) {

                        _addContent( msg );

                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != 'abort' ) {
                            alert( 'Error!' );
                        }
                    }
                });

            },
            _removeBtnMore = function() {

                _btnMore.css( 'opacity', 0 );

                setTimeout( function() {

                    _btnMore.css( 'padding', 0 );

                    _btnMore.animate( {
                        height: 0
                    }, {
                        duration: 500,
                        complete: function() {
                            _btnMore.remove();
                        }
                    } );

                }, 300 );

            },
            _init = function() {

                _addEvents();
                _obj[ 0 ].obj = _self;

            };

        _init();
    };

} )();
