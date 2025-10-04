import Item from "./Item";

export default function Invoice({ RDetails, onChange, addrows, deleterows, updaterows, handleSubmit, Errors }) {

  const classname = "border border-gray-300 rounded px-3 py-2 w-full"
  const accentColor = "bg-blue-500 hover:bg-blue-600";

  const Rfields = [
    // Invoice Details
    { name: 'invoice_number', placeholder: 'Invoice Number', type: 'number', section: 'invoice' },
    { name: 'invoice_date', placeholder: 'Invoice Date (YYYY/MM/DD)', type: 'date', section: 'invoice' },
    { name: 'invoice_due_date', placeholder: 'Due Date (YYYY/MM/DD)', type: 'date', section: 'invoice' },

    // Payee Information
    { name: 'payee_name', placeholder: 'Payee Full Name', type: 'text', section: 'payee' },
    { name: 'payee_email', placeholder: 'Payee Email', type: 'email', section: 'payee' },
    { name: 'payee_mobile', placeholder: 'Payee Mobile (04XXXXXXXX)', type: 'tel', section: 'payee' },
    { name: 'payee_abn', placeholder: 'Payee ABN (11 digits)', type: 'number', section: 'payee' },

    // Payer Information
    { name: 'payer_name', placeholder: 'Payer Company Name', type: 'text', section: 'payer' },
    { name: 'payer_email', placeholder: 'Payer Email', type: 'email', section: 'payer' },
    { name: 'payer_line2', placeholder: 'Payer Address', type: 'text', section: 'payer' },

    // Payment Details
    { name: 'payment_details.account_name', placeholder: 'Account Name', type: 'text', section: 'payment' },
    { name: 'payment_details.bank_name', placeholder: 'Bank Name', type: 'text', section: 'payment' },
    { name: 'payment_details.account_bsb', placeholder: 'BSB (XXX-XXX)', type: 'number', section: 'payment' },
    { name: 'payment_details.account_number', placeholder: 'Account Number', type: 'number', section: 'payment' },
    { name: 'payment_details.payid_mobile', placeholder: 'PayID Mobile', type: 'tel', section: 'payment' },
    { name: 'payment_details.payid_email', placeholder: 'PayID Email', type: 'email', section: 'payment' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className={`max-w-lg mx-auto rounded overflow-hidden shadow-lg p-6`}>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-xl mb-2 text-center">Generate Invoice</h1>
          <h4 className="font-bold text-md mb-2 text-center" >Enter Details Below:</h4>
          {Rfields.map((f, index) => (
            <div key={index}>
              <input
                name={f.name}
                className={classname}
                placeholder={f.placeholder}
                type={f.type}
                onChange={onChange}
                value={RDetails[f.name]} />

              {Errors[f.name] && (
                <p className="text-red-500 text-sm mt-1">{Errors[f.name]}</p>
              )}
            </div>
          ))}

          <button className={`${accentColor} text-white px-4 py-2 rounded`} type= 'button' onClick={addrows}>Add Row</button>

          {RDetails.rows.length > 0 ?
            RDetails.rows.map((r, index) => (
              <div key={index}>
                <Item
                  title={`ITEM ${index + 1}`}
                  classname={classname}
                  row={r}
                  onChange={(e) => updaterows(index, e)}
                  Value={RDetails.rows[r.name]}
                  delrow={() => deleterows(index)}
                />
                {Errors[`rows.${index}.description`] && (
                  <p className="text-red-500 text-sm">{Errors[`rows.${index}.description`]}</p>
                )}
                {Errors[`rows.${index}.quantity`] && (
                  <p className="text-red-500 text-sm">{Errors[`rows.${index}.quantity`]}</p>
                )}
                {Errors[`rows.${index}.price`] && (
                  <p className="text-red-500 text-sm">{Errors[`rows.${index}.price`]}</p>
                )}
              </div>
            )) : ""}

          <button className={`${accentColor} text-white px-4 py-2 rounded`} type="submit" >Submit</button>

        </div>
      </div>
    </form>
  );
}