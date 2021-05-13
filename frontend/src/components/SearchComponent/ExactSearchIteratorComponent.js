import './ExactSearchInteratorComponent.css'

const classNamePicker = (objectValue, keyString, k) => {
    // if(k === '0' || k === 0) return 'hide';
    if (objectValue === keyString || objectValue.toLowerCase().includes(keyString.toLowerCase())) return 'highlighter';
    // Iterate and find value if array. @TODO
    return 'normal';
}

const objectIterator = (object, keyString) => {

    return Object.entries(object).map(([k, v]) => {
        // console.log('SS# ', v)
        return <li className={classNamePicker(v, keyString, k)}>{`${k}: ${JSON.stringify(v)}`}</li>
    })
}

const printMe = (key, value, keyString) => {
    // console.log('Value ', value)
    if (typeof (value) === 'string') {
        // return <li className={classNamePicker(value,keyString, value )}> {`${key} : ${value}`}</li>
        return <li className={classNamePicker(value, keyString, key)}> {`${key} : ${value}`}</li>
    }
    if (typeof (value) === 'object') {
        
        return objectIterator(value, keyString)
    }
}
const ExactSearchInteratorComponent = ({ eachValue, keyString }) => {
    console.log(printMe(11, eachValue[1], keyString))
    return <div className="iteratorContainer">
        <ul>
            {
                printMe(11, eachValue[1], keyString)
            }
        </ul>

        <hr />
    </div>;
}

export default ExactSearchInteratorComponent;

// eachValue &&
            // Object.entries(eachValue).map(([k, v]) => {
            //     return <div className="exact-search-iterator">
            //         <ul>    
            //                  {
            //                      printMe(k,eachValue[1], keyString)
            //                  }

            //         </ul>
            //     </div>
            // })