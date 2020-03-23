/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  03/21/2020
File:  giffy.js
Ver.:  0.1.0 20200321
       
This JS script is all about API calls and getting a litte "giffy." =P
******************************************************************************/

$(document).ready(function() {
  var animals = ['aardvark', 'badger', 'chipmunk', 'dophin', 'elephant', 'fox', 'giraffe', 'hyena', 'ignauna', 'jaguar', 'kangaroo', 'lemming', 'moose', 'narwhal', 'octopus', 'platypus', 'quail', 'raccoon', 'snake', 'tarantula', 'uakaris', 'vole', 'wolf', 'xerus', 'yak', 'zebra'];

  var refreshAnimals = (function me() {
    $('#animal-btns').empty();

    animals.sort();

    animals.forEach(element => {
      var animalBtn = $('<button>').attr({
        type: 'button',
        id: element,
      }).addClass('btn btn-secondary animal-btn').text(element);

      $('#animal-btns').append(animalBtn);
    });

    return me;
  }());

  $(document).on('click', 'button', function(event) {
    var animal = $('#animal').val().trim();
    
    // Clear input and previous results.
    $('#animal').val('');
    $('#giffy-ness').empty();

    if (!animal) {
      animal = event.target.id;
    }
    else {
      animals.push(animal);
      refreshAnimals();
    }

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=X6f0Yx1wXCdYoPDqRVxg1BSA17QzInZZ&q=" + animal + "&limit=10&rating";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then (function(res) {
      // DEBUG:
      // console.log(res);
      
      var animalGIFs = res.data;

      animalGIFs.forEach(element => {
        $('#giffy-ness').append('<figure id="' + element.id + '"><figcaption>');
        $('#' + element.id + ' > figcaption').text("Rating: " + element.rating.toUpperCase());

        var animalImg = $('<img>').attr({
          src: element.images.fixed_height_still.url,
          alt: element.title,
          'data-state': 'still',
          'data-animated': element.images.fixed_height.url,
          'data-still': element.images.fixed_height_still.url 
        });

        $('#' + element.id).append(animalImg);
      });
    });
  });

  $(document).on('click', 'img[src$=".gif"]', function() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr({
        src: $(this).attr('data-animated'),
        'data-state': 'animate'
      });
    }
    else {
      $(this).attr({
        src: $(this).attr('data-still'),
        'data-state': 'still'
      });
    }
  });
});