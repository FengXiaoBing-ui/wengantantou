<template>
	<view class="index">
		<headerTab title="个人信息" :implement="true" @func="func"></headerTab>
		<view class="wrap">
			<view class="modify-box">
				<text>修改{{ title }}</text>
				<input type="text" :value="text" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				text: ""
			};
		},
		onLoad(option) {
			this.title = option.type
			this.text = option.text
		},
		methods:{
			func(){
				
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	position: relative;
	top: 168rpx;
	width: 100%;
	padding: 24rpx 34rpx;
	box-sizing: border-box;
	.modify-box{
		width: 100%;
		height: 163rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		padding: 23rpx 24rpx;
		box-sizing: border-box;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 37rpx;
			color: #FFFFFF;
			opacity: 0.6;
		}
		input{
			margin-top: 10rpx;
			width: 100%;
			height: 64rpx;
			background: #073B6E;
			border: 1rpx solid #4492C2;
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			color: #FFFFFF;
		}
	}
}
</style>
