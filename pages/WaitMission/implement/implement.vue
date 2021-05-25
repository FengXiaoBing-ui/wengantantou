<template>
	<view class="index">
		<headerTab title="执行任务" :implement="true" @func="func"></headerTab>
		<view class="wrap">
			<view class="basic" v-if="implementdata.device!=undefined&&implementdata.alarm!=undefined">
				<text class="title">任务信息</text>
				<view class="list">
					<view class="list-content">
						<text>任务编号</text>
						<text>{{ implementdata.task_number }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>任务类型</text>
						<text>消警</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>设备名称</text>
						<text v-if="implementdata.device.repeater_name">{{ implementdata.device.repeater_name }}</text>
						<text v-if="implementdata.device.device_name">{{ implementdata.device.device_name }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>设备编号</text>
						<text v-if="implementdata.device.repeater_id">{{ implementdata.device.repeater_id }}</text>
						<text v-if="implementdata.device.device_id">{{ implementdata.device.device_id }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>塔杆信息</text>
						<text>{{ implementdata.device.tagan }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content" v-if="implementdata.type==0">
						<text>设备位置</text>
						<text>{{ implementdata.device.device_position }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>告警类型</text>
						<text>{{ implementdata.alarm.title }}</text>
						<view class="botborder"></view>
					</view>
					<view class="list-content">
						<text>告警详情</text>
						<text>{{ implementdata.alarm.remark }}</text>
						<view class="botborder"></view>
					</view>
				</view>
			</view>
			<view class="basic">
				<text class="title">填写处理结果</text>
				<view class="list">
					<view class="list-content">
						<text>处理照片</text>
						<view class="imglist">
							<view class="imglist-box" v-for="(item,index) in imglist" :key="item" >
								<image class="addimg" :src="item" mode="aspectFill"></image>
								<image @click="close(index)" class="closeimg" src="../../../static/icon/6947.png" mode=""></image>
							</view>
							
							<view class="add" @click="addimg">
								<image src="../../../static/icon/add12.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="list-content">
						<text>处理说明</text>
						<textarea value="" placeholder="输入处理说明文字..." v-model="content" />
					</view>
					<view class="list-content">
						<text>处理情况</text>
						<view class="active">
							<text>已处理</text>
							<image src="../../../static/icon/13921.png" mode=""></image>
						</view>
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
				id:"",
				implementdata: {},
				imglist: [],
				content: "",
			};
		},
		created() {
			this.implement()
		},
		onLoad(option) {
			this.id = option.id
		},
		methods:{
			implement(){
				this.$api.postapi('/api/pubtask/sel_task_detail',{id:this.id}).then(res => {
					console.log(res)
					this.implementdata = res.data.data
				})
			},
			func(){
				let arr = this.imglist.join(';')
				console.log(arr)
				this.$api.postapi('/api/pubtask/carry_task',{
					deal_remark: this.content,
					id: this.id,
					deal_imgs: arr
				}).then(res => {
					console.log(res)
					if(res.data.code==1){
						uni.showToast({
							title:"提交成功"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						},500)
					}
				})
			},
			close(index){
				this.imglist.splice(index, 1)
			},
			addimg(){
				uni.chooseImage({
					count:9,
					sourceType:['album'],
					success: (res) =>  {
						let arr = res.tempFilePaths
						for(let i = 0; i < arr.length; i ++){
							uni.uploadFile({
								url:"http://wgtt.welamp.cn/api/pubtask/uploads_task_imgs",
								filePath:arr[i],
								name:'file',
								success: res => {
									let imgs = JSON.parse(res.data)
									this.imglist.push(imgs.data1)
								},
								fail:(err => {
									console.log(22,err)
								})
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	position: relative;
	top: 158rpx;
	z-index: 1;
	padding: 0 34rpx;
	box-sizing: border-box;
	.basic{
		
		margin-top: 34rpx;
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
		padding: 14rpx 34rpx 32rpx 34rpx;
		box-sizing: border-box;
		.title{
			display: flex;
			align-items: center;
			font-size: 38rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 55rpx;
			color: #FFFFFF;
			&::before{
				content: '';
				display: inline-block;
				width: 7rpx;
				height: 34rpx;
				margin-right: 10rpx;
				border: 1rpx solid rgba(0, 0, 0, 0);
				background: linear-gradient(180deg, #D6F2FF 0%, #5AE8FF 100%);
			}
		}
		.list{
			box-sizing: border-box;
			.list-content{
				display: flex;
				flex-wrap: wrap;
				position: relative;
				padding: 20rpx 0;
				.active{
					margin-top: 26rpx;
					width: 100%;
					height: 64rpx;
					border: 1rpx solid #4492C2;
					background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 24rpx;
					box-sizing: border-box;
					image{
						width: 13rpx;
						height: 13rpx;
					}
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
					}
				}
				textarea{
					padding: 12rpx 24rpx;
					box-sizing: border-box;
					width: 100%;
					height: 208rpx;
					background: #073B6E;
					border: 1rpx solid #4492C2;
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: rgba(255,255,255,0.7);
				}
				.imglist{
					width: 100%;
					height: auto;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.add{
						margin-top: 16rpx;
						width: 140rpx;
						height: 140rpx;
						border: 1rpx solid #5AE8FF;
						background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
						box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: center;
						image{
							margin: 0;
							width: 59rpx;
							height: 59rpx;
						}
					}
					.imglist-box{
						position: relative;
						width: 140rpx;
						height: 140rpx;
						margin-right: 10rpx;
						margin-top: 16rpx;
						.addimg{
							width: 140rpx;
							height: 140rpx;
							overflow: visible;
							&:nth-child(4n){
								margin-right: 0;
							}
						}
						.closeimg{
							width: 31rpx;
							height: 31rpx;
							position: absolute;
							right: -10rpx;
							top: -10rpx;
						}
					}
				}
				&:nth-child(1){
					margin-top: 4rpx;
				}
				text{
					&:nth-child(1){
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
						opacity: 0.7;
						margin-right: 24rpx;
					}
					&:nth-child(2){
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 44rpx;
						color: #FFFFFF;
					}
				}
				.botborder{
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 2rpx;
					background: #5AE8FF;
					opacity: 0.5;
				}
				&:last-of-type{
					view{
						border: none;
					}
				}
			}
		}
	}
}
</style>
