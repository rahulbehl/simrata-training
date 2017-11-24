$(document).ready(function () {

    function resetAppointmentTextInput() {
        $('.appointment-save-text').val('');
        $('.events-update-text').val('');
    }

    $("#datepicker").datepicker({

        dateFormat: 'dd-mm-yy',
        minDate: 0,
        onSelect: function () {
            $('.events').show();
            $('.events-edit').hide();
            resetAppointmentTextInput();
        }
    });
    $("#timepicker").timepicker({});
    var appointments = {};
    function show() {
       $('.schedule').empty();
       $.each(appointments, function (i, v) {

        $('.schedule').append('<li><b>Date: </b>' + i + '<br><b>Appointment: </b>' + v + '<br><button class="events-edit-button btn-warning" data-date="' + i + '">Edit</button>  &nbsp; <button class="appointment-delete-button btn-danger" data-date="' + i + '">Delete</button></li>');
    });
   }
   $('.appointment-save').on('click', function (e) {
    e.preventDefault();
    var date = $('#datepicker').val() +"<b> Time: </b>"+ $('#timepicker').val();
    var time = $('#timepicker').val();
    if (!date) {

        alert('Please select a date');
        
        return;
    }
    if(!time){
        alert('Please select a time');
    }

    var appointment = $('.appointment-save-text').val();
    if (!$('.appointment-save-text').val()) {

        alert('Please add something to appointment');

        return;
    }
    if (appointments[date]) {
        alert(date + ' is already booked to : ' + appointments[date]);
    } else {

        appointments[date] = appointment;

        resetAppointmentTextInput();
    }
    show();
});
   $(document).on('click', '.events-edit-button', function () {
    $('.events-edit').show();
    $('.events').hide();
    var date = $(this).data('date');
    $('.events-update-date').text(date);
    $('.events-update-text').val(appointments[date]);
});
   $(document).on('click', '.appointment-delete-button', function () {
    $('.events-edit').hide();
    $('.events').show();
    var date = $(this).data('date');
    delete appointments[date];
    show();
});
   $(document).on('click', '.events-update', function () {
    $('.events-edit').show();
    $('.events').hide();
    var appointment = $('.events-update-text').val();
    if (!appointment) {
        alert('Appointment Cant be Empty');
        return;
    } else 
    {
        appointments[$('.events-update-date').text()] = appointment;
    }
    show();
});
});