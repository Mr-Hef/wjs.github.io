$(function() {
	// 动态响应式轮播图
	banner();
	initTab();
	/*初始化页面上的工具提示*/
	$('[data-toggle="tooltip"]').tooltip(); //按属性查找元素
});
/*
	*1.模拟数据（从后台获取数据） [{},{}]
	*2. 判断当前设备 768px
	*3. 根据当前设备把数据转换成html 拼接字符串
	*3.1 点容器 内容需要动态生成
	*3.2 图片容器 内容需要动态生成
	*4. 渲染到页面当中
	*5. 测试能否响应两种设备 监听页面尺寸改变重新渲染
	*6. 移动端 手势切换 左滑 右滑
	 */
var banner = function() {
	var $banner = $(".carousel");
	var $point = $banner.find(".carousel-indicators");
	var $image = $banner.find(".carousel-inner");
	var $window = $(window);

	// 1.模拟数据（从后台获取数据） [{},{}]
	var date = [
		{
			pcSrc:'images/banner0.png',
			mSrc:'images/banner0.png'
		},
		{
			pcSrc:'images/banner1.jpg',
			mSrc:'images/banner1.jpg'
		},
		{
			pcSrc:'images/banner2.png',
			mSrc:'images/banner2.png'
		},
	];
	// 页面渲染
	var render = function() {
		// 2. 判断当前设备 768px
		var isMobile = $window.width() < 768 ? true : false;
		// 3. 根据当前设备把数据转换成html 拼接字符串
		// 3.1 点容器 内容需要动态生成
		var pointHtml = '';
		// 3.2 图片容器 内容需要动态生成
		var imageHtml = '';

		$.each(date, function(i,item) {
			//点盒子 '\n' 加换行 增加点之间的距离
			pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '"'+ (i==0?'class="active"':'') +'></li>\n';
			//图片盒子
			imageHtml += '<div class="item '+ (i==0?'active':'') +'">';
			//按需追加图片
			if(isMobile) {
			    imageHtml += '<a href="#" class="m_imageBox"><img src="'+ item.mSrc +'"></a>';
			} else {
			    imageHtml += '<a href="#" class="pc_imageBox" style="background-image: url('+ item.pcSrc +');"></a>';
			}
			imageHtml += '</div>';
		});
		// 4. 渲染到页面当中
		$point.html(pointHtml);
		$image.html(imageHtml);
	};
	// 5. 测试能否响应两种设备 监听页面尺寸改变重新渲染
	$window.on('resize', function() {
		render();
	}).trigger('resize');
	/*trigger 主动触发resieze事件 执行redenr事件 渲染页面*/
	// 6. 移动端 手势切换 左滑 右滑
	/*jquery事件绑定的touch事件 没有触摸点集合*/
	/*originalEvent 当中才有触摸点集合*/
	var startX = 0;
	var distanceX = 0;
	var isMove = false;
	$banner.on('touchstart', function(e) {
		startX = e.originalEvent.touches[0].clientX;
	}).on('touchmove', function(e) {
		var moveX = e.originalEvent.touches[0].clientX;
		distanceX = moveX - startX;
		isMove = true;
	}).on('touchend', function(e) {
		if(isMove && Math.abs(distanceX) >= 50) {
			//右滑
			if(distanceX > 0) {
				$banner.carousel('prev');
			} else {
			//左滑
				$banner.carousel('next');
			}
		}
		startX = 0;
		distanceX = 0;
		isMove = false;
	});
};
/*
	*1. 页签一行显示  设置父容器宽度是所有子容器宽度之和
	*2. 满足区域滚动的html结构要求 必须有大容器套着一个小容器
	*3. 实现滑动功能 使用区域滚动插件 iscroll
	 */
var initTab = function() {	
	var tabs = $(".wjs_product .nav-tabs");
	var lis = tabs.find('li');
	var width = 0;
	$.each(lis, function(i,item) {
		width += $(item).outerWidth(true);
	});
	tabs.width(width);
	new IScroll('.nav_tabs_parent', {
		scrollX: true,
		scroolY: false
	});
};