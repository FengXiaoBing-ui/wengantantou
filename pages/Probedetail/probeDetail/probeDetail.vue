<template>
	<view class="index">
		<image class="topimg" src="../../../static/icon/topimg.png" mode=""></image>
		<view class="header-tab">
			<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
			<text>探头详细信息</text>
			<view class="sw">
				<text v-if="SensorBase.is_recieve_alarm==1">接受警告</text>
				<text v-else>关闭告警</text>
				<switch :checked="checked" @change="switch1Change" color="#275e98" style="transform: scale(0.5,0.5);" />
			</view>
		</view>
		<image class="aimg" src="../../../static/icon/6664.png" mode=""></image>
		<view class="headtitle">
			<text>编号{{ SensorBase.device_id }}</text>
			<text>型号：{{ SensorBase.class_name }}</text>
			<view class="states">
				<image v-if="SensorBase.state_text == '工作中'" src="../../../static/icon/6833.png" mode=""></image>
				<image v-if="SensorBase.state_text == '待激活'" src="../../../static/icon/6837.png" mode=""></image>
				<image v-if="SensorBase.state_text == '已离线'" src="../../../static/icon/6832.png" mode=""></image>
				<text>{{ SensorBase.state_text }}</text>
			</view>
		</view>

		<view class="detail">
			<view class="probe-list-box">
				<view class="box-left" :class="SensorBase.power_number <= $store.state.electric&&SensorBase.state_text=='工作中' ? 'box-left-red' : ''">
					<view
						:class="{ 'box-left-color': SensorBase.power_number > $store.state.electric, red: SensorBase.power_number <= $store.state.electric&&SensorBase.state_text=='工作中' }"
						:style="{ width: SensorBase.power_number + '%' }"
					></view>
					<image src="../../../static/icon/6820.png" mode=""></image>
					<text>电量</text>
					<text class="num">{{ SensorBase.state_text != '已离线'&&SensorBase.state_text != '待激活'&&SensorBase.state_text != '维修'&&SensorBase.state_text != '报废' ? (SensorBase.power_number + '℃') : '---' }}</text>
				</view>
				<view
					class="box-right"
					:class="{
						'box-right-blue': SensorBase.now_temperature < SensorBase.high_temperature && SensorBase.state_text != '待激活'&& SensorBase.state_text != '已离线'&& SensorBase.state_text != '报废'&& SensorBase.state_text != '维修',
						'box-right-yellow':
							SensorBase.now_temperature >= SensorBase.high_temperature &&
							SensorBase.now_temperature < SensorBase.over_temperature &&
							SensorBase.state_text != '待激活'&& SensorBase.state_text != '已离线'&& SensorBase.state_text != '报废'&& SensorBase.state_text != '维修',
						'box-right-red': SensorBase.now_temperature > SensorBase.over_temperature && SensorBase.state_text != '待激活'&& SensorBase.state_text != '已离线'&& SensorBase.state_text != '报废'&& SensorBase.state_text != '维修',
						'electric-left-no': SensorBase.state_text == '已离线'||SensorBase.state_text == '维修'||SensorBase.state_text == '报废',
						'electric-left-lixian': SensorBase.state_text == '待激活'
					}"
				>
					<image src="../../../static/icon/6823.png" mode=""></image>
					<text>温度</text>
					<text class="num">{{ SensorBase.state_text != '已离线'&&SensorBase.state_text != '待激活'&&SensorBase.state_text != '维修'&&SensorBase.state_text != '报废' ? (SensorBase.now_temperature + '℃') : '---' }}</text>
				</view>
			</view>
			<view class="box-mid">
				<view class="top" v-if="SensorBase.tower_position">
					<text>安装位置</text>
					<text>{{ SensorBase.tower_position }}</text>
				</view>
				<view class="mid" @click="record">
					<text>告警记录</text>
					<text>{{ SensorBase.temp_record_count }}条</text>
				</view>
				<view class="bot" @click="jumpdetail">
					<text>详细信息</text>
					<text>包括安装信息与责任小组信息等</text>
				</view>
			</view>
			<view class="box-bot">
				<view class="toptitle">
					<image src="../../../static/icon/6696.png"></image>
					<text>设备运行记录</text>
				</view>
				<view class="calendar">
					<view class="btnleft" @click="handlePreMonth"><image src="../../../static/icon/13922.png" mode=""></image></view>
					<view class="midcalendar">
						<image src="../../../static/icon/day.png" mode=""></image>
						<text>
							{{ selectedYear }}-{{ selectedMonth + 1 < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1 }}-{{
								selectedDate < 10 ? '0' + selectedDate : selectedDate
							}}
						</text>
					</view>
					<view class="btnright" @click="handleNextMonth"><image src="../../../static/icon/139211.png" mode=""></image></view>
				</view>
				<view class="option">
					<view :class="{ active: active == '图表', 'option-box': active == '数据' }">
						<text :style="active != item ? 'opacity: 0.66;font-size:30rpx' : ''" @click="option(item)" v-for="(item, index) in optiondata" :key="index">
							{{ item }}
						</text>
					</view>
				</view>
				<view class="listwrap" v-if="active == '数据'">
					<view class="option-list">
						<text class="title">采集时间</text>
						<text class="title">温度（℃）</text>
					</view>
					<view
						class="option-list"
						:class="{ 'option-list-red': item.record_value >= 50, 'option-list-origin': item.record_value >= 37 && item.record_value < 50 }"
						v-for="(item, index) in timetemperature"
						:key="index"
					>
						<text
							class="leftbord"
							:class="{ textwhite: item.record_value < 37, textorigin: item.record_value >= 37 && item.record_value < 50, textred: item.record_value >= 50 }"
						>
							{{ item.time_cycle }}
						</text>
						<text :class="{ textwhite: item.record_value < 37, textorigin: item.record_value >= 37 && item.record_value < 50, textred: item.record_value >= 50 }">
							{{ item.record_value }}
						</text>
						<view class="bordbot"></view>
					</view>
				</view>

				<view class="charts-box" v-else>
					<qiun-data-charts
						v-if="showline"
						type="line"
						canvasId="scrolllineid"
						:opts="{ enableScroll: true, xAxis: { scrollShow: true, itemCount: 4, disableGrid: true } }"
						:chartData="chartsDataLine4"
						:ontouch="true"
						:canvas2d="true"
						@scrollRight="scrollRight"
					/>
				</view>

				<image class="botimg" src="../../../static/icon/15.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			limit: 8,
			page: 1,
			SensorBase: {},
			active: '数据',
			checked: uni.getStorageSync('unipush'),
			showline: false,
			selectedYear: new Date().getFullYear(),
			selectedMonth: new Date().getMonth(),
			selectedDate: new Date().getDate(),
			chartsDataLine4: {
				categories: [],
				series: [
					{
						name: '温度',
						data: []
					}
				]
			},
			optiondata: ['数据', '图表'],
			timetemperature: [],
			debouncefunc: "",
			count: 0,
			num:1,
		};
	},
	created() {
	},
	onShow() {
		this.$api.postapi('/api/Sensor/selSensorDetail', { id: this.id, loginId: uni.getStorageSync('loginId') }).then(res => {
			
			this.SensorBase = res.data.data;
			console.log(999,this.SensorBase);
			this.checked = this.SensorBase.is_recieve_alarm == 1?true:false
		});
		// let year = new Date().getTime((this.selectedYear+'-'+this.selectedMonth+'-'+this.selectedDate))
		this.temp_records();
	},
	computed: {},
	onLoad(option) {
		this.id = option.id;
		this.$api.postapi('/api/Sensor/selSensorDetail', { id: this.id, loginId: uni.getStorageSync('loginId') }).then(res => {
			
			this.SensorBase = res.data.data;
			console.log(999,this.SensorBase);
			this.checked = this.SensorBase.is_recieve_alarm == 1?true:false
		});
		// let year = new Date().getTime((this.selectedYear+'-'+this.selectedMonth+'-'+this.selectedDate))
		this.temp_records();
	},
	methods: {
		
		scrollRight(e){
			
		},
		temp_records(id) {
			this.showline = false
			let year = this.selectedYear + '-' + (this.selectedMonth + 1) + '-' + this.selectedDate;
			this.$api
				.postapi('/api/Sensor/selAllTempRecord', {
					id: this.id,
					date: year
				})
				.then(res => {
					console.log(res)
					if (res.data.code == 0) {
						this.timetemperature = [];
						this.chartsDataLine4 = {
							categories: [],
							series: [
								{
									name: '温度',
									data: []
								}
							]
						};
						return false;
					}
					this.timetemperature = res.data.data;
					let arr = []
					let arrtwo = []
					for (var i = 0; i < this.timetemperature.length; i++) {
						arr.push(this.timetemperature[i].time_cycle);
						arrtwo.push(this.timetemperature[i].record_value);
					}
					this.chartsDataLine4.categories = arr
					this.chartsDataLine4.series[0].data = arrtwo
					this.$forceUpdate();
					this.showline = true
				});
			
		},
		record() {
			uni.navigateTo({
				url: '../AlarmLog/AlarmLog?id=' + this.SensorBase.id
			});
		},
		jumpdetail() {
			uni.navigateTo({
				url: '../probedetailinfo/probedetailinfo?id=' + this.id
			});
		},
		option(item) {
			this.active = item;
		},
		switch1Change(e) {
			this.checked = e.detail.value;
			if(this.checked){
				this.SensorBase.is_recieve_alarm = 1
			}else{
				this.SensorBase.is_recieve_alarm = 0
			}
			
			this.$api.postapi('/api/sensor/change_alarm_state',{
				loginId:uni.getStorageSync('loginId'),
				is_recieve_alarm:this.SensorBase.is_recieve_alarm,
				sensor_id:this.id
			}).then(res => {
				if(res.data.code==1){
					uni.showToast({
						title:this.SensorBase.is_recieve_alarm==1?"该探头已设置接收推送消息！":"该探头已设置不在接收推送消息！",
						icon:"none"
					})
				}
			})
		},
		backpage() {
			uni.navigateBack({
				delta: 1
			});
		},
		handlePreMonth() {
			let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if ((this.selectedYear % 4 === 0 && this.selectedYear % 100 !== 0) || this.selectedYear % 400 === 0) {
				daysInMonth[1] = 29;
			}
			this.selectedDate--;
			if (this.selectedDate < 1) {
				this.selectedMonth--;
				if (this.selectedMonth < 0) {
					this.selectedYear--;
					this.selectedMonth = 11;
				}
				this.selectedDate = daysInMonth[this.selectedMonth];
			}
			
			this.temp_records();
		},
		handleNextMonth() {
			let Year = new Date().getFullYear()
			let Month = new Date().getMonth()
			let Day = new Date().getDate()
			let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if ((this.selectedYear % 4 === 0 && this.selectedYear % 100 !== 0) || this.selectedYear % 400 === 0) {
				daysInMonth[1] = 29;
			}
			
			if(this.selectedYear+this.selectedMonth+this.selectedDate>=Year+Month+Day){
				return false
			}
			this.selectedDate++;
			
			if (this.selectedDate > daysInMonth[this.selectedMonth]) {
				this.selectedMonth++;
				if (this.selectedMonth > 11) {
					this.selectedYear++;
					this.selectedMonth = 0;
				}
				this.selectedDate = 1;
			}
			this.temp_records();
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
		justify-content: space-around;
		width: 150rpx;
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
.detail {
	z-index: 999;
	width: 100%;
	padding: 0 34rpx;
	box-sizing: border-box;
	margin-top: 360rpx;
	.probe-list-box {
		width: 100%;
		height: 148rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		.box-left {
			width: 317rpx;
			height: 94rpx;
			opacity: 1;
			border-radius: 14rpx;
			position: relative;
			display: flex;
			align-items: center;
			overflow: hidden;
			justify-content: center;
			background: rgba(214, 242, 255, 0.15);
			border: 1rpx solid #5bc8cb;
			box-sizing: border-box;
			overflow: hidden;
			.box-left-color {
				position: absolute;
				left: 0;
				top: 0;
				height: 92rpx;
				border-radius: 0;
				background: linear-gradient(90deg, #7fe57f 0%, #41c9fc 100%);
				opacity: 0.5;
			}
			.red {
				position: absolute;
				left: 0;
				top: 0;
				height: 92rpx;
				border-radius: 0;
				opacity: 1;
				background: linear-gradient(270deg, rgba(244, 67, 54, 0.9) 0%, rgba(112, 12, 12, 0.9) 100%);
			}
			image {
				width: 50rpx;
				height: 50rpx;
			}
			.num {
				font-size: 32rpx;
				font-family: Roboto;
				font-weight: bold;
				color: #ffffff;
				z-index: 999;
				margin-left: 10rpx;
			}
			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #ffffff;
				z-index: 999;
			}
		}
		.box-left-red {
			background: rgba(244, 67, 54, 0.17);
			border: 1rpx solid #f44336;
		}
		.box-right {
			width: 317rpx;
			height: 94rpx;
			border-radius: 14rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			image {
				width: 50rpx;
				height: 50rpx;
			}
			.num {
				font-size: 32rpx;
				font-family: Roboto;
				font-weight: bold;
				color: #ffffff;
				z-index: 999;
				margin-left: 10rpx;
			}
			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #ffffff;
				z-index: 999;
			}
		}
		.box-right-blue {
			background: linear-gradient(180deg, rgba(255, 252, 230, 0.35) 0%, rgba(65, 201, 252, 0.35) 100%);
		}
		.box-right-yellow {
			background: linear-gradient(180deg, rgba(219, 229, 127, 0.7) 0%, #f86c10 100%);
		}
		.box-right-red {
			background: linear-gradient(180deg, #f44336 0%, #710105 100%);
			opacity: 0.9;
		}
		.electric-left-lixian {
			background: rgba(214, 242, 255, 0.15);
		}
		.electric-left-no {
			background: rgba(214, 242, 255, 0.2);
		}
	}
	.box-mid {
		margin-top: 20rpx;
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
		padding-left: 21rpx;
		box-sizing: border-box;
		.top {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 24rpx;
			padding-bottom: 18rpx;
			border-bottom: 2rpx solid rgba(90, 232, 255, 0.5);
			text {
				&:nth-child(1) {
					width: 26%;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 50rpx;
					color: #ffffff;
					opacity: 0.53;
					display: flex;
					&::before {
						content: '';
						display: inline-block;
						transform: translateY(-5rpx);
						width: 50rpx;
						height: 50rpx;
						background-size: 100% 100%;
						background-image: url(../../../static/icon/Gps.png);
					}
				}
				&:nth-child(2) {
					width: 70%;
					margin-right: 10rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					text-align: right;
					display: flex;
					align-items: center;
				}
			}
		}
		.mid {
			display: flex;
			justify-content: space-between;
			margin-top: 24rpx;
			padding-bottom: 18rpx;
			border-bottom: 2rpx solid rgba(90, 232, 255, 0.5);
			text {
				&:nth-child(1) {
					width: 30%;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					opacity: 0.53;
					display: flex;
					&::before {
						content: '';
						display: inline-block;
						transform: translateY(-5rpx);
						width: 50rpx;
						height: 50rpx;
						background-size: 100% 100%;
						background-image: url(../../../static/icon/text.png);
					}
				}
				&:nth-child(2) {
					width: 70%;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ff7672;
					display: flex;
					align-items: center;
					text-align: right;
					justify-content: flex-end;
					&::after {
						content: '';
						display: inline-block;
						width: 15rpx;
						height: 17rpx;
						background-size: 100% 100%;
						background-image: url(../../../static/icon/minright.png);
						margin: 0 23rpx;
					}
				}
			}
		}
		.bot {
			display: flex;
			justify-content: space-between;
			margin-top: 24rpx;
			padding-bottom: 18rpx;
			border-bottom: 2rpx solid rgba(90, 232, 255, 0.5);
			text {
				&:nth-child(1) {
					width: 30%;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					opacity: 0.53;
					display: flex;
					align-items: center;
					&::before {
						content: '';
						display: inline-block;
						width: 50rpx;
						height: 50rpx;
						background-size: 100% 100%;
						background-image: url(../../../static/icon/6693.png);
					}
				}
				&:nth-child(2) {
					width: 70%;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					text-align: right;
					display: flex;
					align-items: center;
					justify-content: space-between;
					&::after {
						content: '';
						display: inline-block;
						width: 15rpx;
						height: 17rpx;
						background-size: 100% 100%;
						background-image: url(../../../static/icon/minright.png);
						margin: 0 23rpx;
					}
				}
			}
		}
	}
	.box-bot {
		margin-top: 20rpx;
		width: 100%;
		min-height: 900rpx;
		border: 2px solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2px 4px 10px rgba(90, 232, 255, 0.8);
		position: relative;
		.charts-box {
			width: 100%;
			height: 600rpx;
			background: #ffffff;
		}
		.toptitle {
			width: 100%;
			display: flex;
			margin-top: 20rpx;
			margin-left: 14rpx;
			image {
				width: 50rpx;
				height: 50rpx;
			}
			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 50rpx;
				color: #ffffff;
			}
		}
		.calendar {
			margin: 30rpx auto;
			width: 94%;
			height: 94rpx;
			border: 1rpx solid #4492c2;
			background: linear-gradient(180deg, #0d4b88 0%, #013161 100%);
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			display: flex;
			align-items: center;
			justify-content: space-between;
			.btnleft,
			.btnright {
				width: 96rpx;
				height: 94rpx;
				border: 1rpx solid #5ae8ff;
				background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				image {
					width: 18rpx;
					height: 21rpx;
				}
			}
			.midcalendar {
				display: flex;
				align-items: center;
				text {
					font-size: 34rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #ffffff;
				}
				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
		.option {
			width: 100%;
			display: flex;
			justify-content: center;
			border-bottom: 2px solid #5ae8ff;

			.option-box {
				width: 300rpx;
				padding-bottom: 20rpx;
				position: relative;
				&::before {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					display: block;
					width: 50%;
					height: 6rpx;
					border: 1rpx solid #5ae8ff;
					background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
					transition: 0.3s;
				}
				text {
					width: 50%;
					display: inline-block;
					text-align: center;
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 46rpx;
					color: #ffffff;
				}
			}
			.active {
				width: 300rpx;
				padding-bottom: 20rpx;
				position: relative;
				&::before {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					display: block;
					width: 50%;
					height: 6rpx;
					border: 1rpx solid #5ae8ff;
					background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
					transition: 0.3s;
				}
				text {
					width: 50%;
					display: inline-block;
					text-align: center;
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 46rpx;
					color: #ffffff;
				}
			}
		}
		.option-list-red {
			background: linear-gradient(270deg, rgba(255, 255, 255, 0.1) 0%, rgba(244, 67, 54, 0.1) 100%);
		}
		.option-list-origin {
			background: linear-gradient(270deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 149, 0, 0.1) 100%);
		}
		.option-list {
			display: flex;
			justify-content: space-evenly;
			position: relative;
			.title {
				margin-top: 30rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 37rpx;
				color: #ffffff;
				opacity: 0.71;
			}
			.bordbot {
				position: absolute;
				top: 0;
				width: 94%;
				height: 2rpx;
				background: rgba(90, 232, 255, 0.4);
			}
			text {
				width: 30%;
				text-align: center;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 44rpx;
				margin: 12rpx 0 14rpx 0;
			}
			.textwhite {
				color: #ffffff;
				&:nth-child(1) {
					&::before {
						content: '';
						position: absolute;
						left: 40rpx;
						top: 50%;
						transform: translateY(-50%);
						display: inline-block;
						width: 16rpx;
						height: 16rpx;
						background: #ffffff;
						border-radius: 50%;
					}
				}
			}
			.textorigin {
				color: #e19f1b;
				&:nth-child(1) {
					&::before {
						content: '';
						position: absolute;
						left: 40rpx;
						top: 50%;
						transform: translateY(-50%);
						display: inline-block;
						width: 16rpx;
						height: 16rpx;
						background: #e19f1b;
						border-radius: 50%;
					}
				}
			}
			.textred {
				color: #ff7672;
				&:nth-child(1) {
					&::before {
						content: '';
						position: absolute;
						left: 40rpx;
						top: 50%;
						transform: translateY(-50%);
						display: inline-block;
						width: 16rpx;
						height: 16rpx;
						background: rgba(255, 118, 114, 1);
						border-radius: 50%;
					}
				}
			}
		}
		.botimg {
			width: 100%;
			height: 30rpx;
			position: absolute;
			bottom: 0;
		}
	}
}
</style>
