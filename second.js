// get by using async promise a singel coin info by pressing more info btn
async function Get_Coin_Info(id, thi) {
    try {
        const coins_info = await Conect_Api("https://api.coingecko.com/api/v3/coins/" + id);
        Show_Coin_Data(coins_info, id, thi);

    }
    catch (err) {
        alert(err.message);
    }

}

// get by using async promise all  of the coins info
async function GetInfo() {
    try {

        const coins_info = await Conect_Api("https://api.coingecko.com/api/v3/coins/list");
        Show_Data(coins_info);



    }
    catch (err) {
        alert(err.message);
    }

}
// show all coin data 
function Show_Data(coin_info) {

    for (i = 0; i < 100; i++) {

        $("div.container-fluid").append(` 
<div id="${coin_info[i].id}" class="card col-xl-4"> 
  <div class="card-body" id="${coin_info[i].id}">
     <div class="from-check form-switch float-end">
        <input value="${coin_info[i].name}" class="form-check-input" type="checkbox" id="Switch">
 </div>
 
     <h6  class="card-title"> ${coin_info[i].symbol}<h6> 
        <p id="name" class="card-text">${coin_info[i].name}</p> 
        <a class="btn btn-primary"  id="call" tr="${coin_info[i].id}" data-bs-toggle="collapse" href="#id${coin_info[i].id}" 
        role="button" aria-expanded="false" aria-controls="id${coin_info[i].name}">
        More Details
        </a>

        <div class="collapse" id="id${coin_info[i].id}">
        <div class="card card-body" id="moreInfoText${coin_info[i].id}">

        </div>
      </div>
    
   
 ` );
    }


    // Search function by symbol only 
    $("#Search_btn").on("click", function (event) {
        event.preventDefault();
        var symbol = document.getElementById("Search").value;
        // run on all the   coin_info looking for all diffrint fron symbol i got from text id=Search and hide all except  the one i need by toggle
        for (i = 0; i < 100; i++) {
            if (coin_info[i].symbol != symbol) {

                $(document.getElementById(`${coin_info[i].id}`)).toggle();
            }
        }


    });


    $("input[type='checkbox']").on("change", function () {

        let coin_name = [];
        $("input[type='checkbox']:checked").each(function () {
            coin_name.push(this.value);
        });

        if (coin_name.length == 5) {

            Open_Model(coin_name);
        }
    });
    // creat the model
    function Open_Model(coin_name) {
        let text = "";
        for (i = 0; i < coin_name.length; i++) {
            text +=
                `<div   class=" .modal-content border border-primar">
${coin_name[i]} <button id="remove"  onclick="this.parentNode.parentNode.removeChild(this.parentNode);" class="btn-close" aria-label="Close"></button></br>
</div>
` }
        text += `
<div class="modal-footer">
<button type="button" id="close" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>
</div>
</div>
`;

        $("div.modal-content").html(text);
        document.getElementById('myModal').style.display = "block";
        $("#close").on("click", function () {
            document.getElementById('myModal').style.display = 'none';
            $("input[type='checkbox']:checked").each(function () {
                $("input[type='checkbox']").prop("checked", false);
            });
        });


    }

    $("#mainfo a").on("click", function () {
        let coinID = $(this).attr("tr");

        Get_Coin_Info(coinID, this);
        $(this).parent().append(`<div class="spinner-border" role="status">
           <span class="visually-hidden">Loa   ding...</span>
         </div>`);

    });

}
// connecting to the api  
function Conect_Api(Url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: Url,
            success: data => resolve(data),
            reject: err => reject(err.massage)
        });
    })
}

//show one coin info by press on more info
function Show_Coin_Data(coins_info, id) {
    let info = `<div id=${id} class="panel-collapse collapse">
 <div class="card card-body">
<img src="${coins_info.image.small}" alt="coin" width="50" height="60"> 
<p class="card-text">current price</p>
<p class="card-text">USD :${coins_info.market_data.current_price.usd} $</p>
<p class="card-text">ILS :${coins_info.market_data.current_price.ils} ₪</p>
<p class="card-text">EUR :${coins_info.market_data.current_price.eur} €</p>
    </div>  
     </div>`
    console.log(info);
    $("#moreInfoText" + id).html(
        `<img src="${coins_info.image.small}" alt="coin" width="50" height="60"> 
        <p class="card-text">current price</p>
        <p class="card-text">USD :${coins_info.market_data.current_price.usd} $</p>
        <p class="card-text">ILS :${coins_info.market_data.current_price.ils} ₪</p>
        <p class="card-text">EUR :${coins_info.market_data.current_price.eur} €</p> 
      `
    )

    $(".spinner-border").hide();



}

// show search result





