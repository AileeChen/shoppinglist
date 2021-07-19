$(document).ready(() => {
    //新增一個商品清單的物件
    var shoplist = {};
    shoplist.name = "MyBuylist 購物清單";
    //商品清單的清單裡面是個陣列，塞商品物件們
    shoplist.list = [{
        name: "Iphone 12",
        price: 29900,
    }, ];

    //定義元素用的html模板，{{名稱}}代表要套入的地方
    var item_html =
        "<li id={{id}} class='buy_item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";

    var total_html =
        "<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";

    //刪除並重新產生清單中所有項目
    function showlist() {
        $("#items_list").html("");
        var total_price = 0;
        //把每個項目做出來
        for (var i = 0; i < shoplist.list.length; i++) {
            var item = shoplist.list[i];
            var item_id = "buyitem_" + i;
            var del_item_id = "del_buyitem_" + i;

            //動態統計總價(每一項跑時加上去)
            total_price += parseInt(item.price);

            //取代模板位置成資料replace(要取代的,取代成...)
            var current_item_html = item_html
                .replace("{{num}}", i + 1)
                .replace("{{item}}", item.name)
                .replace("{{id}}", item_id)
                .replace("{{del_id}}", del_item_id)
                .replace("{{price}}", item.price)
                .replace("{{del_item_id}}", i);

            //加入元素後才能夠用jquery操作
            $("#items_list").append(current_item_html);
            $("#" + del_item_id).click(function() {
                remove_item(parseInt($(this).attr("data-delid")));
            });
        }
        //新增總價那一欄
        var current_total_html = total_html.replace("{{price}}", total_price);
        $("#items_list").append(current_total_html);
    }
    //先顯示一次，因為前面只定義好function 還沒有執行
    showlist();

    // 新增資料流程: 動態push一筆資料->呼叫showlist重新渲染清單
    $("#add").click(function() {
        //使用val()存取輸入的值，val("..") 有給參數是設定
        shoplist.list.push({
            name: $("#input_name").val(),
            price: $("#input_price").val(),
        });
        $("#input_name").val("");
        $("#input_price").val("");
        showlist();
    });

    //刪除項目 陣列.splice(位置,長度)
    //刪除資料->重新根據資料渲染清單
    function remove_item(id) {
        shoplist.list.splice(id, 1);
        showlist();
    }

    //
    // 用陣列存放物件
    const datas = [{
            product: "Macbook pro",
            url: "https://www.apple.com/tw-edu/shop/buy-mac/macbook-air",
            pic: "./img/macbook.jpeg",
            price: 49900,
        },
        {
            product: "USB",
            url: "https://tw.buy.yahoo.com/gdsale/SanDisk-128G-Ultra-Flair--7683654.html",
            pic: "./img/usb.jpg",
            price: 390,
        },
        {
            product: "Airpods pro",
            url: "https://www.apple.com/tw-edu/shop/product/MWP22TA/A/airpods-pro",
            pic: "./img/airpods.png",
            price: 7990,
        },
        // {
        //     product: "Ipad",
        //     url: "https://www.apple.com/tw-edu/shop/product/MWP22TA/A/airpods-pro",
        //     pic: "./img/ipad.jpeg",
        //     price: 18000,
        // },
        // {
        //     product: "Iphone",
        //     url: "https://www.apple.com/tw-edu/shop/product/MWP22TA/A/airpods-pro",
        //     pic: "./img/iphone12.jpg",
        //     price: 28800,
        // },
        // {
        //     product: "Type C",
        //     url: "https://www.apple.com/tw-edu/shop/product/MWP22TA/A/airpods-pro",
        //     pic: "./img/typec.jpg",
        //     price: 390,
        // },
    ];

    $("#add").on("click", () => {
        $(".items").empty()
        datas.forEach(function(data) {

            let product = data.product;
            let url = data.url;
            let pic = data.pic;
            let price = data.price;
            let demo = `
            <div class="rec_item">
                        <h5>${product}</h5>
                        <a
                            href=${url}
                        >
                            <img src=${pic} alt="" />
                        </a>
                        <div class="price">${price}</div>
                    </div>
            `;
            $(".items").append(demo);
        });
    });
});