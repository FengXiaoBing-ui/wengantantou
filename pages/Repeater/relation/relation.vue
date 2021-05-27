<template>
	<view class="probe">
		<headerTab :title="'关联的探头 '+ count"></headerTab>
		<view class="screen">
			<view v-for="(item,index) in screenlist" :key="index" @click="screen(item.text,index)" :class="item.text==active?'active':''">
				<text>{{ item.text }}</text>
				<image v-if="item.text==active" src="../../../static/icon/13926.png" mode=""></image>
			</view>
		</view>
		<view class="probe-list">
			<view class="probe-list-box" v-for="(item, index) in probelist" :key="index" @click="jump(item.id)">
				<view class="probe-list-box-top" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">
					<view class="box-top-left">
						<image src="../../../static/icon/6834.png" mode=""></image>
						<text>编号{{ item.device_id }}</text>
					</view>
					<view class="box-top-right">
						<image v-if="item.state_text == '工作中'" src="../../../static/icon/6833.png" mode=""></image>
						<image v-if="item.state_text == '已离线'" src="../../../static/icon/6832.png" mode=""></image>
						<image v-if="item.state_text == '待激活'" src="../../../static/icon/6837.png" mode=""></image>
						<text>{{ item.state_text }}</text>
					</view>
				</view>
				<view class="electric" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">
					<view
						class="electric-left"
						:class="{ 'electric-left-blue': item.power_number > 30, 'electric-left-red': item.power_number <= 30, 'electric-left-no': item.state_text == '已离线','electric-left-lixian': item.state_text=='待激活' }"
					>
						<view class="electric-num-left" :class="{ blue: item.power_number > 30, red: item.power_number <= 30 }" :style="{ width: item.power_number + '%' }"></view>
						<image src="../../../static/icon/6820.png" mode=""></image>
						<text>电量</text>
						<text class="num">{{ item.power_number?item.power_number+'%':'---' }}</text>
					</view>
					<view
						class="electric-right"
						:class="{
							'electric-right-blue': item.now_temperature <= 30,
							'electric-right-origin': item.now_temperature <= 50 && item.now_temperature > 30,
							'electric-right-red': item.now_temperature > 50,
							'electric-left-no': item.state_text == '已离线',
							'electric-left-lixian': item.state_text=='待激活'
						}"
					>
						<image src="../../../static/icon/6823.png" mode=""></image>
						<text>温度</text>
						<text class="num">{{ item.now_temperature?item.now_temperature+'℃':'---' }}</text>
					</view>
				</view>
				<text class="bot-text" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">位置：{{ item.tower_position }}</text>
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
			count: "",
			repeater_id: "",
			screenlist: [
				{
					text: "全部"
				},
				{
					text: "电量低"
				},
				{
					text: "已超温"
				},
				{
					text: "高温"
				},
				{
					text: "已离线"
				},
			],
			more: "noMore",
			keyword: '',
			probelist: [],
			active: "全部",
			state: 0
		};
	},
	onReachBottom() {
		this.more = "loading"
	},
	onLoad(option) {
		this.repeater_id = option.id
		this.relation()
	},
	methods: {
		relation(){
			this.$api.postapi('/api/repeater/selSensorByRepaterId',{repeater_id:this.repeater_id,state:this.state}).then(res => {
				console.log(res)
				this.count = res.data.count
				this.probelist = res.data.data
			})
		},
		screen(text,index){
			this.active = text
			this.state = index
			this.relation()
		},
		jump(id){
			uni.navigateTo({
				url:"../../Probedetail/probeDetail/probeDetail?id="+id
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
