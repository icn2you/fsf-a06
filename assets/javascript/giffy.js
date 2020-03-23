/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  03/21/2020
File:  giffy.js
Ver.:  0.1.0 20200321
       
This JS script is all about API calls and getting a litte "giffy." =P
******************************************************************************/

$(document).ready(function() {

  $('#get-giffy').on('click', function() {  
    var animal = $('#animal').val().trim(),
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=X6f0Yx1wXCdYoPDqRVxg1BSA17QzInZZ&q=" + animal + "&limit=10&rating";

    // DEBUG:
    // console.log(queryURL);
    
    // Clear input and previous results.
    $('#animal').val('');
    $('#giffy-ness').empty();

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then (function(res) {
      // DEBUG:
      console.log(res);
      var animalGIFs = res.data;

      animalGIFs.forEach(element => {
        $('#giffy-ness').append('<figure id="' + element.id + '"><figcaption>');
        $('#' + element.id + ' > figcaption').text("Rating: " + element.rating.toUpperCase());

        var animalImg = $('<img>').attr({
          src: element.images.fixed_height.url,
          alt: element.title,
          'data-state': 'animate',
          'data-animated': element.images.fixed_height.url,
          'data-still': element.images.fixed_height_still.url 
        });

        $('#' + element.id).append(animalImg);
      });
    });
  });

  // DEBUG:
  // $('body').on('click', function(event) {
  //   console.log(event.target.tagName + ' clicked!');
  // });

  // $(document).on('click', '.gif', function() {
  $(document).on('click', 'img[src$=".gif"]', function() {
    // DEBUG:
    console.log('GIF clicked!');

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