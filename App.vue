<script>
export default {
	onLaunch: function() {
		// console.log('App Launch');
		// uni.subscribePush({
		// 	provider: "unipush",
		//           success: function(res) {
		//               console.log("success:" + JSON.stringify(res));
		//           },
		// 	fail:function(err){
		// 		console.log(err)
		// 	}
		// })
		const clientInfo = plus.push.getClientInfo();
		console.log(12, clientInfo);
		this.$api.postapi('/api/admin/upd_user_cid', { cid: clientInfo.clientid, loginId: uni.getStorageSync('loginId') }).then(res => {
			
		});
		plus.push.setAutoNotification(true);
		const _self = this;
		var sensor_id = '';
		var type = '';
		//监听接收透传消息事件
		plus.push.addEventListener(
			'receive',
			function(message) {
				console.log(111, message);
				let options = { cover: false, sound: 'system', title: message.title};
				sensor_id = message.payload.sensor_id;
				type = message.payload.type;
				let obj = {
					sensor_id:id,
					type:type
				}
				plus.push.createMessage(message.content,obj, options);
				//     plus.nativeUI.toast('receive:'+JSON.stringify(message));
				// //处理透传消息的业务逻辑代码
				// plus.nativeUI.toast('push receive');
				// _self._handlePush(message);
			},
			false
		);
		//监听系统通知栏消息点击事件
		plus.push.addEventListener(
			'click',
			function(message) {
				//处理点击消息的业务逻辑代码
				console.log(222, message);
				if (message.payload.type == 0) {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/Dangerin/Confirmed/Confirmed?id=' + message.payload.sensor_id + '&index=0'
						});
					},500)
				}
				if (message.payload.type == 1) {
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/Dangerin/Confirmed/Confirmed?id=' + message.payload.sensor_id + '&index=1'
						});
					},500)
				}
			},
			false
		);
	},
	onShow: function() {
		uni.hideTabBar();
	},
	onHide: function() {}
};
</script>

<style lang="less">
page {
	background: #033785;
}
uni-rich-text {
	height: auto;
	text {
		color: rgb(255, 255, 255) !important;
	}
	span {
		color: rgb(255, 255, 255) !important;
	}
}
body,
html {
	width: 100%;
	height: 100%;
	background: #033785;
}
.index {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: 60rpx;
	background: #033785;
	&::after {
		content: '';
		display: inline-block;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 660rpx;
		background-image: url(./static/icon/13.png);
		background-size: 100% 100%;
	}
}
.uni-load-more {
	z-index: 999999;
}
/*每个页面公共css */
::-webkit-scrollbar {
	width: 16upx !important;
	height: 16upx !important;
	background-color: rgba(7, 62, 117, 1);
}
::-webkit-scrollbar-track {
	// -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: rgba(7, 62, 117, 1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
}
uni-switch .uni-switch-input:before {
	background-color: #275e98;
}
.uni-load-more {
	position: relative;
	z-index: 999;
}
.uni-picker-view-mask {
	top: 0;
	height: 100%;
	margin: 0 auto;
	background: linear-gradient(360deg, #0d4b88 0%, rgba(1, 49, 97, 0) 100%);
	box-shadow: 0px -6px 12px rgba(44, 28, 28, 0.08);
	background-position: top, bottom;
	background-size: 100% 102rpx;
	background-repeat: no-repeat;
}
.uni-picker-view-wrapper {
	background: linear-gradient(360deg, #0d4b88 0%, rgba(1, 49, 97, 0) 100%);
	box-shadow: 0px -6px 12px rgba(44, 28, 28, 0.08);
}

.uni-popup {
}
.picker-view-two {
	uni-picker-view-column {
		.uni-picker-view-indicator {
			border-top: 2rpx solid rgba(90, 232, 255, 0.5);
			border-bottom: 2rpx solid rgba(90, 232, 255, 0.5);
			&::before {
				border: none;
				background: none;
			}
			&::after {
				border: none;
				background: none;
			}
		}
		&:nth-child(3),
		&:nth-child(4) {
			.uni-picker-view-indicator {
				position: relative;
				&::before {
					content: '';
					border: none;
					background: none;
				}
				&::after {
					content: ':';
					height: auto;
					border: none;
					background: none;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
}
</style>
