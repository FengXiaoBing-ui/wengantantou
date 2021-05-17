<template>
	<view class="index">
		<headerTab title="告警详情"></headerTab>
		<view class="wrap" v-if="listcontent.device!=undefined">
			<view class="task">
				<text>任务单号</text>
				<text>listcontent.task_number</text>
			</view>
				<view class="basic">
					<text class="title">设备信息</text>
					<view class="list">
						<view class="list-content">
							<text>输电塔名称</text>
							<text>{{ listcontent.device.tagan }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>具体位置</text>
							<text>{{ listcontent.device.device_position }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>发生时间</text>
							<text>{{ listcontent.begintime_str }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>设备名称</text>
							<text>{{ listcontent.device.device_name }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>设备编号</text>
							<text>{{ listcontent.device.device_id }}</text>
							<view class="botborder"></view>
						</view>
					</view>
				</view>
				
				<view class="basic">
					<text class="title">告警信息</text>
					<view class="list">
						<view class="list-content">
							<text>告警类型</text>
							<text>{{ listcontent.alarm.title }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>告警详情</text>
							<text>{{ listcontent.alarm.remark }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>当前值</text>
							<text>{{ listcontent.device.now_temperature }}℃</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>设定值</text>
							<text>>{{ listcontent.device.warm_number }}℃</text>
							<view class="botborder"></view>
						</view>
					</view>
				</view>
				
				<view class="basic">
					<text class="title">处理情况</text>
					<view class="list">
						<view class="list-content">
							<text>确认状态</text>
							<text v-if="listcontent.alarm.isconfirm==0">已确认</text>
							<text v-else>未确认</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>确认人</text>
							<text>{{ listcontent.duty_master }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>确认时间</text>
							<text>{{ listcontent.alarm.confirm_time }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>处理状态</text>
							<text>已处理</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>处理说明</text>
							<text>{{ listcontent.deal_remark }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>处理照片</text>
							<view class="imglist">
								<image v-for="item in listcontent.deal_imgs" :key="item" :src="item" mode="aspectFill"></image>
							</view>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>处理人</text>
							<text>{{ listcontent.duty_master }}</text>
							<view class="botborder"></view>
						</view>
						<view class="list-content">
							<text>处理时间</text>
							<text>{{ listcontent.deal_time }}</text>
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
				listcontent: []
			};
		},
		onLoad(option) {
			this.id = option.id
			this.detaildata()
		},
		created() {
			
		},
		methods:{
			detaildata(){
				this.$api.postapi('/api/pubtask/sel_task_detail',{id: this.id}).then(res => {
					console.log(res)
					this.listcontent = res.data.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	position: relative;
	top: 128rpx;
	padding: 20rpx 34rpx;
	box-sizing: border-box;
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
</style>
