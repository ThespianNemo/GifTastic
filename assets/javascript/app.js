// Initial array of movie genres
  var topics = ["Comedy", "Drama"];

  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayMovieInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fFo32gLgYRAYGhpS0IAfdnoaH1NrIxYX&q="+topic +" movie&limit=10&offset=0&rating=PG-13&lang=en";
   
    // Creating an AJAX call for the specific movie genre button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
console.log(response);
        for (var i = 0; i < response.data.length; i++) {

      // Creating a div to hold the movie
     
                var movieDiv = $("<div class='movie'>");       
                                    
      // Storing the rating data
                var rating = response.data[i].rating;
            
      // Creating an element to have the rating displayed
                var pRating = $("<p>").text("Rating: " + rating);

      // Displaying the rating
                movieDiv.append(pRating);

      // Retrieving the URL for the image
                var imgURL = response.data[i].images.fixed_width_still.url;

      // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);

      // Appending the image
                movieDiv.append(image);

      // Putting the entire movie above the previous movies
                $("#movies-view").prepend(movieDiv);
            }
        //}
    });
  }

  // Function for displaying movie data
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

  // This function handles events where a movie button is clicked
  $("#add-genre").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topicInput = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(topicInput);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "genre-btn"
  $(document).on("click", ".genre-btn", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();