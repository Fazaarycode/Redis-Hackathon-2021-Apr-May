import { Accordion, Button } from 'react-bootstrap';
import ExactSearchInteratorComponent from './ExactSearchIteratorComponent';
import './ExactSearchComponent.css'
const ExactSearchComponent = ({ searchResults, keyString }) => {
    return <div className="exactMatches">
         {keyString && <h3 className="heading-exact-match"> Exact Word Matches</h3>}
        {
            searchResults && searchResults.data && searchResults.data['exactSingleWordMatch']
            && Object.entries(searchResults.data['exactSingleWordMatch'])
                .map(([k, v]) => {
                    return <div className="exactMatchAccordion">

                        <Accordion defaultActiveKey="0">
                            <Accordion.Toggle as={Button} eventKey="0">
                                {`Exact match Results (${v[0] && v[0].count !== 0 ?
                                    (v[0].count) : '0'}) found `}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div class="dataset-heading">
                                    <h3> {`Dataset Name: ${k}`}</h3>
                                    {
                                        v[0] && v[0].count !== 0 ?
                                            <p className="cadence">{`Total Occurrences: ${v[0].count}`}</p>
                                            : null
                                    }
                                    <h4 className="matching-heading"> Matching Payloads </h4>
                                    {
                                        v[0] && v[0].allValues
                                            ?
                                            v[0].allValues.map(eachValue => {
                                                return <ExactSearchInteratorComponent
                                                    eachValue={eachValue}
                                                    keyString={keyString}
                                                />
                                            })
                                            : null
                                    }
                                </div>
                            </Accordion.Collapse>

                        </Accordion>
                    </div>
                })
        }
    </div>;
}

export default ExactSearchComponent;