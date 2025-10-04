import { useState } from 'react'
import Invoice from './component/Invoice'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function App() {

  const [darkMode, SetdarkMode] = useState(false)
  const [Errors, SetErrors] = useState({})
  const [RDetails, SetRD] = useState({

    rows: [],
    invoice_number: '',
    invoice_date: '',
    invoice_due_date: '',
    payee_name: '',
    payee_email: '',
    payee_mobile: '',
    payee_abn: '',
    payer_name: '',
    payer_email: '',
    payer_line2: '',
    payment_details: {
      account_name: '',
      bank_name: '',
      account_bsb: '',
      account_number: '',
      payid_mobile: '',
      payid_email: ''
    }
  })

  const HandleChange = (e) => {
    let { name, value } = e.target

    if (name.includes("payment_details.")) {
      name = name.split(".")[1]

      SetRD(prev => ({
        ...prev, payment_details: {

          ...prev.payment_details, [name]: value
        }
      }))
    } else {
      SetRD(prev => ({
        ...prev, [name]: value
      }))
    }

  }

  const addrows = () => {
    SetRD(prev => ({
      ...prev,
      rows: [...prev.rows, {

        description: "",
        quantity: "",
        price: ""
      }]
    }))
  }

  const updaterows = (index, e) => {

    const { name, value } = e.target;

    SetRD(prev => ({
      ...prev,
      rows: prev.rows.map((row, i) => i === index ? { ...row, [name]: value } : row)
    }))
  }

  const deleterows = (index) => {
    SetRD(prev => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== index)
    }))
  }

  const validform = () => {
    const errors = {};

    const topLevelRequired = [
      'invoice_number', 'invoice_date', 'invoice_due_date',
      'payee_name', 'payee_email', 'payee_mobile',
      'payer_name', 'payer_email', 'payer_line2'
    ];

    topLevelRequired.forEach(field => {
      if (!RDetails[field]) errors[field] = 'Required';
    });

    const paymentRequired = [
      'account_name', 'bank_name', 'account_bsb',
      'account_number', 'payid_mobile', 'payid_email'
    ];

    paymentRequired.forEach(field => {
      if (!RDetails.payment_details[field]) {
        errors[`payment_details.${field}`] = 'Required';
      }
    });

    // ABN validation
    if (!RDetails.payee_abn || RDetails.payee_abn.length !== 11) {
      errors.payee_abn = 'ABN must be 11 digits';
    }

    const rows = [
      'description', 'quantity', 'price'
    ];

    // Rows validation
    if (RDetails.rows.length === 0) {
      errors.rows = 'Add at least one line item';
    } else {

      RDetails.rows.forEach((row, index) => {
        if (!row.description) {
          errors[`rows.${index}.description`] = 'Description required';
        }
        if (!row.quantity || row.quantity <= 0) {
          errors[`rows.${index}.quantity`] = 'Quantity required';
        }
        if (!row.price || row.price <= 0) {
          errors[`rows.${index}.price`] = 'Price required';
        }

      })



    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validform();

    if (Object.keys(errors).length > 0) {
      SetErrors(errors);
      return;
    }
    SetErrors({});

    const payload = {
      ...RDetails,
      invoice_date: RDetails.invoice_date.replace(/-/g, '/'),
      invoice_due_date: RDetails.invoice_due_date.replace(/-/g, '/'),
      rows: RDetails.rows.map(row => ({
        description: row.description,
        amount: parseFloat(row.quantity) * parseFloat(row.price)
      }))
    };

    // API call
    try {
      const url = `https://payflow-be-413408547913.australia-southeast2.run.app/test1?send_email=False&sender_name=${payload.payee_name}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)

      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const htmlContent = await response.text();

      // Create temporary div with the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      document.body.appendChild(tempDiv);

      // Convert to PDF
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true
      });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice_${payload.invoice_number}.pdf`);

      // Clean up temp div
      document.body.removeChild(tempDiv);

      // success noti
      alert('Invoice generated successfully!');

    } catch (error) {
      // failure noti
      alert('Failed to generate invoice');
    }
  };

  return (
    <>
      <Invoice RDetails={RDetails}
        onChange={HandleChange}
        darkMode={darkMode}
        addrows={addrows}
        deleterows={deleterows}
        updaterows={updaterows}
        handleSubmit={handleSubmit}
        Errors={Errors} />
    </>
  )
}
