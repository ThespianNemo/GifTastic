// Initial array of movie genres
  var topics = ["Comedy", "Drama"];

//--------------------------------------FUNCTION TO RETRIEVE MOVIE INFO WITH API/AJAX AND FORMATTING INFO FOR BROWSER------------------------------

  // Re-renders the HTML to display the appropriate content
  function displayMovieInfo() {

    //data-name is the film genre entered by the user
    var topic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fFo32gLgYRAYGhpS0IAfdnoaH1NrIxYX&q="+topic +" film&limit=10&offset=0&rating=PG-13&lang=en";
   
    // Creating an AJAX call for the specific movie genre button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    //Clear the previous gifs  
    $(".movies-view").empty();

    for (var i = 0; i < response.data.length; i++) {

      // Creating a div to hold the movie
      var movieDiv = $("<div class='movie'>");       
                                    
      // Storing the rating data
      var rating = response.data[i].rating;
            
      // Creating an element to have the rating displayed
      var pRating = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      movieDiv.append(pRating);

      // Retrieving the URLs for the image
      var imgStillURL = response.data[i].images.fixed_height_still.url;
      var imgAnimateURL = response.data[i].images.fixed_height.url;

      // Creating an element to hold the image
      //<img src="https://media0.giphy.com/media/l3nWdq3wzhQBY2ili/giphy.gif_s.gif" data-still="https://media0.giphy.com/media/l3nWdq3wzhQBY2ili/giphy.gif_s.gif" data-animate="https://media0.giphy.com/media/l3nWdq3wzhQBY2ili/giphy.gif" data-state="still" class="gif">

      var image = $("<img>").attr("src", imgStillURL);

      image.attr("data-state","still")
      image.attr("data-animate",imgAnimateURL); 
      image.attr("data-still",imgStillURL);
      image.addClass("gif");

      // Appending the image
      movieDiv.append(image);

      // Displaying the movie and rating to the browswer
          
      $(".movies-view").prepend(movieDiv);
    }
  });
}

//---------------------------------------------------------------------------------------------------------

//---------------------FUNCTION TO CREATE MOVIE GENRE BUTTONS----------------------------------------------
  function renderButtons() {

    // Deleting the genres prior to adding new genres
    $("#buttons-view").empty();
    
    // Looping through the array of movie genres
    for (var i = 0; i < topics.length; i++) {

      // Dynamicaly generating buttons for each movie genre in the array
      var a = $("<button>");
      // Adding a class of genre-btn to our button
      a.addClass("genre-btn");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

//---------------------FUNCTION TO HANDLE WHEN THE ADD GENRE BUTTON IS CLICKED-----------------------------------
  $("#add-genre").on("click", function(event) {

    //Don't refresh the page
    event.preventDefault();

    // This line grabs the input from the textbox
    var topicInput = $("#movie-input").val().trim();

    // Adding movie genre from the textbox to the array
    topics.push(topicInput);
    $("#movie-input").val("");
    
    // Calling renderButtons which will handle the processing of our new movie genre buttons
    renderButtons();
  });

//--------------------------------------------------------------------------------------------------------------

  // Adding a click event listener to all elements with a class of "genre-btn"
  $(document).on("click", ".genre-btn", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  //---------------------FUNCTION TO ANIMATE/DEANIMATE GIFS WHEN CLICKED-----------------------------------

  $(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");

    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

      // Else set src to the data-still value
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });