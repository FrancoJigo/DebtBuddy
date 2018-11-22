

 $(document).ready(function() {
	// alert("ready!");
	// var user = localStorage.getItem('user');
	// var token = localStorage.getItem('token');

	// $.ajax({
	// 	type: "GET",
	// 	url: "http://debtbuddy.herokuapp.com/getDebtors?returnformat=json",
	// 	data: JSON.stringify(data),
	// 	dataType: "json",
	// 	contentType: "application/json, charset=utf-8",
	// 	headers:{'x-access-token': token},'       },
	// 	success: function(result){
		   
	// 	},
	// })

    $(document).on('click', '#addDebtor', function(){

                var form = document.getElementById('adddebtorform');
                var first_name = document.getElementById('first_name').value;
                var last_name = document.getElementById('last_name').value;
                var address = document.getElementById('address').value;
				var contact = document.getElementById('contact').value;
				  
                alert(token);

		if (first_name != "" && last_name != "" && contact != "" && address != ""){
                      var data = {
                        "first_name":first_name, 
                        "last_name":last_name, 
                        "contact":contact, 
						"address": address,
						"owner":user
                        }
		    $.ajax({
		        type: "POST",
		        url: "https://debtbuddy.herokuapp.com/addDebtor?returnformat=json",
		        data: JSON.stringify(data),
		        dataType: "json",
				contentType: "application/json, charset=utf-8",
				headers:{'x-access-token': token},
		         // beforeSend : function( xhr ) {
           //           xhr.setRequestHeader( "Authorization"+ token );
           //          },
                success: function(result){
			       

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



