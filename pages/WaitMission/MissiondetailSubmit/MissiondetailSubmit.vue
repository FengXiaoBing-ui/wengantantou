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
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">告警信息</text>
				<view class="list">
					<view class="list-content">
						<text>告警类型</text>
						<text>超温告警</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text>告警详情的文字告警详情的文字告警详情的文字告警详情的文字告警详情的文字</text>
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">任务信息</text>
				<view class="list">
					<view class="list-content">
						<text>发起人</text>
						<text>R646S4464646</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>运维班长</text>
						<text>消警</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>计划开始时间</text>
						<text>2021-12-24 15:22:22</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>计划完成时间</text>
						<text>2021-12-24 15:22:28</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text>告警详情的文字告警详情的文字告警详情的文字告警详情的文字告警详情的文字</text>
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">执行明细</text>
				<view class="list">
					<view class="list-content">
						<text>处理状态</text>
						<text>已处理</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理说明</text>
						<text>处理说明的文字处理说明的文字处理说明的文字处理说明的文字</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理照片</text>
						<view class="imglist">
							<image src="../../../static/icon/2762.png" mode="aspectFill"></image>
							<image src="../../../static/icon/2763.png" mode="aspectFill"></image>
							<image src="../../../static/icon/2762.png" mode="aspectFill"></image>
							<image src="../../../static/icon/2763.png" mode="aspectFill"></image>
							<image src="../../../static/icon/2762.png" mode="aspectFill"></image>
							<image src="../../../static/icon/2763.png" mode="aspectFill"></image>
							<image src="../../../static/icon/2762.png" mode="aspectFill"></image>
							<image src="../../../static/icon/2763.png" mode="aspectFill"></image>
						</view>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理人</text>
						<text>火老四</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理时间</text>
						<text>2021-12-28 18:32:21</text>
						<view class="botborder"></view>
					</view>
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
					.imglist{
						width: 100%;
						height: auto;
						display: flex;
						flex-wrap: wrap;
						image{
							margin-right: 10rpx;
							margin-top: 16rpx;
							width: 196rpx;
							height: 196rpx;
							&:nth-child(3n){
								margin-right: 0;
							}
						}
					}
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
					.botborder{
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
