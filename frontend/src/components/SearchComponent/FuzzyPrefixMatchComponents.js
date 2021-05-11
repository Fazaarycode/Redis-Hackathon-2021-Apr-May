import { Accordion, Button } from 'react-bootstrap';
import React from 'react';
import './FuzzyPrefixMatchComponents.css'

const FuzzyPrefixMatchComponents = (props) => {
    let { searchResults, searchType } = props;
    let name = props.searchType.charAt(0).toUpperCase() + props.searchType.slice(1);
    return <div className= {searchType}>
        {
            searchResults && searchResults.data && searchResults.data[searchType]
            && Object.entries(searchResults.data[searchType])
                .map(([k, v]) => {
                    console.log('V ', v)
                    return <div className="exactMatchAccordion">

                        <Accordion defaultActiveKey="0">
                            <Accordion.Toggle as={Button} eventKey="0">
                                {`${props.searchType.charAt(0).toUpperCase() + props.searchType.slice(1)} based match Results (${Object.entries(searchResults.data[searchType]).length}) found` }                                  </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div>
                                    <h3> {`Dataset Name: ${k}`}</h3>
                                    {
                                    v[0]
                                    ? 
                                    <p className="highlighter"> {`${v[0]}`}</p>
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