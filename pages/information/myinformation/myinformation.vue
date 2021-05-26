<template>
	<view class="index">
		<headerTab title="个人信息"></headerTab>
		<view class="wrap">
			<view class="menu">
				<view class="list">
					<text class="lefttext">账号名</text>
					<view class="list-right">
						<text>{{ user.admin_name }}</text>
					</view>
				</view>
				<view class="list">
					<text class="lefttext">姓名</text>
					<view class="list-right" @click="modify('姓名',user.user_name)">
						<text>{{ user.user_name }}</text>
						<image class="minright" src="../../../static/icon/minright.png" mode=""></image>
					</view>
				</view>
				<view class="list">
					<text class="lefttext">电话</text>
					<view class="list-right" @click="modify('电话',user.user_phone)">
						<text>{{ user.user_phone }}</text>
						<image class="minright" src="../../../static/icon/minright.png" mode=""></image>
					</view>
				</view>
				<view class="list">
					<text class="lefttext">职务</text>
					<view class="list-right">
						<text>{{ user.role_name }}</text>
					</view>
				</view>
				<view class="list">
					<text class="lefttext">负责线路</text>
					<view class="list-right">
						<text>{{ user.line }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
			};
		},
		created() {
			
		},
		onShow() {
			this.userinfo()
		},
		methods:{
			userinfo(){
				this.$api.postapi('/api/user/sel_user',{loginId:uni.getStorageSync('loginId')}).then(res => {
					this.user = res.data.data
				})
			},
			modify(title,text){
				uni.navigateTo({
					url:`../modify/modify?type=${title}&text=${text}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	padding: 41rpx 34rpx 0 34rpx;
	box-sizing: border-box;
	position: relative;
	top: 128rpx;
	z-index: 9;
	.menu{
		margin-top: 24rpx;
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8px rgba(90, 232, 255, 0.7);
		padding-left: 24rpx;
		box-sizing: border-box;
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 0;
			padding-right: 31rpx;
			border-bottom: 1rpx solid rgba(90, 232, 255, 0.5);
			&:last-child{
				border: none;
			}
			.lefttext{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
				opacity: 0.6;
			}
			
			.list-right{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.minright{
					width: 14rpx;
					height: 17rpx;
				}
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #FFFFFF;
					margin-right: 16rpx;
				}
			}
		}
	}
}
</style>
