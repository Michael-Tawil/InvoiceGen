import { useState } from 'react'
import Invoice from './component/Invoice'
function App() {

  const [darkMode,SetdarkMode] = useState(false)
  const [RDetails, SetRD] = useState({

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
    }
      SetRD(prev => ({
        ...prev, [name]: value
      }))
  }
  console.log(RDetails)

  return (
    <>
      <Invoice RDetails={RDetails} onChange={HandleChange} darkMode={darkMode} />
    </>
  )

}

export default App
