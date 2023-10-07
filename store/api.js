import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const BaseUrl=`https://api.openweathermap.org/data/2.5`
export const key='b1b35bba8b434a28a0be2a3e1071ae5b'
export const back=[
'https://img2.akspic.ru/attachments/crops/6/5/3/0/6/160356/160356-ios-ios_14-gornyj_relef-prirodnyj_landshaft-nagore-1242x2688.jpg',
'https://i.pinimg.com/736x/53/2f/8b/532f8bad4f91530fdd57177c9febeb1b.jpg',
'https://i.pinimg.com/736x/a2/1c/b1/a21cb14749084723adfeed8554e93dd6.jpg',
'https://img2.akspic.ru/attachments/crops/6/3/7/9/6/169736/169736-smartfon-risovanie-android-zhivopis-art-1440x2560.jpg',
'https://img1.akspic.ru/attachments/crops/1/0/5/7/6/167501/167501-voda-gora-atmosfera-poslesvechenie-svet-1440x2560.jpg',
'https://img2.akspic.ru/attachments/crops/8/1/9/9/6/169918/169918-otkroveniya-android-puskovaya_ustanovka_gca-atmosfera-voda-1440x2560.jpg'
  ]

export const CityApi=createApi({
    reducerPath:'Cities',
    baseQuery:fetchBaseQuery({
      baseUrl:`${BaseUrl}/forecast/daily`
    }),
    endpoints:(build)=>({
     getCity:build.query({
      query:(id)=>({
       url:`?q=${id}&appid=${key}&cnt=7&units=imperial`
          })
       })
    })
  })
export const {useGetCityQuery}=CityApi