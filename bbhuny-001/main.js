var totalQuantity = 0;
var totalPayment = 0;
var totalBalance = 0;

var count = 0;

var html = "<table border cellspacing='0' cellpadding='2' width='600'>";

html += "<caption><h1>1st Batch " + db.dateDelivered + "</h1></caption>";

html += "<tr bgcolor='navy'>";
html += "<th><font color='white'>#</font></th>";
html += "<th><font color='white'>Name</font></th>";
html += "<th><font color='white'>Quantity</font></th>";
html += "<th><font color='white'>Payment</font></th>";
html += "<th><font color='white'>Balance</font></th>";
html += "<th><font color='white'>Date</font></th>";
html += "</tr>";

for (var buyer of buyers) {

    totalQuantity+=buyer.Quantity;
    totalPayment+=buyer.Payment;

    let balance=db.sellingPrice*buyer.Quantity-buyer.Payment;

    totalBalance+=balance;

    count ++;

    html += "<tr>";
    html += "<td align='center'>" + count + "</td>";
    html += "<td>" + buyer.Name + "</td>";
    html += "<td align='right'>" + buyer.Quantity + "</td>";
    html += "<td align='right'>" + buyer.Payment.toFixed(2) + "</td>";
    html += "<td align='right'>" + balance.toFixed(2) + "</td>";
    html += "<td align='right'>" + buyer.Date + "</td>";
    html += "</tr>";
}

html += "<tr>";
html += "<th></th>"
html += "<th align='right'>Total</th>";
html += "<th align='right'>" + totalQuantity + "</th>";
html += "<th align='right'>" + totalPayment.toFixed(2) + "</th>";
html += "<th align='right'>" + totalBalance.toFixed(2) + "</th>";
html += "<th></th>";
html += "</tr>";

html += "</table>";

html += "<br>";

html += "<br><b>Remaining Stock: </b>" + (initialStock - totalQuantity);

html += "<br><b>Kita: </b>" + (totalPayment - db.initialPrice).toFixed(2);

var output = document.getElementById("output");

output.innerHTML=html;
