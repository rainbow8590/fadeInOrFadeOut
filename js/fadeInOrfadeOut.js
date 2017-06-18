
	function fadeInOrfadeOut(option){
	    //定时器
	    var timer = null ;
	    //记录图片
	    var index = 0 ;
		
		//添加包裹imgs的容器
		var imgsWrap = option.imgsWrap.substr(1)
		// console.log(imgsWrap)
		$(option.wrap).append('<div class="'+ imgsWrap +'"></div>');
		// 添加img
		// console.log(option.imgs)
		$.each(option.imgs,function(index,item){
			$(option.wrap).find(option.imgsWrap).append('<a href="'+option.imgsALink[index]+'"><img src="'+ item +'"></a>')
		})

		//创建小圆点
		var dot = option.dot.substr(1)
		$(option.wrap).append('<ol class="'+ dot +'"></ol>');
		$.each(option.imgs,function(index,item){
			$(option.wrap).find(option.dot).append('<li></li>')
		})
		//设置圆点的margin-left值；让其居中；
		$(option.dot).css('margin-left',-$(option.dot).find('li').outerWidth(true)*$(option.dot).find('li').length/2)
		// 给第一个圆点添加当前样式
		$(option.dot).find('li').first().addClass('current');

		//在页面上添加左右箭头
		var nextId = option.nextId.substr(1)
		var prevId = option.prevId.substr(1)
		$(option.wrap).append('<div id="'+nextId+'">&gt;</div>');
		$(option.wrap).append('<div id="'+prevId+'">&lt;</div>');


		//设置每个图片的z-index
		$(option.wrap).find('a').each(function(index){
	        $(this).css({"z-index":$(option.wrap).find('a').length-$(this).index()})
    	})


	    //自动轮播
	    play();
	    function play(){
	        timer = setInterval(function(){
	            if(index < $(option.wrap).find('a').length-1){
	                index++
	            }else{
	                index = 0;
	            }
	            autoplay(index)
	        },3000)
	    }
	    /*运动一次的动画*/
	    function autoplay(index){
	        $(option.wrap).find('a').hide().eq(index).fadeIn();
	        $(option.wrap).find(option.dot).find('li').removeClass("current").eq(index).addClass("current");
	    }

	    /*鼠标点击y圆点跳转到相应图片*/
	    $(option.wrap).find(option.dot).find('li').click(function(){
	    	index = $(this).index();
	    	autoplay(index);
	    });

	    //鼠标经过
	   $(option.wrap).hover(function(){
	    	$(option.wrap).find(option.nextId).show();
	   	console.log($(option.wrap).find(option.nextId))
	    	$(option.wrap).find(option.prevId).show();
	    	clearInterval(timer);
	    },function(){
	    	$(option.wrap).find(option.nextId).hide();
	    	$(option.wrap).find(option.prevId).hide();
	    	 play();
	    })

	    //右箭头点击事件
	    $(option.wrap).find(option.nextId).click(function(){
	    	 if(index < $(option.wrap).find('a').length-1){
	                index++;
	         }else{
	                index = 0
	         }
	          autoplay(index);
	    })
	    //左箭头点击事件
	    $(option.wrap).find(option.prevId).click(function(){
	    	 if(index < 0){
	               index = $(option.wrap).find('a').length-2;
	         }else{
	                index--;
	         }
	          autoplay(index);
	    })
	}
	
