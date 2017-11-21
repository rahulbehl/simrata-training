$(document).ready(function(){

	$("select").selectBoxIt({ 
		autoWidth: false
	});
//append selectbox
	$(".selectboxit-arrow-container").append('<i class=arrow-one> </i>');

//check plugin
	if($().datetimepicker) {
		$('#datetimepicker5').datetimepicker({
			defaultDate: "11/1/2013",
			disabledDates: [
			moment("12/25/2013"),
			new Date(2013, 11 - 1, 21),
			"11/22/2013 00:53"
			]
		});
	}

//Page 1 button
	$('#teams').on('click',function(e){
		e.preventDefault();
		var $num = $(".number").val();
		console.log($num);
		window.location.href="pool2.html?number=" + encodeURIComponent($(".number").val());
		
	});

//Page 2 button
	$('#roster').on('click',function(e){
		e.preventDefault();
		//first array
		var name = [];
		$(".name1").each(function(){
			name.push($(this).val());
		});
		//second array
		var email = [];
		$(".email1").each(function(){
			email.push($(this).val());
		});

		console.log(name);
		console.log(email);

		//combining 2 arrays in one 
		var combined = [];
		var length = Math.min(name.length, email.length);
		for(var i = 0; i < length; i++) {
			combined.push([name[i],email[i]]);
		}

		console.log(combined);

		combined = JSON.stringify(combined);
		console.log(combined);
		localStorage['info']=combined;
		window.location.href='pool3.html?details='+localStorage['info'];
	});
});




