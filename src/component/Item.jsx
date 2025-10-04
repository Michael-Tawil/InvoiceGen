export default function Item({ onChange, row, title, classname, delrow }) {
    const accentColor = "bg-blue-500 hover:bg-blue-600 p-2 ";
return (
        <div>
            <h3>{title}</h3>
            <input
                name="description"
                className={classname}
                placeholder="Description"
                type="text"
                onChange={onChange}
                value={row.description} />

            <input
                name="quantity"
                className={classname}
                placeholder="Quantity"
                type="number"
                onChange={onChange}
                value={row.quantity} />

            <input
                name="price"
                className={classname}
                placeholder="Price"
                type= "number"
                onChange={onChange}
                value={row.price} />

            <button className={accentColor} onClick={delrow}>Delete</button>
        </div>
    )
}