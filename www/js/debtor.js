

 $(document).ready(function() {
	// alert("ready!");
	var user = localStorage.getItem('user');
	var token = localStorage.getItem('token');

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



function getDebtors(){
	var user = localStorage.getItem('user');
	var token = localStorage.getItem('token');

    $.ajax({
    	    async: true,
    		url: 'http://debtbuddy.herokuapp.com/getDebtors',
    		contentType: "application/json, charset=utf-8",
    		headers:{'x-access-token': token},
    		method: 'POST',
    		dataType: 'json',
    		crossDomain: true,
            data: JSON.stringify({
		      'owner': $("#owner").val(),
              }),
    	    success: function(data){
    	    	console.log("Success!");
    	    	var debtor_data = "";
                for (var i= 0; i < data.users.length; i++){
                	debtor_data += '<div class="cardss">';
                	debtor_data += '<div class="imagediv">';
                	debtor_data += '<img class="image1" src="images/person1.jpg">';
                	debtor_data += '</div>';
                	debtor_data += '<i style="float:right; margin-top: 10px;" class="fa fa-ellipsis-h"></i>';
                	debtor_data += '<div class="infodiv">';
                	debtor_data += '<a class="imagename"> <i style="margin-right:5px;" class="fa fa-user-alt"></i>' + data.users[i].first_name + ' ' data.users[i].last_name + '</a>';
                	debtor_data += '<h6 class="imageaddress"> <i style="margin-right:5px;" class="fa fa-user-home"></i>' + data.users[i].address + '</h6>';
                	debtor_data += '<h6 class="imagecontact"> <i style="margin-right:5px;" class="fa fa-user-address-book"></i>' + data.users[i].contact + '</h6>';
                	debtor_data += '</div>';
                	debtor_data += '</div>';
                }
                $('#showDebtors').append(debtor_data);
                },
                error: function(data){
                console.log(data);
                }
	});
}


// function debtorcard(first_name,last_name,address,contact)
// {
//    return '<div class="col-md-12 col-sm-12 col-xs-12" >' +
//        '<p>First Name: '+ ' ' +first_name+  '</p>'+
//        '<p>Last Name:'+ ' ' +last_name+ '</p>'+
//        '<p>Address:'+ ' ' +address+ '</p>'+
//        '<p>Contact:'+ ' ' +contact+ '</p>'+
// 	'</div>'
// }


