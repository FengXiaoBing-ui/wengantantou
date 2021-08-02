<template>
	<view class="index">
		<headerTab title="中继器统计"></headerTab>
		<view class="wrap">
			<view class="header_box">
				<view class="left">
					<view class="all_count">
						<view class="all_count_text"><text>中继器总数</text></view>
						<text>500</text>
					</view>
					<view class="all_count">
						<view class="all_count_text"><text>中继器总数</text></view>
						<text>500</text>
					</view>
				</view>
				<view class="right">
					<view class="charts-box">
						<qiun-data-charts
							type="gauge"
							:opts="{
								fontSize: 10,
								fontColor: '#ffffff',
								title: { name: '88%', color: '#FFFCE6', fontSize: 24, offsetY: 50 },
								subtitle: { name: '' },
								extra: { gauge: { labelColor: '#fff', width: 8, splitLine: { childWidth: 8, width: 10 }, pointer: { width: 10 } } }
							}"
							:chartData="chartsDataGauge1"
						/>
					</view>
				</view>
				<image class="leftwifi" src="../../../static/icon/43wifi.png" mode=""></image>
				<image class="right_icon" src="../../../static/icon/56.png" mode=""></image>
				<image class="bot_left_icon" src="../../../static/icon/57.png" mode=""></image>
				<image class="bot_icon" src="../../../static/icon/15.png" mode=""></image>
			</view>
			<view class="repair">
				<image class="repair_icon" src="../../../static/icon/7028.png" mode=""></image>
				<text class="all_count">总检修次数</text>
				<text class="count">785</text>
				<image class="bot_icon" src="../../../static/icon/13967.png" mode=""></image>
				<image class="bot_bord" src="../../../static/icon/15.png" mode=""></image>
			</view>

			<view class="Dashboard">
				<view class="Dashboard_tab">
					<view class="Dashboard_tab_left" :class="fontactive_left" @click="witeoverhaul">
						<text>待检修</text>
						<text>58</text>
					</view>
					<view class="Dashboard_tab_right" :class="fontactive_right" @click="witerepair">
						<text>待维修</text>
						<text>28</text>
					</view>
					<view class="bordbot" :class="active"></view>
				</view>
				<scroll-view scroll-y="true" class="listfather">
					<view class="list" v-for="(item, index) in list" :key="index" @click="createBLEConnection(item.deviceId)">
						<image src="../../../static/icon/wifi.png" mode=""></image>
						<view class="">编号 {{ item.name }}</view>
					</view>
					<uni-load-more :status="more"></uni-load-more>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			serviceId: '',
			deviceId: '',
			more: 'noMore',
			active: 'bordbot_left',
			fontactive_left: 'active',
			fontactive_right: '',
			list: [],
			chartsDataGauge1: {
				categories: [
					{
						value: 0.2,
						color: '#1890ff'
					},
					{
						value: 0.8,
						color: '#2fc25b'
					},
					{
						value: 1,
						color: '#f04864'
					}
				],
				series: [
					{
						name: '完成率',
						data: 0.89
					}
				]
			}
		};
	},
	onLoad() {
		this.openBluetoothAdapter();
	},
	methods: {
		witeoverhaul() {
			this.active = 'bordbot_left';
			this.fontactive_left = 'active';
			this.fontactive_right = '';
		},
		witerepair() {
			this.active = 'bordbot_right';
			this.fontactive_left = '';
			this.fontactive_right = 'active';
		},

		openBluetoothAdapter() {
			uni.openBluetoothAdapter({
				success: res => {
					//已打开
					uni.getBluetoothAdapterState({
						//蓝牙的匹配状态
						success: res1 => {
							console.log(res1, '“本机设备的蓝牙已打开”');
							// 开始搜索蓝牙设备
							this.startBluetoothDeviceDiscovery();
						},
						fail(error) {
							uni.showToast({
								icon: 'none',
								title: '查看手机蓝牙是否打开'
							});
						}
					});
				},
				fail: err => {
					//未打开
					uni.showToast({ icon: 'none', title: '查看手机蓝牙是否打开' });
				}
			});
		},
		startBluetoothDeviceDiscovery() {
			uni.startBluetoothDevicesDiscovery({
				success: res => {
					console.log('startBluetoothDevicesDiscovery success', res);
					// 发现外围设备
					this.onBluetoothDeviceFound();
				},
				fail: err => {
					console.log(err, '错误信息');
				}
			});
		},
		onBluetoothDeviceFound() {
			// console.log("zhixing")
			uni.onBluetoothDeviceFound(res => {
				// console.log(res)
				// ["name", "deviceId"]
				// 吧搜索到的设备存储起来，方便我们在页面上展示
				console.log(res);
				if (this.list.indexOf(res.devices[0].deviceId) == -1) {
					if (res.devices[0].name != '') {
						this.list.push(res.devices[0]);
						console.log(123, this.list);
					}
				}
			});
		},
		createBLEConnection(deviceId) {
			let thit = this;
			//data里面建立一个deviceId，存储起来
			this.deviceId = deviceId;
			//连接蓝牙
			uni.createBLEConnection({
				// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				deviceId: this.deviceId,
				success(res) {
					//防止在这里面取不到this，古在外面用thit存储了this
					thit.stopBluetoothDevicesDiscovery();
					console.log(res);
					console.log('蓝牙连接成功');
					thit.getBLEDeviceServices();
				},
				fail(res) {
					console.log('蓝牙连接失败', res);
				}
			});
		},
		stopBluetoothDevicesDiscovery() {
			uni.stopBluetoothDevicesDiscovery({
				success: e => {
					this.loading = false;
					console.log('停止搜索蓝牙设备:' + e.errMsg);
				},
				fail: e => {
					console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode);
				}
			});
		},
		getBLEDeviceServices() {
			setTimeout(() => {
				uni.getBLEDeviceServices({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					success: res => {
						// console.log("成功",res)
						console.log('device services:', res);
						res.services.forEach(item => {
							if (item.uuid.indexOf('0000FFE0') != -1) {
								console.log(123, item.uuid);
								this.serviceId = item.uuid;
								//存储到状态
								this.$store.commit('upserviceId', item.uuid);

								// 这里获取回调，读取成功就的值就会在这个地方接收到！！！

								this.getBLEDeviceCharacteristics();
							}
						});
					}
				});
			}, 1000);
		},
		//获取蓝牙特征
		getBLEDeviceCharacteristics() {
			console.log('进入特征');
			setTimeout(() => {
				uni.getBLEDeviceCharacteristics({
					// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
					deviceId: this.deviceId,
					// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
					serviceId: this.serviceId,
					success: res => {
						console.log(res, '特征getBLEDeviceCharacteristics');
						this.characteristics = res.characteristics;
						console.log(this.characteristics);
						//循环所有的uuid

						for (let i = 0; i < res.characteristics.length; i++) {
							this.notifyBLECharacteristicValueChange(res.characteristics[i].uuid);

							console.log(res.characteristics[i].uuid);
							console.log(i, 'i');
						}

						res.characteristics.forEach(item => {
							if (item.uuid.indexOf('AE02') != -1) {
								console.log('characteristicId:', item.uuid);
								//利用传参的形势传给下面的notify，这里的uuid如果都需要用到，就不用做判断了，建议使用setTimeout进行间隔性的调用此方法
								this.notifyBLECharacteristicValueChange(item.uuid);
							}
						});
					},
					fail: res => {
						console.log(res);
					}
				});
			}, 1000);
		},
		notifyBLECharacteristicValueChange(characteristicId) {
			let _this = this;
			// uni.writeBLECharacteristicValue({
			// 	deviceId: this.deviceId,
			// 	serviceId: this.serviceId,
			// 	characteristicId: characteristicId,
			// 	value: buffer,
			// 	success: function(res) {
			// 		console.log(res);
			// 	},
			// 	fail: function(res) {
			// 		console.log(res);
			// 	}
			// });
			// console.log(this.deviceId,this.serviceId,characteristicId, '686868686');
			uni.notifyBLECharacteristicValueChange({
				state: true, // 启用 notify 功能
				// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				deviceId: _this.deviceId,
				// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				serviceId: _this.serviceId,
				// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
				characteristicId: characteristicId,
				success: res => {
					let buffer = new ArrayBuffer(1);
					let dataView = new DataView(buffer);
					setTimeout(() => {
						dataView.setUint8(0, 0);
						console.log(7777777777, _this.string2buf('wwwwww'));
						uni.writeBLECharacteristicValue({
							deviceId: _this.deviceId,
							serviceId: _this.serviceId,
							characteristicId: characteristicId,
							value: _this.string2buf('niubi'), 
							success: function(res) {
								console.log(123456789, res);
							},
							fail: function(res) {
								console.log(789456123, res);
							}
						});
					}, 1000);
					function ab2hex(buffer) {
						const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
							return ('00' + bit.toString(16)).slice(-2);
						});
						return hexArr.join('');
					}
					function hexCharCodeToStr(hexCharCodeStr) {
					　　var trimedStr = hexCharCodeStr.trim();
					　　var rawStr = 
					　　trimedStr.substr(0,2).toLowerCase() === "0x"
					　　? 
					　　trimedStr.substr(2) 
					　　: 
					　　trimedStr;
					　　var len = rawStr.length;
					　　if(len % 2 !== 0) {
					　　　　alert("Illegal Format ASCII Code!");
					　　　　return "";
					　　}
					　　var curCharCode;
					　　var resultStr = [];
					　　for(var i = 0; i < len;i = i + 2) {
					　　　　curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
					　　　　resultStr.push(String.fromCharCode(curCharCode));
					　　}
					　　return resultStr.join("");
					}
					uni.onBLECharacteristicValueChange(function(res) {
						console.log('uni.onBLECharacteristicValueChange');
						console.log('特征值改变：' + JSON.stringify(res));
						console.log(`characteristic ${res.characteristicId} has changed, now is ${JSON.stringify(res.value)}`);
						var value = ab2hex(res.value);
						console.log('ArrayBuffer转16进度字符串完成：' + value);
						console.log(520,hexCharCodeToStr(value))
					});
				},
				fail: res => {
					console.log('success2', res.errMsg);
				}
			});
		},
		string2buf: function(str) {
			// 首先将字符串转为16进制
			let val = '';
			for (let i = 0; i < str.length; i++) {
				if (val === '') {
					val = str.charCodeAt(i).toString(16);
				} else {
					val += ',' + str.charCodeAt(i).toString(16);
				}
			}
			// 将16进制转化为ArrayBuffer
			return new Uint8Array(
				val.match(/[\da-f]{2}/gi).map(function(h) {
					return parseInt(h, 16);
				})
			).buffer;
		}
	}
};
</script>

<style lang="less" scoped>
.wrap {
	padding: 0 24rpx;
	box-sizing: border-box;
	width: 100%;
	position: relative;
	z-index: 9;
	top: 200rpx;
	padding-bottom: 100rpx;

	.Dashboard {
		width: 100%;
		margin-top: 20rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		.Dashboard_tab {
			height: 121rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.7);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
			display: flex;
			justify-content: space-between;
			padding: 0 190rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 44rpx;
			color: #ffffff;
			position: relative;
			.Dashboard_tab_left,
			.Dashboard_tab_right {
				width: 164rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 44rpx;
				color: #ffffff;
			}
			.active {
				font-size: 32rpx;
				font-weight: bold;
			}
			.bordbot {
				position: absolute;
				bottom: 0;
				width: 164rpx;
				height: 6rpx;
				border: 1rpx solid #5ae8ff;
				background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
				box-sizing: border-box;
				transition: 0.3s;
			}
			.bordbot_left {
				left: 190rpx;
			}
			.bordbot_right {
				left: 190rpx+164rpx;
			}
		}
		.listfather {
			height: 600rpx;
		}
		.list {
			display: flex;
			align-items: center;
			width: 100%;
			height: 81rpx;
			background: #033785;
			padding: 19rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #ffffff;
			box-sizing: border-box;
			&:nth-child(2n) {
				background: #002a6a;
			}
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 8rpx;
			}
		}
	}
	.header_box {
		width: 100%;
		height: 358rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(59, 242, 255, 0.6) 0%, rgba(5, 51, 159, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		position: relative;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.left {
			width: 40%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.all_count {
				margin-top: 41rpx;
				text-align: center;
				.all_count_text {
					width: 210rpx;
					height: 43rpx;
					background: #134a86;
					opacity: 1;
					border-radius: 24rpx;
					text-align: center;
					margin-bottom: 15rpx;
					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 43rpx;
						color: #54d6ff;
					}
				}
				text {
					font-size: 48rpx;
					font-family: Roboto;
					font-weight: bold;
					line-height: 58rpx;
					color: #fffce6;
				}
			}
		}
		.right {
			width: 60%;
			.charts-box {
				width: 100%;
				height: 320rpx;
			}
		}
		.leftwifi {
			width: 243rpx;
			height: 171rpx;
			position: absolute;
			left: 0;
			top: 0;
		}
		.right_icon {
			position: absolute;
			right: 0;
			top: 0;
			width: 182rpx;
			height: 213rpx;
		}
		.bot_left_icon {
			position: absolute;
			left: 0;
			bottom: 0;
			height: 54rpx;
		}
		.bot_icon {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 30rpx;
		}
	}
	.repair {
		margin-top: 26rpx;
		width: 100%;
		height: 129rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 3rpx 8px rgba(90, 232, 255, 0.8);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		.all_count {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #ffffff;
			margin: 0 25rpx 0 25rpx;
		}
		.count {
			font-size: 36rpx;
			font-family: Roboto;
			font-weight: bold;
			line-height: 43rpx;
			color: #fffce6;
		}
		.repair_icon {
			width: 74rpx;
			height: 74rpx;
		}
		.bot_icon {
			width: 60rpx;
			height: 27rpx;
			position: absolute;
			left: 50%;
			bottom: -14rpx;
			transform: translateX(-50%);
		}
		.bot_bord {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 30rpx;
			width: 100%;
		}
	}
}
</style>
