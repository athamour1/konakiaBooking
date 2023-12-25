import { boot } from 'quasar/wrappers'

import { Dark } from 'quasar'

export default boot(({ app }) => {
    Dark.set(false);
})