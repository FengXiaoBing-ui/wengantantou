<template>
	<view class="index">
		<image class="topimg" src="../../../static/icon/topimg.png" mode=""></image>
		<view class="header-tab">
			<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
			<text>探头详细信息</text>
			<view class="sw">
				<text>接受警告</text>
				<switch :checked="checked" @change="switch1Change" color="#275e98" style="transform: scale(0.5,0.5);" />
			</view>
		</view>
		<image class="aimg" src="../../../static/icon/6664.png" mode=""></image>
		<view class="headtitle">
			<text>编号T5B464668444447</text>
			<text>型号：JTW-1203V-012</text>
			<view class="states">
				<image src="../../../static/icon/6833.png" mode=""></image>
				<text>工作中</text>
			</view>
		</view>

		<view class="detail">
			<view class="probe-list-box">
				<view class="box-left">
					<view class="box-left-color" :style="{ width: '85%' }"></view>
					<image src="../../../static/icon/6820.png" mode=""></image>
					<text>电量</text>
					<text class="num">85%</text>
				</view>
				<view class="box-right">
					<image src="../../../static/icon/6823.png" mode=""></image>
					<text>温度</text>
					<text class="num">85℃</text>
				</view>
			</view>
			<view class="box-mid">
				<view class="top">
					<text>安装位置</text>
					<text>110kV丹诗文线-N4塔杆A相位大号侧下子导线</text>
				</view>
				<view class="mid" @click="record">
					<text>告警记录</text>
					<text>100条</text>
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
							{{ selectedYear }}-{{ selectedMonth + 1 < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1 }}-{{ selectedDate < 10 ? '0' + selectedDate : selectedDate }}
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
						:class="{ 'option-list-red': item.num >= 50, 'option-list-origin': item.num >= 37 && item.num < 50 }"
						v-for="(item, index) in timetemperature"
						:key="index"
					>
						<text class="leftbord" :class="{ textwhite: item.num < 37, textorigin: item.num >= 37 && item.num < 50, textred: item.num >= 50 }">{{ item.time }}</text>
						<text :class="{ textwhite: item.num < 37, textorigin: item.num >= 37 && item.num < 50, textred: item.num >= 50 }">{{ item.num }}</text>
						<view class="bordbot"></view>
					</view>
				</view>
				
				<view class="charts-box" v-else>
				  <qiun-data-charts type="line" canvasId="scrolllineid" :opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:6,disableGrid:true}}" :chartData="chartsDataLine4" :ontouch="true" :canvas2d="true"/>
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
			active: '数据',
			checked: false,
			selectedYear: new Date().getFullYear(),
			selectedMonth: new Date().getMonth(),
			selectedDate: new Date().getDate(),
			chartsDataLine4: {
					"categories": ["2016", "2017", "2018", "2019", "2020", "2021","2022","2023","2024","2025","2026","2027","2028","2029"],
					"series": [{
						"name": "成交量A",
						"data": [35, 8, 25, 37, 4, 20, 4, 20, 68, 4, 20,20, 68, 4, 20, 4, 20,20, 68, 4, 20]
					}]
				},
			optiondata: ['数据', '图表'],
			timetemperature: [
				{
					time: '04:15',
					num: '23'
				},
				{
					time: '04:15',
					num: '72'
				},
				{
					time: '04:15',
					num: '23'
				},
				{
					time: '04:15',
					num: '42'
				},
				{
					time: '04:15',
					num: '38'
				},
				{
					time: '04:15',
					num: '24'
				},
			]
		};
	},
	created() {},
	computed: {
		calendar: function() {
			// 定义每个月的天数，如果是闰年第二月改为29天
			// year=2018;month=1(js--month=0~11)
			let year = new Date().getFullYear();
			let month = new Date().getMonth();
			let nextNum;
			let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
				daysInMonth[1] = 29;
			}
			// 获得指定年月的1号是星期几
			let targetDay = new Date(year, month, 1).getDay();
			// 将要在calendar__main中渲染的列表
			let total_calendar_list = [];
			let preNum = targetDay;
			// 首先先说一下，我们的日期是(日--六)这个顺序也就是(0--6)
			// 有了上述的前提我们可以认为targetDay为多少，我们就只需要在total_calendar_list的数组中push几个content为''的obj作为占位
			if (targetDay > 0) {
				for (let i = 0; i < preNum; i++) {
					let obj = {
						type: 'pre',
						content: ''
					};
					total_calendar_list.push(obj);
				}
			}
			for (let i = 0; i < daysInMonth[month]; i++) {
				let obj = {
					type: 'normal',
					content: i + 1
				};
				total_calendar_list.push(obj);
			}
			if (total_calendar_list.length > 35) {
				nextNum = 42 - total_calendar_list.length;
			} else {
				nextNum = 35 - total_calendar_list.length;
			}
			// 与上面的type=pre同理
			for (let i = 0; i < nextNum; i++) {
				let obj = {
					type: 'next',
					content: ''
				};
				total_calendar_list.push(obj);
			}
			return total_calendar_list;
		}
	},
	methods: {
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
		},
		handleNextMonth() {
			let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if ((this.selectedYear % 4 === 0 && this.selectedYear % 100 !== 0) || this.selectedYear % 400 === 0) {
				daysInMonth[1] = 29;
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
			justify-content: center;
			box-sizing: border-box;
			background: rgba(214, 242, 255, 0.15);
			border: 1rpx solid #5bc8cb;
			.box-left-color {
				position: absolute;
				left: 0;
				top: 0;
				height: 94rpx;
				border-radius: 14rpx 0px 0px 14rpx;
				background: linear-gradient(90deg, #7fe57f 0%, #41c9fc 100%);
				opacity: 0.5;
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
		.box-right {
			width: 317rpx;
			height: 94rpx;
			border-radius: 14rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			background: linear-gradient(180deg, rgba(255, 252, 230, 0.35) 0%, rgba(65, 201, 252, 0.35) 100%);
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
						background-image: url(../../../static/icon/Gps.png);
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
		height: 903rpx;
		border: 2px solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2px 4px 10px rgba(90, 232, 255, 0.8);
		position: relative;
		.charts-box {
			width: 100%;
			height: 600rpx;
			background: #FFFFFF;
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
