<template>
  <div id="mHome">
    <el-row style="text-align: center;margin-bottom: 20px"><h1></h1>欢迎来到该系统</el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <p>功能一</p>
          <p>①可以实时查看接口的状态的基本信息。</p>
          <p>②可以修改接口的信息，例如接口的状态、接口的ipv4地址信息和接口描述等</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <p>功能2</p>
          <p>①配置模块信息保存于数据库中，配置模板包含模板名称、配置参数、模板详细介绍等信息。</p>
          <p>②网络管理员可对模板进行增删改查操作。</p>
          <p>③同时可一键批量下发配置操作。</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <p>功能3</p>
          <p>
            系统每一分钟对设备接口进行检测，对每个接口接受到的in-pkts值划分为三个级别，当接口in-pkts/min到达5G/s-10G/s阈值的时候，系统向网络管理员发出危险警报，反馈当前流量传输速率和预警信号。当接口in-pkts/min到达10G/s-30G/s阈值的时候，系统自动下发ACL配置防范DDOS攻击即（使用访问控制列表（ACL）过滤RFC
            1918中列出的所有地址 ），后向管理员反馈系统操作。当接口in-pkts/min到达30G/s以上阈值的时候，为避免路由器cpu温度过高，造成硬件损坏，系统自动将受到DDOS攻击的端口down掉。</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <p>功能3</p>
          <p>
            系统每一分钟对设备接口进行检测，对每个接口接受到的in-pkts值划分为三个级别，当接口in-pkts/min到达5G/s-10G/s阈值的时候，系统向网络管理员发出危险警报，反馈当前流量传输速率和预警信号。当接口in-pkts/min到达10G/s-30G/s阈值的时候，系统自动下发ACL配置防范DDOS攻击即（使用访问控制列表（ACL）过滤RFC
            1918中列出的所有地址 ），后向管理员反馈系统操作。当接口in-pkts/min到达30G/s以上阈值的时候，为避免路由器cpu温度过高，造成硬件损坏，系统自动将受到DDOS攻击的端口down掉。</p>
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
  }
</style>
