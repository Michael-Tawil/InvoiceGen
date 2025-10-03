export default function Invoice({RDetails,onChange,darkMode}) {

const classname = "border border-gray-300 rounded px-3 py-2 w-full"
let classdark = 'bg-gray-800 text-white border border-gray-700'

const Rfields = [
// Invoice Details
  { name: 'invoice_number', placeholder: 'Invoice Number', type: 'text', section: 'invoice' },
  { name: 'invoice_date', placeholder: 'Invoice Date (YYYY/MM/DD)', type: 'date', section: 'invoice' },
  { name: 'invoice_due_date', placeholder: 'Due Date (YYYY/MM/DD)', type: 'date', section: 'invoice' },
  
// Payee Information
  { name: 'payee_name', placeholder: 'Payee Full Name', type: 'text', section: 'payee' },
  { name: 'payee_email', placeholder: 'Payee Email', type: 'email', section: 'payee' },
  { name: 'payee_mobile', placeholder: 'Payee Mobile (04XXXXXXXX)', type: 'tel', section: 'payee' },
  { name: 'payee_abn', placeholder: 'Payee ABN (11 digits)', type: 'text', section: 'payee' },
  
// Payer Information
  { name: 'payer_name', placeholder: 'Payer Company Name', type: 'text', section: 'payer' },
  { name: 'payer_email', placeholder: 'Payer Email', type: 'email', section: 'payer' },
  { name: 'payer_line2', placeholder: 'Payer Address', type: 'text', section: 'payer' },
  
// Payment Details
  { name: 'payment_details.account_name', placeholder: 'Account Name', type: 'text', section: 'payment' },
  { name: 'payment_details.bank_name', placeholder: 'Bank Name', type: 'text', section: 'payment' },
  { name: 'payment_details.account_bsb', placeholder: 'BSB (XXX-XXX)', type: 'text', section: 'payment' },
  { name: 'payment_details.account_number', placeholder: 'Account Number', type: 'text', section: 'payment' },
  { name: 'payment_details.payid_mobile', placeholder: 'PayID Mobile', type: 'tel', section: 'payment' },
  { name: 'payment_details.payid_email', placeholder: 'PayID Email', type: 'email', section: 'payment' },
];

    return (
        <div className={`max-w-lg mx-auto rounded overflow-hidden shadow-lg p-6 ${darkMode ? classdark : ""}`}>
            <div className="flex flex-col gap-4">
                <h2 className = "font-bold text-xl mb-2 text-center">Generate Invoice</h2>
                {Rfields.map((f,index) => (
                    <input
                        key={index}
                        name = {f.name}
                        className={classname}
                        placeholder={f.placeholder}
                        type= {f.type}
                        onChange={onChange}
                        value={RDetails[f.name]}/>
                ))}

            </div>
        </div>
    );
}