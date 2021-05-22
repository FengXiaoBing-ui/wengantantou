<template>
	<view class="index">
		<headerTab title="选择人员" :sure="true" @func="func"></headerTab>
		<view class="wrap">
			<view class="list" :class="item.user_name==activelist.user_name?'activebackground':''" v-for="(item,index) in list" :key="index" @click="active(item)">
				<text>{{ item.user_name }}</text>
				<image v-if="item.user_name!=activelist.user_name" src="../../../static/icon/2747.png" mode=""></image>
				<image v-if="item.user_name==activelist.user_name" src="../../../static/icon/6979.png" mode=""></image>
				<view></view>
			</view>
			<uni-load-more status="nomore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				activelist: {}
			};
		},
		created() {
			this.peoplelist()
		},
		methods:{
			peoplelist(){
				this.$api.postapi('/api/pubtask/sel_duty_master',{
					loginId: uni.getStorageSync('loginId'),
					limit: 10
				}).then(res => {
					console.log(res)
					this.list = res.data.data
				})
			},
			active(item){
				this.activelist = item
				this.$forceUpdate()
			},
			func(){
				let arr = this.activelist
				this.$store.commit('people',arr)
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	position: relative;
	top: 268rpx;
	box-sizing: border-box;
	z-index: 999;
	.activebackground{
		background: linear-gradient(180deg, rgba(90, 232, 255, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 0px 0px 6rpx rgba(2, 2, 55, 0.28);
	}
	.list{
		display: flex;
		align-items: center;
		padding: 21rpx 5% 24rpx 5%;
		justify-content: space-between;
		margin: 0 auto;
		position: relative;
		image{
			width: 41rpx;
			height: 41rpx;
		}
		text{
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
		view{
			position: absolute;
			bottom: 1rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 90%;
			height: 2rpx;
			background: rgba(90, 232, 255, 0.5);
		}
	}
}
</style>
