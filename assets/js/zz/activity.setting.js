(function(){
    var table = $('table[discount]');
    $('[discount]:button').click(function(){
        var num = $(this).closest('div').find(':text').val();
        if(num && !isNaN(num)){//有值 且是数字
            var discount = $(this).attr('discount');
            Table.setDiscount(discount , num);
        }
    });
    var Table = {
        totalAttr:'_total',
        setDiscount:function(discount , num){
            var ele = table.find('[discount='+discount+']');
            var _this = this;
            var index  = this.getIndex(ele);
            this.getDataElement().each(function(){
                $(this).children().eq(index).find('input').each(function(){
                    $(this).val(($(this).attr(_this.totalAttr) * num / 10).toFixed(2));
                });
            })
        },
        getIndex:function(ele){
            return $(ele).parent().children().index(ele[0]);
        },
        getTotalIndex:function(ele){
            return this.getIndex($('[discount=TOTAL]'));
        },
        getDataElement:function(){
            return table.find('tr:gt(0)');
        },
        toMoney:function(num){
            var first = this.getFirst();
            var _this = this;
            var dataEle = this.getDataElement();
            first.find('[discount]').not(':first').each(function(){
                var index = _this.getIndex($(this));
                dataEle.each(function(){
                    $(this).children().eq(index).find('input').each(function(){
                       $(this).val((Math.floor($(this).val() * num) / num).toFixed(2));
                    });
                });
            });
        },
        getFirst:function(){
            return table.find('tr').first();
        },
        toSetTotal:function(){
            var first = this.getFirst();
            var _this = this;
            var dataEle = this.getDataElement();
            first.find('[discount]').not(':first').each(function(){
                var index = _this.getIndex($(this));
                dataEle.each(function(){
                    $(this).children().eq(index).find('input').each(function(){
                        $(this).attr(_this.totalAttr,$(this).val());
                    });
                });
            });
        }
    };
    $('[toMoney]').click(function(){
        Table.toMoney( $(this).attr('toMoney'));
        return false;
    });
    $(function(){
        Table.toSetTotal();
    })
})();