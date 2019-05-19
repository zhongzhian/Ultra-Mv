<template>
   <div class="unicomPm">
       <div class="checkbutton">
            <RadioGroup v-model="button6" type="button" size="small" @on-change="handChage($event)">
                <Radio label="设备视图"></Radio>
                <Radio label="工程视图"></Radio>
                <Radio label="模型视图"></Radio>
            </RadioGroup>
        </div>
        <div class="showiframe">
             <iframe  id="show-iframe"  width="100%" height="768px" frameborder=0 name="showHere" scrolling=no :src="weburl"></iframe>
        </div>
    


   </div>  
</template>

<script>
import API from "@/api";
export default {
  name: 'hello',
  data () {
      console.log("设备视图",API.nmswPath+'/jsp/resview/baseview/resDeviceViewMain.jsp')
    return {
      weburl:API.nmswPath+'/jsp/resview/baseview/resDeviceViewMain.jsp',
       button6: '设备视图',
    }
  },
  
 methods:{
     handChage:function(e){
         console.log("$$$$$$$$$$$$$$$",e)
         if(e==='设备视图'){
              console.log("设备视图")
             this.weburl=API.nmswPath+'/jsp/resview/baseview/resDeviceViewMain.jsp'
         }else if(e==='工程视图'){
               console.log("工程视图")
             this.weburl=API.nmswPath+'/jsp/resview/projectview/project_index.jsp'
         }else if(e==='模型视图'){
               console.log("模型视图")
             this.weburl=API.nmswPath+'/jsp/resview/queryview/resModelViewMain.jsp'
         }
     }
 }
 
}

</script>
<style scoped>
.unicomPm{
    /* border:1px solid red; */
   width:100%;
   height: 100%;

  
  
}

.checkbutton{
    
    border-bottom:1px solid #03A9F4;
    width: 103%;
        margin-top: -40px;
    margin-left: -20px;
}
.showiframe{
    margin-top: 2px;
    margin-left: -20px;
    width: 103%;
}
</style>