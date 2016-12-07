function shareCancle() {
    UM.share.close();
}
$(function () {
    $('#main .phone').on('click', function () {
        UM.actionsheet({
            title: '这是新的',
            items: ['拍照', '录像'],
            callbacks: [function () {
                alert('拍照')
            }, function () {
                alert('录像')
            }]
        });
 alert(111)  
    })
    $('.um-list-item-left').on('click', 'button', function () {
        var $this = $(this);
        if ($(this).hasClass('alert')) {
            UM.alert({
                title: '您点击了警示框按钮',
                btnText: ["取消", "确定"],
                overlay: true,
                ok: function () {
                    console.log($this.parent().next().children('.form-control'));
                    $this.parent().next().children('.form-control').val('已点击');
                }
            });

            //UM.alert();
        } else if ($(this).hasClass('prompt')) {
            UM.prompt({
                title: '请输入信息',
                btnText: ["取消", "确定"],
                overlay: true,
                ok: function () {
                    $this.parent().next().children('.form-control').val($('.um-modal-content .form-control').val());
                },
                cancle: function () {
                    $this.parent().next().children('.form-control').val('');
                }
            })

            //UM.prompt()
        } else if ($(this).hasClass('confirm')) {
            UM.confirm({
                title: '友情提示：',
                text: '您确定要更改按钮颜色吗？',
                btnText: ["取消", "确定"],
                overlay: true,
                ok: function () {
                    $this.css('backgroundColor', 'red');
                },
                cancle: function () {
                    $this.css('backgroundColor', '#007aff');
                }
            });

            // UM.confirm()
        } else if ($(this).hasClass('login')) {
            UM.login({
                title: '请输入登录信息',
                btnText: ["取消", "确定"],
                overlay: true,
                ok: function () {
                    if ($('.um-modal-input .form-control').val() != '') {
                        $this.parent().next().children('.form-control').val('已登录');
                    } else {
                        $this.parent().next().children('.form-control').val('账号密码不正确');
                    }
                },
                cancle: function () {
                    $this.parent().next().children('.form-control').val('未登录');
                }
            });
            //UM.login();
        } else if ($(this).hasClass('toast')) {
            UM.toast({title: '友情提示：', text: '2秒后消失', duration: 2000});
        } else if ($(this).hasClass('loading')) {
            UM.showLoadingBar({
                text: "正在加载",
                icons: 'ti-reload',
            })
            setTimeout(function () {
                UM.hideLoadingBar();
            }, 3000);
        }
    })
    $('.um-grid-row').on('click', '.item', function () {
        var text = $(this).find('div').text();
        alert(text);
        UM.share.close();
    })
});

       