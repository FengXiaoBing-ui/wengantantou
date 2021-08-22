<template>
	<view class="edition">
		<image class="headerlog" src="../static/icon/7072@2x.png" mode=""></image>
		<view class="box">
			<text class="title">发现新版本</text>
			<view class="upgrade-box">
				<view class="upgrade-box-left">
					<text>当前版本</text>
					<text>v{{ upgrade }}</text>
				</view>
				<image class="upgrade-box-mid" src="../static/icon/7069@2x.png" mode=""></image>
				<view class="upgrade-box-right">
					<text>最新版本</text>
					<text>v{{ editiondata.version_number }}</text>
				</view>
			</view>
			<image class="upgrade-icon" src="../static/icon/7074@2x.png" mode=""></image>
			<view class="font">
				<text>{{ editiondata.content }}</text>
			</view>
			<text class="size">安装包大小：{{ (editiondata.apk_size/1024).toFixed(1) }}MB</text>
			<view class="btn">
				<view class="btn-left" @click="downloadapk">
					现在升级
				</view>
				<view class="btn-right" @click="nexttime">
					后台升级下次安装
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"edition",
		props:{
			editiondata:{
				type:Object
			}
		},
		data() {
			return {
				upgrade:''
			};
		},
		methods:{
			downloadapk(){
				this.$emit('downloadapk')
			},
			nexttime(){
				this.$emit('nexttime')
			}
		},
		created() {
			this.upgrade = plus.runtime.version
		},
		mounted() {
		},
	}
</script>

<style lang="less" scoped>
.edition{
	width: 620rpx;
	border: 1rpx solid #5AE8FF;
	background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
	opacity: 1;
	position: relative;
	padding-bottom: 22rpx;
	z-index: 999;
	.headerlog{
		position: relative;
		top: -76rpx;
		left: 0;
		width: 600rpx;
		height: 207rpx;
	}
	.box{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.title{
		display: block;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		transform: translateY(-40rpx);
		text-align: center;
	}
	.upgrade-box{
		margin: 0 auto;
		width: 516rpx;
		height: 120rpx;
		background: rgba(3, 47, 94, 0.15);
		border-radius: 22rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		&-left,&-right{
			display: flex;
			flex-direction: column;
			align-items: center;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.6;
			}
		}
		&-mid{
			width: 38rpx;
			height: 38rpx;
		}
		&-right{
			text{
				opacity: 1;
			}
		}
	}
	.upgrade-icon{
		margin-top: 22rpx;
		width: 143rpx;
		height: 55rpx;
	}
	.size{
		display: block;
		text-align: center;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 35px;
		color: #FFFFFF;
		opacity: 0.6;
	}
	.font{
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 42rpx;
			color: #FFFFFF;
		}
	}
	.btn{
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		&-left{
			width: 271rpx;
			height: 88rpx;
			border: 1rpx solid #5AE8FF;
			background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
			box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
			box-sizing: border-box;
			margin: 0 10rpx;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 88rpx;
			color: #FFFFFF;
			text-align: center;
		}
		&-right{
			width: 271rpx;
			height: 88rpx;
			border: 1rpx solid #5AE8FF;
			background: linear-gradient(180deg, #3E6E80 0%, #001B4A 100%);
			opacity: 0.62;
			box-sizing: border-box;
			margin: 0 10rpx;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 88rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
}
</style>
