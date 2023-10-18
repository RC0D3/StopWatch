<template>
    <div class="h-screen overflow-hidden">
        <header class="bg-red-600">
            <h1 class="text-2xl text-center text-white font-bold p-1">StopWatch</h1>
        </header>
        <Alert :show="showError">Timer cannot be zero.</Alert>
        <div class="flex flex-col items-center justify-center h-full -mt-10">
            <div class="text-3xl font-bold text-white mb-3" :class="{ 'text-5xl': startedTimer }">
                <CountDown :hours="showHours" :minutes="showMinutes" :seconds="showSeconds"></CountDown>
            </div>
            <div v-if="!startedTimer" class="inline-flex rounded-md shadow-sm" role="group">
                <button @click="changeTime('h')" class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-l-full group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-l-full group-hover:bg-opacity-0 font-bold dark:font-normal">
                        {{ positiveClick ? '+' : '-' }} {{ amountByClick }}
                    </span>
                </button>
                <button @click="changeTime('m')" class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-x-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-lg group-hover:bg-opacity-0 font-bold dark:font-normal">
                        {{ positiveClick ? '+' : '-' }} {{ amountByClick }}
                    </span>
                </button>
                <button @click="changeTime('s')" class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-r-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-r-full group-hover:bg-opacity-0 font-bold dark:font-normal">
                        {{ positiveClick ? '+' : '-' }} {{ amountByClick }}
                    </span>
                </button>
            </div>
            <button @click="startedTimer ? stopTimer() : startTimer()" type="button" class="mt-2 text-white bg-gradient-to-r from-red-500 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {{ startedTimer ? 'STOP' : 'START' }}
            </button>

            <p v-show="!startedTimer" class="text-black dark:text-white text-xs mt-4"><strong>TIP:</strong> try <kbd class="px-1 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Shift</kbd> or
                <kbd class="px-1 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd>
            </p>

        </div>
    </div>
</template>

<script>
import CountDown from './components/CountDown.vue';
import Alert from './components/Alert.vue';

export default {
    components: {
        CountDown,
        Alert,
    },
    data() {
        return {
            showError: false,
            hours: 0,
            minutes: 0,
            seconds: 0,
            amountByClick: 1,
            positiveClick: true,
            startedTimer: false,
            TO: undefined,
        }
    },
    methods: {
        startTimer() {
            if ((this.hours || this.minutes || this.seconds) == 0) {
                this.showError = true
                setTimeout(() => { this.showError = false }, 3000)
                return
            }

            this.startedTimer = true
            this.tick()
        },
        stopTimer() {
            this.startedTimer = false
            clearTimeout(this.TO)
        },
        tick() {
            this.TO = setTimeout(() => {
                this.seconds--

                if (this.seconds == -1) {
                    this.minutes--
                    this.seconds = 59
                } else if (this.seconds == 0 && this.minutes == 0 && this.hours == 0) {
                    new Audio('beep_message.ogg').play()
                    this.stopTimer()
                    return
                }
                if (this.minutes == -1 && this.hours > 0) {
                    this.hours--
                    this.minutes = 59
                }

                if (this.hours == -1) {
                    this.hours = 0
                }
                this.tick()
            }, 1000)
        },
        /**
         @param { String } type The type need to be h,m or s respectively hours, minutes and seconds
         */
        changeTime(type) {
            switch (type) {
                case "h":
                    this.hours = this.positiveClick ? this.hours + this.amountByClick : this.hours - this.amountByClick
                    this.hours = this.hours < 0 ? 0 : this.hours
                    this.hours = this.hours > 23 ? 23 : this.hours

                    break;
                case "m":
                    this.minutes = this.positiveClick ? this.minutes + this.amountByClick : this.minutes - this.amountByClick
                    this.minutes = this.minutes < 0 ? 0 : this.minutes
                    this.minutes = this.minutes > 59 ? 59 : this.minutes

                    break;
                case "s":
                    this.seconds = this.positiveClick ? this.seconds + this.amountByClick : this.seconds - this.amountByClick
                    this.seconds = this.seconds < 0 ? 0 : this.seconds
                    this.seconds = this.seconds > 59 ? 59 : this.seconds
                    break;

                default:
                    break;
            }
        },
        keyDownHandler(e) {
            if (e.key == "Control") {
                this.amountByClick = 10
            }
            if (e.key == "Shift") {
                this.positiveClick = false
            }
        },
        keyUpHandler(e) {
            if (e.key == "Control") {
                this.amountByClick = 1
            }
            if (e.key == "Shift") {
                this.positiveClick = true
            }
        },
    },
    computed: {
        showHours() {
            return this.hours < 10 ? `0${this.hours}` : this.hours
        },
        showMinutes() {
            return this.minutes < 10 ? `0${this.minutes}` : this.minutes
        },
        showSeconds() {
            return this.seconds < 10 ? `0${this.seconds}` : this.seconds
        },
    },
    created() {
        window.addEventListener('keydown', this.keyDownHandler)

        window.addEventListener('keyup', this.keyUpHandler)
    },
    destroyed() {
        window.removeEventListener('keydown', this.keyDownHandler)
        window.removeEventListener('keyup', this.keyUpHandler)
    }
};
</script>

<style lang="scss" scoped></style>