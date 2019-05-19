<template>
    <Tabs value="name1">
        <TabPane label="topo" name="name1">
            <iframe src="http://192.168.189.146:58085/nmsw/jsp/flexview/ytopo.jsp" width="1366px" height="580px"></iframe>
        </TabPane>
        <TabPane label="路由" name="name2">
           <iframe src=" http://192.168.189.146:58085/nmsw/jsp/resview/queryview/redirectQueryAndSetPage.action?urlParames=yes&className=ResRouter" width="1366px" height="580px"></iframe>
           
        </TabPane>
    </Tabs>
</template>
<script>
    export default {
        
    }
</script>


<!-- 样式代码 -->
<style>

</style>