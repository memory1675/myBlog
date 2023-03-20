import { defineStore } from 'pinia'
export const componentStore = defineStore('component', {
    state() {
        return {
            clickStyle: [
                {
                    name: 'Fireworks',
                    Module: import('@/utils/clickStyle/Fireworks').then(res => res.default),
                    active: false
                },
                {
                    name: 'Text',
                    Module: import('@/utils/clickStyle/Text').then(res => res.default),
                    active: false
                }
            ],
            menus: [
                {
                    name: 'Normal Menu',
                    position: {
                        p1: ['-55px', '-55px'],
                        p2: ['0px', '-75px'],
                        p3: ['55px', '-55px'],
                        p4: ['-55px', '55px'],
                        p5: ['0px', '75px'],
                        p6: ['55px', '55px'],
                    },
                    component: import('@/components/home/Menu.vue').then(res => res.default),
                    active: false
                },
                {
                    name: 'Left Menu',
                    position: {
                        p1: ['-20px', '-75px'],
                        p2: ['-45px', '-50px'],
                        p3: ['-60px', '-20px'],
                        p4: ['-60px', '13px'],
                        p5: ['-45px', '50px'],
                        p6: ['-20px', '75px'],
                    },
                    size: 'small',
                    component: import('@/components/home/Menu.vue').then(res => res.default),
                    active: false
                },
                {
                    name: 'Transverse Menu',
                    component: import('@/components/someComponent/TransverseMenu.vue').then(res => res.default),
                    active: false
                }
            ]
        }
    },
    actions: {

    },
    getters: {

    }
})