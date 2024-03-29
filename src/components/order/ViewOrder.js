import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataFromFirestore, getDocumentById, updateStatusAtIndex } from "../../firebase";

const ViewOrder = ({ user, searchId }) => {
  const navigate = useNavigate();
  const office = user.office;
  const position = user.position;
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);

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
        // Note: It's better to use setSearchId('') to clear the searchId state
        // to avoid rendering the component again with the same searchId.
        // setSearchId('');
      }
    };
  
    fetchOrders();
    getSearchOrder();
    // getSearchOrder();
    //// searchId = "";
  }, [searchId]);


  const editTest = (order, index) => {
    if (order.status[4] !== 3 && order.status[4] !== 4) {
      if (index === 0 || index === 1 || index === 2) {
        if (order.status[index] === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    return false;
  };
  const viewStatus = (order, index) => {
    if (order.status[4] === -1) {
      if (order.status[index] === 0) {
        return "Chờ vận chuyển";
      } else if (order.status[index] === 1) {
        return "Đã rời bưu cục";
      }
    } else if (order.status[4] === 0) {
      return "Đang giao hàng";
    } else if (order.status[4] === 1) {
      return "Hoãn giao hàng lần 1";
    } else if (order.status[4] === 2) {
      return "Hoãn giao hàng lần 2";
    } else if (order.status[4] === 3) {
      return "Giao hàng thành công";
    } else if (order.status[4] === 4) {
      return "Đơn hàng bị hủy";
    }
  };

  const handleStatusChange = async (order, index, office, value) => {
    console.log(value);
    const value2 = parseInt(value);
    const orderId = order.id;
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedStatus = [...order.status]; // Tạo một bản sao mới của mảng status
        if (index === 0 || index === 1 || index === 2) {
          updatedStatus[index] = 1; // Sửa giá trị tại vị trí index
        } else {
          if (order.status[3] !== 1) {
            updatedStatus[3] = 1;
            updatedStatus[4] = 0;
          } else {
            updatedStatus[4] = value2;
          }
        }
        console.log("Success!");
        return { ...order, status: updatedStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    console.log(orders);
    setEditingOrderId(null); // Reset editingOrderId after changing the status
    if (index !== 3) {
      await updateStatusAtIndex(order.id, index, office, 1);
    } else if (order.status[3] !== 1) {
      await updateStatusAtIndex(order.id, index, office, 1);
    } else {
      await updateStatusAtIndex(order.id, 4, office, value2);
    }
  };

  const handleEditClick = (orderId) => {
    setEditingOrderId(orderId);
  };

  const handleDoneClick = () => {
    setEditingOrderId(null);
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

  const handleOnClick = (order) => {
    navigate(`/private/orders/${order.id}`, {
      state: {
        orderId: order.id,
        orderData: order,
      },
    });
  };
  return (
    <div className="app-container flex flex-col gap-10 text-base mx-10">
      <table className="w-full border-collapse mt-7 rounded-xl overflow-hidden">
        <thead>
          <tr className="rounded-lg">
            <th className="border bg-main-300 text-white p-2" style={{ width: "7%", border: "none"}}>
              Mã đơn
            </th>
            <th className="border bg-main-300 text-white p-2" style={{ width: "13%", border:"none"}}>
              Thông tin người gửi
            </th>
            <th className="border bg-main-300 text-white p-2" style={{ width: "13%", border:"none"}}>
              Thông tin người nhận
            </th>
            <th className="border bg-main-300 text-white p-2" style={{ width: "13%", border:"none"}}>
              Mã điểm GD bên gửi
            </th>
            <th className="border bg-main-300 text-white p-2" style={{ width: "13%", border:"none"}}>
              Mã điểm GD bên nhận
            </th>
            <th className="border bg-main-300 text-white p-2" style={{ width: "11%", border:"none"}}>
              Ngày giờ gửi
            </th>
            <th className="border bg-main-300 text-white p-2" style={{ width: "8%", border:"none"}}>
              Trạng thái
            </th>
            <th className="border bg-main-300 text-white p-2" style={{ width: "13%", border:"none"}}>
              Phiếu vận chuyển
            </th>
            {position !== "Lãnh đạo công ty" && (
              <th className="border bg-main-300 text-white p-2" style={{ width: "9%", border:"none"}}>
                Chỉnh sửa
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const index = countDashesBeforeOffice(office, order?.path);
            if (
              (index !== -1 &&
                order.status[index] !== -1 &&
                order.id !== "total") ||
              (position === "Lãnh đạo công ty" && order.id !== "total")
            ) {
              return (
                <tr key={order.id} >
                  <td className="border border-r-0 text-center h-[65px]"style={{ borderLeft: "none", borderRight: "none"}}>{'MP'+ order.id}</td>
                  <td className="border p-2 " style={{ borderLeft: "none", borderRight: "none"}}>
                    {order.consignor?.name} - {order.consignor?.phone}
                  </td>
                  <td className="border p-2" style={{ borderLeft: "none", borderRight: "none"}}>
                    {order.consignee?.name} - {order.consignee?.phone}
                  </td>
                  <td className="border p-2 text-center" style={{ borderLeft: "none", borderRight: "none"}}>
                    {order.consignor?.postcode}
                  </td>
                  <td className="border p-2 text-center" style={{ borderLeft: "none", borderRight: "none"}}>
                    {order.consignee?.postcode}
                  </td>
                  <td className="border p-2 text-center" style={{ borderLeft: "none", borderRight: "none"}}>
                    {order.shipping_detail?.date}
                  </td>
                  {position === "Lãnh đạo công ty" ? (
                    <td className="border p-2 text-center" style={{ borderLeft: "none", borderRight: "none"}}>
                      {order.order_status}
                    </td>
                  ) : (
                    <td className="border p-2 text-center" style={{ borderLeft: "none", borderRight: "none"}}>
                      {editingOrderId === order.id ? (
                        <select
                          className="w-full"
                          //value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order,
                              index,
                              office,
                              e.target.value
                            )
                          }
                        >
                          {index !== 3 ? (
                            <>
                              <option value="0">Chờ vận chuyển</option>
                              <option value="1">Đã rời bưu cục</option>
                            </>
                          ) : (
                            <>
                              {order.status[3] !== 1 && (
                                <>
                                  <option value="0">Chờ vận chuyển</option>
                                  <option value="1">Đang giao hàng</option>
                                </>
                              )}
                              {order.status[3] === 1 && (
                                <>
                                  <option value="0">Đang giao hàng</option>
                                  <option value="1">Hoãn giao lần 1</option>
                                  <option value="2">Hoãn giao lần 2</option>
                                  <option value="3">
                                    Giao hàng thành công
                                  </option>
                                  <option value="4">Đơn hàng bị hủy</option>
                                </>
                              )}
                            </>
                          )}
                        </select>
                      ) : (
                        viewStatus(order, index) // Display the current status when not in edit mode
                      )}
                    </td>
                  )}

                  <td className="border p-2 cursor-pointer text-center hover: text-main-100"style={{ borderLeft: "none", borderRight: "none"}}>
                    <div onClick={() => handleOnClick(order)}>Xem chi tiết</div>
                  </td>
                  {position !== "Lãnh đạo công ty" && (
                    <td className="border p-2" style={{ borderLeft: "none", borderRight: "none"}}>
                      {editTest(order, index) &&
                        (editingOrderId === order.id ? (
                          <button onClick={handleDoneClick}>Done</button>
                        ) : (
                          <button onClick={() => handleEditClick(order.id)}>
                            Edit
                          </button>
                        ))}
                    </td>
                  )}
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

export default ViewOrder;
