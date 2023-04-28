<script>
import {addIcons} from 'oh-vue-icons'
import {IoChevronBack} from 'oh-vue-icons/icons'

addIcons(IoChevronBack)

export default {
    methods: {
        goBack() {
            history.back()
        }
    }
}
</script>

<template>
    <div :style="{
        'display': 'flex',
        'gap': '5px',
        'border': '1px solid #999',
        'border-radius': '5px',
        'width': 'fit-content',
        'padding': '5px 10px',
        'align-items': 'center',
        'margin-bottom': '3em',
        'cursor': 'pointer'
    }" @click="goBack()">
        <v-icon name="io-chevron-back"/>
        <p>Kembali</p>
    </div>
</template>