window.onload = function(){
	let toolMenu = document.querySelector('.toolMenu') ;
	
	let filesView = document.querySelector('#filesView') ;
	
	let wwin = document.body.offsetWidth ;
	let whei = document.body.offsetHeight ;
	var wid = shareS.offsetWidth ;
	var left = (wwin- wid )/2 ;
	
	function createTreeMenu(dateStr,text) {
		let filesView = document.querySelector('#filesView');
					let html = '<div class="files">'+
									'<div class="titles">'+
										'<a class="selectBox" href="javascript:void(0)"></a>'+
										'<span class="icon folderIcon"></span>'+
										'<span class="filename">'+text+'</span>'+
										'<input type="text" class="txt" />'+
								'</div>'+
								'<div class="tools">'+
									'<a href="javascript:void(0)" class="icon download" title="下载"></a>'+
									'<a href="javascript:void(0)" class="icon share" title="分享"></a>'+
									'<a href="javascript:void(0)" class="icon move" title="移动"></a>'+
									'<a href="javascript:void(0)" class="icon cancle" title="删除"></a>'+
								'</div>'+
								'<div class="timer">'+
									'<span>'+dateStr+'</span>'+
								'</div>'+
							'</div>';
							angular.element(filesView).append(html) ;
	}
	
	document.getElementById('shareS').style.left = left +'px' ;
	document.getElementById('shareS').style.bottom = -300 + 'px' ;
	
	let flag = false ;
	
	document.querySelector('#treeMenu li').onclick = function(ev){
		var children = this.getElementsByTagName('li') ;
		angular.forEach(children,function(value,key){
			let text = children[key].children[0].children[3].innerText ;
			let date =  children[key].children[0].children[3].innerText  ;
			createTreeMenu()
		})
		
	}
	filesView.onclick = function(ev){
		 ev = ev ||ev.event ;
		var target = ev.target || ev.srcElement ;
		if(angular.equals(target.className,'selectBox')){
			let ptNode = target.parentNode.parentNode ;
			flag = !flag ;
			if(flag){
				ptNode.setAttribute('class',ptNode.className+" active") ;
			}else {
				var rc = ptNode.className.replace("active","")
				ptNode.setAttribute('class',rc) ;
			}
		}
	}
	
	let tmTip = document.getElementById('tm_tips') ;
	let width = tmTip.offsetWidth ;
	let wWidth = document.body.offsetWidth ;
	tmTip.style.left = (wWidth-width)/2 +'px';
	tmTip.style.top = -50 +'px';
	
	
	toolMenu.onclick = function(ev) {
		 ev = ev ||ev.event ;
		var target = ev.target || ev.srcElement ;
		if(angular.equals(target.nodeName.toLowerCase(),'a')||angular.equals(target.parentNode.nodeName.toLowerCase(),'a')){
			var id = target.id || target.parentNode.id ;
			switch(id){
				case 'download':
					tmTip.style.top = 0 + 'px';
					var timer = setTimeout(function(){
						tmTip.style.top = -50 + 'px' ;
						clearTimeout(timer) ;
					},2000)
				
				break ;
				case 'share':
					document.getElementById('overlayout').style.display = 'block' ;
					var shareS = document.getElementById('shareS') 
					let whei = document.body.offsetHeight ;
					var hei = shareS.offsetHeight ;
					var top = (whei - hei) /2 ;
					shareS.style.top = top +'px' ;
					document.querySelector('.shareS .bds_more').onmouseover = function(){
						var top = this.offsetTop + this.parentNode.parentNode.offsetTop-this.offsetHeight;
						document.querySelector('.bdshare_popup_box').style.left = left + 'px';
						document.querySelector('.bdshare_popup_box').style.top = top +'px' ;
						document.querySelector('.bdshare_popup_box').style.display = 'block' ;
					}
					document.querySelector('.shareS .bds_more').onmouseout = function(ev){
						document.querySelector('.bdshare_popup_box').onmouseleave = function(){
							document.querySelector('.bdshare_popup_box').style.display = 'none' ;
						}
					}
					document.querySelector('#shareS .close').onclick = function() {
						document.querySelector('#shareS').style.top = -400 +'px' ;
						document.getElementById('overlayout').style.display = 'none' ;
					}
					document.querySelector('.shareS .cancle').onclick = function() {
						document.querySelector('#shareS').style.top = -400 +'px' ;
						document.getElementById('overlayout').style.display = 'none' ;
					}
				break;
				case 'newfolder':
					let filesView = document.querySelector('#filesView');
					let date = new Date() ;
					let dateStr = date.getFullYear() + "-" + date.getMonth() +1 +"-" + date.getDate() ;
					let html = '<div class="files reNameFile newFile">'+
									'<div class="titles">'+
										'<a class="selectBox" href="javascript:void(0)"></a>'+
										'<span class="icon folderIcon"></span>'+
										'<span class="filename"></span>'+
										'<input type="text" class="txt" />'+
								'</div>'+
								'<div class="tools">'+
									'<a href="javascript:void(0)" class="icon download" title="下载"></a>'+
									'<a href="javascript:void(0)" class="icon share" title="分享"></a>'+
									'<a href="javascript:void(0)" class="icon move" title="移动"></a>'+
									'<a href="javascript:void(0)" class="icon cancle" title="删除"></a>'+
								'</div>'+
								'<div class="timer">'+
									'<span>'+dateStr+'</span>'+
								'</div>'+
							'</div>';
							angular.element(filesView).append(html) ;
							let input = document.querySelector('.newFile .titles .txt ') ;
							input.focus()
							input.onblur = function(){
								var value = input.value ;
								if(value){
									input.previousSibling.innerText = value ;
									let nCl = document.querySelector('.newFile').className.replace(" reNameFile newFile","")
									document.querySelector('.newFile').setAttribute('class',nCl)
									
								}else{
									filesView.removeChild(document.querySelector('.newFile')) ;
								}
								
							}
					break ;
					case 'rename':
						let ys = document.querySelectorAll('.files.active') ;
						if(ys.length ==0){
							tmTip.innerText = "请选择文件！"
							tmTip.style.top = 0 + 'px';
							var timer = setTimeout(function(){
								tmTip.style.top = -50 + 'px' ;
								clearTimeout(timer) ;
							},2000)
						}else if(ys.length == 1){
							var className = ys.className ; 
							document.querySelector('.files.active .filename').innerText = "" ;
							ys.setAttribute('class',className +' reNameFile newFile') ;
							document.querySelector('.files.active .txt').focus() ;
						}else {
							tmTip.innerText = "只能对单个文件进行重命名！"
							tmTip.style.top = 0 + 'px';
							var timer = setTimeout(function(){
								tmTip.style.top = -50 + 'px' ;
								clearTimeout(timer) ;
							},2000)
						}
					break ;
					case 'cancel':
						let filesView1 = document.querySelector('#filesView');
						if(filesView1.length == 0){
							tmTip.innerText = "请选择要删除的文件！"
							tmTip.style.top = 0 + 'px';
							var timer = setTimeout(function(){
								tmTip.style.top = -50 + 'px' ;
								clearTimeout(timer) ;
							},2000)
						}else {
							let af = document.querySelectorAll('.files.active') ;
							angular.forEach(af,function(value,key){
								filesView1.removeChild(value) ;
							})
						}
					break ;
				default:
				break ;
			}
		}
	}
}
