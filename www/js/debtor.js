  // function addDebtor() {


 // $(document).ready(function() {
 //    alert("ready!");
 //    $(document).on('click', '#addDebtor', function(){


	// 	if (first_name != "" && last_name != "" && contact != "" && address != ""){
 //         console.log(token);
	// 	    $.ajax({
	// 	        type: "POST",
	// 	        url: "http://debtbuddy.herokuapp.com/addDebtor",
	// 	        data: JSON.stringify({
	// 				'first_name': $("#first_name").val(),
	// 				'last_name': $("#last_name").val(),
	// 				'contact': $("#contact").val(),
	// 				'address': $("#address").val(),
	// 	        }),
	// 	        dataType: "json",
	// 	        contentType: "application/json, charset=utf-8",
 //                success: function(result){
	// 		        if (current_user == username) {}

 //                    alert("posted!");
 //                    location.href = "dash.html"
 //                },
 //                error: function(result){
 //                    alert("error Cannot Post");
 //                }
	// 	})
	// 	} else {
	// 	  alert("please complete forms!");
	// 	}
	// }


	// )
	// });    


 $(document).ready(function() {
    alert("ready!");
    $(document).on('click', '#addDebtor', function(){

                var form = document.getElementById('adddebtorform');
                var first_name = document.getElementById('first_name').value;
                var last_name = document.getElementById('last_name').value;
                var address = document.getElementById('address').value;
                var contact = document.getElementById('contact').value;
                alert(contact);

		if (first_name != "" && last_name != "" && contact != "" && address != ""){
                      var data = {
                        "first_name":first_name, 
                        "last_name":last_name, 
                        "contact":contact, 
                        "address": address
                        }
		    $.ajax({
		        type: "POST",
		        url: "http://debtbuddy.herokuapp.com/addDebtor",
		        data: JSON.stringify(data),
		        dataType: "json",
		        contentType: "application/json, charset=utf-8",
		         // beforeSend : function( xhr ) {
           //           xhr.setRequestHeader( "Authorization"+ token );
           //          },
                success: function(result){
			        if (current_user == username) {}

                    alert("posted!");
                    location.href = "dash.html"
                },
                error: function(result){
                    alert("error Cannot Post");
                }
		})
		} else {
		  alert("please complete forms!");
		}
	}


	)
	});  




// function getDebtors(){

// 	 $("#getDebtors").show();

// $.ajax({
//     		url: 'http://127.0.0.1:5000/getDebtors',
//     		type: "GET",
//     		dataType: "json",
//     		success: function(resp) {

// 				if (resp.status  == 'ok') {
// 				  // 				} else
// 				{
// 				}
//     		}
// 		});
// }


// function clothes_rec(cloth_name,clicks)
// {
//    // return '<div class="col-md-12 col-sm-12 col-xs-12" style="padding:0px" >' +
//    //     '<table class="table table-hover" cellspacing="0" cellpadding="0">'+
//    //     '<thead class="table-head">'+
//    //  '</tbody>'+
//    //     '</table></div>';

// }