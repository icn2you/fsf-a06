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

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then (function(res) {
      // DEBUG:
      console.log(res);
      var animalGIFs = res.data;

      animalGIFs.forEach(element => {
        animalImg = $('<img>').attr({
          src: element.images.fixed_width.url,
          alt: element.title 
        });

        $('#giffy-ness').append(animalImg);
      });
    });

    $('#animal').val('');
  });
});