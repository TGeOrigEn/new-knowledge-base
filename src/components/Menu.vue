<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>
            
<template>
    <div style="display: none;" class="dropdown-menu">
    </div>
</template>
            
<style scoped>
.dropdown-menu {
    transform: translateY(31px);
    position: absolute;
    background-color: #ff0000;
    min-width: 160px;
    min-height: 100px;
    overflow: auto;
    z-index: 1;
    right: 0;
    top: 0;
}
</style>