<template>
	<view class="index">
		<headerTab title="升级记录详情"></headerTab>
		<view class="wrap">
			<view class="box">
				<view class="title">
					<text>版本{{ upgrade.title }}{{ upgrade.version_number }}</text>
					<text>更新时间：{{ upgrade.update_time }}</text>
				</view>
				<rich-text style="color: #FFFFFF;" :nodes="upgrade.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				upgrade: {}
			};
		},
		onLoad(option) {
			this.$api.postapi('/api/Fuc/sel_updatge_detial',{id:option.id}).then(res => {
				console.log(res)
				this.upgrade = res.data.data
			})
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	padding: 24rpx 34rpx;
	position: relative;
	top: 168rpx;
	box-sizing: border-box;
	z-index: 1;
	.box{
		width: 100%;
		height: 1048rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		padding: 32rpx 24rpx;
		box-sizing: border-box;
		text{
			color: #FFFFFF;
		}
		.title{
			display: flex;
			flex-direction: column;
			align-items: center;
			border-bottom: 1rpx solid rgba(90, 232, 255, 0.5);
			padding-bottom: 30rpx;
			position: relative;
			margin-bottom: 40rpx;
			
			&::before{
				content: '';
				display: inline-block;
				width: 82rpx;
				height: 28rpx;
				background-image: url(../../../static/icon/13965.png);
				background-size: 100% 100%;
				position: absolute;
				bottom: -14rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			text{
				
				&:nth-child(1){
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 46rpx;
					color: #FFFFFF;
				}
				&:nth-child(2){
					font-size: 26rpx;
					color: #FFFFFF;
					opacity: 0.6;
					margin-top: 10rpx;
				}
			}
		}
	}
}
</style>
