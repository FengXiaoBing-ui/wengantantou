<template>
	<view class="index">
		<headerTab title="蓝牙连接"></headerTab>
		<view class="wrap">
			<view class="list_box" v-if="bluelist">
				<view class="list" v-for="(item,index) in list" @click="connectivity(item)" :key="index">
					<text>{{ item.name }}</text>
					<text>{{ item.deviceId }}</text>
				</view>
			</view>
			<view class="list_box" v-if="!bluelist">
				<view class="list" v-for="(item,index) in services" @click="connectivityuuid(item.uuid)" :key="index">
					<text>{{ item.uuid }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uuid:"",
				message:"",
				bluelist:true,
				blueisinput:false,
				statistics:{},
				serviceId: '',
				deviceId: '',
				more: 'noMore',
				active: 'bordbot_left',
				fontactive_left: 'active',
				fontactive_right: '',
				list: [],
				services:[],
				chartsDataGauge1: ""
			};
		},
		beforeCreate() {
			setTimeout(() => {
				this.Repeaterstatistics()
			},5)
		},
		onLoad() {
			this.openBluetoothAdapter();
			uni.showLoading({
				title:"扫描中..."
			})
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
			//点击连接蓝牙
			connectivity(item){
				this.bluelist = false
				uni.showLoading({
					title:"连接中..."
				})
				this.createBLEConnection(item.deviceId)
			},
			//点击选择uuid
			connectivityuuid(uuid){
				this.serviceId = uuid;
				this.getBLEDeviceCharacteristics();
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
							uni.hideLoading()
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
							uni.hideLoading()
							uni.showToast({
								title:'蓝牙连接成功'
							})
							
							this.services = res.services
							console.log('device services:', res.services);
	// 						res.services.forEach(item => {
	// 							if (item.uuid.indexOf('0000FFE0') != -1) {
	// 								console.log(123, item.uuid);
	// 								this.serviceId = item.uuid;
	// 								//存储到状态
	// 								this.$store.commit('upserviceId', item.uuid);
	
	// 								// 这里获取回调，读取成功就的值就会在这个地方接收到！！！
	
	// 								this.getBLEDeviceCharacteristics();
	// 							}
	// 						});
						}
					});
				}, 1000);
			},
			//获取蓝牙特征
			getBLEDeviceCharacteristics() {
				uni.showToast({
					title:'进入特征'
				})
				this.blueisinput = true
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
								if(res.characteristics[i].properties.read==true&&res.characteristics[i].properties.write==true&&res.characteristics[i].properties.notify==true){
									this.uuid = res.characteristics[i].uuid
									let obj = {
										deviceId: this.deviceId,
										// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
										serviceId: this.serviceId,
										// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
										characteristicId: res.characteristics[i].uuid,
									}
									uni.navigateTo({
										url:"../Bluetooth/Bluetooth?obj="+JSON.stringify(obj)
									})
								}else{
									uni.showToast({
										title:"该特征不能发送数据",
										icon:"none"
									})
								}
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
							uni.writeBLECharacteristicValue({
								deviceId: _this.deviceId,
								serviceId: _this.serviceId,
								characteristicId: characteristicId,
								value: _this.string2buf(this.message), 
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
.wrap{
	position: relative;
	top: 220rpx;
	z-index: 999;
	.list_box{
		width: 100%;
		.list{
			width: 100%;
			padding: 0 20rpx;
			box-sizing: border-box;
			height: 100rpx;
			border: 1rpx solid #4CD964;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
		}
	}
}
</style>
