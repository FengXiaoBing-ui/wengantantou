<template>
	<view class="index">
		<headerTab title="激活结果"></headerTab>
		<view class="wrap">
			<view class="anime">
				<image class="out" src="../../../static/icon/6764.png" mode=""></image>
				<image class="ok" src="../../../static/icon/completed.png" mode=""></image>
			</view>
			<view class="midtext">
				<text>激活成功</text>
				<text>您可以继续激活其它设备或返回列表</text>
			</view>
			<view class="botbtn">
				<view class="botbtn-left" @click="open">
					继续激活
				</view>
				<view class="botbtn-right" @click="back">
					返回列表
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			open(){
				uni.redirectTo({
					url:"../choice/choice"
				})
			},
			back(){
				uni.redirectTo({
					url:"../choice/choice"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	position: relative;
	top: 200rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
	height: 652rpx;
	background-image: url(../../../static/icon/6959.png);
	background-size: 100% 100%;
	z-index: 1;
	.anime{
		width: 203rpx;
		height: 203rpx;
		position: relative;
		left: 50%;
		top: 80rpx;
		transform: translateX(-50%);
		.out{
			width: 203rpx;
			height: 203rpx;
			animation: anmie 3s linear infinite;
			@keyframes anmie{
				0%{-webkit-transform:rotate(0deg);}
				25%{-webkit-transform:rotate(90deg);}
				50%{-webkit-transform:rotate(180deg);}
				75%{-webkit-transform:rotate(270deg);}
				100%{-webkit-transform:rotate(360deg);}
			}
		}
		.ok{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			width: 146rpx;
			height: 143rpx;
		}
	}
	.midtext{
		margin-top: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		text{
			color: #FFFFFF;
			opacity: 1;
			&:nth-child(1){
				font-size: 42rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 61rpx;
			}
			&:nth-child(2){
				margin-top: 11rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				opacity: 0.8;
			}
		}
	}
	.botbtn{
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		margin: 0 auto;
		margin-top: 66rpx;
		.botbtn-left{
			width: 48%;
			height: 88rpx;
			border: 1rpx solid #5AE8FF;
			background: linear-gradient(180deg, #3E6E80 0%, #001B4A 100%);
			opacity: 0.62;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 46rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}
		.botbtn-right{
			width: 48%;
			height: 88rpx;
			border: 1rpx solid #5AE8FF;
			background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
			box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
			opacity: 1;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 46rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}
	}
}
</style>
