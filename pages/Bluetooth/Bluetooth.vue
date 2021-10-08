<template>
	<view class="index">
		<headerTab title="中继器连接"></headerTab>
		<view class="wrap">
			<view class="r_box">
				<view class="box_t">
					<view class="box_t_l">
						<image src="../../static/icon/1282.png" mode=""></image>
						<text>当前已连接中继器</text>
					</view>
					<view class="box_t_r">
						<text>中继时间</text>
						<text>2021-12-25</text>
					</view>
				</view>
				<view class="box_c_box">
					<view class="box_t_c_list box_t_c_list_h87">
						<view class="text_l">
							<text>中继编号</text>
							<text>无</text>
						</view>
						<image @click="repetaer_address(1)" class="img_r" src="../../static/icon/modify_blue.png" mode=""></image>
					</view>
					<view class="box_content_c">
						<view class="box_t_c_list box_t_c_list_h117">
							<view class="text_l_d">
								<text>上报IP</text>
								<text>192.168.2.3</text>
							</view>
							<image  @click="repetaer_address(3)" class="img_r" src="../../static/icon/modify_blue.png" mode=""></image>
						</view>
						<view class="box_t_c_list box_t_c_list_h117">
							<view class="text_l_d">
								<text>4G卡号</text>
								<text>135 8887 7845</text>
							</view>
							<image @click="repetaer_address(4)" class="img_r" src="../../static/icon/modify_blue.png" mode=""></image>
						</view>
					</view>
					<view class="deep_blue_box">
						<view class="text_l">
							<image src="../../static/icon/Gps.png" mode=""></image>
							<text>110kV丹诗文线 5号塔</text>
						</view>
						<image @click="repetaer_address(2)" class="img_r" src="../../static/icon/modify_blue.png" mode=""></image>
					</view>
					<view class="bot_btn_list">
						<view class="btn" @click="modify">
							<image src="../../static/icon/time.png" mode=""></image>
							<text>校对时间</text>
						</view>
						<button class="btn" hover-class='none' :loading="loading" :disabled="loading" type="default" @click="restart">
							<image v-if="loading" src="../../static/icon/updata.png" mode=""></image>
							<text>重启中继器</text>
						</button>
						<view class="btn">
							<image src="../../static/icon/more.png" mode=""></image>
							<text>更多设置</text>
						</view>
					</view>
				</view>
				<image class="botsanjiao" src="../../static/icon/botsanjiao.png" mode=""></image>
			</view>
			<text style="display: block;margin-top: 20rpx;color: #FFFFFF;">已连接的探头 58</text>
			<view class="chirden_probe">
				<view class="box_1" v-for="(item, index) in probelist" :Key="index">
					<text>{{ item.device_id }}</text>
					<text>{{ item.device_id_hex }}</text>
					<view class="bot_btn">
						<button type="default" @click="modifynumber(item.id)">改编号</button>
						<button type="default" @click="deleteprobe(item.id)">删除</button>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="!repeater_id_loading">
			<view class="popup_box" v-if="is_1">
				<text>修改中继器编号</text>
				<input type="text" value="" v-model="change_repeater_id" />
				<button type="default" :loading="repeater_id_loading" :disabled="repeater_id_loading" @click="sumbitrepeater_id">提交</button>
			</view>
			<view class="popup_box" v-if="is_3">
				<text>修改中继器IP</text>
				<input type="number" value="" v-model="repeaterIP" />
				<button type="default" @click="modRepeaterIP">提交</button>
			</view>
			<view class="popup_box" v-if="is_4">
				<text>修改4G卡号</text>
				<input type="text" value="" v-model="num4G" />
				<button type="default" @click="card4G">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			is_1:false,
			is_2:false,
			is_3:false,
			is_4:false,
			is_5:false,
			probelist: [],
			repeateinfo: {},
			id: '',
			time: '',
			loading: false,
			timeloading: false,
			repeater_id_loading:false,
			timer: null,
			change_repeater_id: '',
			num4G:'',
			repeaterIP:'',
			deviceId:"",
			serviceId:"",
			characteristicId:""
		};
	},
	onLoad(option) {
		let obj = JSON.parse(option.obj)
		this.deviceId = obj.deviceId
		this.serviceId = obj.serviceId
		this.characteristicId = obj.characteristicId
	},
	onShow() {
		let _this = this;
		this.probechirden();
		_this.$api
			.postapi('/api/repeater/sel_repeater_detail', { id: 1, loginId: uni.getStorageSync('loginId') })
			.then(res => {
				_this.repeateinfo = res.data.data;
				_this.id = _this.repeateinfo.repeater_id;
				_this.timing();
			})
			.catch(Error => {
				uni.showToast({
					title: Error,
					icon: 'none'
				});
			});
	},
	watch: {
		loading() {
			if (this.loading) {
				console.log('00000000');
				this.timer = setInterval(() => {
					this.restart();
				}, 2000);
			} else {
				clearInterval(this.timer);
				this.timer = null;
				console.log('111111111');
			}
		},
		timeloading() {
			if (this.timeloading) {
				console.log('000');
				this.timer = setInterval(() => {
					this.timing();
				}, 2000);
			} else {
				clearInterval(this.timer);
				this.timer = null;
				console.log('111');
			}
		},
		repeater_id_loading(){
			if (this.repeater_id_loading) {
				console.log('000');
				this.timer = setInterval(() => {
					this.sumbitrepeater_id();
				}, 2000);
			} else {
				clearInterval(this.timer);
				this.timer = null;
				console.log('111');
			}
		}
	},
	methods: {
		timing() {
			this.$api
				.postapi('/admin/Hardware/check_repeater_date', { repeater_id: this.id,
				 loginId: uni.getStorageSync('loginId')
				  })
				.then(res => {
					if (res.data) {
						// uni.hideLoading()
						this.timeloading = false;
						this.time = res.data.data.time.slice(0, 10);
					} else {
						this.timeloading = true;
						// uni.showLoading({
						// 	title:"获取中继时间中...",
						// 	mask:true
						// })
					}
				})
				.catch(Error => {
					uni.showToast({
						title: Error,
						icon: 'none'
					});
				});
		},
		modify(ismod) {
			this.$api
				.postapi('/admin/Hardware/upd_repeater_timming', { repeater_id: this.id,
				 loginId: uni.getStorageSync('loginId')
				  })
				.then(res => {
					this.time = res.data.data.time * 1000;
					this.time = new Date(this.time);
					let y = this.time.getFullYear();
					let m = this.time.getMonth() + 1;
					let d = this.time.getDate();
					m = m < 10 ? '0' + m : m;
					d = d < 10 ? '0' + d : d;
					this.time = y + '-' + m + '-' + d;
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				})
				.catch(Error => {
					uni.showToast({
						title: Error,
						icon: 'none'
					});
				});
		},
		restart() {
			this.loading = true;
			this.$api
				.postapi('/admin/Hardware/restart_repeater', { repeater_id: this.id,
				 loginId: uni.getStorageSync('loginId')
				  })
				.then(res => {
					if (res.data) {
						console.log(res.data.code);
						if (res.data.code) {
							this.loading = false;
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					} else {
						this.loading = true;
					}
				})
				.catch(Error => {
					uni.showToast({
						title: Error,
						icon: 'none'
					});
				});
		},
		probechirden() {
			this.$api
				.postapi('/api/Buletoothconfig/get_sensors', { id: 1 })
				.then(res => {
					console.log(996, res);
					this.probelist = res.data.data;
				})
				.catch(Error => {
					uni.showToast({
						title: Error,
						icon: 'none'
					});
				});
		},
		repetaer_address(num) {
			for(let i = 1;i <= 5; i++){
				this['is_'+i] = false
			}
			this['is_'+num] = true
			console.log(this.is_1)
			this.$refs.popup.open();
		},
		sumbitrepeater_id() {
			if(this.change_repeater_id==""){
				uni.showToast({
					title:'请输入中继器编号'
				})
				return false
			}
			this.$api.postapi('/api/buletoothconfig/config_repeter_address', {
				repeater_id: this.repeateinfo.repeater_id,
				loginId: uni.getStorageSync('loginId'),
				change_repeater_id: this.change_repeater_id
			}).then(res => {
				if(res.data){
					this.repeater_id_loading = false
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
				}else{
					this.repeater_id_loading = true
				}
				console.log(res)
			}).catch(Error => {
				uni.showToast({
					title:Error,
					icon:"none"
				})
			})
		},
		card4G(){
			this.$api.postapi('/api/buletoothconfig/config_repeater_4g_phone',{
				repeater_id:this.repeateinfo.repeater_id,
				repeater_phone:this.num4G
			}).then(res => {
				console.log(res)
				uni.showToast({
					title:res.data.msg
				})
				setTimeout(() => {
					uni.redirectTo({
						url:"../Bluetooth/Bluetooth"
					})
				},500)
				
			}).catch(Error => {
				uni.showToast({
					title:Error,
					icon:"none"
				})
			})
		},
		modRepeaterIP(){
			this.notifyBLECharacteristicValueChange(this.characteristicId)
			this.$api.postapi('/api/buletoothconfig/config_repeter_address',{
				repeater_id:_this.id,
				loginId: uni.getStorageSync('loginId'),
				change_repeater_id:this.repeaterIP
			}).then(res => {
				console.log(res)
				uni.showToast({
					title:res.data.msg
				})
			}).catch(Error => {
				uni.showToast({
					title:Error,
					icon:"none"
				})
			})
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
							value: _this.string2buf(this.repeaterIP), 
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
	position: relative;
	top: 160rpx;
	z-index: 1;
	padding: 24rpx;
	.r_box {
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(59, 242, 255, 0.5) 0%, rgba(5, 51, 159, 0.5) 100%);
		box-shadow: 2rpx 3rpx 2rpx rgba(90, 232, 255, 0.4);
		color: #ffffff;
		position: relative;
		.box_t{
			width: 100%;
			height: 59rpx;
			background: linear-gradient(90deg, rgba(2, 31, 75, 0.6) 0%, rgba(9, 55, 101, 0.6) 100%);
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			box-sizing: border-box;
			.box_t_l{
				display: flex;
				align-items: center;
				image{
					width: 40rpx;
					height: 40rpx;
				}
				text{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FFFFFF;
					margin-left: 8rpx;
				}
			}
			.box_t_r{
				text{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					&:nth-child(1){
						opacity: 0.6;
						margin-right: 8rpx;
					}
				}
			}
		}
		.box_c_box{
			padding: 10rpx 20rpx 50rpx 20rpx;
			box-sizing: border-box;
			.box_content_c{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.box_t_c_list,.deep_blue_box{
				margin: 12rpx 0;
				padding: 0 25rpx;
				width: 100%;
				border: 1rpx solid #5AE8FF;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				.text_l,.text_l_d{
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						&:nth-child(1){
							opacity: 0.6;
							margin-right: 20rpx;
						}
					}
				}
				.text_l_d{
					display: flex;
					flex-direction: column;
				}
				.img_r{
					width: 32rpx;
					height: 32rpx;
				}
			}
			.box_t_c_list_h87{
				height: 87rpx;
			}
			.box_t_c_list_h117{
				width: 320rpx;
				height: 117rpx;
			}
			.deep_blue_box{
				margin-top: 14rpx;
				width: 100%;
				height: 78rpx;
				border: none;
				background: linear-gradient(90deg, #021F4B 0%, #093765 100%);
				.text_l,.text_l_d{
					display: flex;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
					}
					image{
						width: 50rpx;
						height: 50rpx;
					}
				}
				.text_l_d{
					display: flex;
					flex-direction: column;
				}
				.img_r{
					width: 32rpx;
					height: 32rpx;
				}
			}
			.bot_btn_list{
				margin-top: 21rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn{
					display: block;
					width: 214rpx;
					height: 69rpx;
					border-radius: 0;
					border: 1rpx solid #5AE8FF;
					background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					color: #FFFFFF;
					image{
						width: 26rpx;
						height: 26rpx;
					}
					text{
						font-size: 24rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						margin-left: 8rpx;
					}
				}
			}
		}
		
		.r_box_list {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			text {
				font-size: 14rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				width: 30%;
				height: 80rpx;
				&:nth-child(3) {
					background: #007aff;
					border-radius: 10rpx;
					justify-content: center;
				}
			}
		}
		.botsanjiao{
			width: 54rpx;
			height: 20rpx;
			position: absolute;
			bottom: -20rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.chirden_probe {
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.box_1 {
			width: 320rpx;
			height: 300rpx;
			background: #4689d9;
			margin: 20rpx 14rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: space-between;
			text {
				margin-right: 20rpx;
				color: #ffffff;
			}
			.bot_btn {
				display: flex;
				justify-content: space-between;
				button {
					width: 160rpx;
					font-size: 30rpx;
				}
			}
		}
	}
}
.popup_box {
	position: relative;
	z-index: 99;
	width: 500rpx;
	height: 400rpx;
	background: #f7f7f7;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	input {
		width: 80%;
		height: 60rpx;
		padding: 0 16rpx;
		margin: 0 auto;
		background: rgba(122, 122, 122, 0.6);
		border-radius: 25rpx;
		color: #ffffff;
	}
}
</style>
