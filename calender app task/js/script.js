$(document).ready(function () {

    function resetAppointmentTextInput() {
        $('.appointment-save-text').val('');
        $('.appointment-update-text').val('');
    }

    $("#datepicker").datepicker({
        onSelect: function () {
            $('.appointment-add').show();
            $('.appointment-edit').hide();
            resetAppointmentTextInput();
        }
    });

    var appointments = {}; //this object will hold all appointments

    function showAllAppointments() {
        //remove list displayed of all appointments
        $('.appointment-list').empty();
        $.each(appointments, function (i, v) {
            //append fresh appointments from list
            $('.appointment-list').append('<li>Date:' + i + '<br>Appointment ' + v + ' <button class="appointment-edit-button" data-date="' + i + '">Edit</button><button class="appointment-delete-button" data-date="' + i + '">Delete</button></li>');
        });
    }

    //Submit new appointment
    $('.appointment-save').on('click', function (e) {
        e.preventDefault();
        //by default page will refresh on button click
        //this e.preventDefault prevents original functionality that will happen while clicking buttom

        //now we dont have any refresh of the page. we can make our own code below

        var date = $('#datepicker').val();
        if (!date) {
            //if no date is selected. show alert
            alert('Please select a date');
            //end execution of next oode
            return;
        }

        var appointment = $('.appointment-save-text').val();
        if (!appointment) {
            //if no appointment is typed. show alert
            alert('Please add something to appointment');
            //end execution of next oode
            return;
        }

        //check if appointment already exists on this date else then save appointment
        if (appointments[date]) {
            alert(date + ' is already booked for : ' + appointments[date]);
        } else {
            //added new appointments to specific index of object
            appointments[date] = appointment;
            //reset input
            resetAppointmentTextInput();
        }

        showAllAppointments();

    });

    $(document).on('click', '.appointment-edit-button', function () {
        $('.appointment-edit').show();
        $('.appointment-add').hide();
        var date = $(this).data('date');
        $('.appointment-update-date').text(date);
        $('.appointment-update-text').val(appointments[date]);
    });

    $(document).on('click', '.appointment-delete-button', function () {
        $('.appointment-edit').hide();
        $('.appointment-add').show();
        var date = $(this).data('date');
        delete appointments[date];

        showAllAppointments(appointments);
    });

    //Submit update appointment
    $(document).on('click', '.appointment-update', function () {
        $('.appointment-edit').show();
        $('.appointment-add').hide();

        var appointment = $('.appointment-update-text').val();
        if (!appointment) {
            //if no appointment is typed. show alert
            alert('Please add something to appointment');
            //end execution of next oode
            return;
        } else {
            appointments[$('.appointment-update-date').text()] = appointment;
        }

        showAllAppointments(appointments);
    });
});