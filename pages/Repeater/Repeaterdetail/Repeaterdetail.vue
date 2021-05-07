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
			<text>编号T5B464668444447</text>
			<text>型号：JTW-1203V-012</text>
			<view class="states">
				<image src="../../../static/icon/6833.png" mode=""></image>
				<text>工作中</text>
			</view>
		</view>

		<view class="wrap">
			<view class="option">
				<view @click="jump">
					<text>关联探头</text>
					<text>50个</text>
				</view>
				<view>
					<text>告警记录</text>
					<text>3条</text>
				</view>
			</view>
			<view class="electric">
				<view class="electric-box">
					<image src="../../../static/icon/6820.png" mode=""></image>
					<text>电量</text>
					<text style="font-weight: bold;">85%</text>
					<view class="process" :style="{width: '85%'}"></view>
				</view>
			</view>
			<view class="basic">
				<view class="headtitlein">
					<image src="../../../static/icon/6834.png" mode=""></image>
					<text>基本信息</text>
				</view>
				<view class="list">
					<view class="list-content" v-for="(item,index) in listcontent" :key="index">
						<view class="nowrap">
							<text>{{ item.title }}</text>
							<text>{{ item.text }}</text>
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
					<view class="list-content" v-for="(item,index) in installinfo" :key="index">
						<view class="nowrap">
							<text>{{ item.title }}</text>
							<text v-if="item.text">{{ item.text }}</text>
							<view v-else class="nowrap-box">
								<image src="../../../static/icon/6873.png" mode=""></image>
								<view>
									<text style="font-weight: bold;opacity: 1;font-size: 32rpx;">{{ item.http }}</text>
									<text style="opacity: 0.5;">{{ item.ip }}</text>
								</view>
							</view>
						</view>
						
						<view v-if="item.text" class="borderbot"></view>
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
					<view class="list-content" v-for="(item,index) in listcont" :key="index">
						<view class="nowrap">
							<text>{{ item.title }}</text>
							<text>{{ item.text }}</text>
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
			active: '数据',
			checked: false,
			selectedYear: new Date().getFullYear(),
			selectedMonth: new Date().getMonth(),
			selectedDate: new Date().getDate(),
			optiondata: ['数据', '图表'],
			listcontent: [
				{
					title: "设备名称",
					text: "中继器025441"
				},
				{
					title: "设备编号",
					text: "TT56456498464"
				},
				{
					title: "型号",
					text: "JYB-4089-E"
				},
				{
					title: "工作环境",
					text: "35kV-500kV"
				},
				{
					title: "防护等级",
					text: "IP65"
				}
			],
			listcont: [
				{
					title: "负责公司",
					text: "贵州大力新运营公司"
				},
				{
					title: "运维班长",
					text: "王有才"
				}
			],
			installinfo: [
				{
					title: "中继器IP",
					text: "192.168.0.4"
				},
				{
					title: "4G卡号",
					text: "18545584545"
				},
				{
					title: "安装位置IP",
					text: "110kV丹诗文线-N4"
				},
				{
					title: "关联服务器IP",
					http: "https//www.baidu.co...",
					ip: "IP:192.168.0.4"
				},
				{
					title: "安装情况说明",
					text: "安装情况说明的文字安装情况说明的文字安装情况说明的文字"
				},
				{
					title: "设备状态",
					text: "使用中"
				},
				{
					title: "使用情况",
					text: "2020年12月21日投入使用，已使用30天2020年12月21日投入使用，已使用30天"
				}
			]
		};
	},
	created() {},
	onLoad(option) {
		this.$api.postapi('/api/repeater/sel_repeater_detail',{id:option.id}).then(res => {
			console.log(res)
		})
	},
	methods: {
		jump(){
			uni.navigateTo({
				url:"../relation/relation"
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
				border-radius: 14rpx 0px 0px 14rpx;
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
						min-width: 160rpx;
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
