import React, { useEffect, useState } from "react";
import { getDataFromFirestore, updateStatusAtIndex, getDocumentById} from "../../firebase";

const PendingOrder = ({ user, searchId }) => {
  const office = user.office;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      if (orders.length === 0) {
        const ordersData = await getDataFromFirestore("order");
        setOrders(ordersData);
      }
    };
    const getSearchOrder = async () => {
      if (searchId !== "") {
        const orderData = await getDocumentById(searchId, "order");
        orderData.id = searchId;
        if (orderData) {
          setOrders([orderData]);
        }
        console.log("Search" + searchId);
        // Note: It's better to use setSearchId('') to clear the searchId state
        // to avoid rendering the component again with the same searchId.
        // setSearchId('');
      }
    };
  
    fetchOrders();
    getSearchOrder();
    // getSearchOrder();
  }, [searchId]);

  const handleStatusChange = async (orderId, index, office) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedStatus = [...order.status]; // Tạo một bản sao mới của mảng status
        updatedStatus[index] = 0; // Sửa giá trị tại vị trí index
        console.log("Success!");
        return { ...order, status: updatedStatus }; // Return the updated order object
      }
      return order; // Return the order object as-is if it doesn't match the specified orderId
    });
    setOrders(updatedOrders);
    await updateStatusAtIndex(orderId, index, office, 0);
    //setEditingOrderId(null); // Reset editingOrderId after changing the status
  };

  const handleEditClick = (orderId, index) => {
    handleStatusChange(orderId, index, office);
  };

  const countDashesBeforeOffice = (office, orderPath) => {
    if (orderPath) {
      const index = orderPath.indexOf(office);
      if (index !== -1) {
        const substringBeforeOffice = orderPath.substring(0, index);
        console.log(substringBeforeOffice.split("-").length - 1);
        return substringBeforeOffice.split("-").length - 1;
      }
    }
    console.log("orderPath is undefined or null.");
    return -1;
  };

  return (
    <div className="app-container flex flex-col gap-10 text-base mx-10">
      <table className="w-full border-collapse mt-7 rounded-xl overflow-hidden">
        <thead>
          <tr className="rounded-lg shadow-lg">
            <th className="border  bg-main-300 text-white p-2" style={{ width: "7%" }}>
              Mã đơn
            </th>
            <th className="border  bg-main-300 text-white p-2" style={{ width: "15%" }}>
              Thông tin người gửi
            </th>
            <th className="border  bg-main-300 text-white p-2" style={{ width: "15%" }}>
              Thông tin người nhận
            </th>
            <th className="border  bg-main-300 text-white p-2" style={{ width: "15%" }}>
              Mã điểm GD bên gửi
            </th>
            <th className="border  bg-main-300 text-white p-2" style={{ width: "17%" }}>
              Mã điểm GD bên nhận
            </th>
            <th className="border  bg-main-300 text-white p-2" style={{ width: "12%" }}>
              Ngày giờ gửi
            </th>
            <th className="border  bg-main-300 text-white p-2" style={{ width: "8%" }}>
              Trạng thái
            </th>
            <th className="border  bg-main-300 text-white p-2" style={{ width: "11%" }}>
              Xác nhận
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const index = countDashesBeforeOffice(office, order?.path);
            if (
              index !== -1 &&
              order.status[index] === -1 &&
              order.id !== "total"
            ) {
              return (
                <tr key={order.id}>
                  <td className="border p-2 text-center" style={{ borderRight: "none"}}>{order.id}</td>
                  <td className="border p-2 mx-auto" style={{ borderRight: "none", borderLeft: "none"}}>
                    {order.consignor?.name} - {order.consignor?.phone}
                  </td>
                  <td className="border p-2 mx-auto" style={{ borderRight: "none", borderLeft: "none"}}>
                    {order.consignee?.name} - {order.consignee?.phone}
                  </td>
                  <td className="border p-2 text-center" style={{ borderRight: "none", borderLeft: "none"}}>
                    {order.consignor?.postcode}
                  </td>
                  <td className="border p-2 text-center" style={{ borderRight: "none", borderLeft: "none"}}>
                    {order.consignee?.postcode}
                  </td>
                  <td className="border p-2 text-center" style={{ borderRight: "none", borderLeft: "none"}}>
                    {order.shipping_detail?.date}
                  </td>
                  <td className="border p-2 text-center" style={{ borderRight: "none", borderLeft: "none"}}>Chưa xác nhận</td>
                  <td className="border p-2 text-center" style={{ borderLeft: "none"}}>
                    {order.status[index - 1] === 1 && (
                      <button onClick={() => handleEditClick(order.id, index)}>
                        Xác nhận
                      </button>
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

export default PendingOrder;
