<template>
	<view class="probe">
		<headerTab title="关联的探头 50"></headerTab>
		<view class="screen">
			<view v-for="(item,index) in screenlist" :key="index" @click="screen(index)" :class="item.active=='active'?'active':''">
				<text>{{ item.text }}</text>
				<image v-if="item.active=='active'" src="../../../static/icon/13926.png" mode=""></image>
			</view>
		</view>
		<view class="probe-list">
			<view class="probe-list-box" v-for="(item, index) in probelist" :key="index" @click="jump">
				<view class="probe-list-box-top" :style="item.state == '已离线' ? 'opacity:0.4' : ''">
					<view class="box-top-left">
						<image src="../../../static/icon/6834.png" mode=""></image>
						<text>编号{{ item.number }}</text>
					</view>
					<view class="box-top-right">
						<image v-if="item.state == '工作中'" src="../../../static/icon/6833.png" mode=""></image>
						<image v-if="item.state == '已离线'" src="../../../static/icon/6832.png" mode=""></image>
						<image v-if="item.state == '待激活'" src="../../../static/icon/6837.png" mode=""></image>
						<text>{{ item.state }}</text>
					</view>
				</view>
				<view class="electric" :style="item.state == '已离线' ? 'opacity:0.4' : ''">
					<view
						class="electric-left"
						:class="{ 'electric-left-blue': item.electric > 30, 'electric-left-red': item.electric <= 30, 'electric-left-no': item.state == '已离线','electric-left-lixian': item.state=='待激活' }"
					>
						<view class="electric-num-left" :class="{ blue: item.electric > 30, red: item.electric <= 30 }" :style="{ width: item.electric + '%' }"></view>
						<image src="../../../static/icon/6820.png" mode=""></image>
						<text>电量</text>
						<text class="num">{{ item.electric?item.electric+'%':'---' }}</text>
					</view>
					<view
						class="electric-right"
						:class="{
							'electric-right-blue': item.temperature <= 30,
							'electric-right-origin': item.temperature <= 50 && item.temperature > 30,
							'electric-right-red': item.temperature > 50,
							'electric-left-no': item.state == '已离线',
							'electric-left-lixian': item.state=='待激活'
						}"
					>
						<image src="../../../static/icon/6823.png" mode=""></image>
						<text>温度</text>
						<text class="num">{{ item.temperature?item.temperature+'%':'---' }}</text>
					</view>
				</view>
				<text class="bot-text" :style="item.state == '已离线' ? 'opacity:0.4' : ''">位置：{{ item.gps }}</text>
				<view class="box-foot"></view>
			</view>
		</view>
		<uni-load-more :status="more" :contentText="{contentrefresh:'正在加载中...'}"></uni-load-more>
		<image class="fixedimg" src="../../../static/icon/13.png" mode=""></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			screenlist: [
				{
					text: "全部",
					active: ""
				},
				{
					text: "电量低",
					active: ""
				},
				{
					text: "已超温",
					active: ""
				},
				{
					text: "高温",
					active: ""
				},
				{
					text: "已离线",
					active: ""
				},
			],
			more: "noMore",
			keyword: '',
			probelist: [
				{
					number: 'T5B464668444447',
					state: '工作中',
					electric: '85',
					temperature: '28',
					gps: '110kV丹诗文线-N4塔杆A相位大号侧下子导线'
				},
				{
					number: 'T5B464668444447',
					state: '工作中',
					electric: '30',
					temperature: '45',
					gps: '110kV丹诗文线-N4塔杆A相位大号侧下子导线'
				},
				{
					number: 'T5B464668444447',
					state: '工作中',
					electric: '67',
					temperature: '53',
					gps: '110kV丹诗文线-N4塔杆A相位大号侧下子导线'
				},
				{
					number: 'T5B464668444447',
					state: '已离线',
					gps: '110kV丹诗文线-N4塔杆A相位大号侧下子导线'
				},
				{
					number: 'T5B464668444447',
					state: '待激活',
					gps: '110kV丹诗文线-N4塔杆A相位大号侧下子导线'
				},
				{
					number: 'T5B464668444447',
					state: '待激活',
					gps: '110kV丹诗文线-N4塔杆A相位大号侧下子导线'
				},
				{
					number: 'T5B464668444447',
					state: '工作中',
					electric: '33',
					temperature: '23',
					gps: '110kV丹诗文线-N4塔杆A相位大号侧下子导线'
				}
			]
		};
	},
	onReachBottom() {
		this.more = "loading"
	},
	methods: {
		screen(index){
			if(this.screenlist[index].active==""){
				this.screenlist[index].active = "active"
			}else{
				this.screenlist[index].active = ""
			}
		},
		jump(){
			uni.navigateTo({
				url:"../../Probedetail/probeDetail/probeDetail"
			})
		}
	}
};
</script>

<style lang="less" scoped>
.probe {
	background: #033785;
	z-index: -999;
	.screen{
		position: fixed;
		top: 168rpx;
		width: 100%;
		height: 89rpx;
		border: 1rpx solid #4492C2;
		background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
		box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999999;
		.active{
			width: 125rpx;
			height: 54rpx;
			background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
			box-shadow: 0px 0px 6rpx rgba(2, 2, 55, 0.28);
			opacity: 1;
			border-radius: 80rpx;
			box-sizing: border-box;
			border: none;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 54rpx;
				color: #FFFFFF;
			}
		}
		view{
			width: 125rpx;
			height: 54rpx;
			text-align: center;
			background: rgba(214, 242, 255, 0.15);
			border: 1rpx solid #5BC8CB;
			opacity: 1;
			border-radius: 80rpx;
			margin: 0 5rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			image{
				width: 17rpx;
				height: 13rpx;
			}
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 54rpx;
				color: #FFFFFF;
				opacity: 0.58;
			}
		}
	}
	.fixedimg{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 658rpx;
		z-index: -1;
	}
	.probe-list {
		margin-top: 260rpx;
		padding: 20rpx 36rpx;
		box-sizing: border-box;
		.probe-list-box {
			width: 100%;
			border: 2rpx solid rgba(90, 232, 255, 0.7);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
			margin-bottom: 20rpx;
			position: relative;
			.probe-list-box-top {
				width: 100%;
				height: 53rpx;
				background: linear-gradient(90deg, #021f4b 0%, #093765 100%);
				opacity: 0.6;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
				.box-top-right {
					display: flex;
					align-items: center;
					image {
						width: 53rpx;
						height: 53rpx;
					}
					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #ffffff;
					}
				}
				.box-top-left {
					display: flex;
					align-items: center;
					image {
						width: 26rpx;
						height: 26rpx;
					}
					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #ffffff;
						margin-left: 6rpx;
					}
				}
			}
			.electric {
				margin-top: 21rpx;
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				.electric-left-lixian{
					background: rgba(214, 242, 255, 0.15);
				}
				.electric-left-no {
					background: rgba(214, 242, 255, 0.2);
				}
				.electric-right-blue {
					background: linear-gradient(180deg, rgba(255, 252, 230, 0.35) 0%, rgba(65, 201, 252, 0.35) 100%);
				}
				.electric-right-origin {
					background: linear-gradient(180deg, rgba(219, 229, 127, 0.7) 0%, rgba(248, 108, 16, 0.7) 100%);
				}
				.electric-right-red {
					background: linear-gradient(180deg, rgba(244, 67, 54, 0.9) 0%, rgba(113, 1, 5, 0.9) 100%);
				}
				.electric-right {
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
						margin-left: 10rpx;
					}
					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #ffffff;
					}
				}
				.electric-left-red {
					background: rgba(244, 67, 54, 0.17);
					border: 1px solid rgba(244, 67, 54, 0.5);
				}
				.electric-left-blue {
					background: rgba(214, 242, 255, 0.15);
					border: 1rpx solid #5bc8cb;
				}
				.electric-left {
					width: 317rpx;
					height: 94rpx;
					opacity: 1;
					border-radius: 14rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					image {
						width: 50rpx;
						height: 50rpx;
						z-index: 999;
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
					.electric-num-left {
						position: absolute;
						left: 0;
						top: 0;
						height: 90rpx;
						border-radius: 14rpx 0px 0px 14rpx;
					}
					.blue {
						background: linear-gradient(90deg, rgba(127, 229, 127, 0.5) 0%, rgba(65, 201, 252, 0.5) 100%);
					}
					.red {
						background: linear-gradient(270deg, rgba(244, 67, 54, 0.9) 0%, rgba(112, 12, 12, 0.9) 100%);
					}
				}
			}
			.bot-text {
				display: inline-block;
				width: 100%;
				padding: 0 20rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				margin-top: 13rpx;
				line-height: 40rpx;
				color: #f6b532;
				box-sizing: border-box;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.box-foot {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 114rpx;
				height: 4rpx;
				background: #54d6ff;
				box-shadow: 0px 0px 8rpx #9ef2ff;
			}
		}
	}
}
</style>
