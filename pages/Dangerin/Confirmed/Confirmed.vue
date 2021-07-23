<template>
	<view class="index">
		<headerTab title="告警详情"></headerTab>
		<view class="wrap">
			<view class="basic">
				<text class="title">设备信息</text>
				<view class="list">
					<view class="list-content">
						<text>输电塔名称</text>
						<text>{{ listcontent.tower_name }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>发生时间</text>
						<text>{{ listcontent.create_time }}</text>
						<view></view>
					</view>
					<view class="list-content" v-if="listcontent.device">
						<text>设备名称</text>
						<text>{{ listcontent.device.device_name }}</text>
						<view></view>
					</view>
					<view class="list-content" v-if="listcontent.device">
						<text>设备编号</text>
						<text>{{ listcontent.device.device_id }}</text>
						<view></view>
					</view>
					<view class="list-content" v-if="listcontent.sensor_name">
						<text>设备名称</text>
						<text>{{ listcontent.sensor_name.device_name }}</text>
						<view></view>
					</view>
					<view class="list-content" v-if="listcontent.sensor_name">
						<text>设备编号</text>
						<text>{{ listcontent.sensor_name.device_id }}</text>
						<view></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">告警信息</text>
				<view class="list">
					<view class="list-content">
						<text>告警类型</text>
						<text>{{ listcontent.title }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text>{{ listcontent.remark }}</text>
						<view></view>
					</view>
					<view class="list-content" v-if="listcontent.device">
						<text>当前温度</text>
						<text>{{ listcontent.device.now_temperature }}℃</text>
						<view></view>
					</view>
					<view class="list-content"  v-if="listcontent.device">
						<text>异常告警温度</text>
						<text>≥{{ listcontent.device.high_temperature }}℃</text>
						<view></view>
					</view>
					<view class="list-content"  v-if="listcontent.device">
						<text>超温告警温度</text>
						<text>≥{{ listcontent.device.over_temperature }}℃</text>
						<view></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">处理情况</text>
				<view class="list">
					<view class="list-content">
						<text>确认状态</text>
						<text v-if="listcontent.isconfirm==0" style="color: #FBC965;">未确认</text>
						<text v-else>已确认</text>
						<view></view>
					</view>
					<view class="list-content" v-if="listcontent.isconfirm==1">
						<text>确认人</text>
						<text >{{ listcontent.duty_user_name }}</text>
						<view></view>
					</view>
					<view class="list-content" v-if="listcontent.isconfirm==1">
						<text>确认时间</text>
						<text >{{ listcontent.confirm_time }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>处理状态</text>
						<text v-if="listcontent.is_remove_warning==0" style="color: #FF7672;">未消警</text>
						<text v-else>已消警</text>
						<view></view>
					</view>
				</view>
			</view>
			
			<view class="sumbit" @click="jump" v-if="listcontent.is_publish_task==0&&role==1">
				<image src="../../../static/icon/5144.png" mode=""></image>
				<text>发布消警任务</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: uni.getStorageSync('role'),
				id: "",
				index: "",
				listcontent: {}
			};
		},
		onLoad(option) {
			this.id = option.id
			this.index = option.index
			this.confirmed()
		},
		onShow() {
			this.$store.state.people = {}
		},
		methods:{
			confirmed(){
				
				this.$api.postapi('/api/Alarmlog/sel_sensor_alarm_detail',{id:this.id,index:this.index}).then(res => {
					console.log('myID：',res.data)
					this.listcontent = res.data.data
				})
			},
			jump(){
				let sensor;
				let type;
				if(this.listcontent.temperature_sensor_id){
					sensor = this.listcontent.temperature_sensor_id
					type = 0
				}else{
					sensor = this.listcontent.repeater_id
					type = 1
				}
				uni.navigateTo({
					url:"../release/release?id="+this.listcontent.id+'&type='+type+'&sensor_id='+ sensor
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	margin-top: 128rpx;
	padding: 34rpx;
	box-sizing: border-box;
	z-index: 9999;
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
	.sumbit{
		margin-top: 46rpx;
		width: 100%;
		height: 100rpx;
		border: 1rpx solid #5AE8FF;
		background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
		box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 50rpx;
			height: 50rpx;
		}
		text{
			margin-left: 10rpx;
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 52rpx;
			color: #FFFFFF;
		}
	}
}
</style>
