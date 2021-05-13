import { Accordion, Button } from 'react-bootstrap';
import React from 'react';
import './FuzzyPrefixMatchComponents.css'

const stringToArray = (str) => {
    return [...str];
}
const arrayLength = (str) => {
    return (Array.isArray(str) && str.length) || [].length;
}

const FuzzyPrefixMatchComponents = (props) => {
    let { searchResults, searchType } = props;
    return <div className={searchType}>
        {
            searchResults && searchResults.data && searchResults.data[searchType]
            && Object.entries(searchResults.data[searchType])
                .map(([k, v]) => {
                    return <div className="exactMatchAccordion">
                        
                        <Accordion defaultActiveKey="0">
                            <Accordion.Toggle className ="gg" as={Button} variant="link" eventKey="0">
                                {`${props.searchType.charAt(0).toUpperCase() + props.searchType.slice(1)} based match Results (${arrayLength(stringToArray(v))}) found 
                                ${arrayLength(stringToArray(v)) ? "⬇": ''}
                                
                                `} </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div>
                                    <h3 className="dataset-heading"> {`Dataset Name: ${k}`}</h3>
                                    {
                                        v[0]
                                            ?
                                            <ul>
                                                {
                                                    stringToArray(v).map(values => {
                                                        return <li>
                                                            {values.join(', ')}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                            :
                                            <p className="normal">{`No ${props.searchType.charAt(0).toUpperCase() + props.searchType.slice(1)}  matched for given Search text`}</p>
                                    }
                                    <hr />
                                </div>
                            </Accordion.Collapse>

                        </Accordion>
                    </div>
                })
        }
    </div>;
}

export default FuzzyPrefixMatchComponents;