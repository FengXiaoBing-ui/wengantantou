<template>
	<view class="probe">
		<headerTab title="探头列表" :screen="true" path="/screen/screen" @func="func" @serchdata="serchdata"></headerTab>
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
						:class="{
							'electric-left-blue': item.power_number > $store.state.electric&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-left-red': item.power_number <= $store.state.electric&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-left-no': item.state_text == '已离线'||item.state_text == '维修'||item.state_text == '报废',
							'electric-left-lixian': item.state_text == '待激活'
						}"
					>
						<view
							class="electric-num-left"
							:class="{ blue: item.power_number > $store.state.electric, red: item.power_number <= $store.state.electric }"
							:style="{ width: item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废'?(item.power_number + '%'):0 }"
						></view>
						<image src="../../../static/icon/6820.png" mode=""></image>
						<text>电量</text>
						<text class="num">{{ item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废' ? item.power_number + '%' : '---' }}</text>
					</view>
					<view
						class="electric-right"
						:class="{
							'electric-right-blue': item.now_temperature <= item.over_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-right-origin': item.now_temperature <= item.high_temperature && item.now_temperature > item.over_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-right-red': item.now_temperature > item.high_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-left-no': item.state_text == '已离线'||item.state_text == '维修'||item.state_text == '报废',
							'electric-left-lixian': item.state_text == '待激活'
						}"
					>
						<image src="../../../static/icon/6823.png" mode=""></image>
						<text>温度</text>
						<text class="num">{{ item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废' ? (item.now_temperature + '℃') : '---' }}</text>
					</view>
				</view>
				<text class="bot-text" v-if="item.state_text != '待激活'" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">位置：{{ item.tower_position }}</text>
				<view class="box-foot"></view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</view>

		<image class="fixedimg" src="../../../static/icon/13.png" mode=""></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			limit: 8,
			more: 'more',
			keyword: '',
			probelist: [],
			obj: {}
		};
	},
	onBackPress() {
		uni.switchTab({
			url:"../../index/index"
		})
		return true
	},
	onReachBottom() {
		this.more = 'loading';
		this.limit += 8;
		if (JSON.stringify(this.obj) == '{}') {
			this.queryprobelist();
		} else {
			this.screen(this.obj);
		}
	},
	onLoad(option) {
		if (option.obj != undefined) {
			let obj = JSON.parse(option.obj);
			// if(obj.keyword==""){
			// 	delete obj.keyword
			// }
			// if(obj.line_id==""){
			// 	delete obj.line_id
			// }
			// if(obj.tagan_id==""){
			// 	delete obj.tagan_id
			// }
			this.obj = obj;
			setTimeout(() => {
				this.screen(obj);
			}, 0);
		} else {
			this.queryprobelist();
		}
	},
	created() {},
	methods: {
		serchdata(keyword) {
			this.keyword = keyword;
			this.queryprobelist();
		},
		screen(obj) {
			this.$api.postapi('/api/Sensor/sensor_screen', obj).then(res => {
				if (this.limit >= res.data.count) {
					this.more = 'nomore';
				}
				console.log(456, res);
				if (res.data.code == 0) {
					this.more = 'nomore';
					return false;
				} else {
					this.probelist = res.data.data;
				}
			});
		},
		queryprobelist() {
			this.$api.postapi('/api/Sensor/sel_all_sensor', { limit: this.limit, keyword: this.keyword }).then(res => {
				if (this.limit >= res.data.count) {
					this.more = 'nomore';
				}
				this.probelist = res.data.data;
			});
		},
		func() {
			uni.scanCode({
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					let obj = JSON.parse(res.result);
					if (obj.type == 0) {
						uni.navigateTo({
							url: '../../scan/scanprobedetail/scanprobedetail?id=' + obj.id
						});
					} else {
						uni.navigateTo({
							url: '../../scan/scanRepeater/scanRepeater?id=' + obj.id
						});
					}
				}
			});
		},
		jump(id) {
			uni.navigateTo({
				url: '../probeDetail/probeDetail?id=' + id
			});
		},
		screenjump() {
			uni.navigateTo({
				url: '../screen/screen'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.probe {
	background: #033785;
	z-index: -999;
	margin-top: 148rpx;
	.fixedimg {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 658rpx;
		z-index: -1;
	}
	.probe-list {
		margin-top: 268rpx;
		padding: 20rpx 36rpx;
		box-sizing: border-box;
		.nodata {
			position: fixed;
			left: 50%;
			top: 50%;
			color: #ffffff;
			transform: translate(-50%, -50%);
		}
		.probe-list-box {
			width: 100%;
			border: 2rpx solid rgba(90, 232, 255, 0.7);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
			margin-bottom: 20rpx;
			padding-bottom: 20rpx;
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
				.electric-left-lixian {
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
					overflow: hidden;
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
						border-radius: 14rpx 0 0 14rpx;
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
				color: #f6b532;
				box-sizing: border-box;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.box-foot {
				position: absolute;
				left: 50%;
				bottom: -2rpx;
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
