$(function () {
    $('#index .main-item').on('click', function () {
        var text= $.trim($(this).find('.um-list-item-body').text());
        console.log(text);
        if(text=='单据'){
            $('.um-page').removeClass('active');
            $('#bill').addClass('active');
        }else if(text=='个人信息'){
            $('.um-page').removeClass('active');
            $('#info').addClass('active');
        }else if(text=='项目信息'){
            $('.um-page').removeClass('active');
            $('#project').addClass('active');
        }
    });
    $('.go-dest-cost').on('click', function () {
        $('.um-page').removeClass('active');
        $('#goDest').addClass('active');
    });
    $('.bo-back-company').on('click', function () {
        $('.um-page').removeClass('active');
        $('#goBack').addClass('active');
    });
    $('.um-back').on('click', function () {
        $('.um-page').removeClass('active');
        $('#index').addClass('active');
    })
     $('.um-tabbar-underline li').on('click', function () {
         $('.um-tabbar-underline li').removeClass('active');
         $(this).addClass('active');
         var index=$('.um-tabbar-underline li').index($(this));
         if(index==0){
             $('#transportation').show();
             $('#cost').hide();
             $('#subsidy').hide();
         }else if(index==1){
             $('#transportation').hide();
             $('#cost').show();
             $('#subsidy').hide();
         }else if(index==2){
             $('#transportation').hide();
             $('#cost').hide();
             $('#subsidy').show();
         }

     })
     $('#goDest .btn-style').on('click', function () {
         var goDestCount=0;
         $.each($('#goDest .go-dest-money'),function (i,item) {

             var val= $(item).val() ==''? '0':$(item).val();
             console.log(val);
             goDestCount=goDestCount+ parseInt(val)
         });
         $('#transportation .go-dest-cost .um-gray').text(goDestCount.toFixed(2));
         $('.um-page').removeClass('active');
         $('#index').addClass('active');
     });
    $('#goBack .btn-style').on('click', function () {
        var backComCount=0;
        $.each($('#goBack .back-company-money'), function (i, item) {
            var val= $(item).val() ==''? '0':$(item).val();
            backComCount=backComCount+ parseInt(val);
        })
        $('#transportation .bo-back-company .um-gray').text(backComCount.toFixed(2));
        $('.um-page').removeClass('active');
        $('#index').addClass('active');
    })
    $('#transportation .money-count').on('DOMNodeInserted', function () {
       var count=parseFloat( $('#transportation .money-count').eq(0).text())+parseFloat( $('#transportation .money-count').eq(1).text());
        console.log(count);
        $('#index .total-money').text(parseFloat(count).toFixed(2));
    });

})

