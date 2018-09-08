//npm requires
var mysql = require("mysql");
var Inquirer = require('inquirer');


//server specifics
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  // connect to server
  connection.connect(function(err) {
    console.log("connected")
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
  function start() {
    Inquirer.prompt({
        name: "buyOrleave",
        type: "rawlist",
        message: "Welcome to Bamazon, where shopping is as easy as pressing keys.  Would you like to [buy] or [comeback later]",
        choices: ["Buy", "Comeback Later"]
      })
      .then(function(answer) {
        if (answer.buyOrleave === "Buy") {
          buynow();
        }
        else {
          console.log("Your connection with Bamazon has been terminated.")

            process.exit();
          
        }
      });
  }
  function buynow() {
    console.log("test")
    var itemArr= []
    // query the database for all items being sold
    connection.query("SELECT * FROM list", function(err, results) {
      if (err) throw err;
 for (var i = 0; i< results.length; i++){
  console.log(results[i])
  itemArr.push(results[i])
 
 }
    });
    chooseProduct()
  }
    function chooseProduct(){
    Inquirer.prompt([
      {
        name: "choice",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
      },
 
 
      ///////////{
      ////////////////}
    ]).then(function(answer) {
      connection.query("SELECT * FROM list WHERE ?", { id: answer.choice }, function(err, res) {
        console.log("Product Name: " + res[0].item_name)
        console.log("Quantity in inventory: " + res[0].quantity)

      });
 
    })
  }