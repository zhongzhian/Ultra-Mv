<template>
   <div class="topo">
        <iframe  id="show-iframe"  width="99.5%" height="768px" frameborder=0 name="showHere" scrolling=no :src="weburl"></iframe>
   </div>  
</template>

<script>
import API from "@/api";
export default {
  name: 'hello',
  data () {
      console.log("top",API.nmswPath+'/jsp/flexview/ytopo.jsp')
    return {
      weburl:API.nmswPath+'/jsp/flexview/ytopo.jsp',
    }
  },
 
 
}

</script>
<style scoped>
.topo{
    width:100%;
    height: 100%;
   
    margin-left: -5px;
}

</style>