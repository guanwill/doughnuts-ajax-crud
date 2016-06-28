$(function(){

  $('form').on('submit', function(e){  //Default function to make page not reload on any submit form buttons
    e.preventDefault();
  });

//-----DISPLAYING DONUTS-----
  $.ajax({
    url: "https://api.doughnuts.ga/doughnuts/",
    type: "GET",
    dataType : "json",
  })
  .done(function( data ) {
     console.log(data)
     for(var i=0; i<data.length; i++){   //loops through data, and for each data, print out the following. Also pass the data's id to the container, edit, and delete button
        var p1 = $('<p>').text("Id:" + data[i].id);
        var p2 = $('<p>').text("Style:" + data[i].style);
        var p3 = $('<p>').text("Flavor: " + data[i].flavor);
        var edit = $('<button>').data('Donut-id', data[i].id).text('Edit').on('click', editDonut); //creates edit button with donut id and carries a function editDonut in which we will define later
        var del = $('<button>').data('Donut-id', data[i].id).text('Delete').on('click', deleteDonut);  //creates delete button with donut id and carries a function deleteDonut in which we will define later
        var container = $('<div>').attr('donut-data-id', data[i].id);
        $(container).append(p1, p2, p3, edit, del); //append all the paragraphs and buttons to a div container
        $('body').append(container) //lastly, append the container to the body tag for it to appear
     }
  })

//-----DELETE DONUT-----
  function deleteDonut(){
    var DonutId = $(this).data('Donut-id');  //grab specific donut id from the 'delete button' (remember we passed it earlier when we created the button?)
      $.ajax({
        url: 'https://api.doughnuts.ga/doughnuts/'+DonutId, //pass the DonutId variable you defined two lines above that carries the specific id
        method: 'DELETE',
        success: function(data){
          $('div[donut-data-id="'+DonutId+'"]').remove(); //remember your div container contains a specific id when we create it? we pass it the DonutId variable with specific id, so now it looks for a div with THAT id, then removes it entirely
        },
        error: function(data) {
        }
      })
    }

//-----UPDATING DONUT-----
    function editDonut(){
      var DonutId = $(this).data('Donut-id');  //Grabs the id when we click on the edit button as a specific id is attached to the edit button when we created it
      $('#save-donut').attr('donut-data-id', DonutId); //we now pass that id again to the 'save donut' button
      $('#edit').show(); //when we click on edit button, the edit form will show
    }

    $('#save-donut').on('click', function(){
      var DonutId = $('#save-donut').attr('donut-data-id'); //we are using the id attached to the 'save-donut' button earlier
      $.ajax({
        url: 'https://api.doughnuts.ga/doughnuts/'+DonutId, //pass DonutId here
        method: 'PATCH',
        data: {
          style: $('#input1').val(),  //Grab user input data for style
          flavor: $('#input2').val()  //grab user input data for flavor
        },
        success: function(data){
          console.log(data);
          $('div[donut-data-id="'+DonutId+'"] > p:eq(1)').text('Style:'+data.style);  //pass the donutId here. now we look for div container with this id, append style data to the SECOND paragraph we find in this div. First paragraph contains the ID
          $('div[donut-data-id="'+DonutId+'"] > p:eq(2)').text('Favor:'+data.flavor); //pass the donutId here. now we look for div container with this id, append flavor data to the THIRD paragraph we find in this div
          $('#edit').hide(); //after we hit the save button, hide the edit form
        }
      });
    });

    //-----CREATE DONUT-----
    $('#new').on('click', function(){
      $('#new-form').show();  //when you click on the new button, the new form appears
      $('#create-donut').on('click', function(){ //when you hit the create button.....
        $.ajax({
            url: 'http://api.doughnuts.ga/doughnuts',
            method: 'POST',
            data: {
              style: $('#input1').val(),  //grabs user input for style
              flavor: $('#input2').val()  //grabs user input for flavor
            },
            success: function(data){  //if successful upon grabbing data
              console.log(data);
              var p1 = $('<p>').text("Id:" + data.id);  //create a few paragraphs and then pass in what user have inputted into the form via .text. Same jazz as before. append it to container, then to body
              var p2 = $('<p>').text("Style:"+data.style);
              var p3 = $('<p>').text("Flavor: " + data.flavor);
              var edit = $('<button>').data('Donut-id', data.id).text('Edit').on('click', editDonut);
              var del = $('<button>').data('Donut-id', data.id).text('Delete').on('click', deleteDonut);
              var container = $('<div>').attr('donut-data-id', data.id);
              $(container).append(p1, p2, p3, edit, del);
              $('body').append(container);
              $('#new-form').hide();  //when new donut is created when user clicks create, hide the 'new form'
            }
        })
      })
    })


})
