window.onload = function(){
	/*
	 * 全选需求：点全选，全部选中，已选（4），取消全选，全部空，已选（0）
	 */
	var selectAll = document.getElementById("selectAll");
	var inputs = document.querySelectorAll("tbody input");
	var trs = document.querySelectorAll("tbody tr");
	var trss = document.getElementsByClassName("goods");
	var selectedNum = 0;
	var colorBtns = document.querySelectorAll(".color a");
	var colorCons = document.querySelectorAll(".color div")

	selectAll.onclick=function(){
		for(var i=0;i < inputs.length;i++){
			inputs[i].checked = this.checked;
			trs[i + 1].className = this.checked?'active':'';
			selectedNum=this.checked?inputs.length:0;
			selected.innerHTML='已选（'+selectedNum+'）';
		}
	}
	/*
	 * 单选需求：点某个商品勾，颜色变化，已选变化，若全部打钩，则全选
	 * 取消某个的对勾，颜色恢复，已选变化，去掉全选。
	 */
	for (var i=0;i<inputs.length;i++){
		inputs[i].index = i;
		inputs[i].onclick=function(){
			trs[this.index + 1].className = this.checked?'active':'';
			this.checked?selectedNum++:selectedNum--;
			selected.innerHTML='已选（'+selectedNum+'）';
			selectAll.checked = selectedNum == inputs.length?true:false;
		}
	}
	/*
	 * 打开选项卡选择颜色
	 */
	for(var i=0;i<colorCons.length;i++){
		colorBtns[i].index = i;
		colorBtns[i].onclick=function(){
			changeColor(this.index);
		}
	}
	function changeColor(n){
		var dis=colorCons[n].style.display;
		colorCons[n].style.display=dis == 'block'?'none':'block';
		var dt=colorCons[n].querySelector("dt");
		var dds=colorCons[n].querySelectorAll("dd");
		var imgs=colorCons[n].querySelectorAll("img");
		var ImgSrc=imgs[0].src;
		var sureBtn=colorCons[n].querySelector('span');
	    var bigImgs=document.getElementsByClassName("image");
		for(var i=0;i<dds.length;i++){
			dds[i].index=i;
			dds[i].onclick=function(){
				for(var i=0;i<dds.length;i++){
					dds[i].className='';
				}
				this.className='active';
                dt.innerHTML=imgs[this.index].alt;
				ImgSrc=imgs[this.index].src;
			}
		}
		sureBtn.onclick=function(){
				colorCons[n].style.display='none';
				colorBtns[n].innerHTML=dt.innerHTML+'+';
				bigImgs[n].src=ImgSrc;
		};
	}
	/*
	 * 加减价格
	 */
	for(var i=0;i<trss.length;i++){
		count(i);
		}
				
	function count(n){
		var spans=trss[n].querySelectorAll('td:nth-of-type(5) span');
		var strong=trss[n].querySelector('td:nth-of-type(5) strong');
		var price=trss[n].querySelector('td:nth-of-type(4)');
		var subTotal=trss[n].querySelector('td:nth-of-type(6)');
					
		var num=0;		//已选商品的数量
	//加的功能
		spans[1].onclick=function(){
				num++;
				strong.innerHTML=num;
				subTotal.innerHTML=parseFloat(price.innerHTML)*num+'.00元';
				sum();
		};
    //减的功能
		spans[0].onclick=function(){
				num--;
				if(num<0){
				     num=0;
					}		
				strong.innerHTML=num;
				subTotal.innerHTML=parseFloat(price.innerHTML)*num+'.00元';	
				sum();
			};
	}
	//求和功能
		function sum(){
			var td=document.querySelectorAll("tfoot td")[1];
			var expensive=0;		//最贵的价格
			var total=0;			//总价
					
			for(var i=0;i<trss.length;i++){
				    var selectNum=trss[i].querySelector('strong').innerHTML;
					var price=trss[i].querySelector('td:nth-of-type(4)').innerHTML;
					var subTotal=trss[i].querySelector('td:nth-of-type(6)').innerHTML;
					total+=parseFloat(subTotal);
						if(selectNum>0){
							if(expensive<parseFloat(price)){
								expensive=parseFloat(price);
							}
						}
					}
					td.innerHTML='<p>应付总额：<strong>'+total+'.00元</strong></p><p>最贵的商品为：'+expensive+'.00元</p>';
			}
}
