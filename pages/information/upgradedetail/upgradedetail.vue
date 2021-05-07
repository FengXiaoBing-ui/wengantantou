<template>
	<view class="index">
		<headerTab title="升级记录详情"></headerTab>
		<view class="wrap">
			<view class="box">
				<view class="title">
					<text>版本V1.0.8主要更新</text>
					<text>更新时间：2021-12-25</text>
				</view>
				<text>重要说明从 2020 年 7 月开始，所有 Windows 更新都将禁用 RemoteFX vGPU 功能，因为它存在安全漏洞。 有关此漏洞的更多信息，请参阅CVE-2020-1036 和 KB4570006。 安装此更新后，尝试启动启用了 RemoteFX vGPU 的虚拟机 (VM) 将失败，并显示如下消息： 如果重新启用 RemoteFX vGPU，将显示类似如下的消息： "无法启动虚拟机，因为 Hyper-v 管理器中禁用了所有支持 RemoteFX 的 Gpu。" "由于服务器的 GPU 资源不足，虚拟机无法启动。" "不再支持 RemoteFX 3D 视频适配器。 如果你仍在使用此适配器，可能会受到安全风险攻击。 了解详细信息（https://go.microsoft.com/fwlink/?linkid=2131976） "</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
