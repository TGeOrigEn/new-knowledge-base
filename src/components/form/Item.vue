<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../button/Button.vue';

export default defineComponent({
    props: {
        disabled: Boolean,
        removed: Boolean,
        label: {
            type: String
        }
    },
    components: { Button }
})
</script>
                
<template>
    <div class="field">
        <div style="display: table-cell;">
            <div style="display: flex;">
                <Button v-if="!removed"
                    style="background-color: rgba(255, 169, 169, 0.5);  margin-right: auto; margin-left: auto; height: 32px;"
                    text="Удалить"></Button>
                <Button v-if="removed"
                    style="background-color: rgba(169, 255, 169, 0.5);  margin-right: auto; margin-left: auto; height: 32px;"
                    text="Восстановить"></Button>
            </div>
        </div>
        <div style="display: table-cell;">
            <div style="display: flex;">
                <pre class="label truncate">{{ label }} </pre>
            </div>
        </div>

    </div>
</template>
                
<style scoped>
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.field {
    display: table-row;
}

.label {
    vertical-align: middle;
    width: 600px;
    text-align: start;
    margin-right: auto;
    margin-left: auto;
    white-space: nowrap;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 14px;
}
</style>