$(function(){

  $('form').on('submit', function(e){  //Default function to make page not reload on any submit form buttons
    e.preventDefault();
  });

  $.ajax({
    url: "https://api.doughnuts.ga/doughnuts/",
    type: "GET",
    dataType : "json",
  })
  .done(function( data ) {
     console.log(data)
     for(var i=0; i<data.length; i++){
        var p1 = $('<p>').text("Id:" + data[i].id);
        var p2 = $('<p>').text("Style:" + data[i].style);
        var p3 = $('<p>').text("Flavor: " + data[i].flavor);
        var edit = $('<button>').data('Donut-id', data[i].id).text('Edit').on('click', editDonut);
        var del = $('<button>').data('Donut-id', data[i].id).text('Delete').on('click', deleteDonut);
        var container = $('<div>').attr('donut-data-id', data[i].id);
        $(container).append(p1, p2, p3, edit, del);
        $('body').append(container)
     }
  })

  function deleteDonut(){
    var DonutId = $(this).data('Donut-id');
      $.ajax({
        url: 'https://api.doughnuts.ga/doughnuts/'+DonutId,
        method: 'DELETE',
        success: function(data){
          $('div[donut-data-id="'+DonutId+'"]').remove();
        },
        error: function(data) {
        }
      })
    }

    $('#save-donut').on('click', function(){
      var DonutId = $('#save-donut').attr('donut-data-id');
      $.ajax({
        url: 'https://api.doughnuts.ga/doughnuts/'+DonutId,
        method: 'PATCH',
        data: {
          style: $('#input1').val(),
          flavor: $('#input2').val()
        },
        success: function(data){
          console.log(data);
          $('div[donut-data-id="'+DonutId+'"] > p:eq(1)').text('Style:'+data.style);  //this must match form name attr
          $('div[donut-data-id="'+DonutId+'"] > p:eq(2)').text('Favor:'+data.flavor);
          $('#edit').hide();
        }
      });
    });

    function editDonut(){
      var DonutId = $(this).data('Donut-id');
      $('#save-donut').attr('donut-data-id', DonutId);
      $('#edit').show();
    }


    //Create new donut!
    $('#new').on('click', function(){
      $('#new-form').show();
      $('#create-donut').on('click', function(){
        $.ajax({
            url: 'http://api.doughnuts.ga/doughnuts',
            method: 'POST',
            data: {
              style: $('#input1').val(),
              flavor: $('#input2').val()
            },
            success: function(data){
              console.log(data);
              var p1 = $('<p>').text("Id:" + data.id);
              var p2 = $('<p>').text("Style:"+data.style);
              var p3 = $('<p>').text("Flavor: " + data.flavor);
              var edit = $('<button>').data('Donut-id', data.id).text('Edit').on('click', editDonut);
              var del = $('<button>').data('Donut-id', data.id).text('Delete').on('click', deleteDonut);
              var container = $('<div>').attr('donut-data-id', data.id);
              $(container).append(p1, p2, p3, edit, del);
              $('body').append(container);
              $('#new-form').hide();
            }
        })
      })
    })


})
