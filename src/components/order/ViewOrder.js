import React, { useEffect, useState } from "react";
import { getOrdersFromFirestore, updateStatusAtIndex } from "../../firebase";

const ViewOrder = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrderId, setEditingOrderId] = useState(null);
  
    useEffect(() => {
      const fetchOrders = async () => {
        const ordersData = await getOrdersFromFirestore();
        setOrders(ordersData);
      };
  
      fetchOrders();
    }, []);
  
    const handleStatusChange = async (orderId, index) => {
      await updateStatusAtIndex(orderId, index);
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          const updatedStatus = [...order.status]; // Create a new copy of the status array
          updatedStatus[index] = "1"; // Update the value at the specified index
          console.log("Success!")
          return { ...order, status: updatedStatus }; // Return the updated order object
        }
        return order; // Return the order object as-is if it doesn't match the specified orderId
      });
  
      setOrders(updatedOrders);
      setEditingOrderId(null); // Reset editingOrderId after changing the status
    };
  
  
    const countDashesBeforeOffice = (office, orderPath) => {
      if (orderPath) {
        const index = orderPath.indexOf(office);
        if (index !== -1) {
          const substringBeforeOffice = orderPath.substring(0, index);
          console.log(substringBeforeOffice.split("-").length - 1)
          return substringBeforeOffice.split("-").length - 1;
        } 
      }
      console.log("orderPath is undefined or null.");
      return -1;
    };
  
  
    return (
      <div className="app-container flex flex-col gap-10 text-base">
        <table className="w-full border-collapse">
          <thead>
            <tr className="rounded-lg shadow-lg">
              <th className="border bg-main-300 p-2">Mã đơn</th>
              <th className="border bg-main-300 p-2">Thông tin người gửi</th>
              <th className="border bg-main-300 p-2">Thông tin người nhận</th>
              <th className="border bg-main-300 p-2">Mã điểm GD bên gửi</th>
              <th className="border bg-main-300 p-2">Mã điểm GD bên nhận</th>
              <th className="border bg-main-300 p-2">Ngày giờ gửi</th>
              <th className="border bg-main-300 p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const index = countDashesBeforeOffice("Hà Nội Hub", order?.path);
              if (index !== -1 && order.status[index] !== "1" && order.id !== "total") {
                return (
                  <tr key={order.id}>
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">
                      {order.consignor?.name} - {order.consignor?.phone}
                    </td>
                    <td className="border p-2">
                      {order.consignee?.name} - {order.consignee?.phone}
                    </td>
                    <td className="border p-2">{order.consignor?.postcode}</td>
                    <td className="border p-2">{order.consignee?.postcode}</td>
                    <td className="border p-2">{order.shipping_detail?.date}</td>
                    <td className="border p-2">
                      {editingOrderId === order.id ? (
                        "Đã xác nhận"
                      ) : (
                        "Chưa xác nhận"
                      )}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    );
};

export default ViewOrder