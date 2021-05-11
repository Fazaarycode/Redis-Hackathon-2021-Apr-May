import './ExactSearchInteratorComponent.css'
const ExactSearchInteratorComponent = (props, keyString) => {
    return <div className="iteratorContainer">
        {
            props.eachValue && 
            Object.entries(props.eachValue).map(([k,v])=> {
                return <div className="exact-search-iterator">
                    <div className={` ${k === keyString 
                    || 
                    (!Array.isArray(v) && v.toLowerCase().includes(props.keyString.toLowerCase()) )
                    ?
                    'highlighter'
                    : 
                    'normal'    
                }        
                    `}>{`${k}: Value ${v}`}</div>
                </div>
            })
            }

        <hr />
    </div>;
}
 
export default ExactSearchInteratorComponent;

