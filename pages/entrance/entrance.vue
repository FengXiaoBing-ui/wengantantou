<template>
	<view class="entrance" :style="{height:appheight+'px'}">
		<image class="top" src="../../static/icon/6791.png" mode=""></image>
		<image class="titleimg" src="../../static/icon/title.png" mode=""></image>
		<button @click="getinto">立即进入</button>
		<image class="bot" src="../../static/icon/6892.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			appheight:function(){
				let windowheight = 0
				uni.getSystemInfo({
					success(e) {
						windowheight = e.windowHeight;
					}
				});
				return windowheight
			}
		},
		created() {
			if(uni.getStorageSync('entrance')){
				uni.redirectTo({
					url:"../login/login"
				})
			}
		},
		methods:{
			getinto(){
				uni.setStorageSync('entrance',JSON.stringify(true))
				uni.redirectTo({
					url:"../login/login"
				})
			}
		}
	}
</script>

<style lang="less">
	.entrance{
		background: #033785;
		.top{
			width: 100%;
			height: 355rpx;
		}
		.titleimg{
			position: absolute;
			top: 319rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 686.66rpx;
			height: 133.94rpx;
		}
		.bot{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 620rpx;
		}
		button{
			position: absolute;
			bottom: 20%;
			left: 50%;
			transform: translateX(-50%);
			width: 276rpx;
			height: 72rpx;
			border: 1px solid #5AE8FF;
			background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
			box-shadow: 0px 0px 6px rgba(2, 2, 55, 0.28);
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 72rpx;
			color: #FFFFFF;
			z-index: 999;
		}
	}

</style>
