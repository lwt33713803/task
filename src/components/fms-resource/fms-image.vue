<script lang="ts">
    export default { name: "FmsImage" };
</script>

<script setup lang="ts">

    const result:Ref<string> = ref('')

</script>

<template>
      <el-image 
        fit="cover"
        class="rd-1 object-cc"
      >
        <template #error>
          <div class="f-c-c h-full text-[10px] color-gray-400">
            加载失败
          </div>
        </template>
        <template v-for="(item, key, index) in $slots" :key="index" #[key]>
            <slot :name="key"></slot>
        </template>
    </el-image>
</template>

<style lang="scss" scoped>
</style>
