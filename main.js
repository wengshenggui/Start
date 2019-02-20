$(function () {
  var taxRate2019 = [{
    m: 36000,
    r: 3,
    d: 0
  }, {
    m: 144000,
    r: 10,
    d: 2520
  }, {
    m: 300000,
    r: 20,
    d: 16920
  }, {
    m: 420000,
    r: 25,
    d: 31920
  }, {
    m: 660000,
    r: 30,
    d: 52920
  }, {
    m: 960000,
    r: 35,
    d: 85920
  }, {
    m: 96000000,
    r: 45,
    d: 181920
    }];
  var taxRate2011 = [{
    m: 1500,
    r: 3,
    d: 0
  }, {
    m: 4500,
    r: 10,
    d: 105
  }, {
    m: 9000,
    r: 20,
    d: 555
  }, {
    m: 35000,
    r: 25,
    d: 1005
  }, {
    m: 55000,
    r: 30,
    d: 2755
  }, {
    m: 80000,
    r: 35,
    d: 5505
  }, {
    m: 8000000,
    r: 45,
    d: 13505
  }];
  function calTax(taxable, taxRate) {
    var c = 0;
    for (var i = 0, len = taxRate.length; i < len; i++) {
      var tax = taxRate[i];
      if (taxable <= tax.m) {
        c = (taxable * tax.r) / 100.0 - tax.d;
        break;
      }
    }
    return c<0?0:c;
  }
  function getTr() {
    var arr = arguments[0];
    var head = arguments[1]? true: false;
    var html = [];
    html.push("<tr>");
    arr.map(function (v, i) {
      if (head) {
        html.push("<th>", v, "</th>")

      } else {
        html.push("<td>", v, "</td>")
      }
    });
    html.push("</tr>");
    var htmlstr = html.join("");
    html = null;
    return htmlstr;
  }
  function main() {
    var payment = $("#payment").val();
    var insurance = $("#insurance").val();
    var deduction = $("#deduction").val();
    var basicIncome = payment - insurance;
    var taxable2019 = basicIncome - 5000 - deduction;
    var taxable2011 = basicIncome - 3500 ;
    var accumulated2019 = 0;
    var accumulated2011 = 0;
    var html = [];
    html.push("<table class='taxTable'>");
    html.push(getTr(["月份", "2019当月收入"
      , "2019个税", /* "2019个税累计", */ "2011当月收入"
     , "2011个税", /* "2011个税累计", */ "2011比2019当月多缴纳", "2011比2019累计多缴纳"
    ], "head"));
    for (var i = 1; i <= 12; i++){
      var incomeTax2019 = calTax(taxable2019 * i, taxRate2019) - accumulated2019;
      accumulated2019 += incomeTax2019;
      var incomeTax2011 = calTax(taxable2011, taxRate2011);
      accumulated2011 += incomeTax2011;
      /* console.info */
      html.push(getTr([i, basicIncome - incomeTax2019, incomeTax2019, /* lei2019, */ basicIncome - incomeTax2011, incomeTax2011, /* lei2011, */ incomeTax2011 - incomeTax2019, accumulated2011 - accumulated2019]));
    }

    html.push("</table>");
    $("#table").html(html.join(""));
    html = null;
  }
  $("#cal").on("click", main);
  main();
  console.info("ready");
});
