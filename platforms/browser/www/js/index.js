$(document).ready(function(){
    // $('#signupmodal').show('slow');
     $('#signupbutton').css("box-shadow", "-3px 13px 10px  rgba(49, 49, 49, 0.3)");
    $('#signupbutton').css("background-color", "rgba(64, 130, 178)");

     // $('#loginmodal').css("display", "none");
     $(document).on('click', '#signupbutton', function(){
         $('#signupbutton').css("box-shadow", "-3px 10px 10px  rgba(49, 49, 49, 0.3)");
        //  $('#signupbutton').css("background-color", "rgba(241, 119, 210, 0.5)");
         $('#loginbutton').css("background-color", "rgba(241, 119, 210, 0)");
         $('#loginbutton').css("box-shadow", "none")
         $('#signupmodal').fadeIn();
         $('#loginmodal').hide();
        // $('#signupmodal').css("display", "block");
         //$('#loginmodal').css("display", "none");
     })
     $(document).on('click','#loginbutton', function(){
        // $('#loginmodal').css("display", "block");
        // $('#signupmodal').css("display", "none");
        $('#loginbutton').css("box-shadow", "-3px 10px 10px  rgba(49, 49, 49, 0.3)");
        // $('#loginbutton').css("background-color", "rgba(241, 119, 210, 0.5)");
        $('#signupbutton').css("background-color", "rgba(241, 119, 210, 0)");
        $('#signupbutton').css("box-shadow", "none");
        $('#loginmodal').fadeIn();
         $('#signupmodal').hide();


     });
     $(document).on('click','#signup', function(){
         
         var form = document.getElementById('signupform');
         var firstname = document.getElementById('firstname').value;
         var lastname = document.getElementById('lastname').value;
         var username = document.getElementById('username').value;
         var password = document.getElementById('password').value;
         alert(firstname);
         if(firstname != "" && lastname != "" && username != "" && password != ""){
             var regdata = {
                 "first_name":firstname, 
                 "last_name":lastname, 
                 "username":username, 
                 "password": password
             }
           
             $.ajax({
                 type: "POST",
                 url: "https://debtbuddy.herokuapp.com/createUser?returnformat=json",
                 data: JSON.stringify(regdata),
                 dataType: "json",
                 contentType: "application/json",
                 //headers: {"Authorization": localStorage.getItem('token')},
                 success: function(result){
                    alert("registered");
                    document.getElementById('firstname').value = '';
                    document.getElementById('lastname').value = '';
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                    $.ajax({
                        type: "POST",
                        url: "http://debtbuddy.herokuapp.com/login?returnformat=json",
                        data: JSON.stringify({
                            "username":username,
                            "password":password
                        }),
                        dataType: "json",
                        contentType: "application/json",
                        //headers: {"Authorization": localStorage.getItem('token')},
                        success: function(result){
                            // alert("signed in");
                           localStorage.setItem('token', result.token);
                           localStorage.setItem('user', username);
                      
                            document.getElementById('username').value = ''
                            document.getElementById('password').value = ''
                            location.href = "dash.html"
                        },
                        error: function(result){
                        
                            alert("error Cannot Login");
                        }
                    });
                    //  localStorage.setItem('token', regdata.token)
                    // localStorage.setItem('user', username);
                    //  location.href = "dash.html"
                    
                 },
                 error: function(result){
                     //alert("error Cannot Post");
                 }
             });
         }
         else{
             alert("Fill up all forms");
         }
 
        });


        $(document).on('click','#login', function(){
            var form = document.getElementById('loginform');
            var username = document.getElementById('username1').value;
            var password = document.getElementById('password1').value;
            //alert(password);
            // $("#login",form).attr("disabled","disabled");
            if(username != "" && password != ""){
                var logindata = {
                    "username":username, 
                    "password": password
                }

                $.ajax({
                    type: "POST",
                    url: "http://debtbuddy.herokuapp.com/login?returnformat=json",
                    data: JSON.stringify(logindata),
                    dataType: "json",
                    contentType: "application/json",
                    headers: {"Authorization": localStorage.getItem('token')},
                    success: function(result){
                        //alert("signed in");
                       localStorage.setItem('token', result.token);
                       localStorage.setItem('user', username);
                  
                        document.getElementById('username').value = ''
                        document.getElementById('password').value = ''
                        location.href = "dash.html"
                    },
                    error: function(result){
                        alert("error Cannot Login");
                    }
                });
             
            }
            else{
                alert("Fill up all forms");
            }
            });
 });