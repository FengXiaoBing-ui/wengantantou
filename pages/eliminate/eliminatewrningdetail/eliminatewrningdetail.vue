<template>
	<view class="index">
		<headerTab title="告警详情"></headerTab>
		<view class="wrap">
			<view class="task">
				<text>任务单号</text>
				<text>R210126001</text>
			</view>
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
				<text class="title">设备信息</text>
				<view class="list">
					<view class="list-content">
						<text>告警类型</text>
						<text>超温告警</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text style="display: block;margin: 0;">告警详情的文字告警详情的文字告警详情的文字告警详情的文字告警详情的文字</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>当前值</text>
						<text>53℃</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>设定值</text>
						<text>＞50℃</text>
						<view></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">设备信息</text>
				<view class="list">
					<view class="list-content">
						<text>确认状态</text>
						<text>未确认</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>处理状态</text>
						<text>未消警</text>
						<view></view>
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
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	padding: 20rpx 34rpx;
	box-sizing: border-box;
	position: relative;
	top: 128rpx;
	width: 100%;
	z-index: 1;
	.task{
		margin-top: 34rpx;
		display: flex;
		align-items: center;
		height: 82rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		text{
			margin: 0 20rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			&:nth-child(1){
				opacity: 0.7;
				font-size: 28rpx;
			}
			&:nth-child(2){
				font-size: 30rpx;
				opacity: 1;
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
				&:nth-child(1){
					margin-top: 30rpx;
				}
				.states{
					position: relative;
					left: 50rpx;
					&::before{
						content: '';
						display: inline-block;
						position: absolute;
						top: 50%;
						left: -50rpx;
						transform: translateY(-50%);
						width: 53rpx;
						height: 53rpx;
						background-image: url(../../../static/icon/6833.png);
						background-size: 100% 100%;
					}
				}
				text{
					
					&:nth-child(1){
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
						opacity: 0.7;
					}
					&:nth-child(2){
						margin-left: 24rpx;
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 44rpx;
						color: #FFFFFF;
					}
				}
				view{
					margin: 20rpx 0;
					border: 1rpx solid #5AE8FF;
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					opacity: 0.61;
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
</style>
