// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage} from 'firebase/storage';
import { getFirestore, doc, getDoc, getDocs, addDoc, collection, query, where, setDoc, updateDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVN0qideIoZHsfEgppqT5gUHzAv_yEdfI",
  authDomain: "magic-post-caaa0.firebaseapp.com",
  projectId: "magic-post-caaa0",
  storageBucket: "magic-post-caaa0.appspot.com",
  messagingSenderId: "701789804167",
  appId: "1:701789804167:web:addc5761a74acd45034a22",
  measurementId: "G-0Q8N5E4094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();
const firestore = getFirestore(app);


const getDocumentById = async (documentId, dbName) => {
  try {
    const docRef = doc(db, dbName, documentId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      console.log(data);
      console.log("Succesfully get document", documentId);
      return data;
    } else {
      console.log("Document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};



const getCurrentUser = () => {
  try {
    return auth.currentUser;
  } catch (error) {
    console.error("Error getting current user: ", error);
    return null;
  }
};

const getCurrentUserEmail = () => {
  try {
    const currentUser = getCurrentUser();
    return currentUser ? currentUser.email : null;
  } catch (error) {
    console.error("Error getting current user email: ", error);
    return null;
  }
};


//them data vao firebase
const addDataToFirestore = async (m_name, m_content, m_image, dbName) => {
  try {
    const collectionRef = collection(db, dbName);
    const currentTimeStamp = new Date().getTime();
    let m_uid = null;
    if (auth.currentUser === null) {
      m_uid = null;
    } else {
      m_uid = auth.currentUser.uid;
    }
    const docRef = await addDoc(collectionRef, {
      name: m_name,
      data: m_content,
      uid: m_uid,
      timestamp: currentTimeStamp,
      image: m_image
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

//them user vao firebase
const addUserToFirestore = async (m_name, m_phone, m_position, m_birth, m_email, m_auth, m_office, dbName) => {
  try {
    const collectionRef = collection(db, dbName);
    const currentTimeStamp = new Date().getTime();
    const userRef = await addDoc(collectionRef, {
      name: m_name,
      phone: m_phone,
      position: m_position,
      birth: m_birth,
      email: m_email,
      date: currentTimeStamp,
      authority: m_auth,
      office: m_office,
    });
    console.log("User ID: ", userRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// //them order vao firebase
// const addOrderToFirestore = async (m_consignor, m_consignee, m_product, m_shipping_detail, m_path, m_status, m_log, dbName) => {
//   try {
//     const collectionRef = collection(db, dbName);
//     //const currentTimeStamp = new Date().getTime();
//     const orderRef = await addDoc(collectionRef, {
//       consignor: m_consignor,
//       consignee: m_consignee,
//       product: m_product,
//       shipping_detail: m_shipping_detail,
//       path: m_path,
//       status: m_status,
//       log: m_log,
//     });
//     console.log("Order ID: ", orderRef.id);
//     return orderRef.id;
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };


const addOrderToFirestore = async (orderId, m_consignor, m_consignee, m_product, m_shipping_detail, m_path, m_status, m_log, dbName) => {
  try {
    const collectionRef = collection(db, dbName);
    const orderDocRef = doc(collectionRef, orderId); // Sử dụng orderId làm ID của document

    // Đặt dữ liệu vào document với ID được chỉ định
    await setDoc(orderDocRef, {
      consignor: m_consignor,
      consignee: m_consignee,
      product: m_product,
      shipping_detail: m_shipping_detail,
      path: m_path,
      status: m_status,
      log: m_log,
      order_status: "Đang vận chuyển"
    });

    console.log("Order ID: ", orderId);
    return orderId;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
const updateOrderCount = async (orderCount) => {
  try {
    const orderRef = doc(db, "order", "total");
    const updatedData = {
      count: orderCount+ 1, // Thay đổi trạng thái đơn hàng
      // Các trường khác bạn muốn cập nhật
    };
    await updateDoc(orderRef, updatedData);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const getOrdersFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "order"));
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  } catch (error) {
    console.error("Error getting orders: ", error);
    return [];
  }
};

const getUserByEmail = async (email, dbName) => {
  try {
    const collectionRef = collection(db, dbName);
    const querySnapshot = await getDocs(query(collectionRef, where("email", "==", email)));

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      console.log("User found:", user);
      return user;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

const updateStatusAtIndex = async (orderId, index, office, value) => {
  try {
    const orderRef = doc(db, "order", orderId);

    // Get the current document
    const orderSnapshot = await getDoc(orderRef);
    const orderData = orderSnapshot.data();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Lấy ngày hiện tại (định dạng tùy chọn)
    const formattedTime = currentDate.toLocaleTimeString(); // Lấy thời gian hiện tại (định dạng tùy chọn)
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    var officeType = "";
    if (office.includes("Hub")) {
      officeType = "điểm tập kết";
      console.log("điểm tập kết");
    } else {
      officeType = "điểm giao dịch";
      console.log("điểm giao dịch");
    }

    if (orderData && Array.isArray(orderData.status)) {
      // Modify the status array
      orderData.status[index] = value;
      if (index === 3 && value === 1) {
        orderData.status[4] = 0;
        console.log("...4");
      } 
      var logEntry = {
        createdTime: formattedDateTime,
        statusName: "",
      };
      if (index !== 4) {
        if (value === 0) {
          logEntry.statusName = `Đơn hàng đã đến ${officeType} ${office}.`;
        } else if (value === 1) {
          if (index === 3) {
            logEntry.statusName = "Đơn hàng đang được vận chuyển đến bạn."
          }
          logEntry.statusName = `Đơn hàng đã rời ${officeType}.`;
        } 
      } else if (value === 1) {
        logEntry.statusName = "Hoãn giao hàng lần 1.";
      } else if (value === 2) {
        logEntry.statusName = "Hoãn giao hàng lần 2.";
      } else if (value ===3) {
        logEntry.statusName = "Đơn hàng đã được giao thành công.";
        orderData.order_status = "Đã vận chuyển";
      } else if (value === 4) {
        logEntry.statusName = "Đơn hàng đã bị hủy.";
        orderData.order_status = "Đã bị hủy";
      }
      
      // Add a new log entry to the log array
      orderData.log = orderData.log || []; // Ensure that log array exists
      orderData.log.push(logEntry);

      // Update the entire document with the modified status array and new log entry
      await updateDoc(orderRef, { status: orderData.status, log: orderData.log, order_status: orderData.order_status});
      console.log("Successfully updated");
    } else {
      console.log("Document or status field not found");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const getUsersByOffice = async (currentUser) => {
  try {
    const usersRef = collection(db, 'user');

    let searchPositions = [];
    let searchOffice = '';

    const currentUserPosition = currentUser.position;
    const currentUserOffice = currentUser.office;

    if (currentUserPosition === 'Lãnh đạo công ty') {
      searchPositions = ['Trưởng điểm giao dịch', 'Trưởng điểm tập kết'];
    } else if (currentUserPosition === 'Trưởng điểm tập kết') {
      searchPositions = ['Nhân viên tại điểm tập kết'];
      searchOffice = currentUserOffice;
    } else if (currentUserPosition === 'Trưởng điểm giao dịch') {
      searchPositions = ['Nhân viên tại điểm giao dịch'];
      searchOffice = currentUserOffice;
    }

    const q = query(
      usersRef,
      where('position', 'in', searchPositions),
      ...(searchOffice ? [where('office', '==', searchOffice)] : []) // Thêm điều kiện truy vấn office nếu searchOffice tồn tại
    );

    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.error('Error getting users by office: ', error);
    return [];
  }
};
const countOrdersByStatus = async (user) => {
  try {
    const userOffice = user.office;
    const ordersRef = collection(db, 'order');

    // Thực hiện truy vấn để lấy danh sách đơn hàng
    const querySnapshot = await getDocs(ordersRef);
    const orders = querySnapshot.docs.map((doc) => doc.data());
    console.log(orders)
    let deliveringCount = 0;
    let deliveredCount = 0;
    let cancelledCount = 0;

    // Đếm số lượng đơn hàng theo trạng thái
    for (const order of orders) {
      if (user.position === "Lãnh đạo công ty") {
        if (order.order_status === 'Đang vận chuyển') {
          deliveringCount++;
        } else if (order.order_status === 'Đã vận chuyển') {
          deliveredCount++;
        } else if (order.order_status === 'Đã bị huỷ') {
          cancelledCount++;
        }
      }
      else if (order.path && order.path.includes(userOffice) && user.position != "Lãnh đạo công ty") { // Kiểm tra order.path tồn tại và userOffice là chuỗi con của order.path
        if (order.order_status === 'Đang vận chuyển') {
          deliveringCount++;
        } else if (order.order_status === 'Đã vận chuyển') {
          deliveredCount++;
        } else if (order.order_status === 'Đã bị huỷ') {
          cancelledCount++;
        }
      }
    }

    return {
      deliveringCount,
      deliveredCount,
      cancelledCount,
    };
  } catch (error) {
    console.error('Error counting orders by status: ', error);
    return {
      deliveringCount: 0,
      deliveredCount: 0,
      cancelledCount: 0,
    };
  } 
};

const getShippingFee = async(start_point, end_point, weight, product_type, shipping_type, product_price) => {
  try {
    const data_1 = await getDocumentById(start_point, "trans_point");
    const data_2 = await getDocumentById(end_point, "trans_point");
    //let fee = 0;
    let shipping_fee = 0;
    let additional_fee = 0;
    let estimated_date = 0;
    const hub_1 = parseInt(data_1.hubId);
    const hub_2 = parseInt(data_2.hubId);
    const type_1 = new Set([1001, 1002, 1003]);
    const type_2 = new Set([1004, 1005, 1006]);
    const type_3 = new Set([1007, 1008]);
    if ((type_1.has(hub_1) && type_1.has(hub_2)) || (type_3.has(hub_1) && type_3.has(hub_2))) {
      shipping_fee += 15000;
      estimated_date = 3;
    } else if ((type_2.has(hub_1) && type_2.has(hub_2))) {
      if (Math.abs(hub_1 - hub_2) <= 1) {
        shipping_fee += 15000;
        estimated_date = 3;
      } else {
        shipping_fee += 20000;
        estimated_date = 4;
      }
    } else {
      if ((type_1.has(hub_1) && type_2.has(hub_2)) || (type_2.has(hub_1) && type_1.has(hub_2)) || (type_2.has(hub_1) && type_3.has(hub_2)) || (type_3.has(hub_1) && type_2.has(hub_2))) {
        shipping_fee += 20000;
        estimated_date = 4;
      } else if ((type_1.has(hub_1) && type_3.has(hub_2)) || (type_3.has(hub_1) && type_1.has(hub_2))) {
        shipping_fee += 30000;
        estimated_date = 5;
      }
    }
    if (product_type === "Tài liệu") {
      if (weight >= 500) {
        additional_fee += 5000;
      } else if (weight >= 1000) {
        additional_fee += 10000;
      } else {
        additional_fee += 15000;
      }
    } else {
      let x = Math.floor(weight / 1000);
      additional_fee += x * 400;
    }
    if (shipping_type === "Chuyển phát nhanh") {
      if (estimated_date === 3) {
        estimated_date = 1;
      } else {
        estimated_date = 2;
      }
      if (additional_fee === 0) {
        additional_fee += 10000;
      } else {
        additional_fee *= 1.5;
      }
    }
    console.log([shipping_fee, additional_fee, shipping_fee + additional_fee, estimated_date]);
    return [shipping_fee, additional_fee, shipping_fee + additional_fee + parseInt(product_price), estimated_date];
  } catch (error) {
    console.error('Error getting users by office: ', error);
    return [];
  }
  
}

const getShippingFeeByCustomer = async(start_point, end_point, weight, product_type) => {
  try {
    const data_1 = await getDocumentById(start_point, "trans_point");
    const data_2 = await getDocumentById(end_point, "trans_point");
    let shipping_fee = 0;
    let additional_fee_1 = 0;
    let additional_fee_2 = 0;
    const hub_1 = parseInt(data_1.hubId);
    const hub_2 = parseInt(data_2.hubId);
    const type_1 = new Set([1001, 1002, 1003]);
    const type_2 = new Set([1004, 1005, 1006]);
    const type_3 = new Set([1007, 1008]);
    if ((type_1.has(hub_1) && type_1.has(hub_2)) || (type_3.has(hub_1) && type_3.has(hub_2))) {
      shipping_fee += 15000;
    } else if ((type_2.has(hub_1) && type_2.has(hub_2))) {
      if (Math.abs(hub_1 - hub_2) <= 1) {
        shipping_fee += 15000;
      } else {
        shipping_fee += 20000;
      }
    } else {
      if ((type_1.has(hub_1) && type_2.has(hub_2)) || (type_2.has(hub_1) && type_1.has(hub_2)) || (type_2.has(hub_1) && type_3.has(hub_2)) || (type_3.has(hub_1) && type_2.has(hub_2))) {
        shipping_fee += 20000;
      } else if ((type_1.has(hub_1) && type_3.has(hub_2)) || (type_3.has(hub_1) && type_1.has(hub_2))) {
        shipping_fee += 30000;
      }
    }
    if (product_type === "Tài liệu") {
      if (weight >= 500) {
        additional_fee_1 += 5000;
      } else if (weight >= 1000) {
        additional_fee_1 += 10000;
      } else {
        additional_fee_1 += 15000;
      }
    } else {
      let x = Math.floor(weight / 1000);
      additional_fee_1 += x * 400;
    }
    if (additional_fee_1 === 0) {
      additional_fee_2 = additional_fee_1 + 10000;
    } else {
      additional_fee_2 = additional_fee_1 * 1.5;
    }
    let fee = [{
      type: "Chuyển phát thường",
      shipping_fee: shipping_fee,
      additional_fee: additional_fee_1,
    },
    {
      type: "Chuyển phát nhanh",
      shipping_fee: shipping_fee,
      additional_fee: additional_fee_2,
    }];
    return fee;
  } catch (error) {
    console.error('Error getting users by office: ', error);
    return [];
  }
  
}


export { storage, auth, db, getDocumentById, getCurrentUserEmail, getCurrentUser, addDataToFirestore, addUserToFirestore, addOrderToFirestore, updateOrderCount, getOrdersFromFirestore, updateStatusAtIndex, getUserByEmail, getUsersByOffice, countOrdersByStatus, getShippingFee, getShippingFeeByCustomer};