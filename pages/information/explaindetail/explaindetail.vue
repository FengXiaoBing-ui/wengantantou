<template>
	<view class="index">
		<headerTab title="功能说明详情"></headerTab>
		<view class="wrap">
			<view class="box">
				<text class="title">{{ explain.title }}</text>
				<view class="boxbord">
					<image src="../../../static/icon/13967.png" mode=""></image>
				</view>
				<view class="content">
					<rich-text :nodes="explain.content"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				explain: {}
			};
		},
		onLoad(option) {
			this.$api.postapi('/api/Fuc/sel_function_detial',{id:option.id}).then(res => {
				console.log(res)
				this.explain = res.data.data
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	padding: 24rpx 34rpx;
	position: relative;
	top: 168rpx;
	box-sizing: border-box;
	z-index: 99;
	.box{
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255,  0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252,  0.5) 0%, rgba(28, 84, 184,  0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		text-align: center;
		.imgtext{
			width: 90%;
			height: 329rpx;
			margin: 0 auto;
			margin-top: 24rpx;
		}
		.title{
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 46rpx;
			color: #FFFFFF;
		}
		view{
			margin-top: 35rpx;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #FFFFFF;
			}
		}
		.boxbord{
			width: 100%;
			height: 0px;
			border: 1rpx solid rgba(90, 232, 255, 0.5);
			position: relative;
			margin-top: 13rpx;
			image{
				width: 83rpx;
				height: 28rpx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: -14rpx;
			}
		}
		.content{
			overflow: hidden;
			color: #FFFFFF;
		}
	}
}
</style>
