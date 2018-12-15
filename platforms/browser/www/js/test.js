<script type="text/javascript">
    $( document ).ready(function(){
        alert( "ready!" );
        $(document).on('click','#login', function(){
            var form = document.getElementById('loginform');
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            alert(username);
            if(username != "" && password != ""){
                var logindata = {
                    "username":username 
                }
                $.ajax({
                    type: "POST",
                    url: "http://debtbuddy.herokuapp.com/login",
                    data: JSON.stringify(logindata),
                    dataType: "json",
                    contentType: "application/json",
                    success: function(result){
                        alert("Welcome");
                        location.href = "dashboard.html"
                    },
                    error: function(result){
                        alert("Failed to login");
                    }
                })
            }
            else{
                alert("Fill up all forms");
            }
    
           });
    });
  

</script>

function handleLogin() {
	var form = $("#loginForm");	
	//disable the button so we can't resubmit while we wait
	$("#submitButton",form).attr("disabled","disabled");
	var u = $("#username", form).val();
	var p = $("#password", form).val();
	console.log("click");
	if(u != '' && p!= '') {
		$.post("https://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
			if(res == true) {
				//store
				window.localStorage["username"] = u;
				window.localStorage["password"] = p;        			
				$.mobile.changePage("some.html");
			} else {
				navigator.notification.alert("Your login failed", function() {});
			}
	    	$("#submitButton").removeAttr("disabled");
		},"json");
	}
	return false;
}
s