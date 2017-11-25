$(document).ready(function(){
	
	var task={};
	
	$('#add').on('click',function(e){
		e.preventDefault();
		var search= $("#mySearch").val();
		console.log(search);
		if (!search) {
			alert('Please enter a Task');
			return;
		}
		if (task[search]) {
			alert(search + ' is already added to the list! Please add a different task.');
		}
		else{
			task[search]=task;
			resettask();
		}
		showtask();
	});
	function showtask() {
		$('#first-section').empty();
		$.each(task, function (i, v) {
			$('#first-section').append('<div class="col-sm-4"><i class="fa fa-pencil" aria-hidden="true"></i><p data-editable>' + i + '</p></div>' );
		});
	}
	function resettask(){
		$('#mySearch').val('');
	}

// to change the paragraph tag into editable html tag by clicking on that particular area
	$('body').on('click', '[data-editable]', function(){

		var $change = $(this);

		var $input = $('<textarea/>').val( $change.text() );
		$change.replaceWith( $input );

		var save = function(){
			var $p = $('<p data-editable />').text( $input.val() );
			$input.replaceWith( $p );
		};
		$input.one('blur', save).focus();
	});
});