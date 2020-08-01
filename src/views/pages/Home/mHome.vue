<template>
  <div id="mHome">
    <el-row style="text-align: center;margin-bottom: 20px"><h1 style="color: #0097d3">欢迎来到该系统</h1></el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card @click.native="$router.push({name:'interfaceStatus'})">
          <h2>功能一</h2>
          <p>①可以实时查看接口的状态的基本信息。</p>
          <p>②可以修改接口的信息，例如接口的状态、接口的ipv4地址信息和接口描述等</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card @click.native="$router.push({name:'configuration'})">
          <h2>功能二</h2>
          <p>①配置模块信息保存于数据库中，配置模板包含模板名称、配置参数、模板详细介绍等信息。</p>
          <p>②网络管理员可对模板进行增删改查操作。</p>
          <p>③同时可一键批量下发配置操作。</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card @click.native="$router.push({name:'ddos'})">
          <h2>功能三</h2>
          <p>
            系统每一分钟对设备接口进行检测，对每个接口接受到的in-pkts值划分为三个级别，当接口in-pkts/min到达5G/s-10G/s阈值的时候，系统向网络管理员发出危险警报，反馈当前流量传输速率和预警信号。当接口in-pkts/min到达10G/s-30G/s阈值的时候，系统自动下发ACL配置防范DDOS攻击即（使用访问控制列表（ACL）过滤RFC
            1918中列出的所有地址 ），后向管理员反馈系统操作。当接口in-pkts/min到达30G/s以上阈值的时候，为避免路由器cpu温度过高，造成硬件损坏，系统自动将受到DDOS攻击的端口down掉。</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card @click.native="$router.push({name:'cpu'})">
          <h2>功能四</h2>
          <p>
            由于路由器遭受一些因素造成处理端口上的输入数据包时耗尽资源的情况，使用实时统计表的形式展示进程运行所调用各项process的次数，占用cpu的各项百分比数据，便于实时观察，预防cpu负载过高而导致无法执行正常指令。</p>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: "mHome"
  }
</script>

<style scoped>
  .el-card {
    height: 70vh;
    border-radius: 24px;
    background: linear-gradient(145deg, #ffffff, #d8e0e6);
    box-shadow:  15px 15px 30px #909599,
    -15px -15px 30px #ffffff;
  }

  .el-col:nth-child(2n-1) >>> .el-card:nth-child(2n-1) {

  }

  .el-card >>> .el-card__body {
    padding: 10%;
  }

  .el-card:hover {
    transition: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    transform: translateY(-10px);
    box-shadow: 0 2px 12px 0 rgba(4, 142, 246, 0.5);
  }

  .el-col >>> h2 {
    text-align: center;
    color: #0097d3;
    margin-bottom: 20px;
  }
</style>
