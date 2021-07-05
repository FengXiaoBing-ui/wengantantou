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
				<view class="right"></view>
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
				<view class="list" v-for="(item, index) in list" :key="index" @click="createBLEConnection(item.deviceId)">
					<view class="">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad() {
		this.openBluetoothAdapter();
	},
	methods: {
		openBluetoothAdapter() {
			uni.openBluetoothAdapter({
				success:(res)=> { //已打开
					uni.getBluetoothAdapterState({//蓝牙的匹配状态
						success:(res1)=>{
							console.log(res1,'“本机设备的蓝牙已打开”')
							// 开始搜索蓝牙设备
							this.startBluetoothDeviceDiscovery()
						},
						fail(error){
							uni.showToast({
								icon:'none',
								title: '查看手机蓝牙是否打开',
							})
						}
					});
				},
				fail:err=>{ //未打开
					uni.showToast({icon:'none',title: '查看手机蓝牙是否打开'});
				}
			})
		},
		startBluetoothDeviceDiscovery(){
			uni.startBluetoothDevicesDiscovery({
				success: (res) => {
					console.log('startBluetoothDevicesDiscovery success', res)
					// 发现外围设备
					this.onBluetoothDeviceFound()
				},fail:err=>{
					console.log(err,'错误信息')
				}
			})
		},
		onBluetoothDeviceFound() {
			// console.log("zhixing")
			uni.onBluetoothDeviceFound((res) => {
				// console.log(res)
				// ["name", "deviceId"]
				// 吧搜索到的设备存储起来，方便我们在页面上展示
				console.log(res)
				if(this.list.indexOf(res.devices[0].deviceId)==-1){
					
					if(res.devices[0].name!=""){
						this.list.push(res.devices[0])
						console.log(123,this.list)
					}
					
				}
			})
		},
		createBLEConnection(deviceId){
			let thit = this
			//data里面建立一个deviceId，存储起来
			this.deviceId = deviceId
			//连接蓝牙
			uni.createBLEConnection({
			// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
			  deviceId:this.deviceId,
			  success(res) {
			  	//防止在这里面取不到this，古在外面用thit存储了this
				thit.stopBluetoothDevicesDiscovery()
				console.log(res)
				console.log("蓝牙连接成功")
				thit.getBLEDeviceServices()
			  },fail(res) {
				console.log("蓝牙连接失败",res)
			  }
			})
		},
		stopBluetoothDevicesDiscovery(){ 
			uni.stopBluetoothDevicesDiscovery({ 
				success: e => {
					this.loading = false
					console.log('停止搜索蓝牙设备:' + e.errMsg); 
				},
				fail: e => {
					console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode);
				}
			});
		},
		getBLEDeviceServices(){
			setTimeout(()=>{
				uni.getBLEDeviceServices({
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId:this.deviceId,
				  success:(res)=>{
					// console.log("成功",res)
					console.log('device services:', res)
					res.services.forEach((item)=>{
						if(item.uuid.indexOf("AE00")!=-1){
							// this.serviceId = item.uuid;
							//存储到状态
							this.$store.commit("upserviceId",item.uuid)
							console.log(this.serviceId)
							// 这里获取回调，读取成功就的值就会在这个地方接收到！！！
							uni.onBLECharacteristicValueChange((res)=>{
								console.log("监听成功",res)
								//res.value是ArrayBuffer类型的，官方给了一个方法转16进制，我们再进行操作
								this.shiliu = this.ab2hex(res.value)
							})
							
							this.getBLEDeviceCharacteristics()
						}
					})
				  }
				})
			},1000)
		},
		//获取蓝牙特征
		getBLEDeviceCharacteristics(){
			console.log("进入特征");
			setTimeout(()=>{
				uni.getBLEDeviceCharacteristics({
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId:this.deviceId,
				  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				  serviceId:this.serviceId,
				  success:(res)=>{
					console.log(res,'特征getBLEDeviceCharacteristics')
					this.characteristics = res.characteristics
					console.log(this.characteristics)
					//循环所有的uuid
					
					// for(let i=0;i<3;i++){
					// 	this.notifyBLECharacteristicValueChange(res.characteristics[i].uuid)
					// 	console.log(res.characteristics[i].uuid)
					// 	console.log(i,'i')
					// }
					
					res.characteristics.forEach((item)=>{
						if(item.uuid.indexOf("AE02") != -1){
							console.log('characteristicId:', item.uuid)
							//利用传参的形势传给下面的notify，这里的uuid如果都需要用到，就不用做判断了，建议使用setTimeout进行间隔性的调用此方法
							this.notifyBLECharacteristicValueChange(item.uuid)
						}
					})
					
				  },
				  fail:(res)=>{
					console.log(res)
				  }
				})
			},1000)
		},
		notifyBLECharacteristicValueChange(characteristicId){
			console.log(characteristicId,'characteristicId')
			uni.notifyBLECharacteristicValueChange({
			  state: true, // 启用 notify 功能
			  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
			  deviceId:this.deviceId,
			  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
			  serviceId:this.serviceId,
			  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
			  characteristicId:characteristicId,
			  success:(res)=> {
				console.log(res)
				// console.log(this.characteristicId)
				console.log('notifyBLECharacteristicValueChange success', res.errMsg)
		
			  },
			  fail:(res)=> {
				console.log('notifyBLECharacteristicValueChange success2', res.errMsg)
			  }
			})
			
		},
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
	.Dashboard {
		margin-top: 100rpx;
		.list {
			width: 100%;
			border-top: 2rpx solid #ffffff;
		}
	}
	.header_box {
		width: 100%;
		height: 358rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(59, 242, 255, 0.6) 0%, rgba(5, 51, 159, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		position: relative;
		padding: 0 61rpx;
		box-sizing: border-box;
		.left {
			width: 50%;
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
			width: 50%;
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
