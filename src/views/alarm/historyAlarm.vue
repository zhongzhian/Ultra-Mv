<template>
   <div class="historyAlarm">
        <iframe  id="show-iframe"  width="103%" height="768px" frameborder=0 name="showHere" scrolling=no :src="weburl"></iframe>
   </div>  
</template>

<script>
import API from "@/api";
export default {
  name: 'hello',
  data () {
      console.log("history",API.nmswPath+'/jsp/alarmview/alertViews/hisAlertViewMain.jsp')
    return {
      weburl:API.nmswPath+'/jsp/alarmview/alertViews/hisAlertViewMain.jsp',
    }
  },
 
 
}

</script>
<style scoped>
.historyAlarm{
    /* border:1px solid red; */
    width:100%;
    height: 100%;
    margin-top:-40px;
    margin-left: -20px;
}

</style>