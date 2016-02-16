window.onload=function(){
	
	




	

	//------------------思考--------
	//js如果会哪些处理文档结构的方法，会给我们带来很大的便捷。
	//---增  删  改  查----

	//查
	//var cc=function(){}
	//document.getElementById();
	// 1.实参必须是一个字符串或者求值得到的字符串
	// 2.一定要检查自己的页面有没有这个id为实参的元素
	// 3.该方法的返回值为一个代表了ID为实参的元素的对象
	//这个对象有很长的原型链，链上所有的方法都可以调用

	//var els=document.getElementsByClassName('string');
	// 1.该方法的返回值是一个类数组对象
	//2.{0:div,1:div,2:div,3:div,length:4}
	//改
	//setAttribute(",")

	// 习题：写一个函数addClass(el,class)
	// var ee=document.getElementById('u');
	// var class='cc dd ee ff';
	// addClass(ee.class);
	// 会给id为u的元素 加上 cc dd ee ff四个class,并且会保留原来的class
	// 如果原来的类名本身就有cc dd ee ff 要求我们的函数不会重复添加。
	// var addClass=function(el, class){
	// 	var ee=document.getElementById('u');
	// 	var tmpArr=document.getAttribute('class').split(' ');
	// 	var Class=tmp.push('cc,dd,ee,ff')
	// 	var sss=Class.join(' ');
	// 	var newClass=setAttribute('class','sss');



	// 习题二“removeClass(el,class)
	// 'a,b,c,d''a c'
	// var el5=document.getElementById('u');
	// var xx='a b  c  d ';
	// var TBQ;
	// var removeChild=function(el,class){
	// 	TBQ=el5.
	// 	a=	xx.split(' ');
	// 	b=TBQ.split(' ');
	// }



	// };



	//新增
	//document.createElement('div');
	// var el=document.getElementById('u')
	// var li=document.createElement('li')
	// li.innerHTML=4;
	// el.appendChild(li);

	//删除
	// var three=document.getElementById('three');
	// el.removeChild(three);

	// document.getElementById()  document.getElementsByClassName()

	// el.getAttribute();
	


	// var n=document.createElement('li');
	// el.appendChild();

	// var s=document.getElementById('s');
	// el.removeChild(s);
	
	
	// console.log(lie);
	// var el=document.getElementById();
	// var div=document.createElement();
	//el.innerHTML('');

	// el.appendChild();
	// el.removeChild();

	// el.setAttribute();
	// el.getAttribute();
	// el.hasAttribute();
	// el.removeAttribute();



// 	var tmp=document.getElementById('0_2')
// 	var i=0;
// 	while(tmp){
// 	tmp.style.background='red';
// 	tmp=tmp.nextElementSibling;
// 	i++;
// 	if(i==5)break;
// }
	

	//从一个元素开始， 可以找到下一个，上一个和父元素
	//nextElementSibling
	// previousElementSibling
	// parentElement
	//从一个元素开始， 也可以找到子元素(子元素中的第一个，最后一个)
	//children;
	//lastElementChild;
	//firstElementChild;


	// document.querySelector() 参数是一个字符串  使用css的选择器  选取一个元素
	// document.querySelectorAll() 参数是一个字符串 使用css的选择器语法 选取元素集合
	// document.getElementsByClassName();




	//获取当前滚动条的高度
	//document.body.scrollTOp



	 
	  
	  
	//写一个函数  
	// insert After(parent,insert,positionElement);
// 	var u=document.getElementById('u');
// 	var li=document.createElement('li');
// 	li.innerHTML=5;
	
// 	var three=document.getElementById('three');

// 	var insertAfter=function(parent,insert,positionElement){
// 		var TBQ=positionElement.nextElementSibling;
// 		if(TBQ){
// 			parent.insertBefore(insert,positionElement.nextElementSibling);
// 		}else{
// 			parent.appendChild(insert);
// 		}
	
	
// }
//     insertAfter(u,li,three);


	

	var sence=document.getElementById('sence');
	var row=15;
	
// 	var aa=Math.floor((525-row)/row)+'px';
// 	for(var i=0;i<row;i++){
//     var el=document.createElement('div');
// 	el.style.top=(525/row)/2+(525/row)*i+'px';
// 	el.style.position='absolute';
// 	el.style.width='525px';
// 	el.style.height='2px';
// 	el.style.background='#000';
// 	sence.appendChild(el);
// 	}
// 	for(var i=0;i<row;i++){
// 	var el2=document.createElement('div');
// 	el2.style.left=(525/row)/2+(525/row)*i+'px';
// 	el2.style.position='absolute';
// 	el2.style.width='2px';
// 	el2.style.height='525px';
// 	el2.style.background='#000';
// 	sence.appendChild(el2);
// }	

	
	

	var row=15;
	var el1=document.getElementById('sence');
	for(i=0;i<row;i++){
		for(var j=0;j<row;j++){
		var aa=document.createElement('div');
		aa.setAttribute('class','block');
		aa.setAttribute('id',i+'_'+j);
		aa.style.width=(525-row)/15+'px';
		aa.style.height=(525-row)/15 +'px';
		// aa.style.webkitTransform='scale(0.8)';
		
		el1.appendChild(aa);
		}
	}
	// var cc=function(){
	// 	var el3=document.createElement('div');
	// el3.setAttribute('class','screen');
	// el3.innerHTML='恭喜！您赢了';
	// el1.appendChild(el3);

	// }
	// var dd=function(){
	// 		var el4=document.createElement('div');
	// 		el4.setAttribute('class','button');
	// 		el4.innerHTML='再来一局';
	// 		el4.style.fontSize='3em';

	// 		el1.appendChild(el4);
	// }
	
	var blocks=document.getElementsByClassName('block');
	var kaiguan=true;
	var dict1={};
	var dict2={};
	var panduan=function(id,dict){
		var x=Number(id.split('_')[0]);
		var y=Number(id.split('_')[1]);
		console.log(x,y);
		var hang =1;
		var lie=1;
		var zuoxie=1;
		var youxie=1;
		// var youxie=1;
		var tx=x; ty=y;
		while(dict[tx+'_'+(ty+1)]){
			hang++;ty++;
		}
		 tx=x;ty=y;
		 while(dict[tx+'_'+(ty-1)]){
		 	hang++;ty--;
		 }
		 tx=x;ty=y;
		 while(dict[(tx+1)+'_'+ty]){
		 	lie++;tx++;
		 }
		 tx=x;ty=y;
		 while(dict[(tx-1)+'_'+ty]){
		 	lie++;tx--;
		 }
		 tx=x;ty=y;
		 
		 while(dict[(tx+1)+'_'+(ty+1)]){
		 	youxie++;tx++;ty++;
		 }
		 tx=x;ty=y;
		 while(dict[(tx-1)+'_'+(ty-1)]){
		 	youxie++;tx--;ty--;
		 }
		 tx=x;ty=y;
		 while(dict[(tx-1)+'_'+(ty+1)]){
		 	zuoxie++;tx--;ty++;
		 }
		 tx=x;ty=y;
		 while(dict[(tx+1)+'_'+(ty-1)]){
		 	zuoxie++;tx++;ty--;
		 }
		 if(hang==5){return true;}
		 if(lie==5){return true;}
		 if(zuoxie==5){return true;}
		 if(youxie==5){return true;}

		// var id=i+'_'+j;
		// for(var i=0;i<blocks.length;i++){
			
			return false;
		// }
	}
	for(var i=0;i<blocks.length;i++){
	blocks[i].onclick=function(){
		// console.log(this.getAttribute('id'));
		if(this.hasAttribute('hasColor')){
		// this.style.background='#ffcd23';
		// this.setAttribute('aa','true');
		return;
	}
		var id=this.getAttribute('id');
		// this.style.boxShadow='0 2px 3px black';
		if(kaiguan){
			this.style.background="url(./images/black.png)";kaiguan=false;
			dict1[id]=true;
			
			if(panduan(id,dict1)){ee();}
		}else{
			this.style.background='url(./images/white.png)';kaiguan=true;
			dict2[id]=true;
			
			if(panduan(id,dict2)){ee();}
		}
		this.setAttribute('hasColor',true);
		
		}
  
	}
	var ee=function(){
		location.replace('tips.html');
	}
	var close=document.getElementById('close');
	close.onclick=function(){
		if(confirm("您确定要退出吗？")){
			window.opener=null;
			window.close();
			console.log(1);
		}
		else{}
	}
	var setpage=document.getElementById('setpage')
	var k=true;
	

	setpage.onclick=function(){
		if(k){
			this.innerHTML='关闭声音';
			test.play();
			k=false;
		}
		else{
			this.innerHTML='开启声音';
			test.pause();
			k=true;
		}
	}
	var renji=document.getElementById("renji");
	renji.onclick=function(){
		if (confirm("确认选择单人模式吗")) {
			location.replace("gobang.html")
		};
		
	}
		
	// var el3=document.getElementsByTagName('button');
	// el3.onclick=function(){
	// 	location.replace('index.html');
	// 	// location.reload();
	// }

	// 	var i=0;
	// 	var scrollTop=function(){
	// 	document.body.scrollTop=i++;
	// 	console.log(i);
		
	// 	if(i>4000){
	// 		clearInterval(t);
	// 	}
		
		
	// };
	//  t=setInterval(scrollTop,10);

// 	var on=document.getElementsByClassName('aa');
// 	var down=document.getElementsByClassName('bb');
// 	var kaigua=true;
// 	var index=0;
// 		for(i=0;i<3;i++){
			
// 		on[i].onclick=function(){
// 			var bbb=this.nextElementSibling.nextElementSibling.nextElementSibling;
// 		if(kaigua){
		
// 		this.style.background='green'; bbb.style.background='red';kaigua=false;index++}
// 		else{this.style.background='red'; bbb.style.background='green';kaigua=true;index++}
	
// 		console.log(index);
// 	}
// };
     		// 	for(i=0;i<3;i++){
			
// 		down[i].onclick=function(){
// 		var ddd=this.nextElementSibling.nextElementSibling.nextElementSibling;
// 		if(kaigua){this.style.background='red';ddd.style.background='green';kaigua=false;}
// 		else{this.style.background='green'; ddd.style.background='red';kaigua=true;}

			
	
// 	// 	down[i].onclick=function(){
// 	// 	this.style.background='red';
// 	// }
		
// 	}
// }

var shang=document.getElementsByClassName('aa');
var xia=document.getElementsByClassName('bb');
// shang[0].kaiguan=true; shang[1].kaiguan=true;shang[2].kaiguan=true;
for(var i=0;i<shang.length;i++){
	shang[i].index=i;
	shang[i].onmouseout=function(){
		xia[this.index].style.opacity=0;
	};
	shang[i].onmouseover=function(){
		xia[this.index].style.opacity=1;
	}


	// shang[i].index=i;
	// shang[i].kaiguan=true;
	// shang[i].onmouseover=function(){
	// if(this.kaiguan){
	// this.style.background='green';
	// xia[this.index].style.background='red';
	// xia[this.index].style.opacity='0.1';
	// this.kaiguan=false;
	// }else{
	// this.style.background='red';
	// xia[this.index].style.background='green';
	// xia[this.index].style.opacity='1';
	// this.kaiguan=true;
	// 	}
	// }
	



	// shang[i].onclick=(function(x){
	// 	return function(){
	// 	this.style.background='green';
	// 	xia[x].style.background='red';
	// 	}
		
		
	// })(i);

// shang[i].aaa=i;
};

	

};