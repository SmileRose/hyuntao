(function(){    var timeSport = {        init:function(){            var content = this.content =  $(timeSport.defaults.content);            var _this = this;            content.on('click',timeSport.defaults.clickEle,function(){                if(_this.isShow)return;                _this.toClick($(this));                return false;            });        },        toDown:function(ele,call){            this.downEle = ele;            var li = ele.prev();            ele.removeClass(timeSport.defaults.active);            li.removeClass(timeSport.defaults.liActiveClass).addClass(timeSport.defaults.liAutoClass);            if(call)call();        },        toUp:function(ele,call){            this.upEle = ele;            var li = ele.prev();            ele.addClass(timeSport.defaults.active);            li.removeClass(timeSport.defaults.liAutoClass).addClass(timeSport.defaults.liActiveClass);            if(call)call();        },        toClick:function(ele){            var span = ele.find('span');            if(span.hasClass(timeSport.defaults.active)){                return;            }            this.notDone = null;            this.toShow(span);        },        toShow:function(ele){            this.isShow = true;            this.showCount = 2;            var _this = this;            this.toDown(this.content.find('.' + timeSport.defaults.active) ,function(){                _this.toCheckShow();            });            this.toUp(ele , function(){                _this.toCheckShow();            });        },        toShowCode:function(code){            this.notDone = true;            var codeEle = this.content.find('['+timeSport.defaults.code+'="'+code+'"]');            if(codeEle[0]){                if(this.isShow){                    this.showEnd();                }                this.toShow(codeEle);            }else {                this.notDone = false;            }        },        showEnd:function(){        },        toCheckShow:function(){            this.showCount --;            if(this.showCount == 0){                this.isShow = false;                this.isEnd();            }        },        isEnd:function(){            if(this.notDone){                this.notDone = null;            }else{                productSport.toShowCode(this.content.find('.'+timeSport.defaults.active).attr(timeSport.defaults.code));            }        },        isShow:false    };    timeSport.defaults = {        content:'.accordion',//时间外层选择器        active:'activeBox',        liActiveClass:'colck_now',        liAutoClass:'colck',        code:'rollingCode',        clickEle:'.sub-menu li',//点击触发的选择器        upTime:1000, //变大时间 暂时没用上        downTime:1000//变小时间 暂时也没用上    };    timeSport.init();    var productSport = {        init:function(){            var content = this.content = $(productSport.defaults.content);            this.listHeight = content.children().eq(0).height();            var _this = this;            this.autoTop = this.content.offset().top;            $(window).scroll(function(e){                if(_this.mousewheel && _this.isScroll){                    _this.showPause();                }               _this.scroll();            });            $(document).mousewheel(function(e){                _this.mousewheel = true;                setTimeout(function(){                    _this.mousewheel = false;                },1);            });        },        toShowCode:function(code){            var codeEle = this.content.find('['+timeSport.defaults.code+'="'+code+'"]');            if(codeEle[0]){                this.code = code;                this.toShow(codeEle.eq(0));            }        },        toShow:function(ele){            if(this.isScroll){                this.showPause();            }            this.scrollTop(ele.prevAll().length * this.listHeight + this.autoTop + (ele.prevAll().length > 1?(ele.prevAll().length-1) * productSport.defaults.margin:0) + 10);        },        showPause:function(){            this.isScroll = false;            $('body').stop(true);        },        toSetTop:function(){            var _top = $('body').get(0).scrollTop || $(window).scrollTop();            $('body').css({                zIndex:_top            });            if(this.autoTop > _top){                $('.fast_buy_time_colck').css({                    top: this.autoTop - _top                });            }else{                $('.fast_buy_time_colck').css({                    top: 0                });            }        },        scrollTop:function(_top){            if(_top <= this.autoTop + 10 )_top = 0;            this.isScroll = true;            var _this = this;            $('body').animate({                scrollTop : _top,                zIndex : _top            },{                speed:productSport.defaults.time,                done:function(){                    setTimeout(function(){                        _this.isScroll = false;                    },10);                },                step:function(a , b){                    if(a >= 0 && b.prop == 'zIndex'){                        if($('body').scrollTop() == 0){                            $(window).scrollTop(a);                        }                    }                }            });        },        scroll:function(){            this.toSetTop();            if(!this.isScroll){                var _top = $('body').get(0).scrollTop || $(window).scrollTop();                var index = Math.floor((_top - this.autoTop) / this.listHeight) ;                if(index < 0) index = 0;                var _code = this.content.children().eq(index).attr(timeSport.defaults.code);                if(_code){                    if(_code != this.code){                        timeSport.toShowCode(_code);                    }                    this.code = _code;                }            }        }    };    productSport.defaults = {        content:'.list_box_all',//商品外层的div        margin:17,// 2个商品的间距  margin加上border        time:2000 //移动时间    };    productSport.init();    productSport.scroll();})();