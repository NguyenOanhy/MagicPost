import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import path from '../utils/path';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { getDocs, collection} from "firebase/firestore";

function Reports() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
      const fetchAreas = async () => {
          try {
              const areaCollection = collection(db, "trans_point");
              const snapshot = await getDocs(areaCollection);

              const areaList = snapshot.docs.map(doc => doc.id);
              setAreas(areaList);
          } catch (error) {
              console.error('Error fetching areas:', error);
          }
      };

      fetchAreas();
  }, []);

  return (
      <div>
          <label htmlFor="areaDropdown">Select an Area:</label>
          <select id="areaDropdown">
              {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
              ))}
          </select>
      </div>
  );
}

export default Reports