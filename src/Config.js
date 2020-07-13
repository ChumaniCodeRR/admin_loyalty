const config = {
  expiry_months: [
    {value: 6, label: '6 Months'},
    {value: 12, label: '12 Months'},
    {value: 24, label: '24 Months'},
  ],
  currencies: [
    {value:"AED","symbol":"\u062f.\u0625;",label:"UAE dirham"},
    {value:"AFN","symbol":"Afs",label:"Afghan afghani"},
    {value:"ALL","symbol":"L",label:"Albanian lek"},
    {value:"AMD","symbol":"AMD",label:"Armenian dram"},
    {value:"ANG","symbol":"NA\u0192",label:"Netherlands Antillean gulden"},
    {value:"AOA","symbol":"Kz",label:"Angolan kwanza"},
    {value:"ARS","symbol":"$",label:"Argentine peso"},
    {value:"AUD","symbol":"$",label:"Australian dollar"},
    {value:"AWG","symbol":"\u0192",label:"Aruban florin"},
    {value:"AZN","symbol":"AZN",label:"Azerbaijani manat"},
    {value:"BAM","symbol":"KM",label:"Bosnia and Herzegovina konvertibilna marka"},
    {value:"BBD","symbol":"Bds$",label:"Barbadian dollar"},
    {value:"BDT","symbol":"\u09f3",label:"Bangladeshi taka"},
    {value:"BGN","symbol":"BGN",label:"Bulgarian lev"},
    {value:"BHD","symbol":".\u062f.\u0628",label:"Bahraini dinar"},
    {value:"BIF","symbol":"FBu",label:"Burundi franc"},
    {value:"BMD","symbol":"BD$",label:"Bermudian dollar"},
    {value:"BND","symbol":"B$",label:"Brunei dollar"},
    {value:"BOB","symbol":"Bs.",label:"Bolivian boliviano"},
    {value:"BRL","symbol":"R$",label:"Brazilian real"},
    {value:"BSD","symbol":"B$",label:"Bahamian dollar"},
    {value:"BTN","symbol":"Nu.",label:"Bhutanese ngultrum"},
    {value:"BWP","symbol":"P",label:"Botswana pula"},
    {value:"BYR","symbol":"Br",label:"Belarusian ruble"},
    {value:"BZD","symbol":"BZ$",label:"Belize dollar"},
    {value:"CAD","symbol":"$",label:"Canadian dollar"},
    {value:"CDF","symbol":"F",label:"Congolese franc"},
    {value:"CHF","symbol":"Fr.",label:"Swiss franc"},
    {value:"CLP","symbol":"$",label:"Chilean peso"},
    {value:"CNY","symbol":"\u00a5",label:"Chinese/Yuan renminbi"},
    {value:"COP","symbol":"Col$",label:"Colombian peso"},
    {value:"CRC","symbol":"\u20a1",label:"Costa Rican colon"},
    {value:"CUC","symbol":"$",label:"Cuban peso"},
    {value:"CVE","symbol":"Esc",label:"Cape Verdean escudo"},
    {value:"CZK","symbol":"K\u010d",label:"Czech koruna"},
    {value:"DJF","symbol":"Fdj",label:"Djiboutian franc"},
    {value:"DKK","symbol":"Kr",label:"Danish krone"},
    {value:"DOP","symbol":"RD$",label:"Dominican peso"},
    {value:"DZD","symbol":"\u062f.\u062c",label:"Algerian dinar"},
    {value:"EEK","symbol":"KR",label:"Estonian kroon"},
    {value:"EGP","symbol":"\u00a3",label:"Egyptian pound"},
    {value:"ERN","symbol":"Nfa",label:"Eritrean nakfa"},
    {value:"ETB","symbol":"Br",label:"Ethiopian birr"},
    {value:"EUR","symbol":"\u20ac",label:"European Euro"},
    {value:"FJD","symbol":"FJ$",label:"Fijian dollar"},
    {value:"FKP","symbol":"\u00a3",label:"Falkland Islands pound"},
    {value:"GBP","symbol":"\u00a3",label:"British pound"},
    {value:"GEL","symbol":"GEL",label:"Georgian lari"},
    {value:"GHS","symbol":"GH\u20b5",label:"Ghanaian cedi"},
    {value:"GIP","symbol":"\u00a3",label:"Gibraltar pound"},
    {value:"GMD","symbol":"D",label:"Gambian dalasi"},
    {value:"GNF","symbol":"FG",label:"Guinean franc"},
    {value:"GQE","symbol":"CFA",label:"Central African CFA franc"},
    {value:"GTQ","symbol":"Q",label:"Guatemalan quetzal"},
    {value:"GYD","symbol":"GY$",label:"Guyanese dollar"},
    {value:"HKD","symbol":"HK$",label:"Hong Kong dollar"},
    {value:"HNL","symbol":"L",label:"Honduran lempira"},
    {value:"HRK","symbol":"kn",label:"Croatian kuna"},
    {value:"HTG","symbol":"G",label:"Haitian gourde"},
    {value:"HUF","symbol":"Ft",label:"Hungarian forint"},
    {value:"IDR","symbol":"Rp",label:"Indonesian rupiah"},
    {value:"ILS","symbol":"\u20aa",label:"Israeli new sheqel"},
    {value:"INR","symbol":"\u20B9",label:"Indian rupee"},
    {value:"IQD","symbol":"\u062f.\u0639",label:"Iraqi dinar"},
    {value:"IRR","symbol":"IRR",label:"Iranian rial"},
    {value:"ISK","symbol":"kr",label:"Icelandic kr\u00f3na"},
    {value:"JMD","symbol":"J$",label:"Jamaican dollar"},
    {value:"JOD","symbol":"JOD",label:"Jordanian dinar"},
    {value:"JPY","symbol":"\u00a5",label:"Japanese yen"},
    {value:"KES","symbol":"KSh",label:"Kenyan shilling"},
    {value:"KGS","symbol":"\u0441\u043e\u043c",label:"Kyrgyzstani som"},
    {value:"KHR","symbol":"\u17db",label:"Cambodian riel"},
    {value:"KMF","symbol":"KMF",label:"Comorian franc"},
    {value:"KPW","symbol":"W",label:"North Korean won"},
    {value:"KRW","symbol":"W",label:"South Korean won"},
    {value:"KWD","symbol":"KWD",label:"Kuwaiti dinar"},
    {value:"KYD","symbol":"KY$",label:"Cayman Islands dollar"},
    {value:"KZT","symbol":"T",label:"Kazakhstani tenge"},
    {value:"LAK","symbol":"KN",label:"Lao kip"},
    {value:"LBP","symbol":"\u00a3",label:"Lebanese lira"},
    {value:"LKR","symbol":"Rs",label:"Sri Lankan rupee"},
    {value:"LRD","symbol":"L$",label:"Liberian dollar"},
    {value:"LSL","symbol":"M",label:"Lesotho loti"},
    {value:"LTL","symbol":"Lt",label:"Lithuanian litas"},
    {value:"LVL","symbol":"Ls",label:"Latvian lats"},
    {value:"LYD","symbol":"LD",label:"Libyan dinar"},
    {value:"MAD","symbol":"MAD",label:"Moroccan dirham"},
    {value:"MDL","symbol":"MDL",label:"Moldovan leu"},
    {value:"MGA","symbol":"FMG",label:"Malagasy ariary"},
    {value:"MKD","symbol":"MKD",label:"Macedonian denar"},
    {value:"MMK","symbol":"K",label:"Myanma kyat"},
    {value:"MNT","symbol":"\u20ae",label:"Mongolian tugrik"},
    {value:"MOP","symbol":"P",label:"Macanese pataca"},
    {value:"MRO","symbol":"UM",label:"Mauritanian ouguiya"},
    {value:"MUR","symbol":"Rs",label:"Mauritian rupee"},
    {value:"MVR","symbol":"Rf",label:"Maldivian rufiyaa"},
    {value:"MWK","symbol":"MK",label:"Malawian kwacha"},
    {value:"MXN","symbol":"$",label:"Mexican peso"},
    {value:"MYR","symbol":"RM",label:"Malaysian ringgit"},
    {value:"MZM","symbol":"MTn",label:"Mozambican metical"},
    {value:"NAD","symbol":"N$",label:"Namibian dollar"},
    {value:"NGN","symbol":"\u20a6",label:"Nigerian naira"},
    {value:"NIO","symbol":"C$",label:"Nicaraguan c\u00f3rdoba"},
    {value:"NOK","symbol":"kr",label:"Norwegian krone"},
    {value:"NPR","symbol":"NRs",label:"Nepalese rupee"},
    {value:"NZD","symbol":"NZ$",label:"New Zealand dollar"},
    {value:"OMR","symbol":"OMR",label:"Omani rial"},
    {value:"PAB","symbol":"B./",label:"Panamanian balboa"},
    {value:"PEN","symbol":"S/.",label:"Peruvian nuevo sol"},
    {value:"PGK","symbol":"K",label:"Papua New Guinean kina"},
    {value:"PHP","symbol":"\u20b1",label:"Philippine peso"},
    {value:"PKR","symbol":"Rs.",label:"Pakistani rupee"},
    {value:"PLN","symbol":"z\u0142",label:"Polish zloty"},
    {value:"PYG","symbol":"\u20b2",label:"Paraguayan guarani"},
    {value:"QAR","symbol":"QR",label:"Qatari riyal"},
    {value:"RON","symbol":"L",label:"Romanian leu"},
    {value:"RSD","symbol":"din.",label:"Serbian dinar"},
    {value:"RUB","symbol":"R",label:"Russian ruble"},
    {value:"SAR","symbol":"SR",label:"Saudi riyal"},
    {value:"SBD","symbol":"SI$",label:"Solomon Islands dollar"},
    {value:"SCR","symbol":"SR",label:"Seychellois rupee"},
    {value:"SDG","symbol":"SDG",label:"Sudanese pound"},
    {value:"SEK","symbol":"kr",label:"Swedish krona"},
    {value:"SGD","symbol":"S$",label:"Singapore dollar"},
    {value:"SHP","symbol":"\u00a3",label:"Saint Helena pound"},
    {value:"SLL","symbol":"Le",label:"Sierra Leonean leone"},
    {value:"SOS","symbol":"Sh.",label:"Somali shilling"},
    {value:"SRD","symbol":"$",label:"Surinamese dollar"},
    {value:"SYP","symbol":"LS",label:"Syrian pound"},
    {value:"SZL","symbol":"E",label:"Swazi lilangeni"},
    {value:"THB","symbol":"\u0e3f",label:"Thai baht"},
    {value:"TJS","symbol":"TJS",label:"Tajikistani somoni"},
    {value:"TMT","symbol":"m",label:"Turkmen manat"},
    {value:"TND","symbol":"DT",label:"Tunisian dinar"},
    {value:"TRY","symbol":"TRY",label:"Turkish new lira"},
    {value:"TTD","symbol":"TT$",label:"Trinidad and Tobago dollar"},
    {value:"TWD","symbol":"NT$",label:"New Taiwan dollar"},
    {value:"TZS","symbol":"TZS",label:"Tanzanian shilling"},
    {value:"UAH","symbol":"UAH",label:"Ukrainian hryvnia"},
    {value:"UGX","symbol":"USh",label:"Ugandan shilling"},
    {value:"USD","symbol":"US$",label:"United States dollar"},
    {value:"UYU","symbol":"$U",label:"Uruguayan peso"},
    {value:"UZS","symbol":"UZS",label:"Uzbekistani som"},
    {value:"VEB","symbol":"Bs",label:"Venezuelan bolivar"},
    {value:"VND","symbol":"\u20ab",label:"Vietnamese dong"},
    {value:"VUV","symbol":"VT",label:"Vanuatu vatu"},
    {value:"WST","symbol":"WS$",label:"Samoan tala"},
    {value:"XAF","symbol":"CFA",label:"Central African CFA franc"},
    {value:"XCD","symbol":"EC$",label:"East Caribbean dollar"},
    {value:"XDR","symbol":"SDR",label:"Special Drawing Rights"},
    {value:"XOF","symbol":"CFA",label:"West African CFA franc"},
    {value:"XPF","symbol":"F",label:"CFP franc"},
    {value:"YER","symbol":"YER",label:"Yemeni rial"},
    {value:"ZAR","symbol":"R",label:"South African rand"},
    {value:"ZMK","symbol":"ZK",label:"Zambian kwacha"},
    {value:"ZWR","symbol":"Z$",label:"Zimbabwean dollar"}
  ]
};

export default config;