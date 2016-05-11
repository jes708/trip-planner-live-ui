$(document).ready(function(){

    fillDropdowns();





  function fillDropdowns(){
    hotels.forEach(function(hotel){
    $('#hotel-choices').append($('<option></option>').attr('value', hotel.name).text(hotel.name));
    });

    restaurants.forEach(function(restaurant){
      $('#restaurant-choices').append($('<option></option>').attr('value', restaurant.name).text(restaurant.name));
    });

    activities.forEach(function(activity){
      $('#activity-choices').append($('<option></option>').attr('value', activity.name).text(activity.name));
    });
  }

  $('#hotel-button').on('click', function(){
    if (!$('#hotel-list').children().length) { 

      var $div = $('<div class="itinerary-item"></div>');
      var $span = $('<span>' + $('#hotel-choices').val() + '</span>');
      var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

      $div.append($span, $button);
      $('#hotel-list').append($div);

    } else {
      $('#hotel-list span').html($('#hotel-choices').val());
    }
  })

  $('#restaurant-button').on('click', function(){
    var $div = $('<div class="itinerary-item"></div>');
    var $span = $('<span>' + $('#restaurant-choices').val() + '</span>');
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

    $div.append($span, $button);
    $('#restaurant-list').append($div);
  })

  $('#activity-button').on('click', function(){
    var $div = $('<div class="itinerary-item"></div>');
    var $span = $('<span>' + $('#activity-choices').val() + '</span>');
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

    $div.append($span, $button);
    $('#activity-list').append($div);
  })

  $('#restaurant-list').on('click', '.remove', function() {
    $(this).parent().remove();
  });

  $('#hotel-list').on('click', '.remove', function() {
    $(this).parent().remove();
  });

  $('#activity-list').on('click', '.remove', function() {
    $(this).parent().remove();
  });

  $('.day-buttons').on('click', '.day-btn', function(){
    if(this.id !== 'day-add'){
      $('.current-day').removeClass('current-day');
      $(this).addClass('current-day');
      $('#day-title span').html("Day " + $(this).text());
    }
  })

  $('#day-add').on('click', function(){
    $('.current-day').removeClass('current-day');
    var val = Number($(this).prev().text()) + 1; 
    $('#day-title span').html("Day " + val);
    $('<button class="btn btn-circle day-btn current-day">' + val + '</button>').insertBefore($(this));
  })

  $('#day-title .remove').on('click', function(){
    var valToRemove = $(this).prev().text().match(/\d+/)[0];
    $('.current-day').remove(); 
    // $('.current-day').prev().addClass('current-day');
    // remove();
    resetNumbers();
  })

  function resetNumbers(){
    var count = 0;
    $.each($('.day-btn'), function(key, value){
      if(this.id !== 'day-add'){
        $(this).html(key + 1);
        count++; 
      }
    });
    $('.day-btn').last().prev().addClass('current-day');
     $('#day-title span').html("Day " + count);
  }



})

//id="' + $('#hotel-choices').val() + '"

// $('#restaurant-list').append('<div class="itinerary-item"><span>' + $('#restaurant-choices').val() + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
