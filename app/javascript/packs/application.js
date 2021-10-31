// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import WOW from "wow"
import masonry from "masonry"
import isotope from "isotope"

Rails.start()
Turbolinks.start()
ActiveStorage.start()


var Imgs = [
  'https://tympanus.net/Development/GridLoadingEffects/images/1.jpg',
  'https://tympanus.net/Development/GridLoadingEffects/images/3.jpg',
  'https://tympanus.net/Development/GridLoadingEffects/images/8.jpg',
  'https://tympanus.net/Development/GridLoadingEffects/images/10.png',
  'https://tympanus.net/Development/GridLoadingEffects/images/14.png',
  'https://tympanus.net/Development/GridLoadingEffects/images/9.jpg',
  'https://tympanus.net/Development/GridLoadingEffects/images/13.png',
  'https://tympanus.net/Development/GridLoadingEffects/images/12.png',
  'https://tympanus.net/Development/GridLoadingEffects/images/4.jpg',
  'https://www.deezer-blog.com/assets/sites/2/poster3.jpg',
  'https://www.deezer-blog.com/assets/sites/2/poster2.jpg'
];

$(document).ready(function () {
  var $grid = $('#grid-content');

  $.fn.revealItems = function ($items) {

    var iso = this.data('isotope');
    var itemSelector = iso.options.itemSelector;
    $items.hide();
    $(this).append($items);
    $items.imagesLoaded().progress(function (imgLoad, image) {
      var $item = $(image.img).parents(itemSelector);
      $item.show();
      iso.appended($item);
    });

    return this;
  }
  $grid.isotope({
    containerStyle: null,
    masonry: {
      columnWidth: 300,
      gutter: 15
    },
    itemSelector: '.grid-item',
    filter: '*',
    transitionDuration: '0.4s'
  });


  $grid.imagesLoaded().progress(function () {
    $grid.isotope();
  })

  /*$grid.imagesLoaded( function() {
     $grid.isotope({
      containerStyle: null,
      masonry:{
        columnWidth: 300,
        gutter: 15
      },
      itemSelector: '.grid-item',
      filter : '*',
      transitionDuration: '0.4s'
    });
  });*/

  function GenerateItems() {
    var items = '';
    for (var i = 0; i < 20; i++) {
      items += '<div class="grid-item c' + (i % 9) + ' wow fadeInUp" ><img src="' + Imgs[i % Imgs.length] + '" /></div>';
    }
    return $(items);
  }

  // SimpleInfiniteScroll
  function Infinite(e) {
    if ((e.type == 'scroll') || e.type == 'click') {
      var doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var bottom = top + $(window).height();
      var docBottom = $(document).height();

      if (bottom + 50 >= docBottom) {
        $grid.revealItems(GenerateItems());
      }
    }
  }

  $grid.revealItems(GenerateItems());

  $(document).on('click', '.filter-item', function () {
    $('.filter-item.active').removeClass('active');
    $(this).addClass('active');
    var f = $(this).data('f');
    console.log(f);
    $grid.find('.grid-item').removeClass('wow').removeClass('fadeInUp');
    $grid.isotope({ filter: f });

  })


  $(window).resize(function () {
    var margin = 40;
    var padding = 15;
    var columns = 0;
    var cWidth = 300;
    var windowWidth = $(window).width();

    var overflow = false;
    while (!overflow) {
      columns++;
      var WidthTheory = ((cWidth * columns) + ((columns + 1) * padding) + margin);
      if (WidthTheory > windowWidth)
        overflow = true;
    }
    if (columns > 1)
      columns--;

    var GridWidth = ((cWidth * columns) + ((columns + 1) * padding) + margin);

    if (GridWidth != $('#grid').width()) {
      $('#grid').width(GridWidth);
    }
  });
  $(window).scroll(Infinite);
  new WOW().init();

})