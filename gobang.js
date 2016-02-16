var tag;
var winner;
var tds;    //下棋点的对象
var useTime;
var tRecord;
var nowBK ;

var presentperson;  //决定人先下，还是机器先下
var personstep;
var machinestep;
var timerObj = new Array(2);  //用时显示框

var maxsize=15;
var chese=new Array(maxsize*maxsize);
var chesevalue=new Array(maxsize*maxsize);
for(var i=0;i<maxsize*maxsize;i++)//初始化棋盘
  { chese[i]=0;
  }
	
	function init(){               //初始化
		tds = document.getElementsByTagName('td'); 		//获取引用	
		nowBK = document.getElementById('imgBK');
		timerObj[0] = document.getElementsByName('timer')[0];
		timerObj[1] = document.getElementsByName('timer')[1];
		timerObj[0].disabled = true;   //时间显示文本框为只读
		timerObj[1].disabled = true;
		timerObj[0].value = changeNum(0);   //时间的初始显示值为 00：00：00
		timerObj[1].value = changeNum(0);
		useTime = [0, 0];                  //该数组用来记录两方的用时，初始化为0
		tag = 'black';                     //该下棋子的颜色
		nowBK.src = 'images/' + tag + '_cur.gif';  //该下的棋子提示颜色
		personstep = 0;                  //初始化人和机器的下棋步数为0
		machinestep = 0;
		presentperson = true;        //初始化人先下， 如果为false，则电脑先下
		winner = false;             //初始获胜方为false
		for(temp in tds){
			tds[temp].qi = 0;           //初始化每格的棋子记录为0
			tds[temp].num = temp;		//初始化棋盘位置标记数num 0~224
		}
		chese = tds;
		
		
	}		
	function startGame(){
		clearInterval(tRecord);
		if(!winner){
			for(temp in tds){
				tds[temp].onclick = play;		
			}
			tRecord = setInterval("showTimer(tag)", 1000); 
		}	
	}
	function resetGame(){
		clearInterval(tRecord);
		tag = 'black';
		winner = false;
		useTime[0] = 0;
		useTime[1] = 0;
		timerObj[0].value = changeNum(0);
		timerObj[1].value = changeNum(0);
		nowBK.src ='images/' + tag + '_cur.gif';  //该下的棋子颜色
		personstep = 0;                  //初始化人和机器的下棋步数为0
		machinestep = 0;
		presentperson = true;        //初始化人先下， 如果为false，则电脑先下
		tRecord = setInterval("showTimer(tag)", 1000);
		for(temp in tds){
			tds[temp].onclick = play;		
		}
		for(temp in tds){
			tds[temp].qi = 0;
			tds[temp].style.background = 'url(123.jpg)';  //有问题
		}
		
	}
	function suspendGame(){
		if(!winner){
			clearInterval(tRecord);
			for(temp in tds){
				tds[temp].onclick = '';		
			}
		}
	}
	function showTimer(tg){
		
		if(tg == 'black'){
			useTime[0] += 1;
			timerObj[0].value = changeNum(useTime[0]);
		}else{
			useTime[1] += 1;
			timerObj[1].value = changeNum(useTime[1]);
		}
	}
/*********************  开始游戏 **************************/	
	function play(){                   //开始游戏
		
		if(winner){
			alert('恭喜' + winner + '获胜了');
			return;
		}
		if(presentperson){
			
			if(this.qi != false){
				alert('此处已有棋子');
				return false;
			}
			this.style.background = 'url(images/' + tag + '.png)';
			this.qi = (tag == 'black') ? '1':'2';        //保存该位置棋子的信息
			tag = (tag == 'black') ? 'white':'black';
			nowBK.src ='images/' + tag + '_cur.gif';  //该下的棋子颜色
			judge.call(this);
			presentperson = !presentperson;
			personstep++;
		}else{                            //机器下棋
			if(this.qi != false){
				//alert('此处已有棋子');
				return false;
			}
			this.style.background = 'url(images/' + tag + '.png)';   //下棋
			this.qi = (tag == 'black') ? '1':'2';        //保存该位置棋子的信息
			tag = (tag == 'black') ? 'white':'black';
			nowBK.src ='images/' + tag + '_cur.gif';  //该下的棋子颜色
			judge.call(this);
			presentperson = !presentperson;
			machinestep++;
		}
		
		if(!presentperson){machinedecideposition();}   //加入机器智能下棋
	}
	function judge(){
		var curr = getPos(this.num);       //获取当前棋子位置  
		var line = ['', '', '', ''];     //存放四种获胜的条件方向的棋子
		for(var i=0; i<225; i++){
			var temp = getPos(i);
			if(curr.x == temp.x){        //竖向的棋子记录
				line[0] += tds[i].qi;
			}
			if(curr.y == temp.y){       //横向的棋子记录
				line[1] += tds[i].qi;
			}
			if((curr.x + curr.y) == (temp.x + temp.y)){    //左下斜的棋子记录
				line[2] += tds[i].qi;
			}
			if((curr.x - curr.y) == (temp.x - temp.y)){    //右下斜的棋子记录
				line[3] += tds[i].qi;
			}	
		}
		for(buffer in line){
			if(line[buffer].indexOf('11111') >= 0){       //判断黑方是否获胜
				winner = '您';
				break;
			}
			if(line[buffer].indexOf('22222') >= 0){       //判断白方是否获胜
				winner = '电脑';
				break;
			}
		}
		
		if(winner){
			clearInterval(tRecord);
			alert( winner + '赢了!');
		}
	}
	function changeNum(bNum){            //把数字转化为时间格式
		var buffer;
		buffer = '' + parseInt(bNum/3600/10) + parseInt(bNum/3600%10) + ':' +
					parseInt(bNum%3600/60/10) + parseInt(bNum%3600/60%10) + ':' 
					+ parseInt(bNum%60/10) + parseInt(bNum%60%10);
		return buffer;
	}
	function getPos(num){                  //获取点num的x,y坐标     
		var pos = {};
		pos.y = parseInt(num/15);
		pos.x = num%15;
		return pos;
	}
	
/***************************************  机器智能  ******************************************/
function machinedecideposition() //机器决定下一步的位置
{ //在第一层节点选择的时候采用贪婪算法，直接找出相对分数比较高的几个形成第一层节点，目的是为了提高搜索速度和防止堆栈溢出。
  if(machinestep == 0) //机器走第一步
    { 
		if((play.call(tds[112])) == false){
			play.call(tds[96]);  //6-6
		}
    }else if(machinestep == 1) //机器走第二步
	{ 
	  
		if((play.call(tds[112])) == false){      //7-7
			if((play.call(tds[96])) == false){  //6-6
				if(play.call(tds[111]) == false){ //6-7
					play.call(tds[97]);           //7-6
				}				
			}
		}
        
    }
	
   else {  var checkword=2; //先判断机器的，在设置为1判断这个位置对人的贡献
     for(var tttt=0;tttt<maxsize*maxsize;tttt++)
        chesevalue[tttt]=-10;//初始化
     for(var i=0;i<maxsize;i++)
        for(var j=0;j<maxsize;j++)
         { if(chese[maxsize*i+j].qi!=0) //the position is occupied
              continue;
     
		      var total=1;
		      var tempj=j+1;
		      var spacenumber=0; //中间空多少个
		      var befive=0; //成5,包括五连和长连
		      var livefour=0; //活四，有两个点可以成5地四
		      var befour=0; //冲四，只有一个点可以成为5的四
		      var deadfour=0; //死四，不能成为5的四
		      var livethree=0; //活三，再走一步就可以成为活四的三
		      //活三包括 连活三和跳活三
		      var bethree=0;
		      var livetwo=0;
		      var betwo=0;
		      //三三，一子落下同时形成两个活三
		      //四四，一子落下同时形成两个冲四
		      //四三,一子落下同时形成一个冲四和 活三
		     for(var tt=0;;tt++)
		     {  if(tt==0)
		          checkword=2; //machine
		        else checkword=1; //people
		      while(tempj<maxsize) //横
		       { if(chese[maxsize*i+tempj].qi==checkword&&checkword==2) //是机器的
		             {total++; tempj++;}
		         else if(chese[maxsize*i+tempj].qi==0&&checkword==2)  //对于防守不考虑空格
		             { //is empty
		             spacenumber++; break;
		             if((++tempj)<maxsize&&chese[maxsize*i+tempj].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		           }
		         else if(chese[maxsize*i+tempj].qi==checkword&&checkword==1) //防守
		         { total++; tempj++;
		         }
		         else break;
		       }
		      var endj=tempj;
		      tempj=j-1;
		      while(tempj>=0)
		        { if(chese[maxsize*i+tempj].qi==checkword&&checkword==2)
		             {total++; tempj--;}
		         else if(chese[maxsize*i+tempj].qi==0&&checkword==2) 
		             { //is empty
		             spacenumber++; break;
		             if((--tempj)>=0&&chese[maxsize*i+tempj].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		           }
		        else if(chese[maxsize*i+tempj].qi==checkword&&checkword==1) //防守
		         { total++; tempj--;
		         }
		         else break;
		        } 
		      var startj=tempj;
		        //由于checkword==2先运行，所以可以直接用befive=1,也可以用befive++;
		       if(total>4) {  //能组成五个或以上的
		                      if(checkword==2) 
		                         {befive+=2
		                         } //堵住成五
		                        else befive++;
		                     }//进攻要大于防守
		       else if(total==4) {  //能组成四个
		                     if(checkword==2)  //表示考虑进攻
		                         { if(startj>=0&&endj<maxsize&&chese[maxsize*i+startj].qi!=1&&chese[maxsize*i+endj].qi!=1) //两边为空格
		                              livefour+=2; //放在这里可以形成一个活四
		                           else if((startj>=0&&chese[maxsize*i+startj].qi!=1)||(endj<maxsize&&chese[maxsize*i+endj].qi!=1))
		                              befour+=2; //形成一个冲四
		                           else deadfour+=2;
		                         }    
		                     else  //考虑防守
		                        {   if(startj>=0&&endj<maxsize&&chese[maxsize*i+startj].qi!=2&&chese[maxsize*i+endj].qi!=2)
		                              livefour+=1; //放在这里可以形成一个活四
		                           else if((startj>=0&&chese[maxsize*i+startj].qi!=2)||(endj<maxsize&&chese[maxsize*i+endj].qi!=2))
		                              befour+=1; //形成一个冲四
		                           else deadfour+=1;
		                        
		                        }
		       }
		       else if(total==3){if(checkword==2)  //表示考虑进攻
		                         { if(startj>=0&&endj<maxsize&&chese[maxsize*i+startj].qi!=1&&chese[maxsize*i+endj].qi!=1) //两边为空格
		                              livethree+=2; //放在这里可以形成一个活三(算做连活三)
		                           else if((startj>=0&&chese[maxsize*i+startj].qi!=1)||(endj<maxsize&&chese[maxsize*i+endj].qi!=1))
		                              bethree+=2; //形成一个眠三，即可以冲四的三
		                          // else deadfour+=2;
		                          //跳三 
		                         }    
		                     else  //考虑防守
		                        {    if(startj>=0&&endj<maxsize&&chese[maxsize*i+startj].qi!=2&&chese[maxsize*i+endj].qi!=2) //两边为空格
		                              livethree+=1; //放在这里可以形成一个活三(算做连活三)
		                           else if((startj>=0&&chese[maxsize*i+startj].qi!=2)||(endj<maxsize&&chese[maxsize*i+endj].qi!=2))
		                              bethree+=1; //形成一个眠三，即可以冲四的三
		                        }
		                     }
		       else if(total==2){ if(checkword==2)  //表示考虑进攻
		                         { if(startj>=0&&endj<maxsize&&chese[maxsize*i+startj].qi!=1&&chese[maxsize*i+endj].qi!=1) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                         }    
		                     else  //考虑防守
		                        {    if(startj>=0&&endj<maxsize&&chese[maxsize*i+startj].qi!=2&&chese[maxsize*i+endj].qi!=2) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                          
		                        }
                              }
		       
		       total=1;
               var tempi=i+1;  //竖
               spacenumber=0;
		     while(tempi<maxsize) //竖
		       { if(chese[maxsize*tempi+j].qi==checkword&&checkword==2) //是机器的
		             {total++; tempi++;}
		         else if(chese[maxsize*tempi+j].qi==0&&checkword==2) 
		             { //is empty
		             spacenumber++; break;
		             if((++tempi)<maxsize&&chese[maxsize*tempi+j].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		           }
		         else if(chese[maxsize*tempi+j].qi==checkword&&checkword==1) //防守
		         { total++; tempi++;
		         }
		           else break;
		       }
		       var endi=tempi;
		      tempi=i-1;
		      while(tempi>=0)
		        { if(chese[maxsize*tempi+j].qi==checkword&&checkword==2)
		             {total++; tempi--;}
		         else if(chese[maxsize*tempi+j].qi==0&&checkword==2) 
		              { //is empty
		             spacenumber++; break;
		             if((--tempi)>=0&&chese[maxsize*tempi+j].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		         }
		        else if(chese[maxsize*tempi+j].qi==checkword&&checkword==1) //防守
		         { total++; tempi--;
		         }
		         else break;
		        } 
		      var starti=tempi;
		      if(total>4) {  //能组成五个或以上的
		                     if(checkword==2) 
		                         {befive+=2
		                         } //堵住成五
		                        else befive++;
		                     }//进攻要大于防守
		       else if(total==4) {  //能组成四个
		                     if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&endi<maxsize&&chese[maxsize*starti+j].qi!=1&&chese[maxsize*endi+j].qi!=1) //两边为空格
		                              livefour+=2; //放在这里可以形成一个活四
		                           else if((starti>=0&&chese[maxsize*starti+j].qi!=1)||(endi<maxsize&&chese[maxsize*endi+j].qi!=1))
		                              befour+=2; //形成一个冲四
		                           else deadfour+=2;
		                         }    
		                     else  //考虑防守
		                        {  if(starti>=0&&endi<maxsize&&chese[maxsize*starti+j].qi!=2&&chese[maxsize*endi+j].qi!=2) //两边为空格
		                              livefour+=1; //放在这里可以形成一个活四
		                           else if((starti>=0&&chese[maxsize*starti+j].qi!=2)||(endi<maxsize&&chese[maxsize*endi+j].qi!=2))
		                              befour+=1; //形成一个冲四
		                           else deadfour+=1;
		                        
		                        }
		       }
		       else if(total==3){if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&endi<maxsize&&chese[maxsize*starti+j].qi!=1&&chese[maxsize*starti+j].qi!=1) //两边为空格
		                              livethree+=2; //放在这里可以形成一个活三(算做连活三)
		                           else if((starti>=0&&chese[maxsize*starti+j].qi!=1)||(endi<maxsize&&chese[maxsize*starti+j].qi!=1))
		                              bethree+=2; //形成一个眠三，即可以冲四的三
		                          // else deadfour+=2;
		                         }    
		                     else  //考虑防守
		                        {  if(starti>=0&&endi<maxsize&&chese[maxsize*starti+j].qi!=2&&chese[maxsize*starti+j].qi!=2) //两边为空格
		                              livethree+=1; //放在这里可以形成一个活三(算做连活三)
		                           else if((starti>=0&&chese[maxsize*starti+j].qi!=2)||(endi<maxsize&&chese[maxsize*starti+j].qi!=2))
		                              bethree+=1; //形成一个眠三，即可以冲四的三
		                          // else deadfour+=2;
		                        }
		                     }
		       else if(total==2){ if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&endi<maxsize&&chese[maxsize*starti+j].qi!=1&&chese[maxsize*starti+j].qi!=1) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                         }    
		                     else  //考虑防守
		                        {    if(starti>=0&&endi<maxsize&&chese[maxsize*starti+j].qi!=2&&chese[maxsize*starti+j].qi!=2) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                          
		                        }
                              }
		       
		   total=1;
	       tempi=i+1;  //一三象限斜
	       tempj=j+1;
	       spacenumber=0;
	       while(tempi<maxsize&&tempj<maxsize)
	       { if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==2)
	             {total++; tempi++; tempj++;}
	           else if(chese[maxsize*tempi+tempj].qi==0&&checkword==2) 
		             { //is empty
		             spacenumber++; break;
		             if((++tempi)<maxsize&&(++tempj)<maxsize&&chese[maxsize*tempi+tempj].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		           }
		       else if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==1) //防守
		         { total++; tempj++; tempi++;
		         }
		      else break;
	       }
	       endi=tempi; endj=tempj;
	       tempi=i-1;
	       tempj=j-1;
	       while(tempi>=0&&tempj>=0)
	       { if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==2)
	             {total++; tempi--; tempj--;}
	          else if(chese[maxsize*tempi+tempj].qi==0&&checkword==2) 
		             { //is empty
		             spacenumber++; break;
		             if((--tempi)>=0&&(--tempj)>=0&&chese[maxsize*tempi+tempj].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		           }
		       else if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==1) //防守
		         { total++; tempi--;  tempj--;
		         }
		      else break;
	       }
	      starti=tempi; startj=tempj;

	       if(total>4) {  //能组成五个或以上的
		                     if(checkword==2) 
		                         {befive+=2
		                         } //堵住成五
		                      else befive++;
		                     }//进攻要大于防守
		       else if(total==4) {  //能组成四个
		                     if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+startj].qi!=1&&chese[maxsize*endi+endj].qi!=1) //两边为空格
		                              livefour+=2; //放在这里可以形成一个活四
		                           else if((starti>=0&&startj>=0&&chese[maxsize*starti+startj].qi!=1)||(endi<maxsize&&endj<maxsize&&chese[maxsize*endi+endj].qi!=1))
		                              befour+=2; //形成一个冲四
		                           else deadfour+=2;
		                         }    
		                     else  //考虑防守
		                        {  if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+startj].qi!=2&&chese[maxsize*endi+endj].qi!=2) //两边为空格
		                              livefour+=1; //放在这里可以形成一个活四
		                           else if((starti>=0&&startj>=0&&chese[maxsize*starti+startj].qi!=2)||(endi<maxsize&&endj<maxsize&&chese[maxsize*endi+endj].qi!=2))
		                              befour+=1; //形成一个冲四
		                           else deadfour+=1;
		                        
		                        }
		       }
		       else if(total==3){if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+startj].qi!=1&&chese[maxsize*endi+endj].qi!=1) //两边为空格
		                              livethree+=2; //放在这里可以形成一个活三(算做连活三)
		                           else if((starti>=0&&startj>=0&&chese[maxsize*starti+startj].qi!=1)||(endi<maxsize&&endj<maxsize&&chese[maxsize*endi+endj].qi!=1))
		                              bethree+=2; //形成一个眠三，即可以冲四的三
		                          // else deadfour+=2;
		                         }    
		                     else  //考虑防守
		                        { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+startj].qi!=2&&chese[maxsize*endi+endj].qi!=2) //两边为空格
		                              livethree+=1; //放在这里可以形成一个活三(算做连活三)
		                           else if((starti>=0&&startj>=0&&chese[maxsize*starti+startj].qi!=2)||(endi<maxsize&&endj<maxsize&&chese[maxsize*endi+endj].qi!=2))
		                              bethree+=1; //形成一个眠三，即可以冲四的三
		                          // else deadfour+=2;
		                        }
		                     }
		       else if(total==2){ if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+startj].qi!=1&&chese[maxsize*endi+endj].qi!=1) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                         }    
		                     else  //考虑防守
		                        {    if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+startj].qi!=2&&chese[maxsize*endi+endj].qi!=2) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                          
		                        }
                              }
                              
		   total=1;
	       tempi=i+1;  //二四象限斜
	       tempj=j-1;
	       spacenumber=0;
	       while(tempi<maxsize&&tempj>=0)
	       { if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==2)
	             {total++; tempi++; tempj--;}
	         else if(chese[maxsize*tempi+tempj].qi==0&&checkword==2) 
		             { //is empty
		             spacenumber++; break;
		             if((++tempi)<maxsize&&(--tempj)>=0&&chese[maxsize*tempi+tempj].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		           }
		       else if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==1) //防守
		         { total++; tempi++; tempj--;
		         }
		      else break;
	       }
	       endi=tempi; startj=tempj;
	       tempi=i-1;
	       tempj=j+1;
	       while(tempi>=0&&tempj<maxsize)
	       { if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==2)
	             {total++; tempi--; tempj++;}
	         else if(chese[maxsize*tempi+tempj].qi==0&&checkword==2) 
		             { //is empty
		             spacenumber++; break;
		             if((--tempi)>=0&&(++tempj)<maxsize&&chese[maxsize*tempi+tempj].qi==checkword&&spacenumber<2)
		                     total++;
		             else break;
		           }
		     else if(chese[maxsize*tempi+tempj].qi==checkword&&checkword==1) //防守
		         { total++; tempj++; tempi--;
		         }
		      else break;
	       }
	      starti=tempi; endj=tempj;
	      
	       if(total>4) {  //能组成五个或以上的
		                      if(checkword==2) 
		                         {befive+=2
		                         } //堵住成五
		                        else befive++;
		                     }//进攻要大于防守
		       else if(total==4) {  //能组成四个
		                     if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+endj].qi!=1&&chese[maxsize*endi+startj].qi!=1) //两边为空格
		                              livefour+=2; //放在这里可以形成一个活四
		                           else if((starti>=0&&endj<maxsize&&chese[maxsize*starti+endj].qi!=1)||(endi<maxsize&&startj>=0&&chese[maxsize*endi+startj].qi!=1))
		                              befour+=2; //形成一个冲四
		                           else deadfour+=2;
		                         }    
		                     else  //考虑防守
		                        { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+endj].qi!=2&&chese[maxsize*endi+startj].qi!=2) //两边为空格
		                              livefour+=1; //放在这里可以形成一个活四
		                           else if((starti>=0&&endj<maxsize&&chese[maxsize*starti+endj].qi!=2)||(endi<maxsize&&startj>=0&&chese[maxsize*endi+startj].qi!=2))
		                              befour+=1; //形成一个冲四
		                           else deadfour+=1;
		                        
		                        }
		       }
		       else if(total==3){if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+endj].qi!=1&&chese[maxsize*endi+startj].qi!=1) //两边为空格
		                              livethree+=2; //放在这里可以形成一个活三(算做连活三)
		                           else if((starti>=0&&endj<maxsize&&chese[maxsize*starti+endj].qi!=1)||(endi<maxsize&&startj>=0&&chese[maxsize*endi+startj].qi!=1))
		                              bethree+=2; //形成一个眠三，即可以冲四的三
		                          // else deadfour+=2;
		                         }    
		                     else  //考虑防守
		                        { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+endj].qi!=2&&chese[maxsize*endi+startj].qi!=2) //两边为空格
		                              livethree+=1; //放在这里可以形成一个活三(算做连活三)
		                           else if((starti>=0&&endj<maxsize&&chese[maxsize*starti+endj].qi!=2)||(endi<maxsize&&startj>=0&&chese[maxsize*endi+startj].qi!=2))
		                              bethree+=1; //形成一个眠三，即可以冲四的三
		                          // else deadfour+=2;
		                        }
		                     }
		       else if(total==2){ if(checkword==2)  //表示考虑进攻
		                         { if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+endj].qi!=1&&chese[maxsize*endi+startj].qi!=1) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                         }    
		                     else  //考虑防守
		                        {  if(starti>=0&&startj>=0&&endi<maxsize&&endj<maxsize&&chese[maxsize*starti+endj].qi!=2&&chese[maxsize*endi+startj].qi!=2) //两边为空格
		                              livetwo++; //放在这里可以形成一个活三(算做连活三)
		                        }
                              }
	      
           if(tt==1) break;//退出检查
		}   //end of  calculating the  value of every node
	     chesevalue[maxsize*i+j]=befive*100000+livefour*10000+befour*1000+livethree*100+bethree*10+livetwo;
	    // if(chesevalue[maxsize*i+j]>100) alert(i+" "+j+" "+chesevalue[maxsize*i+j]);
     }//end of  biggest for
     var maxchesevalue=chesevalue[0];
     var ttt=0;
     for(var tti=1;tti<maxsize*maxsize;tti++)
        { if(chesevalue[tti]>maxchesevalue) {ttt=tti; maxchesevalue=chesevalue[tti];}
        }
     //var obj=document.getElementById('td').rows[Math.floor(ttt/maxsize)].cells[ttt%maxsize];
    // document.getElementById("allvalue").innerHTML=ttt+" "+maxchesevalue
    // putone(obj,Math.floor(ttt/maxsize),ttt%maxsize); //放棋子
	//var buf = 15*(Math.floor(ttt/maxsize)) +  ttt%maxsize;
	//alert(buf);
	play.call(tds[ttt]);
	//alert(ttt);
	//alert(ttt%maxsize);
     
   }//end of biggest  else

}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	