//BRIX CODE START
document.addEventListener("deviceready", onDeviceReady, false);
var db = null;

//CREATE DATABASE
function onDeviceReady() {
    db = window.openDatabase("db6.db","1.0","DebtBuddy Database",1000000);
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS User(id INTEGER PRIMARY KEY, public_id VARCHAR(50), username VARCHAR(80), password VARCHAR(80), first_name VARCHAR(40), last_name VARCHAR(40))',
            [],
            function(tx, results){},
            function(tx, error){
                console.log("Error Creating User Table: " + error)
            }
            );
    },
    function(error) {
        console.log("Database is not ready, error: " + error);
    },
    function() {
        console.log("Database User is ready");
        var user = localStorage.getItem('username');
        // getProfileData(user);
    });
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Debtors(debtor_id INTEGER PRIMARY KEY, first_name VARCHAR(40), last_name VARCHAR(40), contact VARCHAR(15), address VARCHAR(100), indebted_to varchar(80), FOREIGN KEY(indebted_to) REFERENCES User(username))',
            [],
            function(tx, results){},
            function(tx, error){
                console.log("Error Creating Debtors Table: " + error)
            }
            );
    },
    function(error) {
        console.log("Database is not ready, error: " + error);
    },
    function() {
        console.log("Database Debtor is ready");
        var user = localStorage.getItem('username');
        // getDebtorsData(user);
        // getListData(user);
    });
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS List(_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(100), item_price INTEGER, item_owner VARCHAR(100))',
            [],
            function(tx, results){},
            function(tx, error){
                console.log("Error Creating List Table: " + error)
            }
            );
    },
    function(error) {
        console.log("Database is not ready, error: " + error);
    },
    function() {
        console.log("Database List is ready");
    });
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Debtlist(_id INTEGER PRIMARY KEY AUTOINCREMENT, debtor_id INTEGER, item_name VARCHAR(100), item_price INTEGER, item_quantity INTEGER, date REAL, indebt_to VARCHAR(80), FOREIGN KEY(indebt_to) REFERENCES User(username))',
            [],
            function(tx, results){},
            function(tx, error){
                console.log("Error Creating List Table: " + error)
            }
            );
    },
    function(error) {
        console.log("Database is not ready, error: " + error);
    },
    function() {
        console.log("Database Debt List is ready");
    });

}

//ADD USER
function addUser(username, password, first_name, last_name){
    console.log("ADD USER is clicked!");
    var public_id = "";
    var symbols = "abcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i <= 35; i++){
        if(i == 8 || i == 13 || i == 18 || i == 23){
            public_id += "-";
            continue;
        }
        public_id += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    db.transaction(function(transaction) {
        console.log("transaction is clicked!");
        var executeQuery = "INSERT INTO User(public_id, username, password, first_name, last_name) VALUES (?,?,?,?,?)";
        transaction.executeSql(executeQuery, 
            [public_id, username, password, first_name, last_name],
            function(tx, results){
                console.log('Successful transaction!');
            },
            function(tx, error){
                console.log("Error Creating User: " + error);
            }
            );
        },
        function (error) {
            console.log('Error' + error);
        },
        function() {
            console.log('User Inserted!' );
            alert("Registered!");
            location.href = "dash.html";
        });
}

//CHECK IF USERNAME EXISTS IN DATABASE
function checkUsername() {
    var check = false;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var first_name = document.getElementById('firstname').value;
    var last_name = document.getElementById('lastname').value;
    db.transaction(function(transaction) {
        alert("I am clicked!!!!!");
        var executeQuery = "SELECT * FROM User";
        transaction.executeSql(executeQuery, [], function(tx, result) {
            if(result.rows.length > 0){
                for(var i = 0; i < result.rows.length; i++){
                    if(username == result.rows.item(i).username){
                        alert("Username already taken!");
                        break;
                    } else if (i == result.rows.length-1){
                        addUser(username, password, first_name, last_name);
                    }
                }
            } else {
                addUser(username, password, first_name, last_name);
            }
        },
        function(error) {
            console.log('Error Querying For Checking Username' + error);
        });
    },
    function(error) {
        console.log('Error Checking Username Transaction ' + error);
    },
    function() {
        
    });
}


//LOGIN
function login(){
    var check = false;
    var username = document.getElementById('username1').value;
    var password = document.getElementById('password1').value;
    db.transaction(function(transaction){
        var executeQuery = "SELECT * FROM User";
        transaction.executeSql(executeQuery, [], function(tx, result){
            if(result.rows.length == 0){
                alert("No account found!");
            } else {
                for(var i = 0; i < result.rows.length; i++){
                    if(username == result.rows.item(i).username && password == result.rows.item(i).password){
                        check = true;
                        console.log(check);
                        localStorage.setItem('username', username);
                        break;
                    } else if (i == result.rows.length-1){
                        alert("Invalid username and password!");
                    }
                }
            }
        },
        function(error){
            console.log('Error Querying For Login' + error);
        });
    },
    function(error){
        console.log("Error: Login:" + error)
    }, 
    function(){
        if(check){
            // var user = localStorage.getItem('username');
            // getDebtorsData(user);
            // getProfileData(username);
            location.href = "dash.html";
        }
    });
}

//LOGOUT AND CLEAR LOCALSTORAGE
function logout(){
    localStorage.removeItem('username');
    localStorage.clear();
}

//DELETE ONE USER
function deleteUser(i){
    db.transaction(function(transaction) {
        var executeQuery = "DELETE FROM User WHERE id=?";
        transaction.executeSql(executeQuery, 
            [i],
            function(tx, results){
                // console.log('Successful transaction!');
            },
            function(tx, error){
                console.log("Error Deleting User: " + error);
            }
            );
        },
        function (error) {
            console.log('Error: Delete' + error);
        },
        function() {
            console.log('User DELETED!');
        });
}

//ADD DEBTOR
function addDebtor(){
    event.preventDefault();
    var firstname = document.getElementById('first_name').value;
    var lastname = document.getElementById('last_name').value;
    var contact = document.getElementById('contact').value;
    var address = document.getElementById('address').value;
    var indebted_to = localStorage.getItem('username');

    db.transaction(function(transaction){
        var executeQuery = "INSERT INTO Debtors(first_name, last_name, contact, address, indebted_to) VALUES (?,?,?,?,?)";
        transaction.executeSql(executeQuery, 
            [firstname, lastname, contact, address, indebted_to],
            function(tx, results){
                console.log('Successful transaction!');
            },
            function(tx, error){
                console.log("Error Adding Debtor: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Add Debtor' + error);
        },
        function(){
            console.log('DEBTOR ADDED!');
            var user = localStorage.getItem('username');
            // getDebtorsData(user);
            location.href = "dash.html";
        });
}

//SHOW DEBTORS
// $("#showTable").click(function(){
//      $("#TableData").html("");
//      db.transaction(function(transaction){
//      transaction.executeSql('SELECT * FROM Debtors', [], function (tx, results){
//         for (var i = 0; i < results.rows.length; i++){
//          $("#TableData").append("<tr><td>"+results.rows.item(i).debtor_id+"</td><td>"+results.rows.item(i).first_name+"</td><td>"+results.rows.item(i).last_name+"</td><td>"+results.rows.item(i).contact+"</td><td>"+results.rows.item(i).address+"</td></tr>");
//          }
//      },
//      function(tx, error){
//          console.log("Error Getting Debtors: " + error);
//      }
//      );
//      });
// });

// function clickShowTable(){
//     document.getElementById("showTable").click();
// }

function getDebtorsData(){
    var user = localStorage.getItem('username');
    db = window.openDatabase("db6.db","1.0","DebtBuddy Database",1000000);
    db.transaction(function(transaction) {
        var debtor_data = "";
        var indebted_to = user;
        console.log(indebted_to);
        var executeQuery = "SELECT * FROM Debtors WHERE indebted_to=?";
        transaction.executeSql(executeQuery, 
            [indebted_to],
            function(tx, results){
                for(var i = 0; i < results.rows.length; i++){
                    debtor_data += '<div class="cardss" onclick="setCurrentDebtorId('+results.rows.item(i).debtor_id+');" id='+results.rows.item(i).debtor_id+'>';
                    debtor_data += '<div class="imagediv" id="imagediv'+results.rows.item(i).debtor_id+'">';
                    debtor_data += '<img class="image1" src="images/person1.jpg"  id="image1'+results.rows.item(i).debtor_id+'">';
                    debtor_data += '</div>';
                    debtor_data += '<a id="cardsoption"><i style="float:right; margin-top: 10px; z-index:10;" class="fa fa-angle-down"  id="option'+results.rows.item(i).debtor_id+'"></i></a>';
                    debtor_data += '<div class="infodiv"  id="infodiv'+results.rows.item(i).debtor_id+'">';
                    debtor_data += '<a onclick="setCurrentDebtorId('+results.rows.item(i).debtor_id+');" class="imagename" style:" text-decoration:none;" id="imagename'+results.rows.item(i).debtor_id+'"> <i id='+results.rows.item(i).debtor_id+' style="margin-right:5px; " class="fa fa-user-alt"></i>' + results.rows.item(i).first_name + ' ' + results.rows.item(i).last_name + '</a>';
                    debtor_data += '<h6  id="imageaddress'+results.rows.item(i).debtor_id+'" style="display:none;"> <i style="display:none;" class="fa fa-user-home"></i>' + results.rows.item(i).address + '</h6>';
                    debtor_data += '<h6  id="imagecontact'+results.rows.item(i).debtor_id+'" class="imagecontact"> <i style="margin-right:5px;" class="fa fa-user-address-book"></i>' + results.rows.item(i).contact + '</h6>';
                    debtor_data += '</div>';
                    debtor_data += '</div>';

                    // debtor_data += '<div id="debtlist'+results.rows.item(i).debtor_id+'" style="display: none;">'
                    // debtor_data += '<div class="debtlist">';
                    // debtor_data += '<div class="tablewrapper">';
                    // debtor_data += '<div class="row1">';
                    // debtor_data += '<div class="column1">Product name</div>';
                    // debtor_data += '<div class="column2">Price</div>';
                    // debtor_data += '<div class="column3">Quantity</div>';
                    // debtor_data += '</div>';
                    // debtor_data += '<div class="row1-1">';
                    // debtor_data += '<div class="column1-1">Argentina Corned Beef lami kaau hahahahahaahhahahahahaha</div>';
                    // debtor_data += '<div class="column2-1">36</div>';
                    // debtor_data += '<div class="column3-1">1</div>';
                    // debtor_data += '</div>';
                    // debtor_data += '<div class="row1-1">';
                    // debtor_data += '<div class="column1-1">Holiday beefloaf</div>';
                    // debtor_data += '<div class="column2-1">21</div>';
                    // debtor_data += '<div class="column3-1">1</div>';
                    // debtor_data += '</div>';
                    // debtor_data += '</div>';
                    // debtor_data += '</div>';
                    // debtor_data += '</div>';
                    
                }
                // localStorage.setItem('data', debtor_data);
                $('#showDebtors').append(debtor_data);
                $("#loaderdiv").fadeOut('fast');
            },
            function(tx, error){
                console.log("Error Getting Debtors: " + error);
            }
            );
        },
        function (error) {
            console.log('Error: Get Debtors' + error);
        },
        function(){
            console.log("Data Saved in LocalStorage");
        });
}

function setCurrentDebtorId(i){
    localStorage.setItem('currentDebtorId', i);

}

function clearCurrentDebtorId(){
    localStorage.removeItem('currentDebtorId');
}

//PROFILE
// function getProfileData(user){
//     var data = "";
//     db.transaction(function(transaction){
//         var executeQuery = "SELECT * FROM User WHERE username=?";
//         transaction.executeSql(executeQuery, 
//             [user],
//             function(tx, results){
//                 // data += "<center><p>First name:"+ results.rows.item(0).first_name +"<br>Last Name:"+ results.rows.item(0).last_name +"</p></center>";
//                 data += results.rows.item(0).first_name + ' ' + results.rows.item(0).last_name;
//                 // data += '<h6 class="debtorcontact11" id="debtorcontact11"><i style="margin-right:13px; font-size:16px;" class="profileicons fa fa-phone"></i>' + results.rows.item(0).contact + '</h6>';
//                 // data += '<h6 class="debtoraddress11" id="debtoraddress11"><i style="margin-right:15px; font-size:16px;" class="profileicons fa fa-map-marker-alt"></i>Ditucalan Iligan City</h6>';
//                 localStorage.setItem('profileData', data)
//             },
//             function(tx, error){
//                 console.log("Error Showing Profile: " + error);
//             }
//             );
//         },
//         function(error){
//                console.log('Error: Show Profile' + error);
//         },
//         function(){
//             console.log('Profile Data Saved to LocalStorage');
//         });
// }

function testProfile(){
    var data = "";
    db.transaction(function(transaction){
        var user = localStorage.getItem('username');
        var executeQuery = "SELECT * FROM User WHERE username=?";
        transaction.executeSql(executeQuery, 
            [user],
            function(tx, results){
                // data += "<center><p>First name:"+ results.rows.item(0).first_name +"<br>Last Name:"+ results.rows.item(0).last_name +"</p></center>";
                data += results.rows.item(0).first_name + ' ' + results.rows.item(0).last_name;
                // data += '<h6 class="debtorcontact11" id="debtorcontact11"><i style="margin-right:13px; font-size:16px;" class="profileicons fa fa-phone"></i>' + results.rows.item(0).contact + '</h6>';
                // data += '<h6 class="debtoraddress11" id="debtoraddress11"><i style="margin-right:15px; font-size:16px;" class="profileicons fa fa-map-marker-alt"></i>Ditucalan Iligan City</h6>';
                $('#debtorname11').append(data);
            },
            function(tx, error){
                console.log("Error Showing Profile: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Show Profile' + error);
        },
        function(){
            console.log('Profile Data Saved to LocalStorage');
        });
}

function getProfile(){

}

//List
function addList(){
    var itemname = document.getElementById('item_name').value;
    var price = document.getElementById('price').value;
    var owner = localStorage.getItem('username');
    db.transaction(function(transaction){
        var executeQuery = "INSERT INTO List(item_name, item_price, item_owner) VALUES (?,?,?)";
        transaction.executeSql(executeQuery, 
            [itemname, price, owner],
            function(tx, results){
                console.log('Successful transaction!');
                alert('Successful transaction!');
            },
            function(tx, error){
                console.log("Error Adding List: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Add List' + error);
        },
        function(){
            console.log('LIST ADDED!');
            // getListData(owner);
            document.getElementById("items-debtAdd").innerHTML = "";
            getAddDebtItems();
        });
}

function getListData(){
    var user = localStorage.getItem('username');
    var data = "";
    var executeQuery = "SELECT * FROM List WHERE item_owner=?";
    db.transaction(function(transaction){
        transaction.executeSql(executeQuery,
            [user],
            function(tx, results){
                for(var i = 0; i < results.rows.length; i++){
                    data += '<div class="row1-1">';
                    data += '<div class="column1-1">' + results.rows.item(i).item_name + '</div>';
                    data += '<div class="column2-1">' + results.rows.item(i).item_price + '</div>';
                    data += '</div>';
                }
                // localStorage.setItem('listData', data);
                $('#tablewrapper1').append(data);
            },
            function(tx, error){
                console.log("Error Showing List: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Show List' + error);
        },
        function(){
            console.log('List Data Saved in LocalStorage!');
        });
}

function getList(){
    var data = localStorage.getItem('listData');
    var checker = document.getElementById('tablewrapper1').innerHTML;
    if(data == null || data == 0){
        $('#emptyList').append("<center>No list to this user!</center>");
    } else {
        if(checker == 0){
            $('#tablewrapper1').append(data);
        }
    }
}

function clearList(){
    document.getElementById("tablewrapper1").innerHTML = "";
}

function deleteList(i){
    db.transaction(function(transaction) {
        var executeQuery = "DELETE FROM List WHERE _id=?";
        transaction.executeSql(executeQuery, 
            [i],
            function(tx, results){
                // console.log('Successful transaction!');
            },
            function(tx, error){
                console.log("Error Deleting List: " + error);
            }
            );
        },
        function (error) {
            console.log('Error: Delete' + error);
        },
        function() {
            console.log('List DELETED!');
        });
}

function appendList(){
    var data = "";
    var item_name = document.getElementById("item_name").value;
    var price = document.getElementById("price").value;
    document.getElementById("item_name").value = "";
    document.getElementById("price").value = "";

    data += '<div class="row1-1">';
    data += '<div class="column1-1">' + item_name + '</div>';
    data += '<div class="column2-1">' + price + '</div>';
    data += '</div>';

    $('#tablewrapper1').append(data);

}


//ADD DEBT
function getAddDebtItems(){
    var data = "";
    var user = localStorage.getItem("username");
    var executeQuery = "SELECT * FROM List WHERE item_owner=?";
    db.transaction(function(transaction){
        transaction.executeSql(executeQuery,
            [user],
            function(tx, results){
                data += '<option value="selected" selected="selected">Select an item</option>';
                for(var i = 0; i < results.rows.length; i++){
                    data += '<option value="' + results.rows.item(i).item_name + '">' + results.rows.item(i).item_name + '</option>';
                }
                var items_empty = document.getElementById('items-debtAdd').innerHTML;
                if(items_empty == 0){
                    $('#items-debtAdd').append(data);
                }
            },
            function(tx, error){
                console.log("Error Showing Items to Add Debt: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Show Items to Add Debt' + error);
        },
        function(){
            console.log('Showed Items to Add Debt');
        });
}

function getAddDebtPrice(){

    var item_name = document.getElementById('items-debtAdd').value;
    if(item_name != 'selected'){
        var price;
        var executeQuery = "SELECT * FROM List WHERE item_name=?";
        db.transaction(function(transaction){
            transaction.executeSql(executeQuery,
                [item_name],
                function(tx, results){
                    price = results.rows.item(0).item_price;
                    document.getElementById('price-debtAdd').value = price;
                },
                function(tx, error){
                    console.log("Error Showing Price to Add Debt: " + error);
                }
                );
            },
            function(error){
                   console.log('Error: Show Price to Add Debt' + error);
            },
            function(){
                console.log('Showed Price to Add Debt');
            });
    } else {
        document.getElementById('price-debtAdd').value = "Select a Product";
    }
}

function addDate(){
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    document.getElementById("date-debtAdd").innerHTML = m + "/" + d + "/" + y;

}

function addDebt(){
    var user = localStorage.getItem('username');
    var debtor_id = localStorage.getItem('currentDebtorId');
    var item_name = document.getElementById('items-debtAdd').value;
    var item_price = document.getElementById('price-debtAdd').value;
    var item_quantity = document.getElementById('quantity-debtAdd').value;
    var debtor_id2 = parseInt(debtor_id, 10);
    var item_price2 = parseInt(item_price, 10);
    var item_quantity2 = parseInt(item_quantity, 10);

    alert(user + (debtor_id2 + 2) + item_name + (item_price2 + 2) + (item_quantity2 + 2));
    

    db.transaction(function(transaction){
        var executeQuery = "INSERT INTO DebtList(debtor_id, item_name, item_price, item_quantity, date, indebt_to) VALUES (?,?,?,?,julianday('now'),?)";
        transaction.executeSql(executeQuery, 
            [debtor_id2, item_name, item_price2, item_quantity2, user],
            function(tx, results){
                console.log('Successful adding debt!');
                showManually();

            },
            function(tx, error){
                console.log("Error Adding Debt: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Add Debt' + error);
        },
        function(){
            console.log('DEBT ADDED!');
        });
}

function addManualDebt(){

    var user = 'brixare';
    var debtor_id = 2;
    var item_name = 'Lays Classic';
    var item_price = 161;
    var item_quantity = 1;
    var mainDATE = new Date();
    var y = mainDATE.getFullYear();
    var m = mainDATE.getMonth() + 1;
    var d = mainDATE.getDate();
    // var dateNow = y + ':' + '0' + m + ':0' + d + ' ' + '21:01:10';


    db.transaction(function(transaction){
        var executeQuery = "INSERT INTO Debtlist(debtor_id, item_name, item_price, item_quantity, date, indebt_to) VALUES (?,?,?,?,julianday('now'),?)";
        transaction.executeSql(executeQuery, 
            [debtor_id, item_name, item_price, item_quantity, user],
            function(tx, results){
                console.log('Successful adding debt!');
                

            },
            function(tx, error){
                console.log("Error Adding Debt: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Add Debt' + error);
        },
        function(){
            console.log('DEBT ADDED!');
        });
}

function showManually(){
    db = window.openDatabase("db6.db","1.0","DebtBuddy Database",1000000);
    db.transaction(function(transaction){
        var executeQuery = "SELECT time(date), * FROM Debtlist";
        transaction.executeSql(executeQuery, 
            [],
            function(tx, results){
                var test = results.rows.item(0);
                console.log(test['time(date)'] + ' ' +test['date']);
            },
            function(tx, error){
                console.log("Error Adding Debt: " + error);
            }
            );
        },
        function(error){
               console.log('Error: Add Debt' + error);
        },
        function(){
            console.log('TEST Showed!');
        });
}

//BRIX CODE END


//JIGU CODE
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
//JIGU CODE END



//PAST CODE
// $(document).ready(function(){
//     // $('#signupmodal').show('slow');
//      $('#signupbutton').css("box-shadow", "-3px 13px 10px  rgba(49, 49, 49, 0.3)");
//     $('#signupbutton').css("background-color", "rgba(64, 130, 178)");

//      // $('#loginmodal').css("display", "none");
//      $(document).on('click', '#signupbutton', function(){
//          $('#signupbutton').css("box-shadow", "-3px 10px 10px  rgba(49, 49, 49, 0.3)");
//         //  $('#signupbutton').css("background-color", "rgba(241, 119, 210, 0.5)");
//          $('#loginbutton').css("background-color", "rgba(241, 119, 210, 0)");
//          $('#loginbutton').css("box-shadow", "none")
//          $('#signupmodal').fadeIn();
//          $('#loginmodal').hide();
//         // $('#signupmodal').css("display", "block");
//          //$('#loginmodal').css("display", "none");
//      })
//      $(document).on('click','#loginbutton', function(){
//         // $('#loginmodal').css("display", "block");
//         // $('#signupmodal').css("display", "none");
//         $('#loginbutton').css("box-shadow", "-3px 10px 10px  rgba(49, 49, 49, 0.3)");
//         // $('#loginbutton').css("background-color", "rgba(241, 119, 210, 0.5)");
//         $('#signupbutton').css("background-color", "rgba(241, 119, 210, 0)");
//         $('#signupbutton').css("box-shadow", "none");
//         $('#loginmodal').fadeIn();
//          $('#signupmodal').hide();


//      });
//      $(document).on('click','#signup', function(){
         
//          var form = document.getElementById('signupform');
//          var firstname = document.getElementById('firstname').value;
//          var lastname = document.getElementById('lastname').value;
//          var username = document.getElementById('username').value;
//          var password = document.getElementById('password').value;
//          alert(firstname);
//          if(firstname != "" && lastname != "" && username != "" && password != ""){
//              var regdata = {
//                  "first_name":firstname, 
//                  "last_name":lastname, 
//                  "username":username, 
//                  "password": password
//              }
           
//              $.ajax({
//                  type: "POST",
//                  url: "https://debtbuddy.herokuapp.com/createUser?returnformat=json",
//                  data: JSON.stringify(regdata),
//                  dataType: "json",
//                  contentType: "application/json",
//                  //headers: {"Authorization": localStorage.getItem('token')},
//                  success: function(result){
//                     alert("registered");
//                     document.getElementById('firstname').value = '';
//                     document.getElementById('lastname').value = '';
//                     document.getElementById('username').value = '';
//                     document.getElementById('password').value = '';
//                     $.ajax({
//                         type: "POST",
//                         url: "http://debtbuddy.herokuapp.com/login?returnformat=json",
//                         data: JSON.stringify({
//                             "username":username,
//                             "password":password
//                         }),
//                         dataType: "json",
//                         contentType: "application/json",
//                         //headers: {"Authorization": localStorage.getItem('token')},
//                         success: function(result){
//                             // alert("signed in");
//                            localStorage.setItem('token', result.token);
//                            localStorage.setItem('user', username);
                      
//                             document.getElementById('username').value = ''
//                             document.getElementById('password').value = ''
//                             location.href = "dash.html"
//                         },
//                         error: function(result){
                        
//                             alert("error Cannot Login");
//                         }
//                     });
//                     //  localStorage.setItem('token', regdata.token)
//                     // localStorage.setItem('user', username);
//                     //  location.href = "dash.html"
                    
//                  },
//                  error: function(result){
//                      //alert("error Cannot Post");
//                  }
//              });
//          }
//          else{
//              alert("Fill up all forms");
//          }
 
//         });


//         $(document).on('click','#login', function(){
//             var form = document.getElementById('loginform');
//             var username = document.getElementById('username1').value;
//             var password = document.getElementById('password1').value;
//             //alert(password);
//             // $("#login",form).attr("disabled","disabled");
//             if(username != "" && password != ""){
//                 var logindata = {
//                     "username":username, 
//                     "password": password
//                 }

//                 $.ajax({
//                     type: "POST",
//                     url: "http://debtbuddy.herokuapp.com/login?returnformat=json",
//                     data: JSON.stringify(logindata),
//                     dataType: "json",
//                     contentType: "application/json",
//                     headers: {"Authorization": localStorage.getItem('token')},
//                     success: function(result){
//                         //alert("signed in");
//                        localStorage.setItem('token', result.token);
//                        localStorage.setItem('user', username);
                  
//                         document.getElementById('username').value = ''
//                         document.getElementById('password').value = ''
//                         location.href = "dash.html"
//                     },
//                     error: function(result){
//                         alert("error Cannot Login");
//                     }
//                 });
             
//             }
//             else{
//                 alert("Fill up all forms");
//             }
//             });
//  });