(function($) {
    if (window.location.pathname.indexOf('customize_preview') > -1) {
        // $('#stash-preloader').css('display', 'none');
        $('.banner-img').css({
            'transform': 'none'
        });
        $('.banner-text').css({
            'opacity': '1'
        });
    }
})(jQuery);

jQuery(document).ready(function($){
    $window = $(window);
    modalOpen = false;
    load = new TimelineMax();

    if (window.location.pathname.indexOf('customize_preview') > -1) {
        var windowwidth = 1000;
    } else {
        var windowwidth = $(document).width();
        var windowwidthhalf = windowwidth/2;
    }
    var windowheight = $(window).outerHeight();

    $(window).resize(function(){
        if (window.location.pathname.indexOf('customize_preview') > -1) {
            windowwidth = 1000;
        } else {
            windowwidth = $(document).width();
            windowwidthhalf = windowwidth/2;
        }
        windowheight = $(window).outerHeight();
    });

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    $(window).on('beforeunload', function(){
        TweenMax.to("body", 1, {opacity:0, ease: Power3.easeInOut, onComplete: b4Unload}, 0);
        function b4Unload() {
            $(window).scrollTop(0);
        }
    });

    function removePre() {
        $('#stash-preloader').remove();
        $('.banner-img, .mobile-banner-img').css({
            'transform': 'none'
        });
        $('.banner-text').css({
            'opacity': '1'
        });
    }

    // $('#stash-ants').imagesLoaded(function(){
    //     postsWidth = $('#stash-ants').outerWidth();
    //     console.log(postsWidth);
    // });

    if(windowwidth > 740){
        TweenMax.to(".load-more-button", 0, {xPercent:100, autoAlpha:0});
    } else {
        TweenMax.to(".load-more-button", 0, {yPercent:100, autoAlpha:0});
    }

    // Header with Banner

    if ( $('#banner').length > 0 ) {
        $('body').addClass('has-banner');
        $('#header').addClass('transparent-for-now');
        $('body').addClass('over-banner');
    } else {
    }

    if ( $('#banner').length > 0 && windowwidth > 740)  {

        var bannerMaximized = true;
        var bannerScrolled = false;

        function hideBanner() {
            $('#banner').addClass('collapsed');
            $('.banner-expand').removeClass("maximized");
            $('.banner-expand').addClass("minimized");
            $('#header').removeClass('transparent-for-now');
            $('body').removeClass('over-banner');
            bannerScrolled = true;
            bannerMaximized = false;
        }
        function showBanner() {
            $('#banner').removeClass('collapsed');
            $('.banner-expand').removeClass("minimized");
            $('.banner-expand').addClass("maximized");
            $('#header').addClass('transparent-for-now');
            $('body').addClass('over-banner');
            bannerScrolled = false;
            bannerMaximized = true;
        }

        // Preloader Animation - delay until scroll into view
        $('#stash-ants').imagesLoaded(function(){
            $('#stash-ants').isotope(true).isotope('layout');
            var minimizepreloader = new TimelineMax()
                .add(TweenMax.to(".preloader-logo-inner", 0.8, {y:-100, ease: Quart.easeInOut}),0)
                .add(TweenMax.to("#stash-preloader", 1.4, {xPercent:-100, ease: Expo.easeInOut, onComplete:removePre}),0.7);
        });

        $(window).bind('scroll mousewheel DOMMouseScroll', function(event) {
            bannerScrollLeft = $window.scrollLeft();
            bannerDelta = event.originalEvent.wheelDelta;

            if(bannerScrolled == true) {
            } else {
                if(bannerDelta < 0) {
                    bannerScrolled = true;
                    var minimizepreloader = new TimelineMax()
                        .add(TweenMax.fromTo("#banner", 1.2, {opacity:1, ease:Expo.easeInOut, force3D: true},{opacity:0, ease:Expo.easeInOut, force3D: true, onComplete:hideBanner}),0)  
                        .add(TweenMax.fromTo("body.index-page #posts", 1.4, {opacity:0, xPercent:40, ease:Expo.easeInOut, force3D: true},{opacity:1, xPercent:0, ease:Expo.easeInOut, force3D: true}),0.4);  
                }
            }
        });


    } else {
        var bannerScrolled = true;
        if (window.location.pathname.indexOf('customize_preview') > -1) {
            $('#stash-ants').imagesLoaded(function(){
                setTimeout(function(){
                    var minimizepreloader = new TimelineMax()
                        .add(TweenMax.to(".preloader-logo-inner", 0.8, {y:-100, ease: Quart.easeInOut}),0)
                        .add(TweenMax.to("#stash-preloader", 1.4, {xPercent:-100, ease: Expo.easeInOut}),0.7)
                        .add(TweenMax.fromTo("body.index-page #posts", 1.4, {opacity:0, xPercent:40, ease:Expo.easeInOut, force3D: true},{opacity:1, xPercent:0, ease:Expo.easeInOut, force3D: true}),0.7)  
                        .add(TweenMax.fromTo("body.index-page #header", 0.5, {opacity:0, ease:Expo.easeInOut},{opacity:1, ease:Expo.easeInOut}),1.4);  
                    $('#stash-ants').isotope(true).isotope('layout');
                }, 3000);
            });
        } else {
            // Preloader Animation
            $('#stash-ants').imagesLoaded(function(){
                var minimizepreloader = new TimelineMax()
                    .add(TweenMax.to(".preloader-logo-inner", 0.8, {y:-100, ease: Quart.easeInOut}),0)
                    .add(TweenMax.to("#stash-preloader", 1.4, {xPercent:-100, ease: Expo.easeInOut}),0.7)
                    .add(TweenMax.fromTo("body.index-page #posts", 1.4, {opacity:0, xPercent:40, ease:Expo.easeInOut, force3D: true},{opacity:1, xPercent:0, ease:Expo.easeInOut, force3D: true}),0.7)  
                    .add(TweenMax.fromTo("body.index-page #header", 0.5, {opacity:0, ease:Expo.easeInOut},{opacity:1, ease:Expo.easeInOut}),1.4);  
                    $('#stash-ants').isotope(true).isotope('layout');
            });
        }
    }


    if ( $('body').hasClass('permalink') ) {
        $("article").fitVids();
        TweenMax.fromTo("#posts", 1, {opacity:0, y:100, ease:Power2.easeOut, force3D: true},{opacity:1, y:0, ease:Power2.easeOut, force3D: true});   
    }

    $(document).on("click",".share-toggle, .close-post-share",function(e){
        $(this).toggleClass("open");
        $(this).closest('.post').find('.post-share').toggleClass("open");
    });
    $(document).on('mouseleave',"article .inside, article .inner", function(){
        $('.share-toggle, .post-share, .standard-share, .post-share-toggle').removeClass('open');
    });

    $(document).on("click",".post-share-toggle",function(e){
        $(this).toggleClass("open");
        $(this).closest('.share').find('.standard-share').toggleClass("open");
    });

    // Page Transitions

    if ($('body').hasClass( "has-banner" ) && $("#stash-ants .post").length < 0){ 
        TweenMax.fromTo(".arr-down", 0.5, {opacity:0, x:-20},{opacity:1, x:0}, 0.4);
    }

    if ( $('#sidebar').length > 0 ) {
        TweenMax.to("#sidebar", 0, {yPercent:100});
    }

    if(windowwidth > 740){
        
        $(window)
        .on("scrollstart", function() {
            $('body').addClass('scrolling');
        })
        .on("scrollstop", function() {
            $('body').removeClass('scrolling');
        });
    } else {
        $(window).scroll(function() { 
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                TweenMax.to(".load-more-button", 0.6, {yPercent:0, autoAlpha:1});
            }
        });
    }

    // Scroll

    var scrollDirection = 'x',
        lastScroll = 0,
        firstScrollCycle = false,
        postsLoaderVisible = false;

    // Events

    $window.scroll(function(event) {
        scrollLeft = $window.scrollLeft();
        var scrollLeftWindow = scrollLeft + $(window).width();
        if (lastScroll > scrollLeft) {
            $('body').removeClass('no-title');
        } else {
            if (scrollLeft > 100) {
                $('body').addClass('no-title');
            }
        }
        lastScroll = scrollLeft;
    }); 

    scrollTime = 1.2; 
    scrollDistance = 120;      
    $('#stash-ants').imagesLoaded(function(){ 
        if (windowwidth < 740) {} else {
            $('#stash-ants, #header').bind('scroll mousewheel DOMMouseScroll', function(event) {
                if (scrollDirection != 'x') return;
                if (modalOpen == true) {return true;}
                if (bannerScrolled == false) {return true;}
                if ($('body').hasClass('permalink')) {return true;}
                if (windowwidth < 740) {return true;}

                event.preventDefault(); 
                var delta = event.originalEvent.wheelDelta/100 || -event.originalEvent.detail/3;
                var scrollTop = $window.scrollLeft();
                var windowWidth = $window.width();
                var finalScroll = scrollTop - parseInt(delta*scrollDistance);
                var postsWidth = $('#stash-ants').outerWidth();

                TweenMax.to($window, scrollTime, {
                    scrollTo : { x: finalScroll, autoKill:true },
                    ease: Power4.easeOut,
                    autoKill: true,
                    overwrite: 5                            
                });

                // load - mobile?
                // if(scrollTop + windowWidth >= postsWidth){
                //     $('#stash-ants').infinitescroll('retrieve');
                //     $('#stash-ants').infinitescroll('retrieve');
                // }

                if(scrollTop + windowWidth >= postsWidth - 1000){
                    TweenMax.to(".load-more-button", 0.6, {xPercent:0, autoAlpha:1});
                    postsLoaderVisible = true;
                } else {
                    TweenMax.to(".load-more-button", 0.6, {xPercent:100, autoAlpha:1});
                    postsLoaderVisible = false;
                }

                if(scrollTop > 100 && firstScrollCycle == false){
                    firstScrollCycle = true;
                }
                
                if(firstScrollCycle == false) {
                    $('#stash-ants').isotope(true).isotope('layout');
                }

                if ($('.post:last-of-type').hasClass('scrolled')) {

                    if(postsLoading == false) {
                        postsLoading = true;
                        console.log('load');
                        $('#stash-ants').infinitescroll('retrieve');
                        $('.load-more-button span').text(loadingText);
                        TweenMax.fromTo(".loading-overlay", 1.2, {autoAlpha:0, xPercent:100, ease:Expo.easeInOut, force3D: true},{autoAlpha:1, xPercent:0, ease:Expo.easeInOut, force3D: true});
                        postsLoaderVisible = false;
                        setTimeout(function(){postsLoading = false;}, 3500);
                        return false;
                    }             
                }
            });
        }
    });

    var postsLoading = false;

    $('.load-more-button, .posts-load').on('click', function(e){
        $('#stash-ants').infinitescroll('retrieve');
        $('.load-more-button span').text(loadingText);
        TweenMax.fromTo(".loading-overlay", 1.2, {autoAlpha:0, xPercent:100, ease:Expo.easeInOut, force3D: true},{autoAlpha:1, xPercent:0, ease:Expo.easeInOut, force3D: true});
        postsLoading = true;
        postsLoaderVisible = false;
        return false;
    });

    $(".post-audio, .post-video").click (function () {
      $(this).find ("iframe").css ("pointer-events", "auto");
    });
    $(".post-audio, .post-video").mouseleave (function () {
      $(this).find ("iframe").css ("pointer-events", "none");
    });

    // $('.load-more-button a').on('click', function(e){
    //     e.preventDefault();
    // });

    $(window).resize(function() {
        $('#stash-ants').isotope(true).isotope('layout');
        postsWidth = $('#stash-ants').width();
    });


    // Text posts

    $('.post').each(function(){
        var currentPost = this;
            if(windowwidth > 740){
                if($(this).hasClass( "post-photo" ) || $(this).hasClass( "post-photoset" )) {
                } else {
                    thisHeight = $(this).find('.inside .content').outerHeight();
                    thisMaxHeight = $(this).find('.inside').outerHeight();
                    thisDivID = $(this).attr('data-id');
                    thisDivURL = $(this).attr('data-href');
                    if(thisHeight > thisMaxHeight) {
                        $(this).find('.open-button').css('opacity', '1');
                        $(this).find('.open-button').css('visibility', 'visible');
                    }
                }

                if($(this).hasClass( "post-video" )) {
                    if($(this).find('.instagram-media').length > 0) {
                        $(this).addClass( "instagram-post" )
                    }
                }
            }
    });


    var headerTop = $('#header').offset().top;

    $(window).resize(function() {
    	var headerTop = $('#header').offset().top;
    });


    if(windowwidth > 740){
        $(window)
        .on("scrollstart", function() {
            $('body').addClass('scrolling');
        })
        .on("scrollstop", function() {
            $('body').removeClass('scrolling');
        });
    } else {
        $(window).scroll(function() { 
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                TweenMax.to(".load-more-button", 0.6, {yPercent:0, autoAlpha:1});
            }
        });
    }



    // Video header

        var windowWidth = $(window).outerWidth(),
            windowHeight = $(window).outerHeight(),
            vidContainer = $('.banner-youtube-video'),
            playerContainer = $('#player'),
            vidHeight = vidContainer.data('height'),
            vidWidth = vidContainer.data('width'),
            newVidHeight = windowWidth * ( vidHeight / vidWidth );

                vidContainer.height("100vh");
                playerContainer.height("100vh");
                
            // if ( vidContainer.height() > newVidHeight ) {
            //     vidContainer.height(newVidHeight);
            //     playerContainer.height(newVidHeight).width(windowWidth);
            // }

    $(window).resize(function() {
        var windowWidth = $(window).outerWidth(),
            windowHeight = $(window).outerHeight(),
            vidContainer = $('.banner-youtube-video'),
            playerContainer = $('#player'),
            vidHeight = vidContainer.data('height'),
            vidWidth = vidContainer.data('width'),
            newVidHeight = windowWidth * ( vidHeight / vidWidth );

                vidContainer.height("100vh");
                playerContainer.height("100vh");
                
            // if ( vidContainer.height() > newVidHeight ) {
            //     vidContainer.height(newVidHeight);
            //     playerContainer.height(newVidHeight).width(windowWidth);
            // }

    });

    /* Youtube Player */

    /* Mute Button */

    $(document).on("click",".yt-mute-button",function(e){
        if ( $(this).hasClass('off')) {
            player.unMute(); 
            $(this).removeClass('off');
            $(this).addClass('on');
        } else {
            player.mute(); 
            $(this).removeClass('on');
            $(this).addClass('off');
        }
    });

    /* Play Button */

    $(document).on("click",".yt-play-button",function(e){
        if ( $(this).hasClass('autoplay-0')) {
            player.playVideo(); 
            $(this).removeClass('autoplay-0');
            $(this).addClass('autoplay-1');
        } else {
            player.pauseVideo(); 
            $(this).removeClass('autoplay-1');
            $(this).addClass('autoplay-0');
        }
    });

    /* Next Button */

    $(document).on("click",".yt-next-button",function(e){
        player.nextVideo();
    });

    /* Previous Button */

    $(document).on("click",".yt-previous-button",function(e){
        player.previousVideo();
    });

    /* Vimeo Player */

    // Defaults

    if (VIMEO_BANNER) {

        var video = $("#banner-vimeo-video");

        if ( $('.vimeo-play-button').hasClass('autoplay-0')) {
            video.vimeo("pause");
        } else {
            video.vimeo("play");
        }

        if ( $('.vimeo-mute-button').hasClass('off')) {
            video.vimeo("setVolume", 0);
        } else {
            video.vimeo("setVolume", 1);
        }

    }

    //toggle play/pause
    $(document).on("click",".vimeo-play-button",function(e){
        if ( $(this).hasClass('autoplay-0')) {
            video.vimeo("play");
            $(this).removeClass('autoplay-0');
            $(this).addClass('autoplay-1');
        } else {
            video.vimeo("pause");
            $(this).removeClass('autoplay-1');
            $(this).addClass('autoplay-0');
        }
    });
                            
    //toggle mute/unmute
    $(document).on("click",".vimeo-mute-button",function(e){
        if ( $(this).hasClass('off')) {
            video.vimeo("setVolume", 1); 
            $(this).removeClass('off');
            $(this).addClass('on');
        } else {
            video.vimeo("setVolume", 0);
            $(this).removeClass('on');
            $(this).addClass('off');
        }
    });

    /* Overlay Video */

    $(document).on("click",".banner-play svg",function(e){
        $('.banner-play').toggleClass("opened");
        $('.overlay-video').toggleClass("opened");
    });

    $('body').click(function(e) {
        if (!$(e.target).closest('.overlay-video-container, .overlay-video-container iframe').length && $('.overlay-video').hasClass( "opened" )){
            $('.banner-play').removeClass("opened");
            $('.overlay-video').removeClass("opened");
        }
    });

    $(document).keyup(function(e) {
        if ( $('.overlay-video').hasClass( "opened" ) ) {
            if (e.keyCode == 27 ) {
                $('.banner-play').removeClass("opened");
                $('.overlay-video').removeClass("opened");
                return;
            }
        }
    });

    // $('.banner-play svg').on('click', function() {
    //     $(".overlay-video-player")[0].src += "?autoplay=1";
    // });

    /*fix vid*/

    (function () {

        function resizeVideo(){
            var $video = $('.tumblr_video_container');

            var videoWidth = $video.width(),
                videoHeight = $video.height(),
                videoRatio = (videoHeight/videoWidth),

                newWidth = 560,
                newHeight = Math.floor(newWidth*videoRatio),

                mobileWidth = 260,
                mobileHeight = Math.floor(mobileWidth*videoRatio);

            if ($(window).width() < 640) {
                $video.css('width', '100%').css('height', mobileHeight);
                $video.find('iframe').height(mobileHeight);
            }
            else {
                $video.css('width', '100%').css('height', newHeight);
                $video.find('iframe').height(newHeight);
            }

            $(window).resize(function() {
                if ($(window).width() < 640) {
                    $video.css('width', '100%').css('height', mobileHeight);
                }
                else {
                    $video.css('width', '100%').css('height', newHeight);
                }
            });
        }
        resizeVideo();

    })();



    // $('.stash-photoset.ips').stashIPS();


    $(window).scroll(function(){
        if ($("body").scrollTop() > 50) {
            $('.footer-icon').css({
                'visibility': 'visible',
                'opacity': '1'
            });
        } else {
            $('.footer-icon').css({
                'visibility': 'hidden',
                'opacity': '0'
            });
            $('.banner-text').css({
                'opacity': '1'
            });
        }
    });

    if ($("body").scrollTop() > 50) {
        $('.banner-text').css({
            'opacity': '1'
        });
    }

    $(window).scroll(function() {
        if( $(this).scrollTop() > 50 ) {
        } else {
            $('.banner-text').css({
                'opacity': '1'
            });
        }
    });


    // Soundcloud

    // $(document).on("click",".soundcloud-close.opened",function(e){
    //     $('.soundcloud-close').removeClass("opened");
    //     $('.soundcloud-close').addClass("closed");
    //     $('.soundcloud-player').addClass("closed");
    // });

    // $(document).on("click",".soundcloud-close.closed",function(e){
    //     $('.soundcloud-close').addClass("opened");
    //     $('.soundcloud-close').removeClass("closed");
    //     $('.soundcloud-player').removeClass("closed");
    // });

    // $(window).scroll(function() {
    //     if( $(this).scrollTop() > 2 ) {
    //         $('.soundcloud-close').removeClass("opened");
    //         $('.soundcloud-close').addClass("closed");
    //         $('.soundcloud-player').addClass("closed");
    //     } else {
    //     }
    // });



    // Banner

    var initController = new ScrollMagic.Controller();
    var controller = new ScrollMagic.Controller();
    $(document).on('click', '#banner h1.banner-logo, #banner .arr-down', function(e){
        e.preventDefault();
        $('#header').removeClass('transparent-for-now');
        var minimizepreloader = new TimelineMax()
            .add(TweenMax.fromTo("#banner", 1.2, {opacity:1, ease:Expo.easeInOut, force3D: true},{opacity:0, ease:Expo.easeInOut, force3D: true, onComplete:hideBanner}),0)  
            .add(TweenMax.fromTo("body.index-page #posts", 1.4, {opacity:0, xPercent:40, ease:Expo.easeInOut, force3D: true},{opacity:1, xPercent:0, ease:Expo.easeInOut, force3D: true}),0.4); 
    });

    $(document).on('click', '#backToTop, .backToTop', function(e){
        e.preventDefault();
        TweenLite.to( window, 1, {scrollTo:{y: 0 }, ease:Power2.easeInOut});
    });



    // banner fade
    var bannerfade = TweenMax.to(".banner-text, .arr-down, .banner-logo, .banner-video-options, .banner-social", 1, {opacity:0, triggerHook:0});
    var banner = new ScrollMagic.Scene({triggerElement: "#banner", duration: "100%", triggerHook: "onLeave"})
                    .setTween(bannerfade)
                    .addTo(controller);

    if ( $('#banner').length > 0 ) {
        if(windowwidth > 740){
            // sidebar/logo fade in
            function showLogo() {$('.logo, .sidebar-toggle, .header-description').addClass('show');}
            var logofade = TweenMax.to(".header-description", 0.7, {opacity:1, ease:Power2.easeOut, triggerHook:0});
            var logobanner = new ScrollMagic.Scene({triggerElement: ".page-container", duration: 0.7, triggerHook: 0, ease:Power2.easeOut, onComplete: showLogo})
                            .setTween(logofade)
                            .addTo(controller);

            var bannerHeight = $('#banner').outerHeight();
            $(window).resize(function(){
                bannerHeight = $('#banner').outerHeight();
            });
        } 

        // Scroll Logo
        $window.scroll(function(event) {
            if ($window.scrollTop() > bannerHeight) { 
                $('body').addClass('scroll-logo-zone');
            } else {
                $('body').removeClass('scroll-logo-zone');
            }
        });


    } else {

        // Scroll Logo
        $window.scroll(function(event) {
            if ($window.scrollTop() > 80) {
                $('body').addClass('scroll-logo-zone');
            } else {
                $('body').removeClass('scroll-logo-zone');
            }
        });

        // home description
        var leadout = TweenMax.to(".home-description", 0.7, {opacity:0, ease:Power2.easeOut, triggerHook:0});
        var leadbanner = new ScrollMagic.Scene({triggerElement: "body", duration: 100, triggerHook: 0, ease:Power2.easeOut})
                        .setTween(leadout)
                        .addTo(controller);

    }

    if ( $('.home-description .description').text().length == 0 ) {
        $('.home-description').css('display','none');
    }




    // Stop/Start Scroll

    function disableMenuScrolling() {

        var selScrollable = '#sidebar .wrap';
        // Uses document because document will be topmost level in bubbling
        $(document).on('touchmove',function(e){
          e.preventDefault();
        });
        // Uses body because jQuery on events are called off of the element they are
        // added to, so bubbling would not work if we used document instead.
        $('body').on('touchstart', selScrollable, function(e) {
          if (e.currentTarget.scrollTop === 0) {
            e.currentTarget.scrollTop = 1;
          } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
            e.currentTarget.scrollTop -= 1;
          }
        });
        $('body').on('touchmove', selScrollable, function(e) {
            // Only block default if internal div contents are large enough to scroll
            // Warning: scrollHeight support is not universal. (http://stackoverflow.com/a/15033226/40352)
            if($(this)[0].scrollHeight > $(this).innerHeight()) {
                e.stopPropagation();
            }
        });

    }

    function enableMenuScrolling() {
        $(document).off('touchmove');
        $('body').off('touchmove touchstart', '#sidebar .wrap')
    }

    /* Sidebar */

    var headerHeight = $('#header').height();

    /* push menu left */ 
    $(document).on('click', '.close-sidebar, .sidebar-toggle-container', function() {
        openSidebar();
    });



    function openSidebar() {
        if ( $('.sidebar-toggle').hasClass( "open" ) ) {
            closeSidebar();
            return;
        }
        $('body').addClass('sidebar-open');
        $('.sidebar-toggle').addClass('open');
        disableMenuScrolling();
        $('body').css('overflow','hidden');
        TweenMax.fromTo("#sidebar", 0.6, {autoAlpha:0, yPercent:100}, {autoAlpha:1, yPercent:0, ease:Power2.easeInOut} );
        TweenMax.fromTo(".sidebar-left", 1, {opacity:0, ease:Power2.easeInOut}, {opacity:1, ease:Power2.easeInOut} );
        TweenMax.fromTo(".sidebar-right", 1, {opacity:0, ease:Power2.easeInOut}, {opacity:1, ease:Power2.easeInOut} );
        TweenMax.fromTo(".instagram-fullscreen", 0.8, {autoAlpha:0, yPercent:100}, {autoAlpha:1, yPercent:0, ease:Power2.easeInOut});
    
        if(windowwidth > 740 && $('body').hasClass( "has-scrollbar" )){
            TweenMax.to(".load-more-button", 0.6, {xPercent:100, autoAlpha:0});
        }
    }

    function closeSidebar () {
        enableMenuScrolling();
        $('.sidebar-toggle').removeClass('open');
        $('body').removeClass('sidebar-open');
        // TweenLite.to('#sidebar .inner', 0, { display: "none", });
        $('body').css('overflow','');

        TweenMax.fromTo("#sidebar", 0.6, {autoAlpha:1, yPercent:0}, {autoAlpha:0, yPercent:100, ease:Power2.easeInOut} );
        TweenMax.fromTo(".sidebar-left", 1, {opacity:1, ease:Power2.easeInOut}, {opacity:0, ease:Power2.easeInOut} );
        TweenMax.fromTo(".sidebar-right", 1, {opacity:1, ease:Power2.easeInOut}, {opacity:0, ease:Power2.easeInOut} );
        TweenMax.fromTo(".instagram-fullscreen", 0.4, {autoAlpha:1, yPercent:0}, {autoAlpha:0, yPercent:100, ease:Power2.easeInOut});

        if (postsLoaderVisible == true && windowwidth > 740 && $('body').hasClass( "has-scrollbar" )) {
            TweenMax.to(".load-more-button", 0.6, {xPercent:0, autoAlpha:1});
        }
    }

    $('body').click(function(e) {
        if (!$(e.target).closest('#sidebar .wrap, .sidebar-toggle, .instagram-fullscreen, .sidebar-toggle-container').length && $('.sidebar-toggle').hasClass( "open" )){
            closeSidebar();
        }
    });

    $(document).keyup(function(e) {
        if ( $('.sidebar-toggle').hasClass( "open" ) ) {
            if (e.keyCode == 27 ) {
                closeSidebar();
                return;
            }
        }
    });


    // Customize Screen

    if (window.location.pathname.indexOf('customize_preview') > -1) {
        $('.customize-demo').addClass('visible');
        return;
    }

});