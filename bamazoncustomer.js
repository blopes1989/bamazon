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
connection.connect(function (err) {
  console.log("connected")
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("Welcome Bamazon provides many Choices")
  start();
});



// starting inquirer function
function start() {
  Inquirer.prompt({
    name: "buyOrleave",
    type: "rawlist",
    message: "Would you like to [buy] or [comeback later]",
    choices: ["Buy", "Comeback Later"]
  })
    .then(function (answer) {
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
  var itemArr = []
  // query the database for all items being sold
  connection.query("SELECT * FROM list", function (err, results) {
    if (err) throw err;

    for (var i = 0; i < results.length; i++) {
      console.log("ID: #" + results[i].item_id, "Product Name: " + results[i].product_name, "Quantity in inventory: " + results[i].stock_quantity, "Price Per:$" + results[i].price)
      itemArr.push(results[i])


    } chooseProduct()
  });
}

//select product function
function chooseProduct() {
  Inquirer.prompt([
    {
      name: "choice",
      type: "input",
      message: "What is the ID of the item you would like to buy?"
    },

  ]).then(function (answer) {
    connection.query("SELECT * FROM list WHERE ?", { item_id: answer.choice }, function (err, res) {

      console.log("Product Name: " + res[0].product_name, "Quantity in stock: " + res[0].stock_quantity, "Price Per:$" + res[0].price)
      chooseQuantity(answer.choice, res[0].stock_quantity, res[0].price);
      

    });






  })

}
function chooseQuantity(id, inStock, unitPrice) {
  Inquirer.prompt([
    {
      name: "choice",
      type: "input",
      message: "How many would you like buy?"
    },

  ]).then(function (anwser) {
    connection.query(function (err) {
      if (anwser.choice < inStock) {
        var query = connection.query("UPDATE list SET stock_quantity=" + (inStock - anwser.choice) + " Where item_id=" + id, function (err, res) {
          if (err) console.log(err)

          //total amount of purchase here

          console.log("Thank you for your purchase! This will cost $" + anwser.choice* unitPrice )
          console.log("What would you like to do next?")

          start();
        })
      }
      else {
        console.log("Sorry, we dont have that many in stock; please start over.")
        start();
      }

    });


  });



};