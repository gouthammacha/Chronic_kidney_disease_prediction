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
  const [showSummary, setShowSummary] = useState(false);

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
    setShowSummary(true);
  };

  const handleConfirmPrediction = async () => {
    setLoading(true);
    setError("");
    setPrediction("");

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data.prediction);
      setShowSummary(false);
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("An error occurred while making the prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-white px-3 py-2 text-gray-900 border";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  const renderSummary = () => {
    if (!showSummary) return null;

    const summaryData = [
      { label: "Patient Name", value: formData.name },
      { label: "Gender", value: formData.gender },
      { label: "Age", value: formData.age },
      { label: "Blood Pressure", value: `${formData.bp} mm Hg` },
      { label: "Specific Gravity", value: formData.gravity },
      { label: "Albumin", value: `${formData.albumin} g/dL` },
      { label: "Sugar", value: `${formData.sugar} mg/dL` },
      { label: "Red Blood Cells", value: formData.rbc === "1" ? "Normal" : "Abnormal" },
      { label: "Pus Cells", value: formData.pusCell === "1" ? "Normal" : "Abnormal" },
      { label: "Pus Cell Clumps", value: formData.pusCellClumps === "0" ? "No" : "Yes" },
      { label: "Bacteria", value: formData.bacteria === "0" ? "No" : "Yes" },
      { label: "Blood Urea", value: `${formData.bloodUrea} mg/dL` },
      { label: "Serum Creatinine", value: `${formData.serumCreatinine} mg/dL` },
      { label: "Sodium", value: `${formData.sodium} mEq/L` },
      { label: "Potassium", value: `${formData.potassium} mEq/L` },
      { label: "Hemoglobin", value: `${formData.hemoglobin} g/dL` },
      { label: "PCV", value: `${formData.pcv}%` },
      { label: "WBC Count", value: `${formData.wbcCount} /mm³` },
      { label: "RBC Count", value: `${formData.rbcCount} million/mm³` },
      { label: "Hypertension", value: formData.hypertension === "0" ? "No" : "Yes" },
      { label: "Diabetes", value: formData.diabetes === "0" ? "No" : "Yes" },
      { label: "Coronary Artery Disease", value: formData.coronaryArtery === "0" ? "No" : "Yes" },
      { label: "Appetite", value: formData.appetite === "0" ? "Good" : "Poor" },
      { label: "Pedal Edema", value: formData.pedalEdema === "0" ? "No" : "Yes" },
      { label: "Anemia", value: formData.anemia === "0" ? "No" : "Yes" }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Review Your Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summaryData.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <p className="text-lg font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setShowSummary(false)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Edit Information
            </button>
            <button
              onClick={handleConfirmPrediction}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Confirm and Predict
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPredictionResult = () => {
    if (!prediction) return null;

    const isCKD = prediction.toLowerCase().includes('ckd') && !prediction.toLowerCase().includes('no ckd');
    
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
          {isCKD ? 'Potential CKD Detected! Medical Attention Recommended' : 'Great! Your Kidneys Appear Healthy'}
        </h2>
        <p className={`text-lg text-center ${isCKD ? 'text-red-600' : 'text-green-600'}`}>
          {prediction}
        </p>
        {isCKD ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <Stethoscope className="h-5 w-5" />
              <p className="font-medium">Please consult a healthcare professional immediately</p>
            </div>
            <div className="bg-white rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-red-700 mb-2">Important Next Steps:</h3>
              <ul className="list-disc list-inside space-y-2 text-red-600">
                <li>Schedule an appointment with a nephrologist as soon as possible</li>
                <li>Bring your test results and medical history to your appointment</li>
                <li>Follow your doctor’s advice on monitoring blood pressure and managing your diet</li>
                <li>Avoid self-medication and follow medical advice strictly</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Heart className="h-5 w-5" />
              <p className="font-medium">Keep up the healthy lifestyle!</p>
            </div>
            <div className="bg-white rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-green-700 mb-2">Healthy Kidney Tips:</h3>
              <ul className="list-disc list-inside space-y-2 text-green-600">
                <li>Stay hydrated with 8-10 glasses of water daily</li>
                <li>Maintain a balanced, low-sodium diet</li>
                <li>Exercise regularly for at least 30 minutes</li>
                <li>Schedule regular check-ups with your healthcare provider</li>
                <li>Monitor your blood pressure and blood sugar levels</li>
              </ul>
            </div>
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
                {loading ? 'Processing...' : 'Review Information'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {renderSummary()}
          {renderPredictionResult()}
        </div>
      </div>
    </div>
  );
}

export default PredictionForm;	