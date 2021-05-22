<template>
	<view class="index">
		<headerTab title="个人信息" :implement="true" @func="func"></headerTab>
		<view class="wrap">
			<view class="modify-box">
				<text>修改{{ title }}</text>
				<input type="text" v-model="textes" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				textes: "",
			};
		},
		onLoad(option) {
			this.title = option.type
			this.textes = option.text
		},
		methods:{
			func(){
				if(this.title=="电话"){
					if(!(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/).test(this.textes)){
						uni.showToast({
							title:"请输入正确的手机号",
							icon:"none"
						})
						return false
					}
				}
				this.$api.postapi('/api/user/upd_user',{
					param: this.textes,
					type:this.title=='姓名'?0:1,
					loginId:uni.getStorageSync('loginId')
					}).then(res => {
						if(res.data.code==1){
							uni.showToast({
								title:"修改成功"
							})
							setTimeout(() => {
								uni.switchTab({
									url:"../../user/user"
								})
							},500)
						}else{
							uni.showToast({
								title:"修改失败"
							})
						}
					})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	position: relative;
	top: 168rpx;
	width: 100%;
	padding: 24rpx 34rpx;
	box-sizing: border-box;
	.modify-box{
		width: 100%;
		height: 163rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		padding: 23rpx 24rpx;
		box-sizing: border-box;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 37rpx;
			color: #FFFFFF;
			opacity: 0.6;
		}
		input{
			margin-top: 10rpx;
			width: 100%;
			height: 64rpx;
			background: #073B6E;
			border: 1rpx solid #4492C2;
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			color: #FFFFFF;
		}
	}
}
</style>
