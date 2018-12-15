$(document).ready(function() {

	$("#searchbuttons").on('click', function () { 
		$("#searchbars").show();
		// $("#homename").hide('slow');
		$("#optionbuttons").hide();
		$('#hider').css("display", "block");


	 })

	$('#logout').on('click', function(e) {
		e.preventDefault();

		$('#alertdiv').css("display","block");
		$('#hider').css("z-index","20");
		$('#hider').css("display","block");
		$('#hider').css("background-color","background-color: rgba(0, 0, 0, 0.7)");
			  
	   
	  });

	$('#confirmlogout').on('click',function(e){
		e.preventDefault();
	  localStorage.removeItem("token");
	  localStorage.removeItem("user");
	  localStorage.clear();
	  window.location.href = "index.html";

	})

	  $('.imagename').textfill();
	  $('.imageaddress').textfill();
	  $('.imagecontact').textfill();
  
	  $(document).on('click','#adddebtbutton', function(e){
	   // $("#addDebtor").attr("disabled",true);
		// $('#adddebtmodal').css("display", "block");
		$('#optionmodal').css('display','block');
		 $('#hider').css("display", "block");
		 $('#addItem').show();
		 $('#addDebtoroption').show();
		
	  });
	  $(document).on('click','#addDebtoroption', function(){
		$('#adddebtmodal').css("display", "block");
		$('#optionmodal').css('display','none');
		
	  });
	  $(document).on('click','#addItem', function(){
		$('#Itemlist').css("display", "block");
		$('.container').css('display','none');
		$('#optionmodal').css('display','none');
		$('#hider').css("display", "none");
		
	  })
	  
  
	  $(document).on('click','#hider', function(e){
		$('#adddebtmodal').hide();
		$('#alertdiv').css("display","none");
		$('#hider').hide();
		$('#addItem').hide();
		$('#addDebtoroption').hide();

		//For searchbutton
		$("#searchbars").hide();		
		$("#optionbuttons").show();
	 });

	 $(document).on('click','.cardss', function(){
		 var ids = $(this).attr('id');
		
		var debtorname = $("#imagename"+ids).text();
		//alert(debtorname);
		var debtorcontact = $("#imagecontact"+ids).text();
	//	alert(debtorcontact);
		var debtoraddress = $("#imageaddress"+ids).text();
		$('.container').hide();
		 $('.debtorcontainer').css("display", "block");
		//  $(".debtorname1 h3").html(debtorname);
		homename.innerText = "";
		debtorname1.innerText = debtorname;
		debtorcontact1.innerText = debtorcontact;
		debtoraddress1.innerText = debtoraddress;
	 });
	 
	 $(document).on('click','.image1', function(){
		// var ids = $(this).attr('id');
		var ids = $(this).parent().parent().attr('id');
	//	alert(ids);
	   var debtorname = $("#imagename"+ids).text();
	  // alert(debtorname);
	   var debtorcontact = $("#imagecontact"+ids).text();
	  // alert(debtorcontact);
	  var debtoraddress = $("#imageaddress"+ids).text();
	   $('.container').hide();
	   $('.debtorcontainer').css("display", "block");
	   
		debtorname1.innerText = debtorname;
		debtorcontact1.innerText = debtorcontact;
		debtoraddress1.innerText = debtoraddress;
	});
	$(document).on('click','.imagename', function(){
		// var ids = $(this).attr('id');
		var ids = $(this).parent().parent().attr('id');
		//alert(ids);
	   var debtorname = $("#imagename"+ids).text();
	  // alert(debtorname);
	   var debtorcontact = $("#imagecontact"+ids).text();
	  // alert(debtorcontact);
	  var debtoraddress = $("#imageaddress"+ids).text();
	   $('.container').hide();
	   $('.debtorcontainer').css("display", "block");
		debtorname1.innerText = debtorname;
		debtorcontact1.innerText = debtorcontact;
		debtoraddress1.innerText = debtoraddress;
	});
	 $(document).on('click', '#backbutton', function(){
		$('.debtorcontainer').css("display", "none");
		$('.container').show();
	 })
  
	 	$(document).on('click','#cancellogout', function () {
			$('#alertdiv').css("display","none");
			$('#hider').hide();
		   })
	var user = localStorage.getItem('user');
	var token = localStorage.getItem('token');



    $(document).on('click', '#addDebtor', function(){

                var form = document.getElementById('adddebtorform');
                var first_name = document.getElementById('first_name').value;
                var last_name = document.getElementById('last_name').value;
                var address = document.getElementById('address').value;
				var contact = document.getElementById('contact').value;
				$('#adddebtmodal').fadeOut();
				$("#loaderdiv").fadeIn('fast');
				//  $('#hider').css("background-color", "rgb(255,255,255, 0.7)");  
				// $('#loaderimage').show('slow');
                // alert(token);

		if (first_name != "" && last_name != "" && contact != "" && address != ""){
			
			// $("#addDebtor").removeAttr("disabled");
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
                success: function(result){
			       

					// alert("posted!");
					
					 location.href = "dash.html"
					//  $('#hider').fadeOut();  
					// $('#loaderimage').fadeOut();
					//$("#container").load(location.href + " #container");
                },
                error: function(result){
                    alert("error Cannot Post");
                }
		})
		} else {
		  alert("please complete forms!");
		}

		// $('#container').load(document.URL +  ' #container');

	}
  )
});  


function getDebtors(){
	var user = localStorage.getItem('user');
	var token = localStorage.getItem('token');


	
    $.ajax({
    	    async: true,
    		url: 'http://debtbuddy.herokuapp.com/getDebtors?returnformat=json',
    		contentType: "application/json, charset=utf-8",
    		headers:{'x-access-token': token},
    		method: 'POST',
    		dataType: 'json',
    		crossDomain: true,
            data: JSON.stringify({
		      'owner': user,
              }),
            
    	    success: function(data){
				var debtor_data = "";
				var test = data.users.length;
			
				
				if(test != 0 ){
					for (var i= 0; i < data.users.length; i++){
						debtor_data += '<div class="cardss"  id='+data.users[i].id+'>';
						debtor_data += '<div class="imagediv" id="imagediv'+data.users[i].id+'">';
						debtor_data += '<img class="image1" src="images/person1.jpg"  id="image1'+data.users[i].id+'">';
						debtor_data += '</div>';
						debtor_data += '<i style="float:right; margin-top: 10px;" class="fa fa-ellipsis-h"  id="option'+data.users[i].id+'"></i>';
						debtor_data += '<div class="infodiv"  id="infodiv'+data.users[i].id+'">';
						debtor_data += '<a class="imagename" style:" text-decoration:none;" id="imagename'+data.users[i].id+'"> <i id='+data.users[i].id+' style="margin-right:5px; " class="fa fa-user-alt"></i>' + data.users[i].first_name + ' ' + data.users[i].last_name + '</a>';
						debtor_data += '<h6  id="imageaddress'+data.users[i].id+'" style="display:none;"> <i style="display:none;" class="fa fa-user-home"></i>' + data.users[i].address + '</h6>';
						debtor_data += '<h6  id="imagecontact'+data.users[i].id+'" class="imagecontact"> <i style="margin-right:5px;" class="fa fa-user-address-book"></i>' + data.users[i].contact + '</h6>';
						debtor_data += '</div>';
						debtor_data += '</div>';
					}
				} else {
					//$('#intromessage').append('<h3>Hi this is DebtBuddy, Please add a new debtor to start!</h3>');
					$('#intromessage').css("display","block");
				}
				
			
				$('#showDebtors').append(debtor_data);
				$("#loaderdiv").fadeOut('fast');
			
				},
				
                error: function(data){
                console.log(data);
                }
	});
	
}

function getUser(){
	var user = localStorage.getItem('user');
	var token = localStorage.getItem('token');

    $.ajax({
    	    async: true,
    		url: 'http://debtbuddy.herokuapp.com/user/info/'+username+'?returnformat=json',
    		contentType: "application/json, charset=utf-8",
    		headers:{'x-access-token': token},
    		method: 'POST',
    		dataType: 'json',
    		crossDomain: true,
            data: JSON.stringify({
		      'owner': user,
              }),
            
    	    success: function(data){
				var user_data = "";
					user_data += '<div class="container">';
						user_data += '<h3>' + users.username + '</h3>';
						user_data += '</div>';
						
				$('#showUser').append(user_data);
				// $("#loaderdiv").fadeOut('fast');
			
				},
				
                error: function(data){
                console.log(data);
                }
	});
	
}

// function editDebtor(){

// 	 var data = {
//                         "first_name":first_name, 
//                         "last_name":last_name, 
//                         "contact":contact, 
// 						"address": address,
// 						"owner":user
//                         }

// 	 $.ajax({
//     		url: 'http://debtbuddy.herokuapp.com/editDebtor?returnformat=json',
//     		contentType: "application/json, charset=utf-8",
//     		headers:{'x-access-token': token},
//     		method: 'POST',
//     		dataType: 'json',
//     		crossDomain: true,
//             data: JSON.stringify(data),
//     	    success: function(result){
//     	    	console.log("Success!");
//                 },
//                 error: function(result){
//                 console.log(data);
//                 }
// 	});
// }


// function delDebtors(debtor_id){
//  $.ajax({
//     		url: 'http://debtbuddy.herokuapp.com/delDebtor?returnformat=json',
//     		contentType: "application/json, charset=utf-8",
//     		headers:{'x-access-token': token},
//     		method: 'POST',
//     		dataType: 'json',
//     		crossDomain: true,
//             data: JSON.stringify({
// 		      'owner': user,
// 		      'id' : debtor_id
//             }),
            
//     	    success: function(data){
//     	    	console.log("Success!");
//                 },
//                 error: function(data){
//                 console.log(data);
//                 }
// 	});
// }




// $(document).ready(function() {
// 	var user = localStorage.getItem('user');
// 	var token = localStorage.getItem('token');

//     $(document).on('click', '#addDebt', function(){

//                 var form = document.getElementById('adddebtform');
//                 var item = document.getElementById('item').value;
//                 var quantity = document.getElementById('quantity').value;
//                 var price = document.getElementById('price').value;
				  
// 		if (item != "" && quantity != "" && price != ""){
                     
//                       var data = {
//                         "item":item, 
//                         "quantity":quantity, 
// 						"price": price,
// 						"owner":user
//                         }

// 		    $.ajax({
// 		        type: "POST",
// 		        url: "https://debtbuddy.herokuapp.com/addDebt?returnformat=json",
// 		        data: JSON.stringify(data),
// 		        dataType: "json",
// 				contentType: "application/json, charset=utf-8",
// 				headers:{'x-access-token': token},
//                 success: function(result){
//                     alert("posted!");
//                     location.href = "dash.html"
//                 },
//                 error: function(result){
//                     alert("error Cannot Post");
//                 }
// 		})
// 		} else {
// 		  alert("please complete forms!");
// 		}
// 	}
//   )
// });  


//  $(document).ready(function() {

//     $('#search').keyup(function(){
//         $('#result').html('');
//         var searchField =  $('#search').val();
// 	    var expression = new RegExp(searchField. "i");
// 	    $.getJSON('data.json', function(data){
// 	    	$.each(data, function(key, value){
//                if(value.name.search(expression) != -1 || value.location.search(expression) != -1){
//                	$.('#result').append('<li class="list-group-item"><li>');
//                }
// 	    	});
// 	    })
// });
// });