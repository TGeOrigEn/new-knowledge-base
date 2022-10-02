<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

    props: {
        text: {
            type: String
        }
    },
    methods: {
        handlerMenu(event: Event) {
            const target = ((event.target as HTMLElement).parentElement as HTMLElement);

            const menu = target.getElementsByClassName('dropdown-menu')[0] as HTMLElement;
            if (!menu) return;
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
                return;
            }
            menu.style.display = 'block';

        }
    }
})
</script>
        
<template>
    <th>
        <div>
            <slot></slot>
            <button>{{ $props.text }}</button>
            <button @click="handlerMenu" :style="{flex: '1'}" class='dropdown-toggle'>
            </button>
        </div>
    </th>
</template>
        
<style scoped>
th {
    min-width: max-content;
    padding: 0;
}

button {
    padding-bottom: 7px;
    padding-top: 7px;
    font-size: 14px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: bold;
    min-width: fit-content;
    border-radius: 0;
    height: 100%;
    width: 100%;
    border: 0;
}

div {
    display: flex;
    height: 100%;
    width: 100%;
}

.dropdown-toggle::after {
    pointer-events: all;
    border-right: .4em solid transparent;
    border-left: .4em solid transparent;
    border-top: .4em solid;
    vertical-align: .255em;
    display: inline-block;
    border-bottom: 0;
    content: "";
}
</style>