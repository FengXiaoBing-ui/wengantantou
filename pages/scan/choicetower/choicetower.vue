<template>
	<view class="index">
		<view class="headtab">
			<view style="height: 40rpx;"></view>
			<view class="headertitle">
				<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
				<text>输电塔管理</text>
			</view>
			<view class="serch">
				<image src="../../../static/icon/serch.png" mode=""></image>
				<input type="text" value="" confirm-type="search" @confirm="serchdata" v-model="keyword" placeholder="请输入线路名称和塔杆名称搜索..." placeholder-class="plac" />
			</view>
		</view>
		<view class="wrap">
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="list-top">
					<text>{{ item.line_name }}</text>
					<view class="line"></view>
					<image v-if="item.isshow" @click="dropdown(item.isshow,index)" src="../../../static/icon/open.png" mode=""></image>
					<image v-else @click="dropdown(item.isshow,index,item.line_name)" src="../../../static/icon/openbot.png" mode=""></image>
				</view>
				<view class="listcontent" v-for="(itemes,index) in item.tagan" :key="index" v-if="item.isshow" @click="jump(index,itemes)">
					<view class="titletop">
						<image src="../../../static/icon/6707.png" mode=""></image>
						<text>{{ itemes.tagan_name }}</text>
						<image v-if="indexes==index" class="activeimg" src="../../../static/icon/choice.png" mode=""></image>
					</view>
					
					<view class="bordbot"></view>
				</view>
				
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexes: -1,
				active: "",
				list: [],
				line_name: "",
				limit: 20,
				keyword: "",
				more: "more"
			};
		},
		onShow() {
			this.pagodadata()
		},
		onReachBottom() {
			this.more = "loading"
			this.limit += 10
			this.pagodadata()
		},
		methods:{
			serchdata(){
				this.limit = 20
				this.pagodadata()
			},
			pagodadata(){
				this.$api.postapi('/api/repeater/sel_repeater_install_position',{limit:this.limit,keyword:this.keyword}).then(res => {
					console.log(res)
					if(this.limit>=res.data.count){
						this.more = 'nomore'
					}
					this.list = res.data.data
					this.list.forEach( e => {
						e.isshow = false
					})
				})
			},
			backpage(){
				uni.navigateBack({
					delta:1
				})
			},
			jump(index,itemes){
				this.line_name = this.line_name+'-'+itemes.tagan_name
				let gps = {
					id:itemes.id,
					line_id:itemes.line_id,
					line_name: this.line_name,
					type: 0
				}
				this.$store.commit('activerepeater',gps)
				this.indexes = index
				uni.navigateBack({
					delta:1
				})
			},
			dropdown(isshow,index,line_name){
				if(this.list[index].isshow == false){
					this.list[index].isshow = true
					this.line_name = line_name
				}else{
					this.list[index].isshow = false
				}
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="less" scoped>
.headtab{
	position: fixed;
	top: 0;
	width: 100%;
	height: 225rpx;
	background-image: url(../../../static/icon/6972.png);
	background-size: 100% 100%;
	z-index: 9;
	.serch{
		width: 90%;
		height: 72rpx;
		border: 1rpx solid #4492C2;
		background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
		box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
		margin: 0 auto;
		margin-top: 28rpx;
		display: flex;
		align-items: center;
		image{
			width: 64rpx;
			height: 64rpx;
		}
		input,.plac{
			width: 100%;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #D6F2FF;
			opacity: 0.56;
		}
	}
	.headertitle{
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 54rpx;
			height: 54rpx;
			margin-left: 16rpx;
		}
		text{
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 52rpx;
			color: #FFFFFF;
		}
	}
}
.wrap{
	position: relative;
	top: 225rpx;
	width: 100%;
	padding: 24rpx 34rpx;
	box-sizing: border-box;
	z-index: 1;
	.list{
		.list-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width: 77rpx;
				height: 77rpx;
			}
			text{
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 52rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
				position: relative;
				&::before{
					content: '';
					display: inline-block;
					width: 6rpx;
					height: 34rpx;
					background: linear-gradient(180deg, #D6F2FF 0%, #5AE8FF 100%);
					position: absolute;
					top: 50%;
					left: -20rpx;
					transform: translateY(-50%);
				}
			}
			.line{
				max-width: 100%;
				min-width: 30%;
				height: 0px;
				border: 1rpx dotted #9EA5AE;
				opacity: 1;
			}
		}
		.listcontent{
			width: 100%;
			margin-top: 18rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.7);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.7);
			position: relative;
			.content-mid{
				width: 100%;
				margin-top: 10rpx;
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				view{
					width: 31%;
					height: 76rpx;
					border: 1rpx solid rgba(90, 232, 255, 0.54);
					background: linear-gradient(180deg, rgba(90, 232, 255, 0.54) 0%, rgba(0, 46, 128, 0.54) 100%);
					text-align: center;
					line-height: 76rpx;
					color: #FFFFFF;
				}
			}
			.titletop{
				width: 100%;
				height: 61rpx;
				border: 2px solid rgba(90, 232, 255, 0.1);
				background: linear-gradient(180deg, rgba(65, 201, 252, 0.1) 0%,rgba(28, 84, 184, 0.1) 100%);
				box-shadow: 2px 3px 8px rgba(90, 232, 255, 0.1);
				display: flex;
				align-items: center;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-left: 17rpx;
				}
				.activeimg{
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 41rpx;
					height: 41rpx;
				}
				text{
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 46rpx;
					color: #FFFFFF;
				}
			}
			.bordbot{
				position: absolute;
				bottom: -2rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 114rpx;
				height: 4rpx;
				background: #54D6FF;
				box-shadow: 0px 0px 8rpx #9EF2FF;
				opacity: 1;
			}
		}
	}
}
</style>
