<template>
	<view class="index">
		<image class="topimg" src="../../../static/icon/topimg.png" mode=""></image>
		<view class="header-tab">
			<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
			<text>中继器详细</text>
			<view class="sw">
				<text>关闭告警</text>
				<switch :checked="checked" @change="switch1Change" color="#275e98" style="transform: scale(0.5,0.5);" />
			</view>
		</view>
		<image class="aimg" src="../../../static/icon/6664.png" mode=""></image>
		<view class="headtitle">
			<text>编号{{ repeateinfo.repeater_id }}</text>
			<text>型号：{{ repeateinfo.class }}</text>
			<view class="states">
				<image src="../../../static/icon/6833.png" mode=""></image>
				<text>{{ repeateinfo.state_text }}</text>
			</view>
		</view>

		<view class="wrap">
			<view class="option">
				<view @click="jump">
					<text>关联探头</text>
					<text>{{ repeateinfo.temp_sensor_number }}个</text>
				</view>
				<view @click="repeaterjump">
					<text>告警记录</text>
					<text>{{ repeateinfo.warn_count }}条</text>
				</view>
			</view>
			<view class="electric">
				<view class="electric-box">
					<image src="../../../static/icon/6820.png" mode=""></image>
					<text>电量</text>
					<text style="font-weight: bold;">{{ repeateinfo.repeater_power }}%</text>
					<view class="process" :style="{width: repeateinfo.repeater_power+'%'}"></view>
				</view>
			</view>
			<view class="basic">
				<view class="headtitlein">
					<image src="../../../static/icon/6834.png" mode=""></image>
					<text>基本信息</text>
				</view>
				<view class="list">
					<view class="list-content">
						<view class="nowrap">
							<text>设备名称</text>
							<text>{{ repeateinfo.repeater_name }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>设备编号</text>
							<text>{{ repeateinfo.repeater_id }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>型号</text>
							<text>{{ repeateinfo.class  }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>工作环境</text>
							<text>{{ repeateinfo.work_environment }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>防护等级</text>
							<text>{{ repeateinfo.protect_state }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
			<view class="basic">
				<view class="headtitlein">
					<image src="../../../static/icon/6709.png" mode=""></image>
					<text>安装信息</text>
				</view>
				<view class="list">
					<view class="list-content">
						<view class="nowrap">
							<text>中继器IP</text>
							<text>{{ repeateinfo.ip }}</text>
						</view>
						
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>4G卡号</text>
							<text>{{ repeateinfo.repeater_phone }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>安装位置</text>
							<text>{{ repeateinfo.tower_position }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>关联服务器</text>
							<view class="nowrap-box">
								<image src="../../../static/icon/6873.png" mode=""></image>
								<view>
									<text style="font-weight: bold;opacity: 1;font-size: 32rpx;">{{ repeateinfo.repearter_url }}</text>
									<text style="opacity: 0.5;">{{ repeateinfo.repearter_ip }}</text>
								</view>
							</view>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>安装情况说明</text>
							<text >{{ repeateinfo.install_detail }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>设备状态</text>
							<text>{{ repeateinfo.state_text }}</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>使用情况</text>
							<text>{{ repeateinfo.use_time }}投入使用, 已使用{{ repeateinfo.run_time }}天</text>
						</view>
						<view class="borderbot"></view>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
			<view class="basic">
				<view class="headtitlein">
					<image src="../../../static/icon/6712.png" mode=""></image>
					<text>责任小组信息</text>
				</view>
				<view class="list">
					<view class="list-content">
						<view class="nowrap">
							<text>负责公司</text>
							<text>{{ repeateinfo.company_name }}</text>
						</view>
						
						<view class="borderbot"></view>
					</view>
					<view class="list-content">
						<view class="nowrap">
							<text>运维班长</text>
							<text>{{ repeateinfo.duty_master }}</text>
						</view>
						
						<view class="borderbot"></view>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: "",
			repeateinfo: {},
			active: '数据',
			checked: false,
			selectedYear: new Date().getFullYear(),
			selectedMonth: new Date().getMonth(),
			selectedDate: new Date().getDate(),
			optiondata: ['数据', '图表'],
			listcontent: [],
			listcont: [],
			installinfo: []
		};
	},
	created() {},
	onLoad(option) {
		this.id = option.id
		this.$api.postapi('/api/repeater/sel_repeater_detail',{id:option.id,loginId:uni.getStorageSync('loginId')}).then(res => {
			console.log(res)
			this.repeateinfo = res.data.data
		})
	},
	methods: {
		jump(){
			if(repeateinfo.temp_sensor_number>0){
				uni.navigateTo({
					url:"../relation/relation?id="+this.id
				})
			}
		},
		repeaterjump(){
			uni.navigateTo({
				url:"../../Dangerin/warningRepeater/warningRepeater"
			})
		},
		record(){
			uni.navigateTo({
				url:"../AlarmLog/AlarmLog"
			})
		},
		jumpdetail(){
			uni.navigateTo({
				url:"../probedetailinfo/probedetailinfo"
			})
		},
		option(item) {
			this.active = item;
		},
		switch1Change(e) {
			this.checked = e.detail.value;
		},
		backpage() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="less" scoped>
.topimg {
	width: 100%;
	height: 506rpx;
	position: absolute;
}
.header-tab {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40rpx;
	height: 88rpx;
	.sw {
		position: absolute;
		right: 0;
		display: flex;
		align-items: center;
		text {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
		}
	}
	image {
		position: absolute;
		left: 0;
		width: 54rpx;
		height: 54rpx;
	}
	text {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #ffffff;
		opacity: 1;
		z-index: 999;
	}
}
.aimg {
	width: 181rpx;
	height: 153rpx;
	position: absolute;
	left: 50%;
	top: 164rpx;
	transform: translateX(-50%);
}
.headtitle {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 205rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 999;
	text {
		&:nth-child(1) {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 52rpx;
			color: #ffffff;
		}
		&:nth-child(2) {
			margin-top: 9rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #ffffff;
			opacity: 0.6;
		}
	}
	.states {
		margin-top: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 145rpx;
		height: 50rpx;
		background: rgba(2, 31, 75, 0.6);
		border-radius: 23rpx;
		image {
			width: 53rpx;
			height: 53rpx;
		}
		text {
			height: 53rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
			transform: translateX(-10rpx);
		}
	}
	
}
.wrap{
	padding: 0 34rpx;
	box-sizing: border-box;
	z-index: 999;
	margin-top: 300rpx;
	.option{
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
		padding-left: 20rpx;
		box-sizing: border-box;
		view{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 25rpx 0;
			box-sizing: border-box;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				&:nth-child(2){
					&::after{
						content: '';
						display: inline-block;
						width: 15rpx;
						height: 17rpx;
						background-image: url(../../../static/icon/right.png);
						background-size: 100% 100%;
						margin: 0 23rpx 0 27rpx;
					}
				}
			}
			&:nth-child(1){
				border-bottom: 2rpx solid rgba(90, 232, 255, 0.5);
				text{
					&:nth-child(1){
						&::before{
							content: '';
							display: inline-block;
							width: 50rpx;
							height: 50rpx;
							background-image: url(../../../static/icon/text.png);
							background-size: 100% 100%;
						}
					}
				}
			}
			&:nth-child(2){
				text{
					&:nth-child(1){
						&::before{
							content: '';
							display: inline-block;
							width: 50rpx;
							height: 50rpx;
							background-image: url(../../../static/icon/6693.png);
							background-size: 100% 100%;
						}
					}
				}
			}
			
		}
	}
	.electric{
		margin-top: 20rpx;
		height: 76rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg,rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5));
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.electric-box{
			width: 94%;
			height: 47rpx;
			background: rgba(214, 242, 255, 0.15);
			border: 1rpx solid #5BC8CB;
			opacity: 1;
			border-radius: 14rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			image{
				width: 50rpx;
				height: 50rpx;
			}
			text{
					color: #FFFFFF;
				&:nth-child(1){
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
				}
			}
			.process{
				position: absolute;
				left: 0;
				height: 47rpx;
				background: linear-gradient(90deg, #7FE57F 0%, #41C9FC 100%);
				opacity: 0.5;
				border-radius: 14rpx;
			}
		}
	}
	.basic{
		position: relative;
		top: 0;
		width: 100%;
		margin-top: 20rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.2);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		margin-bottom: 20rpx;
		z-index: 999;
		.headtitlein{
			background: linear-gradient(268deg, rgba(0, 64, 174, 0.6) 0%, rgba(0, 30, 91, 0.6) 100%);
			height: 76rpx;
			display: flex;
			align-items: center;
			image{
				width: 48rpx;
				height: 48rpx;
				margin: 0 20rpx;
			}
			text{
				font-size: 38rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 55rpx;
				color: #FFFFFF;
			}
		}
		.list{
			padding: 20rpx 25rpx;
			box-sizing: border-box;
			.bordbotimg{
				width: 100%;
				height: 30rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				
			}
			.list-content{
				.nowrap{
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					.nowrap-box{
						width: 100%;
						border: 1rpx solid rgba(68, 146, 194, 0.5);
						background: linear-gradient(180deg,rgba(13, 75, 136, 0.5) 0%, rgba(1, 49, 97, 0.5) 100%);
						box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
						display: flex;
						align-items: center;
						padding: 45rpx 50rpx 38rpx 50rpx;
						margin: 20rpx 0;
						box-sizing: border-box;
						image{
							width: 120rpx;
							height: 120rpx;
						}
						view{
							display: flex;
							flex-direction: column;
						}
					}
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
						display: inline-block;
						min-width: 200rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
						opacity: 0.53;
					}
					&:nth-child(2){
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 44rpx;
						color: #FFFFFF;
					}
				}
				.borderbot{
					margin: 20rpx 0;
					border: 1rpx solid #5AE8FF;
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					opacity: 0.61;
				}
				&:last-of-type{
					.borderbot{
						border: none;
					}
				}
			}
		}
	}
}
</style>
