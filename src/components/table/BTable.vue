<template>
  <div>
    <Table
      :height="tableHeight"
      stripe
      :data="data"
      :columns="columns"
      :row-class-name="useHand ? rowClassName : empty"
      @on-row-click="onRowClick"
      :highlight-row="highlightRow"
      :size="size"
      @on-row-dblclick="onRowDbClick"
      @on-sort-change="onSortChange"
    />
    <div class="hyz-page">
      <Page
        :total="pageData.total"
        :size="pageSize"
        :current="pageData.current"
        :page-size="pageData.pageSize"
        show-elevator
        show-total
        placement="top"
        @on-change="currentChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "data",
    "columns",
    "pageData",
    "highlightRow",
    "useHand",
    "size",
    "pageSize",
    "height"
  ],
  computed: {
    tableHeight() {
      if (this.height) return this.height;

      if (this.data.length >= 10) {
        return window.innerHeight < 750 ? 450 : 521;
      } else {
        return "";
      }
    }
  },
  methods: {
    currentChange(v) {
      this.pageData.current = v;
      this.$emit("page-data-change");
    },
    pageSizeChange(v) {
      this.pageData.pageSize = v;
      this.$emit("page-data-change");
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    onRowDbClick(v) {
      this.$emit("on-row-dblclick", v);
    },
    onRowClick(v) {
      this.$emit("on-row-click", v);
    },
    rowClassName() {
      return "use-hand";
    },
    empty() {
      return "";
    }
  }
};
</script>
<style lang="less">
.hyz-page {
  margin: 10px 20px;
  display: flex;
  justify-content: flex-end;
  color: #50b5ec;
}
.hyz-page .ivu-select {
  position: relative;
}
.ivu-table .use-hand td {
  cursor: pointer;
}
.ivu-table-header {
  background-color: rgba(33, 41, 72, 0.5);
  color: #50b5ec;
}
.ivu-table-body{
  color: #ccc;
}
.ivu-table {
  background-color: rgba(33, 41, 72, 0.5);
}
.ivu-page.mini .ivu-page-total {
  position: absolute;
  left: 20px;
}
.ivu-page.mini .ivu-page-item {
  margin: 0 3px;
  background-color: transparent;
  border: 1px solid #2a6893;
}
.ivu-page.mini .ivu-page-prev,
.ivu-page.mini .ivu-page-next {
  background-color: transparent;
  margin: 0 5px;
}
.ivu-icon-ios-arrow-left:before {
  // content: "\F33F";
  color: #03a9f4;
  font-size: 20px;
  vertical-align: middle;
}
.ivu-icon-ios-arrow-right:before {
  // content: "\F341";
  color: #03a9f4;
  font-size: 20px;
  vertical-align: middle;
}
.ivu-page-item-active {
  background-color: #03a9f4 !important;
  border: 1px solid #03a9f4 !important;
}
.ivu-page.mini .ivu-page-options-elevator input {
  background-color: #161941;
  color: #50b5ec;
  border-radius: 2px;
  border: 0;
}
</style>
