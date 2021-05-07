<template>
	<view class="index">
		<headerTab title="个人信息"></headerTab>
		<view class="wrap">
			<view class="menu">
				<view class="list" v-for="(item,index) in list" :key="index" >
					<text class="lefttext">{{ item.title }}</text>
					<view class="list-right" @click="modify(item.title,item.text)">
						<text>{{ item.text }}</text>
						<image v-if="item.states" class="minright" src="../../../static/icon/minright.png" mode=""></image>
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
				list: [
					{
						title: "账号名",
						text: "zhangsan",
						states: false
					},
					{
						title: "姓名",
						text: "张琴",
						states: true
					},
					{
						title: "电话",
						text: "18685447888",
						states: true
					},
					{
						title: "职务",
						text: "运维班长",
						states: false
					},
					{
						title: "负责线路",
						text: "110V丹诗文线",
						states: false
					}
					
				]
			};
		},
		methods:{
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
