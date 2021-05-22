<template>
	<view class="danger">
		<image class="headimg" src="../../static/icon/12.png" mode=""></image>
		
		<view class="wrap">
			<text class="title">中继器待办信息</text>
			<view class="radiusimg">
				<image class="animeimgborder" src="../../static/icon/6764.png" mode=""></image>
				<image class="animeimg" src="../../static/icon/6998.png" mode=""></image>
			</view>
			<view class="record">
				<view class="left" @click="missiondetailsubmit(0,'探头待办')">
					<image class="gray" src="../../static/icon/2488.png" mode=""></image>
					<image class="botimg" src="../../static/icon/13965.png" mode=""></image>
					<view class="twoimg">
						<image src="../../static/icon/1282.png" mode=""></image>
						<image src="../../static/icon/6766.png" mode=""></image>
					</view>
					<view class="text">
						<text>探头待办</text>
						<text>{{ sensor_task_count }}</text>
					</view>
				</view>
				<view class="right" @click="missiondetailsubmit(1,'中继器待办')">
					<image class="gray" src="../../static/icon/2488.png" mode=""></image>
					<image class="botimg" src="../../static/icon/13965.png" mode=""></image>
					<view class="twoimg">
						<image src="../../static/icon/6765.png" mode=""></image>
						<image src="../../static/icon/6766.png" mode=""></image>
					</view>
					<view class="text">
						<text>中继器待办</text>
						<text>{{ repeater_task_count }}</text>
					</view>
					
				</view>
			</view>
		</view>
		
		<image class="footimg" src="../../static/icon/13.png" mode=""></image>
		<tab-bar :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#FFFFFF" @click="tabClick"></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTabIndex:2,
				title: 'Hello',
				repeater_task_count: "",
				sensor_task_count: ""
			}
		},
		onShow() {
			this.repeater_task_count = this.$store.state.count.repeater_task_count
			this.sensor_task_count = this.$store.state.count.sensor_task_count
			uni.hideTabBar()
		},
		onLoad() {
		
		},
		methods: {
			missiondetailsubmit(type,title){
				uni.navigateTo({
					url:"../WaitMission/MissiondetailSubmit/MissiondetailSubmit?type="+type+'&title='+title
				})
			},
			tabClick(index){
				this.currentTabIndex = index
			}
		}
	}
</script>

<style lang="less" scoped>
.danger{
	width: 100%;
	.wrap{
		width: 100%;
		position: relative;
		top: 0;
		text-align: center;
		padding-top: 82rpx;
		box-sizing: border-box;
		z-index: 999;
		.title{
			font-size: 42rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 61rpx;
			color: #FFFFFF;
		}
		.radiusimg{
			margin: 0 auto;
			width: 251rpx;
			height: 251rpx;
			border-radius: 50%;
			position: relative;
			.animeimg{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 151rpx;
				height: 151rpx;
			}
			.animeimgborder{
				width: 251rpx;
				height: 251rpx;
				position: absolute;
				left: 0;
				top: 0;
				animation: borderimg 3s linear infinite;
				@keyframes borderimg{
					0%{-webkit-transform:rotate(0deg);}
					25%{-webkit-transform:rotate(90deg);}
					50%{-webkit-transform:rotate(180deg);}
					75%{-webkit-transform:rotate(270deg);}
					100%{-webkit-transform:rotate(360deg);}
				}
			}
		}
		.record{
			width: 100%;
			padding: 38rpx 34rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left,.right{
				width: 48%;
				height: 303rpx;
				border: 2rpx solid rgba(90, 232, 255, 0.3);
				background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
				box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
				position: relative;
				padding: 36rpx 0;
				box-sizing: border-box;
				.text{
					margin-top: 15rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
						&:nth-child(2){
							font-size: 54rpx;
							font-family: Roboto;
							font-weight: bold;
							line-height: 65rpx;
							color: #FF7672;
							opacity: 1;
						}
					}
				}
				.twoimg{
					width: 111rpx;
					height: 111rpx;
					position: relative;
					left: 50%;
					transform: translateX(-50%);
					image{
						&:nth-child(1){
							width: 111rpx;
							height: 111rpx;
						}
						&:nth-child(2){
							position: absolute;
							right: -6rpx;
							bottom: 0;
							width: 42rpx;
							height: 36rpx;
						}
					}
				}
				.gray{
					position: absolute;
					bottom: 54rpx;
					left: 0;
					width: 100%;
					height: 61rpx;
				}
				.botimg{
					width: 60rpx;
					height: 37rpx;
					position: absolute;
					bottom: -18rpx;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}
	.headimg{
		width: 100%;
		height: 437rpx;
		position: absolute;
		top: 0;
	}
	.footimg{
		width: 100%;
		height: 660rpx;
		position: absolute;
		bottom: 0;
	}
	
}
</style>
