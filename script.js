// Show data in Table table.html
async function fetch_Data() {
  let sdata = await fetch("http://localhost:3000/customer");
  let res = await sdata.json();

  let data_store = res
    .map(
      (e) => `
        <tr>
            <td>${e.id}</td>
            <td>${e.fname}</td>
            <td>${e.quantity}</td>
            <td>${e.price}</td>
            <td>${e.cname}</td>
            <td>${e.omode}</td>
            <td>${e.bill}</td>
            <td>${e.pmode}</td>
            <td><i class="fa-solid fa-trash" onclick="mydelete('${e.id}')"></i></td>
            <td><i class="fa-solid fa-pen-to-square" onclick="myedit('${e.id}')"></i></td>
        </tr>
    `
    )
    .join("");
  document.getElementById("showdata").innerHTML = data_store;
}
fetch_Data();

// Insert Data in Table  insdata.html

function insData() {
  // let oid1=document.getElementById('oid').value
  let fname1 = document.getElementById("fname").value;
  let quantity1 = document.getElementById("quantity").value;
  let price1 = document.getElementById("price").value;
  let cname1 = document.getElementById("cname").value;
  let omode1 = document.getElementById("omode").value;
  let bill1 = document.getElementById("bill").value;
  let pmode1 = document.getElementById("pmode").value;

  /* if(isNaN(oid1)){
        alert("Please enter only Digits")
        document.getElementById('oid').focus()
        return false
    } */

  if (fname1 == "") {
    alert("Please enter Perfume name");
    document.getElementById("fname").focus();
    return false;
  } 
  else if (quantity1 == "" || (!quantity1.includes("") && !quantity1.includes(""))) {
    alert("Please enter Quantity ");
    document.getElementById("quantity").focus();
    return false;
  } 
  else if (price1 == "" || !price1.includes("")) {
    alert("Please enter Price ");
    document.getElementById("price").focus();
    return false;
  } 
  else if (cname1 == "") {
    alert("Please enter CustomerName");
    document.getElementById("cname").focus();
    return false;
  } 
  else if (omode1 == "") {
    alert("Please enter OrderMode");
    document.getElementById("omode").focus();
    return false;
  } 
  else if (bill1 == "" ||   (bill1!="Paid" && bill1!="Unpaid")) {
    alert("Please enter  Bill Paid/Unpaid");
    document.getElementById("bill").focus();
    return false;
  } 
  else if (pmode1 == "") {
    alert("Please enter PaymentMode");
    document.getElementById("pmode").focus();
    return false;
  }

  let frmdata = {
    // oid:oid1,
    fname: fname1,
    quantity: quantity1,
    price: price1,
    cname: cname1,
    omode: omode1,
    bill: bill1,
    pmode: pmode1,
  };

  fetch("http://localhost:3000/customer", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(frmdata),
  })
    .then((re) => alert("Data Updated in table..."))
    .catch((t) => alert("Data not inserted........."));
}

// TO DELETE

function mydelete(id) {
  fetch(`http://localhost:3000/customer/${id}`, {
    method: 'DELETE'
  })
  .then((r) => alert("Deleted........"));
}



// to edit

async function myedit(id){
    
    let r=await fetch(`http://localhost:3000/customer/${id}`)
    let d=await r.json()

    let frm=`
    <form action="" class="form" onsubmit="return finalupdate('${d.id}')">
                    <h1>Edit Data</h1>
                    <label for="oid0" read>OrderId</label>
                    <input type="text" value="${d.id}" id="oid0" readonly><br>

                    <label for="fname0">Perfum name</label>
                    <input type="text" value="${d.fname}" id="fname0" ><br>

                    <label for="quantity0">Quantity</label>
                    <input type="text" value="${d.quantity}" id="quantity0" ><br>

                    <label for="price0">Price</label>
                    <input type="text" value="${d.price}" id="price0" ><br>

                    <label for="cname0">BuyerName</label>
                    <input type="text" value="${d.cname}" id="cname0" ><br>

                    <label for="omode0">OrderMode</label>
                    <input type="text" value="${d.omode}" id="omode0" ><br>

                    <label for="bill0">Bill</label>
                    <input type="text" value="${d.bill}" id="bill0" ><br>

                    <label for="pmode0">PaymentMode</label>
                    <input type="text" value="${d.pmode}" id="pmode0" ><br>
                    <div class="btn">
                    <button type="submit">Update Data</button>
                    </div>
                </form>

    `
    document.getElementById('editform').innerHTML=frm
}


function finalupdate(id){

    fname2=document.getElementById("fname0").value
    quantity2=document.getElementById("quantity0").value
    price2=document.getElementById("price0").value
    cname2=document.getElementById("cname0").value
    omode2=document.getElementById("omode0").value
    bill2=document.getElementById("bill0").value
    pmode2=document.getElementById("pmode0").value



    if (fname2 == "") {
        alert("Please enter FruitName");
        document.getElementById("fname0").focus();
        return false;
      } 
      else if (quantity2 == "" || (!quantity2.includes("") && !quantity2.includes("Dozen"))) {
        alert("Please enter Quantity in Kg/Dozen");
        document.getElementById("quantity0").focus();
        return false;
      } 
      else if (price2 == "" || !price2.includes("")) {
        alert("Please enter Price ");
        document.getElementById("price0").focus();
        return false;
      } 
      else if (cname2 == "") {
        alert("Please enter CustomerName");
        document.getElementById("cname0").focus();
        return false;
      } 
      else if (omode2 == "") {
        alert("Please enter OrderMode");
        document.getElementById("omode0").focus();
        return false;
      } 
      else if (bill2 == "" ||   (bill2!="Paid" && bill2!="Unpaid")) {
        alert("Please enter  Bill Paid/Unpaid");
        document.getElementById("bill0").focus();
        return false;
      } 
      else if (pmode2 == "") {
        alert("Please enter PaymentMode");
        document.getElementById("pmode0").focus();
        return false;
      }


      let frm={
        fname:fname2,
        quantity:quantity2,
        price:price2,
        cname:cname2,
        omode:omode2,
        bill:bill2,
        pmode:pmode2
    }

    fetch(`http://localhost:3000/customer/${id}`,{
      method:'PUT',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(frm)
    })
    .then(r=>alert("Updated....."))

}