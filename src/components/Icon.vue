<template>
  <component :is="iconCom"></component>
</template>
<script setup>
import * as icons from '@ant-design/icons-vue';
const props = defineProps({
  icon: {
    type: String
  }
})

const iconCom = shallowRef(null)

const init = () => {
  iconCom.value = icons[props.icon]
}

watch(
  () => props.icon,
  () => init()
)

onMounted(() => {
  init()
})
</script>
