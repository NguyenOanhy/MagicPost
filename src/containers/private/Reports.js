import React from 'react'
import ReportItem from '../../components/ReportItem'

const Reports = ({user}) => {
  return (
    user.position == "Trưởng điểm tập kết" || user.position == "Trưởng điểm giao dịch" || user.position == "Lãnh đạo công ty" || user.position === "Nhân viên tại điểm giao dịch" ? (
    <div><ReportItem user={user} /></div>
  ) : 
    (<div className='m-20'>
       Bạn không đủ quyền hạn để xem tính năng này
    </div>)
  )
}

export default Reports