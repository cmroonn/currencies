import { createStore, createLogger } from 'vuex'

const store = createStore({
    state: {
        currencyData: [],
        searchData: '',
        defaultData: {},
    },

    mutations: {
        SET_CURRENCY_DATA(state, data) {
            state.currencyData = data
        },

        SET_SEARCH_DATA(state, data) {
            state.searchData = data
        },

        SET_DEFAULT_DATA(state, data) {
            data.Valute['RUB'] = {
                CharCode: "RUB",
                Value: 1,
            }

            state.defaultData = data
        }
    },

    actions: {
        async getCurrencies({ commit }) {
            const url = "https://www.cbr-xml-daily.ru/daily_json.js";

            const response = await fetch(url);
            const data = await response.json();
            const currencies = data.Valute;

            const arr = [];
            for (let key in currencies) {
                arr.push(currencies[key]);
            }

            arr.forEach(el => {
                el.reverse = {
                    value: el.Nominal,
                    nominal: (el.Nominal / el.Value).toFixed(4),
                }

                el.hasGrown = (el.Value - el.Previous) > 0 ? true : false;
            })


            commit('SET_CURRENCY_DATA', arr);
            commit('SET_DEFAULT_DATA', data);
        },

        setSearchData({commit}, data) {
            commit('SET_SEARCH_DATA', data.toLowerCase())
        }
    },

    getters: {
        currencies(state) {
            return state.currencyData;
        },

        getCharCodes(state) {
            let codes = state.currencyData.map(curr => curr.CharCode !== "USD" && curr.CharCode !== "EUR" ? curr.CharCode : false);
            codes = codes.filter(code => code !== false)
            codes.unshift('EUR')
            codes.unshift('USD')
            codes.unshift('RUB')
            return codes;
        },

        searchCurrencies(state) {
            if (state.searchData === '') {
                return state.currencyData
            } else {
                const newArr = [];
                for (let key in state.currencyData) {
                    let el = state.currencyData[key]
                    console.log(el)
                    if (el.CharCode.toLowerCase().indexOf(state.searchData) != -1) newArr.push(el);
                    if (el.Name.toLowerCase().indexOf(state.searchData) != -1) newArr.push(el);

                }
                return newArr
            }
        },

        getValutes(state) {
            return state.defaultData.Valute;
        }
    }
})


export default store;