<template>
	<view class="wrap">
		<image class="headimg" src="../../../static/icon/12.png" mode=""></image>
		<image class="footimg" src="../../../static/icon/13.png" mode=""></image>
		
		<view class="headtab">
			<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
			<text class="headtitle">任务详情</text>
			<view class="num">
				<text>任务编号T5B464668444447</text>
				<text>类型：消警任务</text>
			</view>
		</view>
		<view class="content-box">
			<view class="basic">
				<text class="title">设备信息</text>
				<view class="list">
					<view class="list-content" v-for="(item,index) in listcontent" :key="index">
						<text>{{ item.title }}</text>
						<text>{{ item.text }}</text>
						<view></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">告警信息</text>
				<view class="list">
					<view class="list-content">
						<text>告警类型</text>
						<text>超温告警</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text>告警详情的文字告警详情的文字告警详情的文字告警详情的文字告警详情的文字</text>
						<view></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">任务信息</text>
				<view class="list">
					<view class="list-content">
						<text>发起人</text>
						<text>R646S4464646</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>运维班长</text>
						<text>消警</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>计划开始时间</text>
						<text>2021-12-24 15:22:22</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>计划完成时间</text>
						<text>2021-12-24 15:22:28</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text>告警详情的文字告警详情的文字告警详情的文字告警详情的文字告警详情的文字</text>
						<view></view>
					</view>
				</view>
			</view>
			<view class="botbtn">
				<view class="left" @click="implement">
					<image src="../../../static/icon/6700.png" mode=""></image>
					<text>执行任务</text>
				</view>
				<view class="right" @click="sumbitjump">
					<image src="../../../static/icon/51444.png" mode=""></image>
					<text>提交任务</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listcontent: [
					{
						title: "输电塔名称",
						text: "110kV丹诗文线-N4"
					},
					{
						title: "发生时间",
						text: "2021-12-21 14:21:45"
					},
					{
						title: "设备名称",
						text: "温感探头"
					},
					{
						title: "设备编号",
						text: "TEER864584522"
					}
				]
			};
		},
		methods:{
			sumbitjump(){
				uni.navigateTo({
					url:"../MissiondetailSubmit/MissiondetailSubmit"
				})
			},
			implement(){
				uni.navigateTo({
					url:"../implement/implement"
				})
			},
			backpage(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	
	.content-box{
		padding: 0 34rpx;
		box-sizing: border-box;
		padding-bottom: 147rpx;
		position: relative;
		top: 120rpx;
		z-index: 1;
		.botbtn{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			z-index: 99;
			display: flex;
			.left{
				width: 374rpx;
				height: 100rpx;
				border: 1rpx solid #4492C2;
				background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 50rpx;
					height: 50rpx;
				}
				text{
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 52rpx;
					color: #FFFFFF;
				}
			}
			.right{
				width: 375rpx;
				height: 100rpx;
				border: 1rpx solid #5AE8FF;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				image{
					width: 50rpx;
					height: 50rpx;
				}
				text{
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 52rpx;
					color: #FFFFFF;
				}
			}
		}
		.basic{
			
			margin-top: 34rpx;
			width: 100%;
			border: 2rpx solid rgba(90, 232, 255, 0.5);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
			box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
			padding: 14rpx 34rpx 32rpx 34rpx;
			box-sizing: border-box;
			.title{
				display: flex;
				align-items: center;
				font-size: 38rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 55rpx;
				color: #FFFFFF;
				&::before{
					content: '';
					display: inline-block;
					width: 7rpx;
					height: 34rpx;
					margin-right: 10rpx;
					border: 1rpx solid rgba(0, 0, 0, 0);
					background: linear-gradient(180deg, #D6F2FF 0%, #5AE8FF 100%);
				}
			}
			.list{
				box-sizing: border-box;
				.list-content{
					display: flex;
					flex-wrap: wrap;
					position: relative;
					padding: 20rpx 0;
					&:nth-child(1){
						margin-top: 4rpx;
					}
					text{
						&:nth-child(1){
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 40rpx;
							color: #FFFFFF;
							opacity: 0.7;
							margin-right: 24rpx;
						}
						&:nth-child(2){
							font-size: 30rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 44rpx;
							color: #FFFFFF;
						}
					}
					view{
						position: absolute;
						bottom: 0;
						width: 100%;
						height: 2rpx;
						background: #5AE8FF;
						opacity: 0.5;
					}
					&:last-of-type{
						view{
							border: none;
						}
					}
				}
			}
		}
	}
	.headtab{
		width: 100%;
		position: relative;
		top: 56rpx;
		z-index: 1;
		.num{
			margin-top: 56rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			text{
				&:nth-child(1){
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 52rpx;
					color: #FFFFFF;
				}
				&:nth-child(2){
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #FFFFFF;
					opacity: 0.6;
				}
			}
		}
		image{
			width: 54rpx;
			height: 54rpx;
			margin-left: 16rpx;
		}
		.headtitle{
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 52rpx;
			color: #FFFFFF;
		}
	}
	.headimg{
		position: absolute;
		top: 0;
		width: 100%;
		height: 474rpx;
	}
	.footimg{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 660rpx;
	}
}
</style>
