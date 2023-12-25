<template>
    <q-page class="bg-background q-pa-sm">
        <div class="">
            <div class="full-height full-width border-line-white radious-10px">
                <div class="row justify-center">
                    <q-btn class="text-grey-1" flat dense icon="home" no-caps @click="onToday()" />
                    <q-btn class="text-grey-1" flat dense icon="chevron_left" no-caps @click="onPrev()" />
                    <q-btn class="text-grey-1" flat dense icon="chevron_right" no-caps @click="onNext()" />
                </div>
                <div class="flex flex-center text-grey-1">
                    <div style="font-size: 2em;">{{ formattedMonth }}</div>
                </div>
                <div class="row justify-center full-height full-width">
                    <div class="full-height full-width">
                        <q-calendar-month class="full-height full-width radious-10px" ref="calendar" v-model="selectedDate"
                            animated bordered focusable hoverable no-active-date :day-min-height="60" :day-height="0"
                            locale="el" @change="onChange" @moved="onMoved" @click-date="onClickDate"
                            @click-day="onClickDay" @click-workweek="onClickWorkweek"
                            @click-head-workweek="onClickHeadWorkweek" @click-head-day="onClickHeadDay"
                            :style="nordColorScemaCallendar" />
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>
  
<script>
import {
    QCalendarMonth,
    PARSE_DATE, // regex for parsing out date
    addToDate,
    parseTimestamp,
    today,
    isBetweenDates
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

import {
    defineComponent,
    ref,
    reactive,
    computed
} from 'vue'
import Holidays from 'date-holidays'

export default defineComponent({
    name: 'MonthSlotDayHolidays',

    setup(props, { slots, emit }) {
        const countries = new Holidays().getCountries()
        const selectedDate = ref(today()),
            selectedMonth = reactive([]),
            year = ref(new Date().getFullYear()),
            calendar = ref(null),
            country = ref('GR'), // start with Canada
            // map the holiday contry codes to actual ISO 639-1 locale codes
            // so the calendar can show the correct language
            countryCodes = {
                GR: 'el', // 'Ελλάδα', Greek
            }

        const countriesList = computed(() => {
            return Object.keys(countries).map(key => {
                return { label: countries[key], value: key }
            })
        })

        console.log(countriesList.value)

        const locale = computed(() => {
            if (country.value) {
                return countryCodes[country.value]
            }
            return 'en-CA'
        })

        const formattedMonth = computed(() => {
            const date = new Date(selectedDate.value)
            return monthFormatter().format(date) + ' ' + date.getFullYear()
        })

        function monthFormatter() {
            try {
                return new Intl.DateTimeFormat(locale.value || undefined, {
                    month: 'long',
                    timeZone: 'UTC'
                })
            }
            catch (e) {
                //
            }
        }

        const holidaysMap = computed(() => {
            // keep previous, current and next year so in dec/jan
            // you can see holidays from different years
            return [
                ...(new Holidays(country.value).getHolidays(year.value - 1)),
                ...(new Holidays(country.value).getHolidays(year.value)),
                ...(new Holidays(country.value).getHolidays(year.value + 1))
            ]
        })

        function getColor(item) {
            switch (item.type) {
                case 'public':
                    return 'blue'
                case 'observance':
                    return 'green'
                case 'optional':
                    return 'red'
                default: // bank|school
                    return 'orange'
            }
        }

        const nordColorScemaCallendar = ref(
            {
                "--calendar-scrollbar-track": "#2E3440",
                "--calendar-scrollbar-thumb": "#3B4252",
                "--calendar-scrollbar-thumb-hover": "#4C566A",
                "--calendar-scrollbar-track-dark": "#3B4252",
                "--calendar-scrollbar-thumb-dark": "#2E3440",
                "--calendar-scrollbar-thumb-hover-dark": "#3B4252",
                "--calendar-border": "#2E3440 1px solid",
                "--calendar-border-dark": "#3B4252 1px solid",
                "--calendar-border-section": "#2E3440 1px dashed",
                "--calendar-border-section-dark": "#3B4252 1px dashed",
                "--calendar-border-current": "#4C566A 2px solid",
                "--calendar-border-current-dark": "#434C5E 2px solid",
                "--calendar-mini-range-connector-hover-border": "#88C0D0 1px dashed",
                "--calendar-mini-range-connector-hover-border-dark": "#81A1C1 1px dashed",
                "--calendar-color": "#ECEFF4",
                "--calendar-color-dark": "#E5E9F0",
                "--calendar-background": "#4C566A",
                "--calendar-background-dark": "#434C5E",
                "--calendar-current-color": "#88C0D0",
                "--calendar-current-color-dark": "#81A1C1",
                "--calendar-current-background": "#81A1C1",
                "--calendar-current-background-dark": "#5E81AC",
                "--calendar-disabled-date-color": "#4C566A",
                "--calendar-disabled-date-color-dark": "#3B4252",
                "--calendar-disabled-date-background": "#3B4252",
                "--calendar-disabled-date-background-dark": "#2E3440",
                "--calendar-active-date-color": "#E5E9F0",
                "--calendar-active-date-color-dark": "#ECEFF4",
                "--calendar-active-date-background": "#5E81AC",
                "--calendar-active-date-background-dark": "#81A1C1",
                "--calendar-outside-color": "#434C5E",
                "--calendar-outside-color-dark": "#4C566A",
                "--calendar-outside-background": "#2E3440",
                "--calendar-outside-background-dark": "#3B4252",
                "--calendar-selected-color": "#81A1C1",
                "--calendar-selected-color-dark": "#5E81AC",
                "--calendar-selected-background": "#4C566A",
                "--calendar-selected-background-dark": "#434C5E",
                "--calendar-mini-selected-color": "unset",
                "--calendar-mini-selected-color-dark": "#5E81AC",
                "--calendar-mini-selected-background": "unset",
                "--calendar-mini-selected-background-dark": "#4C566A",
                "--calendar-mini-selected-label-color": "#81A1C1",
                "--calendar-mini-selected-label-color-dark": "#88C0D0",
                "--calendar-mini-selected-label-background": "#3B4252",
                "--calendar-mini-selected-label-background-dark": "#2E3440",
                "--calendar-range-color": "#81A1C1",
                "--calendar-range-color-dark": "#88C0D0",
                "--calendar-range-background": "#3B4252",
                "--calendar-range-background-dark": "#2E3440",
                "--calendar-mini-range-color": "#88C0D0",
                "--calendar-mini-range-color-dark": "#81A1C1",
                "--calendar-mini-range-background": "unset",
                "--calendar-mini-range-background-dark": "unset",
                "--calendar-mini-range-label-color": "#81A1C1",
                "--calendar-mini-range-label-color-dark": "#5E81AC",
                "--calendar-mini-range-label-background": "#4C566A",
                "--calendar-mini-range-label-background-dark": "#434C5E",
                "--calendar-mini-range-connector-color": "#81A1C1",
                "--calendar-mini-range-connector-color-dark": "#88C0D0",
                "--calendar-mini-range-hover-color": "#5E81AC",
                "--calendar-mini-range-hover-color-dark": "#81A1C1",
                "--calendar-mini-range-firstlast-color": "#88C0D0",
                "--calendar-mini-range-firstlast-color-dark": "#81A1C1",
                "--calendar-mini-range-firstlast-background": "unset",
                "--calendar-mini-range-firstlast-background-dark": "#4C566A",
                "--calendar-mini-range-firstlast-label-color": "#81A1C1",
                "--calendar-mini-range-firstlast-label-color-dark": "#88C0D0",
                "--calendar-mini-range-firstlast-label-background": "#2E3440",
                "--calendar-mini-range-firstlast-label-background-dark": "#3B4252",
                "--calendar-intervals-width": "56px",
                "--calendar-work-week-width": "30px",
                "--calendar-mini-work-week-width": "30px",
                "--calendar-work-week-font-size": "1.0em",
                "--calendar-head-font-weight": "600"
            }

        )

        /// where the magic happens...
        const eventsMap = computed(() => {
            const map = {}
            if (selectedMonth.length > 0) {
                const start = selectedMonth[0]
                const end = selectedMonth[selectedMonth.length - 1]
                holidaysMap.value
                    .filter(item => {
                        const timestamp = parseTimestamp((PARSE_DATE.exec(item.date))[0])
                        return isBetweenDates(timestamp, start, end)
                    })
                    .map((item, index) => {
                        return {
                            id: index,
                            title: item.name,
                            details: item.type,
                            date: (PARSE_DATE.exec(item.date))[0],
                            bgcolor: getColor(item)
                        }
                    })
                    .forEach(event => {
                        (map[event.date] = (map[event.date] || [])).push(event)
                        if (event.days !== undefined) {
                            let timestamp = parseTimestamp(event.date)
                            let days = event.days
                            // add a new event for each day
                            // skip 1st one which would have been done above
                            do {
                                timestamp = addToDate(timestamp, { day: 1 })
                                if (!map[timestamp.date]) {
                                    map[timestamp.date] = []
                                }
                                map[timestamp.date].push(event)
                                // already accounted for 1st day
                            } while (--days > 1)
                        }
                    })
            }
            return map
        })

        function badgeClasses(event, type) {
            return {
                [`text-white bg-${event.bgcolor}`]: true,
                'rounded-border': true
            }
        }

        function badgeStyles(day, event) {
            const s = {}
            // s.left = day.weekday === 0 ? 0 : (day.weekday * parsedCellWidth) + '%'
            // s.top = 0
            // s.bottom = 0
            // s.width = (event.days * parsedCellWidth) + '%'
            return s
        }

        function onToday() {
            calendar.value.moveToToday()
        }
        function onPrev() {
            calendar.value.prev()
        }
        function onNext() {
            calendar.value.next()
        }
        function onMoved(data) {
            console.log('onMoved', data)
        }
        function onChange(data) {
            console.log('onChange', data)
            selectedMonth.splice(0, selectedMonth.length, ...data.days)
            // get year of 1st of the month
            for (let index = 0; index < selectedMonth.length; ++index) {
                if (selectedMonth[index].day === 1) {
                    year.value = selectedMonth[index].year
                    break
                }
            }
        }
        function onClickDate(data) {
            console.log('onClickDate', data)
        }
        function onClickDay(data) {
            console.log('onClickDay', data)
        }
        function onClickWorkweek(data) {
            console.log('onClickWorkweek', data)
        }
        function onClickHeadDay(data) {
            console.log('onClickHeadDay', data)
        }
        function onClickHeadWorkweek(data) {
            console.log('onClickHeadWorkweek', data)
        }

        return {
            selectedDate,
            calendar,
            countries,
            countriesList,
            country,
            locale,
            eventsMap,
            formattedMonth,
            badgeClasses,
            badgeStyles,
            nordColorScemaCallendar,
            onToday,
            onPrev,
            onNext,
            onMoved,
            onChange,
            onClickDate,
            onClickDay,
            onClickWorkweek,
            onClickHeadDay,
            onClickHeadWorkweek
        }
    }
})
</script>