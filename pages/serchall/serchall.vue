<template>
	<view class="index">
		<headerTab title="搜索"></headerTab>
		<view class="wrap">
			<view class="serch-input">
				<view class="serch">
					<image src="../../static/icon/serch.png" mode=""></image>
					<input confirm-type="search" @confirm="searchdata" type="text" value="" v-model="keyword" />
				</view>
				<text class="serch-text" @click="searchdata">搜索</text>
			</view>
			<view class="serch-history">搜索历史</view>
			<view class="serch-history-list">
				<view class="text-list" @click="searchdata(item)" v-for="(item,index) in list" :key="index">{{ item }}</view>
			</view>
			<view class="delete-record" @click="delete_record" v-if="list.length>0"> <image src="../../static/icon/garbage.png" mode=""></image> 清空历史记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				keyword: ""
			};
		},
		onShow() {
			this.keyword = ""
			if(uni.getStorageSync('keyword')){
				this.list = JSON.parse(uni.getStorageSync('keyword'))
				this.list = [...new Set(this.list)]
			}
		},
		created() {
			
		},
		methods:{
			delete_record(){
				uni.removeStorageSync('keyword')
				this.list = []
			},
			searchdata(myitem){
				if(typeof(myitem)=='string'){
					this.keyword = myitem
				}
				if(this.keyword==""){
					
				}else{
					this.list.unshift(this.keyword)
					this.list = [...new Set(this.list)]
					uni.setStorageSync('keyword',JSON.stringify(this.list))
				}
				uni.navigateTo({
					url:"../serchresult/serchresult?keyword="+this.keyword
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	position: relative;
	top: 180rpx;
	padding: 20rpx 34rpx;
	box-sizing: border-box;
	.serch-input{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.serch{
			width: 86%;
			height: 80rpx;
			border: 1rpx solid #4492C2;
			padding: 0 10rpx;
			box-sizing: border-box;
			background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			display: flex;
			align-items: center;
			image{
				width: 70rpx;
				height: 60rpx;
			}
			input{
				width: 100%;
				color: #FFFFFF;
			}
		}
		.serch-text{
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #59E6FE;
		}
	}
	.serch-history{
		margin-top: 24rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 46rpx;
		color: #FFFFFF;
		opacity: 0.53;
	}
	.delete-record{
		margin-top: 24rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 46rpx;
		color: #FFFFFF;
		opacity: 0.53;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		&:hover{
			opacity: 1;
		}
	}
	.serch-history-list{
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.text-list{
			padding: 0 30rpx;
			height: 57rpx;
			background: rgba(214, 242, 255, 0.15);
			border: 1px solid #5BC8CB;
			opacity: 1;
			border-radius: 80rpx;
			line-height: 57rpx;
			margin: 12rpx 8rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
}
</style>
