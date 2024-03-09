import { useState } from "react";
import { v4 } from "uuid";

const Edit = ({ add, submittingStatus }) => {

    // 把 input element 綁定到 useState hook 上
    const [note, setNote] = useState("");
    // 再建立一 function 把輸入的直給寫入
    function noteChange(e) {
        setNote(e.target.value);
    }

    const [date, setDate] = useState("");
    function dateChange(e) {
        setDate(e.target.value);
    }

    const [time, setTime] = useState("");
    function timeChange(e) {
        setTime(e.target.value);
    }

    function addItem() {
        // 在改變 data 之前，要先把 isSubmittingStatus 設為 True，
        // 這樣 updateData API 才會打出去
        submittingStatus.current = true
        // 透過一個 function 將原始值 (prev) 解構並回傳
        add(function (prevData) {
            return [       
                {
                    id: v4(),
                    note,
                    date,
                    time,
                },
                ...prevData,
            ];
        });
    }

    return <div>
        {/* 將 note, date, time 三個元件綁定到 useState，
        當狀態改變時，可直接寫入到 state 中。 */}
        <p>記事：</p>
        <input type="text" value={note} onChange={noteChange} />
        <p>日期：</p>
        <input type="date" value={date} onChange={dateChange} />
        <p>時間：</p>
        <input type="time" value={time} onChange={timeChange} />
        <button onClick={addItem} className="add">
            新增
        </button>
    </div>
};

export default Edit;
