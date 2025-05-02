// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}



var totalQuantity = 0;
var totalPayment = 0;
var totalBalance = 0;
var numPaid = 0;

var count = 0;

var html = "<table border cellspacing='0' cellpadding='2' width='500'>";

html += "<caption><h1>2nd Batch " + db.dateDelivered + "</h1></caption>";

html += "<tr bgcolor='navy'>";
html += "<th><font color='white'>#</font></th>";
html += "<th><font color='white'>Name</font></th>";
html += "<th><font color='white'>Quantity</font></th>";
html += "<th><font color='white'>Bayad</font></th>";
html += "<th><font color='white'>Utang</font></th>";
html += "<th><font color='white'>Date</font></th>";
html += "</tr>";

for (var buyer of db.buyers) {

    totalQuantity+=buyer.Quantity;
    totalPayment+=buyer.Payment;

    let balance=db.sellingPrice*buyer.Quantity-buyer.Payment;

    totalBalance+=balance;
    
    if ( buyer.Payment >= db.sellingPrice * buyer.Quantity ) numPaid += buyer.Quantity;

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

var dateStarted = new Date(db.dateDelivered);
var dateEnded = new Date(db.buyers[db.buyers.length-1].Date);
var numDays = dateDiffInDays(dateStarted,dateEnded) + 1;

html += "<th align='right'>" + numDays + " days</th>";
html += "</tr>";

html += "</table>";

html += "<br>";

html += "<br><b>Initial Price: </b>" + db.initialPrice;

html += "<br><b>Remaining Stock: </b>" + (db.initialStock - totalQuantity);

cogs = db.supplierPrice * numPaid;
//  profit = totalPayment - cogs;
profit = totalPayment - db.initialPrice;

html += "<br><b>Profit: </b>" + profit.toFixed(2);

var output = document.getElementById("output");

output.innerHTML=html;

