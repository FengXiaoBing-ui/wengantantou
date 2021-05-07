<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		uni.hideTabBar()
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">
	page{
		background: #033785;
	}
body,
html {
	width: 100%;
	height: 100%;
	background: #033785;
}
.index {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 60rpx;
	background: #033785;
	&::after {
		content: '';
		display: inline-block;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 660rpx;
		background-image: url(./static/icon/13.png);
		background-size: 100% 100%;
	}
}
.uni-load-more {
	z-index: 999999;
}
/*每个页面公共css */
::-webkit-scrollbar {
	width: 16upx !important;
	height: 16upx !important;
	background-color: rgba(7, 62, 117, 1);
}
::-webkit-scrollbar-track {
	// -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: rgba(7, 62, 117, 1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
}
uni-switch .uni-switch-input:before {
	background-color: #275e98;
}
.uni-load-more {
	position: relative;
	z-index: 99999;
}
.uni-picker-view-mask {
	top: 0;
	height: 100%;
	margin: 0 auto;
	background: linear-gradient(360deg, #0D4B88 0%, rgba(1, 49, 97, 0) 100%);
	box-shadow: 0px -6px 12px rgba(44, 28, 28, 0.08);
	background-position: top, bottom;
	background-size: 100% 102rpx;
	background-repeat: no-repeat;
}
.uni-picker-view-wrapper{
	background: linear-gradient(360deg, #0D4B88 0%, rgba(1, 49, 97, 0) 100%);
	box-shadow: 0px -6px 12px rgba(44, 28, 28, 0.08);
}

.uni-popup{
	
}
.picker-view-two{
	uni-picker-view-column{
		.uni-picker-view-indicator{
			border-top: 2rpx solid rgba(90, 232, 255, 0.5);
			border-bottom: 2rpx solid rgba(90, 232, 255, 0.5);
			&::before{
				border: none;
				background: none;
			}
			&::after{
				border: none;
				background: none;
				
			}
		}
		&:nth-child(3),&:nth-child(4){
			.uni-picker-view-indicator{
				position: relative;
				&::before{
					content: '';
					border: none;
					background: none;
				}
				&::after{
					content: ':';
					height: auto;
					border: none;
					background: none;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
}

</style>
