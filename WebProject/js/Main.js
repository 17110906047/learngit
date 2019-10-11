			$(function(){
				$("div.rightmenu span").mouseenter(function(){					
					var left = $(this).position().left;
					var top = $("div.menu").position().top;
					var width = $(this).css("width");
					var destLeft = parseInt(left) + parseInt(width)/2;	
					var top2=$("div.head span").position().top;
					$("img#catear").css("left",destLeft);
					$("img#catear").css("top",top+180);					
					$("img#catear").fadeIn(500);
				});
				$("div.rightmenu span").mouseleave(function(){
					$("img#catear").hide();
				});
			});
			function show(cid){
				$("div.productsAsideCategorys[cid="+cid+"]").show();
			}
			function hide(cid){
				$("div.productsAsideCategorys[cid="+cid+"]").hide();
			}
			$(function(){
				$("div.eachmenu").mouseenter(function(){
					var cid = $(this).attr("cid");
        			show(cid);
				})
				$("div.eachmenu").mouseleave(function(){
			        var cid = $(this).attr("cid");
			        hide(cid);
			    });
			    $("div.productsAsideCategorys").mouseenter(function(){
			        var cid = $(this).attr("cid");
			        show(cid);
			    });
			    $("div.productsAsideCategorys").mouseleave(function(){
			        var cid = $(this).attr("cid");
			        hide(cid);
			    });
			});
			$(function(){
				$("input.sortBarPrice").keyup(function(){
					var num=$(this).val();
					if(num.length==0){
						$("div.productUnit").show();
						return;
					}
					num=parseInt(num);
					if(isNaN(num)||num<=0){
						num=1;
					}
					$(this).val(num);
					var begin = $("input.beginPrice").val();
					var end = $("input.endPrice").val();
					if(!isNaN(begin) && !isNaN(end)){
						$("div.productUnit").hide();
						$("div.productUnit").each(function(){							
							var price=$(this).attr("price");
							price= new Number(price);
							if(price>=begin&&price<=end){
								$(this).show();
							}
						});
					}
				});
			});	
			$(function(){
				$("img.smallImg").mouseenter(function(){
					var bigimgurl=$(this).attr("bigImgUrl");
					$("img.bigImg").attr("src",bigimgurl);
				});
				$("img.bigImg").load(function(){
					$("img.smallImg").each(function(){
						var bigimgurl=$(this).attr("bigImgUrl");
						var img=new Image();
						img.src=bigimgurl;
						img.onload=function(){
							console.log(bigimgurl);
							$("div.img4load").append($(img));
						}
					})
				});
				var maxnum=66;
				$("input.productNumberSetting").keyup(function(){
					var num=$("input.productNumberSetting").val();
					num=parseInt(num);
					if(isNaN(num)||num<=0){
						num=1;
					}
					if(num>maxnum){
						num=maxnum;
					}
					$("input.productNumberSetting").val(num);
				});
				$(".increaseNumber").click(function(){
					var num=$("input.productNumberSetting").val();
					num=parseInt(num);
					num++;
					if(num>maxnum){
						num=maxnum;
					}
					$("input.productNumberSetting").val(num);
				});
				$(".decreaseNumber").click(function(){
					var num=$("input.productNumberSetting").val();
					num=parseInt(num);
					num--;
					if(num<1){
						num=1;
					}
					$("input.productNumberSetting").val(num);
				});
				$("div.productReviewDiv").hide();
				$("a.productReviewLink").click(function(){
					$("div.productReviewDiv").show();
					$("div.productDetail").hide();
				});
				$("a.productDetailLink").click(function(){
					$("div.productDetail").show();
					$("div.productReviewDiv").hide();
				})
			});
			$(function(){
				$("a[orderstatus]").click(function(){					
					var orderstatus=$(this).attr("orderstatus");
					//alert(orderstatus);
					if('all'==orderstatus){
						$("table[orderstatus]").show();
						//$("table[orderStatus]").show();
					}
					else{						
						$("table[orderstatus]").hide();
						$("table[orderstatus="+orderstatus+"]").show();
					}
					$("div.OrderTypeDiv div").removeClass("selectedDiv");
					$(this).parents("div").addClass("selectedDiv");
					
				});
			});
			function formatMoney(num){
				num=num.toString().replace(/\$|\,/g,'');
				num=Number(num);
				
				sign=(num==(num=(Math.abs(num))));
				num=Math.floor((num*100+0.5000000001));
				
				cents=num%100;
				if(cents<10){
					cents=".0"+cents;
				}
				else{
					cents="."+cents;
				}
				//num=num/100;
				num=Math.floor(num/100).toString();
				var leng=Math.floor((num.length-1)/3);
				for(var i=0;i<leng;i++){
					num=num.substring(0,num.length-(4*i+3))+","+
					num.substring(num.length-(4*i+3));
				}
				return (((sign)?"":"-")+num+cents);
			}
			$(function(){
				$("img.carProductSelect").click(function(){
					
					var selectit=$(this).attr("selectit");
					if(selectit=="selectit"){
						$(this).attr("src","http://how2j.cn/tmall/img/site/cartNotSelected.png");
						$(this).attr("selectit","false");
						$(this).parents("tr.cartProductItemTR").css("background-color","#fff");
					}
					else{
						$(this).attr("src","http://how2j.cn/tmall/img/site/cartSelected.png");
						$(this).attr("selectit","selectit");
						$(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
					}
					syncSelect();
					syncCreateOrderButton();
					calcCartSumPriceAndNumber();
				});
				$("img.selectAllItem").click(function(){
					var selectit=$(this).attr("selectit");
					if(selectit=="selectit"){
						$("img.selectAllItem").attr("src","http://how2j.cn/tmall/img/site/cartNotSelected.png");
						$(this).attr("selectit","false");
						$("img.carProductSelect").each(function(){
							$(this).attr("src","http://how2j.cn/tmall/img/site/cartNotSelected.png");
							$(this).parents("tr.cartProductItemTR").css("background-color","#fff");
							$(this).attr("selectit","false");
						});						
					}
					else{
						$("img.selectAllItem").attr("src","http://how2j.cn/tmall/img/site/cartSelected.png");
						$(this).attr("src","http://how2j.cn/tmall/img/site/cartSelected.png");
						$(this).attr("selectit","selectit");
						$("img.carProductSelect").each(function(){
							$(this).attr("src","http://how2j.cn/tmall/img/site/cartSelected.png");
							$(this).parents("tr.cartProductItemTR").css("background-color","#FFF8E1");
							$(this).attr("selectit","selectit");
						});
					}
					syncCreateOrderButton();
					calcCartSumPriceAndNumber();
				});
				$(".numberPlus").click(function(){
					var pid=$(this).attr("pid");
					var stock=$("span.orderItemStock").text();
					var num=$("input.orderItemNumberSetting[pid="+pid+"]").val();
					var price=$("span.orderItemPromotePrice[pid="+pid+"]").text();
					num=parseInt(num);
					num++;
					if(num>stock){
						num=stock;
					}
					$("input.orderItemNumberSetting[pid="+pid+"]").val(num);
					syncPrice(pid,num,price);
				});
				$(".numberMinus").click(function(){
					var pid=$(this).attr("pid");
					//var stock=$("span.orderItemStock").text();
					var num=$("input.orderItemNumberSetting[pid="+pid+"]").val();
					var price=$("span.orderItemPromotePrice[pid="+pid+"]").text();
					num=parseInt(num);
					num--;
					if(num<=0){
						num=1;
					}
					$("input.orderItemNumberSetting[pid="+pid+"]").val(num);
					syncPrice(pid,num,price);
				});
				$(".orderItemNumberSetting").keyup(function(){
					var pid=$(this).attr("pid");
					var stock=$("span.orderItemStock").text();
					var num=$("input.orderItemNumberSetting[pid="+pid+"]").val();
					var price=$("span.orderItemPromotePrice[pid="+pid+"]").text();
					num=Number(num);
					if(isNaN(num)||num<=0){
						num=1;
					}
					if(num>stock){
						num=stock;
					}
					$("input.orderItemNumberSetting[pid="+pid+"]").val(num);
					syncPrice(pid,num,price);
				});
			})
			function syncCreateOrderButton(){
				var flag=false;
				$(".carProductSelect").each(function(){
					if("selectit"==$(this).attr("selectit")){
						flag=true;
					}
				});
				if(flag){
					$("input.SettlementBtn").css("background-color","#C40000");
					$("input.SettlementBtn").removeAttr("disabled");
				}
				else{
					$("input.SettlementBtn").css("background-color","#AAAAAA");
					$("input.SettlementBtn").attr("disabled","disabled");
				}
			}
			function syncSelect(){
				var flag=true;
				$(".carProductSelect").each(function(){
					if("false"==$(this).attr("selectit")){
						flag=false;
					}
				});
				if(flag){
					$(".selectAllItem").attr("src","http://how2j.cn/tmall/img/site/cartSelected.png");
				}
				else{
					$(".selectAllItem").attr("src","http://how2j.cn/tmall/img/site/cartNotSelected.png");
				}
			}
			function calcCartSumPriceAndNumber(){
				var sum=0;
				var totalsum=0;
				$("img.carProductSelect[selectit='selectit']").each(function(){
					var oiid=$(this).attr("oiid");
					var price=$(".carProductPromotionSumPrice[oiid="+oiid+"]").text();
					price=price.replace(/,/g,"");
					price=price.replace(/￥/g,"");
					//alert(price);
					sum += new Number(price);
					//alert(sum);
					var total=$(".orderItemNumberSetting[oiid="+oiid+"]").val();
					totalsum += new Number(total);
				});
				$("span.money").html(formatMoney(sum));
				$("span.Number").html(totalsum);
			}
			function syncPrice(pid,num,price){
				$(".orderItemNumberSetting[pid="+pid+"]").val(num);
				var carProductPromotionSumPrice=formatMoney(num*price);
				$(".carProductPromotionSumPrice[pid="+pid+"]").html("￥"+carProductPromotionSumPrice);
				calcCartSumPriceAndNumber();
			}