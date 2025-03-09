// import React, { useState } from 'react';
// import axios from 'axios';
// import { Activity, AlertCircle } from 'lucide-react';

// interface FormData {
//   name: string;
//   gender: string;
//   age: string;
//   bp: string;
//   gravity: string;
//   albumin: string;
//   sugar: string;
//   rbc: string;
//   pusCell: string;
//   pusCellClumps: string;
//   bacteria: string;
//   bloodUrea: string;
//   serumCreatinine: string;
//   sodium: string;
//   potassium: string;
//   hemoglobin: string;
//   pcv: string;
//   wbcCount: string;
//   rbcCount: string;
//   hypertension: string;
//   diabetes: string;
//   coronaryArtery: string;
//   appetite: string;
//   pedalEdema: string;
//   anemia: string;
//   targetclass: number;
// }

// function PredictionForm() {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     gender: "",
//     age: "",
//     bp: "",
//     gravity: "",
//     albumin: "",
//     sugar: "",
//     rbc: "",
//     pusCell: "",
//     pusCellClumps: "",
//     bacteria: "",
//     bloodUrea: "",
//     serumCreatinine: "",
//     sodium: "",
//     potassium: "",
//     hemoglobin: "",
//     pcv: "",
//     wbcCount: "",
//     rbcCount: "",
//     hypertension: "",
//     diabetes: "",
//     coronaryArtery: "",
//     appetite: "",
//     pedalEdema: "",
//     anemia: "",
//     targetclass: 0
//   });

//   const [prediction, setPrediction] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;

//     if (name === 'age' && parseInt(value) < 0) {
//       return;
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setPrediction("");

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/predict', formData);
//       setPrediction(response.data.prediction);
//     } catch (error) {
//       console.error("Error making prediction:", error);
//       setError("An error occurred while making the prediction. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-3 py-2 text-gray-900 border";
//   const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <Activity className="mx-auto h-12 w-12 text-blue-600" />
//           <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
//             Chronic Kidney Disease Prediction
//           </h1>
//           <p className="mt-2 text-lg text-gray-600">
//             Enter your medical parameters for analysis
//           </p>
//         </div>

//         <div className="bg-white shadow rounded-lg p-6 md:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               <div>
//                 <label htmlFor="name" className={labelClasses}>Patient Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className={inputClasses}
//                   placeholder="Enter patient name"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="gender" className={labelClasses}>Gender</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                   className={inputClasses}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {/* Medical Parameters */}
//               {[
//                 { name: "age", label: "Age", type: "number", min: "1", step: "1" },
//                 { name: "bp", label: "Blood Pressure", type: "number", step: "0.1" },
//                 { name: "gravity", label: "Specific Gravity", type: "number", step: "0.001" },
//                 { name: "albumin", label: "Albumin", type: "number", step: "0.1" },
//                 { name: "sugar", label: "Sugar", type: "number", step: "0.1" },
//                 { name: "rbc", label: "Red Blood Cells", type: "number", step: "0.1" },
//                 { name: "pusCell", label: "Pus Cells", type: "number", step: "0.1" },
//                 { name: "pusCellClumps", label: "Pus Cell Clumps", type: "number", step: "0.1" },
//                 { name: "bacteria", label: "Bacteria", type: "number", step: "0.1" },
//                 { name: "bloodUrea", label: "Blood Urea", type: "number", step: "0.1" },
//                 { name: "serumCreatinine", label: "Serum Creatinine", type: "number", step: "0.01" },
//                 { name: "sodium", label: "Sodium", type: "number", step: "0.1" },
//                 { name: "potassium", label: "Potassium", type: "number", step: "0.1" },
//                 { name: "hemoglobin", label: "Hemoglobin", type: "number", step: "0.1" },
//                 { name: "pcv", label: "PCV", type: "number", step: "0.1" },
//                 { name: "wbcCount", label: "WBC Count", type: "number", step: "0.1" },
//                 { name: "rbcCount", label: "RBC Count", type: "number", step: "0.1" },
//                 { name: "hypertension", label: "Hypertension", type: "number", step: "0.1" },
//                 { name: "diabetes", label: "Diabetes", type: "number", step: "0.1" },
//                 { name: "coronaryArtery", label: "Coronary Artery", type: "number", step: "0.1" },
//                 { name: "appetite", label: "Appetite", type: "number", step: "0.1" },
//                 { name: "pedalEdema", label: "Pedal Edema", type: "number", step: "0.1" },
//                 { name: "anemia", label: "Anemia", type: "number", step: "0.1" }
//               ].map((field) => (
//                 <div key={field.name}>
//                   <label htmlFor={field.name} className={labelClasses}>{field.label}</label>
//                   <input
//                     type={field.type}
//                     id={field.name}
//                     name={field.name}
//                     value={formData[field.name as keyof FormData]}
//                     onChange={handleChange}
//                     required
//                     className={inputClasses}
//                     placeholder={`Enter ${field.label.toLowerCase()}`}
//                     min={field.min}
//                     step={field.step}
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="mt-6">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {loading ? 'Processing...' : 'Predict'}
//               </button>
//             </div>
//           </form>

//           {error && (
//             <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           )}

//           {prediction && (
//             <div className="mt-6 p-4 bg-green-50 rounded-md">
//               <h2 className="text-lg font-semibold text-green-800">Prediction Result</h2>
//               <p className="mt-1 text-sm text-green-700">{prediction}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PredictionForm;

import React, { useState } from 'react';
import axios from 'axios';
import { Activity, AlertCircle, Heart, CheckCircle, AlertTriangle, Stethoscope } from 'lucide-react';

interface FormData {
  name: string;
  gender: string;
  age: string;
  bp: string;
  gravity: string;
  albumin: string;
  sugar: string;
  rbc: string;
  pusCell: string;
  pusCellClumps: string;
  bacteria: string;
  bloodUrea: string;
  serumCreatinine: string;
  sodium: string;
  potassium: string;
  hemoglobin: string;
  pcv: string;
  wbcCount: string;
  rbcCount: string;
  hypertension: string;
  diabetes: string;
  coronaryArtery: string;
  appetite: string;
  pedalEdema: string;
  anemia: string;
  targetclass: number;
}

function PredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    age: "",
    bp: "",
    gravity: "",
    albumin: "",
    sugar: "",
    rbc: "",
    pusCell: "",
    pusCellClumps: "",
    bacteria: "",
    bloodUrea: "",
    serumCreatinine: "",
    sodium: "",
    potassium: "",
    hemoglobin: "",
    pcv: "",
    wbcCount: "",
    rbcCount: "",
    hypertension: "",
    diabetes: "",
    coronaryArtery: "",
    appetite: "",
    pedalEdema: "",
    anemia: "",
    targetclass: 0
  });

  const [prediction, setPrediction] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'age' && parseInt(value) < 0) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction("");

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("An error occurred while making the prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-white px-3 py-2 text-gray-900 border";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  const renderPredictionResult = () => {
    if (!prediction) return null;

    const isCKD = prediction.toLowerCase().includes('ckd');
    
    return (
      <div className={`mt-8 p-6 rounded-lg shadow-lg ${isCKD ? 'bg-red-50' : 'bg-green-50'} transform transition-all duration-500 ease-in-out`}>
        <div className="flex items-center justify-center mb-4">
          {isCKD ? (
            <AlertTriangle className="h-12 w-12 text-red-500" />
          ) : (
            <CheckCircle className="h-12 w-12 text-green-500" />
          )}
        </div>
        <h2 className={`text-2xl font-bold text-center mb-4 ${isCKD ? 'text-red-700' : 'text-green-700'}`}>
          {isCKD ? 'Medical Attention Recommended' : 'Good News!'}
        </h2>
        <p className={`text-lg text-center ${isCKD ? 'text-red-600' : 'text-green-600'}`}>
          {prediction}
        </p>
        {isCKD ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <Stethoscope className="h-5 w-5" />
              <p className="font-medium">Please consult a healthcare professional</p>
            </div>
            <p className="text-red-500 text-center text-sm">
              Early detection and treatment are crucial for managing chronic kidney disease.
              Schedule an appointment with a nephrologist for a thorough evaluation.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Heart className="h-5 w-5" />
              <p className="font-medium">Keep up the healthy lifestyle!</p>
            </div>
            <p className="text-green-500 text-center text-sm">
              Your results indicate healthy kidney function. Continue maintaining good health practices
              and regular check-ups.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Activity className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Chronic Kidney Disease Prediction
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Enter your medical parameters for analysis
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClasses}>Patient Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter patient name"
                />
              </div>

              <div>
                <label htmlFor="gender" className={labelClasses}>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className={labelClasses}>Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter age"
                  min="1"
                  step="1"
                />
              </div>

              {/* Blood Pressure */}
              <div>
                <label htmlFor="bp" className={labelClasses}>Blood Pressure</label>
                <input
                  type="number"
                  id="bp"
                  name="bp"
                  value={formData.bp}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter blood pressure"
                  step="0.1"
                />
              </div>

              {/* Specific Gravity */}
              <div>
                <label htmlFor="gravity" className={labelClasses}>Specific Gravity</label>
                <input
                  type="number"
                  id="gravity"
                  name="gravity"
                  value={formData.gravity}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter specific gravity"
                  step="0.001"
                />
              </div>

              {/* Albumin */}
              <div>
                <label htmlFor="albumin" className={labelClasses}>Albumin</label>
                <input
                  type="number"
                  id="albumin"
                  name="albumin"
                  value={formData.albumin}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter albumin level"
                  step="0.1"
                />
              </div>

              {/* Sugar */}
              <div>
                <label htmlFor="sugar" className={labelClasses}>Sugar</label>
                <input
                  type="number"
                  id="sugar"
                  name="sugar"
                  value={formData.sugar}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter sugar level"
                  step="0.1"
                />
              </div>

              {/* Red Blood Cells - Convert to Normal/Abnormal */}
              <div>
                <label htmlFor="rbc" className={labelClasses}>Red Blood Cells</label>
                <select
                  id="rbc"
                  name="rbc"
                  value={formData.rbc}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">Abnormal</option>
                  <option value="1">Normal</option>
                </select>
              </div>

              {/* Pus Cells - Convert to Normal/Abnormal */}
              <div>
                <label htmlFor="pusCell" className={labelClasses}>Pus Cells in Urine</label>
                <select
                  id="pusCell"
                  name="pusCell"
                  value={formData.pusCell}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">Abnormal</option>
                  <option value="1">Normal</option>
                </select>
              </div>

              {/* Pus Cell Clumps - Convert to Yes/No */}
              <div>
                <label htmlFor="pusCellClumps" className={labelClasses}>Pus Cell Clumps</label>
                <select
                  id="pusCellClumps"
                  name="pusCellClumps"
                  value={formData.pusCellClumps}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Bacteria - Convert to Yes/No */}
              <div>
                <label htmlFor="bacteria" className={labelClasses}>Bacteria</label>
                <select
                  id="bacteria"
                  name="bacteria"
                  value={formData.bacteria}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Blood Urea */}
              <div>
                <label htmlFor="bloodUrea" className={labelClasses}>Blood Urea</label>
                <input
                  type="number"
                  id="bloodUrea"
                  name="bloodUrea"
                  value={formData.bloodUrea}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter blood urea level"
                  step="0.1"
                />
              </div>

              {/* Serum Creatinine */}
              <div>
                <label htmlFor="serumCreatinine" className={labelClasses}>Serum Creatinine</label>
                <input
                  type="number"
                  id="serumCreatinine"
                  name="serumCreatinine"
                  value={formData.serumCreatinine}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter serum creatinine"
                  step="0.01"
                />
              </div>

              {/* Sodium */}
              <div>
                <label htmlFor="sodium" className={labelClasses}>Sodium</label>
                <input
                  type="number"
                  id="sodium"
                  name="sodium"
                  value={formData.sodium}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter sodium level"
                  step="0.1"
                />
              </div>

              {/* Potassium */}
              <div>
                <label htmlFor="potassium" className={labelClasses}>Potassium</label>
                <input
                  type="number"
                  id="potassium"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter potassium level"
                  step="0.1"
                />
              </div>

              {/* Hemoglobin */}
              <div>
                <label htmlFor="hemoglobin" className={labelClasses}>Hemoglobin</label>
                <input
                  type="number"
                  id="hemoglobin"
                  name="hemoglobin"
                  value={formData.hemoglobin}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter hemoglobin level"
                  step="0.1"
                />
              </div>

              {/* PCV */}
              <div>
                <label htmlFor="pcv" className={labelClasses}>PCV</label>
                <input
                  type="number"
                  id="pcv"
                  name="pcv"
                  value={formData.pcv}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter PCV"
                  step="0.1"
                />
              </div>

              {/* WBC Count */}
              <div>
                <label htmlFor="wbcCount" className={labelClasses}>WBC Count</label>
                <input
                  type="number"
                  id="wbcCount"
                  name="wbcCount"
                  value={formData.wbcCount}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter WBC count"
                  step="0.1"
                />
              </div>

              {/* RBC Count */}
              <div>
                <label htmlFor="rbcCount" className={labelClasses}>RBC Count</label>
                <input
                  type="number"
                  id="rbcCount"
                  name="rbcCount"
                  value={formData.rbcCount}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Enter RBC count"
                  step="0.1"
                />
              </div>

              {/* Hypertension - Convert to Yes/No */}
              <div>
                <label htmlFor="hypertension" className={labelClasses}>Hypertension</label>
                <select
                  id="hypertension"
                  name="hypertension"
                  value={formData.hypertension}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Diabetes - Convert to Yes/No */}
              <div>
                <label htmlFor="diabetes" className={labelClasses}>Diabetes</label>
                <select
                  id="diabetes"
                  name="diabetes"
                  value={formData.diabetes}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Coronary Artery - Convert to Yes/No */}
              <div>
                <label htmlFor="coronaryArtery" className={labelClasses}>Coronary Artery Disease</label>
                <select
                  id="coronaryArtery"
                  name="coronaryArtery"
                  value={formData.coronaryArtery}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Appetite - Convert to Good/Poor */}
              <div>
                <label htmlFor="appetite" className={labelClasses}>Appetite</label>
                <select
                  id="appetite"
                  name="appetite"
                  value={formData.appetite}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">Good</option>
                  <option value="1">Poor</option>
                </select>
              </div>

              {/* Pedal Edema - Convert to Yes/No */}
              <div>
                <label htmlFor="pedalEdema" className={labelClasses}>Pedal Edema</label>
                <select
                  id="pedalEdema"
                  name="pedalEdema"
                  value={formData.pedalEdema}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Anemia - Convert to Yes/No */}
              <div>
                <label htmlFor="anemia" className={labelClasses}>Anemia</label>
                <select
                  id="anemia"
                  name="anemia"
                  value={formData.anemia}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select Option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? 'Processing...' : 'Predict'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {renderPredictionResult()}
        </div>
      </div>
    </div>
  );
}

export default PredictionForm;