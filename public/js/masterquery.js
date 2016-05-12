$(document).ready(function(){

    fillDropdowns();
    var day = 1;
    var hotelArr = [[]];
    var restArr = [[]];
    var actArr = [[]];

//fills dropdowns
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

//adds to list
  $('#hotel-button').on('click', function(){
    if(hotelArr[day - 1].length === 0){
      var $div = $('<div class="itinerary-item"></div>');
      var $span = $('<span>' + $('#hotel-choices').val() + '</span>');
      var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

      $div.append($span, $button)
      //.addClass('' + day);

      addHotel($div);
      var thisHotel = $('#hotel-choices').val()
      drawMarker('hotel', places[thisHotel.place]);
      console.log(hotelArr);
    } else {
      $('#hotel-list span').html($('#hotel-choices').val());
      //hotelArr[day - 1] = [$('#hotel-choices').val()];
    }
  })

  $('#restaurant-button').on('click', function(){
    var $div = $('<div class="itinerary-item"></div>');
    var $span = $('<span>' + $('#restaurant-choices').val() + '</span>');
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

    $div.append($span, $button);
    addRest($div);
  })

  $('#activity-button').on('click', function(){
    var $div = $('<div class="itinerary-item"></div>');
    var $span = $('<span>' + $('#activity-choices').val() + '</span>');
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

    $div.append($span, $button);
    addAct($div);
  })

//removes added list items
  $('#restaurant-list').on('click', '.remove', function() {
    $(this).parent().remove();
  });

  $('#hotel-list').on('click', '.remove', function() {
    $(this).parent().remove();
  });

  $('#activity-list').on('click', '.remove', function() {
    $(this).parent().remove();
  });

//Changes current-day
  $('.day-buttons').on('click', '.day-btn', function(){
    if(this.id !== 'day-add'){
      $('.current-day').removeClass('current-day');
      $(this).addClass('current-day');
      $('#day-title span').html("Day " + $(this).text());
      day = Number($(this).text());
      fixStuff(day);
           console.log(restArr);
    }
  })

//Day Add button
  $('#day-add').on('click', function(){

      addArraystoArrays();
      var val = Number($(this).prev().text()) + 1; 
      day = val;
      $('#day-title span').html("Day " + val);
      $('.current-day').removeClass('current-day');
      $('<button class="btn btn-circle day-btn current-day">' + val + '</button>').insertBefore($(this));

      fixStuff(day);
           console.log(restArr);
  })

// Day Title's Remove button
// Uses regexp to find number in day - not used right now
// resetNumbers goes through each button and renumbers them based on the count
// 'if' prevents last day from being removed 
  $('#day-title .remove').on('click', function(){
    if ($('.day-btn').length > 2) {
      var valToRemove = $(this).prev().text().match(/\d+/)[0];
      $('.current-day').remove(); 

      resetNumbers();

      removeHotelsByDay(valToRemove);
      removeRestsByDay(valToRemove);
      removeActsByDay(valToRemove);
      fixStuff(day);
    }
  })

//
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
     day = count;
  }

  function setDays(dayNum) {

  }
  function addArraystoArrays(){
    hotelArr.push([]);
    restArr.push([]);
    actArr.push([]);
  }

  function addHotel(div){
      $('#hotel-list').append(div);
      hotelArr[day - 1].push(div);
  }

  function addRest(div){
     $('#restaurant-list').append(div);
      console.log("DAY:" + day);

      restArr[day - 1].push(div);
           console.log(restArr);
  }

  function addAct(div){
     $('#activity-list').append(div);
      actArr[day - 1].push(div);
  }

  function removeHotelsByDay(dayNum){
    if (hotelArr[dayNum - 1][0]) hotelArr[dayNum - 1][0].remove();
      hotelArr.splice(dayNum - 1, 1);
  }

  function removeRestsByDay(dayNum){
      restArr[dayNum - 1].forEach(function(rest){
        rest.remove();
      })
      restArr.splice(dayNum - 1, 1);
  }

  function removeActsByDay(dayNum){
      actArr[dayNum - 1].forEach(function(act){
        act.remove();
      })
      actArr.splice(dayNum - 1, 1);
  }

  function fixStuff(dayNum){
      hotelArr.forEach(function(elem, index){
        if(elem[0]){
            if(index != dayNum - 1) {
                elem[0].hide();
            }
            else {
                elem[0].show();
            }
        }
      })

      restArr.forEach(function(restDay, dayIndex){ 
          console.log(dayNum)
        //Why is this night different from all other nights?
        //Manishtana Hallilah Hazeh. Mikol halelot. 
            restDay.forEach(function(rest, index){
            if(rest){
              console.log(rest);
              console.log(dayIndex);

              if(dayIndex != dayNum - 1) {
                  rest.hide();
              }
              else {
                  rest.show();
              }
            }
          })
      })


      actArr.forEach(function(actDay, dayIndex){
            actDay.forEach(function(act, index){
            if(act){
              if(dayIndex != dayNum - 1) {
                  act.hide();
              }
              else {
                  act.show();
              }
            }
          })
        //} 
      })



  }

})

//id="' + $('#hotel-choices').val() + '"

// $('#restaurant-list').append('<div class="itinerary-item"><span>' + $('#restaurant-choices').val() + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
