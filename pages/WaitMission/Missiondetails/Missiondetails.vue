<template>
	<view class="wrap">
		<image class="headimg" src="../../../static/icon/12.png" mode=""></image>
		<image class="footimg" src="../../../static/icon/13.png" mode=""></image>
		
		<view class="headtab">
			<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
			<text class="headtitle">任务详情</text>
			<view class="num">
				<text>任务编号{{ mission.task_number }}</text>
				<text>类型：消警任务</text>
			</view>
		</view>
		<view class="content-box">
			<view class="basic" v-if="mission.device != undefined">
				<text class="title">设备信息</text>
				<view class="list">
					<view class="list-content">
						<text>设备名称</text>
						<text v-if="mission.device.repeater_name">{{ mission.device.repeater_name }}</text>
						<text v-if="mission.device.device_name">{{ mission.device.device_name }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>设备编号</text>
						<text v-if="mission.device.repeater_id">{{ mission.device.repeater_id }}</text>
						<text v-if="mission.device.device_id">{{ mission.device.device_id }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>塔杆信息</text>
						<text v-if="mission.device.tagan">{{ mission.device.tagan }}</text>
						<text v-else>{{ mission.device.tagan }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content" v-if="mission.type==0">
						<text>设备位置</text>
						<text>{{ mission.device.device_position }}</text>
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			
			<view class="basic" v-if="mission.alarm != undefined">
				<text class="title">告警信息</text>
				<view class="list">
					<view class="list-content">
						<text>告警类型</text>
						<text>{{ mission.alarm.title }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text>{{ mission.alarm.remark }}</text>
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			
			<view class="basic">
				<text class="title">任务信息</text>
				<view class="list">
					<view class="list-content">
						<text>发起人</text>
						<text>{{ mission.duty_admin }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>运维班长</text>
						<text>{{ mission.duty_master }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>计划开始时间</text>
						<text>{{ mission.begintime_str }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>计划完成时间</text>
						<text>{{ mission.endtime_str }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>任务内容</text>
						<text>{{ mission.task_remark }}</text>
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			<view class="basic" v-if="mission.is_deal!=0">
				<text class="title">执行明细</text>
				<view class="list">
					<view class="list-content">
						<text>处理状态</text>
						<text v-if="mission.is_deal==1">处理中</text>
						<text v-if="mission.is_deal==2">已处理</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理说明</text>
						<text>{{ mission.task_remark }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理照片</text>
						<view class="imglist">
							<image v-for="(item,index) in mission.deal_imgs" :key="index" :src="item" mode="aspectFill"></image>
						</view>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理人</text>
						<text>{{ mission.duty_master }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>处理时间</text>
						<text>{{ mission.deal_time }}</text>
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			<view class="botbtn">
				<view class="left" @click="implement" v-if="mission.is_deal==0&&code==1">
					<image src="../../../static/icon/6700.png" mode=""></image>
					<text>执行任务</text>
				</view>
				<view class="right" @click="sumbitjump" v-if="mission.is_deal!=2">
					<image src="../../../static/icon/51444.png" mode=""></image>
					<text>提交任务</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="poppp">
				<view class="imgbox">
					<image class="out" src="../../../static/icon/6914.png" mode=""></image>
					<image class="in" src="../../../static/icon/completed.png" mode=""></image>
				</view>
				<text class="popuptext">任务已执行，确认提交任务吗？</text>
				<view class="btnbox">
					<view class="btnleft" @click="cancel">
						取消
					</view>
					<view class="btnright" @click="sumbit">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				code: "",
				mission: {},
			};
		},
		onLoad(option) {
			this.id = option.id
			this.code = option.code
		},
		onShow() {
			this.details()
		},
		methods:{
			details(){
				this.$api.postapi('/api/pubtask/sel_task_detail',{id:this.id}).then(res => {
					console.log(res)
					this.mission = res.data.data
				})
			},
			sumbit(){
				this.$api.postapi('/api/pubtask/submit_task',{id:this.id}).then(res => {
					console.log(res)
					if(res.data.code==1){
						uni.showToast({
							title:"提交成功"
						})
						setTimeout(() => {
							uni.switchTab({
								url:"../../wait/wait"
							})
						},500)
					}
				})
			},
			//提交任务
			sumbitjump(){
				if(this.mission.is_deal==1){
					this.$refs.popup.open()
				}else{
					uni.showToast({
						title:"请先执行任务",
						icon:"none"
					})
				}
			},
			cancel(){
				this.$refs.popup.close()
			},
			//执行任务
			implement(){
				uni.navigateTo({
					url:"../implement/implement?id="+this.mission.id
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
			justify-content: flex-end;
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
	.poppp{
		width: 620rpx;
		height: 503rpx;
		background-color: rgba(12, 133, 232, 0.9);
		background-image: url(../../../static/icon/6959.png);
		background-position: 50% 50%;
		background-size: 100% 100%;
		border-radius: 6rpx;
		text-align: center;
		.popuptext{
			position: relative;
			top: 90rpx;
			color: #FFFFFF;
		}
		.btnbox{
			width: 90%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 auto;
			margin-top: 130rpx;
			color: #FFFFFF;
			.btnleft{
				width: 49%;
				height: 88rpx;
				border: 1rpx solid #5AE8FF;
				background: linear-gradient(180deg, #3E6E80 0%, #001B4A 100%);
				opacity: 0.62;
				line-height: 88rpx;
				box-sizing: border-box;
			}
			.btnright{
				width: 49%;
				height: 88rpx;
				border: 1px solid #5AE8FF;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				box-shadow: -2px 0px 5px rgba(90, 232, 255, 0.7);
				line-height: 88rpx;
				box-sizing: border-box;
			}
		}
		.imgbox{
			width: 203rpx;
			height: 203rpx;
			position: relative;
			left: 50%;
			top: 68rpx;
			transform: translateX(-50%);
			.out{
				width: 203rpx;
				height: 203rpx;
				animation: anime 3s linear infinite;
				@keyframes anime{
				  0%{-webkit-transform:rotate(0deg);}
				  25%{-webkit-transform:rotate(90deg);}
				  50%{-webkit-transform:rotate(180deg);}
				  75%{-webkit-transform:rotate(270deg);}
				  100%{-webkit-transform:rotate(360deg);}
				}
			}
			.in{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: 146rpx;
				height: 143rpx;
			}
		}
	}
}
</style>
