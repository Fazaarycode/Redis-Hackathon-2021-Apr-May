import './ExactSearchInteratorComponent.css'

const classNamePicker = (objectValue, keyString, k) => {
    if(k === '0' || k === 0 || Number(k)) return 'hide';
    if(objectValue === keyString || objectValue.toLowerCase().includes(keyString.toLowerCase())) return 'highlighter';
    // Iterate and find value if array. @TODO
    return 'normal';
}

const objectIterator = (object, keyString) => {
    return Object.entries(object).map(([k,v]) => {
        return <li className={classNamePicker(v,keyString, k )}>{`${k}: ${v}`}</li>
    })
}

const printMe = (key, value, keyString) => {
    if(typeof(value)==='string') {
        return <li className={classNamePicker(value,keyString, key )}> {`${key} : ${value}`}</li>
    }
    if(typeof(value)==='object') {
        objectIterator(value, keyString)
    }
}
const ExactSearchInteratorComponent = ({ eachValue, keyString }) => {
    // const 
    return <div className="iteratorContainer">
        {
            eachValue &&
            Object.entries(eachValue).map(([k, v]) => {
                return <div className="exact-search-iterator">
                    <ul>    
                             {
                                 printMe(k,v, keyString)
                             }
                    
                    </ul>
                </div>
            })
        }

        <hr />
    </div>;
}

export default ExactSearchInteratorComponent;



// className={` ${k === keyString 
//     || 
//     (!Array.isArray(v) && !Number(v) && v.toLowerCase().includes(props.keyString.toLowerCase()) )
//     ?
//     'highlighter'
//     : 
//     'normal'    
// }        
//     `}