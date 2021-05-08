<template>
	<view class="screen">
		<headerTab title="中继器筛选"></headerTab>
		<view class="screen_wrap">
			<view class="screen-top">
				<text style="font-size: 32rpx;opacity: 0.5;color: #FFFFFF;">设备状态</text>
				<view class="screen-list">
					<view class="screen-cat" :class="indexes==index?'screen-cat-active':''" v-for="(item,index) in screenlist" :key="index" @click="active(index)">
						<text>{{ item.text }}</text>
						<image v-if="indexes==index" src="../../../static/icon/13926.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="screen-mid">
				<text style="font-size: 32rpx;opacity: 0.5;color: #FFFFFF;">选择输电塔</text>
				<view class="serch">
					<view class="serch_left">
						<image src="../../../static/icon/serch.png" mode=""></image>
						<input type="text" value="" placeholder="请输入设备名称或编号搜索..." placeholder-style="color: #D6F2FF;" v-model="keyword" />
					</view>
				</view>
				<view class="Drop-down" @click="transmission">
					<text>{{ meesage }}</text>
					<image src="../../../static/icon/13921.png" mode=""></image>
				</view>
				<view class="Drop-down" @click="Pagoda">
					<text>{{ msg }}</text>
					<image src="../../../static/icon/13921.png" mode=""></image>
				</view>
			</view>
			<view class="twobtn">
				<view class="btnleft">取消</view>
				<view class="btnright">
					<image src="../../../static/icon/serch.png" mode=""></image>
					<text @click="jump">查询结果</text>
				</view>
			</view>
		</view>
		<image class="botimg" src="../../../static/icon/13.png" mode=""></image>
		<uni-popup ref="popup" type="bottom">
			<view class="active-list">
				<image class="active-list-top" src="../../../static/icon/15.png" mode=""></image>
				<view class="title">
					<text></text>
					<text style="height: 109rpx;line-height: 109rpx;">选择输电线路</text>
					<image @click="close" src="../../../static/icon/6708.png" mode=""></image>
				</view>
				<scroll-view  class="scroll" scroll-y="true" >
					<view class="scroll-list" :class="activeto==item.line_name?'active':''" v-for="(item,index) in transmissionlist" :key="index" @click="activelist(item)">
						<text>{{item.line_name}}</text>
						<image v-if="activeto==item.line_name" src="../../../static/icon/6963.png" mode=""></image>
					</view>
				</scroll-view>
				
			</view>
		</uni-popup>
		<uni-popup ref="popuptwo" type="bottom">
			<view class="active-list">
				<image class="active-list-top" src="../../../static/icon/15.png" mode=""></image>
				<view class="title">
					<text></text>
					<text style="height: 109rpx;line-height: 109rpx;">选择塔杆号</text>
					<image @click="Pagodaclose" src="../../../static/icon/6708.png" mode=""></image>
				</view>
				<scroll-view class="scroll" scroll-y="true" >
					<view class="scroll-list" :class="activeto==item.tagan_name?'active':''" v-for="(item,index) in Pagodalist" :key="index" @click="activePagodalist(item)">
						<text>{{item.tagan_name}}</text>
						<image v-if="activeto==item.tagan_name" src="../../../static/icon/6963.png" mode=""></image>
					</view>
				</scroll-view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexes: -1,
				line_id: "",
				tagan_id: "",
				meesage: "选择输电线路",
				msg: "选择塔杆号",
				activeto: "",
				isflag: false,
				transmissionlist: [],
				Pagodalist: [
					"N5",
					"S82",
					"N8/8",
					"S821",
					"S89486",
					"N52",
				],
				keyword: "",
				screenlist: [
					{
						text: "全部",
						icon: ""
					},
					{
						text: "电量低",
						icon: ""
					},
					{
						text: "已离线",
						icon: ""
					},
				]
			};
		},
		created() {
			this.allline()
		},
		methods:{
			allline(){
				this.$api.postapi('/api/repeater/sel_all_line').then(res => {
					this.transmissionlist = res.data.data
				})
			},
			transmission(){
				this.$refs.popup.open()
			},
			active(index){
				this.indexes = index
			},
			activelist(item){
				this.activeto = item.line_name
				this.meesage = item.line_name
				this.line_id = item.id
				this.$api.postapi('/api/repeater/selTaganByLineId',{line_id:item.id}).then(res => {
					this.isflag = true
					this.Pagodalist = res.data.data
					this.activeto = "选择塔杆号"
					this.msg = "选择塔杆号"
				})
				this.$refs.popup.close()
			},
			activePagodalist(item){
					this.activeto = item.tagan_name
					this.msg = item.tagan_name
					this.tagan_id = item.id
					this.$refs.popuptwo.close()
			},
			close(){
				this.$refs.popup.close()
			},
			Pagoda(){
				if(this.isflag){
					this.$refs.popuptwo.open()
				}
			},
			Pagodaclose(){
				this.$refs.popuptwo.close()
			},
			jump(){
				this.$api.postapi('/api/repeater/repeater_screen',{
					state:this.indexes,
					keyword: this.keyword,
					line_id: this.line_id,
					tagan_id: this.tagan_id
				}).then(res => {
					console.log(res)
				})
				// uni.navigateTo({
				// 	url:"../Repeaterlist/Repeaterlist"
				// })
			}
		}
	}
</script>

<style lang="less" scoped>
.screen{
	.screen_wrap{
		margin-top: 148rpx;
		padding: 30rpx 34rpx 0 34rpx;
		box-sizing: border-box;
		background: #033785;
		.screen-top{
			width: 100%;
			.screen-list{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.screen-cat{
					width: 128rpx;
					height: 64rpx;
					margin: 19rpx 8rpx 0 0;
					background: rgba(214, 242, 255, 0.15);
					border: 1rpx solid #5BC8CB;
					opacity: 1;
					border-radius: 80rpx;
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					box-sizing: border-box;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 0.58;
					}
					image{
						width: 17rpx;
						height: 14rpx;
					}
				}
				.screen-cat-active{
					border: none;
					background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
					box-shadow: 0px 0px 6rpx rgba(2, 2, 55, 0.28);
				}
			}
		}
		.screen-mid{
			margin-top: 45rpx;
			.serch {
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.serch_left {
					width: 100%;
					height: 88rpx;
					border: 1rpx solid #4492c2;
					background: linear-gradient(180deg, #0d4b88 0%, #013161 100%);
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					display: flex;
					align-items: center;
					box-sizing: border-box;
					z-index: 999;
					image {
						width: 64rpx;
						height: 64rpx;
						margin: 1rpx;
					}
					input {
						text-align: start;
						padding-left: 5rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #d6f2ff;
						opacity: 0.56;
					}
				}
			}
			.Drop-down{
				margin: 20rpx 0;
				width: 100%;
				height: 88rpx;
				border: 1rpx solid #4492C2;
				background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 34rpx;
				box-sizing: border-box;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
				image{
					width: 17rpx;
					height: 14rpx;
				}
			}
		}
		.twobtn{
			margin-top: 80rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			.btnleft{
				width: 48%;
				height: 88rpx;
				border: 1px solid rgba(90, 232, 255, 0.44);
				background: linear-gradient(180deg, rgba(65, 201, 252, 0.44) 0%, rgba(28, 84, 184, 0.44) 100%);
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
			}
			.btnright{
				width: 48%;
				height: 88rpx;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				box-shadow: 0px 0px 6rpx rgba(2, 2, 55, 0.28);
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
				image{
					width: 44rpx;
					height: 44rpx;
				}
			}
		}
	}
	.botimg{
		width: 100%;
		height: 658rpx;
		position: absolute;
		bottom: 0;
		z-index: -1;
	}
	.active-list{
		width: 100%;
		height: 655rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		.active-list-top{
			position: absolute;
			top: 0;
			width: 100%;
			height: 30rpx;
		}
		.scroll{
			height: 548rpx;
			overflow-y: auto;
			.active{
				border: 1rpx solid #4492C2;
				background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			}
			.scroll-list{
				width: 100%;
				height: 93rpx;
				text-align: center;
				line-height: 93rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				padding: 0 35rpx;
				box-sizing: border-box;
				&::after{
					content: '';
					position: absolute;
					bottom: 0;
					display: inline-block;
					width: 90%;
					margin: 0 auto;
					height: 2rpx;
					background: rgba(90, 232, 255, 0.5);
				}
				image{
					position: absolute;
					right: 0;
					width: 41rpx;
					height: 41rpx;
					transform: translateX(-40rpx);
				}
			}
		}
		.title{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid rgba(90, 232, 255, 0.5);
			text{
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
			}
			image{
				width: 46rpx;
				height: 46rpx;
				transform: translateX(-16rpx);
			}
		}
	}
}
</style>
