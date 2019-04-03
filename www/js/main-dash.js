// //JQUERY CODE STARTS HERE
// $(document).ready(function(){
// 	db = window.openDatabase("db0.db","1.0","DebtBuddy Database",1000000);
//     var data = "";
//     var user = localStorage.getItem("username");
//     var executeQuery = "SELECT * FROM List WHERE item_owner=?";
//     db.transaction(function(transaction){
//         transaction.executeSql(executeQuery,
//             [user],
//             function(tx, results){
//                 for(var i = 0; i < results.rows.length; i++){
//                     data += '<option value="' + results.rows.item(i).item_name + '">' + results.rows.item(i).item_name + '</option>';
//                 }
//                 $('#items-debtAdd').append(data);
//             },
//             function(tx, error){
//                 console.log("Error Showing Items to Add Debt: " + error);
//             }
//             );
//         },
//         function(error){
//                console.log('Error: Show Items to Add Debt' + error);
//         },
//         function(){
//             console.log('Showed Items to Add Debt');
//         });
// })