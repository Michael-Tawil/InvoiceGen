export default function Item({ onChange, Value, type, title, classname, delrow }) {

let i = 0

    return (
        <div>
            <h3>{title}</h3>
            <input
                name={"description"}
                className={classname}
                placeholder={"description"}
                type={type}
                onChange={onChange}
                value={Value} />

            <input
                name={"quantity"}
                className={classname}
                placeholder={"quantity"}
                type={type}
                onChange={onChange}
                value={Value} />

            <input
                name={"price"}
                className={classname}
                placeholder={"price"}
                type={type}
                onChange={onChange}
                value={Value} />

            <button onClick={delrow}>Delete</button>
        </div>
    )
}