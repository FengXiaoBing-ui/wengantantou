<template>
	<view class="index">
		<headerTab title="中继器连接"></headerTab>
		<view class="wrap">
			<view class="r_box">
				<view class="r_box_list">
					<text>中继时间</text>
					<text>{{ time }}</text>
					<text @click="modify()">修改</text>
				</view>
				<view class="r_box_list">
					<text>中继编号</text>
					<text>{{ repeateinfo.repeater_id }}</text>
					<text @click="repetaer_address(1)">修改</text>
				</view>
				<view class="r_box_list">
					<text>中继位置</text>
					<text>{{ repeateinfo.tower_position }}</text>
					<text @click="repetaer_address(2)">修改</text>
				</view>
				<view class="r_box_list">
					<text>中继IP</text>
					<text>{{ repeateinfo.ip }}</text>
					<text @click="repetaer_address(3)">修改</text>
				</view>
				<view class="r_box_list">
					<text>4G卡号</text>
					<text>{{ repeateinfo.repeater_phone }}</text>
					<text @click="repetaer_address(4)">修改</text>
				</view>
			</view>
			<view class="seting"><button :loading="loading" :disabled="loading" type="default" @click="restart">重启中继器</button></view>
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
			num4G:''
		};
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
		}
	}
};
</script>

<style lang="less">
.wrap {
	position: relative;
	top: 160rpx;
	z-index: 1;
	padding: 24rpx;
	.r_box {
		width: 100%;
		height: 500rpx;
		border: 1rpx solid #1890ff;
		box-shadow: 2rpx 2rpx 10rpx #a0deff;
		background: rgba(122, 175, 211, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		color: #ffffff;
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
	}
	.chirden_probe {
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
