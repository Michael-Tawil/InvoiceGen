export default function Item({ onChange, row, title, classname, delrow }) {
return (
        <div>
            <h3>{title}</h3>
            <input
                name="description"
                className={classname}
                placeholder="description"
                type="text"
                onChange={onChange}
                value={row.description} />

            <input
                name="quantity"
                className={classname}
                placeholder="quantity"
                type="number"
                onChange={onChange}
                value={row.quantity} />

            <input
                name="price"
                className={classname}
                placeholder="price"
                type= "number"
                onChange={onChange}
                value={row.price} />

            <button onClick={delrow}>Delete</button>
        </div>
    )
}