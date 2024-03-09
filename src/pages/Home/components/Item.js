const Item = ({ id, note, date, time, deleteData, submittingStatus }) => {

    function deleteItem() {
        submittingStatus.current = true
        deleteData(function(prev) {
            // 透過 filter 把當前 id 的 Item 移除掉，
            // 只留下其他的 Item。
            return prev.filter(item => item.id !== id)
        })
    }
  
    return <div className="item">
        <div>
        <p>{note}</p>
        <p>{`${date} ${time}`}</p>
        </div>
        <button onClick={deleteItem} className="remove">刪除</button>
    </div>
};
  
export default Item;
  