import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from '../../global/constants'

import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";

// 查詢 server 資料
async function fetchData(setData) {
  const res = await fetch(API_GET_DATA)
  const { data } = await res.json()
  setData(data) // 直接在 async function 內去改變 data，不需要再傳出來
}

// 更新 server 資料
async function fetchSetData(data) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ data })
  })
}

const Home = () => {

    // 透過 useState 給予初始值 [] 和一 setter
    const [data, setData] = useState([]);

    // 透過 useRef 來告訴 React 第一次渲染（非提交資料改變的
    // 請求）時，不要去打 updateData API，可搭配下面 useEffect 使用
    const submittingStatus = useRef(false);


    // Fetch API 透過 async/await 的方式
    // 每次資料有變化時，同步更改 server 資料
    useEffect(() => {
        if (!submittingStatus.current){
        return
        }
        fetchSetData(data)
        // 當更新完 server 資料重新渲染時，不清空資料
        .then(data => submittingStatus.current = false)
    }, [data])

    // Fetch API 透過 async/await 的方式
    // 每次 server 啟動時，去 server 要備忘錄資訊並顯示
    useEffect(() => {
        fetchData(setData)
    }, [])

    return <div className="app">
        <h1>備忘錄</h1>
        {/* 將 setter 給 Edit 元件使用 */}
        <Edit add={setData} submittingStatus={submittingStatus} />
        {/* 將初始值 [] 傳遞給 List，然後 setter 傳給
        List 後再傳給 Item 元件做刪除功能用 */}
        <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
    </div>
};

export default Home;
