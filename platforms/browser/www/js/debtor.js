$(document).ready(function() {
	var y = 1;

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
		$('#homename').html('Inventory <i id="optionbuttons" class="fa  fa-question-circle" style="float:right; margin-right:4%;margin-top:4px;"></i>');
		$('#backbutton').css('display', 'block');
		$('#Itemlist').css("display", "block");
		$('.container').css('display','none');
		$('#optionmodal').css('display','none');
		$('#hider').css("display", "none");
		$('#optionbuttons').show();
		$('.debtorinfo, .debtlist, .debtorcontainer,.profilecontainer').hide();

		
	  });


  $(document).on('click','.optioncolumn1', function(){
		  $('.optioncolumn1').css('background-color','rgb(39, 40, 34, 0.2)');
		  $('.optioncolumn2').css('background-color','rgb(39, 40, 34, 0)');
		  $('.storeinfodiv,#profileeditbutton,#profileeditbutton1').show();
	  });
	  
  $(document).on('click','.optioncolumn2', function(){
	  $('.storeinfodiv').hide();
	  $('#profileeditbutton,#profileeditbutton1').hide();
	$('.optioncolumn2').css('background-color','rgb(39, 40, 34, 0.2)');
	$('.optioncolumn1').css('background-color','rgb(39, 40, 34, 0)');
});

//

$(document).on('click','#profileeditbutton', function(){
	alert('clicked');
})


//
// addebtbutton ni sya

	 
	  $(document).on('click','#addDebt,#addDebtplus', function(){
		 
		 if (y == 1){
			$('#addDebtmodal').slideDown(1000);
		  $('.debtorimage').slideUp(1000);
		  $(this).removeClass('fa fa-plus-square');
		  $(this).addClass('fa fa-minus-square');
		 
		    y--;
		 }
		 else if( y == 0 ){
			$('#addDebtmodal').slideUp(1000);
			$('.debtorimage').slideDown(1000);
			$(this).removeClass('fa fa-minus-square');
			$(this).addClass('fa fa-plus-square');
			
			
			y++	;
		 };
		 
		 
	  });
	 




	//
	  $(document).on('click','#profilebutton', function(){
		  $('.dashboardsearchdiv, .cardss, #addDebtplus, #addDebt, .debtorcontainer,#container,#Itemlist, #hider, #optionmodal,#adddebtmodal').hide();
		  $('#backbutton').css('display','block');
		  $('#homename').html('Profile <i id="optionbuttons" class="fa  fa-question-circle" style="float:right; margin-right:4%;margin-top:4px;"></i>');
		  $('#profilecontainer').css('display','block');
		  $('.optioncolumn1').css('background-color','rgb(39, 40, 34, 0.2)');
		  $('.optioncolumn2').css('background-color','rgb(39, 40, 34, 0)');
		  $('#storeinfodiv,#profileeditbutton').show();
	  })

	$(document).on('click','#confirmItem', function(){
		$('#addDebtmodal').slideUp(1000);
			$('.debtorimage').slideDown(1000);
			$('#addDebtplus').removeClass('fa fa-minus-square');
			$('#addDebtplus').addClass('fa fa-plus-square');
	});

	$(document).on('click','#homepage',function(){
		window.location = 'dash.html';

	});
	
	$(document).on('click','#cardsoption',function(){
		$('.deletebuttondiv').show();
		$('#hider').show();
		e.stopPropagation();
		
		
	})
	  $(document).on('click','#hider', function(e){
		$('#adddebtmodal').hide();
		$('#alertdiv').css("display","none");
		$('#hider').hide();
		$('#addItem').hide();
		$('#addDebtoroption').hide();
		$('.deletebuttondiv').hide();

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
		$('#backbutton').css('display','block');
		$('#addDebtplus, #addDebt, .debtorimage').show();
		$('.container, #Itemlist').hide();
		$('.debtorinfo').show();
		$('.debtlist,.debtorcontainer').show();
		 $('.debtorcontainer').css("display", "block");
		 $('#addDebtmodal,#profilecontainer').css('display','none');
		
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
	   $('#addDebtmodal').css('display','none');
	   
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
	   $('#addDebtmodal').css('display','none');
		debtorname1.innerText = debtorname;
		debtorcontact1.innerText = debtorcontact;
		debtoraddress1.innerText = debtoraddress;
	});
	 $(document).on('click', '#backbutton', function(){
		$('#backbutton').css('display','none');
		$('.cardss, .dashboardsearchdiv').show();
		$('#homename').html('Home <i id="optionbuttons" class="fa  fa-question-circle" style="float:right; margin-right:4%;margin-top:4px;"></i>');
		// $('.debtorcontainer').css("display", "block");
		$('.container').show();
		$('#addDebtplus, #addDebt, .profilecontainer, .debtorcontainer,#Itemlist, #hider, #optionmodal ,#adddebtmodal').hide();
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


	$('.cardss').css('display', 'block');
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
						debtor_data += '<a id="cardsoption"><i style="float:right; margin-top: 10px; z-index:10;" class="fa fa-angle-down"  id="option'+data.users[i].id+'"></i></a>';
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
		url: 'http://debtbuddy.herokuapp.com/user/info/'+user+'?returnformat=json',
		contentType: "application/json, charset=utf-8",
		headers:{'x-access-token': token},
		method: 'GET',
		dataType: 'json',
		crossDomain: true,
    	  success: function(data){
			var user_data = "";
			user_data += '<div class="container">';
			user_data += '<i style="float:right; margin-top: 10px;" class="fa fa-ellipsis-h"></i>';
			user_data += '<img style="height: 120px;" src="images/store.jpg">';
			user_data += '<h3>' + data.user.first_name + ' Store' + ' </h3>';
			user_data += '<hr>';
			user_data += '<h3> Name: ' + data.user.first_name + ' ' + data.user.last_name + '</h3>';
			user_data += '<h3> Username: @' + user + '</h3>';
			user_data += '</div>';
			$('#showUser').append(user_data);
			$('.cardss').css('display', 'none');
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

function showInventory(){
	var user = localStorage.getItem('user');
	var token = localStorage.getItem('token');
	$.ajax({
	    async: true,
		url: 'http://debtbuddy.herokuapp.com/getInventory',
		contentType: "application/json, charset=utf-8",
		headers:{'x-access-token': token},
		method: 'POST',
		dataType: 'json',
		crossDomain: true,
        data: JSON.stringify({
	      'owner': user,
          }),
        
	    success: function(data){
			var list_data = "";
			var test = data.items.length;

			if(test != 0 ){
				for (var i= 0; i < data.items.length; i++){
					list_data += '<div class="column4">' + data.items[i].item_name + '</div> <div class="column5">' + data.items[i].item_price + '</div> <div class="column6"><i class="fa fa-trash-alt"></i><i class="fa fa-edit"></i></div>';
				}
			} else {
				//$('#intromessage').append('<h3>Hi this is DebtBuddy, Please add a new debtor to start!</h3>');
			}
		
			$('#tablewrapper1').append(list_data);
		
			},
			
            error: function(data){
            console.log(data);
            }
	});
}

function addInventory(){
	var item_name = document.getElementById('item_name').value;
	var price = document.getElementById('price').value;
	var token = localStorage.getItem('token');
	var owner = localStorage.getItem('user');
	

	$.ajax({
	type: "POST",
	url: "https://debtbuddy.herokuapp.com/addInventory",
	headers:{'x-access-token': token},
	data: JSON.stringify({
		"owner" : owner,
		"item_name" : item_name,
		"price" : price
	}),
	dataType: "json",
	contentType: "application/json",
	success: function(result){
		
		location.href = "dash.html"
	},
	error: function(result){
	 	alert("error add");
	}
	});
}