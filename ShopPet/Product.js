// var product = [
//   {
//     id: 1,
//     img: "img/buz.png",
//     name: "buzz",
//     price: 259,
//     description:
//       "Buzz ipsum, dolor sit amet consectetur adipisicing elit. Velit, magnam?",
//     type: "Pellet",
//   },
//   {
//     id: 2,
//     img: "img/kaniva-p.png",
//     name: "kaniva",
//     price: 210,
//     description:
//       "Kaniva ipsum, dolor sit amet consectetur adipisicing elit. Velit, magnam?",
//     type: "Wet",
//   },
//   {
//     id: 3,
//     img: "img/partymix-a.png",
//     name: "party mix ขนมแมว รสบีซไซด์",
//     price: 59,
//     description:
//       "Party Mix ipsum, dolor sit amet consectetur adipisicing elit. Velit, magnam?",
//     type: "Appetizers",
//   },
//   {
//     id: 4,
//     img: "img/kaniva.png",
//     name: "kaniva",
//     price: 185,
//     description:
//       "kaniva ipsum, dolor sit amet consectetur adipisicing elit. Velit, magnam?",
//     type: "Pellet",
//   },
// ];

var product;

$(document).ready(() => {
    
  // เรียกapi
    $.ajax({
      method: 'GET',
      url: './api/getallproduct.php',
      dataType: 'json',
      success: function(reponse) {
        
        console.log(reponse)
        console.log(reponse.ResCode)
        if(reponse.RespCode == 200) {
        
          product = reponse.Result;
          console.log(product)
          var html = '';
          for (let i = 0; i < product.length; i++) {
            html += ` <div onclick="openProductDetail(${i})" class="product-item ${product[i].type_name}" >
                        <img class="product-img" src="./img/${product[i].image}" alt="" />
                        <p style="font-size: 1.2vw">${product[i].product_name}</p>
                        <p style="font-size: 1vw">${product[i].price} บาท</p>
                        </div>`;
          }
          $("#productlist").html(html);

        }
      }, error: function(err){
        console.log(err)
      }
    })

})

// ช่องการค้นหา
function searchsomething(elem) {
  // console.log(elem.id)
  var value = $("#" + elem.id).val();
  console.log(value);

  var html = "";
  for (let i = 0; i < product.length; i++) {
    if (product[i].name.includes(value)) {
      html += ` <div onclick="openProductDetail(${i})"class="product-item ${product[i].type_name}" >
                 <img class="product-img" src="./img/${product[i].image}" alt="" />
                 <p style="font-size: 1.2vw">${product[i].product_name}</p>
                 <p style="font-size: 1vw">${product[i].price} บาท</p>
                 </div>`;
    }
  }
  if (html == "") {
    $("#productlist").html(`<p>ไม่มีสินค้า</p>`);
  } else {
    $("#productlist").html(html);
  }
}

// กดปุ่ม
function searchproduct(param) {
  console.log(param);
  $(".product-item").css("display", "none");
  if (param == "all") {
    $(".product-item").css("display", "block");
  } else {
    $("." + param).css("display", "block");
  }
}

// กดรูป
var productindex = 0;
function openProductDetail(index) {
  productindex = index;
  console.log(productindex);
  $("#modalDesc").css("display", "flex");
  $("#mdd-img").attr("src",'./img/'+ product[index].image);
  $("#mdd-name").text(product[index].product_name);
  $("#mdd-price").text(product[index].price + ' บาท ');
  $("#mdd-desc").text(product[index].description);
}
function closeModal() {
  $(".modal").css("display", "none");
}

// เพิ่มตระกร้า
var cart = [];
function addtocart() {
  var pass = true;

  for (let i = 0; i < cart.length; i++) {
    if (productindex == cart[i].index) {
      console.log("found same product");
      cart[i].count++;
      pass = false;
    }
  }
  if (pass) {
    var obj = {
      index: productindex,
      id: product[productindex].Product_id,
      name: product[productindex].product_name,
      price: product[productindex].price,
      img: product[productindex].image,
      type_name : product[productindex].type_name,
      count: 1,
    };
    console.log(obj);
    cart.push(obj);
  }
  console.log(cart);

  Swal.fire({
   
    icon: "success",
    title: "เพิ่ม" + product[productindex].product_name + "ลงตระกร้าแล้ว",
    showConfirmButton: false,
    timer: 2000
    
  });

  // เลขตระกร้า
  $("#cartcount").css("display", "flex").text(cart.length);
}
// แสดงตระกร้า
function openCart() {
  $("#modalCart").css("display", "flex");
  rendercart();
}

// ตะกร้ารายละเอียด
function rendercart() {
  if (cart.length > 0) {
    var html = "";
    for (let i = 0; i < cart.length; i++) {
      html += `<div class="cartlist-item">
                        <div class="cartlist-left">
                         <img src="./img/${cart[i].img}" alt="" />
                         <div class="cart-detail">
                         <p style="font-size: 1.2vw; color: #3f464b">
                         ${cart[i].name}
                         </p>
                         <p style="font-size: 1vw; color: #3f464b">${
                           cart[i].price * cart[i].count
                         } บาท</p>
                        </div>
                        </div>
                            <div class="cartlist-right">
                             <p onclick="deinitems('-',${i})" class="btnc">-</p>
                             <p  id="countitems${i}" style="margin: 0 10px">${
                            cart[i].count
      }</p>
                            <p onclick="deinitems('+',${i})" class="btnc">+</p>
                        </div>
                        </div>`;
    }
    $("#mycart").html(html);
  } else {
    $("#mycart").html(`<p>ไม่มีสินค้าในตระกร้า</p>`);
  }
}

// บวกลบตระกร้า
function deinitems(action, index) {
  if (action == "-") {
    if (cart[index].count > 0) {
      cart[index].count--;
      $("#countitems" + index).text(cart[index].count);

      if (cart[index].count <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Are you sure?",
          showconfirmButton: true,
          confirmButtonColor: "#3085d6",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          ConfirmButtonText: "ลบ",
          CancelButtonText: "ยกเลิก",
        }).then((res) => {
          if (res.isConfirmed) {
            cart.splice(index, 1);
            console.log(cart);
            rendercart();
            $("#cartcount").css("display", "flex").text(cart.length);
            if (cart.length <= 0) {
              $("#cartcount").css("display", "none");
            }
          } else {
            cart[index].count++;
            $("#countitems" + index).text(cart[index].count);
          }
        });
      }
    }
  } else if (action == "+") {
    cart[index].count++;
    $("#countitems" + index).text(cart[index].count);
  }
}

// สั่งซื้อ
var amount = 0;
async function buy() {
  console.log(cart)
  var jsonData = JSON.stringify(cart);
  for (let i=0; i<cart.length ; i++) {
  let total = cart[i]['count'] * cart[i]['price']
  amount += total 
  }
  console.log(amount)
 console.log(jsonData)
  try{
    const dataFrom = new FormData()
    dataFrom.append('product',jsonData)
    dataFrom.append('amount',amount)


    const response = await fetch('./api/bilOrder.php',{
      method : 'POST',
      body : dataFrom,
    });
     cart=[];

     const data = await response.json();
     console.log(data.response);
    
     Swal.fire({
      icon: "success",
      title: "คำสั่งซื้อสำเร็จ",
      showconfirmButton: false,
      timer : 1000,
      
      // confirmButtonColor: "#3085d6",
      // ConfirmButtonText: "OK",
      }).then(()=>{
        
          cart = [];
        window.location.reload()
        
        
      })
     

  }catch(e){
    console.log(e)
  }
  
}

// function buynow(){
//   // console.log(cart)
//   $.ajax({
//     method: 'POST',
//     url: './api/buynow.php',
//     dataType: 'json',
//     data :{
//       'product' : cart
//     },
//     success: function(reponse) {
//       console.log(reponse)

//     },error: function(err){
//       console.log(err)
//     }
//   })
// }
